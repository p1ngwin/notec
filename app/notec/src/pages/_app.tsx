import type { AppProps } from "next/app";
import "@/assets/styles/global.sass";
import Header from "@/components/layout/Header";
import SideMenuLayout from "@/components/layout/SideMenu";
import Footer from "@/components/layout/Footer";
import { Toaster } from "react-hot-toast";
import { ThemeProvider } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import classNames from "classnames";
import HeaderMobile from "@/components/layout/mobile/Header";
import MobileMenu from "@/components/layout/mobile/Menu";
import { SidebarProvider } from "@/context/mobileSidebar/SidebarProvider";
import { AuthProvider } from "@/auth/useAuth";
import { font, theme } from "@/assets/styles/theme";
import dynamic from "next/dynamic";
import { useUserStore } from "@/stores/useUserStore";
import { ColorRing } from "react-loader-spinner";
import Login from "./login";
import View from "@/components/View";

function MyApp({ Component, pageProps }: AppProps) {
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const baseClasses = classNames(font.className, { Mobile: isMobile });
  const isLoading = useUserStore((state) => state.isLoading);
  const user = useUserStore((state) => state.user);

  return (
    <>
      <ThemeProvider theme={theme}>
        <Toaster containerClassName="ToastPrimary" />
        <AuthProvider>
          <div className={baseClasses}>
            {isLoading ? (
              <View fullScreen>
                <ColorRing />
              </View>
            ) : user ? (
              <SidebarProvider>
                {isMobile ? <HeaderMobile /> : <Header />}
                <div className="AppContentWrapper">
                  {!isMobile ? <SideMenuLayout /> : <MobileMenu />}
                  <div className="PageContentWrapper">
                    <Component {...pageProps} />
                  </div>
                </div>
                <Footer />
              </SidebarProvider>
            ) : (
              <Login />
            )}
          </div>
        </AuthProvider>
      </ThemeProvider>
    </>
  );
}

export default dynamic(() => Promise.resolve(MyApp), { ssr: false });
