-- Create the squares table
CREATE TABLE squares (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  position INTEGER NOT NULL UNIQUE CHECK (position >= 0 AND position < 100),
  buyer_name TEXT,
  buyer_email TEXT,
  buyer_phone TEXT,
  venmo_username TEXT,
  claimed_at TIMESTAMPTZ,
  payment_confirmed BOOLEAN DEFAULT false,
  paid_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Create the board_config table
CREATE TABLE board_config (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  numbers_assigned BOOLEAN DEFAULT false,
  chiefs_numbers INTEGER[],
  eagles_numbers INTEGER[],
  q1_chiefs_score INTEGER,
  q1_eagles_score INTEGER,
  q2_chiefs_score INTEGER,
  q2_eagles_score INTEGER,
  q3_chiefs_score INTEGER,
  q3_eagles_score INTEGER,
  final_chiefs_score INTEGER,
  final_eagles_score INTEGER,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Insert initial board config
INSERT INTO board_config (numbers_assigned) VALUES (false);

-- Enable Row Level Security (RLS)
ALTER TABLE squares ENABLE ROW LEVEL SECURITY;
ALTER TABLE board_config ENABLE ROW LEVEL SECURITY;

-- Create policies to allow public read access
CREATE POLICY "Allow public read access" ON squares FOR SELECT USING (true);
CREATE POLICY "Allow public insert" ON squares FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update" ON squares FOR UPDATE USING (true);

CREATE POLICY "Allow public read access" ON board_config FOR SELECT USING (true);
CREATE POLICY "Allow public update" ON board_config FOR UPDATE USING (true);

-- Enable Realtime
ALTER PUBLICATION supabase_realtime ADD TABLE squares;
ALTER PUBLICATION supabase_realtime ADD TABLE board_config;
