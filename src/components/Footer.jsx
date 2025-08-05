import { useState, useContext } from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Link, 
  Divider,
  useTheme,
  IconButton,
  Tooltip,
  Zoom,
  Fade
} from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import EmailIcon from '@mui/icons-material/Email';
import FavoriteIcon from '@mui/icons-material/Favorite';
import InstagramIcon from '@mui/icons-material/Instagram';
import { ThemeContext } from '../App';

const SOCIAL_LINKS = [
  { 
    icon: GitHubIcon, 
    label: 'GitHub', 
    href: 'https://github.com/AlifNayaza',
    color: '#333333'
  },
  { 
    icon: LinkedInIcon, 
    label: 'LinkedIn', 
    href: 'https://www.linkedin.com/in/alif-haikal-nayaza-a5b587241/',
    color: '#0077B5'
  },
  { 
    icon: EmailIcon, 
    label: 'Email', 
    href: 'mailto:alifnayaza2693@gmail.com',
    color: '#ffffff'
  },
  { 
    icon: InstagramIcon, 
    label: 'Instagram', 
    href: 'https://www.instagram.com/ohalraf/',
    color: '#E1306C'
  }
];

const Footer = () => {
  const theme = useTheme();
  const { mode } = useContext(ThemeContext);
  const [hoveredIcon, setHoveredIcon] = useState(null);
  const [heartbeat, setHeartbeat] = useState(false);

  // Effect for heartbeat animation
  const triggerHeartbeat = () => {
    setHeartbeat(true);
    setTimeout(() => setHeartbeat(false), 500);
  };

  // Dynamic footer background based on theme
  const footerBg = mode === 'dark' 
    ? 'rgba(26, 32, 39, 0.95)' 
    : theme.palette.primary.main;

  return (
    <Box 
      component="footer" 
      sx={{
        py: 3,
        bgcolor: footerBg,
        color: 'white',
        mt: 'auto',
        boxShadow: mode === 'dark' ? '0px -5px 10px rgba(0, 0, 0, 0.2)' : 'none',
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '2px',
          background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main}, ${theme.palette.primary.main})`,
          backgroundSize: '200% 100%',
          animation: 'gradient 15s ease infinite',
        },
        '@keyframes gradient': {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        }
      }}
    >
      <Container maxWidth="lg">
        <Box sx={{ 
          display: 'flex', 
          flexDirection: { xs: 'column', md: 'row' }, 
          justifyContent: 'space-between', 
          alignItems: 'center',
          mb: 2
        }}>
          <Fade in={true} timeout={1000}>
            <Typography 
              variant="body1"
              sx={{ 
                mb: { xs: 2, md: 0 },
                fontWeight: 500,
                letterSpacing: 0.5,
                opacity: 0.9
              }}
            >
              © {new Date().getFullYear()} <Box component="span" sx={{ fontWeight: 'bold' }}>Alif Haikal Nayaza</Box>. All rights reserved.
            </Typography>
          </Fade>
          
          <Box sx={{ 
            display: 'flex', 
            gap: 1.5,
            justifyContent: 'center'
          }}>
            {SOCIAL_LINKS.map((link, index) => (
              <Zoom 
                key={link.label} 
                in={true} 
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <Tooltip 
                  title={link.label} 
                  placement="top" 
                  TransitionComponent={Fade}
                  arrow
                >
                  <IconButton
                    component={Link}
                    href={link.href}
                    aria-label={link.label}
                    onMouseEnter={() => setHoveredIcon(link.label)}
                    onMouseLeave={() => setHoveredIcon(null)}
                    onClick={() => triggerHeartbeat()}
                    size="medium"
                    sx={{
                      color: hoveredIcon === link.label 
                        ? theme.palette.secondary.main 
                        : 'rgba(255, 255, 255, 0.8)',
                      backgroundColor: 'rgba(255, 255, 255, 0.1)',
                      '&:hover': {
                        backgroundColor: 'rgba(255, 255, 255, 0.15)',
                        transform: 'translateY(-3px)',
                        transition: 'transform 0.3s ease-in-out',
                        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
                      },
                      transition: 'all 0.3s ease-in-out'
                    }}
                  >
                    <link.icon />
                  </IconButton>
                </Tooltip>
              </Zoom>
            ))}
          </Box>
        </Box>
        
        <Divider sx={{ 
          bgcolor: mode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.3)',
          my: 2,
          width: '100%',
          mx: 'auto'
        }} />
        
        <Typography 
          variant="body2" 
          align="center"
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 0.5,
            opacity: 0.8,
            '&:hover': {
              opacity: 1
            },
            transition: 'opacity 0.3s ease'
          }}
        >
          Made with 💛 using React, Material UI, and Vite
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
