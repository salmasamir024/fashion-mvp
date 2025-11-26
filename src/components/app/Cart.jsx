// src/components/app/Cart.jsx
import React from "react";
import Button from "../ui/Button";

export default function Cart({ items = [], onCheckout }) {
  const total = items.reduce((acc, i) => acc + i.price * i.quantity, 0);

  return (
    <div className="p-4 border rounded-md flex flex-col gap-4">
      <h3 className="font-semibold text-lg">Cart</h3>
      {items.length === 0 ? (
        <div className="text-gray-500">Your cart is empty.</div>
      ) : (
        <>
          <ul className="flex flex-col gap-2">
            {items.map((item, idx) => (
              <li key={idx} className="flex justify-between">
                <span>{item.name} x {item.quantity}</span>
                <span>${item.price * item.quantity}</span>
              </li>
            ))}
          </ul>
          <div className="flex justify-between font-semibold">
            <span>Total:</span>
            <span>${total}</span>
          </div>
          <Button onClick={onCheckout} variant="primary">Checkout</Button>
        </>
      )}
    </div>
  );
}
