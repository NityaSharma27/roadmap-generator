// app/roadmap/[id]/page.tsx
"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { useSession } from "next-auth/react"
import Navbar from "@/components/layout/Navbar"
import MilestoneItem from "@/components/roadmap/MilestoneItem"
import ProgressChart from "@/components/roadmap/ProgressChart"
import { useRoadmapStore } from "@/store/useRoadmapStore"
import { Roadmap } from "@/types/index"

export default function RoadmapPage() {
  const { id } = useParams()
  const { data: session, status } = useSession()
  const router = useRouter()
  const { updateMilestone } = useRoadmapStore()

  const [roadmap, setRoadmap] = useState<Roadmap | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isReshuffling, setIsReshuffling] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [reshuffleMsg, setReshuffleMsg] = useState("")

  useEffect(() => {
    if (status === "unauthenticated") router.push("/login")
  }, [status])

  useEffect(() => {
    if (id) fetchRoadmap()
  }, [id])

  async function fetchRoadmap() {
    try {
      const res = await fetch(`/api/roadmap/${id}`)
      const data = await res.json()
      setRoadmap(data.roadmap)
    } catch {
      console.error("Failed to fetch roadmap")
    } finally {
      setIsLoading(false)
    }
  }

  async function handleDelete() {
    const confirmed = window.confirm(
      "Are you sure you want to delete this roadmap? This cannot be undone."
    )
    if (!confirmed) return

    setIsDeleting(true)
    try {
      const res = await fetch(`/api/roadmap/${id}`, {
        method: "DELETE"
      })
      if (res.ok) {
        router.push("/dashboard")
      }
    } catch {
      console.error("Failed to delete roadmap")
    } finally {
      setIsDeleting(false)
    }
  }


  async function handleReshuffle() {
    setIsReshuffling(true)
    setReshuffleMsg("")
    try {
      const res = await fetch("/api/roadmap/reshuffle", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ roadmapId: id })
      })
      const data = await res.json()
      if (!res.ok) {
        setReshuffleMsg("Failed to reshuffle")
        return
      }
      setRoadmap(data.roadmap)
      setReshuffleMsg(
        `✓ Reshuffled! Kept ${data.preservedWeeks} completed weeks, rebuilt ${data.reshuffledWeeks} remaining weeks.`
      )
    } catch {
      setReshuffleMsg("Something went wrong")
    } finally {
      setIsReshuffling(false)
    }
  }

  async function handleMilestoneToggle(milestoneId: string, isCompleted: boolean) {
    try {
      await fetch("/api/progress", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ milestoneId, isCompleted })
      })
      updateMilestone(milestoneId, isCompleted)
      setRoadmap((prev) =>
        prev ? {
          ...prev,
          milestones: prev.milestones.map((m) =>
            m.id === milestoneId ? { ...m, isCompleted } : m
          )
        } : null
      )
    } catch {
      console.error("Failed to update progress")
    }
  }

  if (isLoading) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ textAlign: "center" }}>
          <div style={{
            width: "40px", height: "40px",
            border: "2px solid var(--border)",
            borderTop: "2px solid var(--blue)",
            borderRadius: "50%",
            animation: "spin 1s linear infinite",
            margin: "0 auto 16px"
          }} />
          <p style={{ color: "var(--text-muted)", fontSize: "14px" }}>Loading roadmap...</p>
        </div>
      </div>
    )
  }

  if (!roadmap) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <p style={{ color: "var(--text-muted)" }}>Roadmap not found</p>
      </div>
    )
  }

  return (
    <div style={{ minHeight: "100vh", position: "relative" }}>
      <div className="mesh-bg" />
      <div style={{ position: "relative", zIndex: 1 }}>
        <Navbar />

        <main style={{ maxWidth: "900px", margin: "0 auto", padding: "48px 24px" }}>
          {/* Header */}

          {/* Header */}
          <div className="animate-fade-up" style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            marginBottom: "40px"
          }}>
            <div>
              <h1 style={{
                fontFamily: "Syne, sans-serif",
                fontSize: "28px",
                fontWeight: 800,
                color: "var(--text-primary)",
                letterSpacing: "-0.5px",
                marginBottom: "6px"
              }}>
                {roadmap.title}
              </h1>
              <p style={{ color: "var(--text-muted)", fontSize: "14px" }}>
                Target: {roadmap.targetRole}
              </p>
            </div>

            {/* buttons row */}
            <div style={{ display: "flex", gap: "10px" }}>
              <button
                onClick={() => router.push("/dashboard")}
                className="ghost-button"
                style={{ padding: "10px 20px", fontSize: "13px" }}
              >
                ← Back
              </button>
              <button
                onClick={handleDelete}
                className="ghost-button"
                style={{
                  padding: "10px 20px",
                  fontSize: "13px",
                  color: "#f87171",
                  borderColor: "rgba(248,113,113,0.3)"
                }}
              >
                🗑 Delete
              </button>
            </div>
          </div>

          {/* Stats */}
          <div className="animate-fade-up-delay-1" style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "16px",
            marginBottom: "28px"
          }}>
            {[
              { label: "Skills Gap", value: `${roadmap.gapScore}%`, color: "#f87171" },
              { label: "Skills to Learn", value: roadmap.missingSkills.length, color: "var(--blue-bright)" },
              { label: "Weeks Done", value: roadmap.milestones.filter(m => m.isCompleted).length, color: "#4ade80" }
            ].map((stat, i) => (
              <div key={i} className="glass-card" style={{ padding: "20px", textAlign: "center" }}>
                <p style={{
                  fontFamily: "Syne, sans-serif",
                  fontSize: "32px",
                  fontWeight: 800,
                  color: stat.color,
                  lineHeight: 1
                }}>
                  {stat.value}
                </p>
                <p style={{ color: "var(--text-muted)", fontSize: "12px", marginTop: "6px" }}>
                  {stat.label}
                </p>
              </div>
            ))}
          </div>



          {/* Reshuffle Card */}
          <div className="glass-card animate-fade-up-delay-2" style={{
            padding: "24px",
            marginBottom: "24px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "16px"
          }}>
            <div>
              <h2 style={{
                fontFamily: "Syne, sans-serif",
                fontWeight: 700,
                fontSize: "16px",
                color: "var(--text-primary)",
                marginBottom: "6px"
              }}>
                ⚡ Dynamic Reshuffling
              </h2>
              <p style={{ fontSize: "13px", color: "var(--text-muted)", maxWidth: "500px" }}>
                Completed weeks ahead of schedule? Reshuffle to compress your remaining
                plan — completed progress is always preserved.
              </p>
              {reshuffleMsg && (
                <p style={{
                  fontSize: "13px",
                  color: "#4ade80",
                  marginTop: "8px",
                  background: "rgba(34,197,94,0.08)",
                  padding: "8px 12px",
                  borderRadius: "8px",
                  border: "1px solid rgba(34,197,94,0.15)"
                }}>
                  {reshuffleMsg}
                </p>
              )}
            </div>
            <button
              onClick={handleReshuffle}
              disabled={isReshuffling}
              className="glow-button"
              style={{ padding: "12px 24px", fontSize: "14px", whiteSpace: "nowrap" }}
            >
              {isReshuffling ? (
                <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{
                    width: "14px", height: "14px",
                    border: "2px solid rgba(255,255,255,0.3)",
                    borderTop: "2px solid white",
                    borderRadius: "50%",
                    animation: "spin 1s linear infinite",
                    display: "inline-block"
                  }} />
                  Reshuffling...
                </span>
              ) : "Reshuffle Plan →"}
            </button>
          </div>

          {/* Progress Chart */}
          <div className="glass-card animate-fade-up-delay-2" style={{ padding: "24px", marginBottom: "24px" }}>
            <h2 style={{
              fontFamily: "Syne, sans-serif",
              fontWeight: 700,
              fontSize: "16px",
              color: "var(--text-primary)",
              marginBottom: "20px"
            }}>
              📊 Progress Overview
            </h2>
            <ProgressChart milestones={roadmap.milestones} />
          </div>

          {/* Missing Skills */}
          <div className="glass-card animate-fade-up-delay-3" style={{ padding: "24px", marginBottom: "24px" }}>
            <h2 style={{
              fontFamily: "Syne, sans-serif",
              fontWeight: 700,
              fontSize: "16px",
              color: "var(--text-primary)",
              marginBottom: "14px"
            }}>
              🎯 Skills to Learn
            </h2>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
              {roadmap.missingSkills.map((skill, i) => (
                <span key={i} className="badge badge-red">{skill}</span>
              ))}
            </div>
          </div>

          {/* Milestones */}
          <div className="animate-fade-up-delay-4">
            <h2 style={{
              fontFamily: "Syne, sans-serif",
              fontWeight: 700,
              fontSize: "16px",
              color: "var(--text-primary)",
              marginBottom: "16px"
            }}>
              🗓️ Weekly Milestones
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {roadmap.milestones.map((milestone) => (
                <MilestoneItem
                  key={milestone.id}
                  milestone={milestone}
                  onToggle={handleMilestoneToggle}
                />
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}