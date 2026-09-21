"use client";

import { useSyncExternalStore } from "react";

function greetingForNow() {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 18) return "Good afternoon";
  return "Good evening";
}

// The clock isn't something we subscribe to — the snapshot is read once at
// hydration and stays put for the visit.
function subscribe() {
  return () => {};
}

/**
 * Reads local time through an external store so the server can render a
 * neutral greeting without tripping a hydration mismatch.
 */
export default function Greeting() {
  const greeting = useSyncExternalStore(
    subscribe,
    greetingForNow,
    () => "Welcome"
  );

  return <>{greeting}</>;
}
