import React from 'react';
import { Link } from 'react-router-dom';
import { Typography, Container, Button, Box, Grid, Card, CardContent, AppBar, Toolbar, IconButton } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu';

const Footer = () => {
  const theme = createTheme({
    palette: {
      primary: {
        main: '#334D68',
        dark: '#37424D',
      },
      secondary: {
        main: '#EBD2DB',
      },
      background: {
        default: '#f9f9f9',
      },
      text: {
        primary: '#333333',
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Box
        component="footer"
        sx={{
          py: 2,
          background: theme.palette.primary.dark,
          color: theme.palette.common.white,
          textAlign: 'center',
          display: 'flex',
          justifyContent: 'space-evenly',
          bottom: 0,
          left: 0,
          width: '100%',
          zIndex: 1000,
        }}
      >
        <Box sx={{ mr: 6 }}>
          <Typography variant="h6" sx={{ color: theme.palette.secondary.main }}>
            About Us
          </Typography>
          <Button color="inherit" sx={{ display: 'block', my: 1 }}>
            Company
          </Button>
          <Button color="inherit" sx={{ display: 'block', my: 1 }}>
            Our Teams
          </Button>
          <Button color="inherit" sx={{ display: 'block', my: 1 }}>
            Careers
          </Button>
        </Box>
        <Box sx={{ mr: 6 }}>
          <Typography variant="h6" sx={{ color: theme.palette.secondary.main }}>
            Terms
          </Typography>
          <Button color="inherit" sx={{ display: 'block', my: 1 }}>
            Terms of Use
          </Button>
          <Button color="inherit" sx={{ display: 'block', my: 1 }}>
            Privacy Policy
          </Button>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default Footer;