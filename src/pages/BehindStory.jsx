import React, { useState, useMemo } from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Container,
  useTheme,
  useMediaQuery,
  Fade,
  Chip,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Modal,
  IconButton,
} from '@mui/material';

// Icons - import only what we need
import CodeIcon from '@mui/icons-material/Code';
import DesignServicesIcon from '@mui/icons-material/DesignServices';
import EmojiObjectsIcon from '@mui/icons-material/EmojiObjects';
import DevicesIcon from '@mui/icons-material/Devices';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import PaletteIcon from '@mui/icons-material/Palette';
import CloseIcon from '@mui/icons-material/Close';

// Import placeholder images
import storyImage1 from '../assets/images/herosection.jpg';
import storyImage2 from '../assets/images/design.jpg';
import musicImage from '../assets/images/music.jpg';
import themeImage from '../assets/images/themes.jpg';

// Reusable components for better code organization and reuse
const Section = ({ title, children, sx = {} }) => (
  <Fade in timeout={800}>
    <Paper elevation={3} sx={{ p: { xs: 2, sm: 3, md: 4 }, mb: 5, borderRadius: 2, overflowX: 'hidden', ...sx }}>
      <Typography variant="h5" gutterBottom color="primary" sx={{ fontWeight: 'bold', mb: 2, fontSize: { xs: '1.2rem', sm: '1.5rem' }, wordBreak: 'break-word' }}>
        {title}
      </Typography>
      {children}
    </Paper>
  </Fade>
);

const ChapterText = ({ children }) => (
  <Typography variant="body1" paragraph sx={{ fontSize: { xs: '0.9rem', sm: '1rem' }, wordBreak: 'break-word' }}>
    {children}
  </Typography>
);

const BehindStory = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageClick = (image) => {
    setSelectedImage(image);
    setModalOpen(true);
  };

  const handleCloseModal = () => setModalOpen(false);

  // Memoize content to prevent unnecessary re-renders
  const content = useMemo(() => ({
    techStack: ['React.js', 'Material UI'],
    journeyPhases: ['Ideation', 'Design', 'Development', 'Launch'],
    journeyIcons: [<EmojiObjectsIcon key="idea" />, <DesignServicesIcon key="design" />, <CodeIcon key="code" />, <DevicesIcon key="devices" />],
    favoriteSongs: [
      { title: '2:23 AM', artist: 'Sharou' },
      { title: 'Blue', artist: 'yungkai' },
      { title: 'Dancing Through Fantasies', artist: 'Wuthering Waves' },
      { title: 'REVIVER', artist: 'Sawano Hiroyuki' },
    ],
    themes: [
      { name: 'Red & Yellow', primary: '#d32f2f', secondary: '#ffc107' },
      { name: 'Blue & Orange', primary: '#1976d2', secondary: '#ff9800' },
      { name: 'Green & Purple', primary: '#4caf50', secondary: '#7e57c2' },
      { name: 'Purple & Teal', primary: '#6200ee', secondary: '#00bcd4' },
      { name: 'Amber & Indigo', primary: '#ffc107', secondary: '#3f51b5' },
      { name: 'Teal & Coral', primary: '#009688', secondary: '#ff5722' },
    ],
    details: [
      {
        title: 'Fluid Responsiveness',
        description: 'Every element adapts smoothly to its surroundings.'
      },
      {
        title: 'Subtle Animations',
        description: 'Animations guide your eyes without stealing the show.'
      },
      {
        title: 'Accessibility First',
        description: 'Great design is meant for everyone to enjoy.'
      }
    ],
    chapters: [
      {
        title: "Chapter 1: The Midnight Spark",
        image: storyImage1,
        imageAlt: "Early sketches and ideas",
        paragraphs: [
          "It all began almost at midnight, when a wild idea crashed into my brain like a burst of raw inspiration.",
          "No fancy roadmap—just a raw, honest moment of creative madness that I couldn't ignore.",
          "Armed with a humble sketchpad and a cheeky grin, I jotted down every quirky thought that popped up.",
          "Sometimes, the best adventures start when the world is asleep, and your passion takes over."
        ],
        imagePosition: "right"
      },
      {
        title: "Chapter 2: Shaking Up the Status Quo",
        image: storyImage2,
        imageAlt: "Design mockups",
        paragraphs: [
          "I kicked things off with the usual navigation sketches—safe, but honestly a bit boring.",
          "Soon enough, I felt something was missing; a spark that could turn the ordinary into something special.",
          "Then it hit me: why not create a dedicated space to share my unfiltered journey?",
          "Taking that little creative risk transformed the whole project into something uniquely mine."
        ],
        imagePosition: "left",
        background: 'linear-gradient(to right, rgba(0,0,0,0.02), rgba(0,0,0,0.05))'
      },
      {
        title: "Chapter 3: Code in Motion",
        paragraphs: [
          "Next came a marathon coding session where I dove headfirst into turning sketches into a living, breathing website.",
          "I tangled with quirky bugs, refactored messy code, and even laughed at my own silly typos.",
          "Every keystroke brought me closer to a site that blended raw creativity with technical hustle.",
          "It wasn't always smooth sailing, but every challenge added its own bit of charm."
        ],
        showJourneyPhases: true
      },
      {
        title: "Chapter 4: The Soundtrack of Creativity",
        image: musicImage,
        imageAlt: "Music illustration",
        paragraphs: [
          "A portfolio without music feels like a film without its score—it just isn't complete.",
          "I handpicked tunes that keep my creative flow going, each track echoing a slice of my journey.",
          "Music isn't just background noise; it's the pulse that brings every design and line of code to life."
        ],
        showSongList: true,
        imagePosition: "right",
        background: (theme) => `linear-gradient(to right, ${theme.palette.background.paper}, rgba(${theme.palette.secondary.main.replace('rgb(', '').replace(')', '')}, 0.05))`
      },
      {
        title: "Chapter 5: A Splash of Color",
        image: themeImage,
        imageAlt: "Color theme options",
        paragraphs: [
          "After laying down the basics, I realized one thing was missing—a burst of personality that only color can deliver.",
          "The solution was delightfully simple: theme options that let you switch the vibe with a tap.",
          "Each theme brings its own mix of colors, instantly changing the mood of the interface.",
          "It might just be a toggle, but it transforms the entire experience."
        ],
        showThemes: true,
        imagePosition: "left"
      }
    ]
  }), []);

  // Memoized image card component for better performance
  const ImageCard = useMemo(() => {
    return ({ image, alt }) => (
      <Card
        elevation={3}
        sx={{
          transition: 'transform 0.3s ease-in-out',
          cursor: 'pointer',
          '&:hover': {
            transform: 'scale(1.02)',
            boxShadow: theme.shadows[5],
          },
          maxWidth: '100%'
        }}
        onClick={() => handleImageClick(image)}
      >
        <CardMedia
          component="img"
          image={image}
          alt={alt}
          sx={{ height: { xs: 200, sm: 220, md: 250 }, objectFit: 'cover' }}
          loading="lazy" // Lazy loading for images
        />
      </Card>
    );
  }, [theme.shadows, handleImageClick]);

  // Render only visible chapters based on viewport to reduce initial rendering load
  const renderChapter = (chapter, index) => {
    return (
      <Section 
        key={index} 
        title={chapter.title} 
        sx={typeof chapter.background === 'function' ? { background: chapter.background(theme) } : { background: chapter.background }}
      >
        <Grid container spacing={isMobile ? 2 : 4} direction={chapter.imagePosition === "left" && !isMobile ? "row" : chapter.imagePosition === "left" && isMobile ? "column-reverse" : "row"}>
          {chapter.imagePosition === "left" && (
            <Grid item xs={12} md={5}>
              <ImageCard image={chapter.image} alt={chapter.imageAlt} />
            </Grid>
          )}
          
          <Grid item xs={12} md={chapter.showSongList || chapter.showThemes ? 7 : chapter.imagePosition ? 7 : 12}>
            {chapter.paragraphs.map((paragraph, i) => (
              <ChapterText key={i}>{paragraph}</ChapterText>
            ))}

            {chapter.showSongList && (
              <List>
                {content.favoriteSongs.map((song, i) => (
                  <ListItem key={song.title} sx={{ py: { xs: 0.5, sm: 1 } }}>
                    <ListItemIcon>
                      <MusicNoteIcon color={i % 2 === 0 ? 'primary' : 'secondary'} />
                    </ListItemIcon>
                    <ListItemText 
                      primary={song.title} 
                      secondary={song.artist} 
                      primaryTypographyProps={{ fontWeight: 'medium', sx: { fontSize: { xs: '0.9rem', sm: '1rem' } } }}
                      secondaryTypographyProps={{ sx: { fontSize: { xs: '0.8rem', sm: '0.875rem' } } }}
                    />
                  </ListItem>
                ))}
              </List>
            )}

            {chapter.showThemes && (
              <Box sx={{ my: 2.5 }}>
                <Typography variant="subtitle1" color="primary" sx={{ fontWeight: 'bold', mb: 1.5, fontSize: { xs: '0.9rem', sm: '1rem' } }}>
                  Available Themes:
                </Typography>
                <Grid container spacing={isMobile ? 1 : 2}>
                  {content.themes.map((colorTheme) => (
                    <Grid item xs={6} sm={4} key={colorTheme.name}>
                      <Card
                        elevation={2}
                        sx={{
                          p: { xs: 1.5, sm: 2 },
                          transition: 'all 0.2s ease',
                          '&:hover': {
                            transform: 'translateY(-3px)',
                            boxShadow: theme.shadows[4],
                          },
                        }}
                      >
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                          <PaletteIcon sx={{ mr: 1, color: colorTheme.primary, fontSize: { xs: '1.2rem', sm: '1.5rem' } }} />
                          <Typography variant="subtitle2" fontWeight="bold" sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' }, wordBreak: 'break-word' }}>
                            {colorTheme.name}
                          </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', gap: 1 }}>
                          <Box
                            sx={{
                              width: { xs: 20, sm: 24 },
                              height: { xs: 20, sm: 24 },
                              borderRadius: '50%',
                              bgcolor: colorTheme.primary,
                              border: '2px solid white',
                              boxShadow: '0 0 0 1px rgba(0,0,0,0.1)',
                            }}
                          />
                          <Box
                            sx={{
                              width: { xs: 20, sm: 24 },
                              height: { xs: 20, sm: 24 },
                              borderRadius: '50%',
                              bgcolor: colorTheme.secondary,
                              border: '2px solid white',
                              boxShadow: '0 0 0 1px rgba(0,0,0,0.1)',
                            }}
                          />
                        </Box>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </Box>
            )}
          </Grid>
          
          {chapter.imagePosition === "right" && (
            <Grid item xs={12} md={5}>
              <ImageCard image={chapter.image} alt={chapter.imageAlt} />
            </Grid>
          )}
        </Grid>
      </Section>
    );
  };
  
  return (
    <Container maxWidth="lg" sx={{ px: { xs: 2, sm: 3 }, overflowX: 'hidden' }}>
      <Fade in timeout={600}>
        <Box sx={{ py: 4 }}>
          {/* Title */}
          <Typography
            variant="h3"
            component="h1"
            gutterBottom
            color="primary"
            sx={{
              fontWeight: 'bold',
              textAlign: 'center',
              mb: 4,
              fontSize: { xs: '1.8rem', sm: '2.2rem', md: '2.5rem' },
              wordBreak: 'break-word',
              position: 'relative',
              '&::after': {
                content: '""',
                position: 'absolute',
                bottom: -10,
                left: 'calc(50% - 40px)',
                width: 80,
                height: 4,
                backgroundColor: theme.palette.primary.main,
                borderRadius: 2,
              },
            }}
          >
            My Portfolio's Backstory
          </Typography>

          {/* Hero Section */}
          <Paper
            elevation={4}
            sx={{
              p: { xs: 2, sm: 3 },
              mb: 5,
              position: 'relative',
              overflow: 'hidden',
              height: { xs: 180, sm: 200, md: 220 },
              borderRadius: 2,
              backgroundImage: `url(${storyImage1})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              cursor: 'pointer',
            }}
            onClick={() => handleImageClick(storyImage1)}
          >
            <Box sx={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.6)', zIndex: 1 }} />
            <Box
              sx={{
                position: 'relative',
                zIndex: 2,
                color: 'white',
                textAlign: 'center',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                px: 2
              }}
            >
              <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', fontSize: { xs: '1.2rem', sm: '1.5rem' } }}>
                A Spontaneous Digital Adventure
              </Typography>
              <Typography variant="body1" sx={{ maxWidth: '800px', mx: 'auto', fontSize: { xs: '0.9rem', sm: '1rem' } }}>
                Not all heroes wear capes—some code in comfy pajamas.
              </Typography>
            </Box>
          </Paper>

          {/* Story Chapters 1 and 2 */}
          {content.chapters.slice(0, 2).map(renderChapter)}

          {/* Breaking the Mold Section */}
          <Section title="Breaking the Mold: Meet 'Story'">
            <ChapterText>
              Let's be honest—most sites roll out the same old menu items: Home, About, Projects, Contacts. They work, but they can feel a bit run-of-the-mill.
            </ChapterText>
            <ChapterText>
              That's why I carved out a little corner for something different—a "Story" menu that dives into the creative chaos and magic behind this portfolio.
            </ChapterText>
          </Section>

          {/* Chapter 3 */}
          <Section title={content.chapters[2].title}>
            {content.chapters[2].paragraphs.map((paragraph, i) => (
              <ChapterText key={i}>{paragraph}</ChapterText>
            ))}

            <Grid container spacing={isMobile ? 2 : 3} sx={{ mb: 3, mt: 1 }}>
              {content.journeyPhases.map((phase, index) => (
                <Grid item xs={6} sm={3} key={phase}>
                  <Fade in timeout={700 + index * 150}>
                    <Card
                      sx={{
                        height: '100%',
                        transition: 'transform 0.3s ease-in-out',
                        '&:hover': {
                          transform: 'translateY(-5px)',
                          boxShadow: theme.shadows[4],
                        },
                      }}
                    >
                      <CardContent sx={{ textAlign: 'center', p: { xs: 1.5, sm: 2 } }}>
                        <Box
                          sx={{
                            mx: 'auto',
                            mb: 1.5,
                            width: 36,
                            height: 36,
                            borderRadius: '50%',
                            bgcolor: index % 2 === 0 ? 'primary.main' : 'secondary.main',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'white',
                          }}
                        >
                          {content.journeyIcons[index]}
                        </Box>
                        <Typography variant="subtitle1" fontWeight="bold" color={index % 2 === 0 ? 'primary' : 'secondary'} sx={{ fontSize: { xs: '0.8rem', sm: '0.9rem', md: '1rem' } }}>
                          {phase}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Fade>
                </Grid>
              ))}
            </Grid>
          </Section>

          {/* Chapters 4 and 5 */}
          {content.chapters.slice(3, 5).map(renderChapter)}

          {/* Tech Stack - simplified */}
          <Section
            title="Tools of My Trade"
            sx={{ background: `linear-gradient(to right, ${theme.palette.background.paper}, rgba(${theme.palette.primary.main.replace('rgb(', '').replace(')', '')}, 0.05))` }}
          >
            <ChapterText>
              Keeping it simple, I lean on React.js and Material UI—my trusty sidekicks on this digital adventure.
            </ChapterText>

            <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 1, my: 3 }}>
              {content.techStack.map((tech, index) => (
                <Fade key={tech} in timeout={800 + index * 100}>
                  <Chip 
                    label={tech} 
                    color={index % 2 === 0 ? 'primary' : 'secondary'} 
                    variant="filled" 
                    sx={{ m: 0.5, fontSize: { xs: '0.75rem', sm: '0.875rem' } }} 
                  />
                </Fade>
              ))}
            </Box>

            <ChapterText>
              These tools let me build, experiment, and bring my creative ideas to life—one line of code at a time.
            </ChapterText>
          </Section>

          {/* Chapter 6 - Details */}
          <Section title="Chapter 6: The Little Things Matter">
            <ChapterText>
              The real magic is in the details—the small, thoughtful touches that make an experience unforgettable.
            </ChapterText>
            
            <Grid container spacing={isMobile ? 2 : 3} sx={{ my: 2 }}>
              {content.details.map((detail, index) => (
                <Grid item xs={12} sm={6} md={4} key={detail.title}>
                  <Card
                    sx={{
                      height: '100%',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        transform: 'translateY(-5px)',
                        boxShadow: theme.shadows[6],
                      },
                    }}
                  >
                    <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
                      <Typography variant="h6" gutterBottom color="primary" sx={{ fontWeight: 'bold', fontSize: { xs: '1rem', sm: '1.25rem' }, wordBreak: 'break-word' }}>
                        {detail.title}
                      </Typography>
                      <Typography variant="body2" paragraph sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' }, mb: 0 }}>
                        {detail.description}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
            
            <ChapterText>
              Each tweak brings me closer to an interface that's as inviting as it is polished.
            </ChapterText>
          </Section>

          {/* Chapter 7 - simplified */}
          <Section title="Chapter 7: The Adventure Goes On">
            <ChapterText>
              This portfolio might seem like a complete story, but it's really just one snapshot of a bigger adventure.
            </ChapterText>
            <ChapterText>
              I'm always exploring fresh ideas, trying out new designs, and learning as I go.
            </ChapterText>
            <ChapterText>
              Stay tuned, because the best is yet to happen!
            </ChapterText>
          </Section>

          {/* Epilogue - simplified */}
          <Fade in timeout={1000}>
            <Paper
              elevation={3}
              sx={{
                p: { xs: 2, sm: 3, md: 4 },
                borderRadius: 2,
                background: `linear-gradient(to bottom, ${theme.palette.background.paper} 0%, rgba(${theme.palette.primary.main.replace('rgb(', '').replace(')', '')}, 0.05) 100%)`,
              }}
            >
              <Typography variant="h5" gutterBottom color="primary" sx={{ fontWeight: 'bold', textAlign: 'center', mb: 3, fontSize: { xs: '1.2rem', sm: '1.5rem' } }}>
                Epilogue: Reflecting on the Ride
              </Typography>

              <Typography variant="body1" paragraph sx={{ maxWidth: 800, mx: 'auto', fontSize: { xs: '0.9rem', sm: '1rem' } }}>
                Looking back, it all started with a wild night idea that evolved into a hands-on exploration of design and code. This portfolio isn't just a showcase—it's like a journal of my creative journey, complete with experiments, mishaps, and small wins.
              </Typography>

              <Box sx={{ width: '30%', mx: 'auto', my: 3, borderBottom: `1px solid ${theme.palette.divider}` }} />

              <Typography
                variant="body1"
                sx={{
                  fontStyle: 'italic',
                  textAlign: 'center',
                  color: theme.palette.primary.main,
                  py: 1,
                  mx: 'auto',
                  fontSize: { xs: '0.9rem', sm: '1rem' }
                }}
              >
                "Sometimes the most unexpected journeys begin with a late-night spark."
              </Typography>

              <Typography variant="body1" sx={{ textAlign: 'center', mt: 3, fontSize: { xs: '0.9rem', sm: '1rem' } }}>
                Thanks for joining me on this ride.
              </Typography>
            </Paper>
          </Fade>
        </Box>
      </Fade>

      {/* Improved Image Modal - full screen with no bars */}
      <Modal
        open={modalOpen}
        onClose={handleCloseModal}
        closeAfterTransition
      >
        <Fade in={modalOpen}>
          <Box
            sx={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100vw',
              height: '100vh',
              backgroundColor: 'rgba(0, 0, 0, 0.9)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: theme.zIndex.modal,
            }}
            onClick={handleCloseModal}
          >
            {/* Close button positioned in corner */}
            <IconButton
              onClick={handleCloseModal}
              sx={{
                position: 'absolute',
                top: 16,
                right: 16,
                color: 'white',
                backgroundColor: 'rgba(0, 0, 0, 0.2)',
                '&:hover': {
                  backgroundColor: 'rgba(0, 0, 0, 0.5)',
                },
                zIndex: theme.zIndex.modal + 1,
              }}
            >
              <CloseIcon />
            </IconButton>

            {/* Image container taking full viewport with no padding */}
            {selectedImage && (
              <Box
                sx={{
                  width: '100%',
                  height: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                onClick={(e) => e.stopPropagation()} // Prevent click from closing when clicking image
              >
                <img
                  src={selectedImage}
                  alt="Full view"
                  style={{
                    maxWidth: '100%',
                    maxHeight: '100%',
                    objectFit: 'contain',
                  }}
                  loading="eager"
                />
              </Box>
            )}
          </Box>
        </Fade>
      </Modal>
    </Container>
  );
};

export default BehindStory;