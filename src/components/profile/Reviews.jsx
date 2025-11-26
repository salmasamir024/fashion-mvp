// src/components/profile/Reviews.jsx
import React from "react";

export default function Reviews({ reviews }) {
  return (
    <div className="border p-4 rounded-xl bg-white shadow space-y-3">
      <h2 className="text-xl font-semibold">Reviews</h2>

      {reviews.length === 0 && (
        <p className="text-gray-500">No reviews yet.</p>
      )}

      {reviews.map((r, i) => (
        <div key={i} className="p-2 border rounded-md bg-gray-50">
          <p className="font-semibold">{r.name}</p>
          <p className="text-yellow-600">⭐ {r.rating}</p>
          <p className="text-sm mt-1">{r.comment}</p>
        </div>
      ))}
    </div>
  );
}
