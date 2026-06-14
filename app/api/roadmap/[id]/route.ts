// app/api/roadmap/[id]/route.ts
import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import prisma from "@/lib/prisma"

// GET — fetch a single roadmap
export async function GET(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.email) {
      return NextResponse.json(
        { error: "You must be logged in" },
        { status: 401 }
      )
    }

    // Next.js 16 requires awaiting params
    const { id } = await context.params

    const roadmap = await prisma.roadmap.findUnique({
      where: { id },
      include: {
        milestones: {
          orderBy: { weekNumber: "asc" },
          include: { resources: true }
        }
      }
    })

    if (!roadmap) {
      return NextResponse.json(
        { error: "Roadmap not found" },
        { status: 404 }
      )
    }

    return NextResponse.json({ roadmap })

  } catch (error) {
    console.error("Fetch roadmap error:", error)
    return NextResponse.json(
      { error: "Failed to fetch roadmap" },
      { status: 500 }
    )
  }
}

// DELETE — delete a roadmap
export async function DELETE(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.email) {
      return NextResponse.json(
        { error: "You must be logged in" },
        { status: 401 }
      )
    }

    const { id } = await context.params

    await prisma.roadmap.delete({
      where: { id }
    })

    return NextResponse.json({ message: "Roadmap deleted successfully" })

  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete roadmap" },
      { status: 500 }
    )
  }
}