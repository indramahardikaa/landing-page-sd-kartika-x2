"use client"

import { useEffect, useState } from "react"
import { FiSave, FiGlobe, FiImage, FiType, FiLayout } from "react-icons/fi"
import toast from "react-hot-toast"

export default function PengaturanDashboard() {
  const [settings, setSettings] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(false)
  const [activeTab, setActiveTab] = useState("general")

  useEffect(() => { fetchData() }, [])

  async function fetchData() {
    const res = await fetch("/api/settings")
    if (res.ok) {
      const data = await res.json()
      const map: Record<string, string> = {}
      data.forEach((s: any) => { map[s.key] = s.value })
      setSettings(map)
    }
  }


  async function handleSave(key: string, value: string, category: string) {
    setLoading(true)
    const res = await fetch("/api/settings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ key, value, category }),
    })
    if (res.ok) toast.success(`${key} berhasil disimpan!`)
    else toast.error("Gagal menyimpan")
    setLoading(false)
  }

  async function handleSaveAll() {
    setLoading(true)
    const entries = Object.entries(settings).map(([key, value]) => ({
      key, value, category: getCategory(key),
    }))
    const res = await fetch("/api/settings", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(entries),
    })
    if (res.ok) toast.success("Semua pengaturan berhasil disimpan!")
    else toast.error("Gagal menyimpan")
    setLoading(false)
  }

  function getCategory(key: string): string {
    if (["site_name", "site_tagline", "site_description", "site_logo", "site_favicon"].includes(key)) return "general"
    if (["primary_color", "secondary_color", "font_family"].includes(key)) return "appearance"
    if (["meta_title", "meta_description", "meta_keywords", "og_image"].includes(key)) return "seo"
    if (["ppdb_active", "ppdb_year", "ppdb_start", "ppdb_end", "ppdb_whatsapp"].includes(key)) return "ppdb"
    return "general"
  }


  const tabs = [
    { id: "general", label: "Umum", icon: FiGlobe },
    { id: "appearance", label: "Tampilan", icon: FiLayout },
    { id: "seo", label: "SEO", icon: FiType },
    { id: "ppdb", label: "PPDB", icon: FiImage },
  ]

  const generalFields = [
    { key: "site_name", label: "Nama Website", placeholder: "SD KARTIKA X-2" },
    { key: "site_tagline", label: "Tagline", placeholder: "Cerdas, Berkarakter, Berprestasi" },
    { key: "site_description", label: "Deskripsi Singkat", placeholder: "Website resmi SD KARTIKA X-2..." },
    { key: "site_logo", label: "URL Logo", placeholder: "https://..." },
    { key: "site_favicon", label: "URL Favicon", placeholder: "https://..." },
  ]

  const appearanceFields = [
    { key: "primary_color", label: "Warna Utama (hex)", placeholder: "#006400" },
    { key: "secondary_color", label: "Warna Sekunder (hex)", placeholder: "#FFD700" },
    { key: "font_family", label: "Font Family", placeholder: "Inter" },
  ]

  const seoFields = [
    { key: "meta_title", label: "Meta Title", placeholder: "SD KARTIKA X-2 | ..." },
    { key: "meta_description", label: "Meta Description", placeholder: "Deskripsi website..." },
    { key: "meta_keywords", label: "Meta Keywords", placeholder: "sd kartika, sekolah..." },
    { key: "og_image", label: "OG Image URL", placeholder: "https://..." },
  ]

  const ppdbFields = [
    { key: "ppdb_active", label: "PPDB Aktif (true/false)", placeholder: "true" },
    { key: "ppdb_year", label: "Tahun Ajaran", placeholder: "2025/2026" },
    { key: "ppdb_start", label: "Tanggal Mulai", placeholder: "2025-06-01" },
    { key: "ppdb_end", label: "Tanggal Selesai", placeholder: "2025-06-30" },
    { key: "ppdb_whatsapp", label: "WhatsApp Info PPDB", placeholder: "628xxxxxxxxxx" },
  ]

  const currentFields = activeTab === "general" ? generalFields
    : activeTab === "appearance" ? appearanceFields
    : activeTab === "seo" ? seoFields : ppdbFields


  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Pengaturan Website</h1>
          <p className="text-sm text-gray-500">Konfigurasi tampilan dan fitur website secara keseluruhan</p>
        </div>
        <button
          onClick={handleSaveAll}
          disabled={loading}
          className="bg-green-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-green-800 transition disabled:opacity-50"
        >
          <FiSave /> Simpan Semua
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6 overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition whitespace-nowrap ${
              activeTab === tab.id ? 'bg-green-700 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            <tab.icon size={16} /> {tab.label}
          </button>
        ))}
      </div>

      {/* Settings Fields */}
      <div className="space-y-4">
        {currentFields.map((field) => (
          <div key={field.key} className="bg-white rounded-xl p-5 shadow-sm border">
            <div className="flex flex-col sm:flex-row sm:items-center gap-3">
              <div className="flex-1">
                <label className="block text-sm font-semibold text-gray-700 mb-1">{field.label}</label>
                <input
                  type="text"
                  placeholder={field.placeholder}
                  value={settings[field.key] || ""}
                  onChange={(e) => setSettings({ ...settings, [field.key]: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
              <button
                onClick={() => handleSave(field.key, settings[field.key] || "", activeTab)}
                disabled={loading}
                className="mt-2 sm:mt-6 bg-green-700 text-white px-4 py-2 rounded-lg text-sm hover:bg-green-800 disabled:opacity-50 transition shrink-0"
              >
                Simpan
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Color Preview */}
      {activeTab === "appearance" && (
        <div className="mt-6 bg-white rounded-xl p-5 shadow-sm border">
          <h3 className="font-semibold text-gray-700 mb-3">Preview Warna</h3>
          <div className="flex gap-4">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-lg border" style={{ backgroundColor: settings.primary_color || "#006400" }}></div>
              <span className="text-sm text-gray-600">Primary</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-lg border" style={{ backgroundColor: settings.secondary_color || "#FFD700" }}></div>
              <span className="text-sm text-gray-600">Secondary</span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
