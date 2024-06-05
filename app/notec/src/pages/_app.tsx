import type { AppProps } from 'next/app';
import '@/assets/styles/global.sass';
import SideMenuLayout from '@/components/layout/SideMenu';
import { Toaster } from 'react-hot-toast';
import { ThemeProvider } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import classNames from 'classnames';
import HeaderMobile from '@/components/layout/mobile/Header';
import MobileMenu from '@/components/layout/mobile/Menu';
import { SidebarProvider } from '@/context/mobileSidebar/SidebarProvider';
import { AuthProvider } from '@/auth/useAuth';
import { font, theme } from '@/assets/styles/theme';
import dynamic from 'next/dynamic';
import { useUserStore } from '@/stores/useUserStore';
import { appWithTranslation } from 'next-i18next';
import { useLayoutStore } from '@/stores/useLayoutStore';
import { useEffect } from 'react';
import Loader from '@/components/Loader';

function MyApp({ Component, pageProps }: AppProps) {
  const isMobile = useMediaQuery(theme.breakpoints.between(0, 'sm'));

  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));

  const { setIsDesktop, setIsMobile, setIsTablet } = useLayoutStore();

  useEffect(() => {
    if (isMobile) setIsMobile();
    else if (isTablet) setIsTablet();
    else setIsDesktop();
  }, [isMobile, isTablet, setIsDesktop, setIsMobile, setIsTablet]);

  const mobile = useLayoutStore((state) => state.isMobile);

  const baseClasses = classNames(font.className, { Mobile: isMobile });
  const isLoading = useUserStore((state) => state.isLoading);

  return (
    <>
      <ThemeProvider theme={theme}>
        <Toaster
          containerClassName="ToastPrimary"
          toastOptions={{ className: 'ToastBase' }}
        />
        <AuthProvider>
          <div className={baseClasses}>
            {isLoading ? (
              <Loader />
            ) : (
              <SidebarProvider>
                {mobile && <HeaderMobile />}
                <div className="AppContentWrapper">
                  {!mobile ? <SideMenuLayout /> : <MobileMenu />}
                  <div className="PageContentWrapper">
                    <Component {...pageProps} />
                  </div>
                </div>
              </SidebarProvider>
            )}
          </div>
        </AuthProvider>
      </ThemeProvider>
    </>
  );
}

export default dynamic(() => Promise.resolve(appWithTranslation(MyApp)), {
  ssr: false,
});
