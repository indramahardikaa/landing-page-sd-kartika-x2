import { prisma } from "@/lib/prisma"
import Link from "next/link"
import Image from "next/image"
import { notFound } from "next/navigation"
import { FiArrowLeft, FiCalendar, FiUser } from "react-icons/fi"

export default async function BeritaDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  let news: any = null
  try {
    news = await prisma.news.findUnique({
      where: { id },
      include: { author: { select: { name: true } } },
    })
  } catch (error) {
    console.error("Database error:", error)
  }

  if (!news || !news.published) notFound()

  return (
    <section className="py-12 bg-gradient-to-b from-green-50 to-white min-h-screen">
      <div className="container mx-auto px-4 max-w-4xl">
        <Link href="/berita" className="inline-flex items-center gap-2 text-green-700 font-bold mb-6 hover:text-green-800 bg-green-100 px-4 py-2 rounded-full transition">
          <FiArrowLeft /> Kembali ke Berita
        </Link>

        <article className="bg-white rounded-3xl shadow-lg overflow-hidden border-2 border-gray-100">
          {/* Header Image */}
          <div className="h-56 md:h-72 relative">
            <Image
              src="/images/placeholder-news.svg"
              alt={news.title}
              fill
              className="object-cover"
            />
          </div>

          {/* Content */}
          <div className="p-8 md:p-10">
            <h1 className="text-2xl md:text-4xl font-extrabold text-gray-800 mb-4 leading-tight">{news.title}</h1>
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-8 pb-6 border-b border-gray-100">
              <span className="flex items-center gap-1.5 bg-green-100 text-green-700 px-3 py-1 rounded-full font-medium">
                <FiUser size={14} /> {news.author.name}
              </span>
              <span className="flex items-center gap-1.5 bg-gray-100 text-gray-600 px-3 py-1 rounded-full font-medium">
                <FiCalendar size={14} /> {new Date(news.createdAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
              </span>
            </div>
            <div className="prose max-w-none text-gray-700 leading-relaxed whitespace-pre-wrap text-base">
              {news.content}
            </div>
          </div>
        </article>
      </div>
    </section>
  )
}
