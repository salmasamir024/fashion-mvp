// src/components/ui/Footer.jsx
import React from "react";

export default function Footer() {
  return (
    <footer className="w-full border-t py-4 mt-8 text-sm text-center">
      © {new Date().getFullYear()} Neiferet — All rights reserved.
    </footer>
  );
}
