// The sign-in token lives in localStorage under "UserLoginToken". Everything that reads or
// changes it goes through here, so the header, RequireAuth and the API client stay in step.
import { jwtDecode } from "jwt-decode";

const TOKEN_KEY = "UserLoginToken";
// localStorage's own "storage" event only reaches other tabs; this one covers this tab.
const SESSION_EVENT = "msb:session";

// The current token, or null. An expired or unreadable token is dropped, not returned.
export function getToken() {
  if (typeof window === "undefined") return null;
  const token = localStorage.getItem(TOKEN_KEY);
  if (!token) return null;
  try {
    const { exp } = jwtDecode(token);
    if (exp && exp < Date.now() / 1000) throw new Error("expired");
    return token;
  } catch {
    localStorage.removeItem(TOKEN_KEY);
    return null;
  }
}

export function setToken(token) {
  localStorage.setItem(TOKEN_KEY, token);
  window.dispatchEvent(new Event(SESSION_EVENT));
}

export function clearToken() {
  localStorage.removeItem(TOKEN_KEY);
  window.dispatchEvent(new Event(SESSION_EVENT));
}

// For useSyncExternalStore: calls onChange when the token changes in this tab or another.
export function subscribeToSession(onChange) {
  window.addEventListener("storage", onChange);
  window.addEventListener(SESSION_EVENT, onChange);
  return () => {
    window.removeEventListener("storage", onChange);
    window.removeEventListener(SESSION_EVENT, onChange);
  };
}
