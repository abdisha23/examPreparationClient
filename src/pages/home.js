// Home.js
import React from 'react';
import { Link } from 'react-router-dom';
import { Typography, Container, Button, Box, Grid, Card, CardContent, AppBar, Toolbar, IconButton } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu';

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

const HomePage = () => {
  const navigateToComponent = (path) => {
    window.location.href = path;
  };

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          background: `linear-gradient(to bottom, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
          color: theme.palette.common.white,
          minHeight: '100vh',
        }}
      >
        <Container maxWidth="md" sx={{ pt: 8 }}>
          <Typography variant="h3" fontWeight="bold" mb={2} sx={{ color: theme.palette.secondary.main }}>
            Welcome to eXamPrep
          </Typography>
          <Typography variant="h5" mb={4} sx={{ color: theme.palette.secondary.main }}>
            Your Comprehensive Exam Preparation Platform
          </Typography>
          <Grid container spacing={3}>
            {/* Sample Cards with Study Materials */}
            <Grid item xs={12} md={4}>
              <Card sx={{ backgroundColor: '#ffcc80' }}>
                <CardContent>
                  <Typography variant="h6" mb={2} sx={{ color: theme.palette.primary.dark }}>
                    Sample Questions
                  </Typography>
                  <Typography variant="body1" mb={2}>
                    Get access to a variety of sample questions to practice for your exams.
                  </Typography>
                  <Button variant="contained" color="primary" onClick={() => navigateToComponent('/take-exam')}>
                    Start Practicing
                  </Button>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={4}>
              <Card sx={{ backgroundColor: '#a5d6a7' }}>
                <CardContent>
                  <Typography variant="h6" mb={2} sx={{ color: theme.palette.primary.dark }}>
                    Study Guides
                  </Typography>
                  <Typography variant="body1" mb={2}>
                    Explore detailed study guides covering various subjects and topics.
                  </Typography>
                  <Button variant="contained" color="primary" onClick={() => navigateToComponent('/access-material')}>
                    Explore Guides
                  </Button>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={4}>
              <Card sx={{ backgroundColor: '#b39ddb' }}>
                <CardContent>
                  <Typography variant="h6" mb={2} sx={{ color: theme.palette.primary.dark }}>
                    Quizzes
                  </Typography>
                  <Typography variant="body1" mb={2}>
                    Test your knowledge with interactive quizzes designed for exam preparation.
                  </Typography>
                  <Button variant="contained" color="primary" onClick={() => navigateToComponent('/quiz')}>
                    Take a Quiz
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Container>

        {/* Footer */}
        <Box
          component="footer"
          sx={{
            py: 3,
            background: theme.palette.primary.dark,
            color: theme.palette.common.white,
            textAlign: 'center',
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <Box sx={{ mr: 6 }}>
            <Typography variant="h6" sx={{ color: theme.palette.secondary.main }}>
              About Us
            </Typography>
            <Button color="inherit" sx={{ display: 'block', my: 1 }}>Company</Button>
            <Button color="inherit" sx={{ display: 'block', my: 1 }}>Our Teams</Button>
            <Button color="inherit" sx={{ display: 'block', my: 1 }}>Careers</Button>
          </Box>
          <Box sx={{ mr: 6 }}>
            <Typography variant="h6" sx={{ color: theme.palette.secondary.main }}>
              Terms
            </Typography>
            <Button color="inherit" sx={{ display: 'block', my: 1 }}>Terms of Use</Button>
            <Button color="inherit" sx={{ display: 'block', my: 1 }}>Privacy Policy</Button>
          </Box>
          <Box>
            <Typography variant="h6" sx={{ color: theme.palette.secondary.main }}>
              Our Products
            </Typography>
            <Button color="inherit" sx={{ display: 'block', my: 1 }}>Articles</Button>
            <Button color="inherit" sx={{ display: 'block', my: 1 }}>Courses</Button>
            <Button color="inherit" sx={{ display: 'block', my: 1 }}>Ebooks</Button>
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default HomePage;
