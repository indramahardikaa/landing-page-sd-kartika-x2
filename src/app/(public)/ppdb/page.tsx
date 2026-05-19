import Link from "next/link"
import { prisma } from "@/lib/prisma"
import { FiCheckCircle, FiArrowRight, FiCalendar, FiFileText, FiUsers, FiPhone } from "react-icons/fi"
import PPDBCountdown from "@/components/PPDBCountdown"

export const dynamic = "force-dynamic"

export default async function PPDBPage() {
  const ppdbSettings = await prisma.pPDBSettings.findFirst({
    where: { isActive: true },
    orderBy: { createdAt: "desc" },
  })

  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-red-700 via-red-600 to-orange-600"></div>
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
        <div className="absolute top-20 right-10 w-72 h-72 bg-yellow-400/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 left-10 w-96 h-96 bg-red-400/20 rounded-full blur-3xl"></div>
        <div className="relative z-10 container mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-6">
            <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
            <span className="text-white/90 text-sm font-medium">Tahun Ajaran {ppdbSettings?.year || "2025/2026"}</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
            Penerimaan Peserta<br />
            <span className="text-yellow-300">Didik Baru</span>
          </h1>
          <p className="text-lg text-red-100 max-w-2xl mx-auto">
            SD KARTIKA X-2 membuka pendaftaran siswa baru. Bergabunglah bersama kami untuk masa depan yang lebih cerah.
          </p>
        </div>
      </section>

      {/* Countdown Section */}
      {ppdbSettings && (
        <div className="-mt-8 relative z-20">
          <PPDBCountdown settings={JSON.parse(JSON.stringify(ppdbSettings))} />
        </div>
      )}

      {/* Alur Pendaftaran */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 bg-blue-50 rounded-full px-4 py-1.5 mb-4">
              <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
              <span className="text-blue-700 text-sm font-medium">Alur Pendaftaran</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">Langkah Pendaftaran</h2>
            <p className="text-gray-500 max-w-xl mx-auto">Ikuti langkah-langkah berikut untuk mendaftarkan putra/putri Anda.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { step: 1, icon: FiFileText, title: "Isi Formulir", desc: "Lengkapi formulir pendaftaran online atau datang langsung ke sekolah", color: "from-blue-500 to-blue-600" },
              { step: 2, icon: FiFileText, title: "Siapkan Berkas", desc: "Kumpulkan semua berkas persyaratan yang dibutuhkan", color: "from-green-500 to-green-600" },
              { step: 3, icon: FiCalendar, title: "Verifikasi", desc: "Tim sekolah akan memverifikasi kelengkapan berkas Anda", color: "from-yellow-500 to-orange-500" },
              { step: 4, icon: FiCheckCircle, title: "Daftar Ulang", desc: "Setelah diterima, lakukan daftar ulang sesuai jadwal", color: "from-purple-500 to-purple-600" },
            ].map((item) => (
              <div key={item.step} className="relative group">
                <div className="bg-white rounded-2xl p-6 border border-gray-100 hover:border-gray-200 hover:shadow-xl transition-all duration-500 hover:-translate-y-2 h-full">
                  <div className={`w-12 h-12 bg-gradient-to-br ${item.color} rounded-xl flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                    <item.icon size={22} />
                  </div>
                  <div className="text-xs font-bold text-gray-300 mb-2">LANGKAH {item.step}</div>
                  <h3 className="font-bold text-gray-800 mb-2">{item.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Persyaratan & Jadwal */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Persyaratan */}
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 hover:shadow-lg transition-shadow duration-500">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                  <FiCheckCircle className="text-green-600" size={20} />
                </div>
                <h3 className="font-bold text-gray-800 text-xl">Persyaratan Umum</h3>
              </div>
              <ul className="space-y-3">
                {[
                  "Usia minimal 6 tahun pada 1 Juli 2025",
                  "Fotokopi Akta Kelahiran (2 lembar)",
                  "Fotokopi Kartu Keluarga (2 lembar)",
                  "Pas foto berwarna 3x4 (4 lembar)",
                  "Surat Keterangan Sehat dari dokter",
                  "Fotokopi KTP orang tua/wali",
                  "Rapor TK/PAUD (jika ada)",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 group">
                    <div className="w-6 h-6 bg-green-50 rounded-lg flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-green-100 transition-colors">
                      <FiCheckCircle className="text-green-500" size={14} />
                    </div>
                    <span className="text-sm text-gray-600 group-hover:text-gray-800 transition-colors">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Jadwal */}
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 hover:shadow-lg transition-shadow duration-500">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                  <FiCalendar className="text-blue-600" size={20} />
                </div>
                <h3 className="font-bold text-gray-800 text-xl">Jadwal Pendaftaran</h3>
              </div>
              <div className="space-y-4">
                {[
                  { phase: "Pendaftaran Online", date: "1 - 30 Juni 2025", color: "bg-green-50 border-green-200 text-green-700" },
                  { phase: "Verifikasi Berkas", date: "1 - 5 Juli 2025", color: "bg-yellow-50 border-yellow-200 text-yellow-700" },
                  { phase: "Pengumuman Hasil", date: "10 Juli 2025", color: "bg-blue-50 border-blue-200 text-blue-700" },
                  { phase: "Daftar Ulang", date: "11 - 15 Juli 2025", color: "bg-purple-50 border-purple-200 text-purple-700" },
                  { phase: "Masuk Sekolah", date: "14 Juli 2025", color: "bg-red-50 border-red-200 text-red-700" },
                ].map((item, i) => (
                  <div key={i} className={`${item.color} border rounded-xl p-4 hover:scale-[1.02] transition-transform duration-300`}>
                    <p className="font-semibold text-sm">{item.phase}</p>
                    <p className="text-xs opacity-80 mt-0.5">{item.date}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Keunggulan */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 bg-green-50 rounded-full px-4 py-1.5 mb-4">
              <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
              <span className="text-green-700 text-sm font-medium">Keunggulan</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">Mengapa SD KARTIKA X-2?</h2>
            <p className="text-gray-500 max-w-xl mx-auto">Berbagai keunggulan yang menjadikan kami pilihan terbaik untuk putra-putri Anda.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { title: "Akreditasi A", desc: "Kualitas pendidikan terstandar nasional dengan nilai akreditasi terbaik", icon: "🏆" },
              { title: "Guru Profesional", desc: "Tenaga pendidik bersertifikat dan berpengalaman di bidangnya", icon: "👨‍🏫" },
              { title: "Fasilitas Modern", desc: "Ruang kelas, perpustakaan, lab komputer, dan lapangan olahraga", icon: "🏫" },
              { title: "Pembinaan Karakter", desc: "Pembentukan akhlak mulia dan kedisiplinan sejak dini", icon: "💎" },
              { title: "6+ Ekstrakurikuler", desc: "Pramuka, futsal, tari, gamelan, hadroh, dan paskibra", icon: "⭐" },
              { title: "Lingkungan Aman", desc: "Suasana belajar yang kondusif, bersih, dan menyenangkan", icon: "🌿" },
            ].map((item, i) => (
              <div key={i} className="bg-gray-50 rounded-2xl p-6 hover:bg-white hover:shadow-lg hover:-translate-y-1 transition-all duration-500 border border-transparent hover:border-gray-100 group">
                <span className="text-3xl mb-4 block group-hover:scale-110 transition-transform duration-300">{item.icon}</span>
                <h4 className="font-bold text-gray-800 mb-2">{item.title}</h4>
                <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-br from-green-800 to-green-900 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '50px 50px' }}></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-green-400/10 rounded-full blur-3xl"></div>
        <div className="relative z-10 container mx-auto px-4 text-center max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Siap Bergabung?</h2>
          <p className="text-green-200 mb-8 text-lg">
            Hubungi kami untuk informasi lebih lanjut tentang pendaftaran siswa baru.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/kontak" className="group inline-flex items-center justify-center gap-2 bg-white text-green-800 px-8 py-4 rounded-2xl font-semibold hover:bg-yellow-400 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 active:scale-95">
              Hubungi Kami <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <a href="tel:+0217362900" className="inline-flex items-center justify-center gap-2 border-2 border-white/30 text-white px-8 py-4 rounded-2xl font-semibold hover:bg-white/10 transition-all duration-300">
              <FiPhone size={18} /> (021) 7362900
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
