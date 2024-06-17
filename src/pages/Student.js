import React from 'react';
import {useDispatch} from 'react-redux';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Container, TextField, Button, Typography, Grid, Paper, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import { useFormik } from 'formik';
import {registerUser} from "../features/user/userSlice";

import * as Yup from 'yup';

const theme = createTheme({
  palette: {
    primary: {
      main: '#9b59b6',
    },
    secondary: {
      main: '#2980b9',
    },
    background: {
      default: '#f2f2f2',
    },
  },
});

const signupSchema = Yup.object({
  // firstName: Yup.string().required('First Name is required!'),
  // lastName: Yup.string().required('Last Name is required!'),
  email: Yup.string().email('Invalid email format!').required('Email is required!'),
  password: Yup.string().min(8, 'Password must be at least 8 characters!').required('Password is required!'),
  confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match').required('Confirm Password is required'),
  // phone: Yup.string().required('Phone Number is required'),
  // matches(/^[0-9]{10}$/, 'Phone Number must be 10 digits')
});

const Student = () => {
  const dispatch = useDispatch()
  const formik = useFormik({
    initialValues: {
      // firstName: '',
      // lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
      // phone: '',
      role: 'student'
    },
    validationSchema: signupSchema,
    onSubmit: (values) => {
      dispatch(registerUser(values));
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Container
        maxWidth="sm"
        style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '40px' }}
      >
        <Paper className="student-registration-paper" style={{ padding: '20px', width: '100%' }}>
          <Typography variant="h4" gutterBottom align="center" className="student-registration-title">
            Student Registration
          </Typography>
          <form onSubmit={formik.handleSubmit} className="student-registration-form">
            <Grid container spacing={3} className="student-registration-grid">
              {/* <Grid item xs={12} sm={6}>
                <TextField
                  label="First Name"
                  variant="outlined"
                  name="firstName"
                  value={formik.values.firstName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  fullWidth
                  required
                  error={formik.touched.firstName && Boolean(formik.errors.firstName)}
                  helperText={formik.touched.firstName && formik.errors.firstName}
                  className="student-registration-input"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Last Name"
                  variant="outlined"
                  name="lastName"
                  value={formik.values.lastName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  fullWidth
                  required
                  error={formik.touched.lastName && Boolean(formik.errors.lastName)}
                  helperText={formik.touched.lastName && formik.errors.lastName}
                  className="student-registration-input"
                />
              </Grid> */}
              <Grid item xs={12}>
                <TextField
                  label="Email"
                  variant="outlined"
                  name="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  fullWidth
                  required
                  error={formik.touched.email && Boolean(formik.errors.email)}
                  helperText={formik.touched.email && formik.errors.email}
                  className="student-registration-input"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Password"
                  variant="outlined"
                  name="password"
                  type="password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  fullWidth
                  required
                  error={formik.touched.password && Boolean(formik.errors.password)}
                  helperText={formik.touched.password && formik.errors.password}
                  className="student-registration-input"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Confirm Password"
                  variant="outlined"
                  name="confirmPassword"
                  type="password"
                  value={formik.values.confirmPassword}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  fullWidth
                  required
                  error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
                  helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
                  className="student-registration-input"
                />
              </Grid>
              {/* <Grid item xs={12}>
                <TextField
                  label="Phone Number"
                  variant="outlined"
                  name="phone"
                  value={formik.values.phone}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  fullWidth
                  required
                  error={formik.touched.phone && Boolean(formik.errors.phone)}
                  helperText={formik.touched.phone && formik.errors.phone}
                  className="student-registration-input"
                />
              </Grid> */}
              {/* <Grid item xs={12}>
                <FormControl fullWidth className="student-registration-input" error={formik.touched.grade && Boolean(formik.errors.grade)}>
                  <InputLabel id="grade-label">Grade</InputLabel>
                  <Select
                    labelId="grade-label"
                    name="grade"
                    value={formik.values.grade}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    required
                  >
                    <MenuItem value="">Select a grade</MenuItem>
                    {gradeOptions.map((option, index) => (
                      <MenuItem key={index} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                  </Select>
                  {formik.touched.grade && formik.errors.grade && (
                    <Typography variant="caption" color="error">
                      {formik.errors.grade}
                    </Typography>
                  )}
                </FormControl>
              </Grid> */}
              <Grid item xs={12}>
                <Button type="submit" variant="contained" color="primary" fullWidth className="student-registration-button">
                  Register
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Container>
    </ThemeProvider>
  );
};

export default Student;
