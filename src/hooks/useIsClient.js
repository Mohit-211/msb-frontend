import { useSyncExternalStore } from "react";

const subscribe = () => () => {};

// false during the server render and hydration, true once the page runs in the browser.
// For UI that depends on localStorage or other browser-only state.
export function useIsClient() {
  return useSyncExternalStore(subscribe, () => true, () => false);
}
