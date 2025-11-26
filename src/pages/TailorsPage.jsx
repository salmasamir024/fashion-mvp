// src/pages/TailorsPage.jsx
import React, { useEffect, useState } from "react";
import tailorsData from "../data/tailors.json";
import TailorCard from "../components/services/tailors/TailorCard";

// حساب المسافة (Haversine)
function calcDist(lat1, lon1, lat2, lon2) {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) ** 2;

  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

export default function TailorsPage() {
  const [tailors, setTailors] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [locationError, setLocationError] = useState(false);

  // Filters
  const [distanceFilter, setDistanceFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [priceMin, setPriceMin] = useState("");
  const [priceMax, setPriceMax] = useState("");
  const [search, setSearch] = useState("");

  // ------- 1) Get Location -------
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;

        localStorage.setItem(
          "pendingLocation",
          JSON.stringify({ latitude, longitude })
        );

        const withDistances = tailorsData.map((t) => {
          if (typeof t.location !== "object") {
            return { ...t, distance: null };
          }

          return {
            ...t,
            distance: calcDist(
              latitude,
              longitude,
              t.location.lat,
              t.location.lng
            ),
          };
        });

        setTailors(
          withDistances.sort(
            (a, b) => (a.distance || 9999) - (b.distance || 9999)
          )
        );
        setFiltered(withDistances);
        setLoading(false);
      },

      () => {
        setLocationError(true);
        setTailors(tailorsData);
        setFiltered(tailorsData);
        setLoading(false);
      }
    );
  }, []);

  // ------- 2) Filters Logic -------
  useEffect(() => {
    let result = [...tailors];

    if (search.trim()) {
      result = result.filter((t) =>
        t.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (distanceFilter) {
      result = result.filter(
        (t) => t.distance && t.distance <= Number(distanceFilter)
      );
    }

    if (typeFilter) {
      result = result.filter((t) => t.occasions?.includes(typeFilter));
    }

    if (priceMin)
      result = result.filter((t) => t.startingPrice >= Number(priceMin));
    if (priceMax)
      result = result.filter((t) => t.startingPrice <= Number(priceMax));

    setFiltered(result);
  }, [distanceFilter, typeFilter, priceMin, priceMax, search, tailors]);

  return (
    <div className="max-w-5xl mx-auto p-4 space-y-6">
      <h1 className="text-2xl font-bold">Recommended Tailors</h1>

      {locationError && (
        <div className="p-3 bg-yellow-100 border border-yellow-300 text-yellow-700 rounded-md">
          ⚠️ Enable location to see closest tailors.
        </div>
      )}

      {loading && <div className="text-center">Loading…</div>}

      {/* Filters */}
      <div className="p-4 border rounded-xl shadow bg-white space-y-4">
        <h2 className="text-lg font-semibold">Filters</h2>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <input
            type="text"
            placeholder="Search by name…"
            className="border p-2 rounded-md w-full"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select
            value={distanceFilter}
            onChange={(e) => setDistanceFilter(e.target.value)}
            className="border p-2 rounded-md"
          >
            <option value="">Distance</option>
            <option value="3">Within 3 km</option>
            <option value="5">Within 5 km</option>
            <option value="10">Within 10 km</option>
            <option value="20">Within 20 km</option>
          </select>

          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="border p-2 rounded-md"
          >
            <option value="">Occasion</option>
            <option value="Evening">Evening</option>
            <option value="Formal">Formal</option>
            <option value="Casual">Casual</option>
            <option value="Party">Party</option>
          </select>

          <div className="flex gap-2">
            <input
              type="number"
              placeholder="Min"
              className="border p-2 rounded-md w-full"
              value={priceMin}
              onChange={(e) => setPriceMin(e.target.value)}
            />
            <input
              type="number"
              placeholder="Max"
              className="border p-2 rounded-md w-full"
              value={priceMax}
              onChange={(e) => setPriceMax(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Tailors List using TailorCard */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((t) => (
          <TailorCard key={t.id} tailor={t} />
        ))}
      </div>
    </div>
  );
}
