import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Paper,
  createTheme,
  ThemeProvider,
  CssBaseline,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import { createAQuiz } from '../features/quiz/quizSlice';
import { getAllCourses } from '../features/course/courseSlice'; // Adjust based on actual slice import

const QuizUpload = () => {
  const dispatch = useDispatch();
  const courseState = useSelector((state) => state.courses.course); // Adjust based on actual state structure
  const [courseId, setCourseId] = useState(null);

  useEffect(() => {
    dispatch(getAllCourses());
  }, [dispatch]);

  const quizSchema = Yup.object().shape({
    quizData: Yup.array()
      .of(
        Yup.object().shape({
          title: Yup.string().required('Title is required'),
          questions: Yup.array()
            .of(
              Yup.object().shape({
                question: Yup.string().required('Question is required'),
                options: Yup.array()
                  .of(Yup.string().required('Option is required'))
                  .min(4, 'Must have 4 options')
                  .max(4, 'Must have 4 options'),
                answer: Yup.string().required('Answer is required'),
              })
            )
            .min(1, 'Must have at least 1 question'),
        })
      )
      .min(1, 'Must have at least 1 quiz'),
  });

  const formik = useFormik({
    initialValues: {
      quizData: [
        {
          title: '',
          questions: [
            {
              question: '',
              options: ['', '', '', ''],
              answer: '',
            },
          ],
        },
      ],
    },
    validationSchema: quizSchema,
    onSubmit: (values, { resetForm }) => {
      dispatch(createAQuiz({courseId, quizData: values}));
      // resetForm(); // Optionally reset the form after successful submission
    },
  });

  const handleCourseClick = (course) => {
    setCourseId(course._id);
  };

  const renderSubjectSelection = () => (
    <div>
      <Typography variant="h4" className="title">
        Select a Subject
      </Typography>
      <List>
        {courseState &&
          courseState.map((course) => (
            <ListItem button key={course._id} onClick={() => handleCourseClick(course)}>
              <ListItemText primary={course.title} />
            </ListItem>
          ))}
      </List>
    </div>
  );

  const handleAddQuestion = (index) => {
    formik.setValues((prevValues) => {
      const updatedQuizData = [...prevValues.quizData];
      updatedQuizData[index] = {
        ...updatedQuizData[index],
        questions: [
          ...updatedQuizData[index].questions,
          { question: '', options: ['', '', '', ''], answer: '' }
        ]
      };
      return {
        ...prevValues,
        quizData: updatedQuizData,
      };
    });
  };
  
  return (
    <ThemeProvider theme={createTheme({
      palette: {
        primary: {
          main: '#4caf50',
        },
        background: {
          default: '#e8f5e9', // Light green background color
          paper: '#ffffff',
        },
        text: {
          primary: '#333333',
        },
      },
    })}>
      <CssBaseline />
      <Container maxWidth="md">
        <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
          <Typography variant="h4" gutterBottom>
            Create Quiz
          </Typography>
          {renderSubjectSelection()}
          <form onSubmit={formik.handleSubmit}>
            {formik.values.quizData.map((quiz, index) => (
              <div key={index}>
                <TextField
                  fullWidth
                  label="Quiz Title"
                  name={`quizData[${index}].title`}
                  value={formik.values.quizData[index].title}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.quizData && formik.touched.quizData[index] && Boolean(formik.errors.quizData?.[index]?.title)}
                  helperText={formik.touched.quizData && formik.touched.quizData[index] && formik.errors.quizData?.[index]?.title}
                  margin="normal"
                  variant="outlined"
                />
                {/* <TextField
                  fullWidth
                  label="Year"
                  name={`quizData[${index}].year`}
                  value={formik.values.quizData[index].year}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.quizData && formik.touched.quizData[index] && Boolean(formik.errors.quizData?.[index]?.year)}
                  helperText={formik.touched.quizData && formik.touched.quizData[index] && formik.errors.quizData?.[index]?.year}
                  margin="normal"
                  variant="outlined"
                /> */}
                {quiz?.questions?.map((question, qIndex) => (
                  <Box key={qIndex} sx={{ mt: 3 }}>
                    <TextField
                      fullWidth
                      label={`Question ${qIndex + 1}`}
                      name={`quizData[${index}].questions[${qIndex}].question`}
                      value={formik.values.quizData[index].questions[qIndex].question}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={formik.touched.quizData && formik.touched.quizData[index]?.questions && formik.touched.quizData[index].questions[qIndex]?.question && Boolean(formik.errors.quizData?.[index]?.questions?.[qIndex]?.question)}
                      helperText={formik.touched.quizData && formik.touched.quizData[index]?.questions && formik.errors.quizData?.[index]?.questions?.[qIndex]?.question}
                      margin="normal"
                      variant="outlined"
                      multiline
                      rows={2}
                    />
                    {question?.options?.map((option, oIndex) => (
                      <TextField
                        key={oIndex}
                        fullWidth
                        label={`Option ${oIndex + 1}`}
                        name={`quizData[${index}].questions[${qIndex}].options[${oIndex}]`}
                        value={formik.values.quizData[index].questions[qIndex].options[oIndex]}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.quizData && formik.touched.quizData[index]?.questions && formik.touched.quizData[index].questions[qIndex]?.options && formik.touched.quizData[index].questions[qIndex].options[oIndex] && Boolean(formik.errors.quizData?.[index]?.questions?.[qIndex]?.options?.[oIndex])}
                        helperText={formik.touched.quizData && formik.touched.quizData[index]?.questions && formik.errors.quizData?.[index]?.questions?.[qIndex]?.options?.[oIndex]}
                        margin="normal"
                        variant="outlined"
                      />
                    ))}
                    <TextField
                      fullWidth
                      label={`Correct Answer for Question ${qIndex + 1}`}
                      name={`quizData[${index}].questions[${qIndex}].answer`}
                      value={formik.values.quizData[index].questions[qIndex].answer}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={formik.touched.quizData && formik.touched.quizData[index]?.questions && formik.touched.quizData[index].questions[qIndex]?.answer && Boolean(formik.errors.quizData?.[index]?.questions?.[qIndex]?.answer)}
                      helperText={formik.touched.quizData && formik.touched.quizData[index]?.questions && formik.errors.quizData?.[index]?.questions?.[qIndex]?.answer}
                      margin="normal"
                      variant="outlined"
                      multiline
                      rows={4}
                    />
                  </Box>
                ))}
                <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
              <Button
                type="button"
                variant="outlined"
                color="primary"
                onClick={() => handleAddQuestion(index)}
                 
              >
                Add Question
              </Button>
            </Box>
              </div>
            ))}
            <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
              <Button type="submit" variant="contained" color="primary">
                Submit
              </Button>
            </Box>
          </form>
        </Paper>
      </Container>
    </ThemeProvider>
  );
};

export default QuizUpload;
