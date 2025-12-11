-- Sample artworks
INSERT INTO artworks (title, category, description, dimensions, year, price, url) VALUES
('Abstract Harmony', 'Abstract', 'A vibrant exploration of color and form', '24 x 30 inches', 2024, 1200.00, 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=800'),
('Urban Reflections', 'Contemporary', 'City lights dancing on wet pavement', '36 x 48 inches', 2023, 2500.00, 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800'),
('Nature''s Whisper', 'Landscape', 'A serene mountain landscape at dawn', '30 x 40 inches', 2024, 1800.00, 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800'),
('Portrait Study', 'Portrait', 'An intimate portrait capturing human emotion', '20 x 24 inches', 2023, 950.00, 'https://images.unsplash.com/photo-1571115764595-644a1f56a55c?w=800'),
('Still Life with Flowers', 'Still Life', 'Fresh flowers in morning light', '18 x 24 inches', 2024, 750.00, 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800'),
('Ocean Dreams', 'Abstract', 'Waves of color representing ocean depths', '48 x 60 inches', 2023, 3200.00, 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=800');

-- Sample exhibitions
INSERT INTO exhibitions (title, location, date, description) VALUES
('Contemporary Visions', 'Modern Art Gallery, New York', '2024-06-15', 'A showcase of contemporary artists exploring new mediums and techniques'),
('Abstract Expressions', 'City Art Center, Los Angeles', '2024-08-20', 'Exploring the boundaries of abstract art in the digital age'),
('Nature & Form', 'Green Gallery, San Francisco', '2024-10-10', 'Celebrating the intersection of natural forms and artistic expression');

-- Sample messages (optional - for testing)
INSERT INTO messages (name, email, message) VALUES
('John Doe', 'john@example.com', 'I''m interested in your Abstract Harmony piece. Could you provide more details about the medium used?'),
('Jane Smith', 'jane@example.com', 'I would like to inquire about commissioning a custom portrait. Please contact me.');