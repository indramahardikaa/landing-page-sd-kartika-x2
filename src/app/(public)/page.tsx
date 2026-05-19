import Link from "next/link"
import { prisma } from "@/lib/prisma"
import { FiBookOpen, FiUsers, FiAward, FiArrowRight, FiMapPin, FiStar, FiHeart } from "react-icons/fi"
import PPDBCountdown from "@/components/PPDBCountdown"

export const dynamic = "force-dynamic"

export default async function HomePage() {
  const news = await prisma.news.findMany({
    where: { published: true },
    orderBy: { createdAt: "desc" },
    take: 3,
  })
  const staff = await prisma.staff.findMany({
    where: { category: "guru" },
    orderBy: { order: "asc" },
    take: 4,
  })
  const ppdbSettings = await prisma.pPDBSettings.findFirst({
    where: { isActive: true },
    orderBy: { createdAt: "desc" },
  })

  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-green-950 via-green-900 to-emerald-800"></div>
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full opacity-30">
            <div className="absolute top-20 -left-20 w-96 h-96 bg-yellow-400/20 rounded-full blur-3xl animate-float"></div>
            <div className="absolute bottom-20 -right-20 w-[500px] h-[500px] bg-emerald-400/15 rounded-full blur-3xl animate-float-delayed"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-green-500/10 rounded-full blur-3xl animate-pulse-slow"></div>
          </div>
        </div>
        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '50px 50px' }}></div>

        <div className="relative z-10 container mx-auto px-4 pt-32 pb-20">
          <div className="max-w-4xl mx-auto text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-8 animate-fade-in">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
              <span className="text-green-200 text-sm font-medium">Menerima Pendaftaran Siswa Baru 2025/2026</span>
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight animate-slide-up">
              Selamat Datang di
              <span className="block mt-2 bg-gradient-to-r from-yellow-300 via-yellow-400 to-amber-400 bg-clip-text text-transparent">
                SD KARTIKA X-2
              </span>
            </h1>

            <p className="text-lg md:text-xl text-green-100/80 max-w-2xl mx-auto mb-4 animate-slide-up-delayed leading-relaxed">
              Membentuk generasi penerus bangsa yang cerdas, berkarakter, dan berakhlak mulia sejak usia dini.
            </p>

            <p className="text-yellow-300/90 font-semibold text-base md:text-lg mb-10 animate-slide-up-delayed-2">
              Cerdas! Berkarakter! Berprestasi!
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up-delayed-3">
              <Link href="/profil" className="group inline-flex items-center gap-2 bg-white text-green-800 px-8 py-4 rounded-2xl font-semibold hover:bg-yellow-400 transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95">
                Tentang Kami
                <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link href="/ppdb" className="group inline-flex items-center gap-2 border-2 border-white/30 text-white px-8 py-4 rounded-2xl font-semibold hover:bg-white/10 backdrop-blur-sm transition-all duration-300 hover:border-white/60">
                Daftar PPDB
                <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
            <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2">
              <div className="w-1.5 h-3 bg-white/50 rounded-full animate-scroll-down"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section - Floating Cards */}
      <section className="relative z-20 -mt-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl p-6 shadow-xl shadow-black/5 border border-gray-100 hover:shadow-2xl hover:-translate-y-1 transition-all duration-500 group">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-gradient-to-br from-green-100 to-emerald-200 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <FiBookOpen className="text-green-700" size={24} />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-800">A</h3>
                  <p className="text-sm text-gray-500">Akreditasi</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-xl shadow-black/5 border border-gray-100 hover:shadow-2xl hover:-translate-y-1 transition-all duration-500 group">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-gradient-to-br from-yellow-100 to-amber-200 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <FiUsers className="text-yellow-700" size={24} />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-800">25+</h3>
                  <p className="text-sm text-gray-500">Tenaga Pendidik</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-xl shadow-black/5 border border-gray-100 hover:shadow-2xl hover:-translate-y-1 transition-all duration-500 group">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-gradient-to-br from-blue-100 to-indigo-200 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <FiAward className="text-blue-700" size={24} />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-800">6+</h3>
                  <p className="text-sm text-gray-500">Ekstrakurikuler</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-green-50 rounded-full px-4 py-1.5 mb-6">
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                <span className="text-green-700 text-sm font-medium">Tentang Kami</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 leading-tight">
                Membangun Generasi<br />
                <span className="text-green-700">Unggul & Berkarakter</span>
              </h2>
              <p className="text-gray-600 leading-relaxed mb-6 text-base">
                SD Kartika X-2 berkomitmen memberikan pendidikan dasar yang berkualitas, membentuk karakter siswa sejak dini, serta mempersiapkan generasi penerus bangsa yang cerdas, berakhlak mulia, dan siap menghadapi tantangan masa depan.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                {[
                  { icon: FiAward, text: "Akreditasi A" },
                  { icon: FiStar, text: "Fasilitas Lengkap" },
                  { icon: FiHeart, text: "Lingkungan Nyaman" },
                  { icon: FiMapPin, text: "Lokasi Strategis" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 bg-gray-50 rounded-xl px-4 py-3 hover:bg-green-50 transition-colors duration-300">
                    <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                      <item.icon className="text-green-700" size={16} />
                    </div>
                    <span className="text-sm font-medium text-gray-700">{item.text}</span>
                  </div>
                ))}
              </div>
              <Link href="/profil" className="group inline-flex items-center gap-2 bg-green-700 text-white px-6 py-3 rounded-xl font-semibold hover:bg-green-800 transition-all duration-300 shadow-md hover:shadow-lg">
                Selengkapnya <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-green-100 via-emerald-50 to-green-200 rounded-3xl p-10 h-[400px] flex items-center justify-center relative overflow-hidden">
                <div className="absolute top-4 right-4 w-20 h-20 bg-yellow-300/30 rounded-full blur-xl"></div>
                <div className="absolute bottom-4 left-4 w-32 h-32 bg-green-400/20 rounded-full blur-xl"></div>
                <div className="text-center relative z-10">
                  <div className="w-28 h-28 bg-gradient-to-br from-green-600 to-green-800 rounded-3xl flex items-center justify-center mx-auto mb-5 shadow-xl text-white text-4xl font-bold rotate-3 hover:rotate-0 transition-transform duration-500">
                    SK
                  </div>
                  <p className="text-green-800 font-bold text-xl mb-1">SD KARTIKA X-2</p>
                  <p className="text-green-600 text-sm">Jakarta Selatan</p>
                  <div className="mt-4 flex justify-center gap-2">
                    <span className="w-3 h-3 bg-green-400 rounded-full"></span>
                    <span className="w-3 h-3 bg-yellow-400 rounded-full"></span>
                    <span className="w-3 h-3 bg-blue-400 rounded-full"></span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PPDB Countdown Section */}
      {ppdbSettings && (
        <PPDBCountdown settings={JSON.parse(JSON.stringify(ppdbSettings))} />
      )}

      {/* Teachers Section */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 bg-green-50 rounded-full px-4 py-1.5 mb-4">
              <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
              <span className="text-green-700 text-sm font-medium">Tenaga Pendidik</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Guru-Guru Terbaik Kami</h2>
            <p className="text-gray-500 max-w-xl mx-auto">Berdedikasi membimbing setiap siswa dengan pendekatan penuh kasih sayang dan perhatian.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {staff.map((s, i) => (
              <div key={s.id} className="group bg-white rounded-2xl p-6 hover:shadow-xl transition-all duration-500 border border-gray-100 hover:border-green-200 hover:-translate-y-2">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-700 rounded-2xl flex items-center justify-center text-white font-bold text-xl mb-4 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg">
                  {s.name.charAt(0)}
                </div>
                <h3 className="font-semibold text-gray-800 text-sm mb-1 line-clamp-1">{s.name}</h3>
                <p className="text-xs text-green-600 mb-3 line-clamp-2">{s.position}</p>
                {s.quote && (
                  <p className="text-xs text-gray-400 italic line-clamp-2">&ldquo;{s.quote}&rdquo;</p>
                )}
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link href="/guru-staff" className="group inline-flex items-center gap-2 text-green-700 font-semibold hover:text-green-800 transition-colors">
              Lihat Semua Guru & Staff <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* Inspirational Quote */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-green-900 via-green-800 to-emerald-900"></div>
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
        <div className="relative z-10 container mx-auto px-4 text-center max-w-3xl">
          <div className="mb-6">
            <span className="text-5xl text-yellow-400/30">&ldquo;</span>
          </div>
          <blockquote className="text-xl md:text-2xl font-light leading-relaxed text-white/90 mb-8">
            Seperti Ibu Kartini yang berani bermimpi tinggi meski banyak yang melarang, kita juga harus berani punya cita-cita, belajar sungguh-sungguh, dan tidak mudah menyerah.
          </blockquote>
          <div className="inline-flex items-center gap-3">
            <div className="w-10 h-0.5 bg-yellow-400/50"></div>
            <span className="text-yellow-300 font-semibold">Raden Ajeng Kartini</span>
            <div className="w-10 h-0.5 bg-yellow-400/50"></div>
          </div>
        </div>
      </section>

      {/* News Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-14">
            <div>
              <div className="inline-flex items-center gap-2 bg-blue-50 rounded-full px-4 py-1.5 mb-4">
                <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
                <span className="text-blue-700 text-sm font-medium">Berita Terkini</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Kabar Sekolah</h2>
              <p className="text-gray-500">Update kegiatan dan informasi terbaru dari sekolah.</p>
            </div>
            <Link href="/berita" className="group mt-4 md:mt-0 inline-flex items-center gap-2 text-green-700 font-semibold hover:text-green-800">
              Semua Berita <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {news.map((n, i) => (
              <article key={n.id} className="group bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-green-200 hover:shadow-xl transition-all duration-500 hover:-translate-y-1">
                <div className="h-48 bg-gradient-to-br from-green-100 via-emerald-50 to-green-200 flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent"></div>
                  <FiBookOpen className="text-green-600/50 group-hover:scale-110 transition-transform duration-500" size={52} />
                </div>
                <div className="p-6">
                  <h3 className="font-semibold text-gray-800 text-base mb-2 group-hover:text-green-700 transition-colors line-clamp-2">{n.title}</h3>
                  <p className="text-sm text-gray-500 line-clamp-2 mb-4">{n.content}</p>
                  <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                    <span className="text-xs text-gray-400">{new Date(n.createdAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                    <Link href={`/berita/${n.id}`} className="text-sm text-green-700 font-medium hover:underline">
                      Baca &rarr;
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-green-50/30">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Bergabunglah Bersama Kami
          </h2>
          <p className="text-gray-600 mb-8 text-lg">
            Berikan pendidikan terbaik untuk putra-putri Anda di SD KARTIKA X-2.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/ppdb" className="group inline-flex items-center gap-2 bg-gradient-to-r from-red-500 to-red-600 text-white px-8 py-4 rounded-2xl font-semibold hover:from-red-600 hover:to-red-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 active:scale-95">
              Daftar Sekarang <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link href="/kontak" className="group inline-flex items-center gap-2 bg-white text-green-700 px-8 py-4 rounded-2xl font-semibold border-2 border-green-200 hover:border-green-300 hover:bg-green-50 transition-all duration-300">
              Hubungi Kami <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
