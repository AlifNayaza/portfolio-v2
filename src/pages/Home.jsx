import React, { useState, useContext, useEffect, useMemo } from 'react';
import { 
  Box, Typography, Button, Paper, Grid, Avatar, Container, Fade, Divider, Card, CardContent, Chip, Stack 
} from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import CodeIcon from '@mui/icons-material/Code';
import DesignServicesIcon from '@mui/icons-material/DesignServices';
import StorageIcon from '@mui/icons-material/Storage';
import { ThemeContext } from '../App';
// Import your profile image (replace with your actual image)
import profileImage from '../assets/images/profil2.jpg';

const Home = ({ setActivePage }) => {
  const { mode } = useContext(ThemeContext);
  const [isVisible, setIsVisible] = useState(false);
  
  // Animation on component mount with cleanup
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);
  
  // Memoize skills data with a modest tone
  const skills = useMemo(() => [
    { 
      icon: <CodeIcon fontSize="large" color="primary" />, 
      title: "Frontend Development", 
      description: "I develop user-friendly interfaces using HTML/CSS and JavaScript. With React.js, I build responsive designs that are both clean and accessible." 
    },
    { 
      icon: <DesignServicesIcon fontSize="large" color="primary" />, 
      title: "Fullstack Development", 
      description: "I work across both front-end and back-end, integrating technologies to build complete and functional web applications." 
    },
    { 
      icon: <StorageIcon fontSize="large" color="primary" />, 
      title: "Backend Development", 
      description: "I focus on back-end development using Node.js, Express.js, Python, MySQL, MongoDB, and PHP with Laravel—gaining skills with every new project." 
    }
  ], []);

  // Memoize technologies (chips)
  const technologies = useMemo(() => [
    "HTML/CSS", "JavaScript", "React.js", "Node.js", "Express.js", "Python", "MySQL", "MongoDB", "PHP", "Laravel"
  ], []);
  
  // Memoize background gradients based on theme
  const bgGradient = useMemo(() => ({
    light: 'linear-gradient(135deg, rgba(255,235,235,0.8) 0%, rgba(255,245,224,0.9) 100%)',
    dark: 'linear-gradient(135deg, rgba(50,20,20,0.9) 0%, rgba(50,45,20,0.8) 100%)'
  }), []);

  // Memoize style objects
  const styles = useMemo(() => ({
    heroContainer: {
      p: { xs: 3, md: 6 },
      mb: 6,
      borderRadius: { xs: 3, md: 4 },
      backgroundImage: mode === 'light' ? bgGradient.light : bgGradient.dark,
      overflow: 'hidden',
      position: 'relative',
      transition: 'background-image 0.3s ease',
      '&::after': {
        content: '""',
        position: 'absolute',
        top: 0,
        right: 0,
        width: { xs: '150px', md: '250px' },
        height: { xs: '150px', md: '250px' },
        background: `radial-gradient(circle, ${mode === 'light' ? 'rgba(255,255,255,0.8)' : 'rgba(255,255,255,0.1)'} 0%, transparent 70%)`,
        zIndex: 0
      }
    },
    nameHighlight: { 
      color: 'primary.main', 
      position: 'relative',
      '&::after': {
        content: '""',
        position: 'absolute',
        bottom: '5px',
        left: 0,
        width: '100%',
        height: '8px',
        background: 'rgba(var(--mui-palette-primary-mainChannel) / 0.2)',
        zIndex: -1,
        borderRadius: '4px'
      }
    },
    expertiseHighlight: { 
      color: 'primary.main',
      position: 'relative',
      '&::after': {
        content: '""',
        position: 'absolute',
        bottom: '2px',
        left: 0,
        width: '100%',
        height: '6px',
        background: 'rgba(var(--mui-palette-primary-mainChannel) / 0.2)',
        zIndex: -1,
        borderRadius: '4px'
      }
    },
    avatarContainer: {
      position: 'relative',
      "&::before": {
        content: '""',
        position: 'absolute',
        width: '100%',
        height: '100%',
        borderRadius: '50%',
        background: `radial-gradient(circle, ${mode === 'light' ? 'rgba(var(--mui-palette-primary-mainChannel) / 0.1)' : 'rgba(var(--mui-palette-primary-mainChannel) / 0.2)'} 0%, transparent 70%)`,
        transform: 'translate(12px, 12px)',
        zIndex: 0
      }
    },
    avatar: {
      width: { xs: 220, sm: 250, md: 300 },
      height: { xs: 220, sm: 250, md: 300 },
      border: '5px solid',
      borderColor: 'secondary.main',
      boxShadow: mode === 'light' ? '0 8px 20px rgba(0,0,0,0.1)' : '0 8px 20px rgba(0,0,0,0.5)',
      position: 'relative',
      zIndex: 1,
      transition: 'transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275), box-shadow 0.4s ease',
      "&:hover": {
        transform: 'scale(1.05) rotate(2deg)',
        boxShadow: mode === 'light' ? '0 12px 28px rgba(0,0,0,0.15)' : '0 12px 28px rgba(0,0,0,0.6)'
      }
    },
    skillCard: { 
      height: '100%',
      borderRadius: 3,
      transition: 'transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275), box-shadow 0.4s ease',
      border: '1px solid',
      borderColor: mode === 'light' ? 'rgba(0,0,0,0.06)' : 'rgba(255,255,255,0.05)',
      "&:hover": {
        transform: 'translateY(-8px)',
        boxShadow: mode === 'light' 
          ? '0 10px 20px rgba(0,0,0,0.08)' 
          : '0 10px 20px rgba(0,0,0,0.4)'
      },
      position: 'relative',
      overflow: 'hidden',
      '&::after': {
        content: '""',
        position: 'absolute',
        top: 0,
        right: 0,
        width: '80px',
        height: '80px',
        background: `radial-gradient(circle, rgba(var(--mui-palette-primary-mainChannel) / 0.1) 0%, transparent 70%)`,
        borderRadius: '0 0 0 100%',
        zIndex: 0
      }
    },
    chip: (index) => ({ 
      m: 0.5, 
      borderRadius: '8px',
      fontWeight: 500,
      px: 1,
      py: 2.5,
      fontSize: '0.9rem',
      transition: 'transform 0.2s ease, box-shadow 0.2s ease',
      '&:hover': {
        transform: 'translateY(-3px)',
        boxShadow: index % 2 === 0 ? '0 4px 8px rgba(var(--mui-palette-primary-mainChannel) / 0.3)' : 'none'
      }
    })
  }), [mode, bgGradient]);

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Fade in={isVisible} timeout={800}>
        <Paper 
          elevation={mode === 'light' ? 0 : 3}
          sx={styles.heroContainer}
        >
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6} sx={{ textAlign: { xs: 'center', md: 'left' } }}>
              <Typography 
                variant="h2" 
                component="h1" 
                gutterBottom 
                sx={{ 
                  fontWeight: 800,
                  fontSize: { xs: '2.5rem', sm: '3rem', md: '3.5rem' },
                  letterSpacing: '-0.02em',
                  textShadow: mode === 'light' ? 'none' : '0 2px 4px rgba(0,0,0,0.3)'
                }}
              >
                Hey there! I'm <Box component="span" sx={styles.nameHighlight}>
                  Alif Haikal Nayaza
                </Box>
              </Typography>
              
              <Typography 
                variant="h5" 
                component="h2" 
                gutterBottom
                sx={{
                  fontWeight: 500,
                  opacity: 0.9,
                  letterSpacing: '0.5px'
                }}
              >
                Informatics student at Telkom University, Bandung.
              </Typography>
              
              <Typography 
                variant="body1" 
                paragraph 
                sx={{ 
                  my: 3, 
                  maxWidth: '90%', 
                  mx: { xs: 'auto', md: 0 },
                  lineHeight: 1.7,
                  fontSize: '1.05rem'
                }}
              >
                I'm a student passionate about web development. I enjoy learning new technologies and building clean, responsive websites as I grow my skills step by step.
              </Typography>
              
              <Stack 
                direction={{ xs: 'column', sm: 'row' }} 
                spacing={2} 
                sx={{ 
                  mt: 4, 
                  justifyContent: { xs: 'center', md: 'flex-start' } 
                }}
              >
                <Button 
                  variant="contained" 
                  color="primary" 
                  size="large"
                  endIcon={<ArrowForwardIcon />}
                  onClick={() => setActivePage('projects')}
                  sx={{ 
                    px: 3, 
                    py: 1.5,
                    borderRadius: 2,
                    textTransform: 'none',
                    fontWeight: 'bold',
                    boxShadow: '0 4px 8px rgba(var(--mui-palette-primary-mainChannel) / 0.3)',
                    minWidth: { xs: '100%', sm: 'auto' }
                  }}
                >
                  See My Work
                </Button>
                <Button 
                  variant="outlined" 
                  color="primary" 
                  size="large"
                  onClick={() => setActivePage('contacts')}
                  sx={{ 
                    px: 3, 
                    py: 1.5,
                    borderRadius: 2,
                    textTransform: 'none',
                    borderWidth: '2px',
                    '&:hover': {
                      borderWidth: '2px'
                    },
                    minWidth: { xs: '100%', sm: 'auto' }
                  }}
                >
                  Let's Chat!
                </Button>
              </Stack>
            </Grid>
            
            <Grid item xs={12} md={6} sx={{ display: 'flex', justifyContent: 'center' }}>
              <Box sx={styles.avatarContainer}>
                <Avatar
                  src={profileImage}
                  alt="Profile"
                  sx={styles.avatar}
                />
              </Box>
            </Grid>
          </Grid>
        </Paper>
      </Fade>
      
      {/* Technologies/Skills Section */}
      <Box sx={{ my: { xs: 5, md: 8 } }}>
        <Typography 
          variant="h4" 
          component="h2" 
          gutterBottom 
          sx={{ 
            textAlign: 'center', 
            fontWeight: 800,
            mb: 3,
            fontSize: { xs: '1.8rem', md: '2.2rem' }
          }}
        >
          <Box component="span" sx={styles.expertiseHighlight}>
            Skills
          </Box> I've Developed
        </Typography>
        
        <Divider 
          sx={{ 
            mb: 5, 
            width: '60px', 
            mx: 'auto', 
            borderWidth: 3, 
            borderRadius: 1,
            borderColor: 'primary.main' 
          }} 
        />
        
        <Box sx={{ mb: 5 }}>
          <Stack 
            direction="row" 
            spacing={1} 
            flexWrap="wrap"
            justifyContent="center"
            sx={{ mb: 5 }}
          >
            {technologies.map((tech, index) => (
              <Chip 
                key={index}
                label={tech}
                color="primary"
                variant={index % 2 === 0 ? "filled" : "outlined"}
                sx={styles.chip(index)}
              />
            ))}
          </Stack>
        </Box>
        
        <Grid container spacing={3}>
          {skills.map((skill, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Fade in={isVisible} timeout={800} style={{ transitionDelay: `${200 + index * 150}ms` }}>
                <Card 
                  elevation={mode === 'light' ? 2 : 4} 
                  sx={styles.skillCard}
                >
                  <CardContent sx={{ p: 4, textAlign: 'center', position: 'relative', zIndex: 1 }}>
                    <Box sx={{ 
                      mb: 2,
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      width: '64px',
                      height: '64px',
                      borderRadius: '16px',
                      background: `rgba(var(--mui-palette-primary-mainChannel) / 0.1)`,
                      mx: 'auto',
                      transform: 'rotate(5deg)',
                      transition: 'transform 0.3s ease',
                      '&:hover': {
                        transform: 'rotate(0deg)'
                      }
                    }}>
                      {skill.icon}
                    </Box>
                    <Typography 
                      variant="h6" 
                      component="h3" 
                      gutterBottom 
                      color="primary" 
                      sx={{ 
                        fontWeight: 'bold',
                        mb: 1.5,
                        position: 'relative',
                        display: 'inline-block',
                        '&::after': {
                          content: '""',
                          position: 'absolute',
                          width: '40%',
                          height: '3px',
                          background: 'primary.main',
                          bottom: '-4px',
                          left: '30%',
                          borderRadius: '2px'
                        }
                      }}
                    >
                      {skill.title}
                    </Typography>
                    <Typography 
                      variant="body2"
                      sx={{
                        lineHeight: 1.7,
                        opacity: 0.85
                      }}
                    >
                      {skill.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Fade>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
};

export default Home;
