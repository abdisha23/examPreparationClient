// Home.js
import React from 'react';
import { Link } from 'react-router-dom';
import { Typography, Container, Button, Box, Grid, Card, CardContent, AppBar, Toolbar, IconButton } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu';

const theme = createTheme({
  palette: {
    primary: {
      main: '#3F5D7A',
      dark: '#425B6E',
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
      </Box>
    </ThemeProvider>
  );
};

export default HomePage;
