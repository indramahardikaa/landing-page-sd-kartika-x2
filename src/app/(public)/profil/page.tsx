import { prisma } from "@/lib/prisma"

export default async function ProfilPage() {
  const profiles = await prisma.schoolProfile.findMany()
  const getProfile = (key: string) => profiles.find(p => p.key === key)?.value || ""

  let misi: string[] = []
  try {
    misi = JSON.parse(getProfile("misi"))
  } catch { misi = [] }

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-green-800 to-green-700 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Tentang Kami</h1>
          <p className="text-lg text-green-100 max-w-3xl mx-auto">
            SD Kartika X-2 adalah lembaga pendidikan dasar yang berkomitmen memberikan pendidikan berkualitas, membentuk karakter siswa sejak dini.
          </p>
        </div>
      </section>

      {/* Sambutan Kepala Sekolah */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-green-800 mb-2">L. Femmy Saroinsong, S.Pd.</h2>
              <p className="text-green-600 font-medium mb-6">Kepala Sekolah SD KARTIKA X-2</p>
              <div className="text-gray-600 leading-relaxed space-y-4">
                <p>{getProfile("sambutan")}</p>
                <p>Guru-guru kami yang berdedikasi siap membimbing setiap siswa dengan pendekatan yang penuh kasih sayang dan perhatian. Kami berkomitmen memberikan pengalaman belajar yang menyenangkan dengan metode yang kreatif dan pembelajaran berbasis nilai.</p>
                <p>Mari kita wujudkan masa depan cerah bersama di SD KARTIKA X2. Terima kasih telah mempercayakan pendidikan putra-putri Anda kepada kami.</p>
              </div>
            </div>
            <div className="flex justify-center">
              <div className="w-72 h-80 bg-gradient-to-br from-green-200 to-green-300 rounded-2xl flex items-center justify-center">
                <div className="text-center">
                  <div className="w-32 h-32 bg-green-700 rounded-full flex items-center justify-center mx-auto mb-4 text-white text-4xl font-bold">LF</div>
                  <p className="text-green-800 font-semibold">Kepala Sekolah</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sejarah */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-3xl font-bold text-green-800 mb-6 text-center">Sejarah Singkat</h2>
          <div className="text-gray-600 leading-relaxed space-y-4">
            <p>{getProfile("sejarah")}</p>
            <p>Seiring waktu, SD KARTIKA X-2 melakukan berbagai pembaruan dalam kurikulum, penguatan pendidikan karakter, serta peningkatan fasilitas pembelajaran. Program-program unggulan seperti pembiasaan ibadah, literasi, ekstrakurikuler, dan pembelajaran berbasis proyek telah diterapkan secara konsisten.</p>
            <p>Dengan semangat kebersamaan dan inovasi, SD KARTIKA X-2 terus berupaya menjadi sekolah dasar pilihan utama masyarakat yang mampu mencetak generasi cerdas, beriman, dan berakhlak mulia.</p>
          </div>
        </div>
      </section>

      {/* Visi Misi */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-green-800 mb-4 text-center">VISI</h2>
            <div className="bg-green-50 border-l-4 border-green-700 p-6 rounded-r-xl">
              <p className="text-gray-700 text-lg">{getProfile("visi")}</p>
            </div>
          </div>

          <div>
            <h2 className="text-3xl font-bold text-green-800 mb-6 text-center">MISI</h2>
            <div className="space-y-3">
              {misi.map((m, i) => (
                <div key={i} className="flex items-start gap-3 bg-gray-50 p-4 rounded-xl">
                  <span className="w-8 h-8 bg-green-700 text-white rounded-full flex items-center justify-center text-sm font-bold shrink-0">
                    {i + 1}
                  </span>
                  <p className="text-gray-700">{m}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
