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
import { createAExam } from '../features/exam/examSlice';
import { getAllCourses } from '../features/course/courseSlice'; // Adjust based on actual slice import

const ExamUpload = () => {
  const dispatch = useDispatch();
  const courseState = useSelector((state) => state.courses.course); // Adjust based on actual state structure
  const [courseId, setCourseId] = useState(null);

  useEffect(() => {
    dispatch(getAllCourses());
  }, [dispatch]);

  const examSchema = Yup.object().shape({
    examData: Yup.array()
      .of(
        Yup.object().shape({
          title: Yup.string().required('Title is required'),
          year: Yup.number()
            .required('Year is required')
            .integer('Year must be an integer')
            .min(2017, 'Year must be from 2017 onwards')
            .max(2039, 'Year must be until 2039'),
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
      .min(1, 'Must have at least 1 examData'),
  });

  const formik = useFormik({
    initialValues: {
      examData: [
        {
          title: '',
          year: '',
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
    validationSchema: examSchema,
    onSubmit: (values, { resetForm }) => {
      dispatch(createAExam({courseId, examData: values}));
      console.log(values)
      console.log(typeof(values.examData))
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
      const updatedExamData = [...prevValues.examData];
      updatedExamData[index] = {
        ...updatedExamData[index],
        questions: [
          ...updatedExamData[index].questions,
          { question: '', options: ['', '', '', ''], answer: '' }
        ]
      };
      return {
        ...prevValues,
        examData: updatedExamData,
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
            Create Exam
          </Typography>
          {renderSubjectSelection()}
          <form onSubmit={formik.handleSubmit}>
            {formik.values.examData.map((exam, index) => (
              <div key={index}>
                <TextField
                  fullWidth
                  label="Exam Title"
                  name={`examData[${index}].title`}
                  value={formik.values.examData[index].title}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.examData && formik.touched.examData[index] && Boolean(formik.errors.examData?.[index]?.title)}
                  helperText={formik.touched.examData && formik.touched.examData[index] && formik.errors.examData?.[index]?.title}
                  margin="normal"
                  variant="outlined"
                />
                <TextField
                  fullWidth
                  label="Year"
                  name={`examData[${index}].year`}
                  value={formik.values.examData[index].year}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.examData && formik.touched.examData[index] && Boolean(formik.errors.examData?.[index]?.year)}
                  helperText={formik.touched.examData && formik.touched.examData[index] && formik.errors.examData?.[index]?.year}
                  margin="normal"
                  variant="outlined"
                />
                {exam?.questions?.map((question, qIndex) => (
                  <Box key={qIndex} sx={{ mt: 3 }}>
                    <TextField
                      fullWidth
                      label={`Question ${qIndex + 1}`}
                      name={`examData[${index}].questions[${qIndex}].question`}
                      value={formik.values.examData[index].questions[qIndex].question}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={formik.touched.examData && formik.touched.examData[index]?.questions && formik.touched.examData[index].questions[qIndex]?.question && Boolean(formik.errors.examData?.[index]?.questions?.[qIndex]?.question)}
                      helperText={formik.touched.examData && formik.touched.examData[index]?.questions && formik.errors.examData?.[index]?.questions?.[qIndex]?.question}
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
                        name={`examData[${index}].questions[${qIndex}].options[${oIndex}]`}
                        value={formik.values.examData[index].questions[qIndex].options[oIndex]}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.examData && formik.touched.examData[index]?.questions && formik.touched.examData[index].questions[qIndex]?.options && formik.touched.examData[index].questions[qIndex].options[oIndex] && Boolean(formik.errors.examData?.[index]?.questions?.[qIndex]?.options?.[oIndex])}
                        helperText={formik.touched.examData && formik.touched.examData[index]?.questions && formik.errors.examData?.[index]?.questions?.[qIndex]?.options?.[oIndex]}
                        margin="normal"
                        variant="outlined"
                      />
                    ))}
                    <TextField
                      fullWidth
                      label={`Correct Answer for Question ${qIndex + 1}`}
                      name={`examData[${index}].questions[${qIndex}].answer`}
                      value={formik.values.examData[index].questions[qIndex].answer}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={formik.touched.examData && formik.touched.examData[index]?.questions && formik.touched.examData[index].questions[qIndex]?.answer && Boolean(formik.errors.examData?.[index]?.questions?.[qIndex]?.answer)}
                      helperText={formik.touched.examData && formik.touched.examData[index]?.questions && formik.errors.examData?.[index]?.questions?.[qIndex]?.answer}
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

export default ExamUpload;
