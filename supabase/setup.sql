-- Create artworks table
CREATE TABLE artworks (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  description TEXT,
  dimensions TEXT,
  year INTEGER,
  price DECIMAL(10,2),
  url TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create exhibitions table
CREATE TABLE exhibitions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  location TEXT NOT NULL,
  date DATE NOT NULL,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create messages table
CREATE TABLE messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE artworks ENABLE ROW LEVEL SECURITY;
ALTER TABLE exhibitions ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

-- RLS Policies for artworks
-- Allow public read access
CREATE POLICY "Public read access for artworks" ON artworks
  FOR SELECT USING (true);

-- Allow authenticated admin to insert/update/delete
CREATE POLICY "Admin insert artworks" ON artworks
  FOR INSERT WITH CHECK (auth.jwt() ->> 'email' = 'davidgyulinyan@gmail.com');

CREATE POLICY "Admin update artworks" ON artworks
  FOR UPDATE USING (auth.jwt() ->> 'email' = 'davidgyulinyan@gmail.com');

CREATE POLICY "Admin delete artworks" ON artworks
  FOR DELETE USING (auth.jwt() ->> 'email' = 'davidgyulinyan@gmail.com');

-- RLS Policies for exhibitions
-- Allow public read access
CREATE POLICY "Public read access for exhibitions" ON exhibitions
  FOR SELECT USING (true);

-- Allow authenticated admin to manage
CREATE POLICY "Admin insert exhibitions" ON exhibitions
  FOR INSERT WITH CHECK (auth.jwt() ->> 'email' = 'davidgyulinyan@gmail.com');

CREATE POLICY "Admin update exhibitions" ON exhibitions
  FOR UPDATE USING (auth.jwt() ->> 'email' = 'davidgyulinyan@gmail.com');

CREATE POLICY "Admin delete exhibitions" ON exhibitions
  FOR DELETE USING (auth.jwt() ->> 'email' = 'davidgyulinyan@gmail.com');

-- RLS Policies for messages
-- Allow public insert
CREATE POLICY "Public insert messages" ON messages
  FOR INSERT WITH CHECK (true);

-- Allow authenticated admin to read
CREATE POLICY "Admin read messages" ON messages
  FOR SELECT USING (auth.jwt() ->> 'email' = 'davidgyulinyan@gmail.com');

-- Create storage bucket for images
INSERT INTO storage.buckets (id, name, public)
VALUES ('artworks', 'artworks', true);

-- Storage policies
CREATE POLICY "Public read access for artworks bucket" ON storage.objects
  FOR SELECT USING (bucket_id = 'artworks');

CREATE POLICY "Admin upload to artworks bucket" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'artworks' AND auth.jwt() ->> 'email' = 'davidgyulinyan@gmail.com');

CREATE POLICY "Admin update artworks bucket" ON storage.objects
  FOR UPDATE USING (bucket_id = 'artworks' AND auth.jwt() ->> 'email' = 'davidgyulinyan@gmail.com');

CREATE POLICY "Admin delete from artworks bucket" ON storage.objects
  FOR DELETE USING (bucket_id = 'artworks' AND auth.jwt() ->> 'email' = 'davidgyulinyan@gmail.com');