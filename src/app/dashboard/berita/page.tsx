"use client"

import { useEffect, useState } from "react"
import { FiPlus, FiEdit2, FiTrash2 } from "react-icons/fi"
import toast from "react-hot-toast"

interface News {
  id: string
  title: string
  content: string
  published: boolean
  author: { name: string }
  createdAt: string
}

export default function BeritaDashboard() {
  const [news, setNews] = useState<News[]>([])
  const [showForm, setShowForm] = useState(false)
  const [editId, setEditId] = useState<string | null>(null)
  const [form, setForm] = useState({ title: "", content: "", published: false })

  useEffect(() => { fetchNews() }, [])

  async function fetchNews() {
    const res = await fetch("/api/news")
    const data = await res.json()
    setNews(data)
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const method = editId ? "PUT" : "POST"
    const url = editId ? `/api/news/${editId}` : "/api/news"

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    })

    if (res.ok) {
      toast.success(editId ? "Berita diperbarui!" : "Berita ditambahkan!")
      setShowForm(false)
      setEditId(null)
      setForm({ title: "", content: "", published: false })
      fetchNews()
    } else {
      toast.error("Gagal menyimpan")
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Yakin ingin menghapus berita ini?")) return
    const res = await fetch(`/api/news/${id}`, { method: "DELETE" })
    if (res.ok) {
      toast.success("Berita dihapus!")
      fetchNews()
    } else {
      toast.error("Gagal menghapus")
    }
  }

  function handleEdit(n: News) {
    setEditId(n.id)
    setForm({ title: n.title, content: n.content, published: n.published })
    setShowForm(true)
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Kelola Berita</h1>
        <button
          onClick={() => { setShowForm(true); setEditId(null); setForm({ title: "", content: "", published: false }) }}
          className="bg-green-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-green-800 transition"
        >
          <FiPlus /> Tambah Berita
        </button>
      </div>

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <h2 className="text-lg font-bold mb-4">{editId ? "Edit" : "Tambah"} Berita</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Judul Berita"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                required
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
              />
              <textarea
                rows={6}
                placeholder="Konten Berita"
                value={form.content}
                onChange={(e) => setForm({ ...form, content: e.target.value })}
                required
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 outline-none resize-none"
              />
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={form.published}
                  onChange={(e) => setForm({ ...form, published: e.target.checked })}
                  className="w-4 h-4 text-green-600"
                />
                <span className="text-sm text-gray-700">Publikasikan</span>
              </label>
              <div className="flex gap-3">
                <button type="submit" className="bg-green-700 text-white px-6 py-2 rounded-lg hover:bg-green-800">
                  Simpan
                </button>
                <button type="button" onClick={() => setShowForm(false)} className="px-6 py-2 border rounded-lg hover:bg-gray-50">
                  Batal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* News List */}
      <div className="bg-white rounded-xl shadow-sm border">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Judul</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Author</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Status</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Tanggal</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {news.map((n) => (
                <tr key={n.id} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm font-medium text-gray-800">{n.title}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{n.author.name}</td>
                  <td className="px-4 py-3">
                    <span className={`text-xs px-2 py-1 rounded-full ${n.published ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                      {n.published ? "Published" : "Draft"}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-500">{new Date(n.createdAt).toLocaleDateString('id-ID')}</td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <button onClick={() => handleEdit(n)} className="p-1.5 text-blue-600 hover:bg-blue-50 rounded">
                        <FiEdit2 size={16} />
                      </button>
                      <button onClick={() => handleDelete(n.id)} className="p-1.5 text-red-600 hover:bg-red-50 rounded">
                        <FiTrash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
