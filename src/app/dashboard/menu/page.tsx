"use client"

import { useEffect, useState } from "react"
import { FiPlus, FiEdit2, FiTrash2, FiMenu, FiExternalLink, FiEye, FiEyeOff } from "react-icons/fi"
import toast from "react-hot-toast"

interface MenuItem {
  id: string
  label: string
  href: string
  icon: string | null
  parentId: string | null
  order: number
  isActive: boolean
  isExternal: boolean
  location: string
}

export default function MenuDashboard() {
  const [items, setItems] = useState<MenuItem[]>([])
  const [showForm, setShowForm] = useState(false)
  const [editId, setEditId] = useState<string | null>(null)
  const [filterLoc, setFilterLoc] = useState("navbar")
  const [form, setForm] = useState({
    label: "", href: "", icon: "", parentId: "",
    order: 0, isActive: true, isExternal: false, location: "navbar",
  })


  useEffect(() => { fetchData() }, [])

  async function fetchData() {
    const res = await fetch("/api/menu")
    if (res.ok) setItems(await res.json())
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const method = editId ? "PUT" : "POST"
    const url = editId ? `/api/menu/${editId}` : "/api/menu"

    const payload: any = { ...form }
    if (!payload.icon) delete payload.icon
    if (!payload.parentId) delete payload.parentId

    const res = await fetch(url, {
      method, headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
    if (res.ok) {
      toast.success(editId ? "Menu diperbarui!" : "Menu ditambahkan!")
      setShowForm(false); setEditId(null)
      setForm({ label: "", href: "", icon: "", parentId: "", order: 0, isActive: true, isExternal: false, location: "navbar" })
      fetchData()
    } else toast.error("Gagal menyimpan")
  }

  async function handleDelete(id: string) {
    if (!confirm("Yakin ingin menghapus menu ini?")) return
    const res = await fetch(`/api/menu/${id}`, { method: "DELETE" })
    if (res.ok) { toast.success("Menu dihapus!"); fetchData() }
    else toast.error("Gagal menghapus")
  }

  async function toggleActive(item: MenuItem) {
    const res = await fetch(`/api/menu/${item.id}`, {
      method: "PUT", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ isActive: !item.isActive }),
    })
    if (res.ok) { fetchData() }
  }

  function handleEdit(m: MenuItem) {
    setEditId(m.id)
    setForm({
      label: m.label, href: m.href, icon: m.icon || "",
      parentId: m.parentId || "", order: m.order,
      isActive: m.isActive, isExternal: m.isExternal, location: m.location,
    })
    setShowForm(true)
  }

  const filtered = items.filter(i => i.location === filterLoc)
  const parentItems = items.filter(i => !i.parentId && i.location === filterLoc)


  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Kelola Menu & Navigasi</h1>
          <p className="text-sm text-gray-500">Atur menu navigasi website, footer, dan topbar</p>
        </div>
        <button
          onClick={() => { setShowForm(true); setEditId(null); setForm({ label: "", href: "", icon: "", parentId: "", order: 0, isActive: true, isExternal: false, location: filterLoc }) }}
          className="bg-green-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-green-800 transition"
        >
          <FiPlus /> Tambah Menu
        </button>
      </div>

      {/* Location Filter Tabs */}
      <div className="flex gap-2 mb-6">
        {["navbar", "footer", "topbar"].map((loc) => (
          <button
            key={loc}
            onClick={() => setFilterLoc(loc)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition ${filterLoc === loc ? 'bg-green-700 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
          >
            {loc === "navbar" ? "Navbar" : loc === "footer" ? "Footer" : "Top Bar"}
          </button>
        ))}
      </div>

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <h2 className="text-lg font-bold mb-4">{editId ? "Edit" : "Tambah"} Menu</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Label Menu *</label>
                <input type="text" placeholder="Beranda" value={form.label}
                  onChange={(e) => setForm({ ...form, label: e.target.value })} required
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">URL/Link *</label>
                <input type="text" placeholder="/" value={form.href}
                  onChange={(e) => setForm({ ...form, href: e.target.value })} required
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nama Icon (react-icons)</label>
                <input type="text" placeholder="FiHome, FiBookOpen, etc." value={form.icon}
                  onChange={(e) => setForm({ ...form, icon: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 outline-none" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Lokasi</label>
                  <select value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 outline-none">
                    <option value="navbar">Navbar</option>
                    <option value="footer">Footer</option>
                    <option value="topbar">Top Bar</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Urutan</label>
                  <input type="number" value={form.order}
                    onChange={(e) => setForm({ ...form, order: parseInt(e.target.value) || 0 })}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 outline-none" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Parent Menu (submenu)</label>
                <select value={form.parentId} onChange={(e) => setForm({ ...form, parentId: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 outline-none">
                  <option value="">-- Tidak Ada (Top Level) --</option>
                  {parentItems.map((p) => (
                    <option key={p.id} value={p.id}>{p.label}</option>
                  ))}
                </select>
              </div>
              <div className="flex gap-4">
                <label className="flex items-center gap-2">
                  <input type="checkbox" checked={form.isActive}
                    onChange={(e) => setForm({ ...form, isActive: e.target.checked })}
                    className="w-4 h-4 text-green-600 rounded" />
                  <span className="text-sm text-gray-700">Aktif</span>
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" checked={form.isExternal}
                    onChange={(e) => setForm({ ...form, isExternal: e.target.checked })}
                    className="w-4 h-4 text-green-600 rounded" />
                  <span className="text-sm text-gray-700">External Link</span>
                </label>
              </div>
              <div className="flex gap-3 pt-2">
                <button type="submit" className="bg-green-700 text-white px-6 py-2 rounded-lg hover:bg-green-800 transition">Simpan</button>
                <button type="button" onClick={() => setShowForm(false)} className="px-6 py-2 border rounded-lg hover:bg-gray-50 transition">Batal</button>
              </div>
            </form>
          </div>
        </div>
      )}


      {/* Menu List */}
      {filtered.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-xl border">
          <FiMenu className="mx-auto text-gray-300" size={64} />
          <p className="text-gray-500 mt-4">Belum ada item menu untuk lokasi ini</p>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Urutan</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Label</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Link</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Icon</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Status</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {filtered.sort((a, b) => a.order - b.order).map((m) => (
                <tr key={m.id} className={`border-b hover:bg-gray-50 ${!m.isActive ? 'opacity-50' : ''} ${m.parentId ? 'bg-gray-50' : ''}`}>
                  <td className="px-4 py-3 text-sm">{m.order}</td>
                  <td className="px-4 py-3 text-sm font-medium text-gray-800">
                    {m.parentId && <span className="text-gray-400 mr-2">&#8627;</span>}
                    {m.label}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600 flex items-center gap-1">
                    {m.href}
                    {m.isExternal && <FiExternalLink size={12} className="text-gray-400" />}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-500">{m.icon || "-"}</td>
                  <td className="px-4 py-3">
                    <span className={`text-xs px-2 py-1 rounded-full ${m.isActive ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
                      {m.isActive ? "Aktif" : "Nonaktif"}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-1">
                      <button onClick={() => toggleActive(m)} className="p-1.5 text-yellow-600 hover:bg-yellow-50 rounded">
                        {m.isActive ? <FiEyeOff size={16} /> : <FiEye size={16} />}
                      </button>
                      <button onClick={() => handleEdit(m)} className="p-1.5 text-blue-600 hover:bg-blue-50 rounded">
                        <FiEdit2 size={16} />
                      </button>
                      <button onClick={() => handleDelete(m.id)} className="p-1.5 text-red-600 hover:bg-red-50 rounded">
                        <FiTrash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
