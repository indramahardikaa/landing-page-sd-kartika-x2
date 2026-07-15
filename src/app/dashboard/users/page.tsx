"use client"

import { useEffect, useState } from "react"
import { FiPlus, FiEdit2, FiTrash2, FiUsers, FiShield, FiUser } from "react-icons/fi"
import toast from "react-hot-toast"

interface User {
  id: string
  name: string
  email: string
  role: string
  createdAt: string
}

export default function UsersDashboard() {
  const [users, setUsers] = useState<User[]>([])
  const [showForm, setShowForm] = useState(false)
  const [editId, setEditId] = useState<string | null>(null)
  const [form, setForm] = useState({
    name: "", email: "", password: "", role: "guru"
  })


  useEffect(() => { fetchData() }, [])

  async function fetchData() {
    const res = await fetch("/api/users")
    if (res.ok) setUsers(await res.json())
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const method = editId ? "PUT" : "POST"
    const url = editId ? `/api/users/${editId}` : "/api/users"

    const payload: any = { name: form.name, email: form.email, role: form.role }
    if (form.password) payload.password = form.password

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
    if (res.ok) {
      toast.success(editId ? "User diperbarui!" : "User ditambahkan!")
      setShowForm(false); setEditId(null)
      setForm({ name: "", email: "", password: "", role: "guru" })
      fetchData()
    } else {
      const data = await res.json()
      toast.error(data.error || "Gagal menyimpan")
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Yakin ingin menghapus user ini?")) return
    const res = await fetch(`/api/users/${id}`, { method: "DELETE" })
    if (res.ok) { toast.success("User dihapus!"); fetchData() }
    else {
      const data = await res.json()
      toast.error(data.error || "Gagal menghapus")
    }
  }

  function handleEdit(u: User) {
    setEditId(u.id)
    setForm({ name: u.name, email: u.email, password: "", role: u.role })
    setShowForm(true)
  }


  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Kelola User</h1>
          <p className="text-sm text-gray-500">Atur akun pengguna yang dapat mengakses dashboard</p>
        </div>
        <button
          onClick={() => { setShowForm(true); setEditId(null); setForm({ name: "", email: "", password: "", role: "guru" }) }}
          className="bg-green-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-green-800 transition"
        >
          <FiPlus /> Tambah User
        </button>
      </div>

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 w-full max-w-lg">
            <h2 className="text-lg font-bold mb-4">{editId ? "Edit" : "Tambah"} User</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nama *</label>
                <input
                  type="text" placeholder="Nama lengkap" value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  required
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                <input
                  type="email" placeholder="email@sdkartikax2.sch.id" value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  required
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Password {editId ? "(kosongkan jika tidak diubah)" : "*"}
                </label>
                <input
                  type="password" placeholder="••••••••" value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  required={!editId}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                <select
                  value={form.role}
                  onChange={(e) => setForm({ ...form, role: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
                >
                  <option value="guru">Guru</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
              <div className="flex gap-3 pt-2">
                <button type="submit" className="bg-green-700 text-white px-6 py-2 rounded-lg hover:bg-green-800 transition">Simpan</button>
                <button type="button" onClick={() => setShowForm(false)} className="px-6 py-2 border rounded-lg hover:bg-gray-50 transition">Batal</button>
              </div>
            </form>
          </div>
        </div>
      )}


      {/* Users List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {users.map((u) => (
          <div key={u.id} className="bg-white rounded-xl p-5 shadow-sm border hover:shadow-md transition">
            <div className="flex items-center gap-3 mb-3">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold ${u.role === 'admin' ? 'bg-red-600' : 'bg-green-700'}`}>
                {u.name.charAt(0)}
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">{u.name}</h3>
                <p className="text-sm text-gray-500">{u.email}</p>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className={`text-xs px-2.5 py-1 rounded-full flex items-center gap-1 ${u.role === 'admin' ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'}`}>
                {u.role === 'admin' ? <FiShield size={12} /> : <FiUser size={12} />}
                {u.role === 'admin' ? 'Admin' : 'Guru'}
              </span>
              <div className="flex gap-1">
                <button onClick={() => handleEdit(u)} className="p-1.5 text-blue-600 hover:bg-blue-50 rounded">
                  <FiEdit2 size={16} />
                </button>
                <button onClick={() => handleDelete(u.id)} className="p-1.5 text-red-600 hover:bg-red-50 rounded">
                  <FiTrash2 size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {users.length === 0 && (
        <div className="text-center py-16 bg-white rounded-xl border">
          <FiUsers className="mx-auto text-gray-300" size={64} />
          <p className="text-gray-500 mt-4">Belum ada user</p>
        </div>
      )}
    </div>
  )
}
