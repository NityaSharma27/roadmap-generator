// components/layout/Navbar.tsx
"use client"

import { signOut, useSession } from "next-auth/react"
import Link from "next/link"

export default function Navbar() {
  const { data: session } = useSession()

  return (
    <nav style={{
  borderBottom: "1px solid rgba(228,154,176,0.15)",
  background: "rgba(26,13,24,0.9)",
  backdropFilter: "blur(16px)",
  position: "sticky",
  top: 0,
  zIndex: 50
}}>
      <div style={{
        maxWidth: "1100px",
        margin: "0 auto",
        padding: "0 24px",
        height: "64px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between"
      }}>
        <Link href="/" style={{ textDecoration: "none" }}>
          <span style={{
            fontFamily: "Syne, sans-serif",
            fontWeight: 800,
            fontSize: "20px",
            color: "var(--text-primary)",
            letterSpacing: "-0.5px"
          }}>
            Roadmap<span style={{ color: "var(--accent)" }}>AI</span>
          </span>
        </Link>

        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          {session ? (
            <>
              <span style={{ color: "var(--text-muted)", fontSize: "13px" }}>
                {session.user?.name}
              </span>
              <Link href="/dashboard">
                <button className="ghost-button" style={{ padding: "8px 16px", fontSize: "13px" }}>
                  Dashboard
                </button>
              </Link>
              <button
                onClick={() => signOut({ callbackUrl: "/" })}
                className="ghost-button"
                style={{ padding: "8px 16px", fontSize: "13px", color: "#e87880", borderColor: "rgba(173,40,49,0.3)" }}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link href="/login">
                <button className="ghost-button" style={{ padding: "8px 16px", fontSize: "13px" }}>Login</button>
              </Link>
              <Link href="/register">
                <button className="glow-button" style={{ padding: "8px 18px", fontSize: "13px" }}>Get Started</button>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}