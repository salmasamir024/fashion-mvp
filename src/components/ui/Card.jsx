// src/components/ui/Card.jsx
import React from "react";

export default function Card({ children, className = "", ...props }) {
  return (
    <div
      className={`bg-[var(--color-card)] backdrop-blur-card shadow-card p-5 rounded-lg border border-white/20 transition-colors ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
