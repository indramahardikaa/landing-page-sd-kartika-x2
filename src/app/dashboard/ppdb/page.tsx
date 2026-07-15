"use client"

import { useEffect, useState } from "react"
import { FiEye, FiTrash2, FiCheckCircle, FiXCircle, FiClock, FiSearch } from "react-icons/fi"
import toast from "react-hot-toast"

interface Registration {
  id: string
  studentName: string
  birthPlace: string
  birthDate: string
  gender: string
  religion: string
  address: string
  fatherName: string
  motherName: string
  guardianPhone: string
  guardianEmail: string | null
  previousSchool: string | null
  status: string
  notes: string | null
  academicYear: string
  createdAt: string
}

export default function PPDBDashboard() {
  const [data, setData] = useState<Registration[]>([])
  const [selected, setSelected] = useState<Registration | null>(null)
  const [filter, setFilter] = useState("all")
  const [search, setSearch] = useState("")


  useEffect(() => { fetchData() }, [])

  async function fetchData() {
    const res = await fetch("/api/ppdb")
    if (res.ok) setData(await res.json())
  }

  async function updateStatus(id: string, status: string) {
    const res = await fetch(`/api/ppdb/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    })
    if (res.ok) {
      toast.success(`Status diubah ke: ${status}`)
      fetchData()
      if (selected?.id === id) setSelected({ ...selected, status })
    } else toast.error("Gagal mengubah status")
  }

  async function handleDelete(id: string) {
    if (!confirm("Yakin ingin menghapus data pendaftaran ini?")) return
    const res = await fetch(`/api/ppdb/${id}`, { method: "DELETE" })
    if (res.ok) { toast.success("Data dihapus!"); fetchData() }
    else toast.error("Gagal menghapus")
  }

  const filtered = data.filter(d => {
    const matchFilter = filter === "all" || d.status === filter
    const matchSearch = d.studentName.toLowerCase().includes(search.toLowerCase()) ||
      d.fatherName.toLowerCase().includes(search.toLowerCase())
    return matchFilter && matchSearch
  })


  const statusColors: Record<string, string> = {
    pending: "bg-yellow-100 text-yellow-700",
    verified: "bg-blue-100 text-blue-700",
    accepted: "bg-green-100 text-green-700",
    rejected: "bg-red-100 text-red-700",
  }

  const statusLabels: Record<string, string> = {
    pending: "Menunggu",
    verified: "Terverifikasi",
    accepted: "Diterima",
    rejected: "Ditolak",
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Pendaftaran PPDB</h1>
          <p className="text-sm text-gray-500">Total {data.length} pendaftar</p>
        </div>
        <div className="flex gap-2">
          <div className="relative">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            <input
              type="text"
              placeholder="Cari nama..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 pr-4 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-green-500 outline-none"
            />
          </div>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-green-500 outline-none"
          >
            <option value="all">Semua Status</option>
            <option value="pending">Menunggu</option>
            <option value="verified">Terverifikasi</option>
            <option value="accepted">Diterima</option>
            <option value="rejected">Ditolak</option>
          </select>
        </div>
      </div>


      {/* Detail Modal */}
      {selected && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-lg font-bold">Detail Pendaftaran</h2>
              <span className={`text-xs px-3 py-1 rounded-full ${statusColors[selected.status]}`}>
                {statusLabels[selected.status]}
              </span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div className="space-y-3">
                <h3 className="font-semibold text-green-700 border-b pb-1">Data Siswa</h3>
                <p><span className="text-gray-500">Nama:</span> <strong>{selected.studentName}</strong></p>
                <p><span className="text-gray-500">TTL:</span> {selected.birthPlace}, {selected.birthDate}</p>
                <p><span className="text-gray-500">Jenis Kelamin:</span> {selected.gender === "L" ? "Laki-laki" : "Perempuan"}</p>
                <p><span className="text-gray-500">Agama:</span> {selected.religion}</p>
                <p><span className="text-gray-500">Alamat:</span> {selected.address}</p>
                {selected.previousSchool && <p><span className="text-gray-500">Asal TK/PAUD:</span> {selected.previousSchool}</p>}
              </div>
              <div className="space-y-3">
                <h3 className="font-semibold text-green-700 border-b pb-1">Data Orang Tua</h3>
                <p><span className="text-gray-500">Ayah:</span> {selected.fatherName}</p>
                <p><span className="text-gray-500">Ibu:</span> {selected.motherName}</p>
                <p><span className="text-gray-500">No. HP:</span> {selected.guardianPhone}</p>
                {selected.guardianEmail && <p><span className="text-gray-500">Email:</span> {selected.guardianEmail}</p>}
                <p><span className="text-gray-500">Tahun Ajaran:</span> {selected.academicYear}</p>
                <p><span className="text-gray-500">Tanggal Daftar:</span> {new Date(selected.createdAt).toLocaleDateString("id-ID")}</p>
              </div>
            </div>
            <div className="flex gap-2 mt-6 pt-4 border-t">
              <button onClick={() => updateStatus(selected.id, "verified")} className="px-3 py-1.5 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700">Verifikasi</button>
              <button onClick={() => updateStatus(selected.id, "accepted")} className="px-3 py-1.5 bg-green-600 text-white rounded-lg text-sm hover:bg-green-700">Terima</button>
              <button onClick={() => updateStatus(selected.id, "rejected")} className="px-3 py-1.5 bg-red-600 text-white rounded-lg text-sm hover:bg-red-700">Tolak</button>
              <button onClick={() => setSelected(null)} className="px-4 py-1.5 border rounded-lg text-sm hover:bg-gray-50 ml-auto">Tutup</button>
            </div>
          </div>
        </div>
      )}


      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm border overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">#</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Nama Siswa</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Orang Tua</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">No. HP</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Status</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Tanggal</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((r, i) => (
              <tr key={r.id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-3 text-sm">{i + 1}</td>
                <td className="px-4 py-3 text-sm font-medium text-gray-800">{r.studentName}</td>
                <td className="px-4 py-3 text-sm text-gray-600">{r.fatherName}</td>
                <td className="px-4 py-3 text-sm text-gray-600">{r.guardianPhone}</td>
                <td className="px-4 py-3">
                  <span className={`text-xs px-2 py-1 rounded-full ${statusColors[r.status]}`}>
                    {statusLabels[r.status]}
                  </span>
                </td>
                <td className="px-4 py-3 text-sm text-gray-500">{new Date(r.createdAt).toLocaleDateString("id-ID")}</td>
                <td className="px-4 py-3">
                  <div className="flex gap-1">
                    <button onClick={() => setSelected(r)} className="p-1.5 text-blue-600 hover:bg-blue-50 rounded"><FiEye size={16} /></button>
                    <button onClick={() => handleDelete(r.id)} className="p-1.5 text-red-600 hover:bg-red-50 rounded"><FiTrash2 size={16} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && (
          <div className="text-center py-8 text-gray-500 text-sm">Tidak ada data pendaftaran</div>
        )}
      </div>
    </div>
  )
}
