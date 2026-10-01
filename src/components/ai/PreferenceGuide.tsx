"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/Button";
import { trackEvent } from "@/lib/analytics";
import type { RecommendationInput, RecommendationResult } from "@/lib/ai/types";
import { getLocalRecommendations } from "@/lib/ai/recommend";
import styles from "./PreferenceGuide.module.css";

const moods = ["Relaxed", "Social", "Creative", "Focused", "Restful"];
const formats = ["Flower", "Edibles", "Vaporizers", "Tinctures"];
const aromas = ["Citrus", "Earthy", "Spicy", "Floral", "Herbal"];

export function PreferenceGuide() {
  const [mood, setMood] = useState<string[]>([]);
  const [format, setFormat] = useState<string[]>([]);
  const [aroma, setAroma] = useState<string[]>([]);
  const [result, setResult] = useState<RecommendationResult | null>(null);

  const input: RecommendationInput = useMemo(
    () => ({ mood, format, aroma }),
    [mood, format, aroma],
  );

  function toggle(list: string[], value: string, setter: (next: string[]) => void) {
    setter(list.includes(value) ? list.filter((item) => item !== value) : [...list, value]);
  }

  return (
    <form
      className={styles.wrap}
      onSubmit={(e) => {
        e.preventDefault();
        trackEvent("ai_guide_start");
        setResult(getLocalRecommendations(input));
      }}
    >
      <fieldset className={styles.fieldset}>
        <legend className={styles.legend}>Preferred mood or setting</legend>
        <div className={styles.options}>
          {moods.map((item) => (
            <label key={item} className={styles.option}>
              <input
                type="checkbox"
                checked={mood.includes(item)}
                onChange={() => toggle(mood, item, setMood)}
              />
              {item}
            </label>
          ))}
        </div>
      </fieldset>

      <fieldset className={styles.fieldset}>
        <legend className={styles.legend}>Product formats</legend>
        <div className={styles.options}>
          {formats.map((item) => (
            <label key={item} className={styles.option}>
              <input
                type="checkbox"
                checked={format.includes(item)}
                onChange={() => toggle(format, item, setFormat)}
              />
              {item}
            </label>
          ))}
        </div>
      </fieldset>

      <fieldset className={styles.fieldset}>
        <legend className={styles.legend}>Aroma leanings</legend>
        <div className={styles.options}>
          {aromas.map((item) => (
            <label key={item} className={styles.option}>
              <input
                type="checkbox"
                checked={aroma.includes(item)}
                onChange={() => toggle(aroma, item, setAroma)}
              />
              {item}
            </label>
          ))}
        </div>
      </fieldset>

      <p className={styles.note}>
        Educational suggestions only. Individual experiences vary. This is not
        medical advice and does not guarantee effects.
      </p>

      <Button type="submit" variant="primary">
        Get Suggestions
      </Button>

      {result ? (
        <div className={styles.result} aria-live="polite">
          <h3>{result.headline}</h3>
          <p>{result.summary}</p>
          <ul>
            {result.suggestions.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <p className={styles.note}>{result.disclaimer}</p>
        </div>
      ) : null}
    </form>
  );
}
