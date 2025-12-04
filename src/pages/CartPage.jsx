// src/pages/CartPage.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";

export default function CartPage() {
  const { items, updateQuantity, removeItem, getTotal, clearCart } = useCart();
  const navigate = useNavigate();

  if (!items || items.length === 0) {
    return (
      <div className="p-6 max-w-4xl mx-auto">
        <h2 className="text-2xl font-semibold mb-4">Cart</h2>
        <p className="text-gray-600">Your cart is empty.</p>
        <div className="mt-4 flex gap-2">
          <Button variant="outline" onClick={() => navigate("/store")}>Continue Shopping</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <h2 className="text-2xl font-semibold">Cart</h2>

      <div className="space-y-4">
        {items.map((it) => (
          <Card key={it.id} className="flex gap-4 items-center">
            <img
              src={it.colorImage || it.designDefaultImage}
              alt={`${it.title} - ${it.colorName}`}
              className="w-28 h-28 object-cover rounded-md"
            />

            <div className="flex-1">
              <h3 className="font-semibold">{it.title}</h3>
              <p className="text-sm text-gray-600">{it.colorName} — Size {it.size}</p>
              <p className="mt-2 text-lg font-medium">{it.pricePerUnit.toLocaleString()} EGP</p>
            </div>

            <div className="flex flex-col items-end gap-3">
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  onClick={() => updateQuantity(it.id, Math.max(1, it.quantity - 1))}
                  className="px-2 py-1"
                >
                  -
                </Button>

                {/* Use your Input component (it renders label & input) */}
                <div style={{ width: 76 }}>
                  <Input
                    value={it.quantity}
                    type="number"
                    min={1}
                    onChange={(e) => {
                      const v = Math.max(1, Number(e.target.value || 1));
                      updateQuantity(it.id, v);
                    }}
                    // remove label here to keep compact
                    label={null}
                    className="w-full"
                  />
                </div>

                <Button variant="outline" onClick={() => updateQuantity(it.id, it.quantity + 1)} className="px-2 py-1">
                  +
                </Button>
              </div>

              <div className="flex gap-3 items-center">
                <p className="font-semibold">{(it.pricePerUnit * it.quantity).toLocaleString()} EGP</p>
                <Button variant="ghost" onClick={() => removeItem(it.id)} className="text-red-600">
                  Remove
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-2">
          <Button variant="glass" onClick={() => clearCart()}>Clear Cart</Button>
          <Button variant="primary" onClick={() => navigate("/store")}>Continue Shopping</Button>
        </div>

        <div className="text-right">
          <p className="text-gray-600">Subtotal</p>
          <p className="text-2xl font-bold">{getTotal().toLocaleString()} EGP</p>
          <Button variant="secondary" className="mt-3" onClick={() => navigate("/checkout")}>
            Proceed to Checkout
          </Button>
        </div>
      </div>
    </div>
  );
}
