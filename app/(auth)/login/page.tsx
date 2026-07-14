"use client"

import { useState } from "react"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Input from "@/components/ui/Input"
import Button from "@/components/ui/Button"

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  async function handleLogin() {
    setIsLoading(true)
    setError("")
    try {
      const result = await signIn("credentials", {
        email, password, redirect: false
      })
      if (result?.error) {
        setError("Invalid email or password")
        return
      }
      router.push("/dashboard")
    } catch {
      setError("Something went wrong. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "24px",
      position: "relative"
    }}>
      <div className="mesh-bg" />

      <div className="glass-card animate-fade-up" style={{
        width: "100%",
        maxWidth: "420px",
        padding: "44px 40px",
        position: "relative",
        zIndex: 1,
        background: "rgba(45,21,40,0.85)",
        border: "1px solid rgba(228,154,176,0.2)"
      }}>
        {/* Logo */}
        <Link href="/" style={{ textDecoration: "none" }}>
          <span style={{
            fontFamily: "Syne, sans-serif",
            fontWeight: 800,
            fontSize: "18px",
            color: "var(--text-primary)"
          }}>
            Roadmap<span style={{ color: "var(--blue)" }}>AI</span>
          </span>
        </Link>

        <h1 style={{
          fontFamily: "Syne, sans-serif",
          fontSize: "26px",
          fontWeight: 700,
          margin: "24px 0 6px",
          color: "var(--text-primary)"
        }}>
          Welcome back
        </h1>
        <p style={{
          color: "var(--text-muted)",
          fontSize: "14px",
          marginBottom: "32px"
        }}>
          Continue your learning journey
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <Input
            label="Email"
            type="email"
            value={email}
            onChange={setEmail}
            placeholder="you@example.com"
            required
          />
          <Input
            label="Password"
            type="password"
            value={password}
            onChange={setPassword}
            placeholder="Your password"
            required
          />

          {error && (
            <div style={{
              background: "rgba(239,68,68,0.1)",
              border: "1px solid rgba(239,68,68,0.2)",
              borderRadius: "8px",
              padding: "10px 14px",
              color: "#f87171",
              fontSize: "13px"
            }}>
              {error}
            </div>
          )}

          <Button
            onClick={handleLogin}
            isLoading={isLoading}
            className="w-full py-3 mt-2"
          >
            Login →
          </Button>
        </div>

        <p style={{
          textAlign: "center",
          fontSize: "13px",
          color: "var(--text-muted)",
          marginTop: "24px"
        }}>
          No account?{" "}
          <Link href="/register" style={{ color: "var(--blue-bright)", textDecoration: "none" }}>
            Register here
          </Link>
        </p>
      </div>
    </div>
  )
}