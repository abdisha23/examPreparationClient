import React, { useState } from 'react';
import { Container, Typography, Grid, TextField, Button, Dialog, DialogTitle, DialogContent, DialogActions, ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import * as Yup from 'yup';
import { useFormik } from 'formik';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    background: {
      default: '#BDE0E0',
    },
  },
});

const validationSchema = Yup.object({
  email: Yup.string().email('Invalid email format').required('Email is required'),
});

const ForgotPassword = () => {
  const [showEmailSentDialog, setShowEmailSentDialog] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log('Reset password email sent:', values.email);
      setShowEmailSentDialog(true);
      formik.resetForm();
    },
  });

  const handleCloseDialog = () => {
    setShowEmailSentDialog(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline /> {}
      <Container maxWidth="sm">
        <Typography variant="h4" align="center" gutterBottom>Forgot Password</Typography>
        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Email"
                required
                variant="outlined"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                fullWidth
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
              />
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" variant="contained" color="primary" fullWidth>
                Send Reset Email
              </Button>
            </Grid>
          </Grid>
        </form>
        <Dialog open={showEmailSentDialog} onClose={handleCloseDialog}>
          <DialogTitle>Password Reset Email Sent</DialogTitle>
          <DialogContent>
            <Typography variant="body1">An email with password reset instructions has been sent to your email address.</Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog} color="primary">Close</Button>
          </DialogActions>
        </Dialog>
      </Container>
    </ThemeProvider>
  );
};

export default ForgotPassword;
