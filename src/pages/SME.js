import React from 'react';
import {useDispatch} from 'react-redux';
import { Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography, Container } from '@mui/material';
import { useFormik } from 'formik';
import {registerSME} from "../features/user/userSlice";


import * as Yup from 'yup';

const validationSchema = Yup.object({
  firstName: Yup.string().required('First Name is required'),
  lastName: Yup.string().required('Last Name is required'),
  email: Yup.string().email('Invalid email format').required('Email is required'),
  password: Yup.string().min(8, 'Password must be at least 8 characters!').required('Password is required!'),
  phoneNumber: Yup.string()
    .matches(/^[0-9]+$/, 'Phone number must be only digits')
    .min(10, 'Phone number must be at least 10 digits')
    .max(15, 'Phone number cannot exceed 15 digits')
    .required('Phone number is required'),
  areaOfExpertise: Yup.string().required('Area of Expertise is required'),
});

const SME = () => {
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      phoneNumber: '',
      areaOfExpertise: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log(values);
      dispatch(registerSME(values));
    
    },
  });

  return (
    <Container
      maxWidth="sm"
      sx={{
        backgroundColor: '#f4f6f8',
        padding: '2rem',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
        marginTop: '2rem',
        textAlign: 'center',
      }}
    >
      <Typography variant="h4" gutterBottom sx={{ color: '#333', marginBottom: '1rem' }}>
        Subject matter registration
      </Typography>
      <form onSubmit={formik.handleSubmit}>
        <FormControl fullWidth sx={{ mb: 2 }}>
          <TextField
            id="firstName"
            name="firstName"
            label="First Name"
            variant="outlined"
            value={formik.values.firstName}
            onChange={formik.handleChange}
            error={formik.touched.firstName && Boolean(formik.errors.firstName)}
            helperText={formik.touched.firstName && formik.errors.firstName}
            sx={{
              backgroundColor: '#fff',
              borderRadius: '4px',
              '& .MuiOutlinedInput-root': {
                '&.Mui-focused fieldset': {
                  borderColor: '#3f51b5',
                },
              },
            }}
          />
        </FormControl>
        <FormControl fullWidth sx={{ mb: 2 }}>
          <TextField
            id="lastName"
            name="lastName"
            label="Last Name"
            variant="outlined"
            value={formik.values.lastName}
            onChange={formik.handleChange}
            error={formik.touched.lastName && Boolean(formik.errors.lastName)}
            helperText={formik.touched.lastName && formik.errors.lastName}
            sx={{
              backgroundColor: '#fff',
              borderRadius: '4px',
              '& .MuiOutlinedInput-root': {
                '&.Mui-focused fieldset': {
                  borderColor: '#3f51b5',
                },
              },
            }}
          />
        </FormControl>
        <FormControl fullWidth sx={{ mb: 2 }}>
          <TextField
            id="email"
            name="email"
            label="Email Address"
            variant="outlined"
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
            sx={{
              backgroundColor: '#fff',
              borderRadius: '4px',
              '& .MuiOutlinedInput-root': {
                '&.Mui-focused fieldset': {
                  borderColor: '#3f51b5',
                },
              },
            }}
          />
        </FormControl>
        <FormControl fullWidth sx={{ mb: 2 }}>
          <TextField
            id="password"
            name="password"
            label="Password"
            variant="outlined"
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
            sx={{
              backgroundColor: '#fff',
              borderRadius: '4px',
              '& .MuiOutlinedInput-root': {
                '&.Mui-focused fieldset': {
                  borderColor: '#3f51b5',
                },
              },
            }}
          />
        </FormControl>
        <FormControl fullWidth sx={{ mb: 2 }}>
          <TextField
            id="phoneNumber"
            name="phoneNumber"
            label="Phone Number"
            variant="outlined"
            value={formik.values.phoneNumber}
            onChange={formik.handleChange}
            error={formik.touched.phoneNumber && Boolean(formik.errors.phoneNumber)}
            helperText={formik.touched.phoneNumber && formik.errors.phoneNumber}
            sx={{
              backgroundColor: '#fff',
              borderRadius: '4px',
              '& .MuiOutlinedInput-root': {
                '&.Mui-focused fieldset': {
                  borderColor: '#3f51b5',
                },
              },
            }}
          />
        </FormControl>
        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel id="areaOfExpertise-label" sx={{ backgroundColor: '#fff', paddingRight: '4px' }}>Area of Expertise</InputLabel>
          <Select
            labelId="areaOfExpertise-label"
            id="areaOfExpertise"
            name="areaOfExpertise"
            value={formik.values.areaOfExpertise}
            onChange={formik.handleChange}
            label="Area of Expertise"
            error={formik.touched.areaOfExpertise && Boolean(formik.errors.areaOfExpertise)}
            sx={{
              backgroundColor: '#fff',
              borderRadius: '4px',
              '& .MuiOutlinedInput-root': {
                '&.Mui-focused fieldset': {
                  borderColor: '#3f51b5',
                },
              },
            }}
          >
            <MenuItem value="">Select</MenuItem>
            <MenuItem value="Physics">Physics</MenuItem>
            <MenuItem value="Maths">Maths</MenuItem>
            <MenuItem value="English">English</MenuItem>
            <MenuItem value="Aptitude">Aptitude</MenuItem>
            <MenuItem value="Chemistry">Chemistry</MenuItem>
            <MenuItem value="Biology">Biology</MenuItem>
          </Select>
        </FormControl>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{
            marginTop: '1rem',
            padding: '0.75rem',
            fontWeight: 'bold',
            textTransform: 'none',
          }}
        >
          Register
        </Button>
      </form>
    </Container>
  );
};

export default SME;
