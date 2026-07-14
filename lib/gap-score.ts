import { GapScoreResult } from "@/types/index"

export function calculateGapScore(
  requiredSkills: string[],  
  userSkills: string[]       
): GapScoreResult {

  
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