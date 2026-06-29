"use client"

import Link from "next/link"
import Image from "next/image"
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
            <a href="tel:+0217362900" className="flex items-center gap-1.5 hover:text-yellow-300 transition">
              <FiPhone size={13} />
              <span className="hidden sm:inline">(021) 7362900</span>
            </a>
            <a href="mailto:sdkartikax2@gmail.com" className="flex items-center gap-1.5 hover:text-yellow-300 transition">
              <FiMail size={13} />
              <span className="hidden sm:inline">sdkartikax2@gmail.com</span>
            </a>
          </div>
          <a href="https://ijazah.data.kemdikbud.go.id/dasbor/help" target="_blank" className="hover:text-yellow-300 transition font-medium">
            E-Rapor
          </a>
        </div>
      </div>

      {/* Main Nav */}
      <nav className="bg-white shadow-md sticky top-0 z-50 border-b-2 border-green-600">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3">
              <Image
                src="/images/logo-sekolah.svg"
                alt="Logo SD Kartika X-2"
                width={42}
                height={42}
                className="rounded-full"
              />
              <div className="hidden sm:block">
                <span className="font-extrabold text-green-800 text-base leading-tight block">SD KARTIKA X-2</span>
                <span className="text-[10px] text-gray-500 font-medium">Jakarta Selatan</span>
              </div>
            </Link>

            {/* Desktop Menu */}
            <div className="hidden lg:flex items-center gap-1">
              <Link href="/" className="text-gray-700 hover:text-green-700 hover:bg-green-50 font-medium transition px-3 py-2 rounded-lg text-sm">Beranda</Link>
              <div className="relative group">
                <button className="text-gray-700 hover:text-green-700 hover:bg-green-50 font-medium transition flex items-center gap-1 px-3 py-2 rounded-lg text-sm">
                  Tentang <FiChevronDown size={13} />
                </button>
                <div className="absolute top-full left-0 bg-white shadow-xl rounded-xl py-2 min-w-[180px] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all border border-gray-100">
                  <Link href="/profil" className="block px-4 py-2.5 hover:bg-green-50 text-gray-700 text-sm font-medium">Profil Sekolah</Link>
                  <Link href="/guru-staff" className="block px-4 py-2.5 hover:bg-green-50 text-gray-700 text-sm font-medium">Guru & Staff</Link>
                </div>
              </div>
              <Link href="/fasilitas" className="text-gray-700 hover:text-green-700 hover:bg-green-50 font-medium transition px-3 py-2 rounded-lg text-sm">Fasilitas</Link>
              <Link href="/ekstrakurikuler" className="text-gray-700 hover:text-green-700 hover:bg-green-50 font-medium transition px-3 py-2 rounded-lg text-sm">Ekstrakurikuler</Link>
              <Link href="/berita" className="text-gray-700 hover:text-green-700 hover:bg-green-50 font-medium transition px-3 py-2 rounded-lg text-sm">Berita</Link>
              <Link href="/kontak" className="text-gray-700 hover:text-green-700 hover:bg-green-50 font-medium transition px-3 py-2 rounded-lg text-sm">Kontak</Link>
            </div>

            {/* CTA Buttons */}
            <div className="hidden lg:flex items-center gap-2">
              <Link href="/login" className="text-sm text-gray-500 hover:text-green-700 font-medium px-3 py-2 rounded-lg hover:bg-gray-50 transition">Login</Link>
              <Link href="/ppdb" className="bg-red-500 text-white px-5 py-2 rounded-full font-bold text-sm hover:bg-red-600 transition shadow-md hover:shadow-lg">
                PPDB 2025
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button onClick={() => setIsOpen(!isOpen)} className="lg:hidden text-gray-700 p-2 hover:bg-gray-100 rounded-lg">
              {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="lg:hidden bg-white border-t pb-4 shadow-lg">
            <div className="container mx-auto px-4 pt-4 space-y-2">
              <Link href="/" className="block text-gray-700 hover:text-green-700 font-medium py-2 px-3 rounded-lg hover:bg-green-50" onClick={() => setIsOpen(false)}>Beranda</Link>
              <div>
                <button onClick={() => setAboutOpen(!aboutOpen)} className="w-full text-left text-gray-700 hover:text-green-700 font-medium flex items-center gap-1 py-2 px-3 rounded-lg hover:bg-green-50">
                  Tentang <FiChevronDown size={14} className={`transition ${aboutOpen ? 'rotate-180' : ''}`} />
                </button>
                {aboutOpen && (
                  <div className="ml-4 space-y-1 mt-1">
                    <Link href="/profil" className="block text-gray-600 hover:text-green-700 py-2 px-3 rounded-lg hover:bg-green-50 text-sm" onClick={() => setIsOpen(false)}>Profil Sekolah</Link>
                    <Link href="/guru-staff" className="block text-gray-600 hover:text-green-700 py-2 px-3 rounded-lg hover:bg-green-50 text-sm" onClick={() => setIsOpen(false)}>Guru & Staff</Link>
                  </div>
                )}
              </div>
              <Link href="/fasilitas" className="block text-gray-700 hover:text-green-700 font-medium py-2 px-3 rounded-lg hover:bg-green-50" onClick={() => setIsOpen(false)}>Fasilitas</Link>
              <Link href="/ekstrakurikuler" className="block text-gray-700 hover:text-green-700 font-medium py-2 px-3 rounded-lg hover:bg-green-50" onClick={() => setIsOpen(false)}>Ekstrakurikuler</Link>
              <Link href="/berita" className="block text-gray-700 hover:text-green-700 font-medium py-2 px-3 rounded-lg hover:bg-green-50" onClick={() => setIsOpen(false)}>Berita</Link>
              <Link href="/kontak" className="block text-gray-700 hover:text-green-700 font-medium py-2 px-3 rounded-lg hover:bg-green-50" onClick={() => setIsOpen(false)}>Kontak</Link>
              <div className="pt-3 border-t flex gap-3 mt-3">
                <Link href="/login" className="text-green-700 font-bold py-2 px-4 rounded-lg hover:bg-green-50" onClick={() => setIsOpen(false)}>Login</Link>
                <Link href="/ppdb" className="bg-red-500 text-white px-5 py-2 rounded-full font-bold text-sm shadow-md" onClick={() => setIsOpen(false)}>PPDB 2025</Link>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}
