import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Container, Grid, Typography, List, ListItem, ListItemText, MenuItem, Select } from '@mui/material';
import { getAllCourses } from '../features/course/courseSlice';
import { getAllQuizzes } from '../features/quiz/quizSlice';

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

function TakeQuiz() {
  const [selectedCourse, setSelectedCourse] = useState(null); // Define selectedCourse state
  const dispatch = useDispatch();
  const courseState = useSelector((state) => state?.courses?.course);
  const quizState = useSelector((state) => state?.quizzes?.allQuizzes?.quiz);


  useEffect(() => {
    dispatch(getAllCourses());
  }, [dispatch]);
 
  const renderQuiz = (examYear) => {
    return (
      <div>
        <Typography variant="h4" className="title">Quizzes for {examYear}</Typography>
        <List>
          {quizState && quizState.map((quiz) => (
            <ListItem key={quiz._id}>
              {/* <ListItemText primary={`Exam Title: ${quiz.title}`} /> */}
              <List>
                {quiz.questions.map((question, index) => (
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
  

  // const handleYearSelect = (year) => {
  //   setSelectedYear(year);
  // };

  const handleCourseClick = (course) => { // Accept course object as parameter
    setSelectedCourse(course); // Set selectedCourse state to the clicked course
    dispatch(getAllQuizzes(course._id));
    // setViewingYears(true); // Set viewingYears to true to render year selection
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

  // const renderYearSelection = () => {
  //   if (!selectedCourse) return null; 

  //   return (
  //     <div>
  //       <Typography variant="h4" className="title">{selectedCourse.title}</Typography>
  //       <Typography variant="body1">Select a Year</Typography>
  //       <Select
  //         value={selectedYear}
  //         onChange={(e) => handleYearSelect(e.target.value)}
  //         className="year-select"
  //       >
  //         {quizState && quizState.map((quiz) => (
  //           <MenuItem key={quiz._id} value={quiz.year}>{quiz.year}</MenuItem>
  //         ))}
  //       </Select>
  //       {/* <Button variant="contained" color="primary" onClick={handleBackToSubjects}>Back to Subjects</Button> */}
  //     </div>
  //   );
  // };

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="md">
        <Grid container spacing={3}>
          {
            <Grid item xs={12}>
              {renderSubjectSelection()}
            </Grid>
          }
          {/* {viewingYears && (
            <Grid item xs={12}>
              {renderYearSelection()}
            </Grid>
          )} */}
          {
            <Grid item xs={12}>
              {/* {renderQuiz(selectedYear)} */}
            </Grid>
          }
        </Grid>
      </Container>
    </ThemeProvider>
  );
}

export default TakeQuiz;
