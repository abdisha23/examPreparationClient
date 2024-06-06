import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { Link } from 'react-router-dom';
import { Typography, Container, Button, Box, Grid, Card, CardContent, AppBar, Toolbar, IconButton } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu';

const Header = () => {
  // const dispatch = useDispatch();
  // const navigate = useNavigate();
  const [productOpt, setProductOpt] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  //const selectedArray = Array.isArray(selectedProduct) ? selectedProduct : selectedProduct ? [selectedProduct] : [];
  const [paginate, setPaginate ] = useState(true);
  const authState = useSelector((state) => state?.auth);

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
    localStorage.clear();
    window.location.reload();
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
          <Button color="inherit" component={Link} to="/signup">
            Get Started
          </Button>
          <Button color="inherit" component={Link} to="/login">
          {
                      authState?.user === null && authState?.user?.areasOfExpertise !== null ? <p className='mb-0'>Login</p>
                      : <p className='mb-0'>Welcome {authState?.user?.areasOfExpertise + " !"}</p>
                    }
          </Button>
          
          {
                  localStorage.getItem("user") !== null && <>
                    <Button color="inherit" component={Link} to="/login" onClick={handleLogout}>Logout</Button>
                  </>
                  }

        </Toolbar>
      </AppBar>
    </ThemeProvider>
  );
};

export default Header;