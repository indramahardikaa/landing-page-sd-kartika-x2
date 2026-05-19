import { prisma } from "@/lib/prisma"

export default async function GuruStaffPage() {
  const guru = await prisma.staff.findMany({
    where: { category: "guru" },
    orderBy: { order: "asc" },
  })
  const staff = await prisma.staff.findMany({
    where: { category: "staff" },
    orderBy: { order: "asc" },
  })

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-green-800 to-green-700 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Guru dan Staff</h1>
          <p className="text-lg text-green-100 max-w-3xl mx-auto">
            Guru dan Staf senantiasa memberikan pelayanan terbaik dengan penuh dedikasi, membimbing dan menginspirasi setiap siswa.
          </p>
        </div>
      </section>

      {/* Guru */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-green-800 mb-8 text-center">Guru</h2>
          <div className="overflow-x-auto">
            <table className="w-full bg-white rounded-xl shadow-sm overflow-hidden">
              <thead className="bg-green-700 text-white">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-semibold w-12">#</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">Nama</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">Jabatan</th>
                </tr>
              </thead>
              <tbody>
                {guru.map((g, i) => (
                  <tr key={g.id} className={`border-b ${i % 2 === 0 ? 'bg-white' : 'bg-gray-50'} hover:bg-green-50 transition`}>
                    <td className="px-4 py-3 text-sm text-gray-600">{i + 1}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 bg-green-100 text-green-700 rounded-full flex items-center justify-center font-semibold text-sm">
                          {g.name.charAt(0)}
                        </div>
                        <span className="font-medium text-gray-800">{g.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600">{g.position}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Staff */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-green-800 mb-8 text-center">Staff Tata Usaha</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {staff.map((s) => (
              <div key={s.id} className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition">
                <div className="w-14 h-14 bg-yellow-100 text-yellow-700 rounded-full flex items-center justify-center font-bold text-lg mb-4">
                  {s.name.charAt(0)}
                </div>
                <h3 className="font-semibold text-gray-800">{s.name}</h3>
                <p className="text-sm text-green-700">{s.position}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
