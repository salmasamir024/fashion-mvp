// src/components/orders/OrdersList.jsx
import React from "react";
import { useCart } from "../../context/CartContext";
import OrderCard from "./OrderCard";
import Button from "../ui/Button";
import Card from "../ui/Card";
import { useNavigate } from "react-router-dom";

export default function OrdersList({ maxPreview = 5 }) {
  const { orders, updateOrderStatus, cancelOrder } = useCart();
  const navigate = useNavigate();

  const inProgress = (orders || []).filter(o => o.status !== "completed" && o.status !== "delivered" && o.status !== "cancelled");
  const completed = (orders || []).filter(o => o.status === "completed" || o.status === "delivered");

  const handleUpdate = (id, status) => {
    updateOrderStatus(id, status);
  };

  const handleCancel = (id) => {
    if (confirm("Are you sure you want to cancel this order?")) {
      cancelOrder(id);
    }
  };

  return (
    <Card className="space-y-2">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">Orders</h2>
        <div className="flex gap-2">
          <Button variant="ghost" onClick={() => navigate("/orders")}>View All</Button>
        </div>
      </div>

      <div>
        <h3 className="font-semibold text-sm">In progress</h3>
        <div className="mt-2 space-y-2">
          {inProgress.length ? inProgress.slice(0, maxPreview).map(o => (
            <OrderCard key={o.id} order={o} onUpdateStatus={handleUpdate} onCancel={handleCancel} />
          )) : <p className="text-sm text-[var(--color-text-light)]">No in-progress orders.</p>}
        </div>
      </div>

      <div>
        <h3 className="font-semibold text-sm mt-3">Completed</h3>
        <div className="mt-2 space-y-2">
          {completed.length ? completed.slice(0, maxPreview).map(o => (
            <OrderCard key={o.id} order={o} onUpdateStatus={handleUpdate} onCancel={handleCancel} />
          )) : <p className="text-sm text-[var(--color-text-light)]">No completed orders.</p>}
        </div>
      </div>
    </Card>
  );
}
