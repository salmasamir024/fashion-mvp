// src/components/ui/Toast.jsx
import React, { useEffect, useState } from "react";

export default function Toast({ message, type = "success", duration = 3000, onClose }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      onClose && onClose();
    }, duration);
    return () => clearTimeout(timer);
  }, [duration, onClose]);

  if (!visible) return null;

  const bgColor = type === "success" ? "bg-green-500" : "bg-red-500";

  return (
    <div className={`${bgColor} text-white px-4 py-2 rounded-md fixed top-4 right-4 shadow-md`}>
      {message}
    </div>
  );
}
