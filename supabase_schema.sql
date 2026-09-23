-- Tabel Produk (Bilingual)
CREATE TABLE products (
  id TEXT PRIMARY KEY,
  name_id TEXT NOT NULL,
  name_en TEXT NOT NULL,
  desc_id TEXT NOT NULL,
  desc_en TEXT NOT NULL,
  price_range_id TEXT NOT NULL,
  price_range_en TEXT NOT NULL,
  weight_id TEXT NOT NULL,
  weight_en TEXT NOT NULL,
  taste_profile_id TEXT[] NOT NULL,
  taste_profile_en TEXT[] NOT NULL,
  image_url TEXT NOT NULL,
  badge_id TEXT,
  badge_en TEXT,
  badge_color TEXT,
  color TEXT NOT NULL,
  featured BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Tabel Testimonial (Bilingual)
CREATE TABLE testimonials (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  role_id TEXT NOT NULL,
  role_en TEXT NOT NULL,
  content_id TEXT NOT NULL,
  content_en TEXT NOT NULL,
  image_url TEXT NOT NULL,
  rating INTEGER NOT NULL DEFAULT 5,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Seed Data Awal Produk (Opsional, agar website tidak kosong saat migrasi)
INSERT INTO products (id, name_id, name_en, desc_id, desc_en, price_range_id, price_range_en, weight_id, weight_en, taste_profile_id, taste_profile_en, image_url, badge_id, badge_en, badge_color, color, featured)
VALUES
('gedong-gincu', 'Gedong Gincu', 'Gedong Gincu', 'Si primadona Indramayu dengan warna merah merona yang cantik. Memiliki aroma harum yang sangat kuat, tekstur daging yang lembut tanpa serat, dan perpaduan rasa manis-asam yang menyegarkan.', 'The prima donna of Indramayu with a beautiful blush red color. It has a very strong fragrant aroma, soft flesh texture without fibers, and a refreshing sweet-sour taste.', 'Mulai dari Rp XX.XXX/kg', 'Starting from Rp XX.XXX/kg', '3–5 buah/kg', '3–5 pieces/kg', ARRAY['Manis Alami', 'Harum Kuat', 'Sedikit Asam Segar', 'Lembut Tanpa Serat'], ARRAY['Naturally Sweet', 'Strong Aroma', 'Slightly Tart & Fresh', 'Soft & Fiberless'], 'https://images.unsplash.com/photo-1601493700631-2b16ec4b4716?w=800&q=85&fit=crop&crop=center', 'Best Seller', 'Best Seller', '#1e4433', '#f0c040', false),
('cengkir', 'Cengkir (Indramayu Asli)', 'Cengkir (Authentic Indramayu)', 'Mangga legendaris yang sering disebut Mangga Indramayu. Dikenal dengan ukurannya yang besar, daging buah yang tebal, kering, dan sangat manis. Tahan lama dan cocok untuk dikirim ke luar kota.', 'The legendary mango often called the Indramayu Mango. Known for its large size, thick, dry, and very sweet flesh. It is durable and perfect for long-distance shipping.', 'Mulai dari Rp XX.XXX/kg', 'Starting from Rp XX.XXX/kg', '1–2 buah/kg', '1–2 pieces/kg', ARRAY['Sangat Manis', 'Daging Tebal', 'Tekstur Kering', 'Tahan Lama'], ARRAY['Very Sweet', 'Thick Flesh', 'Dry Texture', 'Long-lasting'], 'https://images.unsplash.com/photo-1553279768-865429fa0078?w=800&q=85&fit=crop&crop=center', 'Favorit Lokal', 'Local Favorite', '#d4890a', '#e8a030', false),
('harum-manis', 'Harum Manis', 'Harum Manis', 'Sesuai dengan namanya, mangga ini memiliki aroma yang sangat harum dan rasa manis yang legit. Daging buahnya tebal dan sangat berair, menjadikannya pilihan favorit keluarga.', 'True to its name, this mango has a very fragrant aroma and a rich sweet taste. The flesh is thick and very juicy, making it a family favorite.', 'Mulai dari Rp XX.XXX/kg', 'Starting from Rp XX.XXX/kg', '3–5 buah/kg', '3–5 pieces/kg', ARRAY['Sangat Manis', 'Harum Lembut', 'Berair (Juicy)'], ARRAY['Very Sweet', 'Soft Aroma', 'Juicy'], 'https://images.unsplash.com/photo-1591073113125-e46713c829ed?w=800&q=85&fit=crop&crop=center', 'Pilihan Keluarga', 'Family Choice', '#1e4433', '#f0c040', false),
('agrimania', 'Agrimania (Premium)', 'Agrimania (Premium)', 'Varian mangga premium eksklusif dari Indramayu yang memenangkan berbagai penghargaan. Memiliki ukuran super jumbo (bisa mencapai 1,5 kg per buah), rasa manis yang unik, dan porsi daging yang sangat memuaskan.', 'An exclusive premium mango variant from Indramayu that has won various awards. It has a super jumbo size (up to 1.5 kg per piece), a unique sweet taste, and a very satisfying portion of flesh.', 'Mulai dari Rp XX.XXX/kg', 'Starting from Rp XX.XXX/kg', '1–2 buah/kg', '1–2 pieces/kg', ARRAY['Manis Unik', 'Super Jumbo', 'Daging Ekstra Tebal'], ARRAY['Unique Sweetness', 'Super Jumbo', 'Extra Thick Flesh'], 'https://images.unsplash.com/photo-1605027628030-9bb6f83535e6?w=800&q=85&fit=crop&crop=center', 'Premium', 'Premium', '#d4890a', '#e8a030', false);

-- Seed Data Awal Testimonial
INSERT INTO testimonials (name, role_id, role_en, content_id, content_en, image_url, rating)
VALUES
('Budi Santoso', 'Penggemar Buah, Jakarta', 'Fruit Enthusiast, Jakarta', 'Mangga Gedong Gincunya luar biasa! Harumnya sampai ke seluruh ruangan saat paket dibuka. Rasanya manis segar, benar-benar beda kualitasnya dengan yang di pasar biasa.', 'The Gedong Gincu mangoes are amazing! The aroma filled the entire room when the package was opened. The taste is sweet and fresh, the quality is truly different from regular markets.', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=faces', 5),
('Siti Aisyah', 'Ibu Rumah Tangga, Bandung', 'Housewife, Bandung', 'Pesan Mangga Cengkir untuk oleh-oleh keluarga. Sampai Bandung dengan aman tanpa ada yang memar. Dagingnya tebal, manis, dan kering, persis seperti ekspektasi saya.', 'Ordered Cengkir mangoes for family souvenirs. Arrived in Bandung safely without any bruises. The flesh is thick, sweet, and dry, exactly as I expected.', 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=faces', 5),
('Ahmad Reza', 'Chef & Pemilik Restoran', 'Chef & Restaurant Owner', 'Sebagai chef, saya sangat pemilih soal bahan. Mangga Harum Manis dari sini sangat konsisten kualitasnya. Sangat cocok untuk dessert di restoran saya. Pengirimannya juga selalu tepat waktu.', 'As a chef, I am very picky about ingredients. The Harum Manis mangoes from here are very consistent in quality. Perfect for desserts in my restaurant. Delivery is always on time too.', 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&crop=faces', 5);

-- Tabel Pengaturan Situs (Dinamic Logo & Title)
CREATE TABLE site_settings (
  id TEXT PRIMARY KEY,
  site_title TEXT NOT NULL,
  site_logo_url TEXT,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Policy untuk mengizinkan baca/tulis publik pada site_settings (untuk prototipe)
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Enable public read access" ON site_settings FOR SELECT USING (true);
CREATE POLICY "Enable public update access" ON site_settings FOR UPDATE USING (true);
CREATE POLICY "Enable public insert access" ON site_settings FOR INSERT WITH CHECK (true);

-- Seed Data Awal Pengaturan Situs
INSERT INTO site_settings (id, site_title, site_logo_url)
VALUES ('global', 'MANGGA DERMAYU', '');
