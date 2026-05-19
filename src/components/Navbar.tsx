"use client"

import Link from "next/link"
import { useState } from "react"
import { FiMenu, FiX, FiPhone, FiMail, FiChevronDown } from "react-icons/fi"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [aboutOpen, setAboutOpen] = useState(false)

  return (
    <header className="w-full">
      {/* Top Bar */}
      <div className="bg-green-800 text-white text-sm py-2">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <a href="tel:+0217362900" className="flex items-center gap-1 hover:text-yellow-300">
              <FiPhone size={14} />
              <span className="hidden sm:inline">(021) 7362900</span>
            </a>
            <a href="mailto:sdkartikax2@gmail.com" className="flex items-center gap-1 hover:text-yellow-300">
              <FiMail size={14} />
              <span className="hidden sm:inline">sdkartikax2@gmail.com</span>
            </a>
          </div>
          <a href="https://ijazah.data.kemdikbud.go.id/dasbor/help" target="_blank" className="hover:text-yellow-300">
            E-Rapor
          </a>
        </div>
      </div>

      {/* Main Nav */}
      <nav className="bg-white shadow-md sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2">
              <div className="w-10 h-10 bg-green-700 rounded-full flex items-center justify-center text-white font-bold text-sm">
                SK
              </div>
              <span className="font-bold text-green-800 hidden sm:block">SD KARTIKA X-2</span>
            </Link>

            {/* Desktop Menu */}
            <div className="hidden lg:flex items-center gap-6">
              <Link href="/" className="text-gray-700 hover:text-green-700 font-medium transition">Beranda</Link>
              <div className="relative group">
                <button className="text-gray-700 hover:text-green-700 font-medium transition flex items-center gap-1">
                  Tentang <FiChevronDown size={14} />
                </button>
                <div className="absolute top-full left-0 bg-white shadow-lg rounded-md py-2 min-w-[180px] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                  <Link href="/profil" className="block px-4 py-2 hover:bg-green-50 text-gray-700">Profil Sekolah</Link>
                  <Link href="/guru-staff" className="block px-4 py-2 hover:bg-green-50 text-gray-700">Guru & Staff</Link>
                </div>
              </div>
              <Link href="/fasilitas" className="text-gray-700 hover:text-green-700 font-medium transition">Fasilitas</Link>
              <Link href="/ekstrakurikuler" className="text-gray-700 hover:text-green-700 font-medium transition">Ekstrakurikuler</Link>
              <Link href="/berita" className="text-gray-700 hover:text-green-700 font-medium transition">Berita</Link>
              <Link href="/kontak" className="text-gray-700 hover:text-green-700 font-medium transition">Kontak</Link>
            </div>

            {/* PPDB Button & Login */}
            <div className="hidden lg:flex items-center gap-3">
              <Link href="/login" className="text-sm text-gray-600 hover:text-green-700">Login</Link>
              <Link href="/ppdb" className="bg-red-600 text-white px-5 py-2 rounded-full font-semibold hover:bg-red-700 transition">
                PPDB
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button onClick={() => setIsOpen(!isOpen)} className="lg:hidden text-gray-700">
              {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="lg:hidden bg-white border-t pb-4">
            <div className="container mx-auto px-4 pt-4 space-y-3">
              <Link href="/" className="block text-gray-700 hover:text-green-700 font-medium" onClick={() => setIsOpen(false)}>Beranda</Link>
              <div>
                <button onClick={() => setAboutOpen(!aboutOpen)} className="text-gray-700 hover:text-green-700 font-medium flex items-center gap-1">
                  Tentang <FiChevronDown size={14} className={aboutOpen ? 'rotate-180' : ''} />
                </button>
                {aboutOpen && (
                  <div className="ml-4 mt-2 space-y-2">
                    <Link href="/profil" className="block text-gray-600 hover:text-green-700" onClick={() => setIsOpen(false)}>Profil Sekolah</Link>
                    <Link href="/guru-staff" className="block text-gray-600 hover:text-green-700" onClick={() => setIsOpen(false)}>Guru & Staff</Link>
                  </div>
                )}
              </div>
              <Link href="/fasilitas" className="block text-gray-700 hover:text-green-700 font-medium" onClick={() => setIsOpen(false)}>Fasilitas</Link>
              <Link href="/ekstrakurikuler" className="block text-gray-700 hover:text-green-700 font-medium" onClick={() => setIsOpen(false)}>Ekstrakurikuler</Link>
              <Link href="/berita" className="block text-gray-700 hover:text-green-700 font-medium" onClick={() => setIsOpen(false)}>Berita</Link>
              <Link href="/kontak" className="block text-gray-700 hover:text-green-700 font-medium" onClick={() => setIsOpen(false)}>Kontak</Link>
              <div className="pt-3 border-t flex gap-3">
                <Link href="/login" className="text-green-700 font-medium" onClick={() => setIsOpen(false)}>Login</Link>
                <Link href="/ppdb" className="bg-red-600 text-white px-4 py-2 rounded-full font-semibold text-sm" onClick={() => setIsOpen(false)}>PPDB</Link>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}
