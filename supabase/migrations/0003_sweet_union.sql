/*
  # Create Realtime Room System

  1. New Tables
    - `room_states`
      - `id` (uuid, primary key)
      - `room_id` (uuid, references rooms)
      - `state` (jsonb)
      - `version` (bigint)
      - `updated_at` (timestamp)
    
    - `room_events`
      - `id` (uuid, primary key)
      - `room_id` (uuid, references rooms)
      - `type` (text)
      - `data` (jsonb)
      - `created_at` (timestamp)
      - `created_by` (uuid, references auth.users)

  2. Security
    - Enable RLS on new tables
    - Add policies for room state access and updates
    - Add policies for event creation and viewing
*/

-- Create room_states table
CREATE TABLE IF NOT EXISTS room_states (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  room_id uuid REFERENCES rooms ON DELETE CASCADE NOT NULL,
  state jsonb NOT NULL DEFAULT '{}'::jsonb,
  version bigint NOT NULL DEFAULT 1,
  updated_at timestamptz DEFAULT now(),
  UNIQUE(room_id)
);

-- Create room_events table
CREATE TABLE IF NOT EXISTS room_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  room_id uuid REFERENCES rooms ON DELETE CASCADE NOT NULL,
  type text NOT NULL,
  data jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_at timestamptz DEFAULT now(),
  created_by uuid REFERENCES auth.users NOT NULL
);

-- Enable RLS
ALTER TABLE room_states ENABLE ROW LEVEL SECURITY;
ALTER TABLE room_events ENABLE ROW LEVEL SECURITY;

-- Policies for room_states
CREATE POLICY "Room states are viewable by room participants"
  ON room_states
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM rooms
      WHERE rooms.id = room_states.room_id
      AND (NOT rooms.is_private OR rooms.created_by = auth.uid())
    )
  );

CREATE POLICY "Room states are updatable by room participants"
  ON room_states
  FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM rooms
      WHERE rooms.id = room_states.room_id
      AND (NOT rooms.is_private OR rooms.created_by = auth.uid())
    )
  );

-- Policies for room_events
CREATE POLICY "Room events are viewable by room participants"
  ON room_events
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM rooms
      WHERE rooms.id = room_events.room_id
      AND (NOT rooms.is_private OR rooms.created_by = auth.uid())
    )
  );

CREATE POLICY "Users can create events in accessible rooms"
  ON room_events
  FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM rooms
      WHERE rooms.id = room_events.room_id
      AND (NOT rooms.is_private OR rooms.created_by = auth.uid())
    )
  );

-- Function to update room state
CREATE OR REPLACE FUNCTION update_room_state(
  p_room_id uuid,
  p_state jsonb,
  p_version bigint
)
RETURNS void AS $$
BEGIN
  INSERT INTO room_states (room_id, state, version)
  VALUES (p_room_id, p_state, p_version)
  ON CONFLICT (room_id)
  DO UPDATE SET
    state = p_state,
    version = p_version,
    updated_at = now()
  WHERE room_states.version < p_version;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;