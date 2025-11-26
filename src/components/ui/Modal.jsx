// src/components/ui/Modal.jsx
import React, { useEffect } from "react";
import ReactDOM from "react-dom";

export default function Modal({ isOpen, onClose, title, children }) {
  useEffect(() => {
    const handler = (e) => {
      if (e.key === "Escape") onClose && onClose();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [onClose]);

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={() => onClose && onClose()} />
      <div className="relative bg-white rounded-md p-6 z-10 max-w-lg w-full">
        {title && <h3 className="text-lg font-semibold mb-4">{title}</h3>}
        <div>{children}</div>
        <div className="mt-4 text-right">
          <button onClick={() => onClose && onClose()} className="px-3 py-2 rounded-md border">Close</button>
        </div>
      </div>
    </div>,
    document.body
  );
}
