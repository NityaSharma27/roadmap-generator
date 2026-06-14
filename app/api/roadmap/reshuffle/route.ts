// app/api/roadmap/reshuffle/route.ts
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

    // Step 1: fetch the full roadmap with all milestones
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

    // Step 2: separate completed and incomplete milestones
    const completedMilestones = roadmap.milestones.filter(m => m.isCompleted)
    const incompleteMilestones = roadmap.milestones.filter(m => !m.isCompleted)

    // if everything is completed no reshuffling needed
    if (incompleteMilestones.length === 0) {
      return NextResponse.json({
        message: "All milestones completed — no reshuffling needed",
        roadmap
      })
    }

    // Step 3: get user for hoursPerWeek
    const user = await prisma.user.findUnique({
      where: { email: session.user.email }
    })

    // Step 4: get incomplete skills to regenerate
    const incompleteSkills = incompleteMilestones.map(m => m.skill)

    // Step 5: call Groq to regenerate only incomplete weeks
    const reshuffledData = await generateRoadmap(
      incompleteSkills,
      roadmap.targetRole,
      user?.hoursPerWeek || 10
    )

    // Step 6: delete only incomplete milestones and their resources
    // keep completed milestones untouched
    const incompleteMilestoneIds = incompleteMilestones.map(m => m.id)

    await prisma.resource.deleteMany({
      where: { milestoneId: { in: incompleteMilestoneIds } }
    })

    await prisma.milestone.deleteMany({
      where: { id: { in: incompleteMilestoneIds } }
    })

    // Step 7: create new reshuffled milestones
    // week numbers continue from where completed ones left off
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

    // Step 8: add resources to each new milestone
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

    // Step 9: return updated roadmap
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