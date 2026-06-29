import { prisma } from "@/lib/prisma"
import Image from "next/image"

export default async function ProfilPage() {
  let profiles: any[] = []
  try {
    profiles = await prisma.schoolProfile.findMany()
  } catch (error) {
    console.error("Database error:", error)
  }
  const getProfile = (key: string) => profiles.find((p: any) => p.key === key)?.value || ""

  let misi: string[] = []
  try { misi = JSON.parse(getProfile("misi")) } catch { misi = [] }

  return (
    <>
      {/* Hero */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-green-600 via-green-700 to-green-800"></div>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-5 right-20 text-8xl">&#127979;</div>
          <div className="absolute bottom-5 left-20 text-8xl">&#128218;</div>
        </div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="inline-block bg-white/20 backdrop-blur-sm px-4 py-1.5 rounded-full text-white text-sm font-bold mb-4">
            &#127979; Profil Sekolah
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">Tentang Kami</h1>
          <p className="text-lg text-green-100 max-w-2xl mx-auto">
            Mengenal lebih dekat SD Kartika X-2, sekolah yang berkomitmen membentuk generasi cerdas dan berkarakter.
          </p>
        </div>
      </section>

      {/* Sambutan Kepala Sekolah */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            <div>
              <div className="inline-block bg-green-100 text-green-700 px-4 py-1.5 rounded-full text-sm font-bold mb-4">
                &#128075; Sambutan Kepala Sekolah
              </div>
              <h2 className="text-2xl md:text-3xl font-extrabold text-gray-800 mb-2">L. Femmy Saroinsong, S.Pd.</h2>
              <p className="text-green-600 font-bold mb-6">Kepala Sekolah SD KARTIKA X-2</p>
              <div className="text-gray-600 leading-relaxed space-y-4 text-base">
                <p>{getProfile("sambutan")}</p>
                <p>Guru-guru kami yang berdedikasi siap membimbing setiap siswa dengan pendekatan yang penuh kasih sayang dan perhatian. Kami berkomitmen memberikan pengalaman belajar yang menyenangkan.</p>
                <p>Mari kita wujudkan masa depan cerah bersama di SD KARTIKA X-2!</p>
              </div>
            </div>
            <div className="flex justify-center">
              <div className="relative">
                <div className="w-72 h-80 bg-gradient-to-br from-green-100 to-yellow-100 rounded-3xl flex items-center justify-center shadow-xl border-4 border-white overflow-hidden">
                  <Image
                    src="/images/placeholder-teacher.svg"
                    alt="Kepala Sekolah"
                    width={200}
                    height={200}
                    className="rounded-2xl"
                  />
                </div>
                <div className="absolute -top-3 -right-3 bg-yellow-400 text-yellow-900 px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                  &#127941; Kepala Sekolah
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sejarah */}
      <section className="py-16 bg-gradient-to-b from-green-50 to-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-8">
            <div className="inline-block bg-yellow-100 text-yellow-700 px-4 py-1.5 rounded-full text-sm font-bold mb-4">
              &#128214; Sejarah
            </div>
            <h2 className="text-3xl font-extrabold text-gray-800">Sejarah Singkat</h2>
          </div>
          <div className="bg-white rounded-3xl p-8 shadow-lg border-2 border-green-100">
            <div className="flex gap-4 items-start">
              <div className="text-4xl shrink-0">&#127979;</div>
              <div className="text-gray-600 leading-relaxed space-y-4">
                <p>{getProfile("sejarah")}</p>
                <p>Seiring waktu, SD KARTIKA X-2 melakukan berbagai pembaruan dalam kurikulum, penguatan pendidikan karakter, serta peningkatan fasilitas pembelajaran. Dengan semangat kebersamaan dan inovasi, SD KARTIKA X-2 terus berupaya menjadi sekolah dasar pilihan utama masyarakat.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Visi Misi */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Visi */}
          <div className="mb-12">
            <div className="text-center mb-6">
              <div className="inline-block bg-green-100 text-green-700 px-4 py-1.5 rounded-full text-sm font-bold mb-4">
                &#127775; Visi
              </div>
              <h2 className="text-3xl font-extrabold text-gray-800">VISI Sekolah</h2>
            </div>
            <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-3xl p-8 text-center shadow-xl">
              <p className="text-white text-lg md:text-xl font-medium leading-relaxed italic">
                &ldquo;{getProfile("visi")}&rdquo;
              </p>
            </div>
          </div>

          {/* Misi */}
          <div>
            <div className="text-center mb-6">
              <div className="inline-block bg-yellow-100 text-yellow-700 px-4 py-1.5 rounded-full text-sm font-bold mb-4">
                &#127919; Misi
              </div>
              <h2 className="text-3xl font-extrabold text-gray-800">MISI Sekolah</h2>
            </div>
            <div className="space-y-3">
              {misi.map((m, i) => {
                const colors = ['bg-green-500', 'bg-blue-500', 'bg-yellow-500', 'bg-purple-500', 'bg-red-500', 'bg-pink-500', 'bg-indigo-500', 'bg-teal-500', 'bg-orange-500']
                return (
                  <div key={i} className="flex items-start gap-4 bg-white p-4 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition">
                    <span className={`w-9 h-9 ${colors[i % colors.length]} text-white rounded-full flex items-center justify-center text-sm font-extrabold shrink-0 shadow-md`}>
                      {i + 1}
                    </span>
                    <p className="text-gray-700 pt-1">{m}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
