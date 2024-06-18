import React, {useState, useEffect} from 'react';
import {useSelector} from 'react-redux';
import { Link } from 'react-router-dom';
import { Typography, Container, Button, Box, Grid, Card, CardContent, AppBar, Toolbar, IconButton } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu';

const Header = () => {
  const currentUser = JSON.parse(localStorage.getItem('user'));
  const [userState, setUserState] = useState(currentUser);
  const userRole = useSelector((state) => state?.auth?.user?.role);
  console.log(userRole);

  
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

  const  handleLogout = () => {
    if(userState) {
      localStorage.clear();
      setUserState(null);
    }
  }
  return (
    <ThemeProvider theme={theme}>
      <AppBar position="fixed" color="primary">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            eXamPrep
          </Typography>
          <Button color="inherit" component={Link} to="/access-material">
            Material Access
          </Button>
          <Button color="inherit" component={Link} to="/track-progress">
            Track Progress
          </Button>
          <Button color="inherit" component={Link} to="/take-exam">
            Take Exam
          </Button>
          <Button color="inherit" component={Link} to="/forum">
            Forums
          </Button>
          {userState !== null ? (
            <Button color="inherit" component={Link} to="/" onClick={handleLogout}>
              Logout
            </Button>
          ) : (
            <Button color="inherit" component={Link} to="/login">
              Login
            </Button>
          )}
          <Button color="inherit" component={Link} to="/signup">
            Signup
          </Button>
          {userState && userRole === 'admin' && (
                <Button color="inherit" variant="outlined" component={Link} to="/admin">Register SME</Button>
            )}

        </Toolbar>
      </AppBar>
    </ThemeProvider>
  );
};

export default Header;