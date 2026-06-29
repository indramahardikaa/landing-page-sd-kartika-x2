import { PrismaClient } from '@prisma/client'
import * as bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  // Create admin user
  const adminPassword = await bcrypt.hash('admin123', 10)
  const admin = await prisma.user.upsert({
    where: { email: 'admin@sdkartikax2.sch.id' },
    update: {},
    create: {
      name: 'Administrator',
      email: 'admin@sdkartikax2.sch.id',
      password: adminPassword,
      role: 'admin',
    },
  })

  // Create guru user
  const guruPassword = await bcrypt.hash('guru123', 10)
  const guru = await prisma.user.upsert({
    where: { email: 'guru@sdkartikax2.sch.id' },
    update: {},
    create: {
      name: 'L. Femmy Saroinsong',
      email: 'guru@sdkartikax2.sch.id',
      password: guruPassword,
      role: 'guru',
    },
  })

  // Create staff data
  const staffData = [
    { name: 'L. Femmy Saroinsong, S.Pd.', position: 'Kepala Sekolah', category: 'guru', order: 1, quote: 'Sebagai pemimpin pendidikan, peran kita bukan sekadar mengatur, tetapi menjadi panutan' },
    { name: 'Wahyudi, S.Pd.', position: 'Wakil Kepala Sekolah / Wali Kelas VI A', category: 'guru', order: 2, quote: 'Pendidikan adalah lentera yang menerangi jalan menuju masa depan' },
    { name: 'Samadi, S.Pd.', position: 'Guru Kelas / Wali Kelas II A', category: 'guru', order: 3 },
    { name: 'Achmad Sjaefudin, S.Pd.', position: 'Guru PJOK Kelas IV, V, VI', category: 'guru', order: 4 },
    { name: 'H. Bahrudin, S.Pdi.', position: 'Guru PAIPB Kelas I, II, III', category: 'guru', order: 5 },
    { name: 'Siti Munawaroh, S.Pd.', position: 'Guru Kelas / Wali Kelas III B', category: 'guru', order: 6, quote: 'Guru adalah awal dari segala pencapaian besar' },
    { name: 'Pujiningsih, S.Pd.', position: 'Guru Kelas / Wali Kelas VI B', category: 'guru', order: 7 },
    { name: 'Imaniah, S.Pd.', position: 'Guru Kelas / Wali Kelas V B', category: 'guru', order: 8 },
    { name: 'Rono Junaedi, S.Pd.', position: 'Guru PJOK Kelas I, II, III', category: 'guru', order: 9 },
    { name: 'Titik Hardini, S.Pd.', position: 'Guru Kelas / Wali Kelas II B', category: 'guru', order: 10 },

    { name: 'Agus Wibowo, S.Pd.', position: 'Guru Kelas V', category: 'guru', order: 11 },
    { name: 'Dyah Ayu Wulansari, S.Pd.', position: 'Guru Kelas / Wali Kelas I B', category: 'guru', order: 12 },
    { name: 'Damai P. Sandroto, S.Th', position: 'Guru PAKPB Kelas I - VI', category: 'guru', order: 13 },
    { name: 'Irma Indriyani, S.Pd.', position: 'Guru Kelas / Wali Kelas IV B', category: 'guru', order: 14 },
    { name: "Siti Su'udah, S.Pdi.", position: 'Guru Agama Islam Kelas IV, V, VI', category: 'guru', order: 15 },
    { name: 'Astri Theodora W, S.Pd.', position: 'Guru Kelas / Wali Kelas III A', category: 'guru', order: 16 },
    { name: 'Mulyati, M.Pd. S.Pd.', position: 'Guru Kelas / Wali Kelas I A', category: 'guru', order: 17 },
    { name: 'Dimas Gilang Pangestu', position: 'Guru Kelas / Wali Kelas IV A', category: 'guru', order: 18 },
    { name: 'Kushestiningtyas Novita, S.E', position: 'Guru Komputer Kelas I - VI', category: 'guru', order: 19 },
    { name: 'Ani Esti Priyani, A.Md', position: 'Bendahara', category: 'staff', order: 20 },
    { name: 'Zul Fakhri Rasyid', position: 'Operator', category: 'staff', order: 21 },
    { name: 'Sujati', position: 'Karyawan', category: 'staff', order: 22 },
    { name: 'Hartoyo', position: 'Karyawan', category: 'staff', order: 23 },
    { name: 'Slamet', position: 'Karyawan', category: 'staff', order: 24 },
    { name: 'Haji Amir', position: 'Keamanan', category: 'staff', order: 25 },
  ]

  for (const s of staffData) {
    await prisma.staff.create({ data: s })
  }

  // Create facilities
  const facilities = [
    { name: 'Ruang Kelas', description: 'Ruang kelas yang nyaman dan kondusif untuk kegiatan belajar mengajar.' },
    { name: 'Perpustakaan', description: 'Perpustakaan lengkap dengan koleksi buku untuk menunjang literasi siswa.' },
    { name: 'Musholla', description: 'Tempat ibadah yang bersih dan nyaman untuk seluruh warga sekolah.' },
    { name: 'Lapangan Olahraga', description: 'Lapangan yang luas untuk kegiatan olahraga dan upacara.' },
    { name: 'Ruang Guru', description: 'Tempat para guru beristirahat dan melakukan persiapan mengajar.' },
    { name: 'Ruang Tata Usaha', description: 'Tempat pengelolaan administrasi sekolah.' },
    { name: 'Kantin', description: 'Kantin sekolah yang menyediakan makanan sehat dan bergizi.' },
    { name: 'Ruang Komputer', description: 'Laboratorium komputer untuk pembelajaran TIK.' },
  ]

  for (const f of facilities) {
    await prisma.facility.create({ data: f })
  }

  // Create extracurriculars
  const extracurriculars = [
    { name: 'Hadroh', description: 'Tempat siswa belajar dan berlatih bermain alat musik Islami.' },
    { name: 'Paskibra', description: 'Pasukan Pengibar Bendera untuk melatih kedisiplinan dan nasionalisme.' },
    { name: 'Futsal', description: 'Tempat siswa belajar dan menyalurkan prestasi di bidang sepak bola.' },
    { name: 'Tari Tradisional', description: 'Ekstrakurikuler tari tradisional untuk melestarikan kebudayaan.' },
    { name: 'Pramuka', description: 'Kegiatan Praja Muda Karana untuk membentuk karakter dan kemandirian.' },
    { name: 'Gamelan', description: 'Berlatih alat musik tradisional gamelan Jawa.' },
  ]

  for (const e of extracurriculars) {
    await prisma.extracurricular.create({ data: e })
  }


  // Create news
  const newsData = [
    { title: 'Pelaksanaan Olimpiade O2SN', content: 'Olimpiade Olahraga Siswa Nasional (O2SN) adalah ajang bergengsi yang menumbuhkan semangat sportivitas dan prestasi siswa melalui kompetisi di bidang olahraga.', published: true, authorId: admin.id },
    { title: 'Peringatan Hari Kartini 2025', content: 'SD Kartika X-2 memperingati Hari Kartini dengan berbagai kegiatan edukatif yang bertema kesetaraan dan semangat belajar.', published: true, authorId: admin.id },
    { title: 'Kegiatan Literasi Sekolah', content: 'Program literasi sekolah terus berjalan dengan baik. Siswa diajak untuk gemar membaca dan menulis melalui berbagai kegiatan kreatif.', published: true, authorId: guru.id },
  ]

  for (const n of newsData) {
    await prisma.news.create({ data: n })
  }

  // Create school profile
  const profiles = [
    { key: 'visi', value: 'Terwujudnya peserta didik yang cerdas, berkarakter, beriman dan bertakwa kepada Tuhan Yang Maha Esa, serta cinta lingkungan dan bangsa.' },
    { key: 'misi', value: JSON.stringify([
      'Menyelenggarakan pendidikan yang berkualitas dan menyenangkan',
      'Menanamkan nilai-nilai keimanan dan ketakwaan dalam setiap aktivitas',
      'Mendorong peserta didik untuk aktif, kreatif, dan berpikir kritis',
      'Mengembangkan budaya disiplin, jujur, dan tanggung jawab',
      'Meningkatkan peran serta orang tua dan masyarakat',
      'Menerapkan pembelajaran berbasis lingkungan',
      'Menyediakan sarana dan prasarana yang aman dan nyaman',
      'Melaksanakan kegiatan ekstrakurikuler',
      'Menciptakan lingkungan sekolah yang bersih, hijau, dan sehat',
    ]) },
    { key: 'sejarah', value: 'SD KARTIKA X-2 didirikan sebagai bagian dari upaya Yayasan Kartika Jaya dalam mendukung pendidikan dasar yang bermutu di Indonesia.' },
    { key: 'sambutan', value: 'Selamat datang di SD KARTIKA X2, tempat di mana semangat belajar dan nilai-nilai karakter tumbuh bersama.' },
    { key: 'alamat', value: 'Jl. Flamboyan No.2 14 6 13, RT.13/RW.6, Pesanggrahan, Kec. Pesanggrahan, Kota Jakarta Selatan, DKI Jakarta 12320' },
    { key: 'telepon', value: '(021) 7362900' },
    { key: 'email', value: 'sdkartikax2@gmail.com' },
    { key: 'instagram', value: 'https://www.instagram.com/sdkartikax2' },
    { key: 'youtube', value: 'https://www.youtube.com/@sdkartikax2' },
    { key: 'tiktok', value: 'https://www.tiktok.com/@officialsdkartikax2' },
  ]

  for (const p of profiles) {
    await prisma.schoolProfile.upsert({
      where: { key: p.key },
      update: { value: p.value },
      create: p,
    })
  }


  // Create announcements
  await prisma.announcement.create({
    data: {
      title: 'Pendaftaran PPDB 2025/2026 Dibuka!',
      content: 'Pendaftaran Peserta Didik Baru untuk tahun ajaran 2025/2026 telah dibuka. Segera daftarkan putra/putri Anda.',
      isActive: true,
      priority: 'high',
      authorId: admin.id,
    },
  })

  await prisma.announcement.create({
    data: {
      title: 'Libur Akhir Semester',
      content: 'Libur akhir semester genap dimulai tanggal 21 Juni - 14 Juli 2025.',
      isActive: true,
      priority: 'normal',
      authorId: admin.id,
    },
  })

  // Create banners
  await prisma.banner.create({
    data: {
      title: 'Selamat Datang di SD KARTIKA X-2',
      subtitle: 'Cerdas, Berkarakter, Berprestasi',
      image: '/banner-hero.jpg',
      isActive: true,
      order: 1,
    },
  })

  await prisma.banner.create({
    data: {
      title: 'PPDB 2025/2026',
      subtitle: 'Pendaftaran Peserta Didik Baru',
      image: '/banner-ppdb.jpg',
      link: '/ppdb',
      isActive: true,
      order: 2,
    },
  })

  // Create menu items
  const menuItems = [
    { label: 'Beranda', href: '/', order: 1, location: 'navbar' },
    { label: 'Profil Sekolah', href: '/profil', order: 2, location: 'navbar' },
    { label: 'Guru & Staff', href: '/guru-staff', order: 3, location: 'navbar' },
    { label: 'Fasilitas', href: '/fasilitas', order: 4, location: 'navbar' },
    { label: 'Ekstrakurikuler', href: '/ekstrakurikuler', order: 5, location: 'navbar' },
    { label: 'Berita', href: '/berita', order: 6, location: 'navbar' },
    { label: 'Kontak', href: '/kontak', order: 7, location: 'navbar' },
    { label: 'E-Rapor', href: 'https://ijazah.data.kemdikbud.go.id/dasbor/help', order: 1, location: 'topbar', isExternal: true },
  ]

  for (const m of menuItems) {
    await prisma.menuItem.create({ data: m })
  }

  // Create site settings
  const siteSettings = [
    { key: 'site_name', value: 'SD KARTIKA X-2', category: 'general' },
    { key: 'site_tagline', value: 'Cerdas, Berkarakter, Berprestasi', category: 'general' },
    { key: 'primary_color', value: '#006400', category: 'appearance' },
    { key: 'secondary_color', value: '#FFD700', category: 'appearance' },
    { key: 'ppdb_active', value: 'true', category: 'ppdb' },
    { key: 'ppdb_year', value: '2025/2026', category: 'ppdb' },
  ]

  for (const s of siteSettings) {
    await prisma.siteSettings.upsert({
      where: { key: s.key },
      update: { value: s.value },
      create: s,
    })
  }

  console.log('Seed completed successfully!')
  console.log('Admin: admin@sdkartikax2.sch.id / admin123')
  console.log('Guru: guru@sdkartikax2.sch.id / guru123')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
