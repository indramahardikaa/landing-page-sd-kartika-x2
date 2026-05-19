"use client"

import { useEffect, useState } from "react"
import { FiPlus, FiEdit2, FiTrash2 } from "react-icons/fi"
import toast from "react-hot-toast"

interface Staff {
  id: string
  name: string
  position: string
  category: string
  quote?: string
  order: number
}

export default function StaffDashboard() {
  const [staff, setStaff] = useState<Staff[]>([])
  const [showForm, setShowForm] = useState(false)
  const [editId, setEditId] = useState<string | null>(null)
  const [form, setForm] = useState({ name: "", position: "", category: "guru", quote: "", order: 0 })

  useEffect(() => { fetchData() }, [])

  async function fetchData() {
    const res = await fetch("/api/staff")
    const data = await res.json()
    setStaff(data)
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const method = editId ? "PUT" : "POST"
    const url = editId ? `/api/staff/${editId}` : "/api/staff"
    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    })
    if (res.ok) {
      toast.success(editId ? "Data diperbarui!" : "Data ditambahkan!")
      setShowForm(false); setEditId(null)
      setForm({ name: "", position: "", category: "guru", quote: "", order: 0 })
      fetchData()
    } else { toast.error("Gagal menyimpan") }
  }

  async function handleDelete(id: string) {
    if (!confirm("Yakin ingin menghapus?")) return
    const res = await fetch(`/api/staff/${id}`, { method: "DELETE" })
    if (res.ok) { toast.success("Data dihapus!"); fetchData() }
    else toast.error("Gagal menghapus")
  }

  function handleEdit(s: Staff) {
    setEditId(s.id)
    setForm({ name: s.name, position: s.position, category: s.category, quote: s.quote || "", order: s.order })
    setShowForm(true)
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Kelola Guru & Staff</h1>
        <button onClick={() => { setShowForm(true); setEditId(null); setForm({ name: "", position: "", category: "guru", quote: "", order: 0 }) }}
          className="bg-green-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-green-800">
          <FiPlus /> Tambah
        </button>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 w-full max-w-lg">
            <h2 className="text-lg font-bold mb-4">{editId ? "Edit" : "Tambah"} Guru/Staff</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input type="text" placeholder="Nama" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required className="w-full px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-green-500" />
              <input type="text" placeholder="Jabatan" value={form.position} onChange={(e) => setForm({ ...form, position: e.target.value })} required className="w-full px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-green-500" />
              <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="w-full px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-green-500">
                <option value="guru">Guru</option>
                <option value="staff">Staff TU</option>
              </select>
              <input type="text" placeholder="Quote (opsional)" value={form.quote} onChange={(e) => setForm({ ...form, quote: e.target.value })} className="w-full px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-green-500" />
              <input type="number" placeholder="Urutan" value={form.order} onChange={(e) => setForm({ ...form, order: parseInt(e.target.value) || 0 })} className="w-full px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-green-500" />
              <div className="flex gap-3">
                <button type="submit" className="bg-green-700 text-white px-6 py-2 rounded-lg hover:bg-green-800">Simpan</button>
                <button type="button" onClick={() => setShowForm(false)} className="px-6 py-2 border rounded-lg hover:bg-gray-50">Batal</button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="bg-white rounded-xl shadow-sm border overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">#</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Nama</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Jabatan</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Kategori</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {staff.map((s, i) => (
              <tr key={s.id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-3 text-sm">{i + 1}</td>
                <td className="px-4 py-3 text-sm font-medium text-gray-800">{s.name}</td>
                <td className="px-4 py-3 text-sm text-gray-600">{s.position}</td>
                <td className="px-4 py-3">
                  <span className={`text-xs px-2 py-1 rounded-full ${s.category === 'guru' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'}`}>
                    {s.category === 'guru' ? 'Guru' : 'Staff TU'}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex gap-2">
                    <button onClick={() => handleEdit(s)} className="p-1.5 text-blue-600 hover:bg-blue-50 rounded"><FiEdit2 size={16} /></button>
                    <button onClick={() => handleDelete(s.id)} className="p-1.5 text-red-600 hover:bg-red-50 rounded"><FiTrash2 size={16} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
