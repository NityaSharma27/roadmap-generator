"use client"

import {
  BarChart, Bar, XAxis, YAxis,
  CartesianGrid, Tooltip, ResponsiveContainer
} from "recharts"
import { Milestone } from "@/types/index"

interface ProgressChartProps {
  milestones: Milestone[]
}

export default function ProgressChart({ milestones }: ProgressChartProps) {
  const data = milestones.map((m) => ({
    name: `W${m.weekNumber}`,
    hours: m.hoursNeeded,
    completed: m.isCompleted ? m.hoursNeeded : 0
  }))

  const totalHours = milestones.reduce((sum, m) => sum + m.hoursNeeded, 0)
  const completedHours = milestones.filter(m => m.isCompleted).reduce((sum, m) => sum + m.hoursNeeded, 0)
  const percentage = Math.round((completedHours / totalHours) * 100) || 0

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      {/* Progress bar */}
      <div>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
          <span style={{ fontSize: "13px", color: "var(--text-muted)" }}>Overall Progress</span>
          <span style={{ fontSize: "13px", fontWeight: 700, color: "var(--blue-bright)" }}>
            {percentage}%
          </span>
        </div>
        <div style={{
          background: "rgba(255,255,255,0.06)",
          borderRadius: "100px",
          height: "6px",
          overflow: "hidden"
        }}>
          <div style={{
            background: "linear-gradient(90deg, var(--blue), var(--blue-bright))",
            height: "100%",
            width: `${percentage}%`,
            borderRadius: "100px",
            transition: "width 0.8s ease"
          }} />
        </div>
        <p style={{ fontSize: "12px", color: "var(--text-muted)", marginTop: "6px" }}>
          {completedHours} of {totalHours} hours completed
        </p>
      </div>

      {/* Chart */}
      <ResponsiveContainer width="100%" height={180}>
        <BarChart data={data} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
          <XAxis dataKey="name" tick={{ fill: "#475569", fontSize: 11 }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fill: "#475569", fontSize: 11 }} axisLine={false} tickLine={false} />
          <Tooltip
            cursor={{ fill: "rgba(9,188,138,0.05)" }}
            position={{ y: -80 }}
            contentStyle={{
              background: "#172a3a",
              border: "1px solid rgba(9,188,138,0.4)",
              borderRadius: "10px",
              color: "#e8f8f5",
              fontSize: "12px",
              padding: "10px 14px",
              boxShadow: "0 4px 20px rgba(0,0,0,0.4)"
            }}
            labelStyle={{
              color: "#09bc8a",
              fontWeight: 700,
              marginBottom: "4px",
              display: "block"
            }}
            itemStyle={{
              color: "#75dddd"
            }}
          />
          <Bar
            dataKey="hours"
            fill="rgba(80,137,145,0.3)"
            name="Total Hours"
            radius={[4, 4, 0, 0]}
          />
          <Bar
            dataKey="completed"
            fill="#09bc8a"
            name="Completed"
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}