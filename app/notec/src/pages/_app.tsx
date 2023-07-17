import { AppProps } from "next/app";
import "@/assets/styles/global.sass";
import Header from "@/components/layout/Header";
import SideMenuLayout from "@/components/layout/SideMenu";
import Footer from "@/components/layout/Footer";
import { Nunito_Sans } from "next/font/google";
import { Toaster } from "react-hot-toast";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import classNames from "classnames";

const font = Nunito_Sans({
  subsets: ["latin"],
  weight: ["400", "700"],
});

const theme = createTheme({
  typography: {
    fontFamily: ["Nunito Sans", "Arial", "sans-serif"].join(","),
  },
});

function MyApp({ Component, pageProps }: AppProps) {
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const baseClasses = classNames(font.className, { Mobile: isMobile });

  return (
    <>
      <ThemeProvider theme={theme}>
        <div className={baseClasses}>
          <Header />
          <Toaster />
          <div className="AppContentWrapper">
            <SideMenuLayout />
            <div className="PageContentWrapper">
              <Component {...pageProps} />
            </div>
          </div>
          <Footer />
        </div>
      </ThemeProvider>
    </>
  );
}

export default MyApp;
