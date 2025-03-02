import React, { useState, useEffect, useMemo, memo } from 'react';
import {
  Box, Typography, Grid, Card, CardMedia, CardContent,
  CardActions, Button, Chip, Dialog, IconButton,
  Fade, useMediaQuery, useTheme, Container, TextField,
  Stack, InputAdornment
} from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';

import project1Image from '../assets/images/project1.png';
import project2Image from '../assets/images/project2.png';
import project3Image from '../assets/images/project3.png';
import project4Image from '../assets/images/project4.png';
import project5Image from '../assets/images/project5.png';
import project6Image from '../assets/images/project6.png';

const TECH_COLORS = {
  'React': 'primary',
  'Node.js': 'secondary',
  'MySQL': 'info',
  'Express': 'info',
  'Python': 'warning',
  'Jupyter': 'success',
  'PyQt5': 'error',
  'Figma': 'secondary',
  'UI/UX': 'info',
  'HTML': 'primary',
  'CSS': 'secondary',
  'JavaScript': 'warning',
  'PHP': 'info',
  'Laravel': 'error',
  'Material UI': 'primary',
  'CSS Grid': 'secondary',
  'Discord.py': 'primary'
};

const PROJECTS = [
  {
    id: 1,
    title: 'BeritaCepat (News Aggregator)',
    description: 'A web application built with HTML/CSS, JavaScript, and Laravel, using a MySQL database to display the latest news.',
    image: project1Image,
    technologies: ['HTML', 'CSS', 'JavaScript', 'Laravel', 'MySQL'],
    category: 'Web Apps',
    longDescription: 'BeritaCepat is a news aggregator website that provides users with up-to-date news articles from various sources.  It features a responsive design, categorized news sections, and a search functionality. The backend is built with Laravel and uses MySQL for data storage.'
  },
  {
    id: 2,
    title: 'COVID-19 Spread Visualization in Indonesia',
    description: 'A data visualization project built using Python (Jupyter Notebook) to display the spread of COVID-19 across Indonesia.',
    image: project2Image,
    technologies: ['Python', 'Jupyter'],
    category: 'Data Visualization',
    longDescription: 'This project utilizes Python libraries like Pandas, Matplotlib, and Seaborn within a Jupyter Notebook to visualize the spread of COVID-19 in Indonesia.  It includes interactive charts and maps showing case numbers, distribution by region, and trends over time.  The data is sourced from publicly available datasets.'
  },
  {
    id: 3,
    title: 'PasarSae (Marketplace UI/UX Design)',
    description: 'A UI/UX design project created with Figma, aiming to create an intuitive design for finding markets and product information in Bandung.',
    image: project3Image,
    technologies: ['Figma', 'UI/UX'],
    category: 'UI/UX Design',
    longDescription: 'PasarSae is a UI/UX design concept for a mobile application that helps users easily find traditional markets in Bandung and discover the products they sell.  The design focuses on user-centered principles, clear navigation, and a visually appealing interface.  The project includes user flows, wireframes, and high-fidelity mockups created in Figma.'
  },
  {
    id: 4,
    title: 'Desktop Inventory Management Application',
    description: 'A desktop application built with Python (PyQt5) and a MySQL database for managing company assets.',
    image: project4Image,
    technologies: ['Python', 'PyQt5', 'MySQL'],
    category: 'Desktop Apps',
    longDescription: 'This desktop application provides a comprehensive solution for managing company inventory.  It features a user-friendly interface built with PyQt5, allowing users to add, update, track, and generate reports on assets.  The data is securely stored in a MySQL database.'
  },
  {
    id: 5,
    title: 'Anugerah Bunda Khatulistiwa Hospital Service Information Website',
    description: 'A website developed during my internship using React.js, Node.js, MySQL, and Express.js to enhance user access to hospital information.',
    image: project5Image,
    technologies: ['React', 'Node.js', 'MySQL', 'Express', 'Material UI'],
    category: 'Web Apps',
    longDescription: 'Developed during my internship at Anugerah Bunda Khatulistiwa Hospital, this website aims to improve the user experience by providing easy access to essential information about hospital services, departments, doctors, and schedules.  The frontend is built with React.js and Material UI, while the backend uses Node.js, Express.js, and MySQL.'
  },
  {
    id: 6,
    title: 'Gepuro (Discord Bot)',
    description: 'A Discord bot named Gepuro, built using Python, offering features like music playback, weather information, news access, and more.',
    image: project6Image,
    technologies: ['Python', 'Discord.py'],
    category: 'Bots',
    longDescription:
      'Gepuro is a multi-functional Discord bot created using the Discord.py library. It provides a range of features to enhance Discord server communities, including playing music from various sources, fetching current weather conditions, delivering the latest news headlines, and other utility commands.  The bot is designed to be easy to use and customizable.',
  },
];

const ALL_CATEGORIES = ['All', ...new Set(PROJECTS.map(p => p.category))];
const ALL_TECHNOLOGIES = [...new Set(PROJECTS.flatMap(p => p.technologies))];

const FilterChip = memo(({ label, selected, onClick }) => (
  <Chip
    label={label}
    clickable
    onClick={onClick}
    color={selected ? "primary" : "default"}
    variant={selected ? "filled" : "outlined"}
    sx={{ fontWeight: 500 }}
  />
));

const ProjectCard = memo(({ project, onOpenDialog }) => {
  const theme = useTheme();

  return (
    <Card
      elevation={2}
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        overflow: 'hidden',
        transition: 'transform 0.15s, box-shadow 0.15s',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: 4
        }
      }}
    >
      <CardMedia
        component="img"
        height="180"
        image={project.image}
        alt={project.title}
        loading="lazy"
      />
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          right: 0,
          backgroundColor: theme.palette.primary.main,
          color: 'white',
          py: 0.5,
          px: 1.5,
          borderBottomLeftRadius: 8
        }}
      >
        <Typography variant="caption" fontWeight="bold">
          {project.category}
        </Typography>
      </Box>

      <CardContent sx={{ flexGrow: 1, pb: 1 }}>
        <Typography variant="h6" component="h2" gutterBottom fontWeight="bold">
          {project.title}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            mb: 2
          }}
        >
          {project.description}
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
          {project.technologies.slice(0, 3).map((tech, index) => (
            <Chip
              key={index}
              label={tech}
              size="small"
              color={TECH_COLORS[tech] || 'default'}
              variant={index % 2 === 0 ? "filled" : "outlined"}
            />
          ))}
          {project.technologies.length > 3 && (
            <Chip
              label={`+${project.technologies.length - 3}`}
              size="small"
              variant="outlined"
            />
          )}
        </Box>
      </CardContent>

      <CardActions sx={{ justifyContent: 'flex-start', px: 2, py: 1 }}>
        <Button
          size="small"
          color="primary"
          onClick={() => onOpenDialog(project)}
          startIcon={<InfoIcon />}
        >
          Details
        </Button>
      </CardActions>
    </Card>
  );
});

const Projects = () => {
  const [dialogProject, setDialogProject] = useState(null);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [techs, setTechs] = useState([]);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));
  const isLargeScreen = useMediaQuery(theme.breakpoints.up('lg'));

  useEffect(() => {
    PROJECTS.forEach(project => {
      const img = new Image();
      img.src = project.image;
    });
  }, []);

  const filteredProjects = useMemo(() => {
    return PROJECTS.filter(project => {
      const matchesSearch = !search ||
        project.title.toLowerCase().includes(search.toLowerCase()) ||
        project.description.toLowerCase().includes(search.toLowerCase());

      const matchesCategory = category === 'All' || project.category === category;

      const matchesTech = techs.length === 0 ||
        techs.every(tech => project.technologies.includes(tech));

      return matchesSearch && matchesCategory && matchesTech;
    });
  }, [search, category, techs]);

  const resetFilters = () => {
    setSearch('');
    setCategory('All');
    setTechs([]);
  };

  const toggleTech = (tech) => {
    setTechs(prev =>
      prev.includes(tech) ? prev.filter(t => t !== tech) : [...prev, tech]
    );
  };

  return (
    <Container
      sx={{
        py: 3,
        overflowX: 'hidden',
        maxWidth: '1200px',
        margin: '0 auto'
      }}
    >
      <Fade in={true} timeout={300}>
        <Box>
          <Typography
            variant={isMobile ? "h4" : "h3"}
            component="h1"
            gutterBottom
            color="primary"
            sx={{
              fontWeight: 'bold',
              position: 'relative',
              display: 'inline-block',
              '&:after': {
                content: '""',
                position: 'absolute',
                width: '60%',
                height: '4px',
                bottom: '-8px',
                left: 0,
                backgroundColor: theme.palette.primary.main,
                borderRadius: '2px'
              }
            }}
          >
            My Projects
          </Typography>

          <Typography variant="body1" paragraph sx={{ mb: 3, maxWidth: '800px' }}>
            Here's a collection of my recent work. Each project represents my skills, creativity, and problem-solving abilities.
          </Typography>

          {/* Search and filters */}
          <Box sx={{ mb: 3 }}>
            <TextField
              placeholder="Search projects..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              size="small"
              fullWidth
              sx={{ mb: 2 }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon fontSize="small" />
                  </InputAdornment>
                ),
              }}
            />

            <Box sx={{ mb: 1.5 }}>
              <Typography variant="subtitle2" gutterBottom>Categories</Typography>
              <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap sx={{ mb: 1 }}>
                {ALL_CATEGORIES.map(cat => (
                  <FilterChip
                    key={cat}
                    label={cat}
                    selected={category === cat}
                    onClick={() => setCategory(cat)}
                  />
                ))}
              </Stack>
            </Box>

            <Box>
              <Typography variant="subtitle2" gutterBottom>Technologies</Typography>
              <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                {ALL_TECHNOLOGIES.map(tech => (
                  <FilterChip
                    key={tech}
                    label={tech}
                    selected={techs.includes(tech)}
                    onClick={() => toggleTech(tech)}
                  />
                ))}
              </Stack>
            </Box>

            {(search || category !== 'All' || techs.length > 0) && (
              <Button
                size="small"
                onClick={resetFilters}
                sx={{ mt: 2 }}
              >
                Clear filters
              </Button>
            )}
          </Box>

          {/* Projects grid */}
          {filteredProjects.length > 0 ? (
            <Grid container spacing={2}>
              {filteredProjects.map((project) => (
                <Grid item xs={12} sm={6} md={4} key={project.id}>
                  <ProjectCard
                    project={project}
                    onOpenDialog={setDialogProject}
                  />
                </Grid>
              ))}
            </Grid>
          ) : (
            <Box sx={{ py: 8, textAlign: 'center' }}>
              <Typography variant="h6" color="text.secondary" gutterBottom>
                No projects match your filters
              </Typography>
              <Button variant="outlined" onClick={resetFilters}>
                Reset all filters
              </Button>
            </Box>
          )}

          {/* Project Details Dialog */}
          <Dialog
            open={!!dialogProject}
            onClose={() => setDialogProject(null)}
            fullWidth
            maxWidth={isTablet ? "md" : "lg"}
            fullScreen={isMobile}
            PaperProps={{
              style: {
                display: 'flex',
                flexDirection: 'column',
                height: isMobile ? '100%' : 'auto', // Auto height for desktop
                maxHeight: '90vh'
              },
            }}
          >
            {dialogProject && (
              <>
                <Box sx={{
                  p: 2,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  borderBottom: `1px solid ${theme.palette.divider}`,
                  position: 'sticky',
                  top: 0,
                  backgroundColor: 'background.paper',
                  zIndex: 1,
                }}>
                  <Box>
                    <Typography variant="h5" fontWeight="bold">
                      {dialogProject.title}
                    </Typography>
                    <Chip
                      label={dialogProject.category}
                      color="primary"
                      size="small"
                      sx={{ mt: 1 }}
                    />
                  </Box>
                  <IconButton onClick={() => setDialogProject(null)} size="small">
                    <CloseIcon />
                  </IconButton>
                </Box>

                {/* Modified layout for desktop view */}
                {!isMobile ? (
                  <Box sx={{ 
                    display: 'flex', 
                    flexDirection: isLargeScreen ? 'row' : 'column',
                    p: 2,
                    gap: 2,
                  }}>
                    {/* Image container with limited height for desktop */}
                    <Box sx={{
                      flex: isLargeScreen ? '0 0 40%' : '0 0 auto',
                      height: isLargeScreen ? '250px' : '220px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: 'rgba(0, 0, 0, 0.03)',
                      borderRadius: 1,
                      overflow: 'hidden'
                    }}>
                      <img
                        src={dialogProject.image}
                        alt={dialogProject.title}
                        style={{
                          maxWidth: '100%',
                          maxHeight: '100%',
                          objectFit: 'contain',
                          objectPosition: 'center'
                        }}
                      />
                    </Box>

                    {/* Content container */}
                    <Box sx={{ 
                      flex: isLargeScreen ? '0 0 60%' : '1 1 auto',
                    }}>
                      <Typography variant="h6" gutterBottom fontWeight="bold">
                        Project Overview
                      </Typography>
                      <Typography variant="body2" paragraph>
                        {dialogProject.longDescription}
                      </Typography>

                      <Typography variant="h6" gutterBottom fontWeight="bold" sx={{ mt: 2 }}>
                        Technologies Used
                      </Typography>
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                        {dialogProject.technologies.map((tech, index) => (
                          <Chip
                            key={index}
                            label={tech}
                            color={TECH_COLORS[tech] || 'default'}
                            size="small"
                          />
                        ))}
                      </Box>
                    </Box>
                  </Box>
                ) : (
                  // Mobile layout remains the same but with reduced height
                  <>
                    <Box sx={{
                      position: 'relative',
                      width: '100%',
                      height: 0,
                      paddingBottom: '50%', // Reduced from 56.25%
                      overflow: 'hidden',
                    }}>
                      <img
                        src={dialogProject.image}
                        alt={dialogProject.title}
                        style={{
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          width: '100%',
                          height: '100%',
                          objectFit: 'contain',
                          objectPosition: 'center',
                          backgroundColor: 'rgba(0, 0, 0, 0.05)'
                        }}
                      />
                    </Box>

                    <Box sx={{ p: 2 }}>
                      <Typography variant="h6" gutterBottom fontWeight="bold">
                        Project Overview
                      </Typography>
                      <Typography variant="body2" paragraph>
                        {dialogProject.longDescription}
                      </Typography>

                      <Typography variant="h6" gutterBottom fontWeight="bold" sx={{ mt: 2 }}>
                        Technologies Used
                      </Typography>
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                        {dialogProject.technologies.map((tech, index) => (
                          <Chip
                            key={index}
                            label={tech}
                            color={TECH_COLORS[tech] || 'default'}
                            size="small"
                          />
                        ))}
                      </Box>
                    </Box>
                  </>
                )}
              </>
            )}
          </Dialog>
        </Box>
      </Fade>
    </Container>
  );
};

export default Projects;