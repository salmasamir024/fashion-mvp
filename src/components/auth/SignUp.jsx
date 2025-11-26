// src/components/auth/SignUp.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../ui/Input";
import Button from "../ui/Button";
import { Link } from "react-router-dom";

export default function SignUp({ onSignUp }) {
  const navigate = useNavigate(); // إضافة الـ hook

  const [form, setForm] = useState({
    email: "",
    password: "",
    role: "user", // default role
  });
  const [errors, setErrors] = useState({ email: "", password: "", role: "" });

  const regEmail =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const validate = () => {
    let valid = true;
    let newErrors = { email: "", password: "", role: "" };

    if (!form.email) {
      newErrors.email = "Email is required";
      valid = false;
    } else if (!regEmail.test(form.email)) {
      newErrors.email = "Invalid email format";
      valid = false;
    }

    if (!form.password) {
      newErrors.password = "Password is required";
      valid = false;
    } else if (form.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
      valid = false;
    }

    if (!form.role) {
      newErrors.role = "Please select an account type";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      // لو عندك onSignUp من الأب
      onSignUp && onSignUp(form);

      // بعد تسجيل المستخدم نوجهه مباشرة
      navigate("/profile"); // هنا تقدر تغيّري المسار حسب المطلوب
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-sm mx-auto p-4 border rounded-md flex flex-col gap-4"
    >
      <h2 className="text-lg font-semibold">Sign Up</h2>

      {/* Role selection */}
      <div className="flex flex-col gap-2">
        <label className="font-medium">I am a:</label>
        <div className="flex gap-4">
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="role"
              value="user"
              checked={form.role === "user"}
              onChange={() => handleChange("role", "user")}
            />
            User
          </label>

          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="role"
              value="provider"
              checked={form.role === "provider"}
              onChange={() => handleChange("role", "provider")}
            />
            Service Provider
          </label>
        </div>
        {errors.role && <p className="text-red-500 text-sm">{errors.role}</p>}
      </div>

      {/* Email */}
      <div>
        <Input
          type="email"
          value={form.email}
          onChange={(e) => handleChange("email", e.target.value)}
          placeholder="Email"
        />
        {errors.email && (
          <p className="text-red-500 text-sm mt-1">{errors.email}</p>
        )}
      </div>

      {/* Password */}
      <div>
        <Input
          type="password"
          value={form.password}
          onChange={(e) => handleChange("password", e.target.value)}
          placeholder="Password"
        />
        {errors.password && (
          <p className="text-red-500 text-sm mt-1">{errors.password}</p>
        )}
      </div>

      <Button type="submit" variant="primary">
        Create Account
      </Button>

      {/* ➕ زرار لو عند حساب بالفعل */}
      <div className="text-center text-sm mt-2">
        Already have an account?{" "}
        <Link to="/login" className="text-blue-600 font-medium hover:underline">
          Login here
        </Link>
      </div>
    </form>
  );
}
