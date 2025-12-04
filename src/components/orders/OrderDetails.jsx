// src/pages/OrderDetails.jsx
import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import Card from "../ui/Card";
import Button from "../ui/Button";

export default function OrderDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { orders, updateOrderStatus, cancelOrder } = useCart();

  const order = (orders || []).find(o => o.id === id);

  if (!order) {
    return (
      <div className="p-6 max-w-4xl mx-auto">
        <h2 className="text-2xl font-semibold">Order</h2>
        <p className="text-gray-600 mt-2">Order not found.</p>
        <div className="mt-4">
          <Button variant="outline" onClick={() => navigate("/profile")}>Back to Profile</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Order #{order.id.slice(0,8)}</h2>
        <div>
          <Button variant="ghost" onClick={() => navigate(-1)}>Back</Button>
        </div>
      </div>

      <Card>
        <div className="space-y-3">
          <div className="flex justify-between">
            <div><strong>Date:</strong> {new Date(order.date).toLocaleString()}</div>
            <div><strong>Total:</strong> {(order.total || 0).toLocaleString()} EGP</div>
          </div>

          <div>
            <h3 className="font-semibold">Items</h3>
            <div className="mt-2 space-y-2">
              {order.items.map(it => (
                <div key={it.id} className="flex items-center gap-3">
                  <img src={it.colorImage || it.designDefaultImage} alt="" className="w-16 h-16 object-cover rounded" />
                  <div className="flex-1">
                    <div className="font-semibold">{it.title}</div>
                    <div className="text-sm text-gray-600">{it.colorName} • Size {it.size} • Qty: {it.quantity}</div>
                  </div>
                  <div className="font-semibold">{(it.pricePerUnit * it.quantity).toLocaleString()} EGP</div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex gap-2">
            {order.status !== "cancelled" && (
              <Button variant="outline" onClick={() => cancelOrder(order.id)}>Cancel Order</Button>
            )}
            {order.status === "ready_for_fitting" && (
              <Button variant="primary" onClick={() => updateOrderStatus(order.id, "fitting_booked")}>Book Fitting</Button>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
}
