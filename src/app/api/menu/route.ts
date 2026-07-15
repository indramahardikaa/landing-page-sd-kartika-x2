import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { auth } from "@/lib/auth"

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const location = searchParams.get("location")

    const where: any = {}
    if (location) where.location = location

    const menuItems = await prisma.menuItem.findMany({
      where,
      orderBy: { order: "asc" },
    })
    return NextResponse.json(menuItems)
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
    const { label, href, icon, parentId, order, isActive, isExternal, location } = body

    if (!label || !href) {
      return NextResponse.json({ error: "Label and href are required" }, { status: 400 })
    }

    const menuItem = await prisma.menuItem.create({
      data: {
        label, href, icon, parentId,
        order: order ?? 0,
        isActive: isActive ?? true,
        isExternal: isExternal ?? false,
        location: location ?? "navbar",
      },
    })
    return NextResponse.json(menuItem, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
