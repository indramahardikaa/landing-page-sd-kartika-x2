import { prisma } from "@/lib/prisma"
import Image from "next/image"
import Link from "next/link"
import { FiBookOpen, FiArrowRight } from "react-icons/fi"

export default async function BeritaPage() {
  let news: any[] = []
  try {
    news = await prisma.news.findMany({
      where: { published: true },
      orderBy: { createdAt: "desc" },
      include: { author: { select: { name: true } } },
    })
  } catch (error) {
    console.error("Database error:", error)
  }

  return (
    <>
      {/* Hero */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-green-600 via-green-700 to-green-800"></div>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 text-8xl">&#128240;</div>
          <div className="absolute bottom-10 right-10 text-8xl">&#128221;</div>
        </div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="inline-block bg-white/20 backdrop-blur-sm px-4 py-1.5 rounded-full text-white text-sm font-bold mb-4">
            &#128240; Berita Sekolah
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">Berita & Kegiatan</h1>
          <p className="text-lg text-green-100 max-w-2xl mx-auto">
            Kabar terbaru seputar kegiatan belajar mengajar dan informasi penting dari sekolah kami.
          </p>
        </div>
      </section>

      {/* News Grid */}
      <section className="py-16 bg-gradient-to-b from-white to-green-50">
        <div className="container mx-auto px-4">
          {news.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">&#128240;</div>
              <p className="text-gray-500 text-lg">Belum ada berita saat ini.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {news.map((n) => (
                <article key={n.id} className="bg-white rounded-2xl shadow-sm overflow-hidden border-2 border-gray-100 hover:border-green-300 hover:shadow-xl transition group">
                  <div className="h-48 relative overflow-hidden">
                    <Image
                      src="/images/placeholder-news.svg"
                      alt={n.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="font-bold text-gray-800 text-lg mb-2 group-hover:text-green-700 transition line-clamp-2">{n.title}</h3>
                    <p className="text-sm text-gray-500 line-clamp-3 mb-4">{n.content}</p>
                    <div className="flex justify-between items-center">
                      <div className="text-xs text-gray-400 space-y-0.5">
                        <p className="font-medium text-gray-600">{n.author.name}</p>
                        <p>{new Date(n.createdAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                      </div>
                      <Link href={`/berita/${n.id}`} className="bg-green-100 text-green-700 px-4 py-1.5 rounded-full text-sm font-bold hover:bg-green-200 transition flex items-center gap-1">
                        Baca <FiArrowRight size={12} />
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
