// src/components/orders/OrderCard.jsx
import React from "react";
import Card from "../ui/Card";
import Button from "../ui/Button";
import { useNavigate } from "react-router-dom";

export default function OrderCard({ order, onUpdateStatus, onCancel }) {
  const navigate = useNavigate();

  // labels/colors simple map (يمكن تحجيمها لاحقًا أو ربطها بالـ i18n)
  const STATUS_LABELS = {
    pending: "معلق",
    deposit_paid: "تم دفع مقدم الطلب",
    fabric_delivery_in_progress: "جاري تسليم القماش",
    in_production: "قيد التنفيذ",
    ready_for_fitting: "جاهز للبروفة",
    fitting_booked: "تم حجز البروفة",
    completed: "مكتمل",
    shipment_in_progress: "جاري تسليم الشحنة",
    delivered: "تم تسليم الشحنة",
    cancelled: "ملغي",
  };

  const STATUS_COLOR = {
    pending: "bg-yellow-100 text-yellow-800",
    deposit_paid: "bg-blue-100 text-blue-800",
    fabric_delivery_in_progress: "bg-indigo-100 text-indigo-800",
    in_production: "bg-orange-100 text-orange-800",
    ready_for_fitting: "bg-purple-100 text-purple-800",
    fitting_booked: "bg-purple-200 text-purple-900",
    completed: "bg-green-100 text-green-800",
    shipment_in_progress: "bg-sky-100 text-sky-800",
    delivered: "bg-green-200 text-green-900",
    cancelled: "bg-gray-100 text-gray-700",
  };

  const isTailor = order.serviceType === "tailor";
  const thumbnail = order.items?.[0]?.colorImage || order.items?.[0]?.designDefaultImage || "/default-product.png";

  const shortId = order.id ? order.id.slice(0, 8) : "";

  return (
    <Card className="flex gap-3 items-center">
      <div className="w-20">
        <img src={thumbnail} alt={`order-${shortId}`} className="w-20 h-20 object-cover rounded-md" />
      </div>

      <div className="flex-1">
        <div className="flex justify-between items-start gap-2">
          <div>
            <div className="font-semibold">#{shortId} · {isTailor ? "Order (Tailor)" : "Order (Brand)"}</div>
            <div className="text-sm text-[var(--color-text-light)]">{order.items?.length || 0} items · {new Date(order.date).toLocaleString()}</div>
          </div>

          <div className="text-right">
            <div className={`inline-flex items-center px-2 py-1 rounded text-xs font-semibold ${STATUS_COLOR[order.status] || "bg-gray-100 text-gray-800"}`}>
              {STATUS_LABELS[order.status] || order.status}
            </div>
          </div>
        </div>

        <div className="mt-2 flex items-center gap-3">
          <div className="text-sm text-gray-600">Total:</div>
          <div className="font-semibold">{(order.total || 0).toLocaleString()} EGP</div>
        </div>

        <div className="mt-3 flex gap-2 flex-wrap">
          {/* contextual actions */}
          {order.status === "ready_for_fitting" && (
            <Button variant="primary" onClick={() => onUpdateStatus?.(order.id, "fitting_booked")}>
              Book Fitting
            </Button>
          )}

          {order.status === "pending" && (
            <Button variant="outline" onClick={() => onCancel?.(order.id)}>
              Cancel
            </Button>
          )}

          {order.status === "deposit_paid" && (
            <Button variant="ghost" onClick={() => alert("Contact support (demo)")}>
              Contact Support
            </Button>
          )}

          <Button variant="glass" onClick={() => navigate(`/orders/${order.id}`)}>
            View Details
          </Button>
        </div>
      </div>
    </Card>
  );
}
