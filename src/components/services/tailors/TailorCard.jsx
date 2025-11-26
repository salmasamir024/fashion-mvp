// src/components/services/tailors/TailorCard.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import Card from "../../ui/Card";
import { useTranslation } from "react-i18next";

export default function TailorCard({ tailor }) {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === "ar";

  return (
    <Card
      className="cursor-pointer hover:shadow-md transition"
      onClick={() => navigate(`/profile/tailor/${tailor.id}`)}
    >
      <img
        src={tailor.image}
        alt={tailor.name}
        className="w-full h-40 object-cover rounded-md"
      />

      <h3 className="text-lg font-semibold mt-2">{tailor.name}</h3>

      <p className="text-gray-600 text-sm mt-1">
        {tailor.occasions?.length
          ? tailor.occasions.join(", ")
          : t("notAvailable")}
      </p>

      {tailor.distance && (
        <p className="text-sm text-gray-500 mt-1">
          📍 {t("distanceAway", { distance: tailor.distance.toFixed(1) })}
        </p>
      )}

      <p className="text-gray-500 text-sm mt-1">
        {t("experience")}: {tailor.experience || t("notAvailable")} {t("years")}
      </p>

      <p className="mt-2 text-gray-700">
        {t("startingPrice")}:{" "}
        <strong>{tailor.startingPrice ? `${tailor.startingPrice} EGP` : t("notAvailable")}</strong>
      </p>
    </Card>
  );
}
