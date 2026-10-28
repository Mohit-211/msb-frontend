// API calls made on the server, from Server Components. Browser calls live in api.js.
import https from "node:https";
import axios from "axios";
import { cache } from "react";
import { API_URL } from "./config";

// Certificate checks stay off for these requests, as they were before the App Router move.
// The audit lists this as its first security fix; drop the agent once the API's certificate
// is confirmed valid.
const serverApi = axios.create({
  baseURL: API_URL,
  httpsAgent: new https.Agent({ rejectUnauthorized: false }),
});

// cache() lets generateMetadata and the page share one request per render.
export const getStory = cache(async (id) => {
  try {
    const response = await serverApi.post(`/blog/${encodeURIComponent(id)}`);
    return response.data;
  } catch (error) {
    // A missing story renders the 404 page; only unexpected failures are worth logging.
    if (error.response?.status !== 404) {
      console.error("Error fetching story:", error.message);
    }
    return null;
  }
});
