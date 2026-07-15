import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { auth } from "@/lib/auth"

export async function GET() {
  try {
    const session = await auth()
    if (!session?.user || (session.user as any).role !== "admin") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 })
    }

    const registrations = await prisma.pPDBRegistration.findMany({
      orderBy: { createdAt: "desc" },
    })
    return NextResponse.json(registrations)
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const {
      studentName, birthPlace, birthDate, gender, religion, address,
      fatherName, motherName, guardianPhone, guardianEmail,
      previousSchool, academicYear
    } = body

    if (!studentName || !birthPlace || !birthDate || !gender || !religion || !address ||
        !fatherName || !motherName || !guardianPhone || !academicYear) {
      return NextResponse.json({ error: "Semua field wajib harus diisi" }, { status: 400 })
    }

    const registration = await prisma.pPDBRegistration.create({
      data: {
        studentName, birthPlace, birthDate, gender, religion, address,
        fatherName, motherName, guardianPhone, guardianEmail,
        previousSchool, academicYear,
      },
    })

    return NextResponse.json(registration, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
