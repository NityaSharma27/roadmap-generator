"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"
import Navbar from "@/components/layout/Navbar"
import Button from "@/components/ui/Button"
import { useRoadmapStore } from "@/store/useRoadmapStore"

export default function NewRoadmapPage() {
  const { data: session } = useSession()
  const router = useRouter()
  const { addRoadmap } = useRoadmapStore()

  const [jdText, setJdText] = useState("")
  const [skillsInput, setSkillsInput] = useState("")
  const [hoursPerWeek, setHoursPerWeek] = useState(10)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  async function handleGenerate() {
    if (!jdText.trim()) {
      setError("Please paste a job description")
      return
    }
    setIsLoading(true)
    setError("")
    try {
      const currentSkills = skillsInput.split(",").map(s => s.trim()).filter(Boolean)
      const res = await fetch("/api/roadmap/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ jdText, currentSkills, hoursPerWeek })
      })
      const data = await res.json()
      if (!res.ok) {
        setError(data.error || "Failed to generate roadmap")
        return
      }
      addRoadmap(data.roadmap)
      router.push(`/roadmap/${data.roadmap.id}`)
    } catch {
      setError("Something went wrong. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div style={{ minHeight: "100vh", position: "relative" }}>
      <div className="mesh-bg" />
      <div style={{ position: "relative", zIndex: 1 }}>
        <Navbar />

        <main style={{ maxWidth: "720px", margin: "0 auto", padding: "48px 24px" }}>
          <div className="animate-fade-up" style={{ marginBottom: "40px" }}>
            <h1 style={{
              fontFamily: "Syne, sans-serif",
              fontSize: "32px",
              fontWeight: 800,
              color: "var(--text-primary)",
              letterSpacing: "-1px",
              marginBottom: "8px"
            }}>
              Generate Roadmap
            </h1>
            <p style={{ color: "var(--text-muted)", fontSize: "14px" }}>
              Paste a job description and let AI build your personalized plan
            </p>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            {/* JD Input */}
            <div className="glass-card animate-fade-up-delay-1" style={{ padding: "24px" }}>
              <h2 style={{
                fontFamily: "Syne, sans-serif",
                fontWeight: 700,
                fontSize: "15px",
                color: "var(--text-primary)",
                marginBottom: "4px"
              }}>
                📋 Job Description
              </h2>
              <p style={{ color: "var(--text-muted)", fontSize: "12px", marginBottom: "14px" }}>
                Paste the full job description — the more detail the better
              </p>
              <textarea
                value={jdText}
                onChange={(e) => setJdText(e.target.value)}
                placeholder="We are looking for a Frontend Developer with experience in React, TypeScript..."
                rows={10}
                className="input-field"
                style={{ padding: "14px", fontSize: "14px", resize: "vertical", lineHeight: 1.6 }}
              />
            </div>

            {/* Current Skills */}
            <div className="glass-card animate-fade-up-delay-2" style={{ padding: "24px" }}>
              <h2 style={{
                fontFamily: "Syne, sans-serif",
                fontWeight: 700,
                fontSize: "15px",
                color: "var(--text-primary)",
                marginBottom: "4px"
              }}>
                🧠 Your Current Skills
              </h2>
              <p style={{ color: "var(--text-muted)", fontSize: "12px", marginBottom: "14px" }}>
                Comma separated — e.g. React, JavaScript, Git
              </p>
              <input
                type="text"
                value={skillsInput}
                onChange={(e) => setSkillsInput(e.target.value)}
                placeholder="React, JavaScript, HTML, CSS, Git..."
                className="input-field"
                style={{ padding: "12px 14px", fontSize: "14px" }}
              />
            </div>

            <div className="glass-card animate-fade-up-delay-3" style={{ padding: "24px" }}>
              <h2 style={{
                fontFamily: "Syne, sans-serif",
                fontWeight: 700,
                fontSize: "15px",
                color: "var(--text-primary)",
                marginBottom: "4px"
              }}>
                ⏰ Study Time per Week
              </h2>
              <p style={{ color: "var(--text-muted)", fontSize: "12px", marginBottom: "20px" }}>
                How many hours can you dedicate per week?
              </p>
              <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                <input
                  type="range"
                  min={5}
                  max={40}
                  value={hoursPerWeek}
                  onChange={(e) => setHoursPerWeek(Number(e.target.value))}
                  style={{ flex: 1, accentColor: "var(--blue)" }}
                />
                <span style={{
                  fontFamily: "Syne, sans-serif",
                  fontWeight: 700,
                  fontSize: "20px",
                  color: "var(--blue-bright)",
                  minWidth: "80px",
                  textAlign: "right"
                }}>
                  {hoursPerWeek}h/wk
                </span>
              </div>
            </div>

            {error && (
              <div style={{
                background: "rgba(239,68,68,0.1)",
                border: "1px solid rgba(239,68,68,0.2)",
                borderRadius: "10px",
                padding: "12px 16px",
                color: "#f87171",
                fontSize: "13px"
              }}>
                {error}
              </div>
            )}

            <Button
              onClick={handleGenerate}
              isLoading={isLoading}
              className="w-full py-4 text-base animate-fade-up-delay-4"
            >
              {isLoading ? "AI is building your roadmap..." : "Generate My Roadmap →"}
            </Button>
          </div>
        </main>
      </div>
    </div>
  )
}