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
    { name: 'L. Femmy Saroinsong, S.Pd.', position: 'Kepala Sekolah', category: 'guru', order: 1, quote: 'Sebagai pemimpin pendidikan, peran kita bukan sekadar mengatur, tetapi menjadi panutan, penyemangat, dan penjaga arah perubahan yang bermakna' },
    { name: 'Wahyudi, S.Pd.', position: 'Wakil Kepala Sekolah / Guru Kelas / Wali Kelas VI A', category: 'guru', order: 2, quote: 'Pendidikan adalah lentera yang menerangi jalan menuju masa depan' },
    { name: 'Samadi, S.Pd.', position: 'Guru Kelas / Wali Kelas II A', category: 'guru', order: 3 },
    { name: 'Achmad Sjaefudin, S.Pd.', position: 'Guru PJOK Kelas IV, V, VI', category: 'guru', order: 4 },
    { name: 'H. Bahrudin, S.Pdi.', position: 'Guru PAIPB Kelas I, II, III', category: 'guru', order: 5, quote: 'Menjadi guru berarti menanam dengan sabar, menyiram dengan cinta, dan memanen generasi yang siap menghadapi masa depan' },
    { name: 'Siti Munawaroh, S.Pd.', position: 'Guru Kelas / Wali Kelas III B', category: 'guru', order: 6, quote: 'Guru adalah awal dari segala pencapaian besar' },
    { name: 'Pujiningsih, S.Pd.', position: 'Guru Kelas / Wali Kelas VI B / Guru Bahasa Inggris', category: 'guru', order: 7 },
    { name: 'Imaniah, S.Pd.', position: 'Guru Kelas / Wali Kelas V B', category: 'guru', order: 8 },
    { name: 'Rono Junaedi, S.Pd.', position: 'Guru PJOK Kelas I, II, III', category: 'guru', order: 9 },
    { name: 'Titik Hardini, S.Pd.', position: 'Guru Kelas / Wali Kelas II B / Guru Bahasa Inggris', category: 'guru', order: 10, quote: 'Di setiap kata yang diajarkan, tersimpan doa dan harapan agar anak-anak tumbuh menjadi pribadi yang kuat dan berkarakter' },
    { name: 'Agus Wibowo, S.Pd.', position: 'Guru Kelas V', category: 'guru', order: 11 },
    { name: 'Dyah Ayu Wulansari, S.Pd.', position: 'Guru Kelas / Wali Kelas I B', category: 'guru', order: 12, quote: 'Menjadi guru bukan sekadar mengajar membaca dan berhitung, tetapi menuntun hati-hati kecil agar tumbuh dengan cinta, rasa ingin tahu, dan keberanian bermimpi' },
    { name: 'Damai P. Sandroto, S.Th', position: 'Guru PAKPB Kelas I - VI', category: 'guru', order: 13 },
    { name: 'Irma Indriyani, S.Pd.', position: 'Guru Kelas / Wali Kelas IV B', category: 'guru', order: 14, quote: 'Guru adalah pelita sabar yang setia menuntun dari langkah pertama hingga mereka siap terbang' },
    { name: 'Siti Su\'udah, S.Pdi.', position: 'Guru Agama Islam Kelas IV, V, VI / Wali Kelas V A', category: 'guru', order: 15, quote: 'Guru bukan hanya penyampai ilmu, tapi penjaga harapan, penuntun langkah, dan pelita di awal perjalanan seorang anak' },
    { name: 'Astri Theodora W, S.Pd.', position: 'Guru Kelas / Wali Kelas III A', category: 'guru', order: 16, quote: 'Di tangan seorang guru, langkah pertama anak-anak menjadi pijakan kuat untuk masa depan' },
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
    { title: 'Pelaksanaan Olimpiade O2SN', content: 'Olimpiade Olahraga Siswa Nasional (O2SN) adalah ajang bergengsi yang menumbuhkan semangat sportivitas, disiplin, dan prestasi siswa melalui kompetisi sehat di bidang olahraga. SD Kartika X-2 berpartisipasi aktif dalam kegiatan ini untuk mengembangkan bakat olahraga siswa.', published: true, authorId: admin.id },
    { title: 'Peringatan Hari Kartini 2025', content: 'SD Kartika X-2 memperingati Hari Kartini dengan berbagai kegiatan edukatif yang bertema kesetaraan dan semangat belajar. Siswa-siswi mengenakan pakaian adat dan mengikuti lomba-lomba yang menarik.', published: true, authorId: admin.id },
    { title: 'Kegiatan Literasi Sekolah', content: 'Program literasi sekolah terus berjalan dengan baik. Siswa diajak untuk gemar membaca dan menulis melalui berbagai kegiatan kreatif di perpustakaan.', published: true, authorId: guru.id },
  ]

  for (const n of newsData) {
    await prisma.news.create({ data: n })
  }

  // Create school profile
  const profiles = [
    { key: 'visi', value: 'Terwujudnya peserta didik yang cerdas, berkarakter, beriman dan bertakwa kepada Tuhan Yang Maha Esa, serta cinta lingkungan dan bangsa.' },
    { key: 'misi', value: JSON.stringify([
      'Menyelenggarakan pendidikan yang berkualitas dan menyenangkan bagi seluruh peserta didik',
      'Menanamkan nilai-nilai keimanan dan ketakwaan dalam setiap aktivitas belajar dan kehidupan sehari-hari',
      'Mendorong peserta didik untuk aktif, kreatif, dan berpikir kritis dalam pembelajaran',
      'Mengembangkan budaya disiplin, jujur, dan tanggung jawab dalam kehidupan sekolah',
      'Meningkatkan peran serta orang tua dan masyarakat dalam mendukung kegiatan sekolah',
      'Menerapkan pembelajaran berbasis lingkungan untuk menumbuhkan kepedulian terhadap alam',
      'Menyediakan sarana dan prasarana pendidikan yang aman, nyaman, dan ramah anak',
      'Melaksanakan kegiatan ekstrakurikuler untuk menyalurkan bakat dan minat siswa secara positif',
      'Menciptakan lingkungan sekolah yang bersih, hijau, dan sehat bagi seluruh warga sekolah',
    ]) },
    { key: 'sejarah', value: 'SD KARTIKA X-2 didirikan sebagai bagian dari upaya Yayasan Kartika Jaya dalam mendukung pendidikan dasar yang bermutu di Indonesia. Sejak awal berdiri, sekolah ini memiliki komitmen kuat untuk memberikan layanan pendidikan terbaik. Dengan semangat membentuk generasi penerus bangsa yang cerdas dan berkarakter, SD KARTIKA X-2 terus berkembang menjadi sekolah yang unggul dalam akademik maupun pengembangan karakter siswa.' },
    { key: 'sambutan', value: 'Selamat datang di SD KARTIKA X2, tempat di mana semangat belajar dan nilai-nilai karakter tumbuh bersama. Guru-guru kami yang berdedikasi siap membimbing setiap siswa dengan pendekatan yang penuh kasih sayang dan perhatian. Di SD KARTIKA X2, kami percaya bahwa setiap anak memiliki potensi luar biasa.' },
    { key: 'alamat', value: 'Jl. Flamboyan No.2 14 6 13, RT.13/RW.6, Pesanggrahan, Kec. Pesanggrahan, Kota Jakarta Selatan, Daerah Khusus Ibukota Jakarta 12320' },
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
