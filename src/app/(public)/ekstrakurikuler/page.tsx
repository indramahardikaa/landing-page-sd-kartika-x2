import { prisma } from "@/lib/prisma"
import Image from "next/image"

export default async function EkstrakurikulerPage() {
  const extracurriculars = await prisma.extracurricular.findMany({
    orderBy: { createdAt: "asc" },
  })

  const emojis = ['&#127926;', '&#127988;', '&#9917;', '&#128131;', '&#9978;', '&#127928;']
  const gradients = [
    'from-green-400 to-green-600', 'from-red-400 to-red-600',
    'from-blue-400 to-blue-600', 'from-pink-400 to-pink-600',
    'from-yellow-400 to-yellow-600', 'from-purple-400 to-purple-600',
  ]
  const bgColors = [
    'bg-green-50 border-green-200', 'bg-red-50 border-red-200',
    'bg-blue-50 border-blue-200', 'bg-pink-50 border-pink-200',
    'bg-yellow-50 border-yellow-200', 'bg-purple-50 border-purple-200',
  ]

  return (
    <>
      {/* Hero */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-500 via-orange-600 to-red-600"></div>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-20 text-8xl">&#127942;</div>
          <div className="absolute bottom-10 right-20 text-8xl">&#9917;</div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-9xl">&#127775;</div>
        </div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="inline-block bg-white/20 backdrop-blur-sm px-4 py-1.5 rounded-full text-white text-sm font-bold mb-4">
            &#127942; Kegiatan Seru
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">Ekstrakurikuler</h1>
          <p className="text-lg text-orange-100 max-w-2xl mx-auto">
            Berbagai kegiatan menarik untuk mengembangkan bakat, minat, dan kreativitas siswa!
          </p>
        </div>
      </section>

      {/* Extracurriculars Grid */}
      <section className="py-16 bg-gradient-to-b from-white to-orange-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {extracurriculars.map((e, i) => (
              <div key={e.id} className={`rounded-3xl overflow-hidden border-2 ${bgColors[i % bgColors.length]} hover:shadow-xl transition group`}>
                <div className={`h-44 bg-gradient-to-br ${gradients[i % gradients.length]} flex items-center justify-center relative`}>
                  <div className="text-7xl group-hover:scale-125 transition-transform" dangerouslySetInnerHTML={{__html: emojis[i % emojis.length]}} />
                </div>
                <div className="p-6">
                  <h3 className="font-extrabold text-gray-800 text-xl mb-2">{e.name}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{e.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4 text-center max-w-2xl">
          <div className="bg-gradient-to-r from-orange-100 to-yellow-100 rounded-3xl p-8 border-2 border-orange-200">
            <div className="text-4xl mb-3">&#127775;</div>
            <h3 className="text-xl font-extrabold text-gray-800 mb-2">Tertarik Bergabung?</h3>
            <p className="text-gray-600 text-sm mb-4">Hubungi kami untuk informasi lebih lanjut tentang pendaftaran siswa baru</p>
            <a href="/ppdb" className="inline-block bg-orange-500 text-white px-8 py-3 rounded-full font-bold hover:bg-orange-600 transition shadow-lg">
              Daftar PPDB
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
