/*
  # Create dashboards table

  1. New Tables
    - `dashboards`
      - `id` (uuid, primary key)
      - `name` (text, required)
      - `url` (text, required)
      - `active` (boolean, default true)
      - `user_id` (uuid, foreign key to auth.users)
      - `created_at` (timestamp with time zone)
      - `updated_at` (timestamp with time zone)

  2. Security
    - Enable RLS on `dashboards` table
    - Add policies for authenticated users to:
      - Read their own dashboards
      - Create new dashboards
      - Update their own dashboards
      - Delete their own dashboards
*/

CREATE TABLE IF NOT EXISTS dashboards (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  url text NOT NULL,
  active boolean DEFAULT true,
  user_id uuid REFERENCES auth.users NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE dashboards ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can read own dashboards"
  ON dashboards
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create dashboards"
  ON dashboards
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own dashboards"
  ON dashboards
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own dashboards"
  ON dashboards
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_dashboards_updated_at
  BEFORE UPDATE ON dashboards
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();