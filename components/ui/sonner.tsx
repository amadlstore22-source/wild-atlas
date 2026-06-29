"use client"

import { Toaster as Sonner, type ToasterProps } from "sonner"

const Toaster = ({ ...props }: ToasterProps) => (
  <Sonner
    theme="light"
    className="toaster group"
    style={
      {
        "--normal-bg": "#FFFFFF",
        "--normal-text": "#111111",
        "--normal-border": "#D8C9AC",
        "--success-bg": "#F0F5EC",
        "--success-text": "#4B5D3A",
        "--success-border": "#4B5D3A",
        "--error-bg": "#FEF2F2",
        "--error-text": "#DC2626",
        "--error-border": "#DC2626",
        "--border-radius": "0.75rem",
        "--font-family": "var(--font-sans, system-ui, sans-serif)",
      } as React.CSSProperties
    }
    {...props}
  />
)

export { Toaster }
