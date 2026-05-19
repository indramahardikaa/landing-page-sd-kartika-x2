"use client"

import { useState } from "react"
import { FiMapPin, FiPhone, FiMail, FiClock } from "react-icons/fi"
import toast from "react-hot-toast"

export default function KontakPage() {
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    const form = e.currentTarget
    const formData = new FormData(form)

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.get("name"),
          email: formData.get("email"),
          subject: formData.get("subject"),
          message: formData.get("message"),
        }),
      })
      if (res.ok) {
        toast.success("Pesan berhasil dikirim!")
        form.reset()
      } else {
        toast.error("Gagal mengirim pesan")
      }
    } catch {
      toast.error("Terjadi kesalahan")
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-green-800 to-green-700 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Hubungi Kami</h1>
          <p className="text-lg text-green-100 max-w-3xl mx-auto">
            Jangan ragu untuk menghubungi kami jika Anda memiliki pertanyaan, saran, atau kebutuhan informasi lebih lanjut.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Informasi Kontak</h2>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center shrink-0">
                    <FiMapPin className="text-green-700" size={20} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">Lokasi</h3>
                    <p className="text-sm text-gray-600">Jl. Flamboyan No.2 14 6 13, RT.13/RW.6, Pesanggrahan, Kec. Pesanggrahan, Kota Jakarta Selatan, DKI Jakarta 12320</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center shrink-0">
                    <FiClock className="text-green-700" size={20} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">Jam Kerja</h3>
                    <p className="text-sm text-gray-600">Senin - Jumat: 08:00 - 16:00</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center shrink-0">
                    <FiMail className="text-green-700" size={20} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">Email</h3>
                    <p className="text-sm text-gray-600">sdkartikax2@gmail.com</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center shrink-0">
                    <FiPhone className="text-green-700" size={20} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">Telepon</h3>
                    <p className="text-sm text-gray-600">(021) 7362900</p>
                  </div>
                </div>
              </div>

              {/* Map */}
              <div className="mt-8 rounded-xl overflow-hidden shadow-sm">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3965.771!2d106.7059!3d-6.2585!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNsKwMTUnMzAuNiJTIDEwNsKwNDInMjEuMiJF!5e0!3m2!1sid!2sid!4v1709447164702"
                  width="100%"
                  height="250"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                ></iframe>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Kirim Pesan</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="name"
                    placeholder="Nama"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
                  />
                </div>
                <input
                  type="text"
                  name="subject"
                  placeholder="Subjek"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
                />
                <textarea
                  name="message"
                  rows={6}
                  placeholder="Pesan"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none resize-none"
                ></textarea>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-green-700 text-white py-3 rounded-lg font-semibold hover:bg-green-800 transition disabled:opacity-50"
                >
                  {loading ? "Mengirim..." : "Kirim Pesan"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
