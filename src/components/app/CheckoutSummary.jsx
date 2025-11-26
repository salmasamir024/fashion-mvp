// src/components/app/CheckoutSummary.jsx
import React from "react";

export default function CheckoutSummary({ address, paymentMethod = "COD", total }) {
  return (
    <div className="p-4 border rounded-md flex flex-col gap-2">
      <h3 className="font-semibold text-lg">Checkout Summary</h3>
      <div><span className="font-medium">Address:</span> {address}</div>
      <div><span className="font-medium">Payment Method:</span> {paymentMethod}</div>
      <div className="flex justify-between font-semibold mt-2">
        <span>Total:</span>
        <span>${total}</span>
      </div>
    </div>
  );
}
