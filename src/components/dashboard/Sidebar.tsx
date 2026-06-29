"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { signOut } from "next-auth/react"
import { useState } from "react"
import {
  FiHome, FiFileText, FiUsers, FiGrid, FiStar,
  FiMail, FiSettings, FiLogOut, FiMenu, FiX,
  FiImage, FiBell, FiUserPlus, FiList, FiSliders,
  FiExternalLink
} from "react-icons/fi"

interface SidebarProps {
  user: any
}

export default function DashboardSidebar({ user }: SidebarProps) {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const isAdmin = user.role === "admin"

  const menuItems = [
    { href: "/dashboard", label: "Dashboard", icon: FiHome, roles: ["admin", "guru"] },
    { href: "/dashboard/berita", label: "Berita", icon: FiFileText, roles: ["admin", "guru"] },
    { href: "/dashboard/pengumuman", label: "Pengumuman", icon: FiBell, roles: ["admin", "guru"] },
    { href: "/dashboard/staff", label: "Guru & Staff", icon: FiUsers, roles: ["admin"] },
    { href: "/dashboard/fasilitas", label: "Fasilitas", icon: FiGrid, roles: ["admin"] },
    { href: "/dashboard/ekstrakurikuler", label: "Ekstrakurikuler", icon: FiStar, roles: ["admin"] },
    { href: "/dashboard/banner", label: "Banner/Slider", icon: FiImage, roles: ["admin"] },
    { href: "/dashboard/ppdb", label: "PPDB", icon: FiUserPlus, roles: ["admin"] },
    { href: "/dashboard/pesan", label: "Pesan Masuk", icon: FiMail, roles: ["admin"] },
    { href: "/dashboard/menu", label: "Menu & Navigasi", icon: FiList, roles: ["admin"] },
    { href: "/dashboard/users", label: "Kelola User", icon: FiUsers, roles: ["admin"] },
    { href: "/dashboard/profil-sekolah", label: "Profil Sekolah", icon: FiSettings, roles: ["admin"] },
    { href: "/dashboard/pengaturan", label: "Pengaturan", icon: FiSliders, roles: ["admin"] },
  ]

  const filteredMenu = menuItems.filter(item => item.roles.includes(user.role))

  return (
    <>
      {/* Mobile toggle */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 bg-green-700 text-white p-2 rounded-lg shadow-lg"
      >
        {isOpen ? <FiX size={20} /> : <FiMenu size={20} />}
      </button>

      {/* Overlay */}
      {isOpen && (
        <div className="lg:hidden fixed inset-0 bg-black/50 z-40" onClick={() => setIsOpen(false)} />
      )}

      {/* Sidebar */}
      <aside className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-40 transform transition-transform lg:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'} flex flex-col`}>
        {/* Header */}
        <div className="p-5 border-b bg-gradient-to-r from-green-700 to-green-600">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 backdrop-blur rounded-full flex items-center justify-center text-white font-bold text-sm">
              {user.name?.charAt(0) || "U"}
            </div>
            <div>
              <p className="font-semibold text-white text-sm truncate max-w-[140px]">{user.name}</p>
              <span className={`text-xs px-2 py-0.5 rounded-full ${isAdmin ? 'bg-red-400/30 text-red-100' : 'bg-blue-400/30 text-blue-100'}`}>
                {isAdmin ? "Admin" : "Guru"}
              </span>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto p-3 space-y-0.5">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-3 pt-2 pb-1">Menu Utama</p>
          {filteredMenu.slice(0, 3).map((item) => {
            const isActive = pathname === item.href
            return (
              <Link key={item.href} href={item.href} onClick={() => setIsOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition ${isActive ? 'bg-green-700 text-white shadow-sm' : 'text-gray-600 hover:bg-green-50 hover:text-green-700'}`}>
                <item.icon size={18} />
                {item.label}
              </Link>
            )
          })}

          {isAdmin && (
            <>
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-3 pt-4 pb-1">Konten</p>
              {filteredMenu.slice(3, 7).map((item) => {
                const isActive = pathname === item.href
                return (
                  <Link key={item.href} href={item.href} onClick={() => setIsOpen(false)}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition ${isActive ? 'bg-green-700 text-white shadow-sm' : 'text-gray-600 hover:bg-green-50 hover:text-green-700'}`}>
                    <item.icon size={18} />
                    {item.label}
                  </Link>
                )
              })}

              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-3 pt-4 pb-1">Manajemen</p>
              {filteredMenu.slice(7, 11).map((item) => {
                const isActive = pathname === item.href
                return (
                  <Link key={item.href} href={item.href} onClick={() => setIsOpen(false)}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition ${isActive ? 'bg-green-700 text-white shadow-sm' : 'text-gray-600 hover:bg-green-50 hover:text-green-700'}`}>
                    <item.icon size={18} />
                    {item.label}
                  </Link>
                )
              })}

              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-3 pt-4 pb-1">Pengaturan</p>
              {filteredMenu.slice(11).map((item) => {
                const isActive = pathname === item.href
                return (
                  <Link key={item.href} href={item.href} onClick={() => setIsOpen(false)}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition ${isActive ? 'bg-green-700 text-white shadow-sm' : 'text-gray-600 hover:bg-green-50 hover:text-green-700'}`}>
                    <item.icon size={18} />
                    {item.label}
                  </Link>
                )
              })}
            </>
          )}
        </nav>

        {/* Footer */}
        <div className="p-3 border-t bg-gray-50">
          <Link href="/" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-600 hover:bg-white hover:text-green-700 transition mb-1">
            <FiExternalLink size={18} />
            Lihat Website
          </Link>
          <button
            onClick={() => signOut({ callbackUrl: "/login" })}
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 transition w-full"
          >
            <FiLogOut size={18} />
            Logout
          </button>
        </div>
      </aside>
    </>
  )
}
