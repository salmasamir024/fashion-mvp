// src/components/ui/Alert.jsx
import React from "react";

/**
 * Basic Alert component.
 * type: 'success' | 'error' | 'info'
 */
export default function Alert({ type = "info", children, className = "" }) {
  const colors = {
    success: "bg-green-50 border-green-200 text-green-800",
    error: "bg-red-50 border-red-200 text-red-800",
    info: "bg-blue-50 border-blue-200 text-blue-800",
  };
  return (
    <div className={`border p-3 rounded-md ${colors[type] || colors.info} ${className}`}>
      {children}
    </div>
  );
}
