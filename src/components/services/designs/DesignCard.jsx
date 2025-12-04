// src/components/services/designs/DesignCard.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import Card from "../../ui/Card";
import { ShoppingCart } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function DesignCard({ design, userProfile }) {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === "ar";

  const goToDetails = () => {
    navigate("/design-details", { state: { design, userProfile } });
  };

  const handleAddToCart = (e) => {
    e.stopPropagation(); // منع التنقل عند الضغط على الزر
    console.log(t("addedToCart"), design.title);
    // هنا ممكن تضيف منطق إضافة المنتج لعربة التسوق
  };

  return (
    <Card
      className="flex flex-col gap-3 cursor-pointer hover:shadow-md relative"
      onClick={goToDetails}
    >
      {/* صورة التصميم */}
      <div
        style={{ height: 220, background: "#eee" }}
        className="rounded-md relative"
      >
        {design.defaultImage && (
          <img
            src={design.availableColors?.[0]?.image || design.defaultImage}
            alt={design.title}
            className="w-full h-full object-cover rounded-md"
          />
        )}

        {/* زر Add to Cart */}
        <button
          onClick={handleAddToCart}
          className="absolute top-2 right-2 bg-white p-2 rounded-full shadow hover:bg-gray-100"
          title={t("addToCart")}
        >
          <ShoppingCart size={18} />
        </button>
      </div>

      {/* معلومات التصميم */}
      <div className="flex items-center justify-between">
        <div>
          <h4 className="font-semibold">{design.title}</h4>
          <div className="text-sm text-gray-500">{design.fabric}</div>
        </div>
        <div className="text-sm font-medium">
          {design.price ? `${design.price} EGP` : t("notAvailable")}
        </div>
      </div>
    </Card>
  );
}
