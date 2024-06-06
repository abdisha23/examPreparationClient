import React, { useState } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Container, TextField, Button, Typography, Grid, Paper, Checkbox, FormControlLabel } from '@mui/material';
import './Styling/StudyMaterial.css';

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

const StudyMaterialPage = () => {
  const [formData, setFormData] = useState({
    Totalpage: '',
    Title: '',
    Type: '',
    file: null,
    downloadLink: '',
  });
  const [useDirectLink, setUseDirectLink] = useState(false);

  const handleInputChange = (event) => {
    const { name, value, type, files } = event.target;
    if (type === 'file') {
      setFormData((prevData) => ({
        ...prevData,
        file: files[0],
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleDirectLinkToggle = (event) => {
    setUseDirectLink(event.target.checked);
  };

  const handleStudyMaterialSubmit = (event) => {
    event.preventDefault();
    console.log('Study Material Data:', formData);
  };

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="sm" className="study-material-container">
        <Paper className="study-material-paper">
          <Typography variant="h4" gutterBottom align="center" className="study-material-title">
            Upload Study Material
          </Typography>
          <form onSubmit={handleStudyMaterialSubmit} className="study-material-form">
            <Grid container spacing={3} className="study-material-grid">
              <Grid item xs={12}>
                <TextField
                  label="Total page"
                  variant="outlined"
                  name="Total page"
                  value={formData.IntLength}
                  onChange={handleInputChange}
                  fullWidth
                  required
                  className="study-material-input"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Title"
                  variant="outlined"
                  name="Title"
                  value={formData.Title}
                  onChange={handleInputChange}
                  fullWidth
                  required
                  className="study-material-input"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Type"
                  variant="outlined"
                  name="Type"
                  value={formData.Type}
                  onChange={handleInputChange}
                  fullWidth
                  required
                  className="study-material-input"
                />
              </Grid>
              <Grid item xs={12}>
                {useDirectLink ? (
                  <TextField
                    label="Download Link"
                    variant="outlined"
                    name="downloadLink"
                    value={formData.downloadLink}
                    onChange={handleInputChange}
                    fullWidth
                    required
                    className="study-material-input"
                  />
                ) : (
                  <input
                    type="file"
                    name="file"
                    onChange={handleInputChange}
                    required
                    className="study-material-input"
                  />
                )}
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={useDirectLink}
                      onChange={handleDirectLinkToggle}
                      name="useDirectLink"
                    />
                  }
                  label="Use Direct Link"
                />
              </Grid>
              <Grid item xs={12}>
                <Button type="submit" variant="contained" color="primary" fullWidth className="study-material-button">
                  Submit
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Container>
    </ThemeProvider>
  );
};

export default StudyMaterialPage;