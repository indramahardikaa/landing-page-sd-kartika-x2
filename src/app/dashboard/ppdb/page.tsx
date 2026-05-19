"use client"

import { useEffect, useState } from "react"
import { FiCalendar, FiSave, FiRefreshCw } from "react-icons/fi"
import toast from "react-hot-toast"

interface PPDBSettings {
  id: string
  title: string
  description: string
  startDate: string
  endDate: string
  isActive: boolean
  registrationUrl: string | null
  whatsappNumber: string | null
  quota: number
  year: string
}

export default function PPDBDashboard() {
  const [settings, setSettings] = useState<PPDBSettings | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [form, setForm] = useState({
    title: "PPDB 2025/2026",
    description: "Penerimaan Peserta Didik Baru SD KARTIKA X-2",
    startDate: "",
    endDate: "",
    isActive: true,
    registrationUrl: "",
    whatsappNumber: "",
    quota: 120,
    year: "2025/2026",
  })

  useEffect(() => {
    fetchSettings()
  }, [])

  async function fetchSettings() {
    setLoading(true)
    try {
      const res = await fetch("/api/ppdb-settings")
      const data = await res.json()
      if (data && data.id) {
        setSettings(data)
        setForm({
          title: data.title || "",
          description: data.description || "",
          startDate: data.startDate ? new Date(data.startDate).toISOString().slice(0, 16) : "",
          endDate: data.endDate ? new Date(data.endDate).toISOString().slice(0, 16) : "",
          isActive: data.isActive,
          registrationUrl: data.registrationUrl || "",
          whatsappNumber: data.whatsappNumber || "",
          quota: data.quota || 100,
          year: data.year || "2025/2026",
        })
      }
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)

    try {
      if (settings) {
        // Update existing
        const res = await fetch("/api/ppdb-settings", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: settings.id, ...form }),
        })
        if (res.ok) {
          toast.success("Pengaturan PPDB berhasil diperbarui!")
          fetchSettings()
        } else {
          toast.error("Gagal menyimpan")
        }
      } else {
        // Create new
        const res = await fetch("/api/ppdb-settings", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        })
        if (res.ok) {
          toast.success("Pengaturan PPDB berhasil dibuat!")
          fetchSettings()
        } else {
          toast.error("Gagal menyimpan")
        }
      }
    } catch (error) {
      toast.error("Terjadi kesalahan")
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="flex items-center gap-3 text-gray-500">
          <FiRefreshCw className="animate-spin" size={20} />
          <span>Memuat data...</span>
        </div>
      </div>
    )
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Pengaturan PPDB</h1>
        <p className="text-gray-500 text-sm mt-1">Atur countdown timer dan informasi PPDB yang tampil di halaman publik.</p>
      </div>

      <form onSubmit={handleSave}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Settings */}
          <div className="lg:col-span-2 space-y-6">
            {/* General Info */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h2 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <FiCalendar className="text-green-600" />
                Informasi Umum
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Judul PPDB</label>
                  <input
                    type="text"
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                    placeholder="Contoh: PPDB 2025/2026"
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Deskripsi</label>
                  <textarea
                    rows={3}
                    value={form.description}
                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                    placeholder="Deskripsi singkat tentang PPDB"
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none resize-none transition-all"
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Tahun Ajaran</label>
                    <input
                      type="text"
                      value={form.year}
                      onChange={(e) => setForm({ ...form, year: e.target.value })}
                      placeholder="2025/2026"
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Kuota Siswa</label>
                    <input
                      type="number"
                      value={form.quota}
                      onChange={(e) => setForm({ ...form, quota: parseInt(e.target.value) || 0 })}
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Date Settings */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h2 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <FiCalendar className="text-blue-600" />
                Pengaturan Waktu Countdown
              </h2>
              <p className="text-sm text-gray-500 mb-4">Atur tanggal mulai dan berakhir pendaftaran. Countdown akan ditampilkan otomatis di halaman PPDB dan beranda.</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Tanggal Mulai</label>
                  <input
                    type="datetime-local"
                    value={form.startDate}
                    onChange={(e) => setForm({ ...form, startDate: e.target.value })}
                    required
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Tanggal Berakhir</label>
                  <input
                    type="datetime-local"
                    value={form.endDate}
                    onChange={(e) => setForm({ ...form, endDate: e.target.value })}
                    required
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all"
                  />
                </div>
              </div>
            </div>

            {/* Contact & URL */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h2 className="font-semibold text-gray-800 mb-4">Kontak & Link</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Nomor WhatsApp</label>
                  <input
                    type="text"
                    value={form.whatsappNumber}
                    onChange={(e) => setForm({ ...form, whatsappNumber: e.target.value })}
                    placeholder="6281234567890 (format internasional tanpa +)"
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all"
                  />
                  <p className="text-xs text-gray-400 mt-1">Contoh: 6281234567890</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Link Pendaftaran Online (opsional)</label>
                  <input
                    type="url"
                    value={form.registrationUrl}
                    onChange={(e) => setForm({ ...form, registrationUrl: e.target.value })}
                    placeholder="https://forms.google.com/..."
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Status */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h2 className="font-semibold text-gray-800 mb-4">Status</h2>
              <label className="flex items-center gap-3 cursor-pointer group">
                <div className="relative">
                  <input
                    type="checkbox"
                    checked={form.isActive}
                    onChange={(e) => setForm({ ...form, isActive: e.target.checked })}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-green-500 transition-colors duration-300"></div>
                  <div className="absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow peer-checked:translate-x-5 transition-transform duration-300"></div>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-700">PPDB Aktif</span>
                  <p className="text-xs text-gray-400">Tampilkan countdown di halaman publik</p>
                </div>
              </label>
            </div>

            {/* Preview */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-100">
              <h2 className="font-semibold text-gray-800 mb-3 text-sm">Preview Status</h2>
              {form.startDate && form.endDate && (
                <div className="space-y-2">
                  <div className="text-xs text-gray-500">
                    <span className="font-medium">Mulai:</span>{" "}
                    {new Date(form.startDate).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                  </div>
                  <div className="text-xs text-gray-500">
                    <span className="font-medium">Berakhir:</span>{" "}
                    {new Date(form.endDate).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                  </div>
                  <div className="mt-3 pt-3 border-t border-green-200">
                    {(() => {
                      const now = new Date().getTime()
                      const start = new Date(form.startDate).getTime()
                      const end = new Date(form.endDate).getTime()
                      if (now < start) return <span className="text-xs font-medium px-2 py-1 bg-yellow-100 text-yellow-700 rounded-full">Belum Dibuka</span>
                      if (now >= start && now <= end) return <span className="text-xs font-medium px-2 py-1 bg-green-100 text-green-700 rounded-full">Sedang Berlangsung</span>
                      return <span className="text-xs font-medium px-2 py-1 bg-red-100 text-red-700 rounded-full">Telah Berakhir</span>
                    })()}
                  </div>
                </div>
              )}
              {!form.startDate && (
                <p className="text-xs text-gray-400">Isi tanggal untuk melihat preview status.</p>
              )}
            </div>

            {/* Save Button */}
            <button
              type="submit"
              disabled={saving}
              className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white py-3 rounded-xl font-semibold hover:from-green-700 hover:to-green-800 transition-all duration-300 shadow-md hover:shadow-lg disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {saving ? (
                <>
                  <FiRefreshCw className="animate-spin" size={18} />
                  Menyimpan...
                </>
              ) : (
                <>
                  <FiSave size={18} />
                  Simpan Pengaturan
                </>
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}
