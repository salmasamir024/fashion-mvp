// src/components/ui/Tabs.jsx
import React from "react";

/**
 * Simple Tabs component
 * tabs: [{ key, label }]
 * activeKey, onChange
 */
export function Tabs({ tabs = [], activeKey, onChange }) {
  return (
    <div className="flex gap-2 border-b pb-2">
      {tabs.map((t) => (
        <button
          key={t.key}
          onClick={() => onChange && onChange(t.key)}
          className={`px-3 py-2 rounded-t-md ${activeKey === t.key ? "bg-white" : "bg-transparent"}`}
        >
          {t.label}
        </button>
      ))}
    </div>
  );
}
