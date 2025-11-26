// src/pages/Home.jsx
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import useUserLocation from "../hooks/useUserLocation";
import { Sparkle, Scissors, ShoppingBag } from "lucide-react";
import ThemeToggle from "../components/ui/ThemeToggle"; // إضافة زر التبديل
import logo from "../assets/images/Neferet.png";


export default function Home() {
  const navigate = useNavigate();
  const { requestLocation, loading, error } = useUserLocation();

  const handleTailorClick = () => {
    requestLocation();
    setTimeout(() => navigate("/tailors"), 800);
  };

  return (
    <div className="min-h-screen rounded-lg bg-var(--color-bg) text-var(--color-text) overflow-hidden transition-colors duration-300">

      {/* Hero Section */}
      <section className="relative w-full max-w-6xl mx-auto pt-24 pb-32 px-6">
        {/* Background decorative glow */}
        <div className="absolute inset-0 bg-gradient-to-b from-blue-900/30 to-transparent blur-3xl opacity-40"></div>

        <div className="relative grid md:grid-cols-2 gap-10 items-center">
          {/* Left Text */}
          <div className="space-y-6">
            <h1 className="text-5xl md:text-6xl font-serif leading-tight text-var(--color-primary)">
              Fall in Love with Your <br />
              <span className="text-var(--color-secondary)">Perfect Style</span>
            </h1>

            <p className="text-var(--color-text-light) text-lg max-w-md">
              Personal styling, custom tailoring, and smart fashion
              recommendations — all in one place.
            </p>

            <Link
              to="/signup"
              className="inline-block px-8 py-3 mt-4 rounded-full bg-var(--color-primary) hover:bg-var(--color-primary-light) shadow-lg shadow-var(--color-primary)/40 transition"
            >
              Join Us
            </Link>
          </div>

          {/* Right Image */}
          <div className="relative">
            <img
              src={logo}
              className="rounded-3xl shadow-2xl shadow-var(--color-primary)/50 ring-1 ring-white/10"
              alt="Hero"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20 rounded-3xl"></div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="max-w-6xl mx-auto px-6 pb-32">
        <h2 className="text-3xl font-serif text-center mb-14 text-var(--color-primary)">
          Explore Our Services
        </h2>

        <div className="grid sm:grid-cols-3 gap-8">
          {/* Styling */}
          <Link
            to="/recommendations"
            className="bg-var(--color-card) p-8 rounded-3xl shadow-xl shadow-black/20 hover:scale-[1.03] transition transform group"
          >
            <Sparkle className="w-12 h-12 mb-4 text-var(--color-secondary) group-hover:scale-110 transition" />
            <h3 className="text-xl font-semibold mb-2">Styling Consulting</h3>
            <p className="text-var(--color-text-light) text-sm">
              Smart outfit recommendations tailored to your body shape.
            </p>
          </Link>

          {/* Tailors */}
          <button
            onClick={handleTailorClick}
            className="bg-var(--color-card) p-8 rounded-3xl shadow-xl shadow-black/20 hover:scale-[1.03] transition text-left group"
          >
            <Scissors className="w-12 h-12 mb-4 text-var(--color-secondary) group-hover:scale-110 transition" />
            <h3 className="text-xl font-semibold mb-2">Custom Tailoring</h3>
            <p className="text-var(--color-text-light) text-sm mb-2">
              Find tailors, upload your designs, and get custom fits.
            </p>
            {loading && <p className="text-var(--color-primary) text-sm">Locating you…</p>}
            {error && <p className="text-red-500 text-sm">{error}</p>}
          </button>

          {/* Store */}
          <Link
            to="/store"
            className="bg-var(--color-card) p-8 rounded-3xl shadow-xl shadow-black/20 hover:scale-[1.03] transition group"
          >
            <ShoppingBag className="w-12 h-12 mb-4 text-var(--color-secondary) group-hover:scale-110 transition" />
            <h3 className="text-xl font-semibold mb-2">Store</h3>
            <p className="text-var(--color-text-light) text-sm">
              Explore curated outfits perfect for your style.
            </p>
          </Link>
        </div>
      </section>
    </div>
  );
}
