import { prisma } from "@/lib/prisma"
import Image from "next/image"

export default async function FasilitasPage() {
  let facilities: any[] = []
  try {
    facilities = await prisma.facility.findMany({ orderBy: { createdAt: "asc" } })
  } catch (error) {
    console.error("Database error:", error)
  }

  const emojis = ['&#128218;', '&#128187;', '&#9978;', '&#9917;', '&#127963;', '&#127828;', '&#128214;', '&#127931;']
  const gradients = [
    'from-blue-400 to-blue-600', 'from-green-400 to-green-600',
    'from-purple-400 to-purple-600', 'from-orange-400 to-orange-600',
    'from-pink-400 to-pink-600', 'from-teal-400 to-teal-600',
    'from-indigo-400 to-indigo-600', 'from-red-400 to-red-600',
  ]

  return (
    <>
      {/* Hero */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800"></div>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-20 text-8xl">&#127979;</div>
          <div className="absolute bottom-10 right-20 text-8xl">&#128218;</div>
        </div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="inline-block bg-white/20 backdrop-blur-sm px-4 py-1.5 rounded-full text-white text-sm font-bold mb-4">
            &#127979; Sarana Prasarana
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">Fasilitas Sekolah</h1>
          <p className="text-lg text-blue-100 max-w-2xl mx-auto">
            Sarana dan prasarana lengkap yang mendukung terciptanya proses pembelajaran yang efektif dan menyenangkan.
          </p>
        </div>
      </section>

      {/* Facilities Grid */}
      <section className="py-16 bg-gradient-to-b from-white to-blue-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {facilities.map((f, i) => (
              <div key={f.id} className="bg-white rounded-3xl overflow-hidden shadow-sm border-2 border-gray-100 hover:border-blue-300 hover:shadow-xl transition group">
                <div className={`h-40 bg-gradient-to-br ${gradients[i % gradients.length]} flex items-center justify-center relative`}>
                  <div className="text-6xl opacity-90 group-hover:scale-125 transition-transform" dangerouslySetInnerHTML={{__html: emojis[i % emojis.length]}} />
                  <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition"></div>
                </div>
                <div className="p-6">
                  <h3 className="font-extrabold text-gray-800 text-lg mb-2">{f.name}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{f.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
