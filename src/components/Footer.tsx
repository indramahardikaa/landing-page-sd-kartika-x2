import Link from "next/link"
import { FiInstagram, FiYoutube } from "react-icons/fi"
import { FaTiktok } from "react-icons/fa"

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-12 h-12 bg-green-700 rounded-full flex items-center justify-center text-white font-bold">
                SK
              </div>
              <h3 className="text-white font-bold text-lg">SD KARTIKA X-2</h3>
            </div>
            <p className="text-sm leading-relaxed">
              SD Kartika X-2 terus mengokohkan komitmennya sebagai lembaga pendidikan dasar yang membentuk siswa berkarakter, cerdas, dan berakhlak mulia.
            </p>
            <div className="flex gap-3 mt-4">
              <a href="https://www.instagram.com/sdkartikax2" target="_blank" className="w-9 h-9 bg-gray-700 rounded-full flex items-center justify-center hover:bg-green-600 transition">
                <FiInstagram size={18} />
              </a>
              <a href="https://www.youtube.com/@sdkartikax2" target="_blank" className="w-9 h-9 bg-gray-700 rounded-full flex items-center justify-center hover:bg-red-600 transition">
                <FiYoutube size={18} />
              </a>
              <a href="https://www.tiktok.com/@officialsdkartikax2" target="_blank" className="w-9 h-9 bg-gray-700 rounded-full flex items-center justify-center hover:bg-gray-600 transition">
                <FaTiktok size={16} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Tautan Cepat</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/" className="hover:text-green-400 transition">Beranda</Link></li>
              <li><Link href="/profil" className="hover:text-green-400 transition">Profil</Link></li>
              <li><Link href="/berita" className="hover:text-green-400 transition">Berita</Link></li>
              <li><Link href="/ppdb" className="hover:text-green-400 transition">PPDB</Link></li>
              <li><Link href="/kontak" className="hover:text-green-400 transition">Kontak</Link></li>
            </ul>
          </div>

          {/* Layanan */}
          <div>
            <h3 className="text-white font-semibold mb-4">Layanan Pendidikan</h3>
            <ul className="space-y-2 text-sm">
              <li><span className="hover:text-green-400 transition cursor-pointer">E-Rapor</span></li>
              <li><span className="hover:text-green-400 transition cursor-pointer">E-Ijazah</span></li>
              <li><span className="hover:text-green-400 transition cursor-pointer">Dana BOS</span></li>
              <li><span className="hover:text-green-400 transition cursor-pointer">Kartu Jakarta Pintar</span></li>
              <li><span className="hover:text-green-400 transition cursor-pointer">Dapodik</span></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold mb-4">Kontak</h3>
            <div className="text-sm space-y-3">
              <p>Jl. Flamboyan No.2 14 6 13, RT.13/RW.6, Pesanggrahan, Kec. Pesanggrahan, Kota Jakarta Selatan, DKI Jakarta 12320</p>
              <p>(021) 7362900</p>
              <p>sdkartikax2@gmail.com</p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-sm">
          <p>Copyright &copy; {new Date().getFullYear()} SD KARTIKA X-2 Kota Jakarta Selatan. Powered by <span className="text-green-400">VEL</span></p>
        </div>
      </div>
    </footer>
  )
}
