// "2 days ago", "yesterday", "in 3 hours": the browser's Intl.RelativeTimeFormat, no library.
const UNITS = [
  ["year", 60 * 60 * 24 * 365],
  ["month", 60 * 60 * 24 * 30],
  ["week", 60 * 60 * 24 * 7],
  ["day", 60 * 60 * 24],
  ["hour", 60 * 60],
  ["minute", 60],
];

const relativeTime = new Intl.RelativeTimeFormat("en", { numeric: "auto" });

export function formatRelativeTime(date, now = Date.now()) {
  const time = new Date(date).getTime();
  if (Number.isNaN(time)) return "";
  const seconds = (time - now) / 1000;
  for (const [unit, size] of UNITS) {
    if (Math.abs(seconds) >= size) return relativeTime.format(Math.round(seconds / size), unit);
  }
  return relativeTime.format(Math.round(seconds), "second");
}
