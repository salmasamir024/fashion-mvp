// src/components/profile/Header.jsx
import React from "react";

export default function Header({ data }) {
  return (
    <div className="border p-4 rounded-xl shadow bg-white">
      <img
        src={data.image}
        alt={data.name}
        className="w-full h-60 object-cover rounded-lg mb-3"
      />

      <h1 className="text-2xl font-bold">{data.name}</h1>

      {data.rating && (
        <p className="text-yellow-600 font-semibold mt-1">
          ⭐ {data.rating.toFixed(1)}
        </p>
      )}
    </div>
  );
}
