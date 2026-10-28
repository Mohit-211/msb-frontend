"use client";

import { useSyncExternalStore } from "react";
import { getLocalStorageItem } from "@/lib/storage";

function subscribe(onChange) {
  window.addEventListener("storage", onChange);
  return () => window.removeEventListener("storage", onChange);
}

const isSignedIn = () => Boolean(getLocalStorageItem("UserLoginToken"));

// Shows children to signed-in visitors and `fallback` to everyone else. The token lives in
// localStorage, so the server renders nothing and the browser decides; signing in or out in
// another tab updates this one.
export default function RequireAuth({ children, fallback = null }) {
  const signedIn = useSyncExternalStore(subscribe, isSignedIn, () => null);
  if (signedIn === null) return null;
  return signedIn ? children : fallback;
}
