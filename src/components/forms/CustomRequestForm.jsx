// src/components/forms/CustomTailoringForm.jsx
import React, { useState } from "react";
import Button from "../ui/Button";
import Input from "../ui/Input";
import { useCart } from "../../context/CartContext";

export default function CustomTailoringForm({ tailorId, onClose }) {
  const { createOrder } = useCart();
  const userProfile = JSON.parse(localStorage.getItem("userProfile") || "{}");

  const [pieceType, setPieceType] = useState("");
  const [occasion, setOccasion] = useState("");
  const [budget, setBudget] = useState("");
  const [notes, setNotes] = useState("");
  const [uploadedImage, setUploadedImage] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = () => {
    setSubmitting(true);

    const order = createOrder({
      customer: userProfile,
      serviceType: "tailor",
      request: {
        measurements: userProfile.measurements,
        pieceType,
        occasion,
        budget,
        notes,
        photo: uploadedImage,
        tailorId,
      },
    });

    setSubmitting(false);
    onClose?.();
    alert(`Custom Tailoring Request Submitted! Order ID: ${order.id}`);
  };

  return (
    <div className="space-y-4 p-4">
      <Input label="Piece Type" value={pieceType} onChange={e => setPieceType(e.target.value)} />
      <Input label="Occasion" value={occasion} onChange={e => setOccasion(e.target.value)} />
      <Input label="Budget" type="number" value={budget} onChange={e => setBudget(e.target.value)} />
      <Input label="Notes" value={notes} onChange={e => setNotes(e.target.value)} />
      <Input label="Upload Measurements Image" type="file" onChange={e => setUploadedImage(e.target.files[0])} />
      <Button onClick={handleSubmit} loading={submitting} variant="primary">
        Submit Request
      </Button>
    </div>
  );
}
