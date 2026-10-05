import {
  TourPackage,
  ServiceItem,
  DestinationRegion,
  PromoItem,
  GalleryPhoto,
  TestimonialItem,
} from '../types/travel';

// Generated asset paths
import heroBromo from '../assets/images/hero_travel_bromo_1791223504621.jpg';
import tourBus from '../assets/images/tour_bus_fleet_1791223520045.jpg';
import studyTour from '../assets/images/study_tour_students_1791223533857.jpg';
import familyBatu from '../assets/images/family_vacation_batu_1791223546638.jpg';

export const COMPANY_INFO = {
  name: 'PT Fajar Karya Wisata',
  tagline: 'Service Of Priority',
  headline: 'Solusi Perjalanan Wisata yang Nyaman, Aman, dan Terpercaya',
  description:
    'PT Fajar Karya Wisata hadir sebagai mitra perjalanan untuk kebutuhan wisata individu, keluarga, sekolah, instansi, perusahaan, komunitas, dan berbagai kebutuhan perjalanan lainnya.',
  contact: {
    whatsapp: '6281234567890', // Format for wa.me link
    whatsappDisplay: '+62 812-3456-7890',
    instagram: '@fajarkaryawisata',
    instagramUrl: 'https://instagram.com/fajarkaryawisata',
    tiktok: '@fajarkaryawisata',
    tiktokUrl: 'https://tiktok.com/@fajarkaryawisata',
    website: 'fajarkaryawisata.my.id',
    address: 'Jl. Raya Wisata No. 88, Jawa Timur, Indonesia',
    operationalHours: 'Senin - Minggu: 08.00 - 20.00 WIB (Layanan Darurat & Konsultasi 24 Jam)',
  },
  stats: [
    { label: 'Tahun Pengalaman & Legalitas Resmi', value: 'Terpercaya' },
    { label: 'Kepuasan Rombongan Pelanggan', value: '99.4%' },
    { label: 'Jaringan Mitra Hotel & Transportasi', value: '150+' },
    { label: 'Perjalanan Wisata Sukses Terlaksana', value: '500+' },
  ],
};

export const SERVICES_DATA: ServiceItem[] = [
  {
    id: 'paket-wisata',
    title: 'Paket Wisata',
    shortDesc: 'Paket perjalanan wisata yang dirancang sesuai kebutuhan dan anggaran pelanggan.',
    longDesc:
      'Pilihan paket wisata all-in-one yang mencakup transportasi, tiket masuk destinasi favorit, kuliner khas, dan pemandu berpengalaman untuk memastikan liburan Anda efisien dan berkesan.',
    iconName: 'Compass',
    features: ['Itinerary komprehensif', 'Tiket masuk destinasi prioritas', 'Pemandu lokal ramah', 'Fleksibel sesuai budget'],
    targetAudience: 'Individu, Pasangan, & Rombongan Kecil',
  },
  {
    id: 'study-tour',
    title: 'Study Tour & Eduwisata',
    shortDesc: 'Perjalanan edukatif untuk sekolah, lembaga pendidikan, dan kelompok pelajar.',
    longDesc:
      'Program khusus bagi institusi sekolah (SD, SMP, SMA/SMK, hingga Perguruan Tinggi) yang memadukan wawasan edukasi, sejarah, kebudayaan, dan rekreasi dengan protokol keamanan ketat.',
    iconName: 'GraduationCap',
    features: ['Pendampingan Tour Leader berlisensi', 'Kaos rombongan & banner gratis', 'Briefing keselamatan & P3K lengkap', 'Asuransi perjalanan pelajar'],
    targetAudience: 'Sekolah, Kampus, & Lembaga Edukasi',
  },
  {
    id: 'wisata-keluarga',
    title: 'Wisata Keluarga & Group',
    shortDesc: 'Perjalanan untuk keluarga, komunitas, organisasi, dan kelompok.',
    longDesc:
      'Momen kebersamaan yang hangat bersama keluarga besar atau rekan komunitas. Kami rancang ritme perjalanan yang santai, ramah lansia dan anak-anak, dengan fasilitas penginapan yang nyaman.',
    iconName: 'Users',
    features: ['Jadwal fleksibel tanpa buru-buru', 'Rekomendasi resto ramah keluarga', 'Kendaraan privat ber-AC prima', 'Fun games kebersamaan'],
    targetAudience: 'Keluarga Besar, Arisan, & Komunitas Hobi',
  },
  {
    id: 'transportasi-wisata',
    title: 'Transportasi Wisata',
    shortDesc: 'Penyediaan kendaraan untuk kebutuhan perjalanan wisata dan rombongan.',
    longDesc:
      'Armada modern terawat mulai dari Toyota HiAce Luxury, Isuzu Elf, Medium Bus 31–35 seat, hingga Big Bus HDD/SHD 50 seat dengan pengemudi profesional yang berpengalaman di jalur wisata.',
    iconName: 'Bus',
    features: ['Armada bersih & wangi dengan AC dingin', 'Audio, Video, Karaoke, & USB Charger', 'Driver ramah berlisensi resmi', 'Perawatan berkala ketat'],
    targetAudience: 'Rombongan Dinas, Sekolah, & Agen Mitra',
  },
  {
    id: 'hotel-akomodasi',
    title: 'Hotel & Akomodasi',
    shortDesc: 'Membantu menyediakan kebutuhan penginapan sesuai destinasi dan kebutuhan perjalanan.',
    longDesc:
      'Kerja sama langsung dengan ratusan hotel bintang 3, 4, 5, villa privat, serta resort pegunungan di berbagai kota tujuan. Dapatkan tarif korporat terbaik dan kemudahan check-in rombongan.',
    iconName: 'Hotel',
    features: ['Tarif korporat hemat', 'Lokasi strategis dekat destinasi', 'Pilihan kamar sesuai kebutuhan', 'Proses check-in cepat untuk group'],
    targetAudience: 'Peserta Wisata & Korporasi',
  },
  {
    id: 'tour-travel',
    title: 'Tour & Travel',
    shortDesc: 'Layanan perjalanan yang dapat disesuaikan dengan tujuan, jadwal, jumlah peserta, dan kebutuhan pelanggan.',
    longDesc:
      'Solusi manajemen perjalanan end-to-end mulai dari tiket pesawat/kereta api, reservasi resto, penyediaan merchandise, sound system gathering, hingga dokumentasi foto & video drone.',
    iconName: 'MapPin',
    features: ['Konsultasi rute terintegrasi', 'Reservasi kuliner legendaris', 'Dokumentasi foto & video', 'Manajemen logistik rombongan'],
    targetAudience: 'Instansi Pemerintah & Perusahaan Swasta',
  },
  {
    id: 'custom-trip',
    title: 'Custom Trip',
    shortDesc: 'Pelanggan dapat menentukan sendiri destinasi, jadwal, jumlah peserta, serta fasilitas perjalanan.',
    longDesc:
      'Kebebasan penuh merancang liburan impian Anda. Sampaikan destinasi yang ingin dikunjungi, durasi waktu, serta fasilitas yang diinginkan, tim kami akan mengkalkulasikan paket yang paling presisi.',
    iconName: 'Sparkles',
    features: ['Bebas tentukan destinasi sendiri', 'Atur jam berangkat & durasi santai', 'Pilih tipe armada & kelas hotel', 'Kalkulasi cepat & transparan'],
    targetAudience: 'Wisatawan Mandiri & Rombongan Khusus',
  },
];

export const PACKAGES_DATA: TourPackage[] = [
  {
    id: 'pkg-keluarga-malang-batu',
    title: 'Pesona Malang - Batu Family Getaway',
    category: 'keluarga',
    categoryLabel: 'Wisata Keluarga',
    duration: '3 Hari 2 Malam (3D2N)',
    destination: 'Malang & Kota Wisata Batu, Jawa Timur',
    highlights: [
      'Jatim Park 2 (Batu Secret Zoo & Museum Satwa)',
      'Museum Angkut & Pasar Apung Nusantara',
      'Florawisata San Terra De Lafonte',
      'Petik Apel Segar di Kebun Petani Lokal',
      'Pusat Oleh-oleh Khas Malang & Batu Night Spectacular',
    ],
    startingPrice: 'Mulai Rp 1.450.000',
    priceNote: 'per peserta (Min. 5 - 10 orang)',
    image: familyBatu,
    description:
      'Paket liburan keluarga favorit dengan ritme santai, sejuk, dan ramah anak. Menikmati taman rekreasi kelas dunia di Kota Batu dan petik apel segar langsung dari pohonnya.',
    itinerary: [
      {
        day: 1,
        title: 'Penjemputan di Malang - Eksplorasi San Terra & Suasana Malam BNS',
        activities: [
          'Penjemputan rombongan di Stasiun / Bandara Malang atau Surabaya',
          'Makan siang kuliner khas Bakso Malang legendaris',
          'Mengunjungi Florawisata San Terra De Lafonte dengan hamparan bunga & spot foto tematik',
          'Check-in hotel di Kota Batu & istirahat sejenak',
          'Menikmati gemerlap Batu Night Spectacular (BNS) & wahana keluarga',
          'Makan malam & kembali ke hotel',
        ],
      },
      {
        day: 2,
        title: 'Jatim Park 2 & Kemegahan Museum Angkut',
        activities: [
          'Sarapan pagi di hotel',
          'Kunjungan edukatif & rekreasi ke Jatim Park 2 (Batu Secret Zoo & Museum Satwa)',
          'Makan siang di resto lokal pilihan',
          'Wisata edukasi petik apel di kebun apel Batu',
          'Eksplorasi Museum Angkut dengan koleksi kendaraan antik dunia & parade sore',
          'Makan malam di Pasar Apung dengan ragam kuliner nusantara',
          'Kembali ke hotel untuk istirahat',
        ],
      },
      {
        day: 3,
        title: 'Belanja Oleh-oleh Khas & Pengantaran Kembali',
        activities: [
          'Sarapan pagi & proses check-out hotel',
          'Berbelanja di pusat oleh-oleh khas Batu (Keripik buah, Strudel, Pia, Apel Batu)',
          'City tour alun-alun Kota Malang & kawasan cagar budaya Kayutangan Heritage',
          'Makan siang kuliner rawon khas Jawa Timur',
          'Pengantaran peserta ke Stasiun / Bandara Malang/Surabaya',
          'Tour selesai dengan kenangan indah bersama Fajar Karya Wisata',
        ],
      },
    ],
    included: [
      'Transportasi AC privat (Innova / HiAce Luxury) selama 3 hari',
      'Akomodasi Hotel Bintang 3/4 di Batu (2 malam, twin sharing)',
      'Makan harian (sarapan hotel 2x, makan siang 3x, makan malam 2x)',
      'Tiket masuk semua objek wisata terdaftar',
      'Driver cum tour guide ramah & berpengalaman',
      'BBM, parkir, dan retribusi jalan tol',
      'Air mineral botol setiap hari & snack box selamat datang',
    ],
    excluded: [
      'Tiket pesawat / kereta api menuju/dari meeting point',
      'Pengeluaran pribadi (laundry, telepon, mini bar hotel)',
      'Wahana permainan opsional di luar tiket terusan',
    ],
    recommendedPax: 'Keluarga 5 - 15 Orang',
  },
  {
    id: 'pkg-study-tour-jogja',
    title: 'Eksplorasi Budaya & Sejarah Yogyakarta',
    category: 'study-tour',
    categoryLabel: 'Study Tour & Eduwisata',
    duration: '3 Hari 2 Malam (3D2N)',
    destination: 'Daerah Istimewa Yogyakarta & Sekitarnya',
    highlights: [
      'Candi Prambanan & Kisah Epik Ramayana',
      'Keraton Ngayogyakarta Hadiningrat & Tamansari',
      'Museum Dirgantara Mandala & Edukasi Kedirgantaraan',
      'Workshop Gerabah Tradisional di Desa Wisata Kasongan',
      'Jalan Santai & Belanja Kreatif di Malioboro',
    ],
    startingPrice: 'Mulai Rp 875.000',
    priceNote: 'per siswa (Kapasitas Bus 45 - 50 seat)',
    image: studyTour,
    description:
      'Program eduwisata terstruktur yang dirancang khusus untuk memperkaya wawasan sejarah, budaya, seni, dan teknologi bagi para pelajar dan pendidik.',
    itinerary: [
      {
        day: 1,
        title: 'Keberangkatan Menuju Yogya - Candi Prambanan & Tebing Breksi',
        activities: [
          'Pemberangkatan rombongan sekolah menggunakan Big Bus Eksekutif',
          'Tiba di Yogyakarta disambut tim Tour Leader Fajar Karya Wisata',
          'Kunjungan Candi Prambanan dengan panduan sejarah peradaban Mataram Kuno',
          'Makan siang prasmanan di resto lokal',
          'Mengunjungi Tebing Breksi & panorama sunset perbukitan Prambanan',
          'Check-in hotel pelajar AC, makan malam prasmanan, & istirahat',
        ],
      },
      {
        day: 2,
        title: 'Keraton Yogyakarta, Museum Dirgantara, & Praktik Gerabah',
        activities: [
          'Sarapan pagi prasmanan di hotel',
          'Eksplorasi Keraton Yogyakarta & Kompleks Air Tamansari dengan pemandu abdi dalem',
          'Edukasi sains & teknologi penerbangan di Museum Pusat TNI AU Dirgantara',
          'Makan siang di restoran',
          'Praktek langsung pembuatan kerajinan tanah liat di Desa Wisata Kasongan',
          'Jalan sore di kawasan Malioboro & belanja kerajinan Beringharjo',
          'Makan malam & kembali ke hotel untuk evaluasi kegiatan',
        ],
      },
      {
        day: 3,
        title: 'Pusat Bakpia Pathok Tradisional & Perjalanan Pulang',
        activities: [
          'Sarapan pagi & check-out hotel',
          'Melihat proses pembuatan bakpia hangat di sentra Bakpia Pathok',
          'Sesi foto bersama rombongan dengan spanduk banner sekolah',
          'Makan siang sebelum perjalanan pulang',
          'Perjalanan pulang ke kota asal dengan aman dan selamat',
        ],
      },
    ],
    included: [
      'Big Bus Pariwisata HDD AC 50 seat (Audio, Mic, TV, USB Port, Reclining Seat)',
      'Penginapan hotel AC terstandar bintang (twin/triple share)',
      'Makan prasmanan teratur 7 kali selama kegiatan',
      'Tiket masuk seluruh objek cagar budaya & materi edukasi',
      'Tour Leader berlisensi & pemandu lokal bersertifikasi',
      'Free biaya untuk guru pendamping (sesuai rasio siswa)',
      'Spanduk / Banner rombongan & ID card peserta',
      'P3K standar perjalanan & Asuransi Jiwa Jasa Raharja',
    ],
    excluded: ['Biaya belanja pribadi siswa', 'Menu tambahan di luar prasmanan'],
    recommendedPax: 'Rombongan Sekolah 45 - 200 Siswa',
  },
  {
    id: 'pkg-group-bromo-gathering',
    title: 'Exotic Bromo Sunrise & Rafting Gathering',
    category: 'group',
    categoryLabel: 'Wisata Group & Gathering',
    duration: '2 Hari 1 Malam (2D1N)',
    destination: 'Taman Nasional Bromo Tengger Semeru & Probolinggo',
    highlights: [
      'Penanjakan 1 / Kingkong Hill Sunrise View',
      'Kawah Aktif Gunung Bromo & Pura Poten',
      'Pasir Berbisik & Savana Bukit Teletubbies',
      'Petualangan Seru Jeep Hardtop 4x4 Bromo',
      'Rafting Jeram Menantang Sungai Pekalen (Opsional)',
    ],
    startingPrice: 'Mulai Rp 1.150.000',
    priceNote: 'per peserta (Min. 20 - 40 orang)',
    image: heroBromo,
    description:
      'Paket adventure dan kebersamaan paling populer untuk instansi, kantor, perusahaan, atau komunitas. Menyaksikan panorama matahari terbit Bromo nan megah dilanjutkan aktivitas team building.',
    itinerary: [
      {
        day: 1,
        title: 'Meeting Point - Perjalanan Menuju Bromo & Ice Breaking Gathering',
        activities: [
          'Penjemputan di meeting point Surabaya / Malang menggunakan bus pariwisata',
          'Perjalanan menuju area Sukapura / Tosari lereng Bromo',
          'Makan siang di restoran khas pegunungan Tengger',
          'Check-in hotel / resort lereng Bromo',
          'Sesi Fun Gathering / Ice Breaking games mempererat kekompakan tim',
          'Makan malam bersama (gala dinner) dengan iringan musik / akustik',
          'Istirahat malam untuk persiapan midnight tour',
        ],
      },
      {
        day: 2,
        title: 'Golden Sunrise Bromo, Lautan Pasir, & Petualangan Jeep 4x4',
        activities: [
          'Pukul 02.30 dini hari briefing dan oper armada Jeep Hardtop 4x4',
          'Menuju Penanjakan 1 untuk menyaksikan fenomena Golden Sunrise Bromo spektakuler',
          'Turun menuju Lautan Pasir Bromo, trekking / naik kuda menuju bibir kawah',
          'Spot foto di Pasir Berbisik dan hamparan hijau Bukit Teletubbies',
          'Kembali ke hotel pukul 09.00 untuk sarapan pagi dan bersih diri',
          'Check-out dan makan siang',
          'Pengantaran kembali ke kota asal',
        ],
      },
    ],
    included: [
      'Bus pariwisata eksekutif AC antar jemput PP',
      'Sewa Armada Jeep Hardtop 4x4 resmi TNBTS (kapasitas 5-6 orang/jeep)',
      '1 Malam menginap di hotel/resort lereng Bromo',
      'Makan 4x (termasuk Gala Dinner rombongan)',
      'Tiket masuk resmi TNBTS Bromo (WNI)',
      'Instruktur Fun Games & Sound system gathering',
      'Dokumentasi foto & video perjalanan',
      'Air mineral & masker debu Bromo',
    ],
    excluded: ['Sewa kuda di lautan pasir', 'Pengeluaran pribadi'],
    recommendedPax: 'Kantor / Komunitas 20 - 100 Orang',
  },
  {
    id: 'pkg-custom-banyuwangi',
    title: 'Eksotisme Ujung Timur: Banyuwangi Adventure',
    category: 'custom',
    categoryLabel: 'Custom Trip',
    duration: '3 Hari 2 Malam (3D2N)',
    destination: 'Kawah Ijen, Taman Nasional Baluran, Djawatan, Pantai Merah',
    highlights: [
      'Fenomena Langka Api Biru (Blue Fire) Kawah Ijen',
      'Taman Nasional Baluran - "The Little Africa in Java"',
      'Hutan Magis Lord of the Rings Hutan Djawatan Benculuk',
      'Sunset Emas Pantai Pulau Merah & Kuliner Sego Tempong',
    ],
    startingPrice: 'Mulai Rp 1.650.000',
    priceNote: 'per peserta (Dapat disesuaikan budget & jadwal)',
    image: tourBus,
    description:
      'Trip kustom yang memadukan keajaiban fenomena alam langka dunia di Kawah Ijen dengan keindahan savana liar Baluran dan ketenangan hutan trembesi purba Djawatan.',
    itinerary: [
      {
        day: 1,
        title: 'Penjemputan Banyuwangi - Eksplorasi Djawatan & Sunset Pulau Merah',
        activities: [
          'Tiba di Banyuwangi (Bandara Blimbingsari / Stasiun Ketapang)',
          'Makan siang kuliner khas Sego Tempong Mbok Wah',
          'Mengunjungi hutan kanopi trembesi raksasa De Djawatan Benculuk',
          'Menikmati senja eksotis di Pantai Pulau Merah',
          'Check-in hotel di pusat kota Banyuwangi & makan malam',
        ],
      },
      {
        day: 2,
        title: 'Savana Bekol Baluran, Pantai Bama, & Istirahat',
        activities: [
          'Sarapan di hotel & bersiap menuju TN Baluran',
          'Eksplorasi Savana Bekol melihat satwa liar rusa, kerbau liar, dan merak',
          'Menikmati keasrian pantai mangrove Bama',
          'Makan siang kuliner lokal Banyuwangi',
          'Kembali ke hotel untuk istirahat persiapan pendakian dini hari',
        ],
      },
      {
        day: 3,
        title: 'Midnight Trekking Kawah Ijen Blue Fire & Danau Asam Hijau',
        activities: [
          'Pukul 00.30 bersiap menuju Pos Paltuding Kawah Ijen',
          'Trekking didampingi guide lokal berlisensi dan masker gas profesional',
          'Menyaksikan api biru (Blue Fire) dan aktivitas penambang belerang tradisional',
          'Menikmati sunrise dan panorama kawah asam toska terindah di dunia',
          'Kembali ke Paltuding, sarapan, dan belanja oleh-oleh kopi Osing',
          'Pengantaran ke bandara/stasiun untuk kepulangan',
        ],
      },
    ],
    included: [
      'Transportasi AC privat selama di Banyuwangi',
      'Hotel Bintang 3 di pusat kota (2 malam)',
      'Makan sesuai program termasuk kuliner khas',
      'Tiket masuk seluruh destinasi (Ijen, Baluran, Djawatan, Pulau Merah)',
      'Sewa masker gas respirator standar medis & senter kepala untuk Ijen',
      'Pemandu lokal Kawah Ijen profesional',
    ],
    excluded: ['Tiket transportasi menuju/dari Banyuwangi', 'Troli dorong Ijen (opsional)'],
    recommendedPax: 'Fleksibel 4 - 30 Orang',
  },
  {
    id: 'pkg-bandung-cool',
    title: 'Sejuknya Kota Kembang: Bandung Nature & Heritage',
    category: 'keluarga',
    categoryLabel: 'Wisata Keluarga & Group',
    duration: '2 Hari 1 Malam (2D1N)',
    destination: 'Bandung & Lembang, Jawa Barat',
    highlights: [
      'Kawah Megah Tangkuban Perahu',
      'Floating Market Lembang & Kuliner Terapung',
      'Farmhouse Susu Lembang & Miniatur Desa Hobbit',
      'Kawasan Bersejarah Jalan Braga & Gedung Sate',
    ],
    startingPrice: 'Mulai Rp 990.000',
    priceNote: 'per peserta (Min. 10 - 25 orang)',
    image: tourBus,
    description:
      'Nikmati sejuknya udara pegunungan Lembang berpadu dengan pesona sejarah dan kekayaan kuliner khas Priangan Jawa Barat.',
    itinerary: [
      {
        day: 1,
        title: 'Pesona Alam Lembang & Wisata Rekreasi Keluarga',
        activities: [
          'Penjemputan di Stasiun KCIC Padalarang / Stasiun Bandung / Bandara',
          'Menuju Tangkuban Perahu menyaksikan kawah vulkanik legendaris',
          'Makan siang kuliner Sunda di Saung Punclut',
          'Mengunjungi Floating Market Lembang berbelanja jajanan tradisional di perahu',
          'Check-in hotel di Bandung, jalan santai di Jalan Braga malam hari',
        ],
      },
      {
        day: 2,
        title: 'Farmhouse, Cihampelas & Belanja Kartika Sari',
        activities: [
          'Sarapan pagi di hotel',
          'Mengunjungi Farmhouse Susu Lembang & berfoto kostum Eropa',
          'Belanja oleh-oleh legendaris Pisang Bollen Kartika Sari',
          'Makan siang kuliner Bandung',
          'Pengantaran kembali ke stasiun/meeting point',
        ],
      },
    ],
    included: [
      'Transportasi Pariwisata AC selama program',
      '1 Malam menginap di hotel pilihan',
      'Makan sesuai program',
      'Tiket masuk seluruh wisata tertera',
      'Driver cum tour guide ramah',
    ],
    excluded: ['Pengeluaran pribadi peserta'],
    recommendedPax: '10 - 30 Orang',
  },
];

export const WHY_CHOOSE_US = [
  {
    number: '01',
    title: 'Profesional',
    description:
      'Kami mengutamakan pelayanan yang profesional dalam setiap perjalanan. Didukung tim manajemen berpengalaman, tour leader bersertifikasi, serta pengemudi yang disiplin dan menguasai rute wisata dengan aman.',
  },
  {
    number: '02',
    title: 'Terencana',
    description:
      'Setiap perjalanan dipersiapkan dengan memperhatikan kebutuhan dan kenyamanan pelanggan. Penyusunan itinerary yang realistis, jadwal teratur tanpa tergesa-gesa, serta manajemen logistik yang rapi.',
  },
  {
    number: '03',
    title: 'Fleksibel',
    description:
      'Paket perjalanan dapat disesuaikan dengan kebutuhan, preferensi destinasi, dan alokasi anggaran Anda. Mulai dari trip hemat berkualitas hingga layanan eksekutif VIP bernuansa premium.',
  },
  {
    number: '04',
    title: 'Mitra Terpercaya',
    description:
      'Didukung jaringan kemitraan solid dengan operator transportasi resmi terawat, ratusan jaringan hotel berbintang, pengelola destinasi wisata nasional, dan penyedia katering kuliner higienis.',
  },
  {
    number: '05',
    title: 'Pelayanan Responsif',
    description:
      'Tim customer care kami siap membantu pelanggan sebelum perjalanan (konsultasi & perancangan), selama di lapangan (pendampingan aktif), hingga purna-perjalanan untuk evaluasi kepuasan.',
  },
];

export const BOOKING_STEPS = [
  {
    step: '01',
    title: 'Konsultasi',
    description:
      'Hubungi tim Fajar Karya Wisata dan sampaikan kebutuhan perjalanan Anda, termasuk destinasi impian, estimasi tanggal, dan jumlah peserta.',
  },
  {
    step: '02',
    title: 'Pilih Paket',
    description:
      'Pilih paket yang telah kami rancang atau konsultasikan kebutuhan custom trip agar rute dan fasilitas dapat diatur secara spesifik.',
  },
  {
    step: '03',
    title: 'Penyusunan Perjalanan',
    description:
      'Kami membantu menyesuaikan itinerary, pemilihan jenis armada transportasi, kelas akomodasi, katering, serta fasilitas pendukung lainnya.',
  },
  {
    step: '04',
    title: 'Konfirmasi Pemesanan',
    description:
      'Lakukan konfirmasi pemesanan dan proses administrasi pembayaran sesuai kesepakatan transparan dengan bukti invoice resmi.',
  },
  {
    step: '05',
    title: 'Berangkat & Nikmati Perjalanan',
    description:
      'Kami siap mengawal dan memastikan seluruh rangkaian perjalanan Anda berjalan lancar, aman, nyaman, dan penuh kesan mendalam.',
  },
];

export const DESTINATIONS_DATA: DestinationRegion[] = [
  {
    id: 'jawa-timur',
    name: 'Jawa Timur',
    cities: ['Malang', 'Batu', 'Bromo', 'Surabaya', 'Banyuwangi'],
    badge: 'Destinasi Utama Unggulan',
    description:
      'Kombinasi sempurna antara udara sejuk pegunungan Kota Batu, kemegahan sunrise kaldera Bromo, pesona api biru Kawah Ijen, hingga wisata modern dan kuliner khas Jawa Timur.',
    featuredSpots: ['Kaldera Bromo & Penanjakan', 'Jatim Park 1-3 & Museum Angkut', 'Kawah Ijen Blue Fire', 'Savana Baluran', 'Kayutangan Heritage'],
    bestSeason: 'Sepanjang tahun (Kemarau Mei - Oktober untuk Bromo & Ijen)',
    image: heroBromo,
  },
  {
    id: 'jawa-tengah-diy',
    name: 'Jawa Tengah & Yogyakarta',
    cities: ['Yogyakarta', 'Semarang', 'Solo', 'Magelang'],
    badge: 'Pusat Budaya & Sejarah',
    description:
      'Warisan adiluhung candi-candi megah dunia (Borobudur & Prambanan), kehangatan budaya keraton Mataram, seni batik Solo, dan arsitektur bersejarah Lawang Sewu Semarang.',
    featuredSpots: ['Candi Borobudur & Prambanan', 'Keraton & Tamansari Yogya', 'Jalan Malioboro', 'Candi Sukuh & Solo', 'Lawang Sewu & Kota Lama'],
    bestSeason: 'Ideal untuk study tour sekolah dan liburan keluarga',
    image: studyTour,
  },
  {
    id: 'jawa-barat',
    name: 'Jawa Barat',
    cities: ['Bandung', 'Bogor', 'Puncak'],
    badge: 'Pesona Alam Priangan',
    description:
      'Kesejukan dataran tinggi bumi Pasundan dengan pemandangan kebun teh asri, kawah belerang Tangkuban Perahu, rekreasi keluarga Lembang, dan sentra mode serta kuliner.',
    featuredSpots: ['Kawah Tangkuban Perahu', 'Floating Market & Farmhouse', 'Kebun Raya Bogor & Istana', 'Kawasan Agrowisata Gunung Mas Puncak'],
    bestSeason: 'Sangat cocok untuk akhir pekan dan family gathering',
    image: tourBus,
  },
  {
    id: 'destinasi-lainnya',
    name: 'Destinasi Lainnya',
    cities: ['Bali', 'Lombok', 'Labuan Bajo', 'Karimunjawa'],
    badge: 'Jelajah Nusantara',
    description:
      'Tersedia berbagai pilihan destinasi eksotis kepulauan nusantara sesuai kebutuhan khusus rombongan Anda, lengkap dengan tiket penerbangan dan manajemen akomodasi.',
    featuredSpots: ['Pantai Kuta & Uluwatu Bali', 'Gili Trawangan Lombok', 'Taman Nasional Komodo', 'Kepulauan Karimunjawa'],
    bestSeason: 'Sesuai permintaan dan reservasi rombongan khusus',
    image: familyBatu,
  },
];

export const PROMOS_DATA: PromoItem[] = [
  {
    id: 'promo-study-priority',
    title: 'Early Bird Study Tour Sekolah',
    code: 'STUDYPRIORITY',
    discount: 'Diskon Spesial Rombongan s.d 15%',
    validUntil: '31 Desember 2026',
    description:
      'Dapatkan potongan harga khusus untuk rombongan sekolah minimal 40 siswa. Termasuk bonus gratis spanduk banner, kaos pendamping, dan asuransi rombongan.',
    terms: [
      'Berlaku untuk pemesanan minimal 40 peserta / 1 bus besar',
      'Termasuk free 2 orang guru pendamping',
      'Reservasi minimal 30 hari sebelum jadwal keberangkatan',
    ],
    badge: 'Paling Populer Sekolah',
  },
  {
    id: 'promo-gathering-corp',
    title: 'Corporate Gathering & Fun Games',
    code: 'CORPGATHER',
    discount: 'Free Instruktur Games & Video Drone',
    validUntil: 'Sepanjang Tahun 2026',
    description:
      'Tingkatkan soliditas tim kerja Anda di Bromo atau Batu Malang. Dapatkan fasilitas instruktur ice-breaking dan dokumentasi sinematik gratis.',
    terms: [
      'Minimal rombongan 30 orang instansi/perusahaan',
      'Termasuk master sound system portabel dan perlengkapan games',
      'Dapat digabungkan dengan paket akomodasi bintang 3 atau 4',
    ],
    badge: 'Penawaran Instansi',
  },
  {
    id: 'promo-family-hemat',
    title: 'Paket Liburan Keluarga Hemat',
    code: 'KELUARGAHEMAT',
    discount: 'Cashback Rp 500.000 / Booking',
    validUntil: '30 November 2026',
    description:
      'Nikmati kenyamanan liburan privat bersama keluarga di Malang-Batu atau Bandung dengan kendaraan eksklusif Innova/HiAce Luxury.',
    terms: [
      'Berlaku untuk paket wisata keluarga minimal 6 peserta',
      'Pemesanan paket 3D2N atau lebih',
      'Klaim kode saat konsultasi dengan customer service kami',
    ],
    badge: 'Khusus Keluarga',
  },
];

export const GALLERY_DATA: GalleryPhoto[] = [
  {
    id: 'gal-1',
    title: 'Sunrise Megah Kaldera Bromo',
    category: 'alam',
    categoryLabel: 'Destinasi & Alam',
    location: 'Taman Nasional Bromo Tengger Semeru',
    image: heroBromo,
    caption: 'Momen keemasan matahari terbit bersama armada jeep rombongan PT Fajar Karya Wisata.',
  },
  {
    id: 'gal-2',
    title: 'Armada Bus Pariwisata Eksekutif',
    category: 'armada',
    categoryLabel: 'Armada Bus & Transport',
    location: 'Jawa Timur & Jalur Wisata',
    image: tourBus,
    caption: 'Kesiapan armada bus eksekutif terawat, kabin higienis ber-AC dingin dengan fasilitas lengkap.',
  },
  {
    id: 'gal-3',
    title: 'Keceriaan Siswa Eduwisata & Study Tour',
    category: 'study-tour',
    categoryLabel: 'Study Tour Sekolah',
    location: 'Kompleks Budaya Candi & Edukasi',
    image: studyTour,
    caption: 'Rombongan pelajar menikmati pembelajaran sejarah di luar kelas dengan aman dan penuh antusias.',
  },
  {
    id: 'gal-4',
    title: 'Kebersamaan Liburan Keluarga di Batu',
    category: 'gathering',
    categoryLabel: 'Family & Gathering',
    location: 'Resort & Perbukitan Sejuk Kota Batu',
    image: familyBatu,
    caption: 'Senyum hangat kebersamaan keluarga menikmati sejuknya alam dan kebun buah di Kota Wisata Batu.',
  },
];

export const TESTIMONIALS_DATA: TestimonialItem[] = [
  {
    id: 'testi-1',
    name: 'Drs. H. Bambang Sudiro, M.Pd',
    role: 'Wakil Kepala Sekolah Bidang Kesiswaan',
    organization: 'SMAN 1 Favorit Jawa Timur',
    quote:
      'Pelayanannya sangat membantu dan perjalanan menjadi lebih terencana. Study tour siswa kami di Yogyakarta berjalan tertib, busnya sangat prima, dan tim pendamping dari Fajar Karya Wisata sangat sabar dan menguasai lapangan.',
    tripType: 'Study Tour 4 Bus (185 Siswa)',
    destination: 'Yogyakarta & Magelang',
    rating: 5,
    date: 'September 2026',
  },
  {
    id: 'testi-2',
    name: 'Dian Anggraini, S.E',
    role: 'HR & GA Manager',
    organization: 'PT Mitra Nusa Mandiri',
    quote:
      'Proses pemesanan mudah dan tim responsif. Family gathering perusahaan kami ke Bromo dan Malang puas sekali. Jadwal tepat waktu, makanannya enak dan berlimpah, hotelnya nyaman, dan sesi dokumentasi videonya keren sekali.',
    tripType: 'Corporate Gathering (65 Peserta)',
    destination: 'Bromo Sunrise & Batu Malang',
    rating: 5,
    date: 'Agustus 2026',
  },
  {
    id: 'testi-3',
    name: 'Hendra Wijaya & Keluarga',
    role: 'Kepala Keluarga',
    organization: 'Wisatawan Mandiri Jakarta',
    quote:
      'Paket wisatanya fleksibel dan bisa disesuaikan dengan kebutuhan rombongan keluarga besar kami yang membawa anak-anak dan orang tua. Driver sangat santun, paham jalan tembus tanpa macet, dan sangat helpful.',
    tripType: 'Paket Wisata Keluarga Privat',
    destination: 'Malang - Batu 3D2N',
    rating: 5,
    date: 'Juli 2026',
  },
];
