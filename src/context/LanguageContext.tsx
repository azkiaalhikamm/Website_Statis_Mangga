import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'id' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  id: {
    // Navigation
    'nav.beranda': 'Beranda',
    'nav.tentang': 'Tentang Kami',
    'nav.produk': 'Produk',
    'nav.kenapa': 'Kenapa Kami',
    'nav.faq': 'FAQ',
    'nav.kontak': 'Kontak Kami',
    'nav.pesan': 'Pesan Sekarang',
    
    // Hero
    'hero.title': 'Mangga Asli\nIndramayu.',
    'hero.subtitle': 'Rasa manis legit yang melegenda, langsung dari kebun terbaik di Indramayu untuk keluarga Anda.',
    'hero.cta': 'Jelajahi Produk',
    'hero.trust': 'Dipercaya oleh 1.000+ pelanggan di seluruh Indonesia',
    
    // UI Elements / Buttons
    'ui.viewAll': 'Lihat Semua',
    'ui.readMore': 'Selengkapnya',
    'ui.backToHome': 'Kembali ke Beranda',
    
    // About
    'about.title': 'Tentang Kami',
    'about.subtitle': 'Cerita Manis dari Indramayu',
    'about.desc1': 'Toko Buah Mangga Indramayu H. Syamsuri bermula dari kecintaan kami terhadap kekayaan alam Indramayu, kota yang dikenal sebagai penghasil mangga terbaik di Nusantara. Berdiri lebih dari dua dekade lalu, kami telah menjadi jembatan antara dedikasi para petani lokal dan keluarga yang mendambakan cita rasa mangga yang otentik.',
    'about.desc2': 'Kami bukan sekadar penjual buah, melainkan penjaga kualitas. Setiap mangga Gedong Gincu, Cengkir, dan Harum Manis yang sampai ke tangan Anda telah melewati proses seleksi ketat. Visi kami adalah memastikan bahwa setiap gigitan mangga yang Anda nikmati membawa cerita tentang tanah subur, perawatan sepenuh hati, dan komitmen kami pada kesegaran tanpa kompromi.',
    'about.stats.years': 'Tahun Pengalaman',
    'about.stats.farmers': 'Petani Mitra',
    'about.stats.customers': 'Pelanggan Setia',
    'about.stats.harvest': 'Ton Panen/Tahun',
    
    // About Page
    'aboutPage.badge': 'Kisah Kami',
    'aboutPage.title1': 'Dedikasi dari ',
    'aboutPage.title2': 'Kota Mangga.',
    'aboutPage.desc': 'Mangga Dermayu bukan sekadar platform distribusi. Kami adalah kurator kualitas yang berkomitmen memperkenalkan kekayaan mangga asli Indramayu ke seluruh penjuru Nusantara.',
    'aboutPage.section2.title': 'Menjembatani Kebun dan Meja Anda',
    'aboutPage.section2.p1': 'Indramayu telah lama dikenal sebagai **Kota Mangga**. Beragam varietas mangga tumbuh di tanahnya, menghasilkan buah dengan karakter rasa, aroma, warna, dan tekstur yang khas—berbeda dari daerah mana pun di Indonesia. Kekayaan alam ini merupakan anugerah yang harus dijaga dan dirayakan.',
    'aboutPage.section2.p2': 'Namun, di balik setiap buah mangga yang manis, terdapat proses panjang dari kebun, perjuangan petani, hingga proses panen dan distribusi agar mangga sampai ke meja Anda dalam keadaan segar. **Mangga Dermayu** hadir untuk menjembatani perjalanan tersebut dengan penuh kepercayaan dan tanggung jawab.',
    'aboutPage.vision.title': 'Visi Kami',
    'aboutPage.vision.desc': 'Menjadi jembatan utama yang menghubungkan para petani lokal Indramayu dengan masyarakat Indonesia, memperkenalkan keunggulan komoditas mangga Indramayu ke panggung nasional dan internasional.',
    'aboutPage.mission.title': 'Misi Kami',
    'aboutPage.mission.l1': 'Memberdayakan petani lokal melalui praktik perdagangan yang adil.',
    'aboutPage.mission.l2': 'Menjaga kualitas mangga dari proses panen hingga pengiriman.',
    'aboutPage.mission.l3': 'Memberikan edukasi kepada pelanggan tentang berbagai varietas mangga khas Indramayu.',
    'aboutPage.stats.desc1': 'kuintal total produksi mangga di Indramayu pada tahun 2024. Kami bangga menjadi bagian dari ekosistem ini.*',
    'aboutPage.stats.desc2': 'Berasal dari kebun dan petani lokal Indramayu.',
    'aboutPage.stats.source': '*Sumber data: Dinas Ketahanan Pangan dan Pertanian (DKPP) Kabupaten Indramayu.',
    
    // Products
    'products.title': 'Katalog Produk',
    'products.subtitle': 'Pilihan Mangga Terbaik',
    'products.desc': 'Kami menghadirkan berbagai varietas mangga unggulan Indramayu. Setiap jenis memiliki karakter rasa, aroma, dan tekstur unik yang siap memanjakan lidah Anda.',
    'products.viewAll': 'Lihat Semua Katalog',
    'products.cta': 'Beli Sekarang',
    'products.tasteLabel': 'Profil Rasa:',
    'products.weightLabel': 'Berat:',
    'products.priceLabel': 'Harga',
    'products.collection': 'KOLEKSI KAMI',
    'products.collectionTitle': 'Koleksi Mangga Terbaik Kami',
    'products.collectionDesc': 'Temukan varietas mangga khas Indramayu yang paling cocok untuk Anda.',
    'products.viewDetail': 'Lihat Detail',
    'products.orderViaWhatsapp': 'Pesan via WhatsApp',
    
    // Products Page
    'productsPage.badge': 'KATALOG PRODUK',
    'productsPage.title1': 'Koleksi Mangga ',
    'productsPage.title2': 'Terbaik.',
    'productsPage.desc': 'Temukan berbagai varietas mangga pilihan asli dari Indramayu. Setiap buah dipanen pada tingkat kematangan optimal untuk menjamin rasa manis alami yang sempurna.',
    'productsPage.specialPrice': 'Harga Spesial',
    'productsPage.sizeWeight': 'Ukuran/Berat',
    
    // Why Us / Quality Promise
    'whyus.title': 'Jaminan Mutu',
    'whyus.subtitle': 'Kenapa Memilih Kami',
    'whyus.desc': 'Kami berkomitmen untuk memberikan mangga berkualitas tinggi dari kebun ke meja Anda. Setiap langkah proses kami dirancang untuk memastikan kesegaran dan kepuasan Anda.',
    'whyus.pageTitle': 'Janji Kualitas **Mangga Dermayu.**',
    'whyus.pageDesc': 'Kami tidak hanya menjual mangga, kami memberikan garansi rasa dan kesegaran dari kebun hingga ke tangan Anda melalui standar operasional yang ketat.',
    'whyus.journeyTitle': 'Perjalanan **Sebuah Mangga.**',
    'whyus.journeyDesc': 'Bagaimana kami memastikan kesegaran mangga bertahan dari ranting pohon hingga ke ruang makan Anda.',
    'whyus.step': 'LANGKAH',
    'whyus.featuresTitle': 'Nilai Lebih Kami',
    'whyus.viewPromise': 'Lihat Janji Kualitas Kami',
    'whyus.commitment': 'KOMITMEN KAMI',
    'whyus.commitmentTitle1': 'Yang Sampai ke Rumah Anda, ',
    'whyus.commitmentTitle2': 'Harus yang Terbaik.',
    'whyus.f1.title': 'Dipilih Langsung',
    'whyus.f1.desc': 'Setiap mangga dipilih satu per satu langsung dari pohon terbaik di kebun Indramayu.',
    'whyus.f2.title': 'Kualitas Teruji',
    'whyus.f2.desc': 'Pemeriksaan menyeluruh memastikan standar kualitas terpenuhi sebelum pengiriman.',
    'whyus.f3.title': 'Kemasan Aman',
    'whyus.f3.desc': 'Dikemas dengan material khusus yang menjaga kesegaran buah selama di perjalanan.',
    'whyus.f4.title': 'Pengiriman Cepat',
    'whyus.f4.desc': 'Pengiriman yang cepat agar mangga sampai dalam kondisi paling segar di meja Anda.',
    
    // FAQ
    'faq.title': 'Pusat Bantuan',
    'faq.subtitle': 'PERTANYAAN UMUM',
    'faq.title1': 'Ada Pertanyaan?',
    'faq.title2': 'Kami Siap Menjawab.',
    'faq.viewHelp': 'Lihat Pusat Bantuan',
    'faq.pageTitle': 'Pertanyaan **Sering Diajukan.**',
    'faq.pageDesc': 'Temukan jawaban untuk pertanyaan umum seputar produk, pemesanan, dan pengiriman kami.',
    'faq.moreQuestionsTitle': 'Masih ada pertanyaan?',
    'faq.contactDesc': 'Tim kami siap membantu Anda setiap hari dari pukul 08:00 hingga 17:00 WIB.',
    'faq.contactBtn': 'Hubungi Kami',
    'faq.searchPlaceholder': 'Cari pertanyaan...',
    'faq.noResult': 'Tidak ada pertanyaan yang sesuai dengan pencarian.',
    'faq.moreQuestions': 'Masih punya pertanyaan lain?',
    'faq.contactUs': 'Hubungi Kami',
    'faq.viewAll': 'Lihat Semua FAQ',
    
    // Testimonials
    'testi.title': 'Apa Kata Pelanggan Kami?',
    'testi.subtitle': 'Testimoni Pelanggan',
    
    // Contact & Footer
    'contact.title': 'Mari Berbincang tentang <br />**Mangga Terbaik Anda.**',
    'contact.subtitle': 'HUBUNGI KAMI',
    'contact.desc': 'Punya pertanyaan mengenai pesanan, varietas mangga, atau ingin bekerja sama? Tim Mangga Dermayu siap membantu Anda dengan sepenuh hati.',
    'contact.waDesc': 'Respons cepat untuk pemesanan & layanan pelanggan.',
    'contact.addressTitle': 'Lokasi Kebun & Kantor',
    'contact.addressDesc': 'Jl. Ir. H. Juanda No.6, RT.05/RW.02, Singajaya,<br/>Kec. Indramayu, Kabupaten Indramayu,<br/>Jawa Barat 45218',
    'contact.hoursTitle': 'Jam Operasional',
    'contact.hoursDesc': 'Senin - Minggu : 06.30 - 21.00 WIB',
    'footer.brandSubtitle': 'RASA DARI INDRAMAYU',
    'footer.desc': 'Menghadirkan mangga asli terbaik dari Kota Mangga, Indramayu langsung ke meja keluarga Anda.',
    'footer.quickLinks': 'Navigasi',
    'footer.contact': 'Kontak',
    'footer.address': 'Alamat',
    'footer.copyright': '© 2026 Mangga Dermayu. Semua hak dilindungi.',
    'footer.tagline': 'Rasa Asli dari Kota Mangga.',
    'footer.rights': 'Hak Cipta Dilindungi.',
    
    // CTA Section
    'cta.badge': 'PESAN SEKARANG',
    'cta.title1': 'Sudah Siap Merasakan',
    'cta.title2': 'Rasa Indramayu?',
    'cta.desc': 'Pesan mangga pilihan Anda dan nikmati manisnya Kota Mangga langsung di rumah.',
    'cta.btnWa': 'Pesan Sekarang via WhatsApp',
    'cta.btnProducts': 'Lihat Produk',

    // TrustBar
    'trust.i1.label': 'Segar Dipanen',
    'trust.i1.desc': 'Langsung dari kebun terbaik',
    'trust.i2.label': 'Petani Lokal',
    'trust.i2.desc': 'Mendukung hasil bumi Indramayu',
    'trust.i3.label': 'Pilihan Berkualitas',
    'trust.i3.desc': 'Diseleksi dengan ketat',
    'trust.i4.label': 'Dikirim dengan Aman',
    'trust.i4.desc': 'Packaging terlindungi sempurna',

    // Floating WA
    'floating.order': 'Pesan Sekarang',

    // Farmer
    'farmer.badge': 'CERITA KAMI',
    'farmer.title1': 'Setiap Mangga',
    'farmer.title2': 'Punya Cerita.',
    'farmer.p1.1': 'Kami percaya kualitas tidak hanya berasal dari buahnya, tetapi juga dari ',
    'farmer.p1.strong': 'tangan yang merawatnya',
    'farmer.p1.2': '. Di balik setiap mangga segar yang Anda terima, ada petani lokal Indramayu yang berdedikasi merawat kebunnya dengan sepenuh hati.',
    'farmer.p2': 'Setiap buah dipetik pada tingkat kematangan yang sempurna. Setiap pembelian Anda adalah dukungan nyata yang memberdayakan komunitas petani lokal di Indramayu.',
    'farmer.btn': 'Dukung Petani Lokal',
    'farmer.imgAlt': 'Mangga segar di kebun Indramayu',
    'farmer.quote': '"Tanah Indramayu telah merawat kami, kini kami merawat buahnya untuk Anda."',
    'farmer.quoteAuthor': 'Petani Lokal',

    // Journey
    'journey.badge': 'PROSES KAMI',
    'journey.title1': 'Dari Kebun, ',
    'journey.title2': 'Untuk Meja Anda.',
    'journey.s1.title': 'Dipetik dari Kebun',
    'journey.s1.desc': 'Mangga dipetik langsung dari kebun terpilih oleh petani berpengalaman saat mencapai kematangan optimal.',
    'journey.s2.title': 'Dipilih dengan Teliti',
    'journey.s2.desc': 'Setiap buah melalui proses seleksi ketat untuk memastikan kualitas, ukuran, dan kondisi yang sempurna.',
    'journey.s3.title': 'Dikemas dengan Aman',
    'journey.s3.desc': 'Mangga dikemas menggunakan material perlindungan khusus agar tahan selama proses pengiriman.',
    'journey.s4.title': 'Dikirim ke Rumah Anda',
    'journey.s4.desc': 'Mangga segar sampai di pintu rumah Anda dalam kondisi prima, siap dinikmati bersama keluarga.',

    // IndramayuSection
    'indramayu.location': 'Kabupaten Indramayu, Jawa Barat',
    'indramayu.city': 'Kota Mangga.',
    'indramayu.desc': 'Di sinilah perjalanan rasa dimulai.',

    // Products extras
    'products.waPrefix': 'Halo! Saya ingin memesan ',
    'products.waSuffix': ' dari Mangga Dermayu.',
    'products.waPrefix2': 'Halo Mangga Dermayu, saya ingin memesan mangga ',
    'products.waSuffix2': '.',
    'products.imgAlt': ' segar dari Indramayu',
  },
  en: {
    // Navigation
    'nav.beranda': 'Home',
    'nav.tentang': 'About Us',
    'nav.produk': 'Products',
    'nav.kenapa': 'Why Us',
    'nav.faq': 'FAQ',
    'nav.kontak': 'Contact Us',
    'nav.pesan': 'Order Now',
    
    // Hero
    'hero.title': 'Authentic\nIndramayu Mangoes.',
    'hero.subtitle': 'Legendary sweet taste, directly from the best orchards in Indramayu for your family.',
    'hero.cta': 'Explore Products',
    'hero.trust': 'Trusted by 1,000+ customers across Indonesia',
    
    // UI Elements / Buttons
    'ui.viewAll': 'View All',
    'ui.readMore': 'Read More',
    'ui.backToHome': 'Back to Home',
    
    // About
    'about.title': 'About Us',
    'about.subtitle': 'A Sweet Story from Indramayu',
    'about.desc1': 'H. Syamsuri Indramayu Mango Store started from our love for the natural wealth of Indramayu, a city known as the producer of the best mangoes in the archipelago. Established more than two decades ago, we have been a bridge between the dedication of local farmers and families who crave the authentic taste of mangoes.',
    'about.desc2': 'We are not just fruit sellers, but guardians of quality. Every Gedong Gincu, Cengkir, and Harum Manis mango that reaches your hands has gone through a rigorous selection process. Our vision is to ensure that every bite of mango you enjoy carries a story of fertile soil, wholehearted care, and our commitment to uncompromising freshness.',
    'about.stats.years': 'Years Experience',
    'about.stats.farmers': 'Partner Farmers',
    'about.stats.customers': 'Loyal Customers',
    'about.stats.harvest': 'Tons Harvest/Year',
    
    // About Page
    'aboutPage.badge': 'Our Story',
    'aboutPage.title1': 'Dedication from the ',
    'aboutPage.title2': 'City of Mangoes.',
    'aboutPage.desc': 'Mangga Dermayu is not just a distribution platform. We are quality curators committed to introducing the richness of authentic Indramayu mangoes to all corners of the archipelago.',
    'aboutPage.section2.title': 'Bridging the Orchard and Your Table',
    'aboutPage.section2.p1': 'Indramayu has long been known as the **City of Mangoes**. Various mango varieties grow in its soil, producing fruits with distinct taste, aroma, color, and texture characters—different from any other region in Indonesia. This natural wealth is a gift that must be preserved and celebrated.',
    'aboutPage.section2.p2': 'However, behind every sweet mango, there is a long process from the orchard, the struggle of farmers, to the harvest and distribution process so that the mangoes reach your table in fresh condition. **Mangga Dermayu** is here to bridge that journey with full trust and responsibility.',
    'aboutPage.vision.title': 'Our Vision',
    'aboutPage.vision.desc': 'To become the main bridge connecting local Indramayu farmers with the Indonesian people, introducing the superiority of Indramayu mango commodities to the national and international stage.',
    'aboutPage.mission.title': 'Our Mission',
    'aboutPage.mission.l1': 'Empower local farmers through fair trade practices.',
    'aboutPage.mission.l2': 'Maintain mango quality from harvest to delivery.',
    'aboutPage.mission.l3': 'Educate customers about various typical Indramayu mango varieties.',
    'aboutPage.stats.desc1': 'quintals of total mango production in Indramayu in 2024. We are proud to be part of this ecosystem.*',
    'aboutPage.stats.desc2': 'Sourced from local Indramayu orchards and farmers.',
    'aboutPage.stats.source': '*Data source: Department of Food Security and Agriculture (DKPP) of Indramayu Regency.',
    
    // Products
    'products.title': 'Product Catalog',
    'products.subtitle': 'Best Mango Selections',
    'products.desc': 'We present various superior mango varieties from Indramayu. Each type has a unique taste, aroma, and texture character ready to pamper your palate.',
    'products.viewAll': 'View Full Catalog',
    'products.cta': 'Buy Now',
    'products.tasteLabel': 'Taste Profile:',
    'products.weightLabel': 'Weight:',
    'products.priceLabel': 'Price',
    'products.collection': 'OUR COLLECTION',
    'products.collectionTitle': 'Our Best Mango Collection',
    'products.collectionDesc': 'Find the typical Indramayu mango variety that suits you best.',
    'products.viewDetail': 'View Details',
    'products.orderViaWhatsapp': 'Order via WhatsApp',
    
    // Products Page
    'productsPage.badge': 'PRODUCT CATALOG',
    'productsPage.title1': 'Best Mango ',
    'productsPage.title2': 'Collection.',
    'productsPage.desc': 'Discover various selected authentic mango varieties from Indramayu. Each fruit is harvested at optimal maturity to guarantee perfect natural sweetness.',
    'productsPage.specialPrice': 'Special Price',
    'productsPage.sizeWeight': 'Size/Weight',
    
    // Why Us / Quality Promise
    'whyus.title': 'Quality Assurance',
    'whyus.subtitle': 'Why Choose Us',
    'whyus.desc': 'We are committed to delivering high-quality mangoes from the orchard to your table. Every step of our process is designed to ensure freshness and your satisfaction.',
    'whyus.pageTitle': 'Quality Promise of **Dermayu Mangoes.**',
    'whyus.pageDesc': 'We don\'t just sell mangoes, we guarantee taste and freshness from the orchard to your hands through strict operational standards.',
    'whyus.journeyTitle': 'Journey of **A Mango.**',
    'whyus.journeyDesc': 'How we ensure mango freshness lasts from the tree branch to your dining room.',
    'whyus.step': 'STEP',
    'whyus.featuresTitle': 'Our Core Values',
    'whyus.viewPromise': 'View Our Quality Promise',
    'whyus.commitment': 'OUR COMMITMENT',
    'whyus.commitmentTitle1': 'What Reaches Your Home, ',
    'whyus.commitmentTitle2': 'Must Be The Best.',
    'whyus.f1.title': 'Freshly Selected',
    'whyus.f1.desc': 'Every mango is handpicked directly from the best trees in Indramayu orchards.',
    'whyus.f2.title': 'Quality Checked',
    'whyus.f2.desc': 'Thorough inspection ensures quality standards are met before shipping.',
    'whyus.f3.title': 'Safe Packaging',
    'whyus.f3.desc': 'Packed with special materials that maintain fruit freshness during transit.',
    'whyus.f4.title': 'Fast Delivery',
    'whyus.f4.desc': 'Fast delivery so mangoes arrive in the freshest condition at your table.',
    
    // FAQ
    'faq.title': 'Help Center',
    'faq.subtitle': 'FREQUENTLY ASKED QUESTIONS',
    'faq.title1': 'Have a Question?',
    'faq.title2': 'We Are Here to Answer.',
    'faq.viewHelp': 'View Help Center',
    'faq.pageTitle': 'Frequently **Asked Questions.**',
    'faq.pageDesc': 'Find answers to common questions about our products, ordering, and shipping.',
    'faq.moreQuestionsTitle': 'Still have questions?',
    'faq.contactDesc': 'Our team is ready to help you every day from 08:00 to 17:00 WIB.',
    'faq.contactBtn': 'Contact Us',
    'faq.searchPlaceholder': 'Search questions...',
    'faq.noResult': 'No questions match your search.',
    'faq.moreQuestions': 'Still have other questions?',
    'faq.contactUs': 'Contact Us',
    'faq.viewAll': 'View All FAQs',
    
    // Testimonials
    'testi.title': 'What Our Customers Say?',
    'testi.subtitle': 'Customer Testimonials',
    
    // Contact & Footer
    'contact.title': 'Let\'s Talk about <br />**Your Best Mangoes.**',
    'contact.subtitle': 'CONTACT US',
    'contact.desc': 'Have questions about orders, mango varieties, or want to collaborate? The Mangga Dermayu team is ready to help you wholeheartedly.',
    'contact.waDesc': 'Quick response for orders & customer service.',
    'contact.addressTitle': 'Farm & Office Location',
    'contact.addressDesc': 'Jl. Ir. H. Juanda No.6, RT.05/RW.02, Singajaya,<br/>Kec. Indramayu, Indramayu Regency,<br/>West Java 45218',
    'contact.hoursTitle': 'Operating Hours',
    'contact.hoursDesc': 'Monday - Sunday : 06.30 - 21.00 WIB',
    'footer.brandSubtitle': 'TASTE OF INDRAMAYU',
    'footer.desc': 'Bringing the best authentic mangoes from the City of Mangoes, Indramayu, directly to your family\'s table.',
    'footer.quickLinks': 'Navigation',
    'footer.contact': 'Contact',
    'footer.address': 'Address',
    'footer.copyright': '© 2026 Mangga Dermayu. All rights reserved.',
    'footer.tagline': 'Authentic Taste from the City of Mangoes.',
    'footer.rights': 'All Rights Reserved.',

    // CTA Section
    'cta.badge': 'ORDER NOW',
    'cta.title1': 'Ready to Experience',
    'cta.title2': 'The Taste of Indramayu?',
    'cta.desc': 'Order your selected mangoes and enjoy the sweetness of the Mango City right at home.',
    'cta.btnWa': 'Order Now via WhatsApp',
    'cta.btnProducts': 'View Products',

    // TrustBar
    'trust.i1.label': 'Freshly Harvested',
    'trust.i1.desc': 'Directly from the best orchards',
    'trust.i2.label': 'Local Farmers',
    'trust.i2.desc': 'Supporting Indramayu\'s produce',
    'trust.i3.label': 'Quality Selection',
    'trust.i3.desc': 'Strictly selected',
    'trust.i4.label': 'Safely Delivered',
    'trust.i4.desc': 'Perfectly protected packaging',

    // Floating WA
    'floating.order': 'Order Now',

    // Farmer
    'farmer.badge': 'OUR STORY',
    'farmer.title1': 'Every Mango',
    'farmer.title2': 'Has a Story.',
    'farmer.p1.1': 'We believe quality does not only come from the fruit, but also from ',
    'farmer.p1.strong': 'the hands that care for it',
    'farmer.p1.2': '. Behind every fresh mango you receive, there are local Indramayu farmers dedicated to caring for their orchards wholeheartedly.',
    'farmer.p2': 'Every fruit is picked at the perfect ripeness level. Every purchase you make is a real support that empowers the local farmer community in Indramayu.',
    'farmer.btn': 'Support Local Farmers',
    'farmer.imgAlt': 'Fresh mangoes in Indramayu orchard',
    'farmer.quote': '"The land of Indramayu has taken care of us, now we take care of its fruit for you."',
    'farmer.quoteAuthor': 'Local Farmer',

    // Journey
    'journey.badge': 'OUR PROCESS',
    'journey.title1': 'From the Orchard, ',
    'journey.title2': 'To Your Table.',
    'journey.s1.title': 'Picked from the Orchard',
    'journey.s1.desc': 'Mangoes are picked directly from selected orchards by experienced farmers when they reach optimal ripeness.',
    'journey.s2.title': 'Carefully Selected',
    'journey.s2.desc': 'Every fruit goes through a strict selection process to ensure perfect quality, size, and condition.',
    'journey.s3.title': 'Safely Packaged',
    'journey.s3.desc': 'Mangoes are packed using special protective materials to withstand the shipping process.',
    'journey.s4.title': 'Delivered to Your Home',
    'journey.s4.desc': 'Fresh mangoes arrive at your door in prime condition, ready to be enjoyed with the family.',

    // IndramayuSection
    'indramayu.location': 'Indramayu Regency, West Java',
    'indramayu.city': 'City of Mangoes.',
    'indramayu.desc': 'This is where the journey of taste begins.',

    // Products extras
    'products.waPrefix': 'Hello! I would like to order ',
    'products.waSuffix': ' from Mangga Dermayu.',
    'products.waPrefix2': 'Hello Mangga Dermayu, I would like to order ',
    'products.waSuffix2': ' mangoes.',
    'products.imgAlt': ' fresh from Indramayu',
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('id');

  useEffect(() => {
    const savedLang = localStorage.getItem('app_language') as Language;
    if (savedLang && (savedLang === 'id' || savedLang === 'en')) {
      setLanguage(savedLang);
    }
  }, []);

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('app_language', lang);
  };

  const t = (key: string) => {
    return (translations[language] as any)[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
