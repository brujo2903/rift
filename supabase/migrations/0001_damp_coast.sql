/*
  # Create rooms and messages tables

  1. New Tables
    - `rooms`
      - `id` (uuid, primary key)
      - `name` (text, unique)
      - `type` (text) - room type (RED_ROOM, TWITTER_ROOM, etc.)
      - `theme_color` (text) - hex color code
      - `is_private` (boolean)
      - `created_by` (uuid, references auth.users)
      - `created_at` (timestamp)
      
    - `messages`
      - `id` (uuid, primary key)
      - `room_id` (uuid, references rooms)
      - `user_id` (uuid, references auth.users)
      - `content` (text)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on both tables
    - Add policies for room access and message creation
*/

-- Create rooms table
CREATE TABLE IF NOT EXISTS rooms (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text UNIQUE NOT NULL,
  type text NOT NULL,
  theme_color text NOT NULL,
  is_private boolean DEFAULT false,
  created_by uuid REFERENCES auth.users NOT NULL,
  created_at timestamptz DEFAULT now(),
  CHECK (type IN ('RED_ROOM', 'TWITTER_ROOM', 'WAIFU_ROOM', 'QUANT_ROOM', 'SWARM_ROOM', 'CUSTOM'))
);

-- Create messages table
CREATE TABLE IF NOT EXISTS messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  room_id uuid REFERENCES rooms ON DELETE CASCADE NOT NULL,
  user_id uuid REFERENCES auth.users NOT NULL,
  content text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE rooms ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

-- Policies for rooms
CREATE POLICY "Public rooms are viewable by everyone"
  ON rooms
  FOR SELECT
  USING (NOT is_private);

CREATE POLICY "Private rooms are viewable by creator"
  ON rooms
  FOR SELECT
  USING (auth.uid() = created_by AND is_private);

CREATE POLICY "Users can create rooms"
  ON rooms
  FOR INSERT
  WITH CHECK (auth.uid() = created_by);

-- Policies for messages
CREATE POLICY "Messages are viewable by room participants"
  ON messages
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM rooms
      WHERE rooms.id = messages.room_id
      AND (NOT rooms.is_private OR rooms.created_by = auth.uid())
    )
  );

CREATE POLICY "Users can create messages in accessible rooms"
  ON messages
  FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM rooms
      WHERE rooms.id = messages.room_id
      AND (NOT rooms.is_private OR rooms.created_by = auth.uid())
    )
  );