import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { auth } from "@/lib/auth"

export async function GET() {
  try {
    const staff = await prisma.staff.findMany({ orderBy: { order: "asc" } })
    return NextResponse.json(staff)
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const session = await auth()
    if (!session?.user || (session.user as any).role !== "admin") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 })
    }

    const body = await req.json()
    const { name, position, category, quote, order } = body

    if (!name || !position) {
      return NextResponse.json({ error: "Name and position required" }, { status: 400 })
    }

    const staff = await prisma.staff.create({
      data: { name, position, category: category || "guru", quote, order: order || 0 },
    })
    return NextResponse.json(staff, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
