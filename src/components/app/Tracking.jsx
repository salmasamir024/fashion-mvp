// src/components/app/Tracking.jsx
import React from "react";

export default function Tracking({ status }) {
  const steps = ["New", "Processing", "Shipped", "Delivered"];
  const currentIndex = steps.findIndex(s => s === status);

  return (
    <div className="flex items-center gap-4">
      {steps.map((step, idx) => (
        <div key={step} className="flex items-center gap-2">
          <div className={`w-6 h-6 rounded-full flex items-center justify-center border ${idx <= currentIndex ? "bg-blue-600 border-blue-600 text-white" : "bg-white border-gray-300 text-gray-300"}`}>
            {idx + 1}
          </div>
          <span className={`${idx <= currentIndex ? "text-blue-600" : "text-gray-400"} text-sm`}>{step}</span>
          {idx < steps.length - 1 && <div className={`flex-1 h-0.5 ${idx < currentIndex ? "bg-blue-600" : "bg-gray-300"}`} />}
        </div>
      ))}
    </div>
  );
}
