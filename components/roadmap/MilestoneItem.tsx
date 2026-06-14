// components/roadmap/MilestoneItem.tsx
"use client"

import { useState } from "react"
import { Milestone } from "@/types/index"

interface MilestoneItemProps {
  milestone: Milestone
  onToggle: (milestoneId: string, isCompleted: boolean) => void
}

export default function MilestoneItem({ milestone, onToggle }: MilestoneItemProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  const resourceColors: Record<string, { bg: string; color: string }> = {
    video: { bg: "rgba(239,68,68,0.1)", color: "#f87171" },
    docs: { bg: "rgba(59,130,246,0.1)", color: "#60a5fa" },
    article: { bg: "rgba(34,197,94,0.1)", color: "#4ade80" },
    course: { bg: "rgba(168,85,247,0.1)", color: "#c084fc" }
  }

  return (
    <div style={{
      background: "var(--navy-card)",
      border: `1px solid ${milestone.isCompleted ? "rgba(34,197,94,0.2)" : "var(--border)"}`,
      borderRadius: "12px",
      padding: "20px",
      transition: "all 0.2s ease",
      opacity: milestone.isCompleted ? 0.75 : 1
    }}>
      <div style={{ display: "flex", gap: "14px", alignItems: "flex-start" }}>
        <input
          type="checkbox"
          checked={milestone.isCompleted}
          onChange={(e) => onToggle(milestone.id, e.target.checked)}
          style={{
            width: "18px", height: "18px",
            accentColor: "var(--blue)",
            cursor: "pointer",
            marginTop: "2px",
            flexShrink: 0
          }}
        />

        <div style={{ flex: 1 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            <div>
              <span style={{
                fontSize: "11px",
                fontWeight: 600,
                color: "var(--blue-bright)",
                background: "rgba(59,130,246,0.1)",
                padding: "2px 10px",
                borderRadius: "100px",
                border: "1px solid rgba(59,130,246,0.2)"
              }}>
                Week {milestone.weekNumber}
              </span>
              <h3 style={{
                fontFamily: "Syne, sans-serif",
                fontWeight: 700,
                fontSize: "15px",
                color: "var(--text-primary)",
                marginTop: "8px",
                textDecoration: milestone.isCompleted ? "line-through" : "none"
              }}>
                {milestone.skill}
              </h3>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <span style={{ fontSize: "12px", color: "var(--text-muted)" }}>
                {milestone.hoursNeeded}h
              </span>
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                style={{
                  background: "none",
                  border: "none",
                  color: "var(--text-muted)",
                  fontSize: "12px",
                  cursor: "pointer",
                  padding: "4px 8px",
                  borderRadius: "6px",
                  transition: "all 0.2s"
                }}
              >
                {isExpanded ? "▲ Hide" : "▼ Show"}
              </button>
            </div>
          </div>

          {/* Topics */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginTop: "10px" }}>
            {milestone.topics.map((topic, i) => (
              <span key={i} style={{
                fontSize: "12px",
                background: "rgba(255,255,255,0.05)",
                color: "var(--text-secondary)",
                padding: "3px 10px",
                borderRadius: "100px",
                border: "1px solid var(--border)"
              }}>
                {topic}
              </span>
            ))}
          </div>

          {/* Resources */}
          {isExpanded && (
            <div style={{ marginTop: "16px" }}>
              <p style={{ fontSize: "12px", fontWeight: 600, color: "var(--text-muted)", marginBottom: "8px" }}>
                Resources
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                {milestone.resources.map((resource, i) => {
                  const colors = resourceColors[resource.type] || { bg: "rgba(255,255,255,0.05)", color: "var(--text-secondary)" }
                  return (
                    <a
                      key={i}
                      href={resource.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                        padding: "8px 12px",
                        borderRadius: "8px",
                        background: "rgba(255,255,255,0.03)",
                        border: "1px solid var(--border)",
                        textDecoration: "none",
                        transition: "all 0.2s"
                      }}
                    >
                      <span style={{
                        fontSize: "11px",
                        fontWeight: 600,
                        padding: "2px 8px",
                        borderRadius: "100px",
                        background: colors.bg,
                        color: colors.color
                      }}>
                        {resource.type}
                      </span>
                      <span style={{ fontSize: "13px", color: "var(--blue-bright)" }}>
                        {resource.title}
                      </span>
                    </a>
                  )
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}