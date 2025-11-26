// src/components/ui/Select.jsx
import React from "react";

/**
 * Select component
 * options: [{ value, label }]
 */
export default function Select({ options = [], value, onChange, placeholder = "Select...", name, className = "", ...rest }) {
  return (
    <select
      name={name}
      value={value}
      onChange={onChange}
      className={`w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300 ${className}`}
      {...rest}
    >
      <option value="">{placeholder}</option>
      {options.map((opt) => (
        <option key={opt.value ?? opt} value={opt.value ?? opt}>
          {opt.label ?? opt}
        </option>
      ))}
    </select>
  );
}
