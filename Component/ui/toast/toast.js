// A small store behind toast(): any module can show a message, and <Toaster />
// (mounted once in _app) renders them with Radix Toast.
//
//   toast.success("Profile updated");
//   toast.error(error?.response?.data?.message || "Something went wrong.");

const EXIT_ANIMATION_MS = 200;
const DEFAULT_DURATION_MS = 4000;

let toasts = [];
let nextId = 1;
const listeners = new Set();

function emit() {
  listeners.forEach((listener) => listener());
}

export function subscribe(listener) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function getToasts() {
  return toasts;
}

function show(variant, message, { duration = DEFAULT_DURATION_MS } = {}) {
  if (!message) return undefined;
  const id = nextId++;
  toasts = [...toasts, { id, variant, message, duration, open: true }];
  emit();
  return id;
}

export function dismiss(id) {
  toasts = toasts.map((item) => (item.id === id ? { ...item, open: false } : item));
  emit();
  setTimeout(() => {
    toasts = toasts.filter((item) => item.id !== id);
    emit();
  }, EXIT_ANIMATION_MS);
}

export const toast = Object.assign((message, options) => show("info", message, options), {
  success: (message, options) => show("success", message, options),
  error: (message, options) => show("error", message, options),
  warning: (message, options) => show("warning", message, options),
  info: (message, options) => show("info", message, options),
  dismiss,
});
