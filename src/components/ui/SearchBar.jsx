// src/components/ui/SearchBar.jsx
import React, { useState } from "react";

export default function SearchBar({ placeholder = "Search services, brands, tailors...", onSearch }) {
  const [q, setQ] = useState("");
  const submit = (e) => {
    e.preventDefault();
    if (onSearch) onSearch(q);
  };

  return (
    <form onSubmit={submit} className="flex items-center gap-2 w-full">
      <input
        type="search"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder={placeholder}
        className="flex-1 px-3 py-2 border rounded-l-md focus:outline-none"
      />
      <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-r-md">Search</button>
    </form>
  );
}
