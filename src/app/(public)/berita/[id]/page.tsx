import { prisma } from "@/lib/prisma"
import Link from "next/link"
import { notFound } from "next/navigation"
import { FiArrowLeft } from "react-icons/fi"

export default async function BeritaDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const news = await prisma.news.findUnique({
    where: { id },
    include: { author: { select: { name: true } } },
  })

  if (!news || !news.published) notFound()

  return (
    <section className="py-16">
      <div className="container mx-auto px-4 max-w-4xl">
        <Link href="/berita" className="inline-flex items-center gap-2 text-green-700 font-medium mb-6 hover:underline">
          <FiArrowLeft /> Kembali ke Berita
        </Link>
        <article>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">{news.title}</h1>
          <div className="flex items-center gap-3 text-sm text-gray-500 mb-8">
            <span>{news.author.name}</span>
            <span>&middot;</span>
            <span>{new Date(news.createdAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
          </div>
          <div className="prose max-w-none text-gray-700 leading-relaxed whitespace-pre-wrap">
            {news.content}
          </div>
        </article>
      </div>
    </section>
  )
}
