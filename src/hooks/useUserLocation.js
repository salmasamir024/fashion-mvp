import { useState } from "react";

export default function useUserLocation() {
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const requestLocation = () => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported");
      return;
    }

    setLoading(true);

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;

        const userLocation = { latitude, longitude };

        setLocation(userLocation);
        localStorage.setItem("pendingLocation", JSON.stringify(userLocation)); // حفظ للرجوع بعد اللوج إن

        setLoading(false);
      },
      (err) => {
        setError(err.message);
        setLoading(false);
      },
      { enableHighAccuracy: true }
    );
  };

  return { location, error, loading, requestLocation };
}
