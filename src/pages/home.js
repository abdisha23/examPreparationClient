import React, { useState } from "react";
import {
  Typography,
  Container,
  Box,
  AppBar,
  Toolbar,
  IconButton,
  Switch as MuiSwitch,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { BrowserRouter as Router, Link } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";

const lightTheme = createTheme({
  palette: {
    primary: { main: "#1976d2", dark: "#004ba0" },
    secondary: { main: "#ff4081" },
    background: { default: "#f5f5f5" },
    text: { primary: "#333333" },
  },
});

const darkTheme = createTheme({
  palette: {
    primary: { main: "#90caf9", dark: "#42a5f5" },
    secondary: { main: "#f48fb1" },
    background: { default: "#303030" },
    text: { primary: "#ffffff" },
  },
});

const HomePage = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const handleThemeChange = () => setIsDarkMode(!isDarkMode);

  const imageUrl =
    "https://ethiopianmonitor.com/wp-content/uploads/2023/07/Students-taking-the-2023-grade-12-national-exam-at-the-AAU-on-July-26-2023.jpg";
  const imageCaption = "Grade 12 students taking exams";

  return (
    <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
        }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}>
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
              eXamPrep
            </Typography>
          </Toolbar>
        </AppBar>

        <Container
          maxWidth="md"
          sx={{
            flex: "1",
            mt: "8px",
            textAlign: "center",
            paddingLeft: "20px",
            paddingRight: "20px",
            marginLeft: "auto",
            marginRight: "auto",
          }}>
          <Typography variant="h3" sx={{ mb: 4 }}>
            Welcome to eXamPrep
          </Typography>
          <Typography variant="h5" sx={{ mb: 4 }}>
            Your Comprehensive Exam Preparation Platform
          </Typography>

          <Box
            component="img"
            src={imageUrl}
            alt="Grade 12 students taking exams in Ethiopia"
            sx={{
              width: "130%",
              height: "auto",
              borderRadius: "12px",
              boxShadow: 3,
              mb: 2,
              marginLeft: "-15%", // Adjust negative margin for centering
            }}
          />
          <Typography variant="body1" color="textSecondary" sx={{ mb: 4 }}>
            {imageCaption}
          </Typography>
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default HomePage;
