import Link from "next/link"
import { FiMapPin, FiPhone, FiMail, FiArrowUpRight } from "react-icons/fi"
import { FaInstagram, FaYoutube, FaTiktok } from "react-icons/fa"

export default function Footer() {
  return (
    <footer className="relative overflow-hidden">
      {/* Top wave separator */}
      <div className="bg-white">
        <svg viewBox="0 0 1440 60" fill="none" className="w-full text-gray-900 block">
          <path d="M0 60L60 55C120 50 240 40 360 35C480 30 600 30 720 33.3C840 36.7 960 43.3 1080 45C1200 46.7 1320 43.3 1380 41.7L1440 40V60H1380C1320 60 1200 60 1080 60C960 60 840 60 720 60C600 60 480 60 360 60C240 60 120 60 60 60H0Z" fill="currentColor"/>
        </svg>
      </div>

      <div className="bg-gray-900 relative">
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>

        <div className="relative z-10 container mx-auto px-4 pt-16 pb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 mb-12">
            {/* Brand */}
            <div className="lg:col-span-4">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-700 rounded-2xl flex items-center justify-center text-white font-bold shadow-lg shadow-green-900/30">
                  SK
                </div>
                <div>
                  <h3 className="text-white font-bold text-lg leading-tight">SD KARTIKA X-2</h3>
                  <p className="text-gray-500 text-xs">Jakarta Selatan</p>
                </div>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed mb-6 max-w-xs">
                Membentuk generasi penerus bangsa yang cerdas, berkarakter, dan berakhlak mulia sejak usia dini.
              </p>
              <div className="flex gap-2">
                <a href="https://www.instagram.com/sdkartikax2" target="_blank" className="w-10 h-10 bg-gray-800 rounded-xl flex items-center justify-center text-gray-400 hover:bg-gradient-to-br hover:from-pink-500 hover:to-purple-600 hover:text-white transition-all duration-300 hover:scale-110 hover:shadow-lg">
                  <FaInstagram size={18} />
                </a>
                <a href="https://www.youtube.com/@sdkartikax2" target="_blank" className="w-10 h-10 bg-gray-800 rounded-xl flex items-center justify-center text-gray-400 hover:bg-gradient-to-br hover:from-red-500 hover:to-red-700 hover:text-white transition-all duration-300 hover:scale-110 hover:shadow-lg">
                  <FaYoutube size={18} />
                </a>
                <a href="https://www.tiktok.com/@officialsdkartikax2" target="_blank" className="w-10 h-10 bg-gray-800 rounded-xl flex items-center justify-center text-gray-400 hover:bg-gray-700 hover:text-white transition-all duration-300 hover:scale-110 hover:shadow-lg">
                  <FaTiktok size={16} />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div className="lg:col-span-2">
              <h4 className="text-white font-semibold mb-5 text-sm uppercase tracking-wider">Menu</h4>
              <ul className="space-y-3">
                {[
                  { href: "/", label: "Beranda" },
                  { href: "/profil", label: "Profil" },
                  { href: "/berita", label: "Berita" },
                  { href: "/ppdb", label: "PPDB" },
                  { href: "/kontak", label: "Kontak" },
                ].map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-gray-400 text-sm hover:text-green-400 transition-colors duration-300 inline-flex items-center gap-1 group">
                      {link.label}
                      <FiArrowUpRight size={12} className="opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Layanan */}
            <div className="lg:col-span-3">
              <h4 className="text-white font-semibold mb-5 text-sm uppercase tracking-wider">Layanan</h4>
              <ul className="space-y-3">
                {[
                  { label: "E-Rapor", href: "https://ijazah.data.kemdikbud.go.id/dasbor/help" },
                  { label: "E-Ijazah", href: "#" },
                  { label: "Dana BOS", href: "#" },
                  { label: "Kartu Jakarta Pintar", href: "#" },
                  { label: "Dapodik", href: "#" },
                ].map((item) => (
                  <li key={item.label}>
                    <a href={item.href} target="_blank" className="text-gray-400 text-sm hover:text-green-400 transition-colors duration-300 inline-flex items-center gap-1 group">
                      {item.label}
                      <FiArrowUpRight size={12} className="opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div className="lg:col-span-3">
              <h4 className="text-white font-semibold mb-5 text-sm uppercase tracking-wider">Kontak</h4>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center shrink-0 mt-0.5">
                    <FiMapPin className="text-green-400" size={14} />
                  </div>
                  <p className="text-gray-400 text-sm leading-relaxed">Jl. Flamboyan No.2, Pesanggrahan, Jakarta Selatan 12320</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center shrink-0">
                    <FiPhone className="text-green-400" size={14} />
                  </div>
                  <a href="tel:+0217362900" className="text-gray-400 text-sm hover:text-green-400 transition-colors">(021) 7362900</a>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center shrink-0">
                    <FiMail className="text-green-400" size={14} />
                  </div>
                  <a href="mailto:sdkartikax2@gmail.com" className="text-gray-400 text-sm hover:text-green-400 transition-colors">sdkartikax2@gmail.com</a>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-gray-800 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-500 text-sm">
              &copy; {new Date().getFullYear()} SD KARTIKA X-2. All rights reserved.
            </p>
            <p className="text-gray-600 text-xs">
              Powered by <span className="text-green-500 font-medium">VEL</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
