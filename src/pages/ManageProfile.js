import React from 'react';
import { Button, Container, CssBaseline, Grid, Typography , GlobalStyles} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#69C9A4',
    },
    secondary: {
      main: '#BE5712',
    },
  },
});

const ProfilePage = () => {
  const handleChangeUsername = () => {

  };

  const handleChangePassword = () => {
  
  };

  const handleDeleteAccount = () => {
 
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <GlobalStyles styles={{ 
        body: {
          backgroundColor: '#C4C09E',
        },
      }} />
      <Container
        maxWidth="sm"
        sx={{
          marginTop: '2rem',
          backgroundColor: '#A75D5D',
          padding: '2rem',
          borderRadius: '2rem',
          boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
        }}
      >
        <Typography variant="h4" component="h1" align="center" sx={{ marginBottom: '2rem' }}>
          Profile 
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Button
              variant="contained"
              color="primary"
              borderRadius
              fullWidth
              onClick={handleChangeUsername}
            >
              Change Username
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained"
              color="primary"
              borderRadius
              fullWidth
              onClick={handleChangePassword}
            >
              Change Password
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained"
              color="secondary"
              borderRadius
              fullWidth
              onClick={handleDeleteAccount}
            >
              Delete Account
            </Button>
          </Grid>
        </Grid>
      </Container>
    </ThemeProvider>
  );
};

export default ProfilePage;