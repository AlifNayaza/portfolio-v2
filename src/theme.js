import { createTheme } from '@mui/material/styles';

// Define available themes with complementary color combinations - adjusted for better readability
export const themeOptions = {
  redYellow: {
    name: 'Red & Yellow',
    primary: {
      light: '#ff6659',
      main: '#d32f2f',
      dark: '#9a0007',
    },
    secondary: {
      light: '#ffc107', // Darkened from #fff176 for better readability
      main: '#ffc107',  // Changed from #ffd54f
      dark: '#c8a415',
    },
  },
  blueOrange: {
    name: 'Blue & Orange',
    primary: {
      light: '#63a4ff',
      main: '#1976d2',
      dark: '#004ba0',
    },
    secondary: {
      light: '#f57c00', // Darkened from #ffb74d for better readability
      main: '#ff9800',
      dark: '#c66900',
    },
  },
  greenPurple: {
    name: 'Green & Purple',
    primary: {
      light: '#66bb6a', // Darkened from #80e27e for better readability
      main: '#4caf50',
      dark: '#087f23',
    },
    secondary: {
      light: '#9575cd', // Darkened from #d1c4e9 for better readability
      main: '#7e57c2',
      dark: '#4d2c91',
    },
  },
  purpleTeal: {
    name: 'Purple & Teal',
    primary: {
      light: '#9c64fb', // Darkened from #bb86fc for better readability
      main: '#6200ee',
      dark: '#3700b3',
    },
    secondary: {
      light: '#26c6da', // Darkened from #88ffff for better readability
      main: '#00bcd4',
      dark: '#008ba3',
    },
  },
  // New theme 1: Amber & Indigo
  amberIndigo: {
    name: 'Amber & Indigo',
    primary: {
      light: '#ffab00', // Darkened from #ffecb3 for better readability
      main: '#ffc107',
      dark: '#ff8f00',
    },
    secondary: {
      light: '#5c6bc0', // Darkened from #9fa8da for better readability
      main: '#3f51b5',
      dark: '#1a237e',
    },
  },
  // New theme 2: Teal & Coral
  tealCoral: {
    name: 'Teal & Coral',
    primary: {
      light: '#4db6ac', // Darkened from #80cbc4 for better readability
      main: '#009688',
      dark: '#00695c',
    },
    secondary: {
      light: '#f4511e', // Darkened from #ff8a65 for better readability
      main: '#ff5722',
      dark: '#c41c00',
    },
  },
};

const getTheme = (mode, themeColor = 'redYellow') => {
  const selectedTheme = themeOptions[themeColor] || themeOptions.redYellow;
  
  return createTheme({
    palette: {
      mode,
      primary: {
        main: mode === 'light' ? selectedTheme.primary.main : selectedTheme.primary.light,
        dark: selectedTheme.primary.dark,
        light: selectedTheme.primary.light,
        contrastText: '#ffffff',
      },
      secondary: {
        main: mode === 'light' ? selectedTheme.secondary.main : selectedTheme.secondary.light,
        dark: selectedTheme.secondary.dark,
        light: selectedTheme.secondary.light,
        contrastText: mode === 'light' ? '#000000' : '#000000',
      },
      background: {
        default: mode === 'light' ? '#ffffff' : '#121212',
        paper: mode === 'light' ? '#f5f5f5' : '#1e1e1e',
      },
      text: {
        primary: mode === 'light' ? 'rgba(0, 0, 0, 0.87)' : 'rgba(255, 255, 255, 0.87)',
        secondary: mode === 'light' ? 'rgba(0, 0, 0, 0.6)' : 'rgba(255, 255, 255, 0.6)',
      },
    },
    typography: {
      fontFamily: '"DM Sans", "Arial", sans-serif',
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 8,
            textTransform: 'none',
            fontWeight: 500,
          },
          containedPrimary: {
            '&:hover': {
              backgroundColor: selectedTheme.primary.dark,
            },
          },
          containedSecondary: {
            '&:hover': {
              backgroundColor: selectedTheme.secondary.dark,
            },
            color: mode === 'light' ? '#000000' : '#000000', // Ensure text on secondary buttons is visible
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: 12,
            boxShadow: mode === 'light'
              ? '0 2px 8px rgba(0, 0, 0, 0.1)'
              : '0 2px 8px rgba(0, 0, 0, 0.5)',
          },
        },
      },
      MuiChip: {
        styleOverrides: {
          root: {
            fontWeight: 500,
          },
        },
      },
    },
  });
};

export default getTheme;