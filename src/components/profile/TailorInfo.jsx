// src/components/profile/TailorInfo.jsx
import React from "react";

export default function TailorInfo({ data }) {
  return (
    <div className="border p-4 rounded-xl bg-white shadow space-y-3">
      <h2 className="text-xl font-semibold">Tailor Details</h2>

      <p><strong>Experience:</strong> {data.experience} years</p>

      {data.startingPrice && (
        <p>
          <strong>Starting Price:</strong> {data.startingPrice} EGP
        </p>
      )}

      {data.occasions && (
        <div>
          <strong>Specialized In:</strong>
          <div className="flex gap-2 mt-2 flex-wrap">
            {data.occasions.map((o) => (
              <span key={o} className="px-3 py-1 bg-gray-100 rounded-full text-sm">
                {o}
              </span>
            ))}
          </div>
        </div>
      )}

      {data.location?.lat && (
        <p className="text-gray-600">📍 Custom Tailoring – {data.location.lat}, {data.location.lng}</p>
      )}

      {!data.location?.lat && (
        <p className="text-gray-600">📍 Location: {data.location}</p>
      )}
    </div>
  );
}
