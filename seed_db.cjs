const fs = require('fs');
const dotenv = require('dotenv');

let env = {};
try {
  const envFile = fs.readFileSync('.env.local', 'utf8');
  const urlMatch = envFile.match(/VITE_SUPABASE_URL\s*=\s*(.*)/);
  const keyMatch = envFile.match(/VITE_SUPABASE_ANON_KEY\s*=\s*(.*)/);
  env.VITE_SUPABASE_URL = urlMatch ? urlMatch[1].trim() : null;
  env.VITE_SUPABASE_ANON_KEY = keyMatch ? keyMatch[1].trim() : null;
} catch (e) {
  console.log("No .env.local found");
}

const url = env.VITE_SUPABASE_URL;
const key = env.VITE_SUPABASE_ANON_KEY;

const products = [
  {
    id: 'gedong-gincu', 
    name_id: 'Gedong Gincu', 
    name_en: 'Gedong Gincu', 
    desc_id: 'Si primadona Indramayu dengan warna merah merona yang cantik. Memiliki aroma harum yang sangat kuat, tekstur daging yang lembut tanpa serat, dan perpaduan rasa manis-asam yang menyegarkan.', 
    desc_en: 'The prima donna of Indramayu with a beautiful blush red color. It has a very strong fragrant aroma, soft flesh texture without fibers, and a refreshing sweet-sour taste.', 
    price_range_id: 'Mulai dari Rp XX.XXX/kg', 
    price_range_en: 'Starting from Rp XX.XXX/kg', 
    weight_id: '3–5 buah/kg', 
    weight_en: '3–5 pieces/kg', 
    taste_profile_id: ['Manis Alami', 'Harum Kuat', 'Sedikit Asam Segar', 'Lembut Tanpa Serat'], 
    taste_profile_en: ['Naturally Sweet', 'Strong Aroma', 'Slightly Tart & Fresh', 'Soft & Fiberless'], 
    image_url: 'https://images.unsplash.com/photo-1601493700631-2b16ec4b4716?w=800&q=85&fit=crop&crop=center', 
    badge_id: 'Best Seller', 
    badge_en: 'Best Seller', 
    badge_color: '#1e4433', 
    color: '#f0c040', 
    featured: false
  },
  {
    id: 'cengkir', 
    name_id: 'Cengkir (Indramayu Asli)', 
    name_en: 'Cengkir (Authentic Indramayu)', 
    desc_id: 'Mangga legendaris yang sering disebut Mangga Indramayu. Dikenal dengan ukurannya yang besar, daging buah yang tebal, kering, dan sangat manis. Tahan lama dan cocok untuk dikirim ke luar kota.', 
    desc_en: 'The legendary mango often called the Indramayu Mango. Known for its large size, thick, dry, and very sweet flesh. It is durable and perfect for long-distance shipping.', 
    price_range_id: 'Mulai dari Rp XX.XXX/kg', 
    price_range_en: 'Starting from Rp XX.XXX/kg', 
    weight_id: '1–2 buah/kg', 
    weight_en: '1–2 pieces/kg', 
    taste_profile_id: ['Sangat Manis', 'Daging Tebal', 'Tekstur Kering', 'Tahan Lama'], 
    taste_profile_en: ['Very Sweet', 'Thick Flesh', 'Dry Texture', 'Long-lasting'], 
    image_url: 'https://images.unsplash.com/photo-1553279768-865429fa0078?w=800&q=85&fit=crop&crop=center', 
    badge_id: 'Favorit Lokal', 
    badge_en: 'Local Favorite', 
    badge_color: '#d4890a', 
    color: '#e8a030', 
    featured: false
  },
  {
    id: 'harum-manis', 
    name_id: 'Harum Manis', 
    name_en: 'Harum Manis', 
    desc_id: 'Sesuai dengan namanya, mangga ini memiliki aroma yang sangat harum dan rasa manis yang legit. Daging buahnya tebal dan sangat berair, menjadikannya pilihan favorit keluarga.', 
    desc_en: 'True to its name, this mango has a very fragrant aroma and a rich sweet taste. The flesh is thick and very juicy, making it a family favorite.', 
    price_range_id: 'Mulai dari Rp XX.XXX/kg', 
    price_range_en: 'Starting from Rp XX.XXX/kg', 
    weight_id: '3–5 buah/kg', 
    weight_en: '3–5 pieces/kg', 
    taste_profile_id: ['Sangat Manis', 'Harum Lembut', 'Berair (Juicy)'], 
    taste_profile_en: ['Very Sweet', 'Soft Aroma', 'Juicy'], 
    image_url: 'https://images.unsplash.com/photo-1591073113125-e46713c829ed?w=800&q=85&fit=crop&crop=center', 
    badge_id: 'Pilihan Keluarga', 
    badge_en: 'Family Choice', 
    badge_color: '#1e4433', 
    color: '#f0c040', 
    featured: false
  },
  {
    id: 'agrimania', 
    name_id: 'Agrimania (Premium)', 
    name_en: 'Agrimania (Premium)', 
    desc_id: 'Varian mangga premium eksklusif dari Indramayu yang memenangkan berbagai penghargaan. Memiliki ukuran super jumbo (bisa mencapai 1,5 kg per buah), rasa manis yang unik, dan porsi daging yang sangat memuaskan.', 
    desc_en: 'An exclusive premium mango variant from Indramayu that has won various awards. It has a super jumbo size (up to 1.5 kg per piece), a unique sweet taste, and a very satisfying portion of flesh.', 
    price_range_id: 'Mulai dari Rp XX.XXX/kg', 
    price_range_en: 'Starting from Rp XX.XXX/kg', 
    weight_id: '1–2 buah/kg', 
    weight_en: '1–2 pieces/kg', 
    taste_profile_id: ['Manis Unik', 'Super Jumbo', 'Daging Ekstra Tebal'], 
    taste_profile_en: ['Unique Sweetness', 'Super Jumbo', 'Extra Thick Flesh'], 
    image_url: 'https://images.unsplash.com/photo-1605027628030-9bb6f83535e6?w=800&q=85&fit=crop&crop=center', 
    badge_id: 'Premium', 
    badge_en: 'Premium', 
    badge_color: '#d4890a', 
    color: '#e8a030', 
    featured: false
  }
];

fetch(`${url}/rest/v1/products`, {
  method: 'POST',
  headers: {
    'apikey': key,
    'Authorization': `Bearer ${key}`,
    'Content-Type': 'application/json',
    'Prefer': 'return=representation'
  },
  body: JSON.stringify(products)
})
.then(res => res.json())
.then(data => {
  console.log("Insert result:", JSON.stringify(data, null, 2));
})
.catch(err => {
  console.error("Fetch error:", err);
});
