import React, { useState, useRef, useEffect } from 'react';
import {
  Box, IconButton, List, ListItem, ListItemText, Typography,
  Paper, Popper, Fade, ClickAwayListener, Slider, Tooltip,
  useTheme, Divider, Avatar, Grid
} from '@mui/material';
import {
  MusicNote, PlayArrow, Pause, VolumeUp, VolumeDown, VolumeOff,
  SkipNext, SkipPrevious, QueueMusic, Repeat, Shuffle,
  ChevronLeft, ChevronRight
} from '@mui/icons-material';
import backgroundMusic1 from '../assets/musics/Lagu1.mp3';
import backgroundMusic2 from '../assets/musics/Lagu2.mp3';
import backgroundMusic3 from '../assets/musics/Lagu3.mp3';
import backgroundMusic4 from '../assets/musics/Lagu4.mp3';

const tracks = [
  { name: "2:23 AM", artist: "Sharou", file: backgroundMusic1, duration: "3:16" },
  { name: "Blue", artist: "yung kai", file: backgroundMusic2, duration: "3:34" },
  { name: "Dancing Through Fantasies", artist: "Wuthering Waves", file: backgroundMusic3, duration: "3:20" },
  { name: "REVIVER", artist: "Sawano Hiroyuki", file: backgroundMusic4, duration: "3:11" }
];

const formatTime = (seconds) => {
  if (!seconds || isNaN(seconds)) return "0:00";
  return `${Math.floor(seconds / 60)}:${Math.floor(seconds % 60).toString().padStart(2, '0')}`;
};

const MusicPlayer = () => {
  const theme = useTheme();
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [showPlaylist, setShowPlaylist] = useState(false);
  const [shuffle, setShuffle] = useState(false);
  const [repeat, setRepeat] = useState(false);
  // Untuk navigasi playlist horizontal
  const [playlistPage, setPlaylistPage] = useState(0);
  const tracksPerPage = 2; // Menampilkan 2 lagu per halaman
  
  const audioRef = useRef(null);
  const anchorRef = useRef(null);
  const timeoutRef = useRef(null);

  // Menghitung jumlah halaman
  const pageCount = Math.ceil(tracks.length / tracksPerPage);

  // Dapatkan lagu untuk halaman saat ini
  const getCurrentPageTracks = () => {
    const startIndex = playlistPage * tracksPerPage;
    return tracks.slice(startIndex, startIndex + tracksPerPage);
  };

  // Fungsi untuk berpindah halaman ke kanan
  const nextPage = () => {
    setPlaylistPage((prev) => (prev + 1) % pageCount);
    resetMenuTimeout();
  };

  // Fungsi untuk berpindah halaman ke kiri
  const prevPage = () => {
    setPlaylistPage((prev) => (prev > 0 ? prev - 1 : pageCount - 1));
    resetMenuTimeout();
  };

  // Auto-close timeout management
  useEffect(() => {
    const setupAutoClose = () => {
      clearTimeout(timeoutRef.current);
      if (menuOpen) {
        timeoutRef.current = setTimeout(() => {
          setMenuOpen(false);
        }, 2000); // Close after 2 seconds of inactivity
      }
    };

    setupAutoClose();

    return () => {
      clearTimeout(timeoutRef.current);
    };
  }, [menuOpen]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
    
    audioRef.current = new Audio(tracks[currentTrack].file);
    audioRef.current.volume = volume;

    const handleMetadata = () => setDuration(audioRef.current.duration);
    const handleTimeUpdate = () => {
      if (audioRef.current?.duration) {
        const current = audioRef.current.currentTime;
        setCurrentTime(current);
        setProgress((current / audioRef.current.duration) * 100);
      }
    };

    const handleEnded = () => {
      if (repeat) {
        audioRef.current.currentTime = 0;
        audioRef.current.play();
      } else {
        handleNext();
      }
    };

    audioRef.current.addEventListener('loadedmetadata', handleMetadata);
    audioRef.current.addEventListener('timeupdate', handleTimeUpdate);
    audioRef.current.addEventListener('ended', handleEnded);

    if (isPlaying) {
      audioRef.current.play().catch(err => console.error("Error playing audio:", err));
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.removeEventListener('timeupdate', handleTimeUpdate);
        audioRef.current.removeEventListener('loadedmetadata', handleMetadata);
        audioRef.current.removeEventListener('ended', handleEnded);
      }
      clearTimeout(timeoutRef.current);
    };
  }, [currentTrack, repeat]);

  // Reset timeout whenever there's user interaction
  const resetMenuTimeout = () => {
    clearTimeout(timeoutRef.current);
    if (menuOpen) {
      timeoutRef.current = setTimeout(() => setMenuOpen(false), 2000);
    }
  };

  const togglePlay = () => {
    setIsPlaying(prev => {
      const newState = !prev;
      if (newState) {
        audioRef.current?.play().catch(err => console.error("Error playing audio:", err));
      } else {
        audioRef.current?.pause();
      }
      return newState;
    });
    resetMenuTimeout();
  };

  const handleTrackChange = (index) => {
    if (index < 0 || index >= tracks.length) return;
    setCurrentTrack(index);
    setIsPlaying(true);
    resetMenuTimeout();
  };

  const handleNext = () => {
    const nextIndex = shuffle 
      ? Math.floor(Math.random() * tracks.length)
      : (currentTrack + 1) % tracks.length;
    handleTrackChange(nextIndex);
  };
  
  const handlePrevious = () => {
    if (audioRef.current && audioRef.current.currentTime > 3) {
      audioRef.current.currentTime = 0;
    } else {
      const prevIndex = shuffle
        ? Math.floor(Math.random() * tracks.length)
        : (currentTrack - 1 + tracks.length) % tracks.length;
      handleTrackChange(prevIndex);
    }
  };

  const toggleShuffle = () => {
    setShuffle(prev => !prev);
    resetMenuTimeout();
  };
  const toggleRepeat = () => {
    setRepeat(prev => !prev);
    resetMenuTimeout();
  };

  const handleMainButtonClick = () => {
    setMenuOpen(prev => !prev);
    if (!menuOpen && !isPlaying) {
      togglePlay();
    }
    resetMenuTimeout();
  };

  const handleVolumeChange = (_, newValue) => {
    setVolume(newValue);
    if (audioRef.current) {
      audioRef.current.volume = newValue;
    }
    resetMenuTimeout();
  };

  const getVolumeIcon = () => {
    if (volume === 0) return <VolumeOff fontSize="small" />;
    if (volume < 0.5) return <VolumeDown fontSize="small" />;
    return <VolumeUp fontSize="small" />;
  };

  // When user moves mouse over the popup, reset the timeout
  const handleMouseMove = () => {
    resetMenuTimeout();
  };

  const TrackInfo = () => (
    <Box sx={{ mb: 1 }}>
      <Typography variant="subtitle2" fontWeight="medium" noWrap>
        {tracks[currentTrack].name}
      </Typography>
      <Typography variant="caption" color="text.secondary" noWrap>
        {tracks[currentTrack].artist}
      </Typography>
    </Box>
  );

  const ProgressBar = () => (
    <Box sx={{ mb: 1 }}>
      <Slider
        size="small"
        value={progress}
        onChange={(_, newValue) => {
          if (audioRef.current) {
            audioRef.current.currentTime = (newValue / 100) * audioRef.current.duration;
          }
          resetMenuTimeout();
        }}
        sx={{
          color: theme.palette.primary.main,
          height: 4,
          p: 0,
          '& .MuiSlider-thumb': {
            width: 8,
            height: 8,
            display: 'none',
            '&:hover, &.Mui-active': { boxShadow: `0 0 0 6px ${theme.palette.primary.main}33` }
          },
          '&:hover .MuiSlider-thumb': { display: 'block' }
        }}
      />
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 0.5 }}>
        <Typography variant="caption" color="text.secondary">
          {formatTime(currentTime)}
        </Typography>
        <Typography variant="caption" color="text.secondary">
          {formatTime(duration)}
        </Typography>
      </Box>
    </Box>
  );

  const Controls = () => (
    <Grid container spacing={1} alignItems="center" justifyContent="center" sx={{ mb: 1 }}>
      <Grid item>
        <IconButton onClick={toggleShuffle} color={shuffle ? "primary" : "default"} size="small">
          <Shuffle fontSize="small" />
        </IconButton>
      </Grid>
      <Grid item>
        <IconButton onClick={handlePrevious} color="primary" size="small">
          <SkipPrevious fontSize="small" sx={{ fontSize: 16 }} />
        </IconButton>
      </Grid>
      <Grid item>
        <IconButton 
          onClick={togglePlay}
          sx={{ 
            bgcolor: theme.palette.primary.main,
            color: theme.palette.primary.contrastText,
            '&:hover': { bgcolor: theme.palette.primary.dark },
          }}
          size="small"
        >
          {isPlaying ? <Pause fontSize="small" sx={{ fontSize: 16 }} /> : <PlayArrow fontSize="small" sx={{ fontSize: 16 }} />}
        </IconButton>
      </Grid>
      <Grid item>
        <IconButton onClick={handleNext} color="primary" size="small">
          <SkipNext fontSize="small" sx={{ fontSize: 16 }} />
        </IconButton>
      </Grid>
      <Grid item>
        <IconButton onClick={toggleRepeat} color={repeat ? "primary" : "default"} size="small">
          <Repeat fontSize="small" />
        </IconButton>
      </Grid>
    </Grid>
  );

  const VolumeControl = () => (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', width: '75%' }}>
        <IconButton size="small" onClick={() => handleVolumeChange(null, volume === 0 ? 0.5 : 0)}>
          {getVolumeIcon()}
        </IconButton>
        <Slider
          size="small"
          value={volume}
          onChange={handleVolumeChange}
          min={0}
          max={1}
          step={0.1}
          sx={{ ml: 1, color: theme.palette.primary.main }}
        />
      </Box>
      <IconButton
        size="small"
        onClick={() => {
          setShowPlaylist(!showPlaylist);
          resetMenuTimeout();
        }}
        color={showPlaylist ? "primary" : "default"}
      >
        <QueueMusic fontSize="small" />
      </IconButton>
    </Box>
  );

  const PlaylistView = () => (
    showPlaylist && (
      <>
        <Divider />
        <Box sx={{ mt: 1 }}>
          {/* Navigasi playlist horizontal */}
          <Box sx={{ 
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center', 
            mb: 0.5,
            position: 'relative'
          }}>
            <Box sx={{ position: 'absolute', left: 0, zIndex: 2 }}>
              <IconButton 
                size="small" 
                onClick={prevPage}
                sx={{ 
                  bgcolor: theme.palette.background.paper,
                  boxShadow: 1,
                  '&:hover': { bgcolor: theme.palette.grey[100] }
                }}
              >
                <ChevronLeft fontSize="small" />
              </IconButton>
            </Box>
            
            <Typography 
              variant="caption" 
              sx={{ 
                width: '100%', 
                textAlign: 'center',
                px: 4 // Space for buttons on sides
              }}
            >
              {playlistPage + 1} / {pageCount}
            </Typography>
            
            <Box sx={{ position: 'absolute', right: 0, zIndex: 2 }}>
              <IconButton 
                size="small" 
                onClick={nextPage}
                sx={{ 
                  bgcolor: theme.palette.background.paper,
                  boxShadow: 1,
                  '&:hover': { bgcolor: theme.palette.grey[100] }
                }}
              >
                <ChevronRight fontSize="small" />
              </IconButton>
            </Box>
          </Box>
          
          {/* Container lagu dengan efek slide horizontal */}
          <Box sx={{ 
            position: 'relative',
            overflow: 'hidden',
            transition: 'all 0.3s ease'
          }}>
            <List sx={{ 
              py: 0,
              transition: 'transform 0.3s ease',
            }}>
              {getCurrentPageTracks().map((track, idx) => {
                const index = playlistPage * tracksPerPage + idx;
                return (
                  <ListItem
                    key={index}
                    onClick={() => handleTrackChange(index)}
                    dense
                    disablePadding
                    sx={{
                      py: 0.5,
                      px: 1.5,
                      borderLeft: currentTrack === index ? `3px solid ${theme.palette.primary.main}` : '3px solid transparent',
                      bgcolor: currentTrack === index ? `${theme.palette.primary.main}10` : 'transparent',
                      '&:hover': { bgcolor: theme.palette.action.hover },
                      cursor: 'pointer',
                    }}
                  >
                    <Avatar
                      sx={{
                        width: 24,
                        height: 24,
                        mr: 1,
                        bgcolor: currentTrack === index ? theme.palette.primary.main : theme.palette.grey[500],
                        fontSize: '0.75rem'
                      }}
                    >
                      {index + 1}
                    </Avatar>
                    <ListItemText
                      primary={track.name}
                      secondary={track.artist}
                      primaryTypographyProps={{
                        variant: 'body2',
                        noWrap: true,
                        fontWeight: currentTrack === index ? 'medium' : 'regular',
                        color: currentTrack === index ? theme.palette.primary.main : 'inherit',
                      }}
                      secondaryTypographyProps={{
                        variant: 'caption',
                        noWrap: true,
                      }}
                    />
                    <Typography variant="caption" color="text.secondary">
                      {track.duration}
                    </Typography>
                  </ListItem>
                );
              })}
            </List>
          </Box>

          {/* Indikator halaman (dot) */}
          {pageCount > 1 && (
            <Box sx={{ 
              display: 'flex', 
              justifyContent: 'center', 
              gap: 0.5, 
              mt: 0.5 
            }}>
              {[...Array(pageCount)].map((_, i) => (
                <Box 
                  key={i}
                  onClick={() => setPlaylistPage(i)}
                  sx={{
                    width: 6,
                    height: 6,
                    borderRadius: '50%',
                    bgcolor: i === playlistPage ? theme.palette.primary.main : theme.palette.grey[400],
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                />
              ))}
            </Box>
          )}
        </Box>
      </>
    )
  );
  
  return (
    <ClickAwayListener onClickAway={() => setMenuOpen(false)}>
      <Box sx={{ position: 'fixed', bottom: 16, right: 16, zIndex: 1000 }}>
        <Tooltip title={isPlaying ? "Music Controls" : "Play Music"} placement="left">
          <IconButton
            ref={anchorRef}
            onClick={handleMainButtonClick}
            sx={{
              bgcolor: isPlaying ? theme.palette.primary.main : theme.palette.background.paper,
              color: isPlaying ? theme.palette.primary.contrastText : theme.palette.text.primary,
              boxShadow: 2,
              '&:hover': {
                bgcolor: isPlaying ? theme.palette.primary.dark : theme.palette.primary.light,
              },
              width: 48,
              height: 48,
              borderRadius: '50%',
              animation: isPlaying ? 'pulse 2s infinite ease-in-out' : 'none',
              '@keyframes pulse': {
                '0%': { boxShadow: `0 0 0 0 ${theme.palette.primary.main}66` },
                '70%': { boxShadow: `0 0 0 10px ${theme.palette.primary.main}00` },
                '100%': { boxShadow: `0 0 0 0 ${theme.palette.primary.main}00` },
              },
            }}
          >
            <MusicNote />
          </IconButton>
        </Tooltip>

        <Popper
          open={menuOpen}
          anchorEl={anchorRef.current}
          placement="top-end"
          transition
          disablePortal
          modifiers={[{ name: 'offset', options: { offset: [0, 12] } }]}
          sx={{ zIndex: 1100 }}
        >
          {({ TransitionProps }) => (
            <Fade {...TransitionProps} timeout={200}>
              <Paper
                elevation={4}
                onMouseMove={handleMouseMove}
                onTouchStart={handleMouseMove}
                sx={{
                  width: 280,
                  p: 2,
                  borderRadius: 2,
                  bgcolor: theme.palette.background.paper,
                  boxShadow: theme.shadows[4],
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 1
                }}
              >
                <TrackInfo />
                <ProgressBar />
                <Controls />
                <VolumeControl />
                <PlaylistView />
              </Paper>
            </Fade>
          )}
        </Popper>
      </Box>
    </ClickAwayListener>
  );
};

export default MusicPlayer;