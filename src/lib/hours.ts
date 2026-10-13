import type { StoreHours, Weekday } from "@/types/content";

const DAY_CODE: Record<Weekday, string> = {
  Monday: "Mo",
  Tuesday: "Tu",
  Wednesday: "We",
  Thursday: "Th",
  Friday: "Fr",
  Saturday: "Sa",
  Sunday: "Su",
};

/** Guest-facing range, for example 8am-10pm. Hyphen is a time range, not a dash. */
export function formatHoursRange(opens: string, closes: string) {
  return `${formatClock(opens)}-${formatClock(closes)}`;
}

function formatClock(value: string) {
  const match = /^(\d{2}):(\d{2})$/.exec(value);
  if (!match) return value;
  const hours = Number(match[1]);
  const minutes = match[2];
  const suffix = hours >= 12 ? "pm" : "am";
  const hour12 = hours % 12 || 12;
  if (minutes === "00") return `${hour12}${suffix}`;
  return `${hour12}:${minutes}${suffix}`;
}

export function groupStoreHours(hours: readonly StoreHours[]) {
  const groups: { days: Weekday[]; opens: string; closes: string }[] = [];
  for (const hour of hours) {
    const last = groups[groups.length - 1];
    if (last && last.opens === hour.opens && last.closes === hour.closes) {
      last.days.push(hour.day);
    } else {
      groups.push({ days: [hour.day], opens: hour.opens, closes: hour.closes });
    }
  }
  return groups;
}

/** schema.org openingHours text, derived from the same opens/closes as the page. */
export function openingHoursText(hours: readonly StoreHours[]) {
  return groupStoreHours(hours).map((group) => {
    const codes = group.days.map((day) => DAY_CODE[day]);
    const days =
      codes.length > 1 ? `${codes[0]}-${codes[codes.length - 1]}` : codes[0];
    return `${days} ${group.opens}-${group.closes}`;
  });
}
