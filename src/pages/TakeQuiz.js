import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import {
  Container,
  Grid,
  Typography,
  List,
  ListItem,
  Box,
  Button,
  Paper,
} from "@mui/material";
import { getAllCourses } from "../features/course/courseSlice";
import { getAllQuizzes } from "../features/quiz/quizSlice";

const theme = createTheme({
  palette: {
    primary: {
      main: "#7EA794",
    },
    secondary: {
      main: "#f50057",
    },
    success: {
      main: "#4caf50",
    },
    error: {
      main: "#f44336",
    },
    background: {
      default: "#f0f2f5",
    },
  },
  typography: {
    h4: {
      fontSize: "1.5rem",
      fontWeight: "bold",
    },
    h5: {
      fontSize: "1.25rem",
      fontWeight: "bold",
    },
    h6: {
      fontSize: "1rem",
      fontWeight: "bold",
    },
    body1: {
      fontSize: "0.875rem",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "8px",
          textTransform: "none",
        },
      },
    },
  },
});

const optionsLabels = ["A", "B", "C", "D"];

function TakeQuiz() {
  const [courseId, setCourseId] = useState(null);
  const [activeCourse, setActiveCourse] = useState(null);
  const [timeLeft, setTimeLeft] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showResult, setShowResult] = useState(false);
  const dispatch = useDispatch();
  const courseState = useSelector((state) => state?.courses?.course);
  const quizState = useSelector((state) => state?.quizzes?.allQuizzes);

  useEffect(() => {
    dispatch(getAllCourses());
  }, [dispatch]);

  useEffect(() => {
    if (timeLeft > 0 && !showResult) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !showResult) {
      setShowResult(true);
    }
  }, [timeLeft, showResult]);

  useEffect(() => {
    if (activeCourse) {
      document
        .querySelector('meta[name="theme-color"]')
        .setAttribute("content", "#3f51b5");
      document.body.style.backgroundColor = "#f0f2f5";
    }
  }, [activeCourse]);

  const handleCourseClick = (course) => {
    setCourseId(course._id);
    setActiveCourse(course._id);
    dispatch(getAllQuizzes(course._id));
    setSelectedAnswers({});
    setShowResult(false);
  };

  useEffect(() => {
    if (quizState && quizState.length > 0) {
      const totalQuestions = quizState[0].quiz[0].questions.length;
      setTimeLeft(totalQuestions * 60);
    }
  }, [quizState]);

  const handleOptionClick = (questionId, option, correctAnswer) => {
    if (!selectedAnswers[questionId]) {
      const updatedAnswers = {
        ...selectedAnswers,
        [questionId]: option,
      };
      setSelectedAnswers(updatedAnswers);

      const totalQuestions = quizState[0].quiz[0].questions.length;
      if (Object.keys(updatedAnswers).length === totalQuestions) {
        setShowResult(true);
      }
    }
  };

  const calculateResult = () => {
    let correctAnswersCount = 0;
    for (const questionId in selectedAnswers) {
      if (
        selectedAnswers[questionId] ===
        quizState[0].quiz[0].questions.find((q) => q._id === questionId).answer
      ) {
        correctAnswersCount++;
      }
    }
    return correctAnswersCount;
  };

  const renderQuiz = () => {
    if (timeLeft <= 0 || showResult) {
      return (
        <Box mt={3}>
          <Paper elevation={3} sx={{ padding: 3, backgroundColor: "#fff" }}>
            <Typography variant="h6" color="primary" gutterBottom>
              Quiz Completed!
            </Typography>
            <Typography variant="h6" color="primary" gutterBottom>
              Your Score: {calculateResult()} out of{" "}
              {quizState ? quizState[0].quiz[0].questions.length : 0}
            </Typography>
            {showResult && (
              <List>
                {quizState &&
                  quizState.map((quiz) => (
                    <Box key={quiz._id} mb={4}>
                      <Typography variant="h5" gutterBottom>
                        {quiz.quiz[0].title}
                      </Typography>
                      <List>
                        {quiz.quiz[0].questions.map((question, index) => (
                          <ListItem
                            key={question._id}
                            sx={{ display: "block" }}>
                            <Typography variant="h6" gutterBottom>
                              {`${index + 1}. ${question.question}`}
                            </Typography>
                            <List>
                              {question.options.map((option, optionIndex) => (
                                <ListItem key={optionIndex}>
                                  <Button
                                    variant="contained"
                                    color={
                                      selectedAnswers[question._id] === option
                                        ? selectedAnswers[question._id] ===
                                          question.answer
                                          ? "success"
                                          : "error"
                                        : "primary"
                                    }
                                    sx={{ margin: "5px" }}
                                    onClick={() =>
                                      handleOptionClick(
                                        question._id,
                                        option,
                                        question.answer
                                      )
                                    }
                                    disabled={showResult}>
                                    {`${optionsLabels[optionIndex]}: ${option}`}
                                  </Button>
                                </ListItem>
                              ))}
                            </List>
                            <Typography
                              variant="body1"
                              color="success"
                              gutterBottom>
                              Correct Answer: {question.answer}
                            </Typography>
                          </ListItem>
                        ))}
                      </List>
                    </Box>
                  ))}
              </List>
            )}
          </Paper>
        </Box>
      );
    }

    return (
      <Box mt={3}>
        <Paper elevation={3} sx={{ padding: 3, backgroundColor: "#fff" }}>
          <List>
            {quizState &&
              quizState.map((quiz) => (
                <Box key={quiz._id} mb={4}>
                  <Typography variant="h5" gutterBottom>
                    {quiz.quiz[0].title}
                  </Typography>
                  <List>
                    {quiz.quiz[0].questions.map((question, index) => (
                      <ListItem key={question._id} sx={{ display: "block" }}>
                        <Typography variant="h6" gutterBottom>
                          {`${index + 1}. ${question.question}`}
                        </Typography>
                        <List>
                          {question.options.map((option, optionIndex) => (
                            <ListItem key={optionIndex}>
                              <Button
                                variant="contained"
                                color={
                                  selectedAnswers[question._id] === option
                                    ? selectedAnswers[question._id] ===
                                      question.answer
                                      ? "success"
                                      : "error"
                                    : "primary"
                                }
                                sx={{ margin: "5px" }}
                                onClick={() =>
                                  handleOptionClick(
                                    question._id,
                                    option,
                                    question.answer
                                  )
                                }
                                disabled={showResult}>
                                {`${optionsLabels[optionIndex]}: ${option}`}
                              </Button>
                            </ListItem>
                          ))}
                        </List>
                      </ListItem>
                    ))}
                  </List>
                </Box>
              ))}
          </List>
        </Paper>
      </Box>
    );
  };

  const renderSubjectSelection = () => (
    <Box
      mt={6}
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexWrap="wrap">
      {courseState &&
        courseState.map((course) => (
          <Box key={course._id} mb={2} mx={2}>
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => handleCourseClick(course)}
              sx={{
                margin: "5px",
                backgroundColor:
                  activeCourse === course._id ? "#f50057" : "inherit",
                color: activeCourse === course._id ? "#fff" : "#000",
                borderRadius: "8px",
                textTransform: "none",
              }}>
              {course.title}
            </Button>
          </Box>
        ))}
    </Box>
  );

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="md">
        <Grid container spacing={3}>
          <Grid item xs={12}>
            {renderSubjectSelection()}
          </Grid>
          <Grid item xs={12}>
            {courseId && (
              <>
                <Paper
                  elevation={3}
                  sx={{
                    padding: "10px",
                    backgroundColor: "#e3f2fd",
                    marginTop: "20px",
                  }}>
                  <Typography variant="h6">
                    Time Left: {Math.floor(timeLeft / 60)}:
                    {(timeLeft % 60).toString().padStart(2, "0")}
                  </Typography>
                </Paper>
                {renderQuiz()}
              </>
            )}
          </Grid>
        </Grid>
      </Container>
    </ThemeProvider>
  );
}

export default TakeQuiz;
