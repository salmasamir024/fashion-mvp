// src/utils/matchingLogic.js

/**
 * -----------------------------------------
 *  MATCH DESIGN — Checks if 1 design fits user
 * -----------------------------------------
 */
export function matchDesign(design, { bodyShape, skinTone, occasion, size }) {
  const matchesShape =
    !bodyShape || design.suitableShapes?.includes(bodyShape);

  const matchesOccasion =
    !occasion || design.occasions?.includes(occasion);

  const matchesTone =
    !skinTone || design.skinTones?.includes(skinTone);

  const matchesSize =
    !size ||
    (design.sizeRange &&
      design.sizeRange.split("-").includes(size));

  return matchesShape && matchesOccasion && matchesTone && matchesSize;
}

/**
 * -----------------------------------------
 *  SCORE DESIGN — Gives a smart score
 *  Helps to sort recommendations by relevance
 * -----------------------------------------
 */
export function scoreDesign(design, { bodyShape, skinTone, occasion, size }) {
  let score = 0;

  if (bodyShape && design.suitableShapes?.includes(bodyShape)) score += 40;
  if (occasion && design.occasions?.includes(occasion)) score += 30;
  if (skinTone && design.skinTones?.includes(skinTone)) score += 20;
  if (size && design.sizeRange?.split("-").includes(size)) score += 10;

  return score;
}

/**
 * -----------------------------------------
 *  FILTER DESIGNS
 *  With scoring + sorting
 * -----------------------------------------
 */
export function filterDesigns(designs, criteria) {
  return designs
    .map((design) => ({
      ...design,
      _score: scoreDesign(design, criteria),
      _match: matchDesign(design, criteria),
    }))
    .filter((d) => d._match)
    .sort((a, b) => b._score - a._score);
}

/**
 * -----------------------------------------
 *  TAILOR MATCHING (Light-weight MVP)
 * -----------------------------------------
 * Matches based on:
 * - occasion
 * - specialization
 * - experience level
 */
export function matchTailors(tailors, { occasion, bodyShape }) {
  return tailors
    .map((tailor) => {
      let score = 0;

      // Matching specialization with occasion
      if (occasion && tailor.occasions?.includes(occasion)) score += 50;

      // Bonus: tailor good with body shape (if provided)
      if (bodyShape && tailor.bodyShapes?.includes(bodyShape)) score += 30;

      // Experience bonus
      if (tailor.experience >= 5) score += 20;

      return { ...tailor, _score: score };
    })
    .filter((t) => t._score > 0)
    .sort((a, b) => b._score - a._score);
}

/**
 * -----------------------------------------
 *  FILTER TAILORS ONLY
 * -----------------------------------------
 */
export function filterTailors(tailors, criteria) {
  return matchTailors(tailors, criteria); // alias
}

/**
 * -----------------------------------------
 *  EXPLAIN WHY THIS DESIGN WAS CHOSEN
 * -----------------------------------------
 * Helps show “Why this is recommended for you”
 * in DesignDetailsPage
 * -----------------------------------------
 */
export function explainMatch(design, { bodyShape, skinTone, occasion, size }) {
  const reasons = [];

  if (bodyShape && design.suitableShapes?.includes(bodyShape))
    reasons.push(`Matches your body shape: ${bodyShape}`);

  if (occasion && design.occasions?.includes(occasion))
    reasons.push(`Perfect for your occasion: ${occasion}`);

  if (skinTone && design.skinTones?.includes(skinTone))
    reasons.push(`Looks good with your skin tone`);

  if (size && design.sizeRange?.split("-").includes(size))
    reasons.push(`Available in your recommended size: ${size}`);

  if (reasons.length === 0) reasons.push("General good match for your style");

  return reasons;
}
