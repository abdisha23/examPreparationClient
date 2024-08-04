import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import {
  Container,
  Typography,
  List,
  ListItem,
  Box,
  Button,
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { getAllCourses } from "../features/course/courseSlice";
import { getAllExams } from "../features/exam/examSlice";

const optionsLabels = ["A", "B", "C", "D"];

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

function TakeExam() {
  const [courseId, setCourseId] = useState(null);
  const [activeCourse, setActiveCourse] = useState(null);
  const [timeLeft, setTimeLeft] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showResult, setShowResult] = useState(false);
  const [selectedYear, setSelectedYear] = useState(null);
  const [examStarted, setExamStarted] = useState(false);
  const dispatch = useDispatch();
  const courseState = useSelector((state) => state?.courses?.course);
  const examState = useSelector((state) => state?.exams?.allExams?.exam);

  useEffect(() => {
    dispatch(getAllCourses());
  }, [dispatch]);

  useEffect(() => {
    if (activeCourse) {
      document
        .querySelector('meta[name="theme-color"]')
        .setAttribute("content", "#3f51b5");
      document.body.style.backgroundColor = "#f0f2f5";
    }
  }, [activeCourse]);

  useEffect(() => {
    let timer;
    if (examState && examState.length > 0 && examStarted) {
      const totalQuestions = examState[0].questions.length;
      setTimeLeft(totalQuestions * 60);
      timer = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 0) {
            clearInterval(timer);
            setShowResult(true);
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [examState, examStarted]);

  const handleCourseClick = (course) => {
    setCourseId(course._id);
    setActiveCourse(course._id);
    dispatch(getAllExams(course._id));
    setSelectedAnswers({});
    setShowResult(false);
    setExamStarted(false); // Reset examStarted when course is clicked
  };

  const handleOptionClick = (questionId, option, correctAnswer) => {
    if (!selectedAnswers[questionId]) {
      const updatedAnswers = {
        ...selectedAnswers,
        [questionId]: option,
      };
      setSelectedAnswers(updatedAnswers);

      const totalQuestions = examState[0].questions.length;
      if (Object.keys(updatedAnswers).length === totalQuestions) {
        setShowResult(true);
      }
    }
  };
  const calculateResult = () => {
    if (!examState || !examState[0]) {
      return 0; // Return 0 if examState is undefined or empty
    }

    let correctAnswersCount = 0;
    for (const questionId in selectedAnswers) {
      const question = examState[0].questions.find((q) => q._id === questionId);
      if (question && selectedAnswers[questionId] === question.answer) {
        correctAnswersCount++;
      }
    }
    return correctAnswersCount;
  };

  const startExam = () => {
    if (selectedYear) {
      setExamStarted(true);
    }
  };

  const renderExam = () => {
    if (!examStarted) {
      return null; // Don't render questions if exam hasn't started
    }

    if (timeLeft <= 0 || showResult) {
      return (
        <Box mt={3}>
          <Paper elevation={3} sx={{ padding: 3, backgroundColor: "#fff" }}>
            <Typography variant="h6" color="primary" gutterBottom>
              Exam Completed!
            </Typography>
            <Typography variant="h6" color="primary" gutterBottom>
              Your Score: {calculateResult()} out of{" "}
              {examState ? examState[0].questions.length : 0}
            </Typography>
            {showResult && (
              <List>
                {examState &&
                  examState.map((exam) => (
                    <Box key={exam._id} mb={4}>
                      <Typography variant="h5" gutterBottom>
                        {exam.title}
                      </Typography>
                      <List>
                        {exam.questions.map((question, index) => (
                          <ListItem
                            key={question._id}
                            sx={{ display: "block" }}>
                            <Typography variant="h6" gutterBottom>
                              {index + 1}. {question.question}
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
                                    {optionsLabels[optionIndex]}: {option}
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
          <Typography variant="h6" color="primary" gutterBottom>
            Time Left: {Math.floor(timeLeft / 60)}:
            {(timeLeft % 60).toString().padStart(2, "0")}
          </Typography>
          <List>
            {examState &&
              examState.map((exam) => (
                <Box key={exam._id} mb={4}>
                  <Typography variant="h5" gutterBottom>
                    {exam.title}
                  </Typography>
                  <List>
                    {exam.questions.map((question, index) => (
                      <ListItem key={question._id} sx={{ display: "block" }}>
                        <Typography variant="h6" gutterBottom>
                          {index + 1}. {question.question}
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
                                {optionsLabels[optionIndex]}: {option}
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

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="lg" style={{ marginTop: "70px" }}>
        <Typography variant="h4" color="primary" gutterBottom>
          Take Exam
        </Typography>
        <Typography variant="body1" gutterBottom>
          Select a course to begin:
        </Typography>
        <Box
          mt={3}
          display="flex"
          justifyContent="center"
          alignItems="center"
          flexWrap="wrap">
          {courseState &&
            courseState.map((course) => (
              <Box key={course._id} mb={2} mx={2}>
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={() => handleCourseClick(course)}
                  sx={{
                    margin: "5px",
                    backgroundColor:
                      activeCourse === course._id ? "#3f51b5" : "inherit",
                    color: activeCourse === course._id ? "#fff" : "inherit",
                  }}>
                  {course.title}
                </Button>
              </Box>
            ))}
        </Box>
        <FormControl variant="outlined" fullWidth sx={{ mt: 3, ml: 4 }}>
          <InputLabel id="year-select-label">Select Year</InputLabel>
          <Select
            labelId="year-select-label"
            id="year-select"
            value={selectedYear}
            sx={{ width: "100px" }}
            onChange={(e) => setSelectedYear(e.target.value)}
            label="Select Year">
            {examState &&
              examState.map((exam) => (
                <MenuItem key={exam._id} value={exam.year}>
                  {exam.year}
                </MenuItem>
              ))}
          </Select>
        </FormControl>
        {selectedYear && (
          <Box mt={2} ml={4}>
            <Button variant="contained" color="primary" onClick={startExam}>
              Start Exam
            </Button>
          </Box>
        )}
        {renderExam()}
      </Container>
    </ThemeProvider>
  );
}

export default TakeExam;
