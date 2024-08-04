import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addACourse } from "../features/course/courseSlice"; // Import addACourse action

import {
  Button,
  Container,
  Grid,
  TextField,
  Typography,
  Paper,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  title: Yup.string().required("Course Title is required"),
});

const AddCourse = () => {
  const dispatch = useDispatch();
  const [error, setError] = useState(null); // State to hold server validation error

  const formik = useFormik({
    initialValues: {
      title: "",
    },
    validationSchema,
    onSubmit: (values, { resetForm }) => {
      try {
        dispatch(addACourse(values));
        // resetForm(); // Reset the form after successful dispatch
        setError(null); // Clear any previous errors
      } catch (err) {
        if (err.response && err.response.data) {
          setError(err.response.data.message); // Set error message from server
        } else {
          setError("Failed to create course. Please try again."); // Fallback error message
        }
      }
    },
  });

  return (
    <Container maxWidth="sm">
      <Paper style={{ padding: 16 }}>
        <Typography variant="h5" gutterBottom>
          Add Course
        </Typography>
        {error && (
          <Typography variant="subtitle1" color="error" gutterBottom>
            {error}
          </Typography>
        )}
        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                variant="outlined"
                id="title"
                name="title"
                label="Course Title"
                value={formik.values.title}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.title && Boolean(formik.errors.title)}
                helperText={formik.touched.title && formik.errors.title}
              />
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" variant="outlined">
                Add Course
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default AddCourse;
