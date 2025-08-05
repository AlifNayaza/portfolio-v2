import { useState, useMemo, forwardRef } from 'react';
import {
  Box, Typography, Grid, Paper, TextField, Button, Alert, AlertTitle,
  Divider, List, ListItemButton, ListItemIcon, ListItemText,
  Snackbar, Container, useTheme, useMediaQuery, IconButton, Tooltip,
  alpha, Fade, InputAdornment, CircularProgress
} from '@mui/material';
import {
  Send as SendIcon,
  Email as EmailIcon,
  LinkedIn as LinkedInIcon,
  GitHub as GitHubIcon,
  Person as PersonIcon,
  Subject as SubjectIcon,
  Message as MessageIcon,
  ContentCopy as ContentCopyIcon,
  Check as CheckIcon
} from '@mui/icons-material';
import InstagramIcon from '@mui/icons-material/Instagram';
import emailjs from '@emailjs/browser';

// Create a styled alert component to fix the ownerState prop warning
const StyledAlert = forwardRef((props, ref) => <Alert ref={ref} {...props} />);

const Contacts = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  // Form state
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [errors, setErrors] = useState({});
  const [showSuccess, setShowSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [copiedStates, setCopiedStates] = useState({});
  const [focusedField, setFocusedField] = useState(null);
  const [formTouched, setFormTouched] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  // Updated contact information
  const contactInfo = useMemo(() => [
    { icon: <EmailIcon />, text: 'alifnayaza2693@gmail.com', link: 'mailto:alifnayaza2693@gmail.com', color: theme.palette.primary.main },
    { icon: <LinkedInIcon />, text: 'Alif Haikal Nayaza', link: 'https://www.linkedin.com/in/alif-haikal-nayaza-a5b587241/', color: '#0077B5' },
    { icon: <GitHubIcon />, text: 'AlifNayaza', link: 'https://github.com/AlifNayaza', color: '#333333' },
    { icon: <InstagramIcon />, text: '@ohalraf', link: 'https://www.instagram.com/alraf26_/', color: '#E1306C' }
  ], [theme.palette.primary.main]);

  // Form handlers - Simplified to ensure basic functionality works
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear errors for the field being changed
    setErrors(prev => ({ ...prev, [name]: null }));
    setFormTouched(true);
  };

  const handleFocus = (field) => {
    setFocusedField(field);
  };

  const handleBlur = () => {
    setFocusedField(null);
  };

  // Form validation - Removed minimum character count for message
  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)) {
      newErrors.email = 'Invalid email address';
    }
    if (!formData.subject.trim()) newErrors.subject = 'Subject is required';
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    // Removed the length check for message

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = validateForm();

    if (isValid) {
      setIsSubmitting(true);
      setSubmitError(null);

      // Use environment variables
      const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
      const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

      // Prepare template parameters
      const templateParams = {
        user_name: formData.name,
        user_email: formData.email,
        user_subject: formData.subject,
        message: formData.message,
      };

      emailjs.send(serviceId, templateId, templateParams, publicKey)
        .then((response) => {
          console.log('Email successfully sent!', response.status, response.text);
          setShowSuccess(true);
          setIsSubmitting(false);
          setFormData({ name: '', email: '', subject: '', message: '' });
          setFormTouched(false);
        })
        .catch((err) => {
          console.error('Failed to send email.', err);
          setSubmitError('Failed to send message. Please try again later.');
          setIsSubmitting(false);
        });
    }
  };

  // Copy to clipboard
  const handleCopy = (text, key) => {
    navigator.clipboard.writeText(text);
    setCopiedStates(prev => ({ ...prev, [key]: true }));
    setTimeout(() => setCopiedStates(prev => ({ ...prev, [key]: false })), 2000);
  };

  // Check if form is valid - Removed message length check
  const formIsValid = formData.name.trim() !== '' && 
                     formData.email.trim() !== '' && 
                     /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email) && 
                     formData.subject.trim() !== '' && 
                     formData.message.trim() !== '';

  // Shared styles
  const sectionHeaderStyles = {
    fontWeight: 700,
    position: 'relative',
    zIndex: 1,
    display: 'inline-block',
    '&::before': {
      content: '""',
      position: 'absolute',
      bottom: 5,
      left: 0,
      width: '100%',
      height: 8,
      background: alpha(theme.palette.primary.main, 0.15),
      zIndex: -1,
      borderRadius: 4
    }
  };

  const paperStyles = {
    borderRadius: 3,
    transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
    border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
    '&:hover': {
      boxShadow: `0 10px 30px ${alpha(theme.palette.primary.dark, 0.15)}`,
      transform: 'translateY(-5px)'
    },
    position: 'relative',
    overflow: 'hidden'
  };

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 4, md: 6 } }}>
      <Fade in={true} timeout={800}>
        <Box>
          {/* Page Title */}
          <Typography
            variant="h3"
            component="h1"
            gutterBottom
            color="primary"
            sx={{
              fontWeight: 800,
              textAlign: 'center',
              position: 'relative',
              mb: 4,
              fontSize: { xs: '2.2rem', md: '3rem' },
              letterSpacing: '-0.5px',
              '&::after': {
                content: '""',
                position: 'absolute',
                bottom: -12,
                left: 'calc(50% - 50px)',
                width: 100,
                height: 5,
                background: `linear-gradient(90deg, transparent 0%, ${theme.palette.primary.main} 50%, transparent 100%)`,
                borderRadius: 4
              }
            }}
          >
            Contact Me
          </Typography>

          <Typography
            variant="body1"
            paragraph
            sx={{
              mb: 5,
              textAlign: 'center',
              maxWidth: 800,
              mx: 'auto',
              fontSize: '1.1rem',
              lineHeight: 1.7,
              color: alpha(theme.palette.text.primary, 0.85)
            }}
          >
            Hey there! I'm always excited to hear about new projects or simply chat about ideas. Whether it's a collaboration or just a quick question, feel free to drop me a message.
          </Typography>

          <Grid container spacing={4} sx={{ mb: 4 }}>
            {/* Contact Information Card */}
            <Grid item xs={12} md={5}>
              <Paper
                elevation={3}
                sx={{
                  p: { xs: 3, md: 4 },
                  height: '100%',
                  ...paperStyles,
                  background: `linear-gradient(135deg, ${theme.palette.background.paper}, ${alpha(theme.palette.primary.main, 0.05)})`,
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    width: 100,
                    height: 100,
                    background: `radial-gradient(circle, ${alpha(theme.palette.primary.main, 0.08)} 0%, transparent 70%)`,
                    borderRadius: '0 0 0 100%',
                    zIndex: 0
                  }
                }}
              >
                <Typography variant="h5" gutterBottom color="primary" sx={sectionHeaderStyles}>
                  Contact Information
                </Typography>

                <Divider sx={{ mb: 3, borderColor: alpha(theme.palette.primary.main, 0.1) }} />

                <List sx={{ py: 1, position: 'relative', zIndex: 1 }}>
                  {contactInfo.map((item, index) => (
                    <ListItemButton
                      key={index}
                      component="div"
                      sx={{
                        py: 1.7,
                        px: 2,
                        borderRadius: 2,
                        mb: 1.5,
                        transition: 'all 0.3s ease',
                        background: alpha(item.color, 0.05),
                        '&:hover': {
                          background: alpha(item.color, 0.1),
                          transform: 'translateX(5px)'
                        }
                      }}
                    >
                      <ListItemIcon sx={{ color: item.color, minWidth: 40 }}>
                        {item.icon}
                      </ListItemIcon>

                      <ListItemText
                        primary={
                          <Box
                            component="a"
                            href={item.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            sx={{
                              textDecoration: 'none',
                              color: theme.palette.text.primary,
                              fontWeight: 500,
                              fontSize: '0.95rem',
                              transition: 'all 0.2s ease',
                              '&:hover': { color: item.color, letterSpacing: '0.3px' }
                            }}
                          >
                            {item.text}
                          </Box>
                        }
                      />

                      <Tooltip title={copiedStates[index] ? "Copied!" : "Copy to clipboard"} arrow placement="top">
                        <IconButton
                          size="small"
                          onClick={() => handleCopy(item.text, index)}
                          sx={{
                            opacity: 0.7,
                            '&:hover': { opacity: 1, bgcolor: alpha(item.color, 0.15) },
                            color: copiedStates[index] ? theme.palette.success.main : 'inherit',
                            p: '6px',
                          }}
                        >
                          {copiedStates[index] ? <CheckIcon fontSize="small" /> : <ContentCopyIcon fontSize="small" />}
                        </IconButton>
                      </Tooltip>
                    </ListItemButton>
                  ))}
                </List>

                <Box
                  sx={{
                    mt: 4,
                    p: 3,
                    bgcolor: alpha(theme.palette.background.default, 0.7),
                    borderRadius: 3,
                    borderLeft: `4px solid ${theme.palette.primary.main}`,
                    boxShadow: `0 4px 12px ${alpha(theme.palette.common.black, 0.06)}`,
                  }}
                >
                  <Typography
                    variant="body1"
                    sx={{
                      fontStyle: 'italic',
                      lineHeight: 1.7,
                      position: 'relative',
                      zIndex: 1,
                      fontWeight: 500,
                      color: alpha(theme.palette.text.primary, 0.85)
                    }}
                  >
                    Let's chat about your project or idea – I'm here to help and would love to connect!
                  </Typography>
                </Box>
              </Paper>
            </Grid>

            {/* Contact Form Card */}
            <Grid item xs={12} md={7}>
              <Paper
                elevation={3}
                sx={{
                  p: { xs: 3, md: 4 },
                  ...paperStyles,
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    bottom: 0,
                    right: 0,
                    width: 150,
                    height: 150,
                    background: `radial-gradient(circle, ${alpha(theme.palette.primary.main, 0.05)} 0%, transparent 70%)`,
                    zIndex: 0
                  }
                }}
              >
                <Typography variant="h5" gutterBottom color="primary" sx={sectionHeaderStyles}>
                  Send Me a Message
                </Typography>

                <Divider sx={{ mb: 3, borderColor: alpha(theme.palette.primary.main, 0.1) }} />
                {submitError && (
                  <Alert severity="error" sx={{ mb: 2 }}>
                    {submitError}
                  </Alert>
                )}
                <form onSubmit={handleSubmit}>
                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Your Name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        error={!!errors.name}
                        helperText={errors.name}
                        required
                        variant="outlined"
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <PersonIcon color="action" />
                            </InputAdornment>
                          ),
                        }}
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                            borderRadius: 2,
                          }
                        }}
                      />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Your Email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        error={!!errors.email}
                        helperText={errors.email}
                        required
                        variant="outlined"
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <EmailIcon color="action" />
                            </InputAdornment>
                          ),
                        }}
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                            borderRadius: 2,
                          }
                        }}
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        error={!!errors.subject}
                        helperText={errors.subject}
                        required
                        variant="outlined"
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <SubjectIcon color="action" />
                            </InputAdornment>
                          ),
                        }}
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                            borderRadius: 2,
                          }
                        }}
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Your Message"
                        name="message"
                        multiline
                        rows={5}
                        value={formData.message}
                        onChange={handleChange}
                        error={!!errors.message}
                        helperText={errors.message}
                        required
                        variant="outlined"
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start" sx={{ alignSelf: 'flex-start', mt: 1.5 }}>
                              <MessageIcon color="action" />
                            </InputAdornment>
                          ),
                        }}
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                            borderRadius: 2,
                          }
                        }}
                      />
                    </Grid>

                    <Grid item xs={12} sx={{ display: 'flex', justifyContent: isMobile ? 'center' : 'flex-start', mt: 2, zIndex: 1 }}>
                      <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        size="large"
                        disabled={isSubmitting}
                        sx={{
                          py: 1.5,
                          px: 4,
                          fontWeight: 700,
                          borderRadius: 2,
                          textTransform: 'none',
                          fontSize: '1rem',
                          boxShadow: isSubmitting ? 'none' : `0 4px 10px ${alpha(theme.palette.primary.main, 0.4)}`,
                          opacity: isSubmitting ? 0.7 : 1,
                          '&:hover': {
                            transform: isSubmitting ? 'none' : 'translateY(-3px)',
                            boxShadow: isSubmitting ? 'none' : `0 6px 15px ${alpha(theme.palette.primary.main, 0.5)}`
                          }
                        }}
                      >
                        {isSubmitting ? (
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <CircularProgress size={24} color="inherit" sx={{ mr: 1 }} />
                            Sending...
                          </Box>
                        ) : (
                          <>
                            Send Message
                            <SendIcon sx={{ ml: 1 }} />
                          </>
                        )}
                      </Button>
                    </Grid>
                  </Grid>
                </form>
              </Paper>
            </Grid>
          </Grid>

          {/* Success Notification - Fixed prop warning using StyledAlert */}
          <Snackbar
            open={showSuccess}
            autoHideDuration={6000}
            onClose={() => setShowSuccess(false)}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            TransitionComponent={Fade}
          >
            <StyledAlert
              onClose={() => setShowSuccess(false)}
              severity="success"
              variant="filled"
              elevation={6}
              sx={{ width: '100%', border: `1px solid ${alpha(theme.palette.success.main, 0.5)}`, borderRadius: 2 }}
            >
              <AlertTitle sx={{ fontWeight: 'bold' }}>Success</AlertTitle>
              Your message has been sent successfully. I'll get back to you soon!
            </StyledAlert>
          </Snackbar>
        </Box>
      </Fade>
    </Container>
  );
};

export default Contacts;