// src/components/profile/BrandInfo.jsx
import React from "react";

export default function BrandInfo({ data }) {
  return (
    <div className="border p-4 rounded-xl bg-white shadow space-y-3">
      <h2 className="text-xl font-semibold">Brand Information</h2>

      <p><strong>Category:</strong> {data.category || "General Fashion"}</p>

      {data.collections && (
        <div>
          <strong>Collections:</strong>
          <ul className="list-disc ml-6 mt-1">
            {data.collections.map((c) => (
              <li key={c}>{c}</li>
            ))}
          </ul>
        </div>
      )}

      <p><strong>Shipping:</strong> {data.shipping || "Available"}</p>
    </div>
  );
}
