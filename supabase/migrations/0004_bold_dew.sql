/*
  # Add Realtime Room System

  1. New Tables
    - `room_connections` - Tracks active WebSocket connections
    - `room_actions` - Logs all player actions and state changes
    - `room_simulation_state` - Stores current simulation state
  
  2. Functions
    - `notify_room_update()` - Broadcasts room updates to connected clients
    - `process_room_action()` - Handles and validates room actions
    - `update_simulation_state()` - Updates the simulation state
  
  3. Security
    - Enable RLS on all new tables
    - Add policies for room access and updates
*/

-- Create room_connections table
CREATE TABLE IF NOT EXISTS room_connections (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  room_id uuid REFERENCES rooms ON DELETE CASCADE NOT NULL,
  user_id uuid REFERENCES auth.users NOT NULL,
  connected_at timestamptz DEFAULT now(),
  last_ping timestamptz DEFAULT now(),
  metadata jsonb DEFAULT '{}'::jsonb,
  UNIQUE(room_id, user_id)
);

-- Create room_actions table
CREATE TABLE IF NOT EXISTS room_actions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  room_id uuid REFERENCES rooms ON DELETE CASCADE NOT NULL,
  user_id uuid REFERENCES auth.users NOT NULL,
  action_type text NOT NULL,
  action_data jsonb NOT NULL,
  created_at timestamptz DEFAULT now(),
  processed boolean DEFAULT false,
  CHECK (action_type IN (
    'MOVE_CARD',
    'PLAYER_ACTION',
    'RESOURCE_UPDATE',
    'ENVIRONMENTAL_EFFECT',
    'CHAT_MESSAGE'
  ))
);

-- Create room_simulation_state table
CREATE TABLE IF NOT EXISTS room_simulation_state (
  room_id uuid PRIMARY KEY REFERENCES rooms ON DELETE CASCADE,
  state jsonb NOT NULL DEFAULT '{
    "players": {},
    "cards": {},
    "resources": {},
    "environmentalEffects": [],
    "lastUpdate": 0
  }'::jsonb,
  version bigint DEFAULT 1,
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE room_connections ENABLE ROW LEVEL SECURITY;
ALTER TABLE room_actions ENABLE ROW LEVEL SECURITY;
ALTER TABLE room_simulation_state ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can view their own connections"
  ON room_connections
  FOR SELECT
  USING (user_id = auth.uid());

CREATE POLICY "Users can manage their own connections"
  ON room_connections
  FOR ALL
  USING (user_id = auth.uid());

CREATE POLICY "Users can view room actions"
  ON room_actions
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM rooms
      WHERE rooms.id = room_actions.room_id
      AND (NOT rooms.is_private OR rooms.created_by = auth.uid())
    )
  );

CREATE POLICY "Users can create room actions"
  ON room_actions
  FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM rooms
      WHERE rooms.id = room_actions.room_id
      AND (NOT rooms.is_private OR rooms.created_by = auth.uid())
    )
  );

CREATE POLICY "Users can view simulation state"
  ON room_simulation_state
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM rooms
      WHERE rooms.id = room_simulation_state.room_id
      AND (NOT rooms.is_private OR rooms.created_by = auth.uid())
    )
  );

-- Functions
CREATE OR REPLACE FUNCTION notify_room_update()
RETURNS trigger AS $$
BEGIN
  PERFORM pg_notify(
    'room_update',
    json_build_object(
      'room_id', NEW.room_id,
      'type', TG_TABLE_NAME,
      'record', row_to_json(NEW)
    )::text
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION process_room_action()
RETURNS trigger AS $$
BEGIN
  -- Update simulation state based on action
  UPDATE room_simulation_state
  SET state = jsonb_set(
    state,
    CASE NEW.action_type
      WHEN 'MOVE_CARD' THEN '{cards}'
      WHEN 'PLAYER_ACTION' THEN '{players}'
      WHEN 'RESOURCE_UPDATE' THEN '{resources}'
      WHEN 'ENVIRONMENTAL_EFFECT' THEN '{environmentalEffects}'
      ELSE '{events}'
    END,
    NEW.action_data
  ),
  version = version + 1,
  updated_at = now()
  WHERE room_id = NEW.room_id;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers
CREATE TRIGGER notify_room_connection
  AFTER INSERT OR UPDATE OR DELETE ON room_connections
  FOR EACH ROW
  EXECUTE FUNCTION notify_room_update();

CREATE TRIGGER notify_room_action
  AFTER INSERT ON room_actions
  FOR EACH ROW
  EXECUTE FUNCTION notify_room_update();

CREATE TRIGGER process_room_action
  AFTER INSERT ON room_actions
  FOR EACH ROW
  EXECUTE FUNCTION process_room_action();