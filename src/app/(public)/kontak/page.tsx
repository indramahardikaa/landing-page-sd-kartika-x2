"use client"

import { useState } from "react"
import { FiMapPin, FiPhone, FiMail, FiClock, FiSend } from "react-icons/fi"
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
        toast.success("Pesan berhasil dikirim! Kami akan segera merespon.")
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
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-green-600 via-green-700 to-green-800"></div>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-20 text-8xl">&#128231;</div>
          <div className="absolute bottom-10 right-20 text-8xl">&#128222;</div>
        </div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="inline-block bg-white/20 backdrop-blur-sm px-4 py-1.5 rounded-full text-white text-sm font-bold mb-4">
            &#128231; Kontak
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">Hubungi Kami</h1>
          <p className="text-lg text-green-100 max-w-2xl mx-auto">
            Jangan ragu untuk menghubungi kami. Kami siap membantu Anda!
          </p>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-b from-white to-green-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Contact Info */}
            <div>
              <h2 className="text-2xl font-extrabold text-gray-800 mb-6">Informasi Kontak</h2>
              <div className="space-y-4">
                <div className="flex items-start gap-4 bg-white p-5 rounded-2xl shadow-sm border-2 border-gray-100 hover:border-green-200 transition">
                  <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center shrink-0">
                    <FiMapPin className="text-green-700" size={20} />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800 mb-1">Lokasi</h3>
                    <p className="text-sm text-gray-600">Jl. Flamboyan No.2 14 6 13, RT.13/RW.6, Pesanggrahan, Kec. Pesanggrahan, Kota Jakarta Selatan, DKI Jakarta 12320</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 bg-white p-5 rounded-2xl shadow-sm border-2 border-gray-100 hover:border-green-200 transition">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center shrink-0">
                    <FiClock className="text-blue-700" size={20} />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800 mb-1">Jam Operasional</h3>
                    <p className="text-sm text-gray-600">Senin - Jumat: 07:00 - 15:00 WIB</p>
                    <p className="text-sm text-gray-600">Sabtu - Minggu: Libur</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 bg-white p-5 rounded-2xl shadow-sm border-2 border-gray-100 hover:border-green-200 transition">
                  <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center shrink-0">
                    <FiPhone className="text-yellow-700" size={20} />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800 mb-1">Telepon</h3>
                    <a href="tel:+0217362900" className="text-sm text-green-600 font-medium hover:underline">(021) 7362900</a>
                  </div>
                </div>
                <div className="flex items-start gap-4 bg-white p-5 rounded-2xl shadow-sm border-2 border-gray-100 hover:border-green-200 transition">
                  <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center shrink-0">
                    <FiMail className="text-red-700" size={20} />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800 mb-1">Email</h3>
                    <a href="mailto:sdkartikax2@gmail.com" className="text-sm text-green-600 font-medium hover:underline">sdkartikax2@gmail.com</a>
                  </div>
                </div>
              </div>

              {/* Map */}
              <div className="mt-6 rounded-2xl overflow-hidden shadow-lg border-2 border-green-200">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3965.771!2d106.7059!3d-6.2585!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNsKwMTUnMzAuNiJTIDEwNsKwNDInMjEuMiJF!5e0!3m2!1sid!2sid!4v1709447164702"
                  width="100%"
                  height="220"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                ></iframe>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <h2 className="text-2xl font-extrabold text-gray-800 mb-6">Kirim Pesan</h2>
              <div className="bg-white rounded-3xl p-8 shadow-lg border-2 border-gray-100">
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-1.5">Nama</label>
                      <input
                        type="text" name="name" required placeholder="Nama lengkap"
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-1.5">Email</label>
                      <input
                        type="email" name="email" required placeholder="email@contoh.com"
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1.5">Subjek</label>
                    <input
                      type="text" name="subject" required placeholder="Perihal pesan"
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1.5">Pesan</label>
                    <textarea
                      name="message" rows={5} required placeholder="Tulis pesan Anda..."
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition resize-none"
                    ></textarea>
                  </div>
                  <button
                    type="submit" disabled={loading}
                    className="w-full bg-green-600 text-white py-3.5 rounded-xl font-bold hover:bg-green-700 transition disabled:opacity-50 shadow-lg flex items-center justify-center gap-2 text-lg"
                  >
                    <FiSend size={18} />
                    {loading ? "Mengirim..." : "Kirim Pesan"}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
