// app/api/roadmap/generate/route.ts
import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import prisma from "@/lib/prisma"
import { extractSkillsFromJD, generateRoadmap } from "@/lib/groq"
import { calculateGapScore } from "@/lib/gap-score"
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

    const { jdText, currentSkills, hoursPerWeek } = await req.json()

    if (!jdText) {
      return NextResponse.json(
        { error: "Job description is required" },
        { status: 400 }
      )
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email }
    })

    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      )
    }

    // Step 1: extract skills from JD
    const extractedData = await extractSkillsFromJD(jdText)

    // Step 2: calculate gap
    const gapResult = calculateGapScore(
      extractedData.requiredSkills,
      currentSkills || user.currentSkills
    )

    // Step 3: generate roadmap
    const roadmapData = await generateRoadmap(
      gapResult.missingSkills,
      extractedData.targetRole,
      hoursPerWeek || user.hoursPerWeek
    )

    // Step 4: save to database with real resources from our mapper
    const roadmap = await prisma.roadmap.create({
      data: {
        title: `${extractedData.targetRole} Roadmap`,
        jdText,
        targetRole: extractedData.targetRole,
        requiredSkills: extractedData.requiredSkills,
        missingSkills: gapResult.missingSkills,
        gapScore: gapResult.gapScore,
        userId: user.id,
        milestones: {
          create: roadmapData.milestones.map((milestone: any) => ({
            weekNumber: milestone.weekNumber,
            skill: milestone.skill,
            topics: milestone.topics,
            hoursNeeded: milestone.hoursNeeded,
            // use our real resource mapper instead of AI-generated URLs
            resources: {
              create: getResourcesForSkill(milestone.skill)
            }
          }))
        }
      },
      include: {
        milestones: {
          include: { resources: true }
        }
      }
    })

    await prisma.user.update({
      where: { id: user.id },
      data: {
        currentSkills: currentSkills || user.currentSkills,
        hoursPerWeek: hoursPerWeek || user.hoursPerWeek
      }
    })

    return NextResponse.json({
      message: "Roadmap generated successfully",
      roadmap,
      gapResult
    })

  } catch (error) {
    console.error("Roadmap generation error:", error)
    return NextResponse.json(
      { error: "Failed to generate roadmap" },
      { status: 500 }
    )
  }
}