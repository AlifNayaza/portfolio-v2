import { Box, Typography, Paper, Grid, Divider, Chip, Avatar, Container, Card, CardContent, useMediaQuery, useTheme } from '@mui/material';
import { 
  School as SchoolIcon, 
  Work as WorkIcon, 
  Code as CodeIcon, 
  AlternateEmail as AlternateEmailIcon, 
  GitHub as GitHubIcon, 
  LinkedIn as LinkedInIcon, 
  EmojiEvents as EmojiEventsIcon 
} from '@mui/icons-material';
import { useEffect, useState } from 'react';
import aboutImage from '../assets/images/profil2.jpg';

// Skill level definitions with colors
const SKILL_LEVELS = {
  1: { name: 'Learning', desc: 'Still figuring things out', color: 'default' },
  2: { name: 'Familiar', desc: 'Can work with some help', color: 'info' },
  3: { name: 'Comfortable', desc: 'Can build stuff independently', color: 'warning' },
  4: { name: 'Solid', desc: 'Regularly use in projects', color: 'success' },
  5: { name: 'Pretty Good', desc: 'Confident in my abilities', color: 'error' }
};

// Skills data
const SKILLS = [
  { name: 'JavaScript', level: 3 },
  { name: 'React.js', level: 3 },
  { name: 'Node.js', level: 3 },
  { name: 'Material UI', level: 3 },
  { name: 'MySQL', level: 3 },
  { name: 'Python', level: 3 },
  { name: 'PHP (Laravel)', level: 3 },
  { name: 'Responsive Design', level: 3 },
  { name: 'MongoDB', level: 2 },
  { name: 'HTML & CSS', level: 4 },
];

// Education data
const EDUCATION = [
  {
    degree: "BSc in Informatics",
    institution: "Telkom University, Bandung, West Java",
    description: "Still on my journey to get that degree in Informatics. Mostly focused on web development stuff and trying to survive coding assignments.",
    period: "2021 - Present"
  },
];

// Experience data
const EXPERIENCE = [
  {
    position: "Web Developer Intern",
    company: "Anugerah Bunda Khatulistiwa Hospital, Pontianak, West Kalimantan",
    description: "Built my first real-world project - a website for hospital info and a simple desktop app to keep track of inventory. Learned a ton about working with actual clients!",
    period: "June 2024 - August 2024"
  },
  {
    position: "Programming Competition Participant",
    company: "Telkom University, Bandung, West Java",
    description: "Joined the uni's programming competition, mostly for fun and the experience. Somehow managed to land in the top 500 out of thousands (still surprised about that one).",
    period: "2022"
  },
];

const About = () => {
  const [isVisible, setIsVisible] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Reusable styles
  const styles = {
    sectionTitle: {
      display: 'flex',
      alignItems: 'center',
      fontSize: { xs: '1.25rem', sm: '1.5rem' },
      "&::before": {
        content: '""',
        width: '4px',
        height: { xs: '20px', sm: '24px' },
        bgcolor: 'primary.main',
        mr: 1,
        display: 'inline-block'
      }
    },
    clipShapes: {
      paper1: { xs: 'none', sm: 'polygon(0 0, 100% 0, 100% 97%, 97% 100%, 0 100%)' },
      paper2: { xs: 'none', sm: 'polygon(0 0, 97% 0, 100% 3%, 100% 100%, 3% 100%, 0 97%)' },
      paper3: { xs: 'none', sm: 'polygon(3% 0, 100% 0, 97% 100%, 0 100%)' },
    }
  };

  // Custom components
  const SectionContainer = ({ id, clipPath, children }) => (
    <Paper 
      id={id}
      elevation={3} 
      sx={{
        p: { xs: 2, sm: 3, md: 4 },
        mb: { xs: 3, sm: 4 },
        clipPath,
        borderRadius: { xs: 2, sm: 0 },
        position: 'relative',
        '&::after': {
          content: '""',
          position: 'absolute',
          bottom: 0,
          right: 0,
          width: '30%',
          height: '4px',
          background: 'linear-gradient(90deg, transparent, rgba(0,0,0,0.05))'
        }
      }}
    >
      {children}
    </Paper>
  );

  const CustomChip = ({ icon, label, color, onClick }) => (
    <Chip
      icon={icon}
      label={label}
      color={color}
      clickable
      onClick={onClick}
      size={isMobile ? "small" : "medium"}
      sx={{
        mr: 1,
        mb: 1,
        borderRadius: 'full',
        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
        '&:hover': {
          transform: 'translateY(-3px)',
          boxShadow: 2
        }
      }}
    />
  );

  const SkillCard = ({ skill }) => (
    <Grid item xs={6} sm={4} md={3} key={skill.name}>
      <Card
        sx={{
          height: '100%',
          p: 1.5,
          borderRadius: { xs: 1, sm: 2 },
          boxShadow: 1,
          transition: 'all 0.3s ease',
          borderLeft: '4px solid',
          borderColor: SKILL_LEVELS[skill.level].color,
          '&:hover': {
            transform: 'translateY(-5px) rotate(1deg)',
            boxShadow: 3
          }
        }}
      >
        <CardContent sx={{ p: { xs: 1, sm: 1 } }}>
          <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
            {skill.name}
          </Typography>
          <Chip
            label={SKILL_LEVELS[skill.level].name}
            color={SKILL_LEVELS[skill.level].color}
            size="small"
            sx={{ fontWeight: 'bold' }}
          />
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1, fontSize: { xs: '0.75rem', sm: '0.875rem' } }}>
            {SKILL_LEVELS[skill.level].desc}
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  );

  const InfoCard = ({ item, isEducation }) => (
    <Card
      variant="outlined"
      sx={{
        mb: 2,
        [isEducation ? 'borderLeft' : 'borderRight']: '4px solid',
        borderColor: isEducation ? 'primary.main' : 'secondary.main',
        borderRadius: { xs: 1, sm: 0 },
        transition: 'all 0.3s ease',
        '&:hover': {
          transform: isEducation ? 'translateX(5px)' : 'translateX(-5px)',
          boxShadow: 3,
          '& .timeline-dot': {
            transform: 'scale(1.3)',
            boxShadow: 3
          }
        },
        position: 'relative'
      }}
    >
      {/* Timeline dot */}
      <Box 
        className="timeline-dot"
        sx={{
          position: 'absolute',
          left: isEducation ? '-8px' : 'auto',
          right: isEducation ? 'auto' : '-8px',
          top: '20px',
          width: '16px',
          height: '16px',
          borderRadius: '50%',
          bgcolor: isEducation ? 'primary.main' : 'secondary.main',
          transition: 'transform 0.3s ease, box-shadow 0.3s ease',
          zIndex: 1
        }}
      />
      
      <CardContent sx={{ p: { xs: 1.5, sm: 2 } }}>
        <Typography variant="subtitle1" fontWeight="bold">
          {isEducation ? item.degree : item.position}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {isEducation ? item.institution : item.company}
        </Typography>
        <Typography variant="body2" sx={{ mt: 1 }}>
          {item.description}
        </Typography>
        <Typography 
          variant="body2" 
          color="text.secondary" 
          sx={{ 
            mt: 1,
            display: 'inline-block',
            px: 1,
            py: 0.5,
            bgcolor: 'background.paper',
            borderRadius: 1,
            border: '1px dashed',
            borderColor: isEducation ? 'primary.light' : 'secondary.light'
          }}
        >
          {item.period}
        </Typography>
      </CardContent>
    </Card>
  );

  return (
    <Container maxWidth="lg" sx={{ py: 4, px: { xs: 2, sm: 3, md: 4 } }}>
      {/* Header Section */}
      <Box sx={{ 
        mb: { xs: 4, sm: 5 }, 
        textAlign: 'center',
        position: 'relative'
      }}>
        <Typography
          variant={isMobile ? "h4" : "h3"}
          component="h1"
          color="primary"
          sx={{
            fontWeight: 'bold',
            position: 'relative',
            display: 'inline-block',
            pb: 2,
            fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
            textShadow: '2px 2px 4px rgba(0,0,0,0.1)',
            '&::after': {
              content: '""',
              position: 'absolute',
              bottom: 0,
              left: '50%',
              transform: 'translateX(-50%)',
              width: { xs: '80px', sm: '100px', md: '120px' },
              height: '4px',
              background: 'linear-gradient(90deg, transparent, primary.main, secondary.main, transparent)',
              borderRadius: '2px'
            }
          }}
        >
          Hi, I'm Alif!
        </Typography>
        
        <Typography 
          variant="subtitle1" 
          color="text.secondary" 
          sx={{
            maxWidth: '600px',
            mx: 'auto',
            mt: 2,
            fontSize: { xs: '0.875rem', sm: '1rem' },
            fontStyle: 'italic'
          }}
        >
          Just your average Informatics student who enjoys making websites and apps that don't crash (most of the time).
        </Typography>
        
        {/* Decorative elements */}
        <Box sx={{ 
          position: 'absolute', 
          left: { xs: 10, sm: 40 }, 
          top: { xs: 10, sm: 20 },
          width: { xs: 30, sm: 40 },
          height: { xs: 30, sm: 40 },
          borderTop: '3px solid',
          borderLeft: '3px solid',
          borderColor: 'primary.main',
          opacity: 0.7
        }} />
        
        <Box sx={{ 
          position: 'absolute', 
          right: { xs: 10, sm: 40 }, 
          top: { xs: 10, sm: 20 },
          width: { xs: 30, sm: 40 },
          height: { xs: 30, sm: 40 },
          borderTop: '3px solid',
          borderRight: '3px solid',
          borderColor: 'secondary.main',
          opacity: 0.7
        }} />
      </Box>

      {/* Profile Section */}
      <SectionContainer id="profile" clipPath={styles.clipShapes.paper1}>
        <Grid container spacing={3} alignItems="center" direction={isMobile ? "column-reverse" : "row"}>
          {/* Profile Image Section */}
          <Grid item xs={12} md={4}>
            <Box sx={{
              position: 'relative',
              maxWidth: { xs: '250px', sm: '100%' },
              mx: 'auto',
              perspective: '1000px'
            }}>
              <Box sx={{
                position: 'relative',
                transform: { xs: 'none', sm: 'rotateY(5deg)' },
                transition: 'transform 0.5s ease',
                '&:hover': {
                  transform: 'rotateY(0deg)'
                }
              }}>
                <Avatar
                  src={aboutImage}
                  alt="That's me!"
                  variant="square"
                  sx={{
                    width: '100%',
                    height: 'auto',
                    aspectRatio: '3/4',
                    boxShadow: 4,
                    borderRadius: { xs: 2, sm: '4px 16px 4px 16px' },
                    border: '4px solid white',
                    transition: 'all 0.3s ease',
                    filter: 'brightness(1.05) contrast(1.05)',
                    '&:hover': {
                      filter: 'brightness(1.1) contrast(1.1)',
                      boxShadow: 6
                    }
                  }}
                />
                
                {/* Decorative frame */}
                <Box sx={{
                  position: 'absolute',
                  top: -10,
                  left: -10,
                  right: 10,
                  bottom: 10,
                  border: '2px dashed',
                  borderColor: 'primary.light',
                  borderRadius: { xs: 2, sm: '4px 16px 4px 16px' },
                  zIndex: -1
                }} />
              </Box>
            </Box>

            <Box 
              sx={{ 
                mt: 3, 
                display: 'flex',
                flexWrap: 'wrap', 
                justifyContent: 'center',
                gap: 1
              }}
            >
              <CustomChip 
                icon={<GitHubIcon />} 
                label="GitHub" 
                color="default" 
                onClick={() => window.open('https://github.com/AlifNayaza', '_blank')}
              />
              <CustomChip 
                icon={<LinkedInIcon />} 
                label="LinkedIn" 
                color="primary" 
                onClick={() => window.open('https://www.linkedin.com/in/alif-haikal-nayaza-a5b587241/', '_blank')}
              />
              <CustomChip 
                icon={<AlternateEmailIcon />} 
                label="Email" 
                color="secondary" 
                onClick={() => window.open('mailto:alifnayaza2693@gmail.com', '_blank')}
              />
            </Box>
          </Grid>

          {/* Profile Info Section */}
          <Grid item xs={12} md={8}>
            <Typography 
              variant={isMobile ? "h5" : "h4"} 
              gutterBottom 
              sx={{
                position: 'relative',
                textAlign: { xs: 'center', md: 'left' },
                fontSize: { xs: '1.5rem', sm: '1.75rem', md: '2.125rem' },
                mb: 2
              }}
            >
              Hey there! I'm{' '}
              <Box 
                component="span" 
                sx={{ 
                  color: 'primary.main', 
                  position: 'relative',
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    width: '100%',
                    height: '4px',
                    background: 'linear-gradient(90deg, primary.light, transparent)',
                    opacity: 0.3,
                    borderRadius: '2px'
                  }
                }}
              >
                Alif Haikal Nayaza
              </Box>
            </Typography>

            <Box sx={{
              position: 'relative',
              p: { xs: 1.5, sm: 2 },
              borderLeft: '3px solid',
              borderColor: 'primary.main',
              borderRadius: '2px 8px 8px 2px',
              bgcolor: 'rgba(0,0,0,0.02)',
              mb: 2
            }}>
              <Typography 
                variant="body1" 
                sx={{
                  fontSize: { xs: '0.875rem', sm: '1rem' },
                  textAlign: { xs: 'center', md: 'left' },
                  lineHeight: 1.6
                }}
              >
                Currently surviving my Informatics degree at Telkom University. I've been bitten by the web development bug and spend way too much time trying to make websites look pretty.
              </Typography>
            </Box>

            <Typography 
              variant="body1" 
              paragraph 
              sx={{
                fontSize: { xs: '0.875rem', sm: '1rem' },
                textAlign: { xs: 'center', md: 'left' },
                lineHeight: 1.6
              }}
            >
              I've played around with HTML/CSS (obviously), JavaScript (React when I'm feeling brave, a bit of Node), some Python for data stuff, and dabbled in MySQL, MongoDB, and PHP. I once joined a coding competition at uni and somehow didn't embarrass myself completely - ended up in the top 500!
            </Typography>

            <Typography 
              variant="body1" 
              paragraph 
              sx={{
                fontSize: { xs: '0.875rem', sm: '1rem' },
                textAlign: { xs: 'center', md: 'left' },
                lineHeight: 1.6
              }}
            >
              Still figuring out this whole coding thing, but I'm having fun learning. Would love to get involved in projects where I can contribute while not breaking everything!
            </Typography>

            <Box sx={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 1,
              mt: 3,
              justifyContent: { xs: 'center', md: 'flex-start' }
            }}>
              <CustomChip icon={<SchoolIcon />} label="Student Coder" color="primary" />
              <CustomChip icon={<WorkIcon />} label="Intern Experience" color="secondary" />
              <CustomChip icon={<EmojiEventsIcon />} label="Competition Survivor" color="default" />
              <CustomChip icon={<CodeIcon />} label="Learning by Doing" color="primary" />
            </Box>
          </Grid>
        </Grid>
      </SectionContainer>

      {/* Skills Section */}
      <SectionContainer id="skills" clipPath={styles.clipShapes.paper2}>
        <Typography variant={isMobile ? "h6" : "h5"} gutterBottom color="primary" sx={styles.sectionTitle}>
          What I Can (Sort of) Do
        </Typography>

        <Divider sx={{ mb: 2 }} />

        <Box sx={{ 
          mb: 3,
          p: 1.5,
          borderRadius: 1,
          bgcolor: 'background.paper',
          border: '1px dashed',
          borderColor: 'divider',
          display: 'flex',
          alignItems: 'center',
          justifyContent: { xs: 'center', sm: 'flex-start' },
          flexWrap: 'wrap'
        }}>
          <Typography variant="body2" sx={{ mr: 1 }}>
            My skill levels go from:
          </Typography>
          {Object.entries(SKILL_LEVELS).map(([level, { name, color }]) => (
            <Chip
              key={level}
              label={name}
              size="small"
              color={color}
              sx={{ 
                m: 0.5,
                fontWeight: level > 3 ? 'bold' : 'normal'
              }}
            />
          ))}
        </Box>

        <Grid container spacing={2}>
          {SKILLS.map((skill) => (
            <SkillCard key={skill.name} skill={skill} />
          ))}
        </Grid>
      </SectionContainer>

      {/* Education & Experience Section */}
      <SectionContainer id="journey" clipPath={styles.clipShapes.paper3}>
        <Typography variant={isMobile ? "h6" : "h5"} gutterBottom color="primary" sx={styles.sectionTitle}>
          My Journey So Far
        </Typography>

        <Divider sx={{ mb: 3 }} />

        <Grid container spacing={3}>
          {/* Education Section */}
          <Grid item xs={12} md={6}>
            <Box sx={{ mb: { xs: 2, md: 0 }, position: 'relative' }}>
              {/* Timeline line for desktop */}
              {!isMobile && (
                <Box sx={{ 
                  position: 'absolute',
                  left: '8px',
                  top: '40px',
                  bottom: 0,
                  width: '2px',
                  bgcolor: 'primary.light',
                  opacity: 0.5
                }} />
              )}
              
              <Typography variant="h6" gutterBottom sx={{
                display: 'flex',
                alignItems: 'center',
                mb: 2
              }}>
                <SchoolIcon sx={{ mr: 1 }} color="primary" />
                Education
              </Typography>

              {EDUCATION.map((item, index) => (
                <InfoCard key={index} item={item} isEducation={true} />
              ))}
            </Box>
          </Grid>

          {/* Experience Section */}
          <Grid item xs={12} md={6}>
            <Box sx={{ position: 'relative' }}>
              {/* Timeline line for desktop */}
              {!isMobile && (
                <Box sx={{ 
                  position: 'absolute',
                  right: '8px',
                  top: '40px',
                  bottom: 0,
                  width: '2px',
                  bgcolor: 'secondary.light',
                  opacity: 0.5
                }} />
              )}
              
              <Typography variant="h6" gutterBottom sx={{
                display: 'flex',
                alignItems: 'center',
                mb: 2
              }}>
                <WorkIcon sx={{ mr: 1 }} color="secondary" />
                Experience
              </Typography>

              {EXPERIENCE.map((item, index) => (
                <InfoCard key={index} item={item} isEducation={false} />
              ))}
            </Box>
          </Grid>
        </Grid>
      </SectionContainer>
    </Container>
  );
};

export default About;
