// components/ui/Input.tsx
"use client"

interface InputProps {
  label: string
  type?: string
  value: string
  onChange: (value: string) => void
  placeholder?: string
  required?: boolean
  error?: string
}

export default function Input({
  label,
  type = "text",
  value,
  onChange,
  placeholder,
  required,
  error
}: InputProps) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
      <label style={{
        color: "var(--text-secondary)",
        fontSize: "13px",
        fontWeight: 600,
        letterSpacing: "0.03em"
      }}>
        {label} {required && <span style={{ color: "var(--accent)" }}>*</span>}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
        style={{
          background: "rgba(255,255,255,0.06)",
          border: "1px solid rgba(228,154,176,0.25)",
          borderRadius: "10px",
          color: "var(--text-primary)",
          fontFamily: "DM Sans, sans-serif",
          fontSize: "15px",
          padding: "13px 16px",
          outline: "none",
          width: "100%",
          transition: "all 0.2s ease"
        }}
        onFocus={e => {
          e.target.style.borderColor = "var(--accent)"
          e.target.style.background = "rgba(228,154,176,0.08)"
          e.target.style.boxShadow = "0 0 0 3px rgba(228,154,176,0.1)"
        }}
        onBlur={e => {
          e.target.style.borderColor = "rgba(228,154,176,0.25)"
          e.target.style.background = "rgba(255,255,255,0.06)"
          e.target.style.boxShadow = "none"
        }}
      />
      {error && (
        <p style={{ color: "#f87171", fontSize: "12px" }}>{error}</p>
      )}
    </div>
  )
}