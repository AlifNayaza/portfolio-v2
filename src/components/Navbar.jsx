import React, { useContext, useState, memo } from 'react';
import { 
  AppBar, Toolbar, Typography, Button, IconButton, Box,
  Switch, useMediaQuery, useTheme, Drawer, List, ListItemText,
  ListItemButton, Container, Fade, Tooltip, Menu, MenuItem
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import ColorLensIcon from '@mui/icons-material/ColorLens';
import { ThemeContext } from '../App';
import { themeOptions } from '../theme';

// Navbar items array
const NAV_ITEMS = [
  { label: 'Home', id: 'home' },
  { label: 'About', id: 'about' },
  { label: 'Projects', id: 'projects' },
  { label: 'Contacts', id: 'contacts' },
  { label: 'Story', id: 'behindStory' }
];

const ThemeToggle = memo(({ mode, toggleTheme, theme }) => (
  <Box sx={{ 
    display: 'flex', 
    alignItems: 'center',
    bgcolor: mode === 'dark' ? 'rgba(40, 40, 45, 0.9)' : 'rgba(240, 240, 245, 0.9)',
    borderRadius: 12,
    px: 1,
    py: 0.5,
    border: `1px solid ${theme.palette.divider}`,
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    transition: 'all 0.3s ease'
  }}>
    <LightModeIcon 
      fontSize="small" 
      sx={{ 
        color: mode === 'light' ? theme.palette.secondary.main : 'rgba(255, 255, 255, 0.7)',
        transition: 'color 0.3s ease'
      }}
    />
    <Switch 
      size="small"
      checked={mode === 'dark'} 
      onChange={toggleTheme} 
      color="secondary" 
    />
    <DarkModeIcon 
      fontSize="small" 
      sx={{ 
        color: mode === 'dark' ? theme.palette.secondary.main : 'rgba(0, 0, 0, 0.7)',
        transition: 'color 0.3s ease'
      }}
    />
  </Box>
));

const ThemeColorSelector = memo(({ currentThemeColor, changeThemeColor, theme }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  
  const handleClose = () => {
    setAnchorEl(null);
  };
  
  const handleThemeChange = (themeColor) => {
    changeThemeColor(themeColor);
    handleClose();
  };
  
  return (
    <>
      <Tooltip 
        title="Change color theme" 
        placement="bottom" 
        TransitionComponent={Fade} 
        enterDelay={300}
      >
        <IconButton
          id="theme-color-button"
          aria-controls={open ? 'theme-color-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}
          sx={{ 
            ml: 1.5,
            bgcolor: theme.palette.mode === 'dark' ? 'rgba(50, 50, 55, 0.9)' : 'rgba(240, 240, 245, 0.9)',
            border: `1px solid ${theme.palette.divider}`,
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            transition: 'all 0.2s ease',
            p: 1,
            '&:hover': {
              bgcolor: theme.palette.mode === 'dark' ? 'rgba(70, 70, 75, 0.9)' : 'rgba(220, 220, 225, 0.9)',
              transform: 'scale(1.05)'
            }
          }}
        >
          <ColorLensIcon sx={{ 
            color: theme.palette.primary.main
          }} />
        </IconButton>
      </Tooltip>
      
      <Menu
        id="theme-color-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'theme-color-button',
        }}
        PaperProps={{
          elevation: 3,
          sx: {
            mt: 1.5,
            minWidth: 150,
            borderRadius: 2,
            border: `1px solid ${theme.palette.divider}`,
          }
        }}
      >
        {Object.keys(themeOptions).map((themeKey) => (
          <MenuItem 
            key={themeKey}
            onClick={() => handleThemeChange(themeKey)}
            selected={currentThemeColor === themeKey}
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1.5,
              position: 'relative',
              py: 1.2,
              '&.Mui-selected': {
                bgcolor: theme.palette.mode === 'dark' 
                  ? 'rgba(255, 255, 255, 0.08)'
                  : 'rgba(0, 0, 0, 0.05)',
                '&:hover': {
                  bgcolor: theme.palette.mode === 'dark' 
                    ? 'rgba(255, 255, 255, 0.12)'
                    : 'rgba(0, 0, 0, 0.08)',
                }
              },
            }}
          >
            <Box 
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 0.5
              }}
            >
              <Box 
                sx={{
                  width: 20,
                  height: 20,
                  borderRadius: '50%',
                  bgcolor: themeOptions[themeKey].primary.main,
                  border: `2px solid ${theme.palette.background.paper}`,
                  boxShadow: `0 0 0 1px ${theme.palette.divider}`,
                }}
              />
              <Box 
                sx={{
                  width: 20,
                  height: 20,
                  borderRadius: '50%',
                  bgcolor: themeOptions[themeKey].secondary.main,
                  border: `2px solid ${theme.palette.background.paper}`,
                  boxShadow: `0 0 0 1px ${theme.palette.divider}`,
                  ml: -1
                }}
              />
            </Box>
            <Typography variant="body2">
              {themeOptions[themeKey].name}
            </Typography>
          </MenuItem>
        ))}
      </Menu>
    </>
  );
});

const NavButton = memo(({ item, activePage, handlePageChange, mode, theme }) => (
  <Tooltip 
    title={item.label} 
    placement="bottom" 
    TransitionComponent={Fade} 
    enterDelay={300}
  >
    <Button 
      onClick={() => handlePageChange(item.id)}
      sx={{ 
        mx: 0.5,
        px: 1.5,
        py: 0.8,
        borderRadius: 2,
        position: 'relative',
        fontWeight: activePage === item.id ? 700 : 500,
        color: activePage === item.id 
          ? theme.palette.secondary.main 
          : mode === 'light' ? 'rgba(0, 0, 0, 0.9)' : 'rgba(255, 255, 255, 0.9)',
        transition: 'all 0.2s ease-in-out',
        overflow: 'hidden',
        '&:hover': {
          bgcolor: mode === 'dark' ? 'rgba(80, 80, 80, 0.8)' : 'rgba(180, 180, 180, 0.8)',
          transform: 'translateY(-2px)',
        },
        '&::before': activePage === item.id ? {
          content: '""',
          position: 'absolute',
          bottom: 0,
          left: '0',
          width: '100%',
          height: '3px',
          background: `linear-gradient(90deg, transparent, ${theme.palette.secondary.main}, transparent)`,
          animation: 'pulse 1.5s infinite',
          '@keyframes pulse': {
            '0%': { opacity: 0.6 },
            '50%': { opacity: 1 },
            '100%': { opacity: 0.6 }
          }
        } : {},
      }}
    >
      {item.label}
    </Button>
  </Tooltip>
));

const MobileNavItem = memo(({ item, activePage, handlePageChange, index, drawerOpen, theme }) => (
  <Fade 
    in={drawerOpen} 
    style={{ transitionDelay: drawerOpen ? `${index * 40}ms` : '0ms' }}
  >
    <Box
      sx={{
        my: 0.5,
        mx: 1.5,
        borderRadius: 2,
        overflow: 'hidden',
        transition: 'all 0.3s ease'
      }}
    >
      <ListItemButton
        onClick={() => handlePageChange(item.id)}
        selected={activePage === item.id}
        sx={{
          borderRadius: 2,
          py: 1,
          transition: 'all 0.2s ease',
          '&.Mui-selected': {
            bgcolor: theme.palette.primary.main,
            color: '#ffffff',
            boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
            '&:hover': {
              bgcolor: theme.palette.primary.dark
            }
          },
          '&:hover': {
            transform: 'translateX(4px)'
          }
        }}
      >
        <ListItemText 
          primary={item.label} 
          primaryTypographyProps={{ 
            fontSize: '1rem',
            fontWeight: activePage === item.id ? 700 : 500,
            color: activePage === item.id ? '#ffffff' : theme.palette.text.primary
          }}
        />
      </ListItemButton>
    </Box>
  </Fade>
));

const Navbar = ({ activePage, setActivePage }) => {
  const { mode, toggleTheme, themeColor, changeThemeColor } = useContext(ThemeContext);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [drawerOpen, setDrawerOpen] = useState(false);
  
  const handleDrawerToggle = () => setDrawerOpen(!drawerOpen);
  const handlePageChange = (page) => {
    setActivePage(page);
    setDrawerOpen(false);
  };

  // Make the site title clickable to navigate to home
  const handleTitleClick = () => {
    setActivePage('home');
  };

  const drawerContent = (
    <Box
      sx={{ 
        width: 280, 
        pt: 4,
        pb: 6,
        height: '100%',
        background: theme.palette.background.paper,
        borderLeft: `1px solid ${theme.palette.divider}`,
        display: 'flex',
        flexDirection: 'column'
      }}
      role="presentation"
    >
      <Typography 
        variant="h5" 
        sx={{ 
          textAlign: 'center', 
          mb: 4, 
          fontWeight: 'bold',
          background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          letterSpacing: '0.5px',
          cursor: 'pointer'
        }}
        onClick={handleTitleClick}
      >
        Alif Haikal Nayaza
      </Typography>
      
      <List sx={{ flexGrow: 1 }}>
        {NAV_ITEMS.map((item, index) => (
          <MobileNavItem 
            key={item.id}
            item={item}
            activePage={activePage}
            handlePageChange={handlePageChange}
            index={index}
            drawerOpen={drawerOpen}
            theme={theme}
          />
        ))}
      </List>
      
      <Box sx={{ 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        gap: 2, 
        mt: 2, 
        mb: 4 
      }}>
        <ThemeToggle mode={mode} toggleTheme={toggleTheme} theme={theme} />
        
        <Box sx={{ 
          display: 'flex', 
          flexWrap: 'wrap', 
          justifyContent: 'center', 
          gap: 1, 
          mt: 1,
          px: 2 
        }}>
          {Object.keys(themeOptions).map((themeKey) => (
            <Tooltip 
              key={themeKey} 
              title={`${themeOptions[themeKey].name}`}
              placement="top"
            >
              <Box 
                onClick={() => changeThemeColor(themeKey)}
                sx={{
                  width: 40,
                  height: 40,
                  borderRadius: '50%',
                  position: 'relative',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  '&:hover': {
                    transform: 'scale(1.1)',
                    boxShadow: '0 0 10px rgba(0,0,0,0.2)'
                  }
                }}
              >
                <Box
                  sx={{
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                    borderRadius: '50%',
                    background: `linear-gradient(135deg, ${themeOptions[themeKey].primary.main} 0%, ${themeOptions[themeKey].primary.main} 50%, ${themeOptions[themeKey].secondary.main} 50%, ${themeOptions[themeKey].secondary.main} 100%)`,
                    border: themeColor === themeKey 
                      ? `3px solid ${theme.palette.secondary.main}` 
                      : `2px solid ${theme.palette.background.paper}`,
                    boxShadow: themeColor === themeKey 
                      ? `0 0 0 1px ${theme.palette.secondary.main}, 0 0 8px ${theme.palette.secondary.main}` 
                      : `0 0 0 1px ${theme.palette.divider}`,
                  }}
                />
              </Box>
            </Tooltip>
          ))}
        </Box>
      </Box>
    </Box>
  );

  return (
    <AppBar 
      position="sticky" 
      elevation={0}
      sx={{
        backdropFilter: 'blur(12px)',
        bgcolor: theme.palette.mode === 'dark' 
          ? 'rgba(18, 18, 18, 0.85)' 
          : 'rgba(255, 255, 255, 0.85)',
        borderBottom: `1px solid ${theme.palette.divider}`,
        transition: 'background-color 0.3s ease'
      }}
    >
      <Container maxWidth="lg">
        <Toolbar disableGutters sx={{ py: 1 }}>
          <Typography 
            variant="h5" 
            component="div" 
            sx={{ 
              flexGrow: 1, 
              fontWeight: 700,
              background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              letterSpacing: '0.5px',
              position: 'relative',
              cursor: 'pointer',
              '&::after': {
                content: '""',
                position: 'absolute',
                width: '25%',
                height: '3px',
                bottom: -4,
                left: 0,
                background: `linear-gradient(90deg, ${theme.palette.primary.main}, transparent)`,
                borderRadius: '2px'
              }
            }}
            onClick={handleTitleClick}
          >
            Alif Haikal Nayaza
          </Typography>
          
          {isMobile ? (
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <IconButton
                aria-label="open drawer"
                edge="end"
                onClick={handleDrawerToggle}
                sx={{ 
                  bgcolor: mode === 'dark' ? 'rgba(50, 50, 55, 0.9)' : 'rgba(240, 240, 245, 0.9)',
                  border: `1px solid ${theme.palette.divider}`,
                  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                  transition: 'all 0.2s ease',
                  p: 1,
                  '&:hover': {
                    bgcolor: mode === 'dark' ? 'rgba(70, 70, 75, 0.9)' : 'rgba(220, 220, 225, 0.9)',
                    transform: 'scale(1.05)'
                  }
                }}
              >
                <MenuIcon sx={{
                  color: mode === 'dark' ? 'rgba(255, 255, 255, 0.9)' : 'rgba(0, 0, 0, 0.9)'
                }} />
              </IconButton>
              
              <Drawer
                anchor="right"
                open={drawerOpen}
                onClose={handleDrawerToggle}
                PaperProps={{
                  elevation: 4,
                  sx: {
                    boxShadow: '0px 0px 20px rgba(0, 0, 0, 0.15)'
                  }
                }}
              >
                {drawerContent}
              </Drawer>
            </Box>
          ) : (
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Box 
                sx={{ 
                  display: 'flex', 
                  mr: 3,
                  background: mode === 'dark' ? 'rgba(40, 40, 45, 0.8)' : 'rgba(240, 240, 245, 0.8)',
                  borderRadius: 3,
                  p: 0.5,
                  border: `1px solid ${theme.palette.divider}`,
                  boxShadow: '0 4px 8px rgba(0,0,0,0.07)',
                  transition: 'all 0.3s ease'
                }}
              >
                {NAV_ITEMS.map((item) => (
                  <NavButton 
                    key={item.id}
                    item={item}
                    activePage={activePage}
                    handlePageChange={handlePageChange}
                    mode={mode}
                    theme={theme}
                  />
                ))}
              </Box>
              <ThemeToggle mode={mode} toggleTheme={toggleTheme} theme={theme} />
              
              <ThemeColorSelector 
                currentThemeColor={themeColor} 
                changeThemeColor={changeThemeColor} 
                theme={theme} 
              />
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default memo(Navbar);