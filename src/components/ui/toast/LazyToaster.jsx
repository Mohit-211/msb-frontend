"use client";

import dynamic from "next/dynamic";

// Loads Radix Toast after the page, so it stays out of every page's first load.
// Toasts raised before it mounts wait in the store.
const Toaster = dynamic(() => import("./Toaster").then((mod) => mod.Toaster), { ssr: false });

export function LazyToaster() {
  return <Toaster />;
}
