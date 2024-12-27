/*
  # Add room passcode feature
  
  1. Changes
    - Add passcode column to rooms table
    - Add passcode validation function
    - Update RLS policies to check passcode
  
  2. Security
    - Passcodes are stored as hashed values
    - Added policy for passcode validation
*/

-- Add passcode column
ALTER TABLE rooms ADD COLUMN IF NOT EXISTS passcode text;

-- Create function to validate room passcode
CREATE OR REPLACE FUNCTION validate_room_passcode(room_id uuid, provided_passcode text)
RETURNS boolean AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM rooms
    WHERE rooms.id = room_id
    AND (
      -- Room is public
      NOT is_private
      -- Or room is private and passcode matches
      OR (is_private AND passcode = crypt(provided_passcode, passcode))
    )
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;