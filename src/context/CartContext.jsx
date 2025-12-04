// src/context/CartContext.jsx
import React, { createContext, useContext, useEffect, useRef, useState } from "react";

const CartContext = createContext();

const LOCAL_KEY = "styling_consult_cart_v1";
const ORDERS_KEY = "styling_consult_orders_v1";

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);
  const [orders, setOrders] = useState([]);

  // refs to skip initial persist write
  const didLoadCart = useRef(false);
  const didLoadOrders = useRef(false);

  // ---------- LOAD ON MOUNT ----------
  useEffect(() => {
    try {
      const raw = localStorage.getItem(LOCAL_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        setItems(parsed);
        console.info("[CartContext] Loaded cart from localStorage:", parsed);
      } else {
        console.info("[CartContext] No cart in localStorage");
      }
    } catch (e) {
      console.error("[CartContext] Failed to load cart from localStorage", e);
    } finally {
      didLoadCart.current = true; // mark loaded
    }
  }, []);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(ORDERS_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        setOrders(parsed);
        console.info("[CartContext] Loaded orders from localStorage:", parsed);
      } else {
        console.info("[CartContext] No orders in localStorage");
      }
    } catch (e) {
      console.error("[CartContext] Failed to load orders from localStorage", e);
    } finally {
      didLoadOrders.current = true; // mark loaded
    }
  }, []);

  // ---------- PERSIST (skip initial mount write) ----------
  useEffect(() => {
    // don't write until we've loaded initial value
    if (!didLoadCart.current) {
      // first run after mount — skip persisting to avoid overwriting storage
      console.debug("[CartContext] Skipping initial cart persist");
      return;
    }
    try {
      localStorage.setItem(LOCAL_KEY, JSON.stringify(items));
      console.info("[CartContext] Persisted cart to localStorage:", items);
    } catch (e) {
      console.error("[CartContext] Failed to save cart to localStorage", e);
    }
  }, [items]);

  useEffect(() => {
    if (!didLoadOrders.current) {
      console.debug("[CartContext] Skipping initial orders persist");
      return;
    }
    try {
      localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
      console.info("[CartContext] Persisted orders to localStorage:", orders);
    } catch (e) {
      console.error("[CartContext] Failed to save orders to localStorage", e);
    }
  }, [orders]);

  // ---------- CART HELPERS ----------
  const findIndex = ({ designId, colorName, size }) =>
    items.findIndex(
      (it) =>
        it.designId === designId &&
        it.colorName === colorName &&
        it.size === size
    );

  function addItem({
    design,
    color,
    size,
    quantity = 1,
    pricePerUnit,
    tailorId = null,
    isTailor = false,
  }) {
    if (!design || !color || !size) {
      console.warn("addItem missing data", { design, color, size });
      return;
    }

    const idx = findIndex({
      designId: design.id,
      colorName: color.name,
      size,
    });

    setItems((prev) => {
      const copy = [...prev];
      if (idx >= 0) {
        copy[idx] = {
          ...copy[idx],
          quantity: copy[idx].quantity + quantity,
        };
      } else {
        copy.push({
          id: `${design.id}__${color.name}__${size}__${Date.now()}`,
          designId: design.id,
          title: design.title,
          designDefaultImage: design.defaultImage,
          colorName: color.name,
          colorHex: color.hex,
          colorImage: color.image || null,
          size,
          quantity,
          pricePerUnit,
          tailorId,
          isTailor: Boolean(isTailor),
          stock:
            color.availableSizes?.find((s) => s.size === size)?.stock ?? null,
        });
      }
      return copy;
    });
  }

  function updateQuantity(itemId, newQuantity) {
    setItems((prev) =>
      prev.map((it) => (it.id === itemId ? { ...it, quantity: newQuantity } : it))
    );
  }

  function removeItem(itemId) {
    setItems((prev) => prev.filter((it) => it.id !== itemId));
  }

  function clearCart() {
    setItems([]);
    try {
      localStorage.removeItem(LOCAL_KEY);
      console.info("[CartContext] localStorage cart key removed");
    } catch (e) {}
  }

  function getTotal() {
    return items.reduce((s, it) => s + it.pricePerUnit * it.quantity, 0);
  }

  const totalItems = items.reduce((s, it) => s + it.quantity, 0);

  // ---------- ORDERS API ----------
  const STATUS_FLOWS = {
    brand: [
      "pending",
      "deposit_paid",
      "fabric_delivery_in_progress",
      "in_production",
      "ready_for_fitting",
      "fitting_booked",
      "completed",
      "shipment_in_progress",
      "delivered",
      "cancelled",
    ],
    tailor: [
      "pending",
      "deposit_paid",
      "in_production",
      "ready_for_fitting",
      "fitting_booked",
      "completed",
      "cancelled",
    ],
  };

  function inferServiceTypeFromItems(itemsList = items) {
    if (!itemsList || itemsList.length === 0) return "brand";
    const hasTailor = itemsList.some((it) => it.isTailor || it.tailorId);
    return hasTailor ? "tailor" : "brand";
  }

  function createOrder({ customer = {}, serviceType = null, notes = "" } = {}) {
    const inferred = serviceType || inferServiceTypeFromItems(items);
    const id = Date.now().toString();
    const date = new Date().toISOString();
    const newOrder = {
      id,
      items: items.map((it) => ({ ...it })),
      total: getTotal(),
      date,
      status: "pending",
      serviceType: inferred,
      notes,
      customer,
    };

    // add to state AND persist immediately
    setOrders((prev) => {
      const next = [newOrder, ...prev];
      try {
        localStorage.setItem(ORDERS_KEY, JSON.stringify(next));
        console.info("[CartContext] createOrder persisted immediately", newOrder);
      } catch (e) {
        console.error("[CartContext] Failed to persist order immediately", e);
      }
      return next;
    });

    // clear cart (and remove localStorage key)
    setItems([]);
    try {
      localStorage.removeItem(LOCAL_KEY);
    } catch (e) {}

    return newOrder;
  }

  

  function getOrders() {
    return orders;
  }

  function updateOrderStatus(orderId, newStatus) {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
    );
  }

  function cancelOrder(orderId, reason = "") {
    setOrders((prev) =>
      prev.map((o) =>
        o.id === orderId
          ? {
              ...o,
              status: "cancelled",
              cancelledAt: new Date().toISOString(),
              cancelReason: reason,
            }
          : o
      )
    );
  }

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        updateQuantity,
        removeItem,
        clearCart,
        getTotal,
        totalItems,
        orders,
        createOrder,
        getOrders,
        updateOrderStatus,
        cancelOrder,
        STATUS_FLOWS,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
