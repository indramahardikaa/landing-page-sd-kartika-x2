import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { auth } from "@/lib/auth"

export async function GET() {
  try {
    const facilities = await prisma.facility.findMany({ orderBy: { createdAt: "asc" } })
    return NextResponse.json(facilities)
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
    const { name, description } = body

    if (!name || !description) {
      return NextResponse.json({ error: "Name and description required" }, { status: 400 })
    }

    const facility = await prisma.facility.create({ data: { name, description } })
    return NextResponse.json(facility, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
