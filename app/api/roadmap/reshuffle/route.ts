import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import prisma from "@/lib/prisma"
import { generateRoadmap } from "@/lib/groq"
import { getResourcesForSkill } from "@/lib/resources"

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.email) {
      return NextResponse.json(
        { error: "You must be logged in" },
        { status: 401 }
      )
    }

    const { roadmapId } = await req.json()

    if (!roadmapId) {
      return NextResponse.json(
        { error: "Roadmap ID is required" },
        { status: 400 }
      )
    }

    const roadmap = await prisma.roadmap.findUnique({
      where: { id: roadmapId },
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

    const completedMilestones = roadmap.milestones.filter(m => m.isCompleted)
    const incompleteMilestones = roadmap.milestones.filter(m => !m.isCompleted)

   
    if (incompleteMilestones.length === 0) {
      return NextResponse.json({
        message: "All milestones completed — no reshuffling needed",
        roadmap
      })
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email }
    })

    const incompleteSkills = incompleteMilestones.map(m => m.skill)

    const reshuffledData = await generateRoadmap(
      incompleteSkills,
      roadmap.targetRole,
      user?.hoursPerWeek || 10
    )

    const incompleteMilestoneIds = incompleteMilestones.map(m => m.id)

    await prisma.resource.deleteMany({
      where: { milestoneId: { in: incompleteMilestoneIds } }
    })

    await prisma.milestone.deleteMany({
      where: { id: { in: incompleteMilestoneIds } }
    })

    const startingWeek = completedMilestones.length + 1

    await prisma.milestone.createMany({
      data: reshuffledData.milestones.map((m: any, index: number) => ({
        weekNumber: startingWeek + index,
        skill: m.skill,
        topics: m.topics,
        hoursNeeded: m.hoursNeeded,
        isCompleted: false,
        roadmapId: roadmap.id
      }))
    })

    const newMilestones = await prisma.milestone.findMany({
      where: {
        roadmapId: roadmap.id,
        isCompleted: false
      },
      orderBy: { weekNumber: "asc" }
    })

    for (const milestone of newMilestones) {
      const resources = getResourcesForSkill(milestone.skill)
      await prisma.resource.createMany({
        data: resources.map(r => ({
          title: r.title,
          url: r.url,
          type: r.type,
          milestoneId: milestone.id
        }))
      })
    }

    const updatedRoadmap = await prisma.roadmap.findUnique({
      where: { id: roadmapId },
      include: {
        milestones: {
          orderBy: { weekNumber: "asc" },
          include: { resources: true }
        }
      }
    })

    return NextResponse.json({
      message: "Roadmap reshuffled successfully",
      roadmap: updatedRoadmap,
      reshuffledWeeks: reshuffledData.milestones.length,
      preservedWeeks: completedMilestones.length
    })

  } catch (error) {
    console.error("Reshuffle error:", error)
    return NextResponse.json(
      { error: "Failed to reshuffle roadmap" },
      { status: 500 }
    )
  }
}