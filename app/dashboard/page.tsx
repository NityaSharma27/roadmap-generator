"use client"

import { useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Navbar from "@/components/layout/Navbar"
import RoadmapCard from "@/components/roadmap/RoadmapCard"
import { useRoadmapStore } from "@/store/useRoadmapStore"
import { Roadmap } from "@/types/index"

export default function DashboardPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const { roadmaps, setRoadmaps } = useRoadmapStore()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (status === "unauthenticated") router.push("/login")
  }, [status])

  useEffect(() => {
    if (status === "authenticated") fetchRoadmaps()
  }, [status])

  async function fetchRoadmaps() {
    try {
      const res = await fetch("/api/progress")
      const data = await res.json()

      setRoadmaps(data?.roadmaps || [])
    } catch {
      console.error("Failed to fetch roadmaps")
      setRoadmaps([])
    } finally {
      setIsLoading(false)
    }
  }

  if (status === "loading" || isLoading) {
    return (
      <div style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}>
        <div style={{ textAlign: "center" }}>
          <div style={{
            width: "40px", height: "40px",
            border: "2px solid var(--border)",
            borderTop: "2px solid var(--blue)",
            borderRadius: "50%",
            animation: "spin 1s linear infinite",
            margin: "0 auto 16px"
          }} />
          <p style={{ color: "var(--text-muted)", fontSize: "14px" }}>Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div style={{ minHeight: "100vh", position: "relative" }}>
      <div className="mesh-bg" />
      <div style={{ position: "relative", zIndex: 1 }}>
        <Navbar />

        <main style={{ maxWidth: "1100px", margin: "0 auto", padding: "48px 24px" }}>
          {/* Header */}
          <div className="animate-fade-up" style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "40px"
          }}>
            <div>
              <h1 style={{
                fontFamily: "Syne, sans-serif",
                fontSize: "32px",
                fontWeight: 800,
                color: "var(--text-primary)",
                letterSpacing: "-1px"
              }}>
                My Roadmaps
              </h1>
              <p style={{ color: "var(--text-muted)", fontSize: "14px", marginTop: "4px" }}>
                {roadmaps.length} roadmap{roadmaps.length !== 1 ? "s" : ""} generated
              </p>
            </div>
            <Link href="/roadmap/new">
              <button className="glow-button" style={{
                padding: "12px 28px",
                fontSize: "14px",
                fontWeight: 600,
                letterSpacing: "0.02em"
              }}>
                + New Roadmap
              </button>
            </Link>
          </div>

          {roadmaps.length === 0 ? (
            <div className="glass-card animate-fade-up-delay-1" style={{
              textAlign: "center",
              padding: "80px 40px"
            }}>
              <div style={{ fontSize: "48px", marginBottom: "16px" }}>🗺️</div>
              <h2 style={{
                fontFamily: "Syne, sans-serif",
                fontSize: "22px",
                fontWeight: 700,
                color: "var(--text-primary)",
                marginBottom: "8px"
              }}>
                No roadmaps yet
              </h2>
              <p style={{
                color: "var(--text-muted)",
                fontSize: "14px",
                marginBottom: "28px"
              }}>
                Paste a job description to generate your first personalized roadmap
              </p>
              <Link href="/roadmap/new">
                <button className="glow-button" style={{
                  padding: "14px 32px",
                  fontSize: "15px",
                  fontWeight: 600,
                  borderRadius: "12px"
                }}>
                  Generate My First Roadmap →
                </button>
              </Link>
            </div>
          ) : (
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
              gap: "20px"
            }}>
              {roadmaps.map((roadmap: Roadmap, i: number) => (
                <div
                  key={roadmap.id}
                  className={`animate-fade-up-delay-${Math.min(i + 1, 4)}`}
                >
                  <RoadmapCard roadmap={roadmap} />
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  )
}