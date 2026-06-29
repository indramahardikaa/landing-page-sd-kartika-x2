"use client"

import { useState } from "react"
import Link from "next/link"
import { FiCheckCircle, FiArrowRight, FiUser, FiUsers, FiFileText } from "react-icons/fi"
import toast from "react-hot-toast"

export default function PPDBPage() {
  const [showForm, setShowForm] = useState(false)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [step, setStep] = useState(1)
  const [form, setForm] = useState({
    studentName: "", birthPlace: "", birthDate: "", gender: "L",
    religion: "Islam", address: "", fatherName: "", motherName: "",
    guardianPhone: "", guardianEmail: "", previousSchool: "",
    academicYear: "2025/2026",
  })

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await fetch("/api/ppdb", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      })
      if (res.ok) {
        setSuccess(true)
        toast.success("Pendaftaran berhasil dikirim!")
      } else {
        const data = await res.json()
        toast.error(data.error || "Gagal mendaftar")
      }
    } catch {
      toast.error("Terjadi kesalahan")
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <section className="min-h-[70vh] flex items-center justify-center py-16">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <FiCheckCircle className="text-green-600" size={40} />
          </div>
          <h1 className="text-2xl font-bold text-gray-800 mb-3">Pendaftaran Berhasil!</h1>
          <p className="text-gray-600 mb-6">
            Terima kasih telah mendaftarkan putra/putri Anda di SD KARTIKA X-2.
            Tim kami akan menghubungi Anda melalui nomor yang telah didaftarkan.
          </p>
          <Link href="/" className="inline-flex items-center gap-2 bg-green-700 text-white px-6 py-3 rounded-full font-semibold hover:bg-green-800 transition">
            Kembali ke Beranda <FiArrowRight />
          </Link>
        </div>
      </section>
    )
  }

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-red-700 to-red-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">PPDB 2025/2026</h1>
          <p className="text-lg text-red-100 max-w-3xl mx-auto">
            Penerimaan Peserta Didik Baru SD KARTIKA X-2 Kota Jakarta Selatan
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Info Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
              <h3 className="font-bold text-gray-800 text-lg mb-3">Persyaratan Umum</h3>
              <ul className="space-y-2">
                {["Usia minimal 6 tahun pada 1 Juli 2025", "Fotokopi Akta Kelahiran", "Fotokopi Kartu Keluarga", "Pas foto berwarna 3x4 (4 lembar)", "Surat Keterangan Sehat dari dokter"].map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <FiCheckCircle className="text-green-600 mt-0.5 shrink-0" size={16} />
                    <span className="text-sm text-gray-600">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
              <h3 className="font-bold text-gray-800 text-lg mb-3">Jadwal Pendaftaran</h3>
              <div className="space-y-3">
                <div className="bg-green-50 p-3 rounded-lg">
                  <p className="text-sm font-semibold text-green-800">Pendaftaran Online</p>
                  <p className="text-xs text-green-600">1 Juni - 30 Juni 2025</p>
                </div>
                <div className="bg-yellow-50 p-3 rounded-lg">
                  <p className="text-sm font-semibold text-yellow-800">Verifikasi Berkas</p>
                  <p className="text-xs text-yellow-600">1 Juli - 5 Juli 2025</p>
                </div>
                <div className="bg-blue-50 p-3 rounded-lg">
                  <p className="text-sm font-semibold text-blue-800">Pengumuman</p>
                  <p className="text-xs text-blue-600">10 Juli 2025</p>
                </div>
                <div className="bg-purple-50 p-3 rounded-lg">
                  <p className="text-sm font-semibold text-purple-800">Daftar Ulang</p>
                  <p className="text-xs text-purple-600">11 - 15 Juli 2025</p>
                </div>
              </div>
            </div>
          </div>


          {/* Keunggulan */}
          <div className="bg-green-50 rounded-2xl p-8 mb-12">
            <h3 className="font-bold text-green-800 text-2xl mb-6 text-center">Mengapa SD KARTIKA X-2?</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { title: "Akreditasi A", desc: "Kualitas pendidikan terstandar nasional" },
                { title: "Guru Profesional", desc: "Tenaga pendidik bersertifikat dan berdedikasi" },
                { title: "Fasilitas Lengkap", desc: "Ruang kelas, perpustakaan, lab komputer" },
                { title: "Karakter Islami", desc: "Pembentukan akhlak mulia sejak dini" },
                { title: "Ekstrakurikuler", desc: "6+ pilihan kegiatan pengembangan bakat" },
                { title: "Lingkungan Nyaman", desc: "Suasana belajar yang aman dan menyenangkan" },
              ].map((item, i) => (
                <div key={i} className="bg-white rounded-xl p-4 shadow-sm">
                  <h4 className="font-semibold text-green-800 mb-1">{item.title}</h4>
                  <p className="text-xs text-gray-600">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Registration Form Toggle */}
          {!showForm ? (
            <div className="text-center bg-white rounded-2xl p-8 shadow-sm border">
              <h3 className="text-2xl font-bold text-gray-800 mb-3">Daftar Sekarang!</h3>
              <p className="text-gray-600 mb-6">Isi formulir pendaftaran online untuk mendaftarkan putra/putri Anda</p>
              <button onClick={() => setShowForm(true)}
                className="inline-flex items-center gap-2 bg-red-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-red-700 transition shadow-lg">
                <FiFileText /> Isi Formulir Pendaftaran
              </button>
              <div className="mt-6 pt-6 border-t">
                <p className="text-sm text-gray-500 mb-3">Atau hubungi kami untuk informasi lebih lanjut:</p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Link href="/kontak" className="inline-flex items-center gap-2 border-2 border-green-700 text-green-700 px-6 py-2 rounded-full font-semibold hover:bg-green-50 transition text-sm">
                    Hubungi Kami <FiArrowRight />
                  </Link>
                  <a href="tel:+0217362900" className="inline-flex items-center gap-2 border-2 border-gray-300 text-gray-600 px-6 py-2 rounded-full font-semibold hover:bg-gray-50 transition text-sm">
                    (021) 7362900
                  </a>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-2xl p-8 shadow-sm border">
              <h3 className="text-xl font-bold text-gray-800 mb-2">Formulir Pendaftaran PPDB</h3>
              <p className="text-sm text-gray-500 mb-6">Langkah {step} dari 3 - {step === 1 ? "Data Siswa" : step === 2 ? "Data Orang Tua" : "Konfirmasi"}</p>

              {/* Progress Steps */}
              <div className="flex items-center gap-2 mb-8">
                {[1, 2, 3].map((s) => (
                  <div key={s} className="flex-1 flex items-center">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${step >= s ? 'bg-green-700 text-white' : 'bg-gray-200 text-gray-500'}`}>
                      {step > s ? <FiCheckCircle size={16} /> : s}
                    </div>
                    {s < 3 && <div className={`flex-1 h-1 mx-2 rounded ${step > s ? 'bg-green-700' : 'bg-gray-200'}`}></div>}
                  </div>
                ))}
              </div>


              <form onSubmit={handleSubmit}>
                {/* Step 1: Data Siswa */}
                {step === 1 && (
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 mb-4">
                      <FiUser className="text-green-700" />
                      <h4 className="font-semibold text-gray-800">Data Calon Siswa</h4>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Nama Lengkap *</label>
                      <input type="text" required value={form.studentName}
                        onChange={(e) => setForm({ ...form, studentName: e.target.value })}
                        placeholder="Nama lengkap sesuai akta"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none" />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Tempat Lahir *</label>
                        <input type="text" required value={form.birthPlace}
                          onChange={(e) => setForm({ ...form, birthPlace: e.target.value })}
                          placeholder="Jakarta"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Tanggal Lahir *</label>
                        <input type="date" required value={form.birthDate}
                          onChange={(e) => setForm({ ...form, birthDate: e.target.value })}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none" />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Jenis Kelamin *</label>
                        <select value={form.gender} onChange={(e) => setForm({ ...form, gender: e.target.value })}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none">
                          <option value="L">Laki-laki</option>
                          <option value="P">Perempuan</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Agama *</label>
                        <select value={form.religion} onChange={(e) => setForm({ ...form, religion: e.target.value })}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none">
                          <option value="Islam">Islam</option>
                          <option value="Kristen">Kristen</option>
                          <option value="Katolik">Katolik</option>
                          <option value="Hindu">Hindu</option>
                          <option value="Buddha">Buddha</option>
                          <option value="Konghucu">Konghucu</option>
                        </select>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Alamat Lengkap *</label>
                      <textarea rows={3} required value={form.address}
                        onChange={(e) => setForm({ ...form, address: e.target.value })}
                        placeholder="Alamat lengkap tempat tinggal"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none resize-none" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Asal TK/PAUD</label>
                      <input type="text" value={form.previousSchool}
                        onChange={(e) => setForm({ ...form, previousSchool: e.target.value })}
                        placeholder="Nama TK/PAUD asal (opsional)"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none" />
                    </div>
                    <div className="flex justify-end pt-4">
                      <button type="button" onClick={() => {
                        if (!form.studentName || !form.birthPlace || !form.birthDate || !form.address) { toast.error("Mohon lengkapi data wajib"); return }
                        setStep(2)
                      }} className="bg-green-700 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-green-800 transition">
                        Selanjutnya &rarr;
                      </button>
                    </div>
                  </div>
                )}


                {/* Step 2: Data Orang Tua */}
                {step === 2 && (
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 mb-4">
                      <FiUsers className="text-green-700" />
                      <h4 className="font-semibold text-gray-800">Data Orang Tua / Wali</h4>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Nama Ayah *</label>
                      <input type="text" required value={form.fatherName}
                        onChange={(e) => setForm({ ...form, fatherName: e.target.value })}
                        placeholder="Nama lengkap ayah"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Nama Ibu *</label>
                      <input type="text" required value={form.motherName}
                        onChange={(e) => setForm({ ...form, motherName: e.target.value })}
                        placeholder="Nama lengkap ibu"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none" />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">No. HP / WhatsApp *</label>
                        <input type="tel" required value={form.guardianPhone}
                          onChange={(e) => setForm({ ...form, guardianPhone: e.target.value })}
                          placeholder="08xxxxxxxxxx"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email (opsional)</label>
                        <input type="email" value={form.guardianEmail}
                          onChange={(e) => setForm({ ...form, guardianEmail: e.target.value })}
                          placeholder="email@example.com"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none" />
                      </div>
                    </div>
                    <div className="flex justify-between pt-4">
                      <button type="button" onClick={() => setStep(1)} className="px-6 py-2.5 border rounded-lg font-medium hover:bg-gray-50 transition">&larr; Kembali</button>
                      <button type="button" onClick={() => {
                        if (!form.fatherName || !form.motherName || !form.guardianPhone) { toast.error("Mohon lengkapi data wajib"); return }
                        setStep(3)
                      }} className="bg-green-700 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-green-800 transition">
                        Selanjutnya &rarr;
                      </button>
                    </div>
                  </div>
                )}

                {/* Step 3: Konfirmasi */}
                {step === 3 && (
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 mb-4">
                      <FiFileText className="text-green-700" />
                      <h4 className="font-semibold text-gray-800">Konfirmasi Data</h4>
                    </div>
                    <div className="bg-gray-50 rounded-xl p-5 space-y-4">
                      <div>
                        <h5 className="text-sm font-semibold text-green-700 mb-2">Data Siswa</h5>
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <p className="text-gray-500">Nama:</p><p className="font-medium">{form.studentName}</p>
                          <p className="text-gray-500">TTL:</p><p className="font-medium">{form.birthPlace}, {form.birthDate}</p>
                          <p className="text-gray-500">Jenis Kelamin:</p><p className="font-medium">{form.gender === "L" ? "Laki-laki" : "Perempuan"}</p>
                          <p className="text-gray-500">Agama:</p><p className="font-medium">{form.religion}</p>
                          <p className="text-gray-500">Alamat:</p><p className="font-medium">{form.address}</p>
                        </div>
                      </div>
                      <div className="border-t pt-4">
                        <h5 className="text-sm font-semibold text-green-700 mb-2">Data Orang Tua</h5>
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <p className="text-gray-500">Nama Ayah:</p><p className="font-medium">{form.fatherName}</p>
                          <p className="text-gray-500">Nama Ibu:</p><p className="font-medium">{form.motherName}</p>
                          <p className="text-gray-500">No. HP:</p><p className="font-medium">{form.guardianPhone}</p>
                        </div>
                      </div>
                    </div>
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-sm text-yellow-800">
                      Pastikan semua data sudah benar. Data yang telah dikirim akan diverifikasi oleh tim kami.
                    </div>
                    <div className="flex justify-between pt-4">
                      <button type="button" onClick={() => setStep(2)} className="px-6 py-2.5 border rounded-lg font-medium hover:bg-gray-50 transition">&larr; Kembali</button>
                      <button type="submit" disabled={loading}
                        className="bg-red-600 text-white px-8 py-2.5 rounded-lg font-semibold hover:bg-red-700 transition disabled:opacity-50 shadow-lg">
                        {loading ? "Mengirim..." : "Kirim Pendaftaran"}
                      </button>
                    </div>
                  </div>
                )}
              </form>
            </div>
          )}
        </div>
      </section>
    </>
  )
}
