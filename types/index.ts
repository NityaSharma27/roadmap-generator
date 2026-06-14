// types/index.ts

export interface User {
  id: string
  name: string | null
  email: string
  hoursPerWeek: number
  currentSkills: string[]
  createdAt: Date
}

export interface Roadmap {
  id: string
  title: string
  jdText: string
  targetRole: string
  requiredSkills: string[]
  missingSkills: string[]
  gapScore: number
  status: string
  createdAt: Date
  milestones: Milestone[]
}

export interface Milestone {
  id: string
  weekNumber: number
  skill: string
  topics: string[]
  hoursNeeded: number
  isCompleted: boolean
  completedAt: Date | null
  resources: Resource[]
}

export interface Resource {
  id: string
  title: string
  url: string
  type: string
}

export interface GapScoreResult {
  missingSkills: string[]
  matchedSkills: string[]
  gapScore: number
  totalRequired: number
}