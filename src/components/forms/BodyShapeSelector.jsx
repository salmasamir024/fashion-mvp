// src/components/forms/BodyShapeSelector.jsx
import React, { useEffect, useState } from "react";

const shapeImages = {
  hourglass: "src/assets/images/BodyMeasurment/Hourglass.png",
  pear: "src/assets/images/BodyMeasurment/Pear.png",
  rectangle: "src/assets/images/BodyMeasurment/Rectangle.png",
  invertedTriangle: "src/assets/images/BodyMeasurment/Inverted Triangle.png",
};

export default function BodyShapeSlider({ value, onChange }) {
  const shapes = ["hourglass", "pear", "rectangle", "invertedTriangle"];

  // Start at correct index
  const [index, setIndex] = useState(
    shapes.indexOf(value) !== -1 ? shapes.indexOf(value) : 0
  );

  useEffect(() => {
    const autoIndex = shapes.indexOf(value);
    if (autoIndex !== -1) setIndex(autoIndex);
  }, [value]);

  const next = () => setIndex((prev) => (prev + 1) % shapes.length);
  const prev = () => setIndex((prev) => (prev - 1 + shapes.length) % shapes.length);

  const selectShape = () => onChange(shapes[index]);

  const currentKey = shapes[index];
  const currentImage = shapeImages[currentKey];

  return (
    <div className="relative w-full flex flex-col items-center space-y-3">
      
      {/* Slider Image */}
      <img
        src={currentImage}
        alt={currentKey}
        className="w-full h-64 object-contain bg-gray-100 rounded-xl shadow-md"
      />

      {/* Controls */}
      <div className="flex justify-between w-full mt-2">
        <button onClick={prev} className="px-4 py-2 bg-gray-200 rounded-lg">Prev</button>
        <button onClick={selectShape} className="px-4 py-2 bg-blue-500 text-white rounded-lg">اختيار</button>
        <button onClick={next} className="px-4 py-2 bg-gray-200 rounded-lg">Next</button>
      </div>
    </div>
  );
}
