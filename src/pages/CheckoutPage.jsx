// src/pages/CheckoutPage.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";

export default function CheckoutPage() {
  const { items, getTotal, createOrder } = useCart();
  const [processing, setProcessing] = useState(false);
  const navigate = useNavigate();

  const handleFakePayment = async () => {
    setProcessing(true);

    setTimeout(() => {
      // create order - you could pass customer info from profile
      const order = createOrder({
        customer: {
          // example: pull from localStorage userProfile if available
          ...(JSON.parse(localStorage.getItem("userProfile") || "{}"))
        },
      });

      setProcessing(false);
      alert(`Payment simulated — order placed (demo).\nOrder ID: ${order.id}`);
      navigate("/profile"); // go to profile/orders
    }, 900);
  };

  if (!items || items.length === 0) {
    return (
      <div className="p-6 max-w-4xl mx-auto">
        <h2 className="text-2xl font-semibold">Checkout</h2>
        <p className="text-gray-600 mt-2">No items to checkout.</p>
        <div className="mt-4">
          <Button variant="primary" onClick={() => navigate("/store")}>Continue Shopping</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <h2 className="text-2xl font-semibold">Checkout</h2>

      <Card>
        {/* ... same summary UI ... */}
        <div className="mt-4 flex justify-between items-center">
          <div>
            <p className="text-sm text-gray-600">Payment method (demo)</p>
            <p className="font-semibold">Fake Card •••• 4242</p>
          </div>
          <div className="text-right">
            <p className="text-gray-600">Total</p>
            <p className="text-2xl font-bold">{getTotal().toLocaleString()} EGP</p>
            <Button
              onClick={handleFakePayment}
              disabled={processing}
              loading={processing}
              className="mt-3"
              variant="primary"
            >
              {processing ? "Processing..." : "Pay (Demo)"}
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
