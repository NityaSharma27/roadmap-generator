// components/ui/Button.tsx
"use client"

interface ButtonProps {
  children: React.ReactNode
  onClick?: () => void
  type?: "button" | "submit" | "reset"
  variant?: "primary" | "secondary" | "danger"
  isLoading?: boolean
  disabled?: boolean
  className?: string
}

export default function Button({
  children,
  onClick,
  type = "button",
  variant = "primary",
  isLoading = false,
  disabled = false,
  className = ""
}: ButtonProps) {
  const base: React.CSSProperties = {
    width: "100%",
    padding: "14px 24px",
    borderRadius: "10px",
    fontSize: "15px",
    fontWeight: 600,
    fontFamily: "DM Sans, sans-serif",
    cursor: disabled || isLoading ? "not-allowed" : "pointer",
    opacity: disabled || isLoading ? 0.5 : 1,
    transition: "all 0.25s ease",
    border: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    letterSpacing: "0.02em"
  }

  const variants: Record<string, React.CSSProperties> = {
    primary: {
      background: "linear-gradient(135deg, #09bc8a, #007a5e)",
      color: "#fff",
      boxShadow: "0 4px 20px rgba(9,188,138,0.4)"
    },
    secondary: {
      background: "transparent",
      color: "var(--text-secondary)",
      border: "1px solid var(--border)"
    },
    danger: {
      background: "linear-gradient(135deg, #c0392b, #922b21)",
      color: "#fff"
    }
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || isLoading}
      className={className}
      style={{ ...base, ...variants[variant] }}
      onMouseEnter={e => {
        if (disabled || isLoading) return
        if (variant === "primary") {
          (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-2px)"
            ; (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 8px 30px rgba(9,188,138,0.6)"
        }
        if (variant === "secondary") {
          (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--accent)"
            ; (e.currentTarget as HTMLButtonElement).style.color = "var(--text-primary)"
            ; (e.currentTarget as HTMLButtonElement).style.background = "rgba(9,188,138,0.08)"
        }
      }}
      onMouseLeave={e => {
        if (variant === "primary") {
          (e.currentTarget as HTMLButtonElement).style.transform = "translateY(0)"
            ; (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 4px 20px rgba(9,188,138,0.4)"
        }
        if (variant === "secondary") {
          (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--border)"
            ; (e.currentTarget as HTMLButtonElement).style.color = "var(--text-secondary)"
            ; (e.currentTarget as HTMLButtonElement).style.background = "transparent"
        }
      }}
    >
      {isLoading ? (
        <>
          <span style={{
            width: "16px", height: "16px",
            border: "2px solid rgba(255,255,255,0.3)",
            borderTop: "2px solid white",
            borderRadius: "50%",
            animation: "spin 1s linear infinite",
            display: "inline-block"
          }} />
          Loading...
        </>
      ) : children}
    </button>
  )
}