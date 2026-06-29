import Link from "next/link"
import Image from "next/image"
import { FiInstagram, FiYoutube, FiPhone, FiMail, FiMapPin } from "react-icons/fi"
import { FaTiktok } from "react-icons/fa"

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-gray-900 to-gray-950 text-gray-300">
      {/* Wave Separator */}
      <div className="bg-white">
        <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path d="M0 60L48 52C96 44 192 28 288 24C384 20 480 28 576 32C672 36 768 36 864 32C960 28 1056 20 1152 20C1248 20 1344 28 1392 32L1440 36V60H0Z" fill="#111827"/>
        </svg>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Image
                src="/images/logo-sekolah.svg"
                alt="Logo SD Kartika X-2"
                width={48}
                height={48}
                className="rounded-full"
              />
              <div>
                <h3 className="text-white font-extrabold text-lg">SD KARTIKA X-2</h3>
                <p className="text-xs text-green-400">Jakarta Selatan</p>
              </div>
            </div>
            <p className="text-sm leading-relaxed text-gray-400 mb-4">
              Membentuk generasi cerdas, berkarakter, dan berprestasi sejak dini dengan pendidikan berkualitas.
            </p>
            <div className="flex gap-2">
              <a href="https://www.instagram.com/sdkartikax2" target="_blank" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-pink-600 transition shadow-lg">
                <FiInstagram size={18} />
              </a>
              <a href="https://www.youtube.com/@sdkartikax2" target="_blank" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-red-600 transition shadow-lg">
                <FiYoutube size={18} />
              </a>
              <a href="https://www.tiktok.com/@officialsdkartikax2" target="_blank" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-600 transition shadow-lg">
                <FaTiktok size={16} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-bold mb-4 text-sm uppercase tracking-wider">Navigasi</h3>
            <ul className="space-y-2.5 text-sm">
              <li><Link href="/" className="hover:text-green-400 transition flex items-center gap-2"><span className="text-green-500">&#9654;</span> Beranda</Link></li>
              <li><Link href="/profil" className="hover:text-green-400 transition flex items-center gap-2"><span className="text-green-500">&#9654;</span> Profil Sekolah</Link></li>
              <li><Link href="/guru-staff" className="hover:text-green-400 transition flex items-center gap-2"><span className="text-green-500">&#9654;</span> Guru & Staff</Link></li>
              <li><Link href="/berita" className="hover:text-green-400 transition flex items-center gap-2"><span className="text-green-500">&#9654;</span> Berita</Link></li>
              <li><Link href="/ppdb" className="hover:text-green-400 transition flex items-center gap-2"><span className="text-green-500">&#9654;</span> PPDB</Link></li>
              <li><Link href="/kontak" className="hover:text-green-400 transition flex items-center gap-2"><span className="text-green-500">&#9654;</span> Kontak</Link></li>
            </ul>
          </div>

          {/* Layanan */}
          <div>
            <h3 className="text-white font-bold mb-4 text-sm uppercase tracking-wider">Layanan</h3>
            <ul className="space-y-2.5 text-sm">
              <li><span className="hover:text-yellow-400 transition cursor-pointer flex items-center gap-2"><span className="text-yellow-500">&#9733;</span> E-Rapor</span></li>
              <li><span className="hover:text-yellow-400 transition cursor-pointer flex items-center gap-2"><span className="text-yellow-500">&#9733;</span> E-Ijazah</span></li>
              <li><span className="hover:text-yellow-400 transition cursor-pointer flex items-center gap-2"><span className="text-yellow-500">&#9733;</span> Dana BOS</span></li>
              <li><span className="hover:text-yellow-400 transition cursor-pointer flex items-center gap-2"><span className="text-yellow-500">&#9733;</span> Kartu Jakarta Pintar</span></li>
              <li><span className="hover:text-yellow-400 transition cursor-pointer flex items-center gap-2"><span className="text-yellow-500">&#9733;</span> Dapodik</span></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-bold mb-4 text-sm uppercase tracking-wider">Hubungi Kami</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-3">
                <FiMapPin className="text-green-400 shrink-0 mt-0.5" size={16} />
                <p className="text-gray-400">Jl. Flamboyan No.2, Pesanggrahan, Jakarta Selatan, DKI Jakarta 12320</p>
              </div>
              <div className="flex items-center gap-3">
                <FiPhone className="text-green-400 shrink-0" size={16} />
                <a href="tel:+0217362900" className="text-gray-400 hover:text-green-400 transition">(021) 7362900</a>
              </div>
              <div className="flex items-center gap-3">
                <FiMail className="text-green-400 shrink-0" size={16} />
                <a href="mailto:sdkartikax2@gmail.com" className="text-gray-400 hover:text-green-400 transition">sdkartikax2@gmail.com</a>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-10 pt-6 text-center">
          <p className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} <span className="text-white font-bold">SD KARTIKA X-2</span> Kota Jakarta Selatan. 
            <span className="text-green-400 ml-1">Powered by VEL</span>
          </p>
        </div>
      </div>
    </footer>
  )
}
