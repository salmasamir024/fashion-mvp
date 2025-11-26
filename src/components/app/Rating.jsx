// src/components/app/Rating.jsx
import React from "react";

export default function Rating({ rating = 0, review = "" }) {
  return (
    <div className="flex flex-col gap-1">
      <div className="flex gap-1">
        {[1,2,3,4,5].map((i) => (
          <span key={i} className={`${i <= rating ? "text-yellow-400" : "text-gray-300"}`}>★</span>
        ))}
      </div>
      {review && <p className="text-sm text-gray-600">{review}</p>}
    </div>
  );
}
