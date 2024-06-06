import React from 'react';
import { Button, FormControl, InputLabel, MenuItem, Select, Typography } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
  },
});

const Signup = () => {
  const handleRoleChange = (e) => {
    const role = e.target.value.toLowerCase();
    switch (role) {
      case 'sme':
        window.location.href = '/sme'; // Redirect to SME.js
        break;
      case 'student':
        window.location.href = '/student'; // Redirect to Student.js
        break;
      case 'admin':
        window.location.href = '/admin'; // Redirect to Admin.js
        break;
      default:
        break;
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
          background: 'linear-gradient(45deg, #F8F4F5 30%, #E9E3E0 90%)',
        }}
      >
        <FormControl
          style={{
            width: '300px',
            textAlign: 'center',
            padding: '2rem',
            borderRadius: '8px',
            background: '#EBE4E4',
            boxShadow: '0px 3px 15px rgba(0, 0, 0, 0.2)',
          }}
        >
          <Typography variant="h4" gutterBottom>
            What defines you?
          </Typography>
          <FormControl style={{ marginTop: '2rem', width: '100%' }}>
            <InputLabel id="role-label">Select Role</InputLabel>
            <Select
              labelId="role-label"
              id="role-select"
              onChange={handleRoleChange}
              defaultValue="Select role"
            >
              <MenuItem value="sme">Subject Matter Expert</MenuItem>
              <MenuItem value="student">Student</MenuItem>
              <MenuItem value="admin">Admin</MenuItem>
            </Select>
          </FormControl>
          <Button variant="contained" color="primary" onClick={handleRoleChange} fullWidth style={{ marginTop: '2rem' }}>
            Sign Up
          </Button>
        </FormControl>
      </div>
    </ThemeProvider>
  );
};

export default Signup;
