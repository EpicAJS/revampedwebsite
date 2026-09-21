/** Pure time helpers — safe to import from server and client components. */

export function parseDuration(label: string) {
  const [minutes, seconds] = label.split(":").map(Number);
  return (minutes || 0) * 60 + (seconds || 0);
}

export function formatTime(seconds: number) {
  const safe = Math.max(0, Math.floor(seconds));
  const m = Math.floor(safe / 60);
  const s = safe % 60;
  return `${m}:${String(s).padStart(2, "0")}`;
}
