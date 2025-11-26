// src/components/services/store/FilterPanel.jsx
import React from "react";

export default function FilterPanel({ filters = {}, onChange }) {
  const categories = ["Dress", "Top", "Pants", "Skirt"];
  const sizes = ["XS", "S", "M", "L", "XL"];
  const colors = ["Red", "Blue", "Green", "Black", "White"];
  const priceRanges = ["<50", "50-100", "100-200", "200+"];

  const handleChange = (key, value) => {
    onChange && onChange({ ...filters, [key]: value });
  };

  return (
    <div className="flex flex-col gap-4 p-4 border rounded-md">
      <div>
        <label className="font-medium mb-1 block">Category</label>
        <select
          value={filters.category || ""}
          onChange={(e) => handleChange("category", e.target.value)}
          className="w-full border rounded-md px-3 py-2"
        >
          <option value="">All</option>
          {categories.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="font-medium mb-1 block">Size</label>
        <select
          value={filters.size || ""}
          onChange={(e) => handleChange("size", e.target.value)}
          className="w-full border rounded-md px-3 py-2"
        >
          <option value="">All</option>
          {sizes.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="font-medium mb-1 block">Color</label>
        <select
          value={filters.color || ""}
          onChange={(e) => handleChange("color", e.target.value)}
          className="w-full border rounded-md px-3 py-2"
        >
          <option value="">All</option>
          {colors.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="font-medium mb-1 block">Price</label>
        <select
          value={filters.price || ""}
          onChange={(e) => handleChange("price", e.target.value)}
          className="w-full border rounded-md px-3 py-2"
        >
          <option value="">All</option>
          {priceRanges.map((p) => (
            <option key={p} value={p}>{p}</option>
          ))}
        </select>
      </div>
    </div>
  );
}
