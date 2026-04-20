export const profile = {
  name: "Rifki",
  title: "Jasa Pemrograman Profesional",
  subtitle: "Website | Dashboard | Tugas IT | Skripsi",
  description:
    "Butuh website, dashboard, atau bantuan tugas pemrograman? Saya siap membantu Anda dengan hasil profesional, pengerjaan cepat, dan harga terjangkau. Konsultasi gratis!",
  status: "Mahasiswa S1 Informatika",
  location: "Indonesia",
  email: "rifkifka@gmail.com",
  phone: "+62 821-5997-8151",
  social: {
    github: "https://github.com/RifkiFahrezi86",
    instagram: "https://www.instagram.com/rifki_ahmadfahrezi/",
  },
  stats: {
    projects: "50+",
    clients: "30+",
    rating: "4.9/5",
    experience: "2+",
  },
  operationalHours: "Senin - Sabtu, 09:00 - 22:00 WIB",
  responseTime: "< 1 jam di jam kerja",
};

export const experiences = [
  {
    role: "Fullstack Developer",
    period: "2024 - Sekarang",
    company: "Freelance",
    description:
      "Membangun berbagai aplikasi web untuk klien meliputi dashboard system, platform e-commerce, dan sistem manajemen data menggunakan React.js, Next.js, Node.js, dan MongoDB.",
  },
  {
    role: "Fullstack Web Developer",
    period: "2025 - 2026",
    company: "Project - E-Office Dinas Pendidikan",
    description:
      "Mengembangkan sistem arsip surat digital (E-Office) untuk Dinas Pendidikan Kab. Bandung Barat menggunakan Laravel 12, MySQL, dengan fitur manajemen surat, disposisi, pemberkasan, dan dashboard analytics.",
  },
  {
    role: "Fullstack Web Developer",
    period: "2024",
    company: "Project - Platform Produk Digital",
    description:
      "Mengembangkan platform e-commerce untuk penjualan produk digital dengan fitur katalog, checkout, payment integration, dan dashboard admin.",
  },
  {
    role: "Fullstack Web Developer",
    period: "2024",
    company: "Project - Dashboard Persediaan Barang",
    description:
      "Membangun sistem dashboard inventori dengan fitur CRUD, laporan stok, monitoring real-time, autentikasi, dan export data.",
  },
  {
    role: "Mahasiswa S1 Informatika",
    period: "2022 - Sekarang",
    company: "Universitas",
    description:
      "Menempuh pendidikan S1 Informatika dengan fokus pada Pemrograman Web, Basis Data, Rekayasa Perangkat Lunak, dan Algoritma.",
  },
];

export const techStack = [
  { name: "React.js", level: "Mahir" },
  { name: "Next.js", level: "Mahir" },
  { name: "Laravel", level: "Mahir" },
  { name: "Node.js", level: "Mahir" },
  { name: "Express.js", level: "Mahir" },
  { name: "MongoDB", level: "Mahir" },
  { name: "MySQL", level: "Mahir" },
  { name: "Tailwind CSS", level: "Mahir" },
  { name: "JavaScript", level: "Mahir" },
  { name: "PHP", level: "Mahir" },
  { name: "REST API", level: "Mahir" },
  { name: "HTML5", level: "Mahir" },
  { name: "CSS3", level: "Mahir" },
  { name: "Git", level: "Mahir" },
];

export const certificates = [
  {
    title: "Next.js Dashboard App",
    issuer: "Vercel / Next.js Official Course",
    date: "2024",
    image: "/certificates/nextjs-dashboard.pdf",
    credential: "Verified",
  },
  {
    title: "Web Development Bootcamp",
    issuer: "Online Bootcamp",
    date: "2024",
    image: null,
    credential: "Completed",
  },
  {
    title: "JavaScript & React Development",
    issuer: "Online Course Platform",
    date: "2024",
    image: null,
    credential: "Completed",
  },
  {
    title: "Database Management System",
    issuer: "Universitas - Mata Kuliah",
    date: "2023",
    image: null,
    credential: "Lulus",
  },
];

export const projects = [
  {
    title: "E-Office — Sistem Arsip Surat Digital",
    description:
      "Aplikasi manajemen surat dan arsip digital untuk Dinas Pendidikan Kab. Bandung Barat. Mendukung pengelolaan surat masuk/keluar, disposisi, agenda kegiatan, pemberkasan, dan download arsip.",
    tech: ["Laravel 12", "MySQL", "Bootstrap", "Chart.js", "FPDF"],
    image: "/projects/eoffice.png",
    github: "https://github.com/RifkiFahrezi86",
    demo: "https://e-office-arsip-surat.vercel.app/",
    features: [
      "Dashboard Analytics",
      "Surat Masuk/Keluar",
      "Disposisi Surat",
      "Pemberkasan",
      "5 Level Role",
      "Export PDF/Excel",
    ],
    clientType: "client",
    clientName: "Dinas Pendidikan KBB",
    duration: "30 hari",
    category: "dashboard",
  },
  {
    title: "ZoGaming — Platform Steam Sharing",
    description:
      "Platform gaming e-commerce untuk penjualan akun Steam sharing original. Dilengkapi katalog game, filter platform (PC/PS5/Xbox), trending games, dan sistem checkout via WhatsApp.",
    tech: ["Next.js", "React.js", "Tailwind CSS", "REST API"],
    image: "/projects/zogaming.png",
    github: "https://github.com/RifkiFahrezi86",
    demo: "https://zogaming.vercel.app/",
    features: [
      "Katalog Game",
      "Filter Platform",
      "Keranjang Belanja",
      "Trending & Popular",
      "Admin Dashboard",
    ],
    clientType: "client",
    clientName: "ZoGaming Store",
    duration: "14 hari",
    category: "website",
  },
  {
    title: "CodeHelp — Jasa IT & Pemrograman",
    description:
      "Website jasa pembuatan website, mobile app, tugas pemrograman, dan skripsi IT. Dengan fitur order form, tracking proyek, paket harga, dan testimoni klien.",
    tech: ["Next.js", "React.js", "Tailwind CSS", "REST API"],
    image: "/projects/codehelp.png",
    github: "https://github.com/RifkiFahrezi86",
    demo: "https://website-joki.vercel.app/",
    features: [
      "Order Form",
      "Tracking Proyek",
      "Paket Harga",
      "Testimoni",
      "WhatsApp Integration",
    ],
    clientType: "personal",
    clientName: null,
    duration: "7 hari",
    category: "website",
  },
  {
    title: "KomikVerse — Platform Baca Komik",
    description:
      "Platform baca komik online mendukung Manhwa, Manga, dan Manhua. Dilengkapi fitur bookmark, ranking, filter genre, dan update chapter terbaru.",
    tech: ["Next.js", "React.js", "Tailwind CSS", "REST API"],
    image: "/projects/komikverse.png",
    github: "https://github.com/RifkiFahrezi86",
    demo: "https://komikverse-swart.vercel.app/",
    features: [
      "Baca Komik Online",
      "Bookmark",
      "Ranking",
      "Filter Genre",
      "Update Terbaru",
    ],
    clientType: "personal",
    clientName: null,
    duration: "10 hari",
    category: "website",
  },
  {
    title: "Dashboard Gudang Barang",
    description:
      "Sistem dashboard inventori gudang dengan fitur manajemen barang masuk/keluar, laporan stok real-time, manajemen user, dan monitoring batas minimum stok.",
    tech: ["Next.js", "Node.js", "MongoDB", "REST API"],
    image: "/projects/gudang.png",
    github: "https://github.com/RifkiFahrezi86",
    demo: "https://dashboard-gudang-barang.vercel.app/",
    features: [
      "CRUD Barang",
      "Barang Masuk/Keluar",
      "Laporan Stok",
      "Alert Stok Minimum",
      "Manajemen User",
    ],
    clientType: "client",
    clientName: "Client Bisnis",
    duration: "14 hari",
    category: "dashboard",
  },
  {
    title: "Customer Portal Gudang Barang",
    description:
      "Portal customer untuk sistem gudang barang. Customer dapat melihat katalog barang, melakukan pemesanan, dan tracking status pesanan.",
    tech: ["Next.js", "Node.js", "MongoDB", "REST API"],
    image: "/projects/customer-barang.png",
    github: "https://github.com/RifkiFahrezi86",
    demo: "https://customer-barang.vercel.app/",
    features: [
      "Katalog Barang",
      "Pemesanan",
      "Tracking Pesanan",
      "Portal Customer",
    ],
    clientType: "client",
    clientName: "Client Bisnis",
    duration: "10 hari",
    category: "dashboard",
  },
  {
    title: "SmartSchedule — Jadwal Belajar",
    description:
      "Aplikasi manajemen jadwal belajar untuk mahasiswa. Kelola waktu belajar secara efisien dengan fitur penjadwalan, reminder, dan tracking progress.",
    tech: ["Next.js", "React.js", "Tailwind CSS", "MongoDB"],
    image: "/projects/smartschedule.png",
    github: "https://github.com/RifkiFahrezi86",
    demo: "https://smart-schedule-dusky.vercel.app/",
    features: [
      "Jadwal Belajar",
      "Reminder",
      "Tracking Progress",
      "Multi User",
    ],
    clientType: "personal",
    clientName: null,
    duration: "7 hari",
    category: "website",
  },
  {
    title: "SmartSchedule 2 — Jadwal Belajar V2",
    description:
      "Versi kedua aplikasi SmartSchedule dengan sistem autentikasi login, manajemen jadwal belajar yang lebih lengkap, dan antarmuka yang diperbarui untuk pengalaman pengguna yang lebih baik.",
    tech: ["Next.js", "React.js", "Tailwind CSS", "MongoDB"],
    image: "/projects/smartschedule2.png",
    github: "https://github.com/RifkiFahrezi86",
    demo: "https://smart-schedule2.vercel.app/",
    features: [
      "Login & Autentikasi",
      "Jadwal Belajar",
      "Reminder",
      "Tracking Progress",
      "Multi User",
    ],
    clientType: "personal",
    clientName: null,
    duration: "7 hari",
    category: "website",
  },
  {
    title: "SmartSchedule 3 — Jadwal Belajar V3",
    description:
      "Versi ketiga SmartSchedule dengan fitur dashboard analytics, perencanaan harian/mingguan/bulanan, kalender interaktif, dan tracking jam belajar serta progress mingguan.",
    tech: ["Next.js", "React.js", "Tailwind CSS", "MongoDB"],
    image: "/projects/smartschedule3.png",
    github: "https://github.com/RifkiFahrezi86",
    demo: "https://smart-schedule3.vercel.app/",
    features: [
      "Dashboard Analytics",
      "Jadwal Harian/Mingguan/Bulanan",
      "Kalender Interaktif",
      "Tracking Jam Belajar",
      "Progress Mingguan",
    ],
    clientType: "personal",
    clientName: null,
    duration: "7 hari",
    category: "website",
  },
  {
    title: "Poster Perkembangan Manusia — Final Team",
    description:
      "Poster tugas kuliah mata kuliah pertumbuhan dan perkembangan fisik, membahas fase perkembangan manusia dari bayi hingga lansia dengan visual infografis dan ringkasan tiap tahap.",
    tech: ["HTML", "CSS", "JavaScript", "html2canvas"],
    image: "/projects/akademik/poster-nur-arslan.jpg",
    github: null,
    demo: "/projects/akademik/poster-nur-arslan.jpg",
    features: [
      "Infografis Tahap Usia",
      "Penjelasan Tiap Fase",
      "Export JPG/PNG",
      "Layout Presentasi",
    ],
    clientType: "client",
    clientName: "Client Akademik",
    duration: "1 hari",
    category: "academic",
  },
  {
    title: "Poster Team Variant C",
    description:
      "Versi poster ilustratif untuk memperkuat pemahaman fase perkembangan manusia menggunakan ikon dan warna per tahap.",
    tech: ["Canva", "Illustration", "Visual Communication"],
    image: "/projects/akademik/poster-team-3.jpeg",
    github: null,
    demo: null,
    features: [
      "Ilustrasi Per Tahap",
      "Warna Kategori Usia",
      "Kesimpulan Materi",
    ],
    clientType: "client",
    clientName: "Client Akademik",
    duration: "1 hari",
    category: "academic",
  },
];

export const services = [
  {
    iconName: "Globe",
    title: "Website Development",
    description: "Pembuatan website company profile, landing page, portfolio, dan web app custom sesuai kebutuhan bisnis Anda.",
    features: ["Responsive Design", "SEO Friendly", "Panduan Hosting", "Domain Custom"],
    estimasi: "3-7 hari",
    startPrice: "Rp 500.000",
  },
  {
    iconName: "LayoutDashboard",
    title: "Dashboard & Sistem Informasi",
    description: "Sistem dashboard manajemen lengkap dengan fitur CRUD, chart analytics, export data, dan role management.",
    features: ["CRUD Lengkap", "Chart & Analytics", "Export PDF/Excel", "Role Management"],
    estimasi: "7-14 hari",
    startPrice: "Rp 1.500.000",
  },
  {
    iconName: "GraduationCap",
    title: "Tugas & Skripsi IT",
    description: "Bantuan pengerjaan tugas pemrograman, project akhir, dan skripsi IT. Termasuk source code, penjelasan, dan bimbingan.",
    features: ["Source Code Lengkap", "Penjelasan Detail", "Revisi Gratis", "Bimbingan"],
    estimasi: "1-7 hari",
    startPrice: "Rp 150.000",
    highlight: true,
  },
  {
    iconName: "Smartphone",
    title: "Mobile App",
    description: "Pengembangan aplikasi mobile cross-platform dengan React Native untuk Android dan iOS.",
    features: ["Android & iOS", "API Integration", "Push Notification", "UI/UX Modern"],
    estimasi: "7-21 hari",
    startPrice: "Rp 2.000.000",
  },
  {
    iconName: "Server",
    title: "Backend & API",
    description: "Pembuatan REST API, database design, dan backend system yang scalable dan aman.",
    features: ["REST API", "Database Design", "Authentication", "Dokumentasi API"],
    estimasi: "3-10 hari",
    startPrice: "Rp 800.000",
  },
  {
    iconName: "Bug",
    title: "Bug Fixing & Maintenance",
    description: "Debugging, perbaikan error, optimasi performa, dan maintenance aplikasi web Anda.",
    features: ["Debugging", "Optimasi Performa", "Update Fitur", "Support Teknis"],
    estimasi: "1-3 hari",
    startPrice: "Rp 100.000",
  },
];

export const howItWorks = [
  {
    step: 1,
    title: "Konsultasi Gratis",
    description: "Ceritakan kebutuhan Anda via WhatsApp. Gratis konsultasi, tanpa commitment.",
    iconName: "MessageCircle",
  },
  {
    step: 2,
    title: "Penawaran & Deal",
    description: "Saya buatkan estimasi harga, timeline, dan scope pekerjaan. Deal? Kita mulai.",
    iconName: "FileText",
  },
  {
    step: 3,
    title: "Pengerjaan",
    description: "Saya kerjakan dengan update progress berkala. Anda bisa pantau dan request perubahan.",
    iconName: "Code",
  },
  {
    step: 4,
    title: "Selesai & Revisi",
    description: "Project selesai, source code diserahkan. Free revisi sesuai kesepakatan.",
    iconName: "CheckCircle",
  },
];

export const testimonials = [
  {
    name: "Ahmad R.",
    project: "Tugas Web Programming",
    rating: 5,
    text: "Pengerjaan cepat dan rapi. Source codenya bersih dan dikasih penjelasan juga. Sangat recommended!",
    date: "Maret 2025",
  },
  {
    name: "Rina A.",
    project: "Website Company Profile",
    rating: 5,
    text: "Website company profile saya jadi bagus banget. Responsive dan cepat loadingnya. Terima kasih banyak!",
    date: "Februari 2025",
  },
  {
    name: "Dimas P.",
    project: "Dashboard Inventory",
    rating: 5,
    text: "Dashboard inventory-nya lengkap banget. Ada export PDF, chart analytics, semuanya sesuai request. Mantap!",
    date: "Januari 2025",
  },
  {
    name: "Siti N.",
    project: "Skripsi Sistem Informasi",
    rating: 5,
    text: "Dibantu dari awal sampai akhir. Penjelasannya detail, jadi pas sidang bisa jawab pertanyaan dosen. Top!",
    date: "Desember 2024",
  },
  {
    name: "Budi W.",
    project: "E-Commerce Platform",
    rating: 5,
    text: "Platform e-commerce saya jadi profesional. Fitur lengkap, dari katalog sampai checkout. Harga worth it!",
    date: "November 2024",
  },
  {
    name: "Maya L.",
    project: "Tugas Database",
    rating: 5,
    text: "Tugas database selesai dalam 2 hari. Hasilnya rapi dan dapat nilai A. Pasti order lagi!",
    date: "Oktober 2024",
  },
];

export const pricing = [
  {
    name: "Basic",
    description: "Tugas Pemrograman",
    price: "Rp 150.000",
    prefix: "Mulai dari",
    features: [
      "Source code lengkap",
      "Penjelasan & komentar kode",
      "1x revisi gratis",
      "Pengerjaan 1-3 hari",
      "Support via WhatsApp",
    ],
    popular: false,
  },
  {
    name: "Standard",
    description: "Website / Landing Page",
    price: "Rp 500.000",
    prefix: "Mulai dari",
    features: [
      "Semua fitur Basic",
      "Responsive design",
      "SEO basic optimization",
      "2x revisi gratis",
      "Pengerjaan 3-7 hari",
      "Free konsultasi desain",
    ],
    popular: true,
  },
  {
    name: "Premium",
    description: "Sistem Informasi / Dashboard",
    price: "Rp 1.500.000",
    prefix: "Mulai dari",
    features: [
      "Semua fitur Standard",
      "Dashboard admin lengkap",
      "Role management",
      "Export PDF/Excel",
      "3x revisi gratis",
      "Pengerjaan 7-14 hari",
      "Garansi bug fix 7 hari",
    ],
    popular: false,
  },
];

export const faq = [
  {
    question: "Berapa lama pengerjaan?",
    answer:
      "Tergantung kompleksitas project. Tugas sederhana 1-3 hari, website 3-7 hari, sistem informasi/dashboard 7-14 hari. Timeline pasti akan dikonfirmasi setelah konsultasi.",
  },
  {
    question: "Apakah bisa revisi?",
    answer:
      "Ya! Setiap paket sudah include revisi gratis. Jumlah revisi tergantung paket yang dipilih. Revisi tambahan bisa didiskusikan dengan biaya yang sangat terjangkau.",
  },
  {
    question: "Apakah source code diberikan?",
    answer:
      "Ya, 100% source code menjadi milik Anda. Saya juga akan memberikan panduan singkat cara menjalankan dan deploy project.",
  },
  {
    question: "Bagaimana cara pembayaran?",
    answer:
      "Transfer bank (BCA/Mandiri), e-wallet (Dana/OVO/GoPay). Sistem pembayaran: DP 50% di awal, sisanya setelah project selesai dan Anda puas.",
  },
  {
    question: "Apakah ada garansi?",
    answer:
      "Ya, garansi bug fix gratis 7 hari setelah project selesai. Jika ada error atau bug yang ditemukan, akan saya perbaiki tanpa biaya tambahan.",
  },
  {
    question: "Bisa konsultasi dulu sebelum order?",
    answer:
      "Tentu! Konsultasi via WhatsApp 100% gratis tanpa commitment. Silakan ceritakan kebutuhan Anda, saya akan berikan estimasi harga dan timeline.",
  },
  {
    question: "Apakah data saya aman?",
    answer:
      "Absolutely. Semua data dan source code dijaga kerahasiaannya. Saya tidak akan membagikan atau menggunakan project Anda untuk keperluan lain.",
  },
  {
    question: "Teknologi apa yang dipakai?",
    answer:
      "React.js, Next.js, Laravel, Node.js, MongoDB, MySQL, Tailwind CSS, dan lainnya. Teknologi dipilih sesuai kebutuhan project untuk hasil terbaik.",
  },
];
