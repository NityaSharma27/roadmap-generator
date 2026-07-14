import Groq from "groq-sdk"

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY
})

export async function extractSkillsFromJD(jdText: string) {
  const response = await groq.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    messages: [
      {
        role: "system",
        content: `You are a skill extractor. Analyze job descriptions and extract required skills.
        Always respond with valid JSON only. No extra text, no markdown, just pure JSON.`
      },
      {
        role: "user",
        content: `Extract skills from this job description and return JSON in exactly this format:
        {
          "targetRole": "job title here",
          "requiredSkills": ["skill1", "skill2", "skill3"],
          "niceToHave": ["skill1", "skill2"],
          "experienceLevel": "fresher/junior/mid/senior"
        }
        
        Job Description:
        ${jdText}`
      }
    ],
    response_format: { type: "json_object" },
    temperature: 0.3
  })

  const content = response.choices[0].message.content
  if (!content) throw new Error("No response from AI")
  return JSON.parse(content)
}

export async function generateRoadmap(
  missingSkills: string[],
  targetRole: string,
  hoursPerWeek: number
) {
  const estimatedWeeks = Math.max(
    4,
    Math.min(24, Math.ceil((missingSkills.length * 8) / hoursPerWeek))
  )

  const response = await groq.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    messages: [
      {
        role: "system",
        content: `You are a learning roadmap generator. Create detailed week by week study plans.
        Always respond with valid JSON only. No extra text, no markdown, just pure JSON.`
      },
      {
        role: "user",
        content: `Create a learning roadmap for someone who wants to become a ${targetRole}.
        
        They are missing these skills: ${missingSkills.join(", ")}
        They can study ${hoursPerWeek} hours per week.
        The roadmap must be exactly ${estimatedWeeks} weeks long.
        Each skill should get enough weeks based on its complexity.
        Distribute skills across weeks — one skill per week for simple skills,
        multiple weeks for complex skills like DSA or System Design.
        
        Return JSON in exactly this format:
        {
          "totalWeeks": ${estimatedWeeks},
          "milestones": [
            {
              "weekNumber": 1,
              "skill": "skill name",
              "topics": ["topic1", "topic2", "topic3"],
              "hoursNeeded": 10
            }
          ]
        }
        
        Do NOT include resources. Return exactly ${estimatedWeeks} milestone objects.`
      }
    ],
    response_format: { type: "json_object" },
    temperature: 0.5
  })

  const content = response.choices[0].message.content
  if (!content) throw new Error("No response from AI")
  return JSON.parse(content)
}