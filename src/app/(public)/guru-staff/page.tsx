import { prisma } from "@/lib/prisma"
import Image from "next/image"

export default async function GuruStaffPage() {
  const guru = await prisma.staff.findMany({
    where: { category: "guru" },
    orderBy: { order: "asc" },
  })
  const staff = await prisma.staff.findMany({
    where: { category: "staff" },
    orderBy: { order: "asc" },
  })

  const colors = ['bg-green-500', 'bg-blue-500', 'bg-yellow-500', 'bg-purple-500', 'bg-red-500', 'bg-pink-500', 'bg-indigo-500', 'bg-teal-500', 'bg-orange-500', 'bg-cyan-500']

  return (
    <>
      {/* Hero */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-green-600 via-green-700 to-green-800"></div>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-20 text-8xl">&#128105;&#8205;&#127979;</div>
          <div className="absolute bottom-10 right-20 text-8xl">&#128104;&#8205;&#127979;</div>
        </div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="inline-block bg-white/20 backdrop-blur-sm px-4 py-1.5 rounded-full text-white text-sm font-bold mb-4">
            &#128105;&#8205;&#127979; Tim Kami
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">Guru dan Staff</h1>
          <p className="text-lg text-green-100 max-w-2xl mx-auto">
            Tim pendidik dan tenaga kependidikan yang berdedikasi membimbing dan menginspirasi setiap siswa.
          </p>
        </div>
      </section>

      {/* Guru Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <div className="inline-block bg-green-100 text-green-700 px-4 py-1.5 rounded-full text-sm font-bold mb-3">
              &#128218; Tenaga Pendidik
            </div>
            <h2 className="text-3xl font-extrabold text-gray-800">Guru Kami</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-6xl mx-auto">
            {guru.map((g, i) => (
              <div key={g.id} className="bg-white rounded-2xl p-5 border-2 border-gray-100 hover:border-green-300 hover:shadow-lg transition group">
                <div className="flex items-center gap-4">
                  <div className={`w-14 h-14 ${colors[i % colors.length]} rounded-full flex items-center justify-center text-white font-bold text-lg shadow-md group-hover:scale-110 transition-transform shrink-0`}>
                    {g.name.charAt(0)}
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-bold text-gray-800 text-sm truncate">{g.name}</h3>
                    <p className="text-xs text-green-600 font-medium truncate">{g.position}</p>
                  </div>
                </div>
                {g.quote && (
                  <p className="text-xs text-gray-500 italic mt-3 line-clamp-2 pl-2 border-l-2 border-green-200">
                    &ldquo;{g.quote}&rdquo;
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Staff Section */}
      <section className="py-16 bg-gradient-to-b from-yellow-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <div className="inline-block bg-yellow-100 text-yellow-700 px-4 py-1.5 rounded-full text-sm font-bold mb-3">
              &#128188; Tenaga Kependidikan
            </div>
            <h2 className="text-3xl font-extrabold text-gray-800">Staff Tata Usaha</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 max-w-5xl mx-auto">
            {staff.map((s, i) => (
              <div key={s.id} className="bg-white rounded-2xl p-5 text-center shadow-sm border-2 border-gray-100 hover:border-yellow-300 hover:shadow-md transition group">
                <div className={`w-16 h-16 mx-auto ${colors[(i + 5) % colors.length]} rounded-full flex items-center justify-center text-white font-bold text-xl shadow-md group-hover:scale-110 transition-transform mb-3`}>
                  {s.name.charAt(0)}
                </div>
                <h3 className="font-bold text-gray-800 text-xs">{s.name}</h3>
                <p className="text-[10px] text-yellow-600 font-medium mt-0.5">{s.position}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
