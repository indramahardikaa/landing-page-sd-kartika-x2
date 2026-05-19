import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { auth } from "@/lib/auth"

export async function GET() {
  try {
    const news = await prisma.news.findMany({
      orderBy: { createdAt: "desc" },
      include: { author: { select: { name: true } } },
    })
    return NextResponse.json(news)
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const session = await auth()
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await req.json()
    const { title, content, published } = body

    if (!title || !content) {
      return NextResponse.json({ error: "Title and content required" }, { status: 400 })
    }

    const news = await prisma.news.create({
      data: {
        title,
        content,
        published: published ?? false,
        authorId: (session.user as any).id,
      },
    })

    return NextResponse.json(news, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
