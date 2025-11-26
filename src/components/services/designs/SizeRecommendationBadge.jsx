// src/components/services/designs/SizeRecommendationBadge.jsx
import React from "react";

export function calculateSize(height, weight, hips, bust) {
  const w = Number(weight);
  const h = Number(height);

  if (w < 55 && h < 160) return "S";
  if (w >= 55 && w < 70) return "M";
  if (w >= 70 && w < 85) return "L";
  if (w >= 85) return "XL";
  return "M";
}

export default function SizeRecommendationBadge({ height, weight, hips, chest }) {
  const size = calculateSize(height, weight, hips, chest);

  return (
    <div className="inline-block bg-blue-100 text-blue-700 px-3 py-1 rounded-md text-sm">
      المقاس الأنسب لك هو <strong>{size}</strong>
    </div>
  );
}
