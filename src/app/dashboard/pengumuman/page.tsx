"use client"

import { useEffect, useState } from "react"
import { FiPlus, FiEdit2, FiTrash2, FiBell, FiEye, FiEyeOff } from "react-icons/fi"
import toast from "react-hot-toast"

interface Announcement {
  id: string
  title: string
  content: string
  isActive: boolean
  priority: string
  startDate: string | null
  endDate: string | null
  author: { name: string }
  createdAt: string
}

export default function PengumumanDashboard() {
  const [data, setData] = useState<Announcement[]>([])
  const [showForm, setShowForm] = useState(false)
  const [editId, setEditId] = useState<string | null>(null)
  const [form, setForm] = useState({
    title: "", content: "", isActive: true, priority: "normal",
    startDate: "", endDate: "",
  })

  useEffect(() => { fetchData() }, [])

  async function fetchData() {
    const res = await fetch("/api/announcements")
    setData(await res.json())
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const method = editId ? "PUT" : "POST"
    const url = editId ? `/api/announcements/${editId}` : "/api/announcements"

    const payload: any = { ...form }
    if (!payload.startDate) delete payload.startDate
    if (!payload.endDate) delete payload.endDate

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
    if (res.ok) {
      toast.success(editId ? "Pengumuman diperbarui!" : "Pengumuman ditambahkan!")
      setShowForm(false); setEditId(null)
      setForm({ title: "", content: "", isActive: true, priority: "normal", startDate: "", endDate: "" })
      fetchData()
    } else toast.error("Gagal menyimpan")
  }

  async function handleDelete(id: string) {
    if (!confirm("Yakin ingin menghapus pengumuman ini?")) return
    const res = await fetch(`/api/announcements/${id}`, { method: "DELETE" })
    if (res.ok) { toast.success("Pengumuman dihapus!"); fetchData() }
    else toast.error("Gagal menghapus")
  }

  async function toggleActive(item: Announcement) {
    const res = await fetch(`/api/announcements/${item.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ isActive: !item.isActive }),
    })
    if (res.ok) { toast.success("Status diperbarui!"); fetchData() }
  }

  function handleEdit(a: Announcement) {
    setEditId(a.id)
    setForm({
      title: a.title, content: a.content, isActive: a.isActive,
      priority: a.priority,
      startDate: a.startDate ? a.startDate.split("T")[0] : "",
      endDate: a.endDate ? a.endDate.split("T")[0] : "",
    })
    setShowForm(true)
  }

  const priorityColors: Record<string, string> = {
    low: "bg-gray-100 text-gray-700",
    normal: "bg-blue-100 text-blue-700",
    high: "bg-orange-100 text-orange-700",
    urgent: "bg-red-100 text-red-700",
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Kelola Pengumuman</h1>
          <p className="text-sm text-gray-500">Pengumuman akan tampil di halaman utama website</p>
        </div>
        <button
          onClick={() => { setShowForm(true); setEditId(null); setForm({ title: "", content: "", isActive: true, priority: "normal", startDate: "", endDate: "" }) }}
          className="bg-green-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-green-800 transition"
        >
          <FiPlus /> Tambah Pengumuman
        </button>
      </div>

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <h2 className="text-lg font-bold mb-4">{editId ? "Edit" : "Tambah"} Pengumuman</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Judul *</label>
                <input
                  type="text"
                  placeholder="Judul pengumuman"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  required
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Isi Pengumuman *</label>
                <textarea
                  rows={5}
                  placeholder="Tulis isi pengumuman..."
                  value={form.content}
                  onChange={(e) => setForm({ ...form, content: e.target.value })}
                  required
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 outline-none resize-none"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Prioritas</label>
                  <select
                    value={form.priority}
                    onChange={(e) => setForm({ ...form, priority: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
                  >
                    <option value="low">Rendah</option>
                    <option value="normal">Normal</option>
                    <option value="high">Tinggi</option>
                    <option value="urgent">Urgent</option>
                  </select>
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
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Mulai Tampil</label>
                  <input
                    type="date"
                    value={form.startDate}
                    onChange={(e) => setForm({ ...form, startDate: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Berakhir</label>
                  <input
                    type="date"
                    value={form.endDate}
                    onChange={(e) => setForm({ ...form, endDate: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
                  />
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

      {/* Announcements List */}
      {data.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-xl border">
          <FiBell className="mx-auto text-gray-300" size={64} />
          <p className="text-gray-500 mt-4">Belum ada pengumuman</p>
        </div>
      ) : (
        <div className="space-y-3">
          {data.map((a) => (
            <div key={a.id} className={`bg-white rounded-xl p-5 shadow-sm border hover:shadow-md transition ${!a.isActive ? 'opacity-60' : ''}`}>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-gray-800">{a.title}</h3>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${priorityColors[a.priority]}`}>
                      {a.priority}
                    </span>
                    {a.isActive ? (
                      <span className="text-xs px-2 py-0.5 rounded-full bg-green-100 text-green-700">Aktif</span>
                    ) : (
                      <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-600">Nonaktif</span>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 line-clamp-2 mb-2">{a.content}</p>
                  <div className="flex items-center gap-3 text-xs text-gray-400">
                    <span>Oleh: {a.author.name}</span>
                    <span>{new Date(a.createdAt).toLocaleDateString('id-ID')}</span>
                    {a.startDate && <span>Mulai: {new Date(a.startDate).toLocaleDateString('id-ID')}</span>}
                    {a.endDate && <span>Berakhir: {new Date(a.endDate).toLocaleDateString('id-ID')}</span>}
                  </div>
                </div>
                <div className="flex gap-1 ml-4">
                  <button onClick={() => toggleActive(a)} className={`p-1.5 rounded ${a.isActive ? 'text-yellow-600 hover:bg-yellow-50' : 'text-green-600 hover:bg-green-50'}`}>
                    {a.isActive ? <FiEyeOff size={16} /> : <FiEye size={16} />}
                  </button>
                  <button onClick={() => handleEdit(a)} className="p-1.5 text-blue-600 hover:bg-blue-50 rounded">
                    <FiEdit2 size={16} />
                  </button>
                  <button onClick={() => handleDelete(a.id)} className="p-1.5 text-red-600 hover:bg-red-50 rounded">
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
