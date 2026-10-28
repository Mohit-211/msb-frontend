import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./rootReducer";

// A new store per browser session; StoreProvider calls this once. The server renders
// requests in parallel, so a single module-level store would be shared between users.
export function makeStore() {
  return configureStore({
    reducer: {
      rootReducer,
    },
  });
}
