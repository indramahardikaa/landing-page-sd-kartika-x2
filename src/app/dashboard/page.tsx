import { prisma } from "@/lib/prisma"
import { auth } from "@/lib/auth"
import { FiFileText, FiUsers, FiGrid, FiStar, FiMail } from "react-icons/fi"

export default async function DashboardPage() {
  const session = await auth()
  const isAdmin = (session?.user as any)?.role === "admin"

  const [newsCount, staffCount, facilityCount, extraCount, messageCount] = await Promise.all([
    prisma.news.count(),
    prisma.staff.count(),
    prisma.facility.count(),
    prisma.extracurricular.count(),
    prisma.contact.count({ where: { isRead: false } }),
  ])

  const recentNews = await prisma.news.findMany({
    orderBy: { createdAt: "desc" },
    take: 5,
    include: { author: { select: { name: true } } },
  })

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800">
          Selamat Datang, {session?.user?.name}!
        </h1>
        <p className="text-gray-500">
          {isAdmin ? "Panel Admin - SD KARTIKA X-2" : "Panel Guru - SD KARTIKA X-2"}
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Berita</p>
              <p className="text-2xl font-bold text-gray-800">{newsCount}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <FiFileText className="text-blue-600" size={20} />
            </div>
          </div>
        </div>
        {isAdmin && (
          <>
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Guru & Staff</p>
                  <p className="text-2xl font-bold text-gray-800">{staffCount}</p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <FiUsers className="text-green-600" size={20} />
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Fasilitas</p>
                  <p className="text-2xl font-bold text-gray-800">{facilityCount}</p>
                </div>
                <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                  <FiGrid className="text-yellow-600" size={20} />
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Pesan Belum Dibaca</p>
                  <p className="text-2xl font-bold text-gray-800">{messageCount}</p>
                </div>
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                  <FiMail className="text-red-600" size={20} />
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Recent News */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Berita Terbaru</h2>
        <div className="space-y-3">
          {recentNews.map((n) => (
            <div key={n.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium text-gray-800 text-sm">{n.title}</p>
                <p className="text-xs text-gray-500">{n.author.name} &middot; {new Date(n.createdAt).toLocaleDateString('id-ID')}</p>
              </div>
              <span className={`text-xs px-2 py-1 rounded-full ${n.published ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                {n.published ? "Published" : "Draft"}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
