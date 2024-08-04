import React from "react";
import { Typography, Button, Box, Grid, Container } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";

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

const Footer = () => {
  return (
    <ThemeProvider theme={theme}>
      <Box
        component="footer"
        sx={{
          py: 3,
          bottomMargin: -10,
          backgroundColor: theme.palette.primary.dark,
          color: theme.palette.common.white,
          textAlign: "center",
          mt: "auto",
        }}>
        <Container maxWidth="md">
          <Grid container spacing={4} justifyContent="space-evenly">
            <Grid item>
              <Typography
                variant="h6"
                sx={{ color: theme.palette.secondary.main }}>
                About Us
              </Typography>
              <Button color="inherit" sx={{ display: "block", my: 1 }}>
                Our Teams
              </Button>
            </Grid>
            <Grid item>
              <Typography
                variant="h6"
                sx={{ color: theme.palette.secondary.main }}>
                Terms
              </Typography>
              <Button color="inherit" sx={{ display: "block", my: 1 }}>
                Terms of Use
              </Button>
              <Button color="inherit" sx={{ display: "block", my: 1 }}>
                Privacy Policy
              </Button>
            </Grid>
            <Grid item>
              <Typography
                variant="h6"
                sx={{ color: theme.palette.secondary.main }}>
                Our Products
              </Typography>
              <Button color="inherit" sx={{ display: "block", my: 1 }}>
                Courses
              </Button>
              <Button color="inherit" sx={{ display: "block", my: 1 }}>
                Ebooks
              </Button>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default Footer;
