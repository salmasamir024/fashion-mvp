// src/pages/ProfilePage.jsx
import React from "react";
import { useParams } from "react-router-dom";

import tailorsData from "../../../data/tailors.json";
import brandsData from "../../../data/brands.json";

import Header from "../../profile/Header";
import TailorInfo from "../../profile/TailorInfo";
import BrandInfo from "../../profile/BrandInfo";
import PortfolioGrid from "../../profile/PortfolioGrid";
import Reviews from "../../profile/Reviews";

export default function ProfilePage() {
  const { id, type } = useParams();

  const data =
    type === "tailor"
      ? tailorsData.find((t) => t.id === id)
      : brandsData.find((b) => b.id === id);

  if (!data)
    return <div className="p-6 text-center text-red-600">Profile not found</div>;

  return (
    <div className="max-w-5xl mx-auto p-4 space-y-6">
      <Header data={data} />

      {/* Type-specific content */}
      {type === "tailor" && <TailorInfo data={data} />}
      {type === "brand" && <BrandInfo data={data} />}

      {/* Shared sections */}
      {data.portfolio && <PortfolioGrid items={data.portfolio} />}
      {data.reviews && <Reviews reviews={data.reviews} />}
      
    </div>
  );
}
