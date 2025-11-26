import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

export default function ThemeToggle({ closeMenu }) {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggle = () => {
    setTheme(theme === "light" ? "dark" : "light");
    if (closeMenu) closeMenu(); // لو داخل الموبايل المنيو
  };

  return (
    <button
      onClick={toggle}
      className="flex items-center gap-1 text-gray-700 hover:text-primary transition"
    >
      {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
      <span className="font-medium">
        {theme === "light" ? "Dark" : "Light"}
      </span>
    </button>
  );
}
