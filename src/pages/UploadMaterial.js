// MaterialUpload.js

import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createACourseMaterial } from '../features/courseMaterial/courseMaterialSlice';
import { getAllCourses } from '../features/course/courseSlice';

import {
  Button,
  Container,
  Grid,
  TextField,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const initialValues = {
  title: '',
  description: '',
  file: null,
};

const validationSchema = Yup.object().shape({
  title: Yup.string().required('Title is required'),
  description: Yup.string().required('Description is required'),
  file: Yup.mixed().required('File is required'),
});

const MaterialUpload = () => {
  const dispatch = useDispatch();
  const courseState = useSelector((state) => state.courses.course);
  const [courseId, setCourseId] = useState(null);

  useEffect(() => {
    dispatch(getAllCourses());
  }, [dispatch]);

      
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      console.log(values)
      dispatch(createACourseMaterial({ courseId: courseId, fileToUpload: values }));
    },
  });

  const renderSubjectSelection = () => (
    <div>
      <Typography variant="h4" className="title">
        Select a Subject
      </Typography>
      <List>
        {courseState &&
          courseState.map((course) => (
            <ListItem button key={course._id} onClick={() => setCourseId(course._id)}>
              <ListItemText primary={course.title} />
            </ListItem>
          ))}
      </List>
    </div>
  );

  return (
    <Container maxWidth="sm">
      <Paper style={{ padding: 16 }}>
        <Typography variant="h5" gutterBottom>
          Upload Course Material
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            {renderSubjectSelection()}
          </Grid>
          <Grid item xs={12}>
            <form onSubmit={formik.handleSubmit} encType="multipart/form-data">
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    variant="outlined"
                    label="Title"
                    name="title"
                    value={formik.values.title}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.title && Boolean(formik.errors.title)}
                    helperText={formik.touched.title && formik.errors.title}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    variant="outlined"
                    label="Description"
                    multiline
                    rows={4}
                    name="description"
                    value={formik.values.description}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.description && Boolean(formik.errors.description)}
                    helperText={formik.touched.description && formik.errors.description}
                  />
                </Grid>
                <Grid item xs={12}>
                  <input
                    id="file"
                    name="file"
                    type="file"
                    onChange={(event) => formik.setFieldValue('file', event.currentTarget.files[0])}
                    style={{ display: 'none' }}
                  />
                  <label htmlFor="file">
                    <Button component="span" variant="outlined" startIcon={<CloudUploadIcon />}>
                      Upload File
                    </Button>
                    {formik.values.file && (
                      <Typography variant="body1">{formik.values.file.name}</Typography>
                    )}
                    {formik.touched.file && formik.errors.file && (
                      <Typography variant="body2" color="error">
                        {formik.errors.file}
                      </Typography>
                    )}
                  </label>
                </Grid>
                <Grid item xs={12}>
                  <Button type="submit" variant="contained" color="primary">
                    Upload Material
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default MaterialUpload;
