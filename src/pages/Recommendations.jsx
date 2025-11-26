// src/pages/Recommendations.jsx
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";

import Button from "../components/ui/Button";

import DesignCard from "../components/services/designs/DesignCard";
import TailorCard from "../components/services/tailors/TailorCard";

import SkinToneSelector from "../components/forms/SkinToneSelector";
import OccasionSelector from "../components/forms/OccasionSelector";

import { filterDesigns, matchTailors } from "../utils/matchingLogic";
import designsData from "../data/designs.json";
import tailorsData from "../data/tailors.json";

export default function Recommendations() {
  const location = useLocation();
  const { userProfile } = location.state || {};
  const { t, i18n } = useTranslation();

  const [skinTone, setSkinTone] = useState(userProfile?.skinTone || null);
  const [occasion, setOccasion] = useState(null);
  const [results, setResults] = useState([]);
  const [tailors, setTailors] = useState([]);

  const isArabic = i18n.language === "ar";

  useEffect(() => {
    if (userProfile) handleShowRecommendations();
  }, []);

  const handleShowRecommendations = () => {
    const filtered = filterDesigns(designsData, {
      bodyShape: userProfile?.selectedShape || userProfile?.bodyShape,
      skinTone,
      occasion,
      size: userProfile?.recommendedSize,
    });
    setResults(filtered);

    const tailorMatches = matchTailors(tailorsData, {
      occasion,
      bodyShape: userProfile?.selectedShape,
    });
    setTailors(tailorMatches);
  };

  return (
    <div className={`p-4 md:p-6 space-y-10 max-w-6xl mx-auto ${isArabic ? "rtl" : "ltr"}`}>
      {/* 🌟 USER SNAPSHOT */}
      {userProfile && (
        <div className="bg-gray-100 p-4 md:p-6 rounded-lg">
          <h2 className="text-lg font-semibold mb-4">{t("yourStylingProfile")}</h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <p className="font-medium">{t("shape")}</p>
              <p>{userProfile.selectedShape || userProfile.bodyShape}</p>
            </div>

            <div>
              <p className="font-medium">{t("size")}</p>
              <p>{userProfile.recommendedSize}</p>
            </div>

            <div>
              <p className="font-medium">{t("height")}</p>
              <p>{userProfile.measurements.height} cm</p>
            </div>

            <div>
              <p className="font-medium">{t("weight")}</p>
              <p>{userProfile.measurements.weight} kg</p>
            </div>
          </div>
        </div>
      )}

      {/* 🌟 FILTER PANEL */}
      <div className="bg-white border p-4 rounded-md shadow-sm space-y-4">
        <h3 className="text-lg font-semibold">{t("filters")}</h3>

        <div className="flex flex-col md:flex-row gap-6 md:items-center">
          {/* Skin Tone */}
          <div>
            <label className="font-medium mb-1 block">{t("skinTone")}</label>
            <SkinToneSelector value={skinTone} onChange={setSkinTone} />
          </div>

          {/* Occasion */}
          <div>
            <label className="font-medium mb-1 block">{t("occasion")}</label>
            <OccasionSelector value={occasion} onChange={setOccasion} />
          </div>

          <Button variant="primary" onClick={handleShowRecommendations}>
            {t("showRecommendations")}
          </Button>
        </div>
      </div>

      {/* 🌟 RESULTS */}
      <div>
        <h3 className="text-xl font-semibold mb-4">{t("recommendedDesigns")}</h3>

        {results.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {results.map((design) => (
              <DesignCard key={design.id} design={design} />
            ))}
          </div>
        ) : (
          <p className="text-gray-500 mt-4">{t("noDesignsMatch")}</p>
        )}
      </div>

      {/* 🌟 RECOMMENDED TAILORS */}
      {/* <div className="space-y-4">
        <h3 className="text-xl font-semibold">{t("tailorsForYou")}</h3>

        {tailors.length ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {tailors.map((tailor) => (
              <TailorCard key={tailor.id} tailor={tailor} />
            ))}
          </div>
        ) : (
          <p className="text-gray-500">{t("noTailorsYet")}</p>
        )}
      </div> */}
    </div>
  );
}
