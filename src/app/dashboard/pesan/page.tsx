"use client"

import { useEffect, useState } from "react"
import { FiMail } from "react-icons/fi"

interface Contact {
  id: string; name: string; email: string; subject: string; message: string; isRead: boolean; createdAt: string
}

export default function PesanDashboard() {
  const [messages, setMessages] = useState<Contact[]>([])
  const [selected, setSelected] = useState<Contact | null>(null)

  useEffect(() => { fetchData() }, [])

  async function fetchData() {
    const res = await fetch("/api/contact")
    setMessages(await res.json())
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Pesan Masuk</h1>

      {selected && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 w-full max-w-lg">
            <h2 className="text-lg font-bold mb-2">{selected.subject}</h2>
            <p className="text-sm text-gray-500 mb-4">Dari: {selected.name} ({selected.email})</p>
            <p className="text-gray-700 whitespace-pre-wrap mb-4">{selected.message}</p>
            <p className="text-xs text-gray-400 mb-4">{new Date(selected.createdAt).toLocaleString('id-ID')}</p>
            <button onClick={() => setSelected(null)} className="px-6 py-2 border rounded-lg hover:bg-gray-50">Tutup</button>
          </div>
        </div>
      )}

      <div className="space-y-3">
        {messages.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-xl">
            <FiMail className="mx-auto text-gray-300" size={48} />
            <p className="text-gray-500 mt-4">Belum ada pesan masuk</p>
          </div>
        ) : (
          messages.map((m) => (
            <div key={m.id} onClick={() => setSelected(m)}
              className={`bg-white rounded-xl p-4 shadow-sm border cursor-pointer hover:shadow-md transition ${!m.isRead ? 'border-l-4 border-l-green-600' : ''}`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {m.isRead ? <FiMail className="text-gray-400" /> : <FiMail className="text-green-600" />}
                  <div>
                    <p className="font-medium text-gray-800 text-sm">{m.subject}</p>
                    <p className="text-xs text-gray-500">{m.name} - {m.email}</p>
                  </div>
                </div>
                <span className="text-xs text-gray-400">{new Date(m.createdAt).toLocaleDateString('id-ID')}</span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
