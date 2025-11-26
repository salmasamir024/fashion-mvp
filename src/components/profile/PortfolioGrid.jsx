// src/components/profile/PortfolioGrid.jsx
import React from "react";

export default function PortfolioGrid({ items }) {
  return (
    <div className="border p-4 rounded-xl bg-white shadow">
      <h2 className="text-xl font-semibold mb-3">Portfolio</h2>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {items.map((img, i) => (
          <img
            key={i}
            src={img}
            alt="work"
            className="rounded-lg object-cover h-36 w-full"
          />
        ))}
      </div>
    </div>
  );
}
