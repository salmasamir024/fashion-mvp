// src/components/forms/OccasionSelector.jsx
import React from "react";

export default function OccasionSelector({ options = [], value, onChange }) {
  const defaultOptions = ["Formal", "Evening", "Wedding", "Conference", "Party"];
  const list = options.length ? options : defaultOptions;
  return (
    <div className="flex flex-wrap gap-2">
      {list.map((opt) => (
        <button
          key={opt}
          onClick={() => onChange && onChange(opt)}
          className={`px-3 py-2 border rounded-md ${value === opt ? "bg-gray-100" : ""}`}
        >
          {opt}
        </button>
      ))}
    </div>
  );
}
