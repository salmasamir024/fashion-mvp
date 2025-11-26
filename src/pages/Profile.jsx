import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import SizeRecommendationBadge from "../components/services/designs/SizeRecommendationBadge";

export default function Profile() {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  const [userProfile, setUserProfile] = useState(null);

  const isArabic = i18n.language === "ar";

  useEffect(() => {
    const stored = localStorage.getItem("userProfile");
    if (stored) setUserProfile(JSON.parse(stored));
  }, []);

  // -------- NO PROFILE --------
  if (!userProfile)
    return (
      <div
        className="p-6 max-w-xl mx-auto bg-[var(--color-bg)] text-[var(--color-text)] transition-colors duration-300"
        dir={isArabic ? "rtl" : "ltr"}
      >
        <h1 className="text-3xl font-bold text-[var(--color-primary)] mb-3">
          {t("profile")}
        </h1>

        <p className="text-[var(--color-text-light)] mb-4">
          {t("noMeasurements")}
        </p>

        <Button variant="primary" onClick={() => navigate("/update-measurements")}>
          {t("addMeasurements")}
        </Button>
      </div>
    );

  const { measurements, bodyShape, selectedShape, skinTone, palette, occasions, favorites, orders } =
    userProfile;

  return (
    <div
      className="p-6 space-y-6 max-w-xl mx-auto bg-[var(--color-bg)] text-[var(--color-text)] transition-colors duration-300"
      dir={isArabic ? "rtl" : "ltr"}
    >
      {/* -------- TITLE -------- */}
      <h1 className="text-3xl font-bold text-[var(--color-primary)]">
        {t("profile")}
      </h1>

      {/* USER INFO */}
      <Card className="space-y-3 bg-[var(--color-card)] text-[var(--color-text)]">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="font-semibold text-lg">{userProfile.name || t("userName")}</h2>
            <p className="text-sm text-[var(--color-text-light)]">
              {userProfile.email || t("email")}
            </p>
            <p className="text-sm text-[var(--color-text-light)]">
              {userProfile.phone || t("phone")}
            </p>
          </div>

          <img
            src={userProfile.avatar || "/default-avatar.png"}
            alt="Avatar"
            className="w-14 h-14 rounded-full object-cover"
          />
        </div>

        <Button variant="secondary" onClick={() => navigate("/edit-profile")}>
          {t("editProfile")}
        </Button>
      </Card>

      {/* MEASUREMENTS */}
      <Card className="space-y-3 bg-[var(--color-card)] text-[var(--color-text)]">
        <h2 className="text-lg font-semibold">{t("bodyMeasurements")}</h2>

        <div className="grid grid-cols-2 gap-2 text-sm">
          <p>{t("height")}: {measurements?.height || "N/A"} cm</p>
          <p>{t("weight")}: {measurements?.weight || "N/A"} kg</p>
          <p>{t("shoulders")}: {measurements?.shoulders || "N/A"} cm</p>
          <p>{t("bust")}: {measurements?.bust || "N/A"} cm</p>
          <p>{t("waist")}: {measurements?.waist || "N/A"} cm</p>
          <p>{t("hips")}: {measurements?.hips || "N/A"} cm</p>
        </div>

        <Button variant="secondary" onClick={() => navigate("/update-measurements")}>
          {t("updateMeasurements")}
        </Button>
      </Card>

      {/* BODY PROFILE */}
      <Card className="space-y-2 bg-[var(--color-card)] text-[var(--color-text)]">
        <h2 className="text-lg font-semibold">{t("bodyProfile")}</h2>

        <p className="text-sm">
          {t("bodyShape")}: <strong>{selectedShape || bodyShape}</strong>
        </p>

        <p className="text-sm">{t("skinTone")}:</p>

        <div
          className="w-10 h-10 rounded-full border border-[var(--color-border)]"
          style={{ background: skinTone || "#e0c3a0" }}
        />
      </Card>

      {/* COLOR PALETTE */}
      <Card className="bg-[var(--color-card)] text-[var(--color-text)]">
        <h2 className="text-lg font-semibold mb-2">{t("colorPalette")}</h2>

        <div className="flex gap-3">
          {(palette || ["#2e3d55", "#446c35", "#7d1f21", "#c9925a"]).map((c, i) => (
            <div
              key={i}
              className="w-8 h-8 rounded-full border border-[var(--color-border)]"
              style={{ background: c }}
            />
          ))}
        </div>
      </Card>

      {/* OCCASIONS */}
      <Card className="bg-[var(--color-card)] text-[var(--color-text)]">
        <h2 className="text-lg font-semibold mb-2">{t("occasions")}</h2>

        <div className="flex flex-wrap gap-2">
          {(occasions || ["Evening", "Casual", "Pharaonic"]).map((o) => (
            <span
              key={o}
              className="px-3 py-1 bg-[var(--color-chip)] text-[var(--color-text)] rounded-full text-sm"
            >
              {o}
            </span>
          ))}
        </div>
      </Card>

      {/* SIZE */}
      <Card className="bg-[var(--color-card)] text-[var(--color-text)]">
        <h2 className="text-lg font-semibold mb-2">{t("recommendedSize")}</h2>

        <SizeRecommendationBadge
          height={measurements?.height}
          weight={measurements?.weight}
          hips={measurements?.hips}
          chest={measurements?.bust}
        />
      </Card>

      {/* FAVORITES */}
      <Card className="space-y-2 bg-[var(--color-card)] text-[var(--color-text)]">
        <h2 className="text-lg font-semibold">{t("favorites")}</h2>

        <h3 className="font-semibold text-sm">{t("designs")}</h3>
        <div className="flex gap-2 overflow-x-auto">
          {(favorites?.designs || []).length ? (
            favorites.designs.map((_, i) => (
              <div key={i} className="w-20 h-28 bg-[var(--color-chip)] rounded-md"></div>
            ))
          ) : (
            <p className="text-sm text-[var(--color-text-light)]">{t("noFavorites")}</p>
          )}
        </div>

        <h3 className="font-semibold text-sm">{t("tailors")}</h3>
        <div className="flex gap-2 overflow-x-auto">
          {(favorites?.tailors || []).length ? (
            favorites.tailors.map((_, i) => (
              <div key={i} className="w-20 h-20 bg-[var(--color-chip)] rounded-md"></div>
            ))
          ) : (
            <p className="text-sm text-[var(--color-text-light)]">{t("noFavorites")}</p>
          )}
        </div>
      </Card>

      {/* ORDERS */}
      <Card className="space-y-2 bg-[var(--color-card)] text-[var(--color-text)]">
        <h2 className="text-lg font-semibold">{t("orders")}</h2>

        <h3 className="font-semibold text-sm">{t("inProgress")}</h3>
        <div className="flex gap-2">
          {(orders?.inProgress || []).map((_, i) => (
            <div key={i} className="w-24 h-28 bg-[var(--color-chip)] rounded-md"></div>
          ))}
        </div>

        <h3 className="font-semibold text-sm">{t("completed")}</h3>
        <div className="flex gap-2">
          {(orders?.completed || []).map((_, i) => (
            <div key={i} className="w-24 h-28 bg-[var(--color-chip)] rounded-md"></div>
          ))}
        </div>
      </Card>

      {/* LOGOUT */}
      <Button
        variant="ghost"
        className="text-red-500"
        onClick={() => {
          localStorage.removeItem("userProfile");
          navigate("/login");
        }}
      >
        {t("logout")}
      </Button>
    </div>
  );
}
