/**
 * CMS/backend-ready recommendation contracts.
 * Replace getLocalRecommendations with an API-backed provider later.
 */
export interface RecommendationInput {
  mood: string[];
  format: string[];
  aroma: string[];
}

export interface RecommendationResult {
  headline: string;
  summary: string;
  suggestions: string[];
  disclaimer: string;
}

export interface RecommendationProvider {
  recommend(input: RecommendationInput): Promise<RecommendationResult> | RecommendationResult;
}
