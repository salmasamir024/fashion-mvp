import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../ui/Input";
import Button from "../ui/Button";
import { calculateBodyShape } from "../../utils/bodyShapeCalculator";
import BodyShapeSelector from "./BodyShapeSelector";

export default function BodyMeasurementsForm({ onSave }) {
    const navigate = useNavigate();

  const [form, setForm] = useState({
    shoulders: "",
    bust: "",
    waist: "",
    hips: "",
    height: "",
    weight: "",
    selectedShape: "",
  });

  useEffect(() => {
    const autoShape = calculateBodyShape(form);
    setForm((prev) => ({ ...prev, selectedShape: autoShape }));
  }, [form.shoulders, form.bust, form.waist, form.hips]);

  const handleChange = (key, value) => {
    setForm({ ...form, [key]: value });
  };

  const handleSubmit = () => {
    if (!form.height || !form.weight) {
      alert("الرجاء إدخال الطول والوزن قبل الحفظ");
      return;
    }

    onSave && onSave(form);
    alert("تم حفظ البيانات بنجاح!");
  };

  return (
    <div className="space-y-6">
      <h2 className="text-lg font-semibold">أدخل مقاساتك</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          label="Shoulders (سم)"
          value={form.shoulders}
          onChange={(e) => handleChange("shoulders", e.target.value)}
        />
        <Input
          label="Bust (سم)"
          value={form.bust}
          onChange={(e) => handleChange("bust", e.target.value)}
        />
        <Input
          label="Waist (سم)"
          value={form.waist}
          onChange={(e) => handleChange("waist", e.target.value)}
        />
        <Input
          label="Hips (سم)"
          value={form.hips}
          onChange={(e) => handleChange("hips", e.target.value)}
        />
        <Input
          label="Height (سم)"
          value={form.height}
          onChange={(e) => handleChange("height", e.target.value)}
        />
        <Input
          label="Weight (كجم)"
          value={form.weight}
          onChange={(e) => handleChange("weight", e.target.value)}
        />
      </div>

      <div>
        <p className="mb-1 font-medium">اختر شكل جسمك:</p>
        <BodyShapeSelector
          value={form.selectedShape}
          onChange={(val) => setForm({ ...form, selectedShape: val })}
        />
      </div>

      <div className="relative bottom-0 left-0 right-0 flex justify-center gap-4 px-2">
        <Button
          onClick={handleSubmit}
          className="w-full bg-blue-600 text-white"
        >
          احفظ البيانات
        </Button>
        {/* أزرار التعديل والعودة */}

        <Button
          variant="secondary"
          className="px-5 py-1 text-lg shadow-lg"
          onClick={() => navigate("/profile")}
        >
          Cancel
        </Button>
      </div>
    </div>
  );
}
