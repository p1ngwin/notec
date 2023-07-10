import { AppProps } from "next/app";
import { useEffect, useState } from "react";

import "../assets/styles/global.sass";
import { Nunito_Sans } from "next/font/google";

const font = Nunito_Sans({
  subsets: ["latin"],
  weight: ["400", "700"],
});

function App({ Component, pageProps }: AppProps) {
  const [isServer, setIsServer] = useState(true);
  useEffect(() => {
    setIsServer(false);
  }, []);
  if (isServer) return null;

  return (
    <div suppressHydrationWarning>
      {typeof window === "undefined" ? null : (
        <main className={font.className}>
          <Component {...pageProps} />
        </main>
      )}
    </div>
  );
}
export default App;
