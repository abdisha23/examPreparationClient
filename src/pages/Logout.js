import React, { useState } from 'react';
import {
  Container,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  ThemeProvider,
  createTheme,
  CssBaseline,
  GlobalStyles,
} from '@mui/material';

// Define the custom theme using createTheme
const theme = createTheme({
  palette: {
    primary: {
      main: '#C6B2CE',
    },
    secondary: {
      main: '#99C4E0',
    },
    background: {
      default: '#f0f0f0', // Light grey background
    },
  },
});

const LogoutPage = () => {
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleLogout = () => {
    // Show confirmation dialog
    setShowConfirmation(true);
  };

  const confirmLogout = () => {
    // Perform logout actions (e.g., clear session, redirect to login)
    sessionStorage.clear();
    window.location.href = '/login'; // Example redirection to login page
  };

  const cancelLogout = () => {
    // Cancel logout action
    setShowConfirmation(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline /> {/* Apply global styles from Material-UI */}
      <GlobalStyles
        styles={{
          // Apply global styles
          body: {
            backgroundColor: '#4B3D3D', // Professional background color
          },
        }}
      />
      <Container maxWidth="sm">
        <Typography variant="h4" align="center" gutterBottom>
          Logout
        </Typography>
        <Typography variant="body1" align="center" gutterBottom>
          Are you sure you want to logout?
        </Typography>
        {/* Button for Logout */}
        <Button variant="contained" color="primary" onClick={handleLogout}>
          Logout
        </Button>

        {/* Confirmation dialog */}
        <Dialog open={showConfirmation} onClose={cancelLogout}>
          <DialogTitle>Confirm Logout</DialogTitle>
          <DialogContent>
            <Typography variant="body1" align="center">
              Are you sure you want to logout?
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={cancelLogout} color="primary">
              Cancel
            </Button>
            <Button onClick={confirmLogout} color="primary">
              Confirm
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </ThemeProvider>
  );
};

export default LogoutPage;
