import NavSection from "@/Component/NavSection/NavSection";
// Order matters: our base and the Bootstrap bridge must come after Bootstrap.
import "bootstrap/dist/css/bootstrap.css";
import "@/styles/globals.css";
import "@/styles/legacy.css";
import { Provider } from "react-redux";
import store from "@/redux/store";
import Head from "next/head";
import { Image_URL } from "@/Constants/host";
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
      </Provider>
    </>
  );
}
