// src/pages/DesignDetailsPage.jsx
import React, { useState, useEffect, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import SkinToneSelector from "../../forms/SkinToneSelector";

export default function DesignDetailsPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === "ar";

  const { design, userProfile } = location.state || {};

  const [skinTone, setSkinTone] = useState(userProfile?.skinTone || null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [recommendedSize, setRecommendedSize] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (!design || !userProfile?.measurements) return;

    const rec = calculateSizeFromProfile(userProfile);
    setRecommendedSize(rec);

    const bestColor =
      design.availableColors?.find((c) =>
        c.skinTones?.includes(userProfile.skinTone)
      ) || design.availableColors?.[0];

    setSelectedColor(bestColor);

    const defaultSize =
      bestColor.availableSizes.find((s) => s.size === rec && s.stock > 0)?.size ||
      bestColor.availableSizes[0].size;
    setSelectedSize(defaultSize);
    setQuantity(1);
  }, [design, userProfile]);

  const filteredColors = useMemo(() => {
    if (!skinTone) return design?.availableColors || [];
    return design?.availableColors?.filter((c) =>
      c.skinTones?.includes(skinTone)
    );
  }, [skinTone, design?.availableColors]);

  const selectedSizeObj = useMemo(() => {
    if (!selectedColor || !selectedSize) return null;
    return selectedColor.availableSizes.find(s => s.size === selectedSize);
  }, [selectedColor, selectedSize]);

  const maxQuantity = selectedSizeObj?.stock || 0;

  const handleAddToCart = () => {
    if (!selectedSize || !selectedColor) {
      alert(t("chooseSizeColor"));
      return;
    }

    if (quantity > selectedSizeObj.stock) {
      alert(t("quantityExceedsStock", { stock: selectedSizeObj.stock }));
      return;
    }

    alert(t("addedToCart", {
      title: design.title,
      color: selectedColor.name,
      size: selectedSize,
      quantity,
      price: selectedSizeObj.price * quantity
    }));
  };

  if (!design) {
    return (
      <div className={`p-6 ${isArabic ? "rtl" : "ltr"}`}>
        <p>{t("noDesignToShow")}</p>
        <button
          onClick={() => navigate(-1)}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md"
        >
          {t("goBack")}
        </button>
      </div>
    );
  }

  return (
    <div className={`p-6 space-y-6 max-w-4xl mx-auto ${isArabic ? "rtl" : "ltr"}`}>
      <button
        onClick={() => navigate(-1)}
        className="px-4 py-2 bg-gray-200 rounded-md"
      >
        {t("goBack")}
      </button>

      <h1 className="text-2xl font-bold">{design.title}</h1>
      <p className="text-gray-600">{t("fabric")}: {design.fabric}</p>

      {selectedColor?.image ? (
        <img
          src={selectedColor.image}
          alt={`${design.title} - ${selectedColor.name}`}
          className="w-full max-h-[450px] object-cover rounded-md mt-4"
        />
      ) : (
        <div className="w-full h-[450px] bg-gray-200 rounded-md mt-4 flex items-center justify-center">
          {t("noImageAvailable")}
        </div>
      )}

      {/* Skin Tone Selector */}
      <div className="mt-4">
        <label className="font-medium mb-1 block">{t("skinTone")}</label>
        <SkinToneSelector value={skinTone} onChange={setSkinTone} />
      </div>

      {/* Color Selector */}
      <div className="mt-4">
        <label className="font-medium block mb-2">{t("chooseColor")}</label>
        <div className="flex flex-wrap gap-2">
          {filteredColors?.map((color) => (
            <button
              key={color.name}
              onClick={() => {
                setSelectedColor(color);
                const defaultSize =
                  color.availableSizes.find((s) => s.size === recommendedSize && s.stock > 0)?.size ||
                  color.availableSizes[0].size;
                setSelectedSize(defaultSize);
                setQuantity(1);
              }}
              className={`w-10 h-10 rounded-full border-2 ${
                selectedColor?.name === color.name
                  ? "ring-2 ring-blue-500"
                  : "border-gray-300"
              }`}
              style={{ backgroundColor: color.hex }}
              title={color.description}
            />
          ))}
          {filteredColors?.length === 0 && (
            <p className="text-sm text-red-500">{t("noColorsForSkinTone")}</p>
          )}
        </div>
        {selectedColor && (
          <p className="mt-2 text-gray-700">{selectedColor.description}</p>
        )}
      </div>

      {/* Size Selector */}
      {selectedColor && (
        <div className="mt-4">
          <strong>{t("availableSizes")}:</strong>
          <div className="flex gap-2 mt-2 flex-wrap">
            {selectedColor.availableSizes.map((s) => (
              <button
                key={s.size}
                disabled={s.stock === 0}
                onClick={() => {
                  setSelectedSize(s.size);
                  setQuantity(1);
                }}
                className={`px-3 py-2 border rounded-md ${
                  s.stock === 0 ? "opacity-40 cursor-not-allowed" : ""
                } ${
                  selectedSize === s.size ? "bg-blue-600 text-white border-blue-600" : ""
                }`}
              >
                {s.size}
              </button>
            ))}
          </div>

          {recommendedSize && (
            <p className="mt-2 text-sm text-blue-700">
              {t("recommendedSize")}: <strong>{recommendedSize}</strong>
            </p>
          )}
        </div>
      )}

      {selectedSizeObj && (
        <div className="mt-3 text-lg">
          {t("price")}: <strong>{selectedSizeObj.price} EGP</strong>
        </div>
      )}

      {selectedSizeObj && (
        <div className="mt-2">
          {selectedSizeObj.stock < 10 && selectedSizeObj.stock > 0 && (
            <p className="text-sm text-red-500">{t("remainingStock")}: {selectedSizeObj.stock}</p>
          )}

          {selectedSizeObj.stock > 0 && (
            <div className="flex items-center gap-2 mt-1">
              <label>{t("quantity")}:</label>
              <input
                type="number"
                min={1}
                max={maxQuantity}
                value={quantity}
                onChange={(e) =>
                  setQuantity(Math.min(Math.max(1, Number(e.target.value)), maxQuantity))
                }
                className="w-16 px-2 py-1 border rounded-md"
              />
            </div>
          )}
        </div>
      )}

      {selectedSizeObj?.sizeGuide && (
        <div className="mt-4 bg-gray-50 p-4 rounded-md">
          <h3 className="font-semibold mb-2">{t("sizeGuide")}</h3>
          <ul className="text-gray-700 text-sm space-y-1">
            <li>{t("shoulder")}: {selectedSizeObj.sizeGuide.shoulder} cm</li>
            <li>{t("waist")}: {selectedSizeObj.sizeGuide.waist} cm</li>
            <li>{t("hips")}: {selectedSizeObj.sizeGuide.hips} cm</li>
            <li>{t("length")}: {selectedSizeObj.sizeGuide.length} cm</li>
          </ul>
        </div>
      )}

      <button
        onClick={handleAddToCart}
        className="mt-6 px-6 py-2 bg-green-600 text-white rounded-md"
      >
        {t("addToCart")}
      </button>
    </div>
  );
}

// ------------------------------
// حساب المقاس الأنسب
// ------------------------------
function calculateSizeFromProfile(profile) {
  if (!profile || !profile.measurements) return null;

  const { height, weight } = profile.measurements;
  const w = Number(weight);
  const h = Number(height);

  if (w < 55 && h < 160) return "S";
  if (w >= 55 && w < 70) return "M";
  if (w >= 70 && w < 85) return "L";
  if (w >= 85) return "XL";

  return "M";
}
