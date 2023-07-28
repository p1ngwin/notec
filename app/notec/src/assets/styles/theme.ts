import { createTheme } from "@mui/material/styles";
import { Nunito_Sans } from "next/font/google";

export const font = Nunito_Sans({
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const theme = createTheme({
  typography: {
    fontFamily: ["Nunito Sans", "Arial", "sans-serif"].join(","),
  },
});
