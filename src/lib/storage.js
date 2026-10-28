// The login token lives in localStorage under "UserLoginToken".
import { jwtDecode } from "jwt-decode";

const isJwtToken = (token) => {
  const jwtPattern = /^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_.+/=]*$/;
  return jwtPattern.test(token);
};
export const getLocalStorageItem = (key) => {
  if (typeof window !== "undefined") {
    const item = localStorage.getItem(key);
    if (item && isJwtToken(item)) {
      const decoded = jwtDecode(item);
      const expirationTime = decoded.exp;
      const currentTime = Math.floor(Date.now() / 1000);
      if (expirationTime && expirationTime < currentTime) {
        // Token has expired, set the item to null
        localStorage.setItem(key, null);
        return null;
      }
      return item;
    }
  }
  return null;
};
export const removeLocalStorageItem = (key) => {
  if (typeof window !== "undefined") {
    return localStorage.removeItem(key);
  }
  return null;
};
