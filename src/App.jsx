import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate,
} from "react-router-dom";

import Navbar from "./components/ui/Navbar";
import SignUp from "./components/auth/SignUp";
import Login from "./components/auth/Login";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import EditProfile from "./pages/EditProfile";
import UpdateMeasurements from "./pages/UpdateMeasurements";
import Recommendations from "./pages/Recommendations";
import DesignDetailsPage from "./components/services/designs/DesignDetailsPage";

// لو حابة تضيفي TailorPage أو StorePage بعدين
import TailorsPage from "./pages/TailorsPage";
import ProfilePage from "./components/services/tailors/ProfilePage";

// import TailorProfilePage from "./pages/TailorProfilePage";
// import StorePage from "./pages/StorePage";

export default function App() {
  const [userProfile, setUserProfile] = useState({
    bodyShape: null,
    measurements: null,
    skinTone: null,
    recommendedSize: null,
    role: "user", // default
  });

  const [lang, setLang] = useState("en");

  const handleToggleLang = () => {
    setLang((prev) => (prev === "en" ? "ar" : "en"));
  };

  // Load saved profile from localStorage on first load
  useEffect(() => {
    const saved = localStorage.getItem("userProfile");
    if (saved) {
      setUserProfile(JSON.parse(saved));
    }
  }, []);

  // Save profile automatically whenever it changes
  const updateUserProfile = (updates) => {
    const newProfile = { ...userProfile, ...updates };
    setUserProfile(newProfile);
    localStorage.setItem("userProfile", JSON.stringify(newProfile));
  };

  const handleSignUp = (formData) => {
    // formData = { email, password, role }
    const newProfile = {
      email: formData.email,
      role: formData.role,
      bodyShape: null,
      measurements: null,
      skinTone: null,
      recommendedSize: null,
    };

    setUserProfile(newProfile);
    localStorage.setItem("userProfile", JSON.stringify(newProfile));

    // بعد التسجيل نوديه على صفحة profile أو update measurements
  };

  const handleLogin = (formData) => {
    // formData = { email, password }
    const stored = localStorage.getItem("userProfile");
    if (stored) {
      const profile = JSON.parse(stored);

      // إذا الإيميل يطابق
      if (profile.email === formData.email) {
        setUserProfile(profile);
      } else {
        alert("Email not found!");
      }
    } else {
      alert("No users found. Please sign up first.");
    }
  };

  return (
      <Router>
        <div className="min-h-screen bg-gray-50">
          {/* ------- NAVBAR ------- */}
          <Navbar
            userProfile={userProfile}
            onOpenMenu={() => console.log("Open mobile menu")}
            onToggleLang={handleToggleLang}
          />

          {/* ------- PAGES ROUTING ------- */}
          <div className="p-6">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route
                path="/signup"
                element={<SignUp onSignUp={handleSignUp} />}
              />
              <Route path="/login" element={<Login onLogin={handleLogin} />} />

              <Route
                path="/profile"
                element={
                  <Profile
                    userProfile={userProfile}
                    updateUserProfile={updateUserProfile}
                  />
                }
              />
              <Route
                path="/update-measurements"
                element={<UpdateMeasurements />}
              />
              <Route path="/edit-profile" element={<EditProfile />} />

              <Route
                path="/recommendations"
                element={<Recommendations userProfile={userProfile} />}
              />
              <Route path="/design-details" element={<DesignDetailsPage />} />

              {/* تقدر تضيفي صفحات لاحقًا */}
              <Route path="/tailors" element={<TailorsPage />} />
              <Route path="/profile/:type/:id" element={<ProfilePage />} />
              {/* <Route path="/tailor/:id" element={<TailorProfilePage />} /> */}
              {/* <Route path="/store" element={<StorePage />} /> */}
            </Routes>
          </div>
        </div>
      </Router>
  );
}
