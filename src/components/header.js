import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { Typography, AppBar, Toolbar, IconButton, Button } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import MenuIcon from "@mui/icons-material/Menu";

const Header = () => {
  const currentUser = JSON.parse(localStorage.getItem("user"));
  const [userState, setUserState] = useState(currentUser);
  const userRole = useSelector((state) => state?.auth?.user?.role);
  const location = useLocation();

  const theme = createTheme({
    palette: {
      primary: {
        main: "#334D68",
        dark: "#37424D",
      },
      secondary: {
        main: "#EBD2DB",
      },
      background: {
        default: "#f9f9f9",
      },
      text: {
        primary: "#333333",
      },
    },
  });

  const handleLogout = () => {
    if (userState) {
      localStorage.clear();
      setUserState(null);
    }
  };

  const isActive = (path) => location.pathname === path;

  return (
    <ThemeProvider theme={theme}>
      <AppBar position="fixed" color="primary">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            eXamPrep
          </Typography>
          <Button
            color="inherit"
            component={Link}
            to="/access-material"
            sx={{ color: isActive("/access-material") ? "green" : "inherit" }}>
            Material Access
          </Button>
          <Button
            color="inherit"
            component={Link}
            to="/take-exam"
            sx={{ color: isActive("/take-exam") ? "green" : "inherit" }}>
            Take Exam
          </Button>{" "}
          <Button
            color="inherit"
            component={Link}
            to="/take-quiz"
            sx={{ color: isActive("/take-quiz") ? "green" : "inherit" }}>
            Take Quiz
          </Button>
          <Button
            color="inherit"
            component={Link}
            to="/forum"
            sx={{ color: isActive("/forum") ? "green" : "inherit" }}>
            Forums
          </Button>
          {userState && userRole === "admin" && (
            <Button color="inherit" component={Link} to="/sme">
              Register SME
            </Button>
          )}
          {userState && userRole === "admin" && (
            <Button color="inherit" component={Link} to="/add-course">
              Add Course
            </Button>
          )}
          {userState && userRole === "sme" && (
            <Button color="inherit" component={Link} to="/upload-material">
              Upload Material
            </Button>
          )}
          {userState && userRole === "sme" && (
            <Button color="inherit" component={Link} to="/upload-exam">
              Upload Exam
            </Button>
          )}
          {userState && userRole === "sme" && (
            <Button color="inherit" component={Link} to="/upload-quiz">
              Upload Quiz
            </Button>
          )}
          {userState !== null ? (
            <Button
              color="inherit"
              component={Link}
              to="/"
              onClick={handleLogout}>
              Logout
            </Button>
          ) : (
            <Button color="inherit" component={Link} to="/login">
              Login
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </ThemeProvider>
  );
};

export default Header;
