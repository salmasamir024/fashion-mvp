import React from "react";
import { Link } from "react-router-dom";
import { Menu, ShoppingCart, User, LogIn, Globe, X } from "lucide-react";
import { useTranslation } from "react-i18next";
import ThemeToggle from "./ThemeToggle";

export default function Navbar({ userProfile }) {
  const [open, setOpen] = React.useState(false);
  const { t, i18n } = useTranslation();

  const isLoggedIn = !!userProfile?.email;

  const toggleLang = () => {
    i18n.changeLanguage(i18n.language === "en" ? "ar" : "en");
  };

  return (
    <>
      {/* MAIN NAV */}
      <nav className="w-full backdrop-blur-lg bg-white/60 border-b border-white/30 shadow-md px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold tracking-wide text-primary font-serif">
          Neiferet
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-5">

          {/* Theme Toggle */}
          <ThemeToggle />

          {/* Cart */}
          <Link to="/cart" className="flex items-center gap-1 text-gray-700 hover:text-primary">
            <ShoppingCart size={20} />
            <span className="font-medium">{t("cart")}</span>
          </Link>

          {/* Login / Profile */}
          {isLoggedIn ? (
            <Link to="/profile" className="flex items-center gap-1 text-gray-700 hover:text-primary">
              <User size={20} />
              <span className="font-medium">{t("profile")}</span>
            </Link>
          ) : (
            <Link to="/login" className="flex items-center gap-1 text-gray-700 hover:text-primary">
              <LogIn size={20} />
              <span className="font-medium">{t("login")}</span>
            </Link>
          )}

          {/* Language */}
          <button className="flex items-center gap-1 text-gray-700 hover:text-primary" onClick={toggleLang}>
            <Globe size={20} />
            <span className="font-medium">{i18n.language === "en" ? "AR" : "EN"}</span>
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden text-gray-800 hover:text-primary" onClick={() => setOpen(true)}>
          <Menu size={28} />
        </button>
      </nav>

      {/* MOBILE SIDEBAR */}
      {open && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40">
          <div
            className={`absolute top-0 h-full w-64 bg-white shadow-lg p-5 flex flex-col gap-5 ${
              i18n.language === "ar" ? "left-0" : "right-0"
            }`}
          >
            {/* Close Button */}
            <button className="self-end text-gray-700" onClick={() => setOpen(false)}>
              <X size={26} />
            </button>

            {/* Theme Toggle in Mobile */}
            <ThemeToggle closeMenu={() => setOpen(false)} />

            {/* Cart */}
            <Link to="/cart" onClick={() => setOpen(false)} className="flex items-center gap-2 text-gray-700 text-lg">
              <ShoppingCart size={22} />
              {t("cart")}
            </Link>

            {/* Login / Profile */}
            {isLoggedIn ? (
              <Link to="/profile" onClick={() => setOpen(false)} className="flex items-center gap-2 text-gray-700 text-lg">
                <User size={22} />
                {t("profile")}
              </Link>
            ) : (
              <Link to="/login" onClick={() => setOpen(false)} className="flex items-center gap-2 text-gray-700 text-lg">
                <LogIn size={22} />
                {t("login")}
              </Link>
            )}

            {/* Language Switch */}
            <button
              className="flex items-center gap-2 text-gray-700 text-lg"
              onClick={() => {
                toggleLang();
                setOpen(false);
              }}
            >
              <Globe size={22} />
              {i18n.language === "en" ? "العربية" : "English"}
            </button>
          </div>
        </div>
      )}
    </>
  );
}
