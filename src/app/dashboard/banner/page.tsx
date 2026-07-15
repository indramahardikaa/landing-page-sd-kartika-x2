"use client"

import { useEffect, useState } from "react"
import { FiPlus, FiEdit2, FiTrash2, FiImage, FiEye, FiEyeOff } from "react-icons/fi"
import toast from "react-hot-toast"

interface Banner {
  id: string
  title: string | null
  subtitle: string | null
  image: string
  link: string | null
  isActive: boolean
  order: number
}

export default function BannerDashboard() {
  const [banners, setBanners] = useState<Banner[]>([])
  const [showForm, setShowForm] = useState(false)
  const [editId, setEditId] = useState<string | null>(null)
  const [form, setForm] = useState({ title: "", subtitle: "", image: "", link: "", isActive: true, order: 0 })

  useEffect(() => { fetchData() }, [])

  async function fetchData() {
    const res = await fetch("/api/banners")
    setBanners(await res.json())
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const method = editId ? "PUT" : "POST"
    const url = editId ? `/api/banners/${editId}` : "/api/banners"
    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    })
    if (res.ok) {
      toast.success(editId ? "Banner diperbarui!" : "Banner ditambahkan!")
      setShowForm(false); setEditId(null)
      setForm({ title: "", subtitle: "", image: "", link: "", isActive: true, order: 0 })
      fetchData()
    } else toast.error("Gagal menyimpan")
  }

  async function handleDelete(id: string) {
    if (!confirm("Yakin ingin menghapus banner ini?")) return
    const res = await fetch(`/api/banners/${id}`, { method: "DELETE" })
    if (res.ok) { toast.success("Banner dihapus!"); fetchData() }
    else toast.error("Gagal menghapus")
  }

  async function toggleActive(banner: Banner) {
    const res = await fetch(`/api/banners/${banner.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ isActive: !banner.isActive }),
    })
    if (res.ok) { toast.success("Status diperbarui!"); fetchData() }
  }

  function handleEdit(b: Banner) {
    setEditId(b.id)
    setForm({
      title: b.title || "", subtitle: b.subtitle || "",
      image: b.image, link: b.link || "",
      isActive: b.isActive, order: b.order,
    })
    setShowForm(true)
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Kelola Banner</h1>
          <p className="text-sm text-gray-500">Atur banner/slider yang tampil di halaman utama website</p>
        </div>
        <button
          onClick={() => { setShowForm(true); setEditId(null); setForm({ title: "", subtitle: "", image: "", link: "", isActive: true, order: 0 }) }}
          className="bg-green-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-green-800 transition"
        >
          <FiPlus /> Tambah Banner
        </button>
      </div>

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <h2 className="text-lg font-bold mb-4">{editId ? "Edit" : "Tambah"} Banner</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">URL Gambar *</label>
                <input
                  type="text"
                  placeholder="https://example.com/banner.jpg"
                  value={form.image}
                  onChange={(e) => setForm({ ...form, image: e.target.value })}
                  required
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Judul (opsional)</label>
                <input
                  type="text"
                  placeholder="Judul Banner"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Subtitle (opsional)</label>
                <input
                  type="text"
                  placeholder="Deskripsi singkat banner"
                  value={form.subtitle}
                  onChange={(e) => setForm({ ...form, subtitle: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Link (opsional)</label>
                <input
                  type="text"
                  placeholder="/ppdb atau https://..."
                  value={form.link}
                  onChange={(e) => setForm({ ...form, link: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Urutan</label>
                  <input
                    type="number"
                    value={form.order}
                    onChange={(e) => setForm({ ...form, order: parseInt(e.target.value) || 0 })}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
                  />
                </div>
                <div className="flex items-end">
                  <label className="flex items-center gap-2 pb-2">
                    <input
                      type="checkbox"
                      checked={form.isActive}
                      onChange={(e) => setForm({ ...form, isActive: e.target.checked })}
                      className="w-4 h-4 text-green-600 rounded"
                    />
                    <span className="text-sm text-gray-700">Aktif</span>
                  </label>
                </div>
              </div>
              <div className="flex gap-3 pt-2">
                <button type="submit" className="bg-green-700 text-white px-6 py-2 rounded-lg hover:bg-green-800 transition">
                  Simpan
                </button>
                <button type="button" onClick={() => setShowForm(false)} className="px-6 py-2 border rounded-lg hover:bg-gray-50 transition">
                  Batal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Banner Grid */}
      {banners.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-xl border">
          <FiImage className="mx-auto text-gray-300" size={64} />
          <p className="text-gray-500 mt-4">Belum ada banner</p>
          <p className="text-sm text-gray-400">Klik tombol &quot;Tambah Banner&quot; untuk menambahkan</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {banners.map((b) => (
            <div key={b.id} className={`bg-white rounded-xl shadow-sm border overflow-hidden hover:shadow-md transition ${!b.isActive ? 'opacity-60' : ''}`}>
              <div className="h-40 bg-gradient-to-br from-green-100 to-green-200 flex items-center justify-center relative">
                {b.image.startsWith('http') ? (
                  <img src={b.image} alt={b.title || "Banner"} className="w-full h-full object-cover" />
                ) : (
                  <FiImage className="text-green-600" size={48} />
                )}
                <div className="absolute top-2 right-2">
                  <span className={`text-xs px-2 py-1 rounded-full ${b.isActive ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
                    {b.isActive ? "Aktif" : "Nonaktif"}
                  </span>
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-gray-800 mb-1">{b.title || "(Tanpa Judul)"}</h3>
                {b.subtitle && <p className="text-sm text-gray-500 mb-2">{b.subtitle}</p>}
                <p className="text-xs text-gray-400 mb-3">Urutan: {b.order}</p>
                <div className="flex gap-2">
                  <button onClick={() => toggleActive(b)} className={`p-1.5 rounded ${b.isActive ? 'text-yellow-600 hover:bg-yellow-50' : 'text-green-600 hover:bg-green-50'}`}>
                    {b.isActive ? <FiEyeOff size={16} /> : <FiEye size={16} />}
                  </button>
                  <button onClick={() => handleEdit(b)} className="p-1.5 text-blue-600 hover:bg-blue-50 rounded">
                    <FiEdit2 size={16} />
                  </button>
                  <button onClick={() => handleDelete(b.id)} className="p-1.5 text-red-600 hover:bg-red-50 rounded">
                    <FiTrash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
