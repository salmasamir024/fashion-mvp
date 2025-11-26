// src/pages/UpdateMeasurementsPage.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import BodyMeasurementsForm from "../components/forms/BodyMeasurementsForm";
import BodyShapeResult from "../components/forms/BodyShapeResultPage";

import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import Hourglass from "../assets/images/BodyMeasurment/Hourglass.png";
import Pear from "../assets/images/BodyMeasurment/Pear.png";
import Rectangle from "../assets/images/BodyMeasurment/Rectangle.png";
import InvertedTriangle from "../assets/images/BodyMeasurment/Inverted Triangle.png";

const shapeImages = {
  hourglass: Hourglass,
  pear: Pear,
  rectangle: Rectangle,
  invertedTriangle: InvertedTriangle,
};


export default function UpdateMeasurementsPage() {
  const navigate = useNavigate();

  const [measurements, setMeasurements] = useState(null);
  const [selectedShape, setSelectedShape] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("userProfile");

    if (stored) {
      const data = JSON.parse(stored);
      setMeasurements(data.measurements || null);
      setSelectedShape(data.selectedShape || data.bodyShape || null);
    } else {
      setIsEditing(true);
    }
  }, []);

  const handleSave = (data) => {
    const autoShape = data.selectedShape;

    // 1) قراءة البيانات القديمة
    const stored = localStorage.getItem("userProfile");
    const oldProfile = stored ? JSON.parse(stored) : {};

    // 2) دمج البيانات القديمة مع الجديدة
    const updatedProfile = {
      ...oldProfile, // ← يحافظ على الاسم، الايميل، الرقم، الصورة...
      measurements: {
        shoulders: data.shoulders,
        bust: data.bust,
        waist: data.waist,
        hips: data.hips,
        height: data.height,
        weight: data.weight,
      },
      selectedShape: autoShape,
    };

    // 3) حفظ النسخة المدموجة
    localStorage.setItem("userProfile", JSON.stringify(updatedProfile));

    // تحديث الـ UI
    setMeasurements(updatedProfile.measurements);
    setSelectedShape(autoShape);
    setIsEditing(false);
  };

  // ============= حالة العرض (مش تعديل) =============
  if (measurements && !isEditing) {
    return (
      <div className="relative min-h-screen inset-0 bg-gradient-to-b from-blue-900/30 to-transparent text-white p-10 max-w-xl mx-auto space-y-6">
        <div className="p-6 max-w-xl mx-auto space-y-6 ">
          <BodyShapeResult
            imageSrc={shapeImages[selectedShape] || ""}
            measurements={measurements}
            shapeName={selectedShape || "Hourglass"}
          />
        </div>

        {/* أزرار التعديل والعودة */}
        <div className="fixed bottom-8 left-0 right-0 flex justify-center gap-4 px-6">
          <Button
            variant="primary"
            className="px-6 py-3 text-lg rounded-xl shadow-lg"
            onClick={() => setIsEditing(true)}
          >
            Update Measurements
          </Button>

          <Button
            variant="secondary"
            className="px-6 py-3 text-lg rounded-xl shadow-lg"
            onClick={() => navigate("/profile")}
          >
            Back to Profile
          </Button>
        </div>
      </div>
    );
  }

  // ============= حالة التعديل =============
  return (
    <div className="p-6 max-w-xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold">Body Measurements</h1>
      <Card className="p-4">
        <BodyMeasurementsForm
          onSave={handleSave}
          defaultValues={measurements}
        />
      </Card>
      
    </div>
  );
}
