// lib/gap-score.ts
import { GapScoreResult } from "@/types/index"

export function calculateGapScore(
  requiredSkills: string[],  // skills from JD
  userSkills: string[]       // skills user said they know
): GapScoreResult {

  // normalize everything to lowercase for fair comparison
  // "React" and "react" should be treated the same
  const normalizedRequired = requiredSkills.map(s => s.toLowerCase().trim())
  const normalizedUser = userSkills.map(s => s.toLowerCase().trim())

  // find skills user already has
  const matchedSkills = requiredSkills.filter(skill =>
    normalizedUser.includes(skill.toLowerCase().trim())
  )

  // find skills user is missing
  const missingSkills = requiredSkills.filter(skill =>
    !normalizedUser.includes(skill.toLowerCase().trim())
  )

  // calculate gap percentage
  // if JD needs 10 skills and user knows 3, gap = 70%
  const gapScore = Math.round(
    (missingSkills.length / requiredSkills.length) * 100
  )

  return {
    missingSkills,
    matchedSkills,
    gapScore,
    totalRequired: requiredSkills.length
  }
}