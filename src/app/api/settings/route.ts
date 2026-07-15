import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { auth } from "@/lib/auth"

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const category = searchParams.get("category")

    const where: any = {}
    if (category) where.category = category

    const settings = await prisma.siteSettings.findMany({ where })
    return NextResponse.json(settings)
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
    const { key, value, category } = body

    if (!key || value === undefined) {
      return NextResponse.json({ error: "Key and value required" }, { status: 400 })
    }

    const setting = await prisma.siteSettings.upsert({
      where: { key },
      update: { value, category: category || "general" },
      create: { key, value, category: category || "general" },
    })

    return NextResponse.json(setting)
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function PUT(req: Request) {
  try {
    const session = await auth()
    if (!session?.user || (session.user as any).role !== "admin") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 })
    }

    const body = await req.json()
    // Batch update multiple settings
    if (Array.isArray(body)) {
      for (const item of body) {
        await prisma.siteSettings.upsert({
          where: { key: item.key },
          update: { value: item.value, category: item.category || "general" },
          create: { key: item.key, value: item.value, category: item.category || "general" },
        })
      }
      return NextResponse.json({ message: "Settings updated" })
    }

    return NextResponse.json({ error: "Invalid body" }, { status: 400 })
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
