import React, { useState, useEffect, createContext, useMemo } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Container, Box } from '@mui/material';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import MusicPlayer from './components/MusicPlayer';
import ScrollToTop from './components/ScrollToTop';

// Pages
import Home from './pages/Home';
import About from './pages/About';
import Projects from './pages/Projects';
import Contacts from './pages/Contacts';
import BehindStory from './pages/BehindStory';

// Import the theme function and options
import getTheme, { themeOptions } from './theme';

// Create a theme context to manage theme mode and color
export const ThemeContext = createContext();

function App() {
  // State to manage active page
  const [activePage, setActivePage] = useState('home');
  
  // State for theme mode (light/dark)
  const [mode, setMode] = useState('light');
  
  // State for theme color scheme
  const [themeColor, setThemeColor] = useState('red');
  
  // Theme toggle handler
  const toggleTheme = () => {
    setMode(prevMode => (prevMode === 'light' ? 'dark' : 'light'));
  };
  
  // Theme color change handler
  const changeThemeColor = (color) => {
    setThemeColor(color);
  };
  
  // Get the custom theme based on the current mode and color
  const theme = useMemo(() => getTheme(mode, themeColor), [mode, themeColor]);
  
  // Theme context value with memoization to prevent unnecessary re-renders
  const themeContextValue = useMemo(() => ({
    mode,
    toggleTheme,
    themeColor,
    changeThemeColor
  }), [mode, themeColor]);
  
  // Scroll to top whenever active page changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [activePage]);
  
  // Save user preferences to localStorage
  useEffect(() => {
    localStorage.setItem('themePreferences', JSON.stringify({ mode, themeColor }));
  }, [mode, themeColor]);
  
  // Load user preferences from localStorage on initial load
  useEffect(() => {
    const savedPreferences = localStorage.getItem('themePreferences');
    if (savedPreferences) {
      const { mode: savedMode, themeColor: savedColor } = JSON.parse(savedPreferences);
      setMode(savedMode);
      // Only set the color if it exists in our themeOptions
      if (savedColor && themeOptions[savedColor]) {
        setThemeColor(savedColor);
      }
    }
  }, []);

  // Render the appropriate page based on activePage state
  const renderPage = () => {
    switch (activePage) {
      case 'home':
        return <Home setActivePage={setActivePage} />;
      case 'about':
        return <About />;
      case 'projects':
        return <Projects />;
      case 'contacts':
        return <Contacts />;
      case 'behindStory':
        return <BehindStory />;
      default:
        return <Home setActivePage={setActivePage} />;
    }
  };

  return (
    <ThemeContext.Provider value={themeContextValue}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box sx={{
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh'
        }}>
          <Navbar activePage={activePage} setActivePage={setActivePage} />
          {/* Set maxWidth to false to use full width */}
          <Container component="main" maxWidth={false} sx={{ flexGrow: 1, py: 4 }}>
            {renderPage()}
          </Container>
          <MusicPlayer />
          <Footer />
          <ScrollToTop />
        </Box>
      </ThemeProvider>
    </ThemeContext.Provider>
  );
}

export default App;