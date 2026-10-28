import { useSyncExternalStore } from "react";
import { getToken, subscribeToSession } from "@/lib/session";

// The sign-in token, kept current when the user signs in or out (in any tab) or the API
// ends the session. undefined during the server render and hydration, then the token or null.
export function useToken() {
  return useSyncExternalStore(subscribeToSession, getToken, () => undefined);
}
