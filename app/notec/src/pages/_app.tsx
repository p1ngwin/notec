import { AppProps } from "next/app";
import "@/assets/styles/global.sass";
import Header from "@/components/layout/Header";
import SideMenuLayout from "@/components/layout/SideMenu";
import Footer from "@/components/layout/Footer";
import { Nunito_Sans } from "next/font/google";

const font = Nunito_Sans({
  subsets: ["latin"],
  weight: ["400", "700"],
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <div className={font.className}>
        <Header />
        <div className="AppContentWrapper">
          <SideMenuLayout />
          <div className="PageContentWrapper">
            <Component {...pageProps} />
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}

export default MyApp;
