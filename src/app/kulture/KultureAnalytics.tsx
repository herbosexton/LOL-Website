"use client";

import { useEffect } from "react";
import { trackEvent } from "@/lib/analytics";

export function KultureAnalytics() {
  useEffect(() => {
    trackEvent("kulture_view");
  }, []);
  return null;
}
