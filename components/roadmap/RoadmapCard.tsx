// components/roadmap/RoadmapCard.tsx
"use client"

import Link from "next/link"
import { Roadmap } from "@/types/index"

interface RoadmapCardProps {
  roadmap: Roadmap
}

export default function RoadmapCard({ roadmap }: RoadmapCardProps) {
  const completedMilestones = roadmap.milestones.filter((m) => m.isCompleted).length
  const totalMilestones = roadmap.milestones.length
  const percentage = Math.round((completedMilestones / totalMilestones) * 100) || 0
  const isCompleted = roadmap.status === "completed" || percentage === 100

  return (
    <Link href={`/roadmap/${roadmap.id}`} style={{ textDecoration: "none" }}>
      <div
        style={{
          padding: "24px",
          cursor: "pointer",
          transition: "all 0.25s ease",
          borderRadius: "16px",
          backdropFilter: "blur(12px)",
          position: "relative",
          overflow: "hidden",
          // completed = warm peach glow, active = standard card
          background: isCompleted
            ? "linear-gradient(135deg, rgba(236,184,165,0.15), rgba(228,154,176,0.12))"
            : "rgba(45,21,40,0.6)",
          border: isCompleted
            ? "1px solid rgba(236,184,165,0.4)"
            : "1px solid rgba(228,154,176,0.15)"
        }}
        onMouseEnter={e => {
          const el = e.currentTarget as HTMLDivElement
          el.style.transform = "translateY(-3px)"
          el.style.boxShadow = isCompleted
            ? "0 12px 40px rgba(236,184,165,0.25)"
            : "0 12px 40px rgba(228,154,176,0.12)"
        }}
        onMouseLeave={e => {
          const el = e.currentTarget as HTMLDivElement
          el.style.transform = "translateY(0)"
          el.style.boxShadow = "none"
        }}
      >
        {/* Completed glow orb in corner */}
        {isCompleted && (
          <div style={{
            position: "absolute",
            top: "-20px",
            right: "-20px",
            width: "100px",
            height: "100px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(9,188,138,0.2) 0%, transparent 70%)",
            pointerEvents: "none"
          }} />
        )}

        {/* Header */}
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          marginBottom: "12px"
        }}>
          <h3 style={{
            fontFamily: "Syne, sans-serif",
            fontWeight: 700,
            fontSize: "16px",
            color: isCompleted ? "#eccfc3" : "var(--text-primary)",
            lineHeight: 1.3,
            flex: 1,
            marginRight: "12px"
          }}>
            {roadmap.title}
          </h3>
          <span style={{
            display: "inline-flex",
            alignItems: "center",
            padding: "4px 12px",
            borderRadius: "100px",
            fontSize: "11px",
            fontWeight: 600,
            letterSpacing: "0.05em",
            textTransform: "uppercase",
            background: isCompleted
              ? "rgba(9,188,138,0.2)"
              : "rgba(117,221,221,0.1)",
            color: isCompleted ? "#09bc8a" : "#75dddd",
            border: isCompleted
              ? "1px solid rgba(9,188,138,0.35)"
              : "1px solid rgba(117,221,221,0.2)"
          }}>
            {isCompleted ? "✓ Done" : "Active"}
          </span>
        </div>

        {/* Gap score */}
        <p style={{
          fontSize: "13px",
          color: "var(--text-muted)",
          marginBottom: "16px"
        }}>
          Gap score:{" "}
          <span style={{
            color: isCompleted ? "#09bc8a" : "#75dddd",
            fontWeight: 600
          }}>
            {roadmap.gapScore}%
          </span>{" "}
          skills missing
        </p>

        {/* Progress bar */}
        <div style={{ marginBottom: "16px" }}>
          <div style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: "12px",
            color: "var(--text-muted)",
            marginBottom: "8px"
          }}>
            <span>{completedMilestones}/{totalMilestones} weeks</span>
            <span style={{
              color: isCompleted ? "#ecb8a5" : "var(--accent)",
              fontWeight: 600
            }}>
              {percentage}%
            </span>
          </div>
          <div style={{
            background: "rgba(9,188,138,0.15)",
            borderRadius: "100px",
            height: "5px",
            overflow: "hidden"
          }}>
            <div style={{
              background: isCompleted
                ? "linear-gradient(90deg, #09bc8a, #75dddd)"
                : "linear-gradient(90deg, #09bc8a, #0fd49c)",
              height: "100%",
              width: `${percentage}%`,
              borderRadius: "100px",
              transition: "width 0.5s ease",
              boxShadow: "0 0 8px rgba(9,188,138,0.5)"
            }} />
          </div>
        </div>

        {/* Completed banner */}
        {isCompleted && (
          <div style={{
            background: "rgba(9,188,138,0.1)",
            border: "1px solid rgba(9,188,138,0.2)",
            borderRadius: "8px",
            padding: "8px 12px",
            marginBottom: "12px",
            fontSize: "12px",
            color: "#09bc8a",
            fontWeight: 600,
            display: "flex",
            alignItems: "center",
            gap: "6px"
          }}>
            🎉 Roadmap completed — you're job ready!
          </div>
        )}

        {/* Missing skills */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
          {roadmap.missingSkills.slice(0, 3).map((skill, i) => (
            <span key={i} style={{
              fontSize: "12px",
              background: isCompleted
                ? "rgba(9,188,138,0.1)"
                : "rgba(117,221,221,0.08)",
              color: isCompleted ? "#09bc8a" : "#75dddd",
              padding: "3px 10px",
              borderRadius: "100px",
              border: isCompleted
                ? "1px solid rgba(9,188,138,0.2)"
                : "1px solid rgba(117,221,221,0.15)"
            }}>
              {skill}
            </span>
          ))}
          {roadmap.missingSkills.length > 3 && (
            <span style={{
              fontSize: "12px",
              color: "var(--text-muted)",
              padding: "3px 10px",
              borderRadius: "100px",
              background: "rgba(255,255,255,0.04)",
              border: "1px solid var(--border)"
            }}>
              +{roadmap.missingSkills.length - 3} more
            </span>
          )}
        </div>
      </div>
    </Link>
  )
}