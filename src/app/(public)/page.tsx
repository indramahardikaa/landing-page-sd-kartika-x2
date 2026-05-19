import Link from "next/link"
import { prisma } from "@/lib/prisma"
import { FiBookOpen, FiUsers, FiAward, FiArrowRight } from "react-icons/fi"

export default async function HomePage() {
  const news = await prisma.news.findMany({
    where: { published: true },
    orderBy: { createdAt: "desc" },
    take: 3,
  })
  const staff = await prisma.staff.findMany({
    where: { category: "guru" },
    orderBy: { order: "asc" },
    take: 6,
  })

  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-[600px] flex items-center justify-center bg-gradient-to-br from-green-900 via-green-800 to-green-700 overflow-hidden">
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-yellow-400 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-green-400 rounded-full blur-3xl"></div>
        </div>
        <div className="relative z-10 container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 leading-tight">
            Selamat Datang di<br />
            <span className="text-yellow-400">SD KARTIKA X-2</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-200 max-w-3xl mx-auto mb-6">
            Kami bangga menjadi bagian dari peserta didik SD KARTIKA X-2 yang siap tumbuh dan berkembang, meraih cita-cita dan masa depan yang gemilang.
          </p>
          <p className="text-yellow-300 font-semibold text-lg mb-8">
            SD KARTIKA X-2... Cerdas! Berkarakter! Berprestasi!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/profil" className="bg-white text-green-800 px-8 py-3 rounded-full font-semibold hover:bg-yellow-400 transition shadow-lg">
              Tentang Kami
            </Link>
            <Link href="/ppdb" className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-green-800 transition">
              Daftar PPDB
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-white py-12 -mt-8 relative z-20">
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-2xl shadow-xl p-8 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <FiBookOpen className="text-green-700" size={28} />
              </div>
              <h3 className="text-3xl font-bold text-green-800">A</h3>
              <p className="text-gray-600">Akreditasi</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <FiUsers className="text-yellow-600" size={28} />
              </div>
              <h3 className="text-3xl font-bold text-green-800">25+</h3>
              <p className="text-gray-600">Tenaga Pendidik</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <FiAward className="text-blue-600" size={28} />
              </div>
              <h3 className="text-3xl font-bold text-green-800">6+</h3>
              <p className="text-gray-600">Ekstrakurikuler</p>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-green-800 mb-6">Tentang Kami</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                SD Kartika X-2 berkomitmen memberikan pendidikan dasar yang berkualitas, membentuk karakter siswa sejak dini, serta mempersiapkan generasi penerus bangsa yang cerdas, berakhlak mulia, dan siap menghadapi tantangan masa depan.
              </p>
              <ul className="space-y-3 mb-6">
                <li className="flex items-center gap-3">
                  <span className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                    <span className="w-2 h-2 bg-green-600 rounded-full"></span>
                  </span>
                  <span className="text-gray-700">Akreditasi A</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                    <span className="w-2 h-2 bg-green-600 rounded-full"></span>
                  </span>
                  <span className="text-gray-700">Fasilitas Lengkap</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                    <span className="w-2 h-2 bg-green-600 rounded-full"></span>
                  </span>
                  <span className="text-gray-700">Lingkungan Bersih & Nyaman</span>
                </li>
              </ul>
              <Link href="/profil" className="inline-flex items-center gap-2 bg-green-700 text-white px-6 py-3 rounded-full font-semibold hover:bg-green-800 transition">
                Selengkapnya <FiArrowRight />
              </Link>
            </div>
            <div className="bg-gradient-to-br from-green-200 to-green-300 rounded-2xl p-8 h-80 flex items-center justify-center">
              <div className="text-center">
                <div className="w-24 h-24 bg-green-700 rounded-full flex items-center justify-center mx-auto mb-4 text-white text-3xl font-bold">SK</div>
                <p className="text-green-800 font-semibold text-xl">SD KARTIKA X-2</p>
                <p className="text-green-700">Jakarta Selatan</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Teachers Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-green-800 mb-4">Tenaga Pendidik</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Guru-guru yang berdedikasi siap membimbing setiap siswa dengan pendekatan yang penuh kasih sayang dan perhatian.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {staff.map((s) => (
              <div key={s.id} className="bg-gray-50 rounded-xl p-6 hover:shadow-lg transition group">
                <div className="w-16 h-16 bg-green-700 rounded-full flex items-center justify-center text-white font-bold text-lg mb-4 group-hover:bg-yellow-500 transition">
                  {s.name.charAt(0)}
                </div>
                <h3 className="font-semibold text-gray-800 mb-1">{s.name}</h3>
                <p className="text-sm text-green-700 mb-2">{s.position}</p>
                {s.quote && (
                  <p className="text-xs text-gray-500 italic">&ldquo;{s.quote}&rdquo;</p>
                )}
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link href="/guru-staff" className="inline-flex items-center gap-2 text-green-700 font-semibold hover:text-green-800">
              Lihat Semua Guru & Staff <FiArrowRight />
            </Link>
          </div>
        </div>
      </section>

      {/* Quote Section */}
      <section className="py-16 bg-gradient-to-r from-green-800 to-green-700 text-white">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <blockquote className="text-xl md:text-2xl font-light leading-relaxed mb-6">
            &ldquo;Seperti Ibu Kartini yang berani bermimpi tinggi meski banyak yang melarang, kita juga harus berani punya cita-cita, belajar sungguh-sungguh, dan tidak mudah menyerah.&rdquo;
          </blockquote>
          <p className="bg-yellow-500 text-green-900 inline-block px-6 py-2 rounded-full font-semibold">
            Raden Ajeng Kartini
          </p>
        </div>
      </section>

      {/* News Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-green-800 mb-4">Berita Sekolah</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Update terkini seputar kegiatan belajar mengajar, agenda penting, dan informasi terbaru dari sekolah.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {news.map((n) => (
              <article key={n.id} className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-lg transition group">
                <div className="h-48 bg-gradient-to-br from-green-200 to-green-300 flex items-center justify-center">
                  <FiBookOpen className="text-green-700" size={48} />
                </div>
                <div className="p-6">
                  <h3 className="font-semibold text-gray-800 mb-2 group-hover:text-green-700 transition">{n.title}</h3>
                  <p className="text-sm text-gray-500 line-clamp-3">{n.content}</p>
                  <div className="mt-4 flex justify-between items-center">
                    <span className="text-xs text-gray-400">{new Date(n.createdAt).toLocaleDateString('id-ID')}</span>
                    <Link href={`/berita/${n.id}`} className="text-sm text-green-700 font-medium hover:underline">Baca &rarr;</Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link href="/berita" className="inline-flex items-center gap-2 bg-green-700 text-white px-6 py-3 rounded-full font-semibold hover:bg-green-800 transition">
              Lihat Semua Berita <FiArrowRight />
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
