import React from "react";

export default function Input({ label, ...props }) {
  return (
    <div className="flex flex-col gap-1">
      {label && <label className="text-sm text-var(--color-text-light)">{label}</label>}
      <input
        {...props}
        className="p-3 rounded-lg border border-gray-300 bg-var(--color-card) text-var(--color-text) shadow-sm focus:outline-var(--color-primary) transition-colors"
      />
    </div>
  );
}
