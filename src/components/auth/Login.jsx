// src/components/auth/Login.jsx
import React, { useState, useEffect } from "react";
import Input from "../ui/Input";
import Button from "../ui/Button";
import { Link } from "react-router-dom";

export default function Login({ onLogin }) {
  const [formData, setForm] = useState({ email: "", password: "" });

  // ✅ هنا المكان الصحيح لاستخدام useEffect
  useEffect(() => {
    const handlePendingLocation = async () => {
      const pendingLocation = localStorage.getItem("pendingLocation");

      if (pendingLocation) {
        const location = JSON.parse(pendingLocation);

        // هنبعت الموقع للسيرفر لتحديد أفضل Tailor
        await fetch("/api/saveLocation", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(location),
        });

        // نمسح البيانات من localStorage بعد الاستخدام
        localStorage.removeItem("pendingLocation");
      }
    };

    handlePendingLocation();
  }, []);

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin && onLogin(formData);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-sm mx-auto p-4 border rounded-md flex flex-col gap-4"
    >
      <h2 className="text-lg font-semibold">Login</h2>

      <Input
        type="email"
        value={formData.email}
        onChange={(e) => handleChange("email", e.target.value)}
        placeholder="Email"
      />

      <Input
        type="password"
        value={formData.password}
        onChange={(e) => handleChange("password", e.target.value)}
        placeholder="Password"
      />

      <Button type="submit" variant="primary">
        Login
      </Button>

      {/* ➕ زرار لو عند حساب بالفعل */}
      <div className="text-center text-sm mt-2">
        Create an account?{" "}
        <Link to="/signup" className="text-blue-600 font-medium hover:underline">
          SignUP
        </Link>
      </div>
    </form>
  );
}
