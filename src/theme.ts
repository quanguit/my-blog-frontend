'use client';

import { Components, createTheme } from '@mui/material/styles';
import { Montserrat } from 'next/font/google';

const montserrat = Montserrat({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin'],
  display: 'swap',
});

const commonComponents: Components = {
  MuiTypography: {
    styleOverrides: {
      root: {
        fontWeight: 500,
      },
    },
  },
  MuiChip: {
    styleOverrides: {
      root: {
        borderRadius: 8,
        fontWeight: 500,
      },
    },
  },
  MuiContainer: {
    defaultProps: {
      maxWidth: 'lg',
    },
  },
};

export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#4B6BFB',
    },
    text: {
      primary: '#181A2A',
    },
    background: {
      footer: '#E8E8EA',
    },
  },
  typography: {
    fontFamily: montserrat.style.fontFamily,
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#FFFFFF',
        },
      },
      defaultProps: {
        elevation: 0,
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          color: '#181A2A',
        },
        contained: {
          color: '#FFFFFF',
        },
      },
    },
    MuiSvgIcon: {
      styleOverrides: {
        root: {
          color: '#181A2A',
        },
      },
    },
    ...commonComponents,
  },
});

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#4B6BFB',
    },
    background: {
      default: '#181A2A',
      paper: '#1F213A',
      footer: '#141624',
    },
  },
  typography: {
    fontFamily: montserrat.style.fontFamily,
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#181A2A',
        },
      },
      defaultProps: {
        elevation: 0,
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
        },
      },
    },
    ...commonComponents,
  },
});
