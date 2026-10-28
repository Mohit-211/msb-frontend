// globals.css comes first: component styles sit at zero specificity and must load after it.
import "@/styles/globals.css";
import NavSection from "@/Component/NavSection/NavSection";
import dynamic from "next/dynamic";
import { Provider } from "react-redux";
import store from "@/redux/store";
import Head from "next/head";
import { Image_URL } from "@/Constants/host";
// Loads after the page so Radix Toast stays out of every page's first load;
// toasts raised before it mounts wait in the store.
const Toaster = dynamic(
  () => import("@/Component/ui/toast/Toaster").then((mod) => mod.Toaster),
  { ssr: false },
);
export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta property="og:title" content="MyStoryBank 2.0" />
        <meta
          property="og:description"
          content="My Story Bank 2.0 is a data bank of stories for the storyteller in you"
        />
        <meta
          property="og:image"
          content={`${Image_URL}images-1705412848910.png`}
        />
        <meta property="og:url" content="https://mystorybank.info" />
      </Head>
      <Provider store={store}>
        <NavSection />
        <Component {...pageProps} />
        <Toaster />
      </Provider>
    </>
  );
}
