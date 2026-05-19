import { prisma } from "@/lib/prisma"
import Link from "next/link"
import { FiBookOpen } from "react-icons/fi"

export default async function BeritaPage() {
  const news = await prisma.news.findMany({
    where: { published: true },
    orderBy: { createdAt: "desc" },
    include: { author: { select: { name: true } } },
  })

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-green-800 to-green-700 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Berita Sekolah</h1>
          <p className="text-lg text-green-100 max-w-3xl mx-auto">
            Update terkini seputar kegiatan belajar mengajar, agenda penting, dan informasi terbaru dari sekolah.
          </p>
        </div>
      </section>

      {/* News Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          {news.length === 0 ? (
            <div className="text-center py-16">
              <FiBookOpen className="mx-auto text-gray-300" size={64} />
              <p className="text-gray-500 mt-4">Belum ada berita.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {news.map((n) => (
                <article key={n.id} className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-lg transition group">
                  <div className="h-48 bg-gradient-to-br from-green-100 to-green-200 flex items-center justify-center">
                    <FiBookOpen className="text-green-700" size={48} />
                  </div>
                  <div className="p-6">
                    <h3 className="font-semibold text-gray-800 text-lg mb-2 group-hover:text-green-700 transition">{n.title}</h3>
                    <p className="text-sm text-gray-500 line-clamp-3 mb-4">{n.content}</p>
                    <div className="flex justify-between items-center">
                      <div className="text-xs text-gray-400">
                        <span>{n.author.name}</span> &middot; <span>{new Date(n.createdAt).toLocaleDateString('id-ID')}</span>
                      </div>
                      <Link href={`/berita/${n.id}`} className="text-sm text-green-700 font-medium hover:underline">
                        Baca &rarr;
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  )
}
