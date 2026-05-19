import Link from "next/link"
import { FiCheckCircle, FiArrowRight } from "react-icons/fi"

export default function PPDBPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-red-700 to-red-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">PPDB 2025/2026</h1>
          <p className="text-lg text-red-100 max-w-3xl mx-auto">
            Penerimaan Peserta Didik Baru SD KARTIKA X-2 Kota Jakarta Selatan
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Info Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
              <h3 className="font-bold text-gray-800 text-lg mb-3">Persyaratan Umum</h3>
              <ul className="space-y-2">
                {[
                  "Usia minimal 6 tahun pada 1 Juli 2025",
                  "Fotokopi Akta Kelahiran",
                  "Fotokopi Kartu Keluarga",
                  "Pas foto berwarna 3x4 (4 lembar)",
                  "Surat Keterangan Sehat dari dokter",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <FiCheckCircle className="text-green-600 mt-0.5 shrink-0" size={16} />
                    <span className="text-sm text-gray-600">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
              <h3 className="font-bold text-gray-800 text-lg mb-3">Jadwal Pendaftaran</h3>
              <div className="space-y-3">
                <div className="bg-green-50 p-3 rounded-lg">
                  <p className="text-sm font-semibold text-green-800">Pendaftaran Online</p>
                  <p className="text-xs text-green-600">1 Juni - 30 Juni 2025</p>
                </div>
                <div className="bg-yellow-50 p-3 rounded-lg">
                  <p className="text-sm font-semibold text-yellow-800">Verifikasi Berkas</p>
                  <p className="text-xs text-yellow-600">1 Juli - 5 Juli 2025</p>
                </div>
                <div className="bg-blue-50 p-3 rounded-lg">
                  <p className="text-sm font-semibold text-blue-800">Pengumuman</p>
                  <p className="text-xs text-blue-600">10 Juli 2025</p>
                </div>
                <div className="bg-purple-50 p-3 rounded-lg">
                  <p className="text-sm font-semibold text-purple-800">Daftar Ulang</p>
                  <p className="text-xs text-purple-600">11 - 15 Juli 2025</p>
                </div>
              </div>
            </div>
          </div>

          {/* Keunggulan */}
          <div className="bg-green-50 rounded-2xl p-8 mb-12">
            <h3 className="font-bold text-green-800 text-2xl mb-6 text-center">Mengapa SD KARTIKA X-2?</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { title: "Akreditasi A", desc: "Kualitas pendidikan terstandar nasional" },
                { title: "Guru Profesional", desc: "Tenaga pendidik bersertifikat dan berdedikasi" },
                { title: "Fasilitas Lengkap", desc: "Ruang kelas, perpustakaan, lab komputer" },
                { title: "Karakter Islami", desc: "Pembentukan akhlak mulia sejak dini" },
                { title: "Ekstrakurikuler", desc: "6+ pilihan kegiatan pengembangan bakat" },
                { title: "Lingkungan Nyaman", desc: "Suasana belajar yang aman dan menyenangkan" },
              ].map((item, i) => (
                <div key={i} className="bg-white rounded-xl p-4 shadow-sm">
                  <h4 className="font-semibold text-green-800 mb-1">{item.title}</h4>
                  <p className="text-xs text-gray-600">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="text-center">
            <p className="text-gray-600 mb-4">Untuk informasi lebih lanjut, silakan hubungi kami:</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/kontak" className="inline-flex items-center gap-2 bg-green-700 text-white px-8 py-3 rounded-full font-semibold hover:bg-green-800 transition">
                Hubungi Kami <FiArrowRight />
              </Link>
              <a href="tel:+0217362900" className="inline-flex items-center gap-2 border-2 border-green-700 text-green-700 px-8 py-3 rounded-full font-semibold hover:bg-green-50 transition">
                (021) 7362900
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
