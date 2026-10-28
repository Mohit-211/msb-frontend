// globals.css comes first: component styles sit at zero specificity and must load after it.
import "@/styles/globals.css";
import SiteHeader from "@/components/layout/SiteHeader";
import { LazyToaster } from "@/components/ui/toast/LazyToaster";
import { Image_URL } from "@/lib/config";
import StoreProvider from "@/store/StoreProvider";

const description = "My Story Bank 2.0 is a data bank of stories for the storyteller in you";

export const metadata = {
  metadataBase: new URL("https://mystorybank.info"),
  title: { default: "MyStoryBank", template: "%s | MyStoryBank" },
  description,
  // Served from public/: this icon's PNG data isn't RGBA, so Next can't process it from app/.
  icons: { icon: "/favicon.ico" },
  openGraph: {
    title: "MyStoryBank 2.0",
    description,
    url: "https://mystorybank.info",
    images: [`${Image_URL}images-1705412848910.png`],
  },
};

export default function RootLayout({ children }) {
  return (
    // globals.css scrolls smoothly within a page; this tells Next to jump, not glide, on route changes
    <html lang="en" data-scroll-behavior="smooth">
      <body>
        <StoreProvider>
          <SiteHeader />
          {children}
          <LazyToaster />
        </StoreProvider>
      </body>
    </html>
  );
}
