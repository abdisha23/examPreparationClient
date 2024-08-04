import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { createGlobalStyle } from "styled-components";
import {
  Container,
  Grid,
  Typography,
  List,
  ListItem,
  ListItemText,
  Card,
  CardContent,
  Button,
  CircularProgress,
  Box,
} from "@mui/material";
import { getAllCourseMaterials } from "../features/courseMaterial/courseMaterialSlice";
import { getAllCourses } from "../features/course/courseSlice";
import { motion } from "framer-motion";

const theme = createTheme({
  palette: {
    primary: {
      main: "#6200ea", // deep purple
    },
    secondary: {
      main: "#03dac6", // teal
    },
    background: {
      default: "#f5f5f5", // light grey
    },
    text: {
      primary: "#000000", // black
      secondary: "#757575", // dark grey
    },
  },
  typography: {
    fontFamily: "Roboto, sans-serif",
    h4: {
      fontWeight: 700,
    },
    h6: {
      fontWeight: 600,
    },
  },
});

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    background-color: #f5f5f5;
    font-family: 'Roboto', sans-serif;
  }
`;

const globalStyles = {
  backgroundColor: "#f5f5f5",
  padding: "20px",
  minHeight: "100vh",
  marginTop: "70px",
};

const containerStyles = {
  maxWidth: "95vw", // Increased width to make the container larger
  margin: "0 auto",
};

const subjectListStyles = {
  overflowX: "auto",
  whiteSpace: "nowrap",
  paddingBottom: "10px",
};

const subjectListItemStyles = {
  borderRadius: "8px",
  backgroundColor: "#fff",
  boxShadow: 3,
  minWidth: "150px", // Increased minWidth to make the items larger
  flex: "0 0 auto",
  display: "inline-block",
  marginRight: "10px", // Add margin between items
};

const subjectTitleStyles = {
  textAlign: "center",
};

const cardContainerStyles = {
  marginTop: "20px",
};

const cardStyles = {
  minHeight: "150px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
};

const cardContentStyles = {
  padding: "16px",
};

const cardTitleStyles = {
  fontWeight: 600,
};

const cardDescriptionStyles = {
  color: theme.palette.text.secondary,
};

const buttonStyles = {
  marginTop: "10px",
};

const MaterialAccess = () => {
  const [selectedCourseId, setSelectedCourseId] = useState(null);
  const dispatch = useDispatch();
  const courseState = useSelector((state) => state.courses.course);
  const materialState = useSelector(
    (state) => state?.courseMaterials?.courseMaterial
  );

  useEffect(() => {
    dispatch(getAllCourses());
  }, [dispatch]);

  useEffect(() => {
    if (selectedCourseId) {
      dispatch(getAllCourseMaterials(selectedCourseId));
    }
  }, [selectedCourseId, dispatch]);

  const handleCourseClick = (courseId) => {
    setSelectedCourseId(courseId);
  };

  const renderMaterials = () => {
    if (!selectedCourseId) {
      return (
        <Typography variant="h6" color="textSecondary">
          No course selected. Please select a course to view materials.
        </Typography>
      );
    }
    if (!materialState) {
      return (
        <Box display="flex" justifyContent="center" mt={3}>
          <CircularProgress />
        </Box>
      );
    }
    return (
      <Grid container spacing={3} style={cardContainerStyles}>
        {materialState?.map((material) => (
          <Grid item xs={12} sm={6} md={4} key={material._id}>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Card style={cardStyles}>
                <CardContent style={cardContentStyles}>
                  <Typography variant="h6" style={cardTitleStyles}>
                    {material.title}
                  </Typography>
                  <Typography variant="body2" style={cardDescriptionStyles}>
                    {material.description}
                  </Typography>
                  <Box mt={2}>
                    <Button
                      variant="contained"
                      color="primary"
                      href={material?.file?.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={buttonStyles}>
                      Download File
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>
        ))}
      </Grid>
    );
  };

  const renderSubjectSelection = () => (
    <Box>
      <Typography
        sx={{ marginTop: "70px" }}
        variant="h4"
        className="title"
        gutterBottom>
        Select a Subject
      </Typography>
      <Box sx={subjectListStyles}>
        <List sx={{ display: "flex", padding: "0", width: "20%" }}>
          {courseState &&
            courseState.map((course) => (
              <ListItem
                button
                key={course._id}
                onClick={() => handleCourseClick(course._id)}
                sx={subjectListItemStyles}
                component={motion.div}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}>
                <ListItemText primary={course.title} sx={subjectTitleStyles} />
              </ListItem>
            ))}
        </List>
      </Box>
    </Box>
  );

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Container maxWidth="lg" style={{ ...globalStyles, ...containerStyles }}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            {renderSubjectSelection()}
          </Grid>
          <Grid item xs={12}>
            {renderMaterials()}
          </Grid>
        </Grid>
      </Container>
    </ThemeProvider>
  );
};

export default MaterialAccess;
