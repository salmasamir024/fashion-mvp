import React from "react";

const defaultTones = [
  { id: "tone1", name: "Very light", color: "#fff1e6" },
  { id: "tone2", name: "Light", color: "#ffe0bd" },
  { id: "tone3", name: "Medium", color: "#ffcd94" },
  { id: "tone4", name: "Olive", color: "#e0ac69" },
  { id: "tone5", name: "Brown", color: "#c68642" },
  { id: "tone6", name: "Dark", color: "#8d5524" },
];

export default function SkinToneSelector({ tones = defaultTones, value, onChange }) {
  return (
    <div className="flex gap-2">
      {tones.map((t) => (
        <button
          key={t.id}
          type="button"
          onClick={() => onChange && onChange(t.id)}
          className={`p-2 rounded-full border ${value === t.id ? "ring-2 ring-blue-500" : ""}`}
          aria-pressed={value === t.id}
          title={t.name} // هنا يظهر اسم الدرجة عند hover
        >
          <span className="sr-only">{t.name}</span>
          <div
            style={{
              width: 28,
              height: 28,
              borderRadius: "9999px",
              background: t.color,
              border: "1px solid #ccc",
            }}
          />
        </button>
      ))}
    </div>
  );
}
