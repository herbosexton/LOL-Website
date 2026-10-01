import type { RecommendationInput, RecommendationResult } from "@/lib/ai/types";

export function getLocalRecommendations(
  input: RecommendationInput,
): RecommendationResult {
  const moods = input.mood.length ? input.mood.join(", ") : "an open-minded";
  const formats = input.format.length ? input.format.join(", ") : "a few formats";
  const aromas = input.aroma.length ? input.aroma.join(", ") : "balanced aromas";

  const suggestions = [
    `Browse ${formats} and notice how onset and duration differ.`,
    `Look for products with ${aromas.toLowerCase()} notes that match your curiosity.`,
    `Keep your ${moods.toLowerCase()} setting in mind and start with a low, intentional amount.`,
  ];

  return {
    headline: "A starting point for your exploration",
    summary:
      "Based on your preferences, here are educational suggestions to guide your next conversation with our team or menu browse.",
    suggestions,
    disclaimer:
      "Individual experiences vary. These suggestions are informational only and are not medical advice or guaranteed outcomes.",
  };
}
