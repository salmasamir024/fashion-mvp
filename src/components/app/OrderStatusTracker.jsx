// src/components/app/OrderStatusTracker.jsx
import React from "react";

const steps = [
  { id: "new", label: "New" },
  { id: "processing", label: "Processing" },
  { id: "fitting", label: "Fitting" },
  { id: "completed", label: "Completed" },
  { id: "delivered", label: "Delivered" },
];

export default function OrderStatusTracker({ currentStep = "new" }) {
  return (
    <div className="flex items-center gap-4">
      {steps.map((step, idx) => {
        const active = steps.findIndex(s => s.id === currentStep) >= idx;
        return (
          <div key={step.id} className="flex items-center gap-2">
            <div className={`w-6 h-6 rounded-full border flex items-center justify-center ${active ? "bg-blue-600 border-blue-600 text-white" : "bg-white border-gray-300 text-gray-300"}`}>
              {idx + 1}
            </div>
            <span className={`${active ? "text-blue-600" : "text-gray-400"} text-sm`}>{step.label}</span>
            {idx < steps.length - 1 && <div className={`flex-1 h-0.5 ${active ? "bg-blue-600" : "bg-gray-300"}`} />}
          </div>
        );
      })}
    </div>
  );
}
