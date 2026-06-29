import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { auth } from "@/lib/auth"

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const activeOnly = searchParams.get("active") === "true"

    const where = activeOnly ? { isActive: true } : {}
    const announcements = await prisma.announcement.findMany({
      where,
      orderBy: { createdAt: "desc" },
      include: { author: { select: { name: true } } },
    })
    return NextResponse.json(announcements)
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
    const { title, content, isActive, priority, startDate, endDate } = body

    if (!title || !content) {
      return NextResponse.json({ error: "Title and content required" }, { status: 400 })
    }

    const announcement = await prisma.announcement.create({
      data: {
        title,
        content,
        isActive: isActive ?? true,
        priority: priority ?? "normal",
        startDate: startDate ? new Date(startDate) : null,
        endDate: endDate ? new Date(endDate) : null,
        authorId: (session.user as any).id,
      },
    })

    return NextResponse.json(announcement, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
