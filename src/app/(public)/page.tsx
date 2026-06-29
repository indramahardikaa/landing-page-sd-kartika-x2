import Link from "next/link"
import Image from "next/image"
import { prisma } from "@/lib/prisma"
import { FiArrowRight, FiMapPin } from "react-icons/fi"

async function getHomeData() {
  try {
    const [news, staff, facilities, extracurriculars] = await Promise.all([
      prisma.news.findMany({ where: { published: true }, orderBy: { createdAt: "desc" }, take: 3 }),
      prisma.staff.findMany({ where: { category: "guru" }, orderBy: { order: "asc" }, take: 6 }),
      prisma.facility.findMany({ take: 6 }),
      prisma.extracurricular.findMany({ take: 6 }),
    ])
    return { news, staff, facilities, extracurriculars }
  } catch (error) {
    console.error("Database error:", error)
    return { news: [], staff: [], facilities: [], extracurriculars: [] }
  }
}

export default async function HomePage() {
  const { news, staff, facilities, extracurriculars } = await getHomeData()

  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-[650px] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <Image src="/images/hero-bg.svg" alt="SD Kartika X-2" fill className="object-cover" priority />
        </div>
        <div className="relative z-10 container mx-auto px-4 text-center pt-8">
          <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 md:p-12 max-w-3xl mx-auto shadow-2xl border-4 border-yellow-400">
            <div className="mb-4">
              <Image src="/images/logo-sekolah.svg" alt="Logo SD Kartika X-2" width={80} height={80} className="mx-auto" />
            </div>
            <h1 className="text-3xl md:text-5xl font-extrabold mb-3">
              <span className="text-green-700">Selamat Datang di</span><br />
              <span className="text-yellow-500">SD KARTIKA X-2</span>
            </h1>
            <p className="text-gray-600 text-base md:text-lg max-w-xl mx-auto mb-4">
              Tempat belajar yang menyenangkan untuk tumbuh menjadi anak yang cerdas, berkarakter, dan berprestasi!
            </p>
            <p className="text-green-600 font-bold text-lg mb-6">
              &#11088; Cerdas! Berkarakter! Berprestasi! &#11088;
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/profil" className="bg-green-600 text-white px-8 py-3 rounded-full font-bold hover:bg-green-700 transition shadow-lg">
                Tentang Sekolah
              </Link>
              <Link href="/ppdb" className="bg-red-500 text-white px-8 py-3 rounded-full font-bold hover:bg-red-600 transition shadow-lg animate-pulse">
                Daftar PPDB 2025
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white relative -mt-12 z-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-6 text-center border-2 border-green-200 shadow-sm hover:shadow-md transition">
              <div className="text-4xl mb-2">&#127941;</div>
              <h3 className="text-2xl font-extrabold text-green-700">A</h3>
              <p className="text-sm text-green-600 font-medium">Akreditasi</p>
            </div>
            <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-2xl p-6 text-center border-2 border-yellow-200 shadow-sm hover:shadow-md transition">
              <div className="text-4xl mb-2">&#128105;</div>
              <h3 className="text-2xl font-extrabold text-yellow-700">25+</h3>
              <p className="text-sm text-yellow-600 font-medium">Guru & Staff</p>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-6 text-center border-2 border-blue-200 shadow-sm hover:shadow-md transition">
              <div className="text-4xl mb-2">&#9917;</div>
              <h3 className="text-2xl font-extrabold text-blue-700">6+</h3>
              <p className="text-sm text-blue-600 font-medium">Ekstrakurikuler</p>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-6 text-center border-2 border-purple-200 shadow-sm hover:shadow-md transition">
              <div className="text-4xl mb-2">&#127979;</div>
              <h3 className="text-2xl font-extrabold text-purple-700">8+</h3>
              <p className="text-sm text-purple-600 font-medium">Fasilitas</p>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 bg-gradient-to-b from-white to-green-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            <div>
              <div className="inline-block bg-green-100 text-green-700 px-4 py-1.5 rounded-full text-sm font-bold mb-4">
                &#128218; Tentang Kami
              </div>
              <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800 mb-6">
                Sekolah Yang <span className="text-green-600">Menyenangkan</span>
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4 text-lg">
                SD Kartika X-2 berkomitmen memberikan pendidikan dasar yang berkualitas dengan suasana belajar yang hangat dan menyenangkan.
              </p>
              <ul className="space-y-3 mb-6">
                {["Akreditasi A - Kualitas Terjamin", "Guru Profesional & Berdedikasi", "Lingkungan Bersih, Aman & Nyaman", "Program Ekskul yang Menarik"].map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <span className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white text-sm">&#10003;</span>
                    <span className="text-gray-700 font-medium">{item}</span>
                  </li>
                ))}
              </ul>
              <Link href="/profil" className="inline-flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-full font-bold hover:bg-green-700 transition shadow-lg">
                Selengkapnya <FiArrowRight />
              </Link>
            </div>
            <div className="flex justify-center">
              <div className="relative">
                <div className="w-80 h-80 bg-gradient-to-br from-green-200 to-yellow-200 rounded-3xl p-6 flex items-center justify-center shadow-xl border-4 border-white">
                  <Image src="/images/hero-bg.svg" alt="SD Kartika X-2" width={280} height={280} className="rounded-2xl" />
                </div>
                <div className="absolute -top-4 -right-4 w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center text-2xl shadow-lg">&#127775;</div>
                <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-red-400 rounded-full flex items-center justify-center text-2xl shadow-lg text-white">&#10084;</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Teachers Section */}
      {staff.length > 0 && (
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <div className="inline-block bg-yellow-100 text-yellow-700 px-4 py-1.5 rounded-full text-sm font-bold mb-4">&#128105; Guru Kami</div>
              <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800 mb-3">Guru Yang Berdedikasi</h2>
              <p className="text-gray-500 max-w-xl mx-auto">Guru-guru terbaik yang siap membimbing putra-putri Anda</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 max-w-5xl mx-auto">
              {staff.map((s, i) => {
                const colors = ['bg-green-500', 'bg-blue-500', 'bg-yellow-500', 'bg-purple-500', 'bg-red-500', 'bg-pink-500']
                return (
                  <div key={s.id} className="text-center group">
                    <div className={`w-20 h-20 mx-auto rounded-full ${colors[i % colors.length]} flex items-center justify-center text-white font-bold text-xl shadow-lg group-hover:scale-110 transition-transform mb-3`}>
                      {s.name.charAt(0)}
                    </div>
                    <h3 className="font-bold text-gray-800 text-xs leading-tight">{s.name.split(',')[0]}</h3>
                    <p className="text-[10px] text-gray-500 mt-0.5">{s.position.split('/')[0]}</p>
                  </div>
                )
              })}
            </div>
            <div className="text-center mt-8">
              <Link href="/guru-staff" className="inline-flex items-center gap-2 text-green-700 font-bold bg-green-50 px-6 py-3 rounded-full hover:bg-green-100 transition">
                Lihat Semua Guru & Staff <FiArrowRight />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Extracurricular Section */}
      {extracurriculars.length > 0 && (
        <section className="py-16 bg-gradient-to-b from-blue-50 to-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <div className="inline-block bg-orange-100 text-orange-700 px-4 py-1.5 rounded-full text-sm font-bold mb-4">&#127942; Ekstrakurikuler</div>
              <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800 mb-3">Kegiatan Seru!</h2>
              <p className="text-gray-500 max-w-xl mx-auto">Banyak pilihan kegiatan menarik untuk mengembangkan bakat</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
              {extracurriculars.map((e, i) => {
                const colors = ['from-green-400 to-green-600', 'from-blue-400 to-blue-600', 'from-yellow-400 to-yellow-600', 'from-red-400 to-red-600', 'from-purple-400 to-purple-600', 'from-pink-400 to-pink-600']
                const emojis = ['&#127926;', '&#127988;', '&#9917;', '&#128131;', '&#9978;', '&#127928;']
                return (
                  <div key={e.id} className={`bg-gradient-to-br ${colors[i % colors.length]} rounded-2xl p-6 text-center text-white shadow-lg hover:shadow-xl transition transform hover:-translate-y-1`}>
                    <div className="text-4xl mb-3" dangerouslySetInnerHTML={{__html: emojis[i % emojis.length]}} />
                    <h3 className="font-bold text-lg">{e.name}</h3>
                    <p className="text-sm opacity-90 mt-1">{e.description}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </section>
      )}

      {/* Quote Section */}
      <section className="py-16 bg-gradient-to-r from-green-600 to-green-500 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 text-8xl">&#127775;</div>
          <div className="absolute bottom-10 right-10 text-8xl">&#127775;</div>
        </div>
        <div className="container mx-auto px-4 text-center max-w-3xl relative z-10">
          <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20">
            <div className="text-4xl mb-4">&#128172;</div>
            <blockquote className="text-xl md:text-2xl font-medium text-white leading-relaxed mb-6 italic">
              &ldquo;Seperti Ibu Kartini yang berani bermimpi tinggi, kita juga harus berani punya cita-cita dan belajar sungguh-sungguh!&rdquo;
            </blockquote>
            <p className="bg-yellow-400 text-green-900 inline-block px-6 py-2 rounded-full font-bold">R.A. Kartini</p>
          </div>
        </div>
      </section>

      {/* News Section */}
      {news.length > 0 && (
        <section className="py-16 bg-gradient-to-b from-white to-green-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <div className="inline-block bg-green-100 text-green-700 px-4 py-1.5 rounded-full text-sm font-bold mb-4">&#128240; Berita</div>
              <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800 mb-3">Berita Terkini</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {news.map((n) => (
                <article key={n.id} className="bg-white rounded-2xl shadow-sm overflow-hidden border-2 border-gray-100 hover:border-green-300 hover:shadow-xl transition group">
                  <div className="h-44 relative overflow-hidden">
                    <Image src="/images/placeholder-news.svg" alt={n.title} fill className="object-cover group-hover:scale-105 transition-transform" />
                  </div>
                  <div className="p-5">
                    <h3 className="font-bold text-gray-800 text-lg mb-2 group-hover:text-green-700 transition line-clamp-2">{n.title}</h3>
                    <p className="text-sm text-gray-500 line-clamp-2 mb-4">{n.content}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-gray-400 bg-gray-100 px-3 py-1 rounded-full">
                        {new Date(n.createdAt).toLocaleDateString('id-ID')}
                      </span>
                      <Link href={`/berita/${n.id}`} className="text-sm text-green-700 font-bold flex items-center gap-1">
                        Baca <FiArrowRight size={12} />
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
            <div className="text-center mt-8">
              <Link href="/berita" className="inline-flex items-center gap-2 bg-green-600 text-white px-8 py-3 rounded-full font-bold hover:bg-green-700 transition shadow-lg">
                Lihat Semua Berita <FiArrowRight />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* CTA PPDB */}
      <section className="py-16 bg-gradient-to-r from-red-500 to-red-600 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute -top-10 -left-10 w-60 h-60 bg-yellow-300 rounded-full"></div>
          <div className="absolute -bottom-10 -right-10 w-80 h-80 bg-yellow-300 rounded-full"></div>
        </div>
        <div className="container mx-auto px-4 text-center relative z-10 max-w-2xl">
          <div className="text-5xl mb-4">&#127891;</div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">Pendaftaran Siswa Baru!</h2>
          <p className="text-red-100 text-lg mb-8">PPDB Tahun Ajaran 2025/2026 sudah dibuka!</p>
          <Link href="/ppdb" className="inline-flex items-center gap-2 bg-white text-red-600 px-10 py-4 rounded-full font-extrabold text-lg hover:bg-yellow-400 hover:text-red-700 transition shadow-xl transform hover:scale-105">
            Daftar Sekarang <FiArrowRight />
          </Link>
        </div>
      </section>

      {/* Location */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <div className="inline-block bg-gray-100 text-gray-700 px-4 py-1.5 rounded-full text-sm font-bold mb-4">&#128205; Lokasi</div>
            <h2 className="text-3xl font-extrabold text-gray-800">Temukan Kami</h2>
          </div>
          <div className="max-w-4xl mx-auto rounded-2xl overflow-hidden shadow-lg border-4 border-green-200">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3965.771!2d106.7059!3d-6.2585!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNsKwMTUnMzAuNiJTIDEwNsKwNDInMjEuMiJF!5e0!3m2!1sid!2sid!4v1709447164702"
              width="100%" height="350" style={{ border: 0 }} allowFullScreen loading="lazy"
            ></iframe>
          </div>
          <div className="text-center mt-4">
            <p className="text-gray-500 flex items-center justify-center gap-2">
              <FiMapPin className="text-green-600" /> Jl. Flamboyan No.2, Pesanggrahan, Jakarta Selatan
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
