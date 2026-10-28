"use client";

import { useToken } from "@/hooks/useToken";

// Shows children to signed-in visitors and `fallback` to everyone else. The token lives in
// localStorage, so the server renders nothing and the browser decides. Signing in or out (in
// this tab or another) or the API ending the session switches between the two.
export default function RequireAuth({ children, fallback = null }) {
  const token = useToken();
  if (token === undefined) return null;
  return token ? children : fallback;
}
