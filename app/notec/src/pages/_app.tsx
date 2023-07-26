import type { AppProps } from "next/app";
import "@/assets/styles/global.sass";
import Header from "@/components/layout/Header";
import SideMenuLayout from "@/components/layout/SideMenu";
import Footer from "@/components/layout/Footer";
import { Nunito_Sans } from "next/font/google";
import { Toaster } from "react-hot-toast";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import classNames from "classnames";
import HeaderMobile from "@/components/layout/mobile/Header";
import MobileMenu from "@/components/layout/mobile/Menu";
import { SidebarProvider } from "@/context/mobileSidebar/SidebarProvider";
import { AuthProvider } from "@/auth/useAuth";

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
      <AuthProvider>
        <ThemeProvider theme={theme}>
          <div className={baseClasses}>
            <SidebarProvider>
              {isMobile ? <HeaderMobile /> : <Header />}
              <Toaster />

              <div className="AppContentWrapper">
                {!isMobile ? <SideMenuLayout /> : <MobileMenu />}
                <div className="PageContentWrapper">
                  <Component {...pageProps} />
                </div>
              </div>
              <Footer />
            </SidebarProvider>
          </div>
        </ThemeProvider>
      </AuthProvider>
    </>
  );
}

export default MyApp;
