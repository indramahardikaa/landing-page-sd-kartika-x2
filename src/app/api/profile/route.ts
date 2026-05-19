import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { auth } from "@/lib/auth"

export async function GET() {
  try {
    const profiles = await prisma.schoolProfile.findMany()
    return NextResponse.json(profiles)
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

    const { key, value } = await req.json()
    if (!key || value === undefined) {
      return NextResponse.json({ error: "Key and value required" }, { status: 400 })
    }

    const profile = await prisma.schoolProfile.upsert({
      where: { key },
      update: { value },
      create: { key, value },
    })

    return NextResponse.json(profile)
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
