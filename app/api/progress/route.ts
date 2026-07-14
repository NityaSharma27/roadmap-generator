import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import prisma from "@/lib/prisma"

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.email) {
      return NextResponse.json(
        { error: "You must be logged in" },
        { status: 401 }
      )
    }

    const { milestoneId, isCompleted } = await req.json()

    if (!milestoneId) {
      return NextResponse.json(
        { error: "Milestone ID is required" },
        { status: 400 }
      )
    }

    const milestone = await prisma.milestone.update({
      where: { id: milestoneId },
      data: {
        isCompleted,
        completedAt: isCompleted ? new Date() : null
      }
    })

    return NextResponse.json({
      message: "Progress updated successfully",
      milestone
    })

  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update progress" },
      { status: 500 }
    )
  }
}

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.email) {
      return NextResponse.json(
        { error: "You must be logged in" },
        { status: 401 }
      )
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: {
        roadmaps: {
          orderBy: { createdAt: "desc" },
          include: {
            milestones: {
              include: { resources: true }
            }
          }
        }
      }
    })

    return NextResponse.json({
      roadmaps: user?.roadmaps || []
    })

  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch roadmaps" },
      { status: 500 }
    )
  }
}