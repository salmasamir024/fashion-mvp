// src/utils/bodyShapeCalculator.js

export function calculateBodyShape({ shoulders, bust, waist, hips }) {
  shoulders = Number(shoulders);
  bust = Number(bust);
  waist = Number(waist);
  hips = Number(hips);

  // Hourglass
  if (Math.abs(shoulders - hips) <= 5 && waist < bust - 10) {
    return "hourglass";
  }

  // Pear
  if (hips > bust + 5) {
    return "pear";
  }

  // Inverted triangle
  if (shoulders > hips + 5) {
    return "inverted";
  }

  // Rectangle
  return "rectangle";
}
