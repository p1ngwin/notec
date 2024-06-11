import { createTheme } from '@mui/material/styles';
import { Nunito_Sans } from 'next/font/google';

export const font = Nunito_Sans({
  subsets: ['latin'],
  weight: ['400', '700'],
});

export const theme = createTheme({
  typography: {
    fontFamily: ['Inter', 'Nunito Sans', 'Arial', 'sans-serif'].join(','),
  },
  components: {
    MuiInputBase: {
      styleOverrides: {
        input: {
          '&:-webkit-autofill': {
            transitionDelay: '9999s',
            transitionProperty: 'background-color, color',
            fontSize: 'inherit!important',
          },
        },
      },
    },
  },
});
