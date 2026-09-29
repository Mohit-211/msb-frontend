import FooterSection from '@/Component/Footer/Footer';
import NavSection from '@/Component/NavSection/NavSection';
import '@/styles/globals.css'
import "bootstrap/dist/css/bootstrap.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Provider } from 'react-redux';
import store from '@/redux/store';
import Head from 'next/head';
import { Image_URL } from '@/Constants/host';
export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300&display=swap" rel="stylesheet" />
        <meta property="og:title" content="MyStoryBank 2.0" />
        <meta property="og:description"
          content="My Story Bank 2.0 is a data bank of stories for the storyteller in you" />
        <meta property="og:image" content={`${Image_URL}images-1705412848910.png`} />
        <meta property="og:url" content="https://mystorybank.info" />
        {/* <meta name="description" content="Web site created using create-react-app" /> */}
      </Head>
      <Provider store={store}>


        <NavSection />

        {/* <div className="content"> */}
        <Component {...pageProps} />
        {/* <FooterSection /> */}
        {/* </div> */}
        {/* <div className="footer">
        </div> */}
      </Provider>
    </>
  )
}
