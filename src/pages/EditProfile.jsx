// src/pages/EditProfile.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import UploadImage from "../components/ui/UploadImage";

export default function EditProfile() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: "",
    avatar: null,
  });

  // Load existing data
  useEffect(() => {
    const stored = localStorage.getItem("userProfile");
    if (stored) {
      const data = JSON.parse(stored);

      setProfile((prev) => ({
        ...prev,
        name: data.name || "",
        email: data.email || "",
        phone: data.phone || "",
        avatar: data.avatar || null,
      }));
    }
  }, []);

  // HANDLE UPDATE
  const handleSave = () => {
    const stored = localStorage.getItem("userProfile");
    let data = stored ? JSON.parse(stored) : {};

    const updated = {
      ...data,
      name: profile.name,
      email: profile.email,
      phone: profile.phone,
      avatar: profile.avatar,
    };

    localStorage.setItem("userProfile", JSON.stringify(updated));

    navigate("/profile");
  };

  // Handle avatar upload
  const handleAvatarUpload = (files) => {
    const file = files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setProfile((prev) => ({ ...prev, avatar: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="p-6 max-w-xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold">Edit Profile</h1>

      {/* Avatar */}
      <Card className="space-y-3">
        <h2 className="font-semibold mb-2">Profile Photo</h2>

        <div className="flex items-center gap-4">
          <div className="w-20 h-20 bg-gray-200 rounded-full overflow-hidden">
            {profile.avatar ? (
              <img src={profile.avatar} alt="avatar" className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-500 text-sm">
                No photo
              </div>
            )}
          </div>

          <UploadImage label="Change Photo" onChange={handleAvatarUpload} />
        </div>
      </Card>

      {/* User info form */}
      <Card className="space-y-4">
        <h2 className="font-semibold text-lg">Personal Information</h2>

        <div>
          <p className="text-sm font-medium mb-1">Full Name</p>
          <Input
            value={profile.name}
            onChange={(e) => setProfile({ ...profile, name: e.target.value })}
            placeholder="Enter your name"
          />
        </div>

        <div>
          <p className="text-sm font-medium mb-1">Email</p>
          <Input
            value={profile.email}
            onChange={(e) => setProfile({ ...profile, email: e.target.value })}
            type="email"
            placeholder="Enter your email"
          />
        </div>

        <div>
          <p className="text-sm font-medium mb-1">Phone Number</p>
          <Input
            value={profile.phone}
            onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
            placeholder="01000000000"
          />
        </div>
      </Card>

      {/* Buttons */}
      <div className="flex gap-2">
        <Button variant="secondary" onClick={() => navigate("/profile")}>
          Cancel
        </Button>

        <Button variant="primary" onClick={handleSave}>
          Save Changes
        </Button>
      </div>
    </div>
  );
}
