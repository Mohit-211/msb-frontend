import DOMPurify from "dompurify";

// Stories and AI replies arrive as HTML. The API cleans what it stores; this cleans it again
// in the browser before rendering, so nothing in a story can run script. Story text only ever
// renders in the browser, so there is nothing to clean on the server.
export function sanitizeHtml(html) {
  if (typeof window === "undefined" || !html) return "";
  return DOMPurify.sanitize(String(html));
}
