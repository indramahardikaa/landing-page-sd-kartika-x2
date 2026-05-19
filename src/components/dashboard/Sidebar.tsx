"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { signOut } from "next-auth/react"
import { useState } from "react"
import {
  FiHome, FiFileText, FiUsers, FiGrid, FiStar,
  FiMail, FiSettings, FiLogOut, FiMenu, FiX
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
    { href: "/dashboard/staff", label: "Guru & Staff", icon: FiUsers, roles: ["admin"] },
    { href: "/dashboard/fasilitas", label: "Fasilitas", icon: FiGrid, roles: ["admin"] },
    { href: "/dashboard/ekstrakurikuler", label: "Ekstrakurikuler", icon: FiStar, roles: ["admin"] },
    { href: "/dashboard/pesan", label: "Pesan Masuk", icon: FiMail, roles: ["admin"] },
    { href: "/dashboard/profil-sekolah", label: "Profil Sekolah", icon: FiSettings, roles: ["admin"] },
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
      <aside className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-40 transform transition-transform lg:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-6 border-b">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-700 rounded-full flex items-center justify-center text-white font-bold text-sm">
              {user.name?.charAt(0) || "U"}
            </div>
            <div>
              <p className="font-semibold text-gray-800 text-sm">{user.name}</p>
              <span className={`text-xs px-2 py-0.5 rounded-full ${isAdmin ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'}`}>
                {isAdmin ? "Admin" : "Guru"}
              </span>
            </div>
          </div>
        </div>

        <nav className="p-4 space-y-1">
          {filteredMenu.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition ${
                  isActive
                    ? 'bg-green-700 text-white'
                    : 'text-gray-600 hover:bg-green-50 hover:text-green-700'
                }`}
              >
                <item.icon size={18} />
                {item.label}
              </Link>
            )
          })}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t">
          <Link href="/" className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 transition mb-1">
            <FiHome size={18} />
            Lihat Website
          </Link>
          <button
            onClick={() => signOut({ callbackUrl: "/login" })}
            className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 transition w-full"
          >
            <FiLogOut size={18} />
            Logout
          </button>
        </div>
      </aside>
    </>
  )
}
