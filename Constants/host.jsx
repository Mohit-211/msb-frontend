export const BASE_URL = (process.env.NEXT_PUBLIC_BASE_URL || '').replace(/\/+$/, '');
export const API_URL = `${BASE_URL}/api/v1`;
export const Image_URL = `${BASE_URL}/images/`;
export const Video_URL = `${BASE_URL}/videos/`;
