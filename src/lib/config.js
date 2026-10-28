export const BASE_URL = (process.env.NEXT_PUBLIC_BASE_URL || '').replace(/\/+$/, '');
export const API_URL = `${BASE_URL}/api/v1`;
export const Image_URL = `${BASE_URL}/images/`;

// Payment happens off the platform: people subscribe on SendOwl, then an admin marks the
// account paid.
export const SUBSCRIBE_URL = "https://transactions.sendowl.com/products/78271145/4A5919F0/view";
