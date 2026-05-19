import { prisma } from "@/lib/prisma"
import { FiStar } from "react-icons/fi"

export default async function EkstrakurikulerPage() {
  const extracurriculars = await prisma.extracurricular.findMany({
    orderBy: { createdAt: "asc" },
  })

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-green-800 to-green-700 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Ekstrakurikuler</h1>
          <p className="text-lg text-green-100 max-w-3xl mx-auto">
            Ekstrakurikuler kami dirancang untuk mendukung pengembangan minat dan bakat siswa dalam berbagai bidang.
          </p>
        </div>
      </section>

      {/* Extracurriculars Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {extracurriculars.map((e) => (
              <div key={e.id} className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-lg transition group border border-gray-100">
                <div className="h-48 bg-gradient-to-br from-yellow-100 to-yellow-200 flex items-center justify-center group-hover:from-yellow-200 group-hover:to-yellow-300 transition">
                  <FiStar className="text-yellow-600" size={48} />
                </div>
                <div className="p-6">
                  <h3 className="font-semibold text-gray-800 text-lg mb-2">{e.name}</h3>
                  <p className="text-sm text-gray-600">{e.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
