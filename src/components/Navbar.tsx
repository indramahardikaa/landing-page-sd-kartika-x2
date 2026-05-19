"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { FiMenu, FiX, FiPhone, FiMail, FiChevronDown, FiExternalLink } from "react-icons/fi"
import { FaInstagram, FaYoutube, FaTiktok } from "react-icons/fa"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [aboutOpen, setAboutOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header className="w-full fixed top-0 left-0 z-50">
      {/* Top Bar */}
      <div className={`bg-green-900/95 text-white text-xs py-2 transition-all duration-500 ${scrolled ? 'opacity-0 -translate-y-full h-0 py-0 overflow-hidden' : 'opacity-100 translate-y-0'}`}>
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <a href="tel:+0217362900" className="flex items-center gap-1.5 hover:text-yellow-300 transition-colors">
              <FiPhone size={12} />
              <span className="hidden sm:inline">(021) 7362900</span>
            </a>
            <a href="mailto:sdkartikax2@gmail.com" className="flex items-center gap-1.5 hover:text-yellow-300 transition-colors">
              <FiMail size={12} />
              <span className="hidden sm:inline">sdkartikax2@gmail.com</span>
            </a>
          </div>
          <div className="flex items-center gap-3">
            <a href="https://www.instagram.com/sdkartikax2" target="_blank" className="hover:text-pink-300 transition-colors">
              <FaInstagram size={14} />
            </a>
            <a href="https://www.youtube.com/@sdkartikax2" target="_blank" className="hover:text-red-300 transition-colors">
              <FaYoutube size={14} />
            </a>
            <a href="https://www.tiktok.com/@officialsdkartikax2" target="_blank" className="hover:text-gray-300 transition-colors">
              <FaTiktok size={12} />
            </a>
            <span className="hidden sm:inline mx-2 text-green-600">|</span>
            <a href="https://ijazah.data.kemdikbud.go.id/dasbor/help" target="_blank" className="hidden sm:flex items-center gap-1 hover:text-yellow-300 transition-colors">
              E-Rapor <FiExternalLink size={10} />
            </a>
          </div>
        </div>
      </div>

      {/* Main Nav */}
      <nav className={`transition-all duration-500 ${
        scrolled
          ? 'bg-white/80 backdrop-blur-xl shadow-lg shadow-black/5 border-b border-white/20'
          : 'bg-white/95 backdrop-blur-sm'
      }`}>
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 bg-gradient-to-br from-green-600 to-green-800 rounded-xl flex items-center justify-center text-white font-bold text-sm shadow-md group-hover:shadow-lg group-hover:scale-105 transition-all duration-300">
                SK
              </div>
              <div className="hidden sm:block">
                <span className="font-bold text-green-800 text-sm leading-tight block">SD KARTIKA X-2</span>
                <span className="text-[10px] text-gray-500 leading-tight">Jakarta Selatan</span>
              </div>
            </Link>

            {/* Desktop Menu */}
            <div className="hidden lg:flex items-center gap-1">
              <NavLink href="/">Beranda</NavLink>
              <div className="relative group">
                <button className="px-4 py-2 text-gray-700 hover:text-green-700 font-medium transition-colors text-sm flex items-center gap-1 rounded-lg hover:bg-green-50/50">
                  Tentang <FiChevronDown size={12} className="group-hover:rotate-180 transition-transform duration-300" />
                </button>
                <div className="absolute top-full left-0 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform group-hover:translate-y-0 translate-y-2">
                  <div className="bg-white/95 backdrop-blur-xl shadow-xl shadow-black/10 rounded-xl py-2 min-w-[200px] border border-gray-100/50">
                    <Link href="/profil" className="block px-4 py-2.5 hover:bg-green-50 text-gray-700 text-sm transition-colors hover:text-green-700 hover:pl-5">
                      Profil Sekolah
                    </Link>
                    <Link href="/guru-staff" className="block px-4 py-2.5 hover:bg-green-50 text-gray-700 text-sm transition-colors hover:text-green-700 hover:pl-5">
                      Guru & Staff
                    </Link>
                  </div>
                </div>
              </div>
              <NavLink href="/fasilitas">Fasilitas</NavLink>
              <NavLink href="/ekstrakurikuler">Ekstrakurikuler</NavLink>
              <NavLink href="/berita">Berita</NavLink>
              <NavLink href="/kontak">Kontak</NavLink>
            </div>

            {/* Right Actions */}
            <div className="hidden lg:flex items-center gap-3">
              <Link href="/login" className="text-sm text-gray-600 hover:text-green-700 font-medium px-3 py-2 rounded-lg hover:bg-green-50/50 transition-all">
                Login
              </Link>
              <Link href="/ppdb" className="relative overflow-hidden bg-gradient-to-r from-red-500 to-red-600 text-white px-5 py-2.5 rounded-full font-semibold text-sm hover:from-red-600 hover:to-red-700 transition-all shadow-md hover:shadow-lg hover:scale-105 active:scale-95 duration-300">
                <span className="relative z-10">PPDB</span>
                <span className="absolute inset-0 bg-gradient-to-r from-red-400 to-red-500 opacity-0 hover:opacity-100 transition-opacity"></span>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden text-gray-700 p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              {isOpen ? <FiX size={22} /> : <FiMenu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`lg:hidden overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
          <div className="container mx-auto px-4 pb-6 pt-2 space-y-1 border-t border-gray-100">
            <MobileLink href="/" onClick={() => setIsOpen(false)}>Beranda</MobileLink>
            <div>
              <button
                onClick={() => setAboutOpen(!aboutOpen)}
                className="w-full text-left px-4 py-2.5 text-gray-700 hover:text-green-700 font-medium flex items-center justify-between rounded-lg hover:bg-green-50/50 transition-all"
              >
                Tentang
                <FiChevronDown size={14} className={`transition-transform duration-300 ${aboutOpen ? 'rotate-180' : ''}`} />
              </button>
              <div className={`overflow-hidden transition-all duration-300 ${aboutOpen ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}>
                <div className="ml-4 space-y-1 py-1">
                  <MobileLink href="/profil" onClick={() => setIsOpen(false)}>Profil Sekolah</MobileLink>
                  <MobileLink href="/guru-staff" onClick={() => setIsOpen(false)}>Guru & Staff</MobileLink>
                </div>
              </div>
            </div>
            <MobileLink href="/fasilitas" onClick={() => setIsOpen(false)}>Fasilitas</MobileLink>
            <MobileLink href="/ekstrakurikuler" onClick={() => setIsOpen(false)}>Ekstrakurikuler</MobileLink>
            <MobileLink href="/berita" onClick={() => setIsOpen(false)}>Berita</MobileLink>
            <MobileLink href="/kontak" onClick={() => setIsOpen(false)}>Kontak</MobileLink>
            <div className="pt-4 border-t border-gray-100 flex items-center gap-3">
              <Link href="/login" className="text-green-700 font-medium text-sm px-4 py-2 rounded-lg border border-green-200 hover:bg-green-50 transition-all" onClick={() => setIsOpen(false)}>
                Login
              </Link>
              <Link href="/ppdb" className="bg-gradient-to-r from-red-500 to-red-600 text-white px-5 py-2 rounded-full font-semibold text-sm shadow-md" onClick={() => setIsOpen(false)}>
                PPDB
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </header>
  )
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className="px-4 py-2 text-gray-700 hover:text-green-700 font-medium transition-colors text-sm rounded-lg hover:bg-green-50/50">
      {children}
    </Link>
  )
}

function MobileLink({ href, children, onClick }: { href: string; children: React.ReactNode; onClick?: () => void }) {
  return (
    <Link href={href} className="block px-4 py-2.5 text-gray-700 hover:text-green-700 font-medium rounded-lg hover:bg-green-50/50 transition-all" onClick={onClick}>
      {children}
    </Link>
  )
}
