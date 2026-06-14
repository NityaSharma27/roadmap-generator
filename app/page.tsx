// app/page.tsx
import Link from "next/link"
import Navbar from "@/components/layout/Navbar"

const stats = [
  { value: "4", label: "Simple Steps to Your Roadmap" },
  { value: "24", label: "Maximum Weeks Planned" },
  { value: "100%", label: "Personalized to Your JD" },
  { value: "Free", label: "Forever to Start" }
]

const features = [
  {
    icon: "📋",
    title: "Paste Any Job Description",
    desc: "Works with any JD from any company — Google, Amazon, startups, agencies. Our AI reads and understands it all in seconds.",
    tag: "Smart Parsing"
  },
  {
    icon: "🎯",
    title: "Instant Skill Gap Analysis",
    desc: "Tell us what you know. We compare it against the JD requirements and give you an exact gap score with missing skills listed.",
    tag: "Gap Scoring"
  },
  {
    icon: "🗓️",
    title: "Week-by-Week Study Plan",
    desc: "Input your available hours. Get a personalized calendar — not generic advice, but a real schedule built around your life.",
    tag: "Personalized"
  },
  {
    icon: "📊",
    title: "Track Your Progress",
    desc: "Mark weeks complete, watch your readiness score climb. Visual charts show exactly how close you are to being job-ready.",
    tag: "Analytics"
  },
  {
    icon: "🔗",
    title: "Curated Real Resources",
    desc: "Every milestone comes with hand-picked, verified resources — official docs, freeCodeCamp, YouTube. No broken links, ever.",
    tag: "Verified Links"
  },
  {
    icon: "⚡",
    title: "Dynamic Reshuffling",
    desc: "Finishing ahead of schedule? The roadmap adjusts automatically. Fall behind? It recalibrates without losing your progress.",
    tag: "Adaptive"
  }
]

const howItWorks = [
  { step: "01", title: "Paste the JD", desc: "Copy any job description and paste it into our AI analyzer" },
  { step: "02", title: "Rate Your Skills", desc: "Tell us what you already know — comma separated, takes 30 seconds" },
  { step: "03", title: "Get Your Roadmap", desc: "AI generates your personalized week-by-week learning plan instantly" },
  { step: "04", title: "Track & Complete", desc: "Follow the plan, mark weeks done, watch your gap score drop to zero" }
]

const skills = [
  "React", "TypeScript", "Node.js", "Python", "AWS", "Docker",
  "PostgreSQL", "Next.js", "System Design", "DSA", "MongoDB", "Git",
  "Machine Learning", "FastAPI", "Kubernetes", "GraphQL", "Redis", "TensorFlow"
]

export default function HomePage() {
  return (
    <div style={{ minHeight: "100vh", position: "relative", background: "var(--darkest)" }}>
      <div className="mesh-bg" />
      <div style={{ position: "relative", zIndex: 1 }}>
        <Navbar />

        {/* ── Hero ── */}
        <section style={{
          maxWidth: "1000px",
          margin: "0 auto",
          padding: "100px 24px 80px",
          textAlign: "center"
        }}>
          <div className="animate-fade-up" style={{ marginBottom: "24px" }}>
            <span className="badge badge-red" style={{ fontSize: "13px", padding: "6px 16px" }}>
              ✦ AI-Powered Career Intelligence
            </span>
          </div>

          <h1 className="animate-fade-up-delay-1" style={{
            fontFamily: "Syne, sans-serif",
            fontSize: "clamp(42px, 7vw, 80px)",
            fontWeight: 800,
            lineHeight: 1.0,
            letterSpacing: "-3px",
            marginBottom: "28px"
          }}>
            <span style={{ color: "var(--text-primary)" }}>Stop Guessing.</span>
            <br />
            <span className="shimmer-text">Start Learning Right.</span>
          </h1>

          <p className="animate-fade-up-delay-2" style={{
            fontSize: "clamp(16px, 2vw, 20px)",
            color: "var(--text-secondary)",
            maxWidth: "600px",
            margin: "0 auto 48px",
            lineHeight: 1.7,
            fontWeight: 300
          }}>
            Paste any job description. Our AI finds your exact skill gaps and
            builds a personalized week-by-week roadmap — so you know
            exactly what to learn, in what order, by when.
          </p>

          <div className="animate-fade-up-delay-3" style={{
            display: "flex",
            gap: "14px",
            justifyContent: "center",
            flexWrap: "wrap",
            marginBottom: "24px"
          }}>
            <Link href="/register">
              <button className="glow-button" style={{ padding: "14px 36px", fontSize: "16px", borderRadius: "12px" }}>
                Generate My Roadmap →
              </button>
            </Link>
            <Link href="/login">
              <button className="ghost-button" style={{ padding: "14px 36px", fontSize: "16px", borderRadius: "12px" }}>
                Login
              </button>
            </Link>
          </div>

          <p className="animate-fade-up-delay-4" style={{
            fontSize: "13px",
            color: "var(--text-muted)"
          }}>
            Free to start · No credit card · Works with any job board
          </p>
        </section>

        {/* ── Scrolling Skills Ticker ── */}
        <div style={{
          overflow: "hidden",
          borderTop: "1px solid var(--border)",
          borderBottom: "1px solid var(--border)",
          padding: "16px 0",
          marginBottom: "80px",
          background: "rgba(37,9,2,0.5)"
        }}>
          <div className="ticker-track" style={{
            display: "flex",
            gap: "32px",
            width: "max-content"
          }}>
            {[...skills, ...skills].map((skill, i) => (
              <span key={i} style={{
                color: "var(--text-muted)",
                fontSize: "14px",
                fontWeight: 500,
                whiteSpace: "nowrap",
                display: "flex",
                alignItems: "center",
                gap: "32px"
              }}>
                {skill}
                <span style={{ color: "var(--accent)", opacity: 0.5 }}>✦</span>
              </span>
            ))}
          </div>
        </div>

        {/* ── Stats ── */}
        <section style={{ maxWidth: "1000px", margin: "0 auto 100px", padding: "0 24px" }}>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "16px"
          }}>
            {stats.map((stat, i) => (
              <div
                key={i}
                className={`glass-card animate-fade-up-delay-${i + 1}`}
                style={{ padding: "32px 24px", textAlign: "center" }}
              >
                <p style={{
                  fontFamily: "Syne, sans-serif",
                  fontSize: "42px",
                  fontWeight: 800,
                  color: "var(--accent)",
                  lineHeight: 1,
                  marginBottom: "8px"
                }}>
                  {stat.value}
                </p>
                <p style={{ fontSize: "14px", color: "var(--text-muted)" }}>
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Features ── */}
        <section style={{ maxWidth: "1100px", margin: "0 auto 100px", padding: "0 24px" }}>
          <div style={{ textAlign: "center", marginBottom: "60px" }}>
            <span className="badge badge-red animate-fade-up" style={{ marginBottom: "16px" }}>
              Everything You Need
            </span>
            <h2 className="animate-fade-up-delay-1" style={{
              fontFamily: "Syne, sans-serif",
              fontSize: "clamp(28px, 4vw, 48px)",
              fontWeight: 800,
              letterSpacing: "-1.5px",
              color: "var(--text-primary)",
              marginTop: "12px"
            }}>
              One tool. Complete clarity.
            </h2>
          </div>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "20px"
          }}>
            {features.map((f, i) => (
              <div
                key={i}
                className={`glass-card animate-fade-up-delay-${(i % 4) + 1}`}
                style={{ padding: "28px" }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "16px" }}>
                  <span style={{ fontSize: "32px" }}>{f.icon}</span>
                  <span className="badge badge-gray" style={{ fontSize: "11px" }}>{f.tag}</span>
                </div>
                <h3 style={{
                  fontFamily: "Syne, sans-serif",
                  fontWeight: 700,
                  fontSize: "17px",
                  color: "var(--text-primary)",
                  marginBottom: "10px"
                }}>
                  {f.title}
                </h3>
                <p style={{ fontSize: "14px", color: "var(--text-secondary)", lineHeight: 1.7 }}>
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ── How it Works ── */}
        <section style={{
          maxWidth: "1000px",
          margin: "0 auto 100px",
          padding: "0 24px"
        }}>
          <div style={{ textAlign: "center", marginBottom: "60px" }}>
            <span className="badge badge-red animate-fade-up" style={{ marginBottom: "16px" }}>
              How It Works
            </span>
            <h2 className="animate-fade-up-delay-1" style={{
              fontFamily: "Syne, sans-serif",
              fontSize: "clamp(28px, 4vw, 48px)",
              fontWeight: 800,
              letterSpacing: "-1.5px",
              color: "var(--text-primary)",
              marginTop: "12px"
            }}>
              Ready in 60 seconds.
            </h2>
          </div>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "20px",
            position: "relative"
          }}>
            {howItWorks.map((step, i) => (
              <div
                key={i}
                className={`glass-card animate-fade-up-delay-${i + 1}`}
                style={{ padding: "28px", position: "relative", overflow: "hidden" }}
              >
                <div style={{
                  position: "absolute",
                  top: "-10px",
                  right: "16px",
                  fontFamily: "Syne, sans-serif",
                  fontSize: "64px",
                  fontWeight: 800,
                  color: "rgba(173,40,49,0.08)",
                  lineHeight: 1,
                  userSelect: "none"
                }}>
                  {step.step}
                </div>
                <span style={{
                  display: "inline-block",
                  fontFamily: "Syne, sans-serif",
                  fontWeight: 800,
                  fontSize: "13px",
                  color: "var(--accent)",
                  marginBottom: "12px",
                  letterSpacing: "0.05em"
                }}>
                  STEP {step.step}
                </span>
                <h3 style={{
                  fontFamily: "Syne, sans-serif",
                  fontWeight: 700,
                  fontSize: "18px",
                  color: "var(--text-primary)",
                  marginBottom: "10px"
                }}>
                  {step.title}
                </h3>
                <p style={{ fontSize: "14px", color: "var(--text-secondary)", lineHeight: 1.7 }}>
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ── CTA Banner ── */}
        <section style={{ maxWidth: "900px", margin: "0 auto 100px", padding: "0 24px" }}>
          <div style={{
            background: "linear-gradient(135deg, var(--dark) 0%, var(--mid) 100%)",
            border: "1px solid var(--border-hover)",
            borderRadius: "24px",
            padding: "64px 40px",
            textAlign: "center",
            position: "relative",
            overflow: "hidden"
          }}>
            {/* Background decoration */}
            <div style={{
              position: "absolute",
              top: "-50px", right: "-50px",
              width: "200px", height: "200px",
              borderRadius: "50%",
              background: "radial-gradient(circle, rgba(173,40,49,0.3) 0%, transparent 70%)"
            }} />
            <div style={{
              position: "absolute",
              bottom: "-50px", left: "-50px",
              width: "200px", height: "200px",
              borderRadius: "50%",
              background: "radial-gradient(circle, rgba(128,14,19,0.3) 0%, transparent 70%)"
            }} />

            <h2 style={{
              fontFamily: "Syne, sans-serif",
              fontSize: "clamp(26px, 4vw, 44px)",
              fontWeight: 800,
              letterSpacing: "-1.5px",
              color: "var(--text-primary)",
              marginBottom: "16px",
              position: "relative"
            }}>
              Your dream job is waiting.
              <br />Are you ready?
            </h2>
            <p style={{
              color: "var(--text-secondary)",
              fontSize: "16px",
              marginBottom: "36px",
              position: "relative"
            }}>
              Join thousands of students who stopped guessing and started learning with purpose.
            </p>
            <Link href="/register" style={{ position: "relative" }}>
              <button className="glow-button" style={{
                padding: "16px 48px",
                fontSize: "17px",
                borderRadius: "12px"
              }}>
                Get Started — It's Free →
              </button>
            </Link>
          </div>
        </section>

        {/* ── Footer ── */}
        <footer style={{
          borderTop: "1px solid var(--border)",
          padding: "32px 24px",
          textAlign: "center"
        }}>
          <p style={{ color: "var(--text-muted)", fontSize: "13px" }}>
            Built with ❤️ for students · RoadmapAI © 2026
          </p>
        </footer>
      </div>
    </div>
  )
}