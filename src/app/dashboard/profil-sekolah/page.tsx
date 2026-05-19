"use client"

import { useEffect, useState } from "react"
import toast from "react-hot-toast"

export default function ProfilSekolahDashboard() {
  const [profiles, setProfiles] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(false)

  useEffect(() => { fetchData() }, [])

  async function fetchData() {
    const res = await fetch("/api/profile")
    const data = await res.json()
    const map: Record<string, string> = {}
    data.forEach((p: any) => { map[p.key] = p.value })
    setProfiles(map)
  }

  async function handleSave(key: string, value: string) {
    setLoading(true)
    const res = await fetch("/api/profile", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ key, value }),
    })
    if (res.ok) toast.success(`${key} berhasil diperbarui!`)
    else toast.error("Gagal menyimpan")
    setLoading(false)
  }

  const fields = [
    { key: "visi", label: "Visi", type: "textarea" },
    { key: "sambutan", label: "Sambutan Kepala Sekolah", type: "textarea" },
    { key: "sejarah", label: "Sejarah Sekolah", type: "textarea" },
    { key: "alamat", label: "Alamat", type: "text" },
    { key: "telepon", label: "Telepon", type: "text" },
    { key: "email", label: "Email", type: "text" },
    { key: "instagram", label: "Instagram URL", type: "text" },
    { key: "youtube", label: "YouTube URL", type: "text" },
    { key: "tiktok", label: "TikTok URL", type: "text" },
  ]

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Profil Sekolah</h1>
      <div className="space-y-6">
        {fields.map((field) => (
          <div key={field.key} className="bg-white rounded-xl p-6 shadow-sm border">
            <label className="block text-sm font-semibold text-gray-700 mb-2">{field.label}</label>
            {field.type === "textarea" ? (
              <textarea
                rows={4}
                value={profiles[field.key] || ""}
                onChange={(e) => setProfiles({ ...profiles, [field.key]: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-green-500 resize-none"
              />
            ) : (
              <input
                type="text"
                value={profiles[field.key] || ""}
                onChange={(e) => setProfiles({ ...profiles, [field.key]: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-green-500"
              />
            )}
            <button
              onClick={() => handleSave(field.key, profiles[field.key] || "")}
              disabled={loading}
              className="mt-2 bg-green-700 text-white px-4 py-1.5 rounded-lg text-sm hover:bg-green-800 disabled:opacity-50"
            >
              Simpan
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
