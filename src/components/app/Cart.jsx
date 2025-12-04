// src/components/app/Cart.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";

export default function CartIcon({ className = "" }) {
  const { totalItems } = useCart();
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate("/cart")}
      className={`relative inline-flex items-center gap-2 px-3 py-1 rounded-md ${className}`}
      aria-label="Open cart"
    >
      {/* simple cart svg */}
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path d="M3 3h2l1.4 8h11.2l1.4-6H6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="10" cy="20" r="1" fill="currentColor"/>
        <circle cx="18" cy="20" r="1" fill="currentColor"/>
      </svg>

      {totalItems > 0 && (
        <span className="absolute -top-2 -right-2 inline-flex items-center justify-center px-2 py-1 text-xs font-semibold rounded-full bg-red-600 text-white">
          {totalItems}
        </span>
      )}
    </button>
  );
}
