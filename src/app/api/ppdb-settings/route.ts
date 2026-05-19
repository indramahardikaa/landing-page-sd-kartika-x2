import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { auth } from "@/lib/auth"

export async function GET() {
  try {
    const settings = await prisma.pPDBSettings.findFirst({
      where: { isActive: true },
      orderBy: { createdAt: "desc" },
    })
    return NextResponse.json(settings)
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
    const { title, description, startDate, endDate, isActive, registrationUrl, whatsappNumber, quota, year } = body

    if (!startDate || !endDate) {
      return NextResponse.json({ error: "Start date and end date required" }, { status: 400 })
    }

    // Deactivate all existing settings
    await prisma.pPDBSettings.updateMany({
      data: { isActive: false },
    })

    // Create new active setting
    const settings = await prisma.pPDBSettings.create({
      data: {
        title: title || "PPDB 2025/2026",
        description: description || "Penerimaan Peserta Didik Baru",
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        isActive: isActive ?? true,
        registrationUrl,
        whatsappNumber,
        quota: quota || 100,
        year: year || "2025/2026",
      },
    })

    return NextResponse.json(settings, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function PUT(req: Request) {
  try {
    const session = await auth()
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await req.json()
    const { id, ...data } = body

    if (!id) {
      return NextResponse.json({ error: "ID required" }, { status: 400 })
    }

    if (data.startDate) data.startDate = new Date(data.startDate)
    if (data.endDate) data.endDate = new Date(data.endDate)

    const settings = await prisma.pPDBSettings.update({
      where: { id },
      data,
    })

    return NextResponse.json(settings)
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
