import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Container, Grid, Typography, List, ListItem, ListItemText, MenuItem, Select } from '@mui/material';
import { getAllCourses } from '../features/course/courseSlice';
import { getAllExams } from '../features/exam/examSlice';

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

function TakeExam() {
  const [selectedYear, setSelectedYear] = useState(null);
  const [viewingYears, setViewingYears] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null); // Define selectedCourse state
  const dispatch = useDispatch();
  const courseState = useSelector((state) => state?.courses?.course);
  const examState = useSelector((state) => state?.exams?.allExams?.exam);


  useEffect(() => {
    dispatch(getAllCourses());
  }, [dispatch]);
 
  const renderExam = (examYear) => {
    return (
      <div>
        <Typography variant="h4" className="title">Exams for {examYear}</Typography>
        <List>
          {examState && examState.map((exam) => (
            <ListItem key={exam._id}>
              {/* <ListItemText primary={`Exam Title: ${exam.title}`} /> */}
              <List>
                {exam.questions.map((question, index) => (
                  <ListItem key={question._id}>
                    <ListItemText primary={`${index + 1}. ${question.question}`} />
                    <List>
                      {question.options.map((option, index) => (
                        <ListItem key={index}>
                          <ListItemText primary={`Option ${index + 1}: ${option}`} />
                        </ListItem>
                      ))}
                    </List>
                    <ListItemText primary={`Correct Answer: ${question.answer}`} />
                  </ListItem>
                ))}
              </List>
            </ListItem>
          ))}
        </List>
      </div>
    );
  }
  

  const handleYearSelect = (year) => {
    setSelectedYear(year);
  };

  const handleCourseClick = (course) => { // Accept course object as parameter
    setSelectedCourse(course); // Set selectedCourse state to the clicked course
    dispatch(getAllExams(course._id));
    setViewingYears(true); // Set viewingYears to true to render year selection
  };

  const renderSubjectSelection = () => (
    <div>
      <Typography variant="h4" className="title">Select a Subject</Typography>
      <List>
        {courseState && courseState.map((course) => (
          <ListItem
            button
            key={course._id}
            onClick={() => handleCourseClick(course)} // Pass course object to handleCourseClick
          >
            <ListItemText primary={course.title} />
          </ListItem>
        ))}
      </List>
    </div>
  );

  const renderYearSelection = () => {
    if (!selectedCourse) return null; 

    return (
      <div>
        <Typography variant="h4" className="title">{selectedCourse.title}</Typography>
        <Typography variant="body1">Select a Year</Typography>
        <Select
          value={selectedYear}
          onChange={(e) => handleYearSelect(e.target.value)}
          className="year-select"
        >
          {examState && examState.map((exam) => (
            <MenuItem key={exam._id} value={exam.year}>{exam.year}</MenuItem>
          ))}
        </Select>
        {/* <Button variant="contained" color="primary" onClick={handleBackToSubjects}>Back to Subjects</Button> */}
      </div>
    );
  };

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="md">
        <Grid container spacing={3}>
          {!viewingYears && (
            <Grid item xs={12}>
              {renderSubjectSelection()}
            </Grid>
          )}
          {viewingYears && (
            <Grid item xs={12}>
              {renderYearSelection()}
            </Grid>
          )}
          {selectedYear && 
            <Grid item xs={12}>
              {renderExam(selectedYear)}
            </Grid>
          }
        </Grid>
      </Container>
    </ThemeProvider>
  );
}

export default TakeExam;
