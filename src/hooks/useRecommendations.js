// src/hooks/useRecommendations.js
import { useState, useEffect } from "react";
import designs from "../data/designs.json";
import { matchDesign } from "../utils/matchingLogic";

export default function useRecommendations({ shape, skinTone, occasion, measurements }) {
  const [results, setResults] = useState([]);

  useEffect(() => {
    if (!shape || !occasion) return;

    const filtered = designs.filter((design) =>
      matchDesign(design, {
        shape,
        skinTone,
        occasion,
        measurements,
      })
    );

    setResults(filtered);
  }, [shape, skinTone, occasion, measurements]);

  return results;
}
