"use client"

import { useEffect, useState } from "react"
import { FiPlus, FiEdit2, FiTrash2 } from "react-icons/fi"
import toast from "react-hot-toast"

interface Extra { id: string; name: string; description: string }

export default function EkstrakurikulerDashboard() {
  const [data, setData] = useState<Extra[]>([])
  const [showForm, setShowForm] = useState(false)
  const [editId, setEditId] = useState<string | null>(null)
  const [form, setForm] = useState({ name: "", description: "" })

  useEffect(() => { fetchData() }, [])

  async function fetchData() {
    const res = await fetch("/api/extracurriculars")
    setData(await res.json())
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const method = editId ? "PUT" : "POST"
    const url = editId ? `/api/extracurriculars/${editId}` : "/api/extracurriculars"
    const res = await fetch(url, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) })
    if (res.ok) {
      toast.success(editId ? "Diperbarui!" : "Ditambahkan!")
      setShowForm(false); setEditId(null); setForm({ name: "", description: "" }); fetchData()
    } else toast.error("Gagal menyimpan")
  }

  async function handleDelete(id: string) {
    if (!confirm("Yakin menghapus?")) return
    const res = await fetch(`/api/extracurriculars/${id}`, { method: "DELETE" })
    if (res.ok) { toast.success("Dihapus!"); fetchData() } else toast.error("Gagal")
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Kelola Ekstrakurikuler</h1>
        <button onClick={() => { setShowForm(true); setEditId(null); setForm({ name: "", description: "" }) }}
          className="bg-green-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-green-800">
          <FiPlus /> Tambah
        </button>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 w-full max-w-lg">
            <h2 className="text-lg font-bold mb-4">{editId ? "Edit" : "Tambah"} Ekstrakurikuler</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input type="text" placeholder="Nama" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required className="w-full px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-green-500" />
              <textarea rows={4} placeholder="Deskripsi" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} required className="w-full px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-green-500 resize-none" />
              <div className="flex gap-3">
                <button type="submit" className="bg-green-700 text-white px-6 py-2 rounded-lg hover:bg-green-800">Simpan</button>
                <button type="button" onClick={() => setShowForm(false)} className="px-6 py-2 border rounded-lg hover:bg-gray-50">Batal</button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {data.map((e) => (
          <div key={e.id} className="bg-white rounded-xl p-6 shadow-sm border hover:shadow-md transition">
            <h3 className="font-semibold text-gray-800 mb-2">{e.name}</h3>
            <p className="text-sm text-gray-600 mb-4">{e.description}</p>
            <div className="flex gap-2">
              <button onClick={() => { setEditId(e.id); setForm({ name: e.name, description: e.description }); setShowForm(true) }} className="text-blue-600 hover:bg-blue-50 p-1.5 rounded"><FiEdit2 size={16} /></button>
              <button onClick={() => handleDelete(e.id)} className="text-red-600 hover:bg-red-50 p-1.5 rounded"><FiTrash2 size={16} /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
