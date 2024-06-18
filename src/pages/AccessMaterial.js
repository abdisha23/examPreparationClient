import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { createGlobalStyle } from 'styled-components';
import { Container, Grid, Typography, List, ListItem, ListItemText } from '@mui/material';
import { getAllCourseMaterials } from '../features/courseMaterial/courseMaterialSlice';
import { getAllCourses } from '../features/course/courseSlice';

const theme = createTheme({
  palette: {
    primary: {
      main: '#3f51b5',
    },
    secondary: {
      main: '#f50057',
    },
  },
});

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    background-color: #ADECC5; 
  }
`;

const globalStyles = {
  backgroundColor: '#C59090',
  padding: '20px',
};

function MaterialAccess() {
  const [selectedCourseId, setSelectedCourseId] = useState(null);
  const dispatch = useDispatch();
  const courseState = useSelector((state) => state.courses.course);
  const materialState = useSelector((state) => state?.courseMaterials?.courseMaterial);

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
      console.log('No course is selected');
    };
    return (
      <div>
        {materialState?.map((material) => (
          <div key={material._id}>
            <h3>{material.title}</h3>
            <p>{material.description}</p>
            <a href={material?.file?.url} target="_blank" rel="noopener noreferrer">Download File</a>
          </div>
        ))}
      </div>
    );
  };

  const renderSubjectSelection = () => (
    <div>
      <Typography variant="h4" className="title">Select a Subject</Typography>
      <List>
        {courseState && courseState.map((course) => (
          <ListItem
            button
            key={course._id}
            onClick={() => handleCourseClick(course._id)}
          >
            <ListItemText primary={course.title} />
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Container maxWidth="md" style={globalStyles}>
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
}

export default MaterialAccess;
