import { prisma } from "@/lib/prisma"
import { FiHome } from "react-icons/fi"

export default async function FasilitasPage() {
  const facilities = await prisma.facility.findMany({
    orderBy: { createdAt: "asc" },
  })

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-green-800 to-green-700 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Fasilitas Sekolah</h1>
          <p className="text-lg text-green-100 max-w-3xl mx-auto">
            Kami menyediakan sarana dan prasarana yang mendukung terciptanya proses pembelajaran yang efektif dan menyenangkan.
          </p>
        </div>
      </section>

      {/* Facilities Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {facilities.map((f) => (
              <div key={f.id} className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-lg transition group">
                <div className="h-48 bg-gradient-to-br from-green-100 to-green-200 flex items-center justify-center group-hover:from-green-200 group-hover:to-green-300 transition">
                  <FiHome className="text-green-700" size={48} />
                </div>
                <div className="p-6">
                  <h3 className="font-semibold text-gray-800 text-lg mb-2">{f.name}</h3>
                  <p className="text-sm text-gray-600">{f.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
