// Product data
export interface Product {
  id: string;
  name: string;
  localName: string;
  description: string;
  longDescription: string;
  tasteProfile: string[];
  badge?: string;
  badgeColor?: string;
  priceRange: string;
  weight: string;
  image: string;
  color: string;
  featured?: boolean;
  highlight?: string;
}

const productsId: Product[] = [
  {
    id: 'gedong-gincu',
    name: 'Gedong Gincu',
    localName: 'Mango Gedong Gincu',
    description: 'Manis, harum, dengan warna kulit oranye kemerahan yang menggoda. Mangga unggulan khas Indramayu.',
    longDescription: 'Gedong Gincu adalah varietas mangga premium khas Indramayu yang terkenal dengan kulitnya yang berwarna oranye kemerahan saat matang. Telah mendapatkan Sertifikat Indikasi Geografis dari pemerintah Indonesia. Dagingnya lembut, kuning keemasan, dengan rasa manis yang khas dan aroma harum yang kuat.',
    tasteProfile: ['Sangat Manis', 'Harum Kuat', 'Daging Lembut', 'Berserat Halus'],
    badge: 'Best Seller',
    badgeColor: '#e8722a',
    priceRange: 'Mulai dari Rp XX.XXX/kg',
    weight: '4–5 buah/kg',
    image: 'https://images.unsplash.com/photo-1601493700631-2b16ec4b4716?w=800&q=85&fit=crop&crop=center',
    color: '#f5a623',
    featured: true,
    highlight: 'Sertifikat Indikasi Geografis 2025',
  },
  {
    id: 'cengkir',
    name: 'Cengkir',
    localName: 'Mango Cengkir',
    description: 'Tekstur lembut dengan cita rasa manis khas mangga Indramayu yang melegenda.',
    longDescription: 'Mangga Cengkir adalah varietas lokal Indramayu dengan bentuk lonjong dan ukuran sedang. Dikenal dengan teksturnya yang sangat lembut dan juicy, tanpa serat yang mengganggu. Cocok dikonsumsi langsung atau diolah menjadi jus segar.',
    tasteProfile: ['Manis Segar', 'Tekstur Lembut', 'Juicy', 'Tanpa Serat'],
    badge: 'Favorit Lokal',
    badgeColor: '#2d5a42',
    priceRange: 'Mulai dari Rp XX.XXX/kg',
    weight: '3–4 buah/kg',
    image: 'https://images.unsplash.com/photo-1553279768-865429fa0078?w=800&q=85&fit=crop&crop=center',
    color: '#c8d96a',
    featured: false,
  },
  {
    id: 'harum-manis',
    name: 'Harum Manis',
    localName: 'Mango Harum Manis',
    description: 'Aroma harum dengan rasa manis yang menjadi favorit keluarga di seluruh Indonesia.',
    longDescription: 'Mangga Harum Manis adalah varietas paling populer di Indonesia. Dengan aroma khas yang kuat dan rasa manis yang seimbang, menjadikannya pilihan sempurna untuk berbagai keperluan — mulai dari konsumsi langsung, jus, hingga oleh-oleh spesial.',
    tasteProfile: ['Manis Seimbang', 'Aroma Harum', 'Segar', 'Populer'],
    badge: 'Pilihan Keluarga',
    badgeColor: '#1e4433',
    priceRange: 'Mulai dari Rp XX.XXX/kg',
    weight: '3–5 buah/kg',
    image: 'https://images.unsplash.com/photo-1591073113125-e46713c829ed?w=800&q=85&fit=crop&crop=center',
    color: '#f0c040',
    featured: false,
  },
  {
    id: 'agrimania',
    name: 'Agrimania',
    localName: 'Mango Agrimania',
    description: 'Varietas unik dari Indramayu dengan ukuran buah yang sangat besar dan menggiurkan.',
    longDescription: 'Mangga Agrimania adalah varietas inovatif yang dikembangkan di Indramayu dengan keunggulan ukuran buah yang sangat besar — bisa mencapai 1 kg per buah. Memiliki daging tebal, minim serat, dan rasa manis yang konsisten. Sangat ideal sebagai oleh-oleh premium.',
    tasteProfile: ['Manis Konsisten', 'Ukuran Jumbo', 'Daging Tebal', 'Minim Serat'],
    badge: 'Ukuran Jumbo',
    badgeColor: '#d4890a',
    priceRange: 'Mulai dari Rp XX.XXX/kg',
    weight: '1–2 buah/kg',
    image: 'https://images.unsplash.com/photo-1605027628030-9bb6f83535e6?w=800&q=85&fit=crop&crop=center',
    color: '#e8a030',
    featured: false,
  },
];

const productsEn: Product[] = [
  {
    id: 'gedong-gincu',
    name: 'Gedong Gincu Mango',
    localName: 'Mango Gedong Gincu',
    description: 'Sweet, fragrant, with an enticing reddish-orange skin. The flagship mango of Indramayu.',
    longDescription: 'Gedong Gincu is a premium mango variety from Indramayu known for its reddish-orange skin when ripe. It has received a Geographical Indication Certificate from the Indonesian government. Its flesh is soft, golden yellow, with a distinctive sweet taste and a strong, fragrant aroma.',
    tasteProfile: ['Very Sweet', 'Strong Aroma', 'Soft Flesh', 'Fine Fiber'],
    badge: 'Best Seller',
    badgeColor: '#e8722a',
    priceRange: 'Starting from Rp XX.XXX/kg',
    weight: '4–5 pieces/kg',
    image: 'https://images.unsplash.com/photo-1601493700631-2b16ec4b4716?w=800&q=85&fit=crop&crop=center',
    color: '#f5a623',
    featured: true,
    highlight: 'Geographical Indication Certificate 2025',
  },
  {
    id: 'cengkir',
    name: 'Cengkir Mango',
    localName: 'Mango Cengkir',
    description: 'Soft texture with the legendary sweet taste of Indramayu mangoes.',
    longDescription: 'Cengkir Mango is a local Indramayu variety with an oval shape and medium size. Known for its very soft and juicy texture, without annoying fibers. Suitable for direct consumption or processed into fresh juice.',
    tasteProfile: ['Fresh Sweet', 'Soft Texture', 'Juicy', 'Fiberless'],
    badge: 'Local Favorite',
    badgeColor: '#2d5a42',
    priceRange: 'Starting from Rp XX.XXX/kg',
    weight: '3–4 pieces/kg',
    image: 'https://images.unsplash.com/photo-1553279768-865429fa0078?w=800&q=85&fit=crop&crop=center',
    color: '#c8d96a',
    featured: false,
  },
  {
    id: 'harum-manis',
    name: 'Harum Manis Mango',
    localName: 'Mango Harum Manis',
    description: 'Fragrant aroma with a sweet taste that is a family favorite throughout Indonesia.',
    longDescription: 'Harum Manis Mango is the most popular variety in Indonesia. With a strong characteristic aroma and balanced sweet taste, it is the perfect choice for various purposes — from direct consumption to juices and special souvenirs.',
    tasteProfile: ['Balanced Sweet', 'Fragrant Aroma', 'Fresh', 'Popular'],
    badge: 'Family Choice',
    badgeColor: '#1e4433',
    priceRange: 'Starting from Rp XX.XXX/kg',
    weight: '3–5 pieces/kg',
    image: 'https://images.unsplash.com/photo-1591073113125-e46713c829ed?w=800&q=85&fit=crop&crop=center',
    color: '#f0c040',
    featured: false,
  },
  {
    id: 'agrimania',
    name: 'Agrimania Mango',
    localName: 'Mango Agrimania',
    description: 'A unique variety from Indramayu with a very large and tempting fruit size.',
    longDescription: 'Agrimania Mango is an innovative variety developed in Indramayu with the advantage of a very large fruit size — up to 1 kg per piece. It has thick flesh, minimal fiber, and a consistent sweet taste. Ideal as a premium gift.',
    tasteProfile: ['Consistent Sweet', 'Jumbo Size', 'Thick Flesh', 'Minimal Fiber'],
    badge: 'Jumbo Size',
    badgeColor: '#d4890a',
    priceRange: 'Starting from Rp XX.XXX/kg',
    weight: '1–2 pieces/kg',
    image: 'https://images.unsplash.com/photo-1605027628030-9bb6f83535e6?w=800&q=85&fit=crop&crop=center',
    color: '#e8a030',
    featured: false,
  },
];

export const getProducts = (lang: string): Product[] => lang === 'en' ? productsEn : productsId;
export const products = productsId; // Fallback for backward compatibility where needed briefly

// Testimonials
export interface Testimonial {
  id: string;
  name: string;
  location: string; 
  text: string;
  rating: number;
  initials: string;
  color: string;
  time: string;
  reviewsCount: string;
}

const testimonialsId: Testimonial[] = [
  {
    id: 't1',
    name: 'Poppy Lupy',
    location: '',
    text: 'Mangganya manis, harga terjangkau',
    rating: 5,
    initials: 'P',
    color: '#e7711b',
    time: '10 bulan lalu',
    reviewsCount: '1 ulasan',
  },
  {
    id: 't2',
    name: 'Poppy Loop',
    location: '',
    text: 'Mantappp mangga manis tidak kecewa😍',
    rating: 5,
    initials: 'P',
    color: '#009688',
    time: '10 bulan lalu',
    reviewsCount: '1 ulasan',
  },
  {
    id: 't3',
    name: 'Rafi Ismatul Hakhim',
    location: '',
    text: 'Murah.. Harga sangat terjangkau di kalangan penjual mangga indramayu..',
    rating: 5,
    initials: 'R',
    color: '#8e24aa',
    time: '4 tahun lalu',
    reviewsCount: '2 ulasan',
  },
  {
    id: 't4',
    name: 'khumbul heroes95',
    location: '',
    text: 'MANTAP MANTAP OKE POKONYA',
    rating: 5,
    initials: 'K',
    color: '#039be5',
    time: '4 tahun lalu',
    reviewsCount: '1 ulasan',
  },
];

const testimonialsEn: Testimonial[] = [
  {
    id: 't1',
    name: 'Poppy Lupy',
    location: '',
    text: 'The mangoes are sweet, affordable price',
    rating: 5,
    initials: 'P',
    color: '#e7711b',
    time: '10 months ago',
    reviewsCount: '1 review',
  },
  {
    id: 't2',
    name: 'Poppy Loop',
    location: '',
    text: 'Awesome, sweet mangoes, not disappointed 😍',
    rating: 5,
    initials: 'P',
    color: '#009688',
    time: '10 months ago',
    reviewsCount: '1 review',
  },
  {
    id: 't3',
    name: 'Rafi Ismatul Hakhim',
    location: '',
    text: 'Cheap.. Very affordable price among Indramayu mango sellers..',
    rating: 5,
    initials: 'R',
    color: '#8e24aa',
    time: '4 years ago',
    reviewsCount: '2 reviews',
  },
  {
    id: 't4',
    name: 'khumbul heroes95',
    location: '',
    text: 'AWESOME AWESOME GREAT ABSOLUTELY',
    rating: 5,
    initials: 'K',
    color: '#039be5',
    time: '4 years ago',
    reviewsCount: '1 review',
  },
];

export const getTestimonials = (lang: string): Testimonial[] => lang === 'en' ? testimonialsEn : testimonialsId;
export const testimonials = testimonialsId;

// FAQs
export interface FAQ {
  id: string;
  question: string;
  answer: string;
}

const faqsId: FAQ[] = [
  {
    id: 'f1',
    question: 'Apakah mangga benar-benar berasal dari Indramayu?',
    answer: 'Ya, 100%. Semua produk kami berasal langsung dari kebun mangga di Kabupaten Indramayu, Jawa Barat. Indramayu dikenal sebagai Kota Mangga dan menghasilkan berbagai varietas mangga berkualitas tinggi yang memiliki cita rasa khas.',
  },
  {
    id: 'f2',
    question: 'Apakah bisa pesan dalam jumlah banyak?',
    answer: 'Tentu saja! Kami melayani pemesanan dalam berbagai jumlah, mulai dari 1 kg hingga partai besar untuk keperluan bisnis, event, atau oleh-oleh. Hubungi kami melalui WhatsApp untuk mendapatkan penawaran harga khusus pembelian partai.',
  },
  {
    id: 'f3',
    question: 'Bagaimana cara pemesanannya?',
    answer: 'Pemesanan dilakukan melalui WhatsApp. Klik tombol "Pesan Sekarang" di halaman ini, lalu Anda akan terhubung langsung dengan tim kami. Ceritakan jenis mangga yang diinginkan, jumlah, dan alamat pengiriman. Kami akan membantu proses pemesanan Anda.',
  },
  {
    id: 'f4',
    question: 'Apakah bisa dikirim ke luar kota?',
    answer: 'Ya, kami melayani pengiriman ke seluruh wilayah Indonesia. Mangga dikemas dengan baik menggunakan bahan perlindungan khusus agar sampai dalam kondisi segar. Waktu pengiriman bervariasi tergantung lokasi tujuan.',
  },
  {
    id: 'f5',
    question: 'Bagaimana cara menjaga mangga agar tetap segar?',
    answer: 'Untuk mangga yang belum matang, simpan di suhu ruangan hingga matang sempurna. Setelah matang, simpan di lemari pendingin dan konsumsi dalam 2–3 hari. Hindari menyimpan mangga yang belum matang di kulkas karena dapat menghambat proses pematangan.',
  },
  {
    id: 'f6',
    question: 'Apakah tersedia pembelian untuk oleh-oleh?',
    answer: 'Sangat tersedia! Mangga Dermayu adalah pilihan oleh-oleh premium khas Indramayu yang sangat populer. Kami juga menyediakan packaging gift box khusus untuk keperluan hadiah, hampers lebaran, atau oleh-oleh spesial.',
  },
];

const faqsEn: FAQ[] = [
  {
    id: 'f1',
    question: 'Are the mangoes really from Indramayu?',
    answer: 'Yes, 100%. All our products come directly from mango orchards in Indramayu Regency, West Java. Indramayu is known as the City of Mangoes and produces various high-quality mango varieties with distinctive flavors.',
  },
  {
    id: 'f2',
    question: 'Can I order in large quantities?',
    answer: 'Absolutely! We cater to orders in various quantities, from 1 kg to large bulk orders for business needs, events, or souvenirs. Contact us via WhatsApp to get special bulk pricing.',
  },
  {
    id: 'f3',
    question: 'How do I place an order?',
    answer: 'Orders are placed via WhatsApp. Click the "Order Now" button on this page, and you will be connected directly to our team. Tell us the type of mango you want, the quantity, and the delivery address. We will assist you with the ordering process.',
  },
  {
    id: 'f4',
    question: 'Can they be shipped out of town?',
    answer: 'Yes, we ship to all regions in Indonesia. Mangoes are well-packaged using special protective materials so they arrive fresh. Shipping time varies depending on the destination.',
  },
  {
    id: 'f5',
    question: 'How do I keep the mangoes fresh?',
    answer: 'For unripe mangoes, store them at room temperature until perfectly ripe. Once ripe, store them in the refrigerator and consume within 2–3 days. Avoid storing unripe mangoes in the fridge as it can inhibit the ripening process.',
  },
  {
    id: 'f6',
    question: 'Is it available for souvenirs or gifts?',
    answer: 'Very much so! Mangga Dermayu is a highly popular premium souvenir from Indramayu. We also provide special gift box packaging for gifts, Eid hampers, or special souvenirs.',
  },
];

export const getFaqs = (lang: string): FAQ[] => lang === 'en' ? faqsEn : faqsId;
export const faqs = faqsId;

// Journey steps
const journeyStepsId = [
  {
    id: '01',
    title: 'Dipetik dari Kebun',
    description: 'Mangga dipetik langsung dari kebun terpilih oleh petani berpengalaman saat mencapai kematangan optimal.',
    icon: 'Leaf',
  },
  {
    id: '02',
    title: 'Dipilih dengan Teliti',
    description: 'Setiap buah melalui proses seleksi ketat untuk memastikan kualitas, ukuran, dan kondisi yang sempurna.',
    icon: 'Eye',
  },
  {
    id: '03',
    title: 'Dikemas dengan Aman',
    description: 'Mangga dikemas menggunakan material perlindungan khusus agar tahan selama proses pengiriman.',
    icon: 'Package',
  },
  {
    id: '04',
    title: 'Dikirim ke Rumah Anda',
    description: 'Mangga segar sampai di pintu rumah Anda dalam kondisi prima, siap dinikmati bersama keluarga.',
    icon: 'Home',
  },
];

const journeyStepsEn = [
  {
    id: '01',
    title: 'Picked from the Orchard',
    description: 'Mangoes are picked directly from selected orchards by experienced farmers at optimal ripeness.',
    icon: 'Leaf',
  },
  {
    id: '02',
    title: 'Carefully Selected',
    description: 'Every fruit goes through a strict selection process to ensure perfect quality, size, and condition.',
    icon: 'Eye',
  },
  {
    id: '03',
    title: 'Safely Packaged',
    description: 'Mangoes are packed using special protective materials to withstand the shipping process.',
    icon: 'Package',
  },
  {
    id: '04',
    title: 'Delivered to Your Home',
    description: 'Fresh mangoes arrive at your door in prime condition, ready to be enjoyed with the family.',
    icon: 'Home',
  },
];

export const getJourneySteps = (lang: string) => lang === 'en' ? journeyStepsEn : journeyStepsId;
export const journeySteps = journeyStepsId;

// Trust items
const trustItemsId = [
  { icon: 'Sprout', label: 'Segar Dipanen', desc: 'Langsung dari kebun' },
  { icon: 'Users', label: 'Petani Lokal', desc: 'Mendukung hasil bumi Indramayu' },
  { icon: 'BadgeCheck', label: 'Pilihan Berkualitas', desc: 'Diseleksi dengan ketat' },
  { icon: 'Truck', label: 'Dikirim dengan Aman', desc: 'Packaging terlindungi' },
];

const trustItemsEn = [
  { icon: 'Sprout', label: 'Freshly Harvested', desc: 'Straight from the orchard' },
  { icon: 'Users', label: 'Local Farmers', desc: 'Supporting Indramayu produce' },
  { icon: 'BadgeCheck', label: 'Quality Choice', desc: 'Strictly selected' },
  { icon: 'Truck', label: 'Safely Delivered', desc: 'Protected packaging' },
];

export const getTrustItems = (lang: string) => lang === 'en' ? trustItemsEn : trustItemsId;
export const trustItems = trustItemsId;

// Quality features
const qualityFeaturesId = [
  { icon: 'Leaf', title: 'Freshly Selected', desc: 'Setiap mangga dipilih satu per satu langsung dari pohon terbaik.' },
  { icon: 'ShieldCheck', title: 'Quality Checked', desc: 'Pemeriksaan menyeluruh untuk memastikan standar kualitas kami.' },
  { icon: 'Package', title: 'Safe Packaging', desc: 'Dikemas menggunakan material aman yang menjaga kesegaran buah.' },
  { icon: 'Zap', title: 'Fast Delivery', desc: 'Pengiriman cepat agar mangga sampai dalam kondisi paling segar.' },
];

const qualityFeaturesEn = [
  { icon: 'Leaf', title: 'Freshly Selected', desc: 'Every mango is hand-picked directly from the best trees.' },
  { icon: 'ShieldCheck', title: 'Quality Checked', desc: 'Thorough inspection to ensure our quality standards.' },
  { icon: 'Package', title: 'Safe Packaging', desc: 'Packed using safe materials that preserve fruit freshness.' },
  { icon: 'Zap', title: 'Fast Delivery', desc: 'Fast delivery so mangoes arrive in the freshest condition.' },
];

export const getQualityFeatures = (lang: string) => lang === 'en' ? qualityFeaturesEn : qualityFeaturesId;
export const qualityFeatures = qualityFeaturesId;

export const WHATSAPP_URL = 'https://wa.me/628179070151';
export const WHATSAPP_NUMBER = '+62 817-9070-151';
