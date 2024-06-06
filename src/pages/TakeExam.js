import React, { useState } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Container, Grid, Typography, List, ListItem, ListItemText, MenuItem, Select, Button } from '@mui/material';

const theme = createTheme({
  palette: {
    primary: {
      main: '#3f51b5',
    },
    secondary: {
      main: '#f50057',
    },
  },
});

const subjects = [
  {
    name: 'Physics',
    grade: '9-12',
    years: ['Year 2018', 'Year 2019', 'Year 2020', 'Year 2021', 'Year 2022'],
  },
  {
    name: 'Mathematics',
    grade: '9-12',
    years: ['Year 2018', 'Year 2019', 'Year 2020', 'Year 2021', 'Year 2022'],
  },
  {
    name: 'English',
    grade: '9-12',
    years: ['Year 2018', 'Year 2019', 'Year 2020', 'Year 2021', 'Year 2022'],
  },
  {
    name: 'History',
    grade: '9-12',
    years:['Year 2018', 'Year 2019', 'Year 2020', 'Year 2021', 'Year 2022'],
  },
  {
    name: 'Chemistry',
    grade: '9-12',
    years: ['Year 2018', 'Year 2019', 'Year 2020', 'Year 2021', 'Year 2022'],
  },
  {
    name: 'Biology',
    grade: '9-12',
    years: ['Year 2018', 'Year 2019', 'Year 2020', 'Year 2021', 'Year 2022'],
  },
  {
    name: 'Aptitude',
    grade: '9-12',
    years:['Year 2018', 'Year 2019', 'Year 2020', 'Year 2021', 'Year 2022'],
  },
  {
    name: 'Economics',
    grade: '9-12',
    years: ['Year 2018', 'Year 2019', 'Year 2020', 'Year 2021', 'Year 2022'],
  },
];

function TakeExam() {
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [selectedYear, setSelectedYear] = useState(null);
  const [viewingYears, setViewingYears] = useState(false);

  const handleSubjectSelect = (subject) => {
    setSelectedSubject(subject);
    setSelectedYear(subject.years[0]); // Default to the first year
    setViewingYears(true);
  };

  const handleYearSelect = (year) => {
    setSelectedYear(year);
    // Handle showing the exam page for the selected year
  };

  const handleBackToSubjects = () => {
    setSelectedSubject(null);
    setSelectedYear(null);
    setViewingYears(false);
  };

  const renderSubjectSelection = () => (
    <div>
      <Typography variant="h4" className="title">Select a Subject</Typography>
      <List>
        {subjects.map((subject, index) => (
          <ListItem button key={index} onClick={() => handleSubjectSelect(subject)}>
            <ListItemText primary={subject.name} />
          </ListItem>
        ))}
      </List>
    </div>
  );

  const renderYearSelection = () => (
    <div>
      <Typography variant="h4" className="title">{selectedSubject.name}</Typography>
      <Typography variant="body1">Select a Year</Typography>
      <Select
        value={selectedYear}
        onChange={(e) => handleYearSelect(e.target.value)}
        className="year-select"
      >
        {selectedSubject.years.map((year, index) => (
          <MenuItem key={index} value={year}>{year}</MenuItem>
        ))}
      </Select>
      <Button variant="contained" color="primary" onClick={handleBackToSubjects}>Back to Subjects</Button>
    </div>
  );

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="md">
        <Grid container spacing={3}>
          {!viewingYears && (
            <Grid item xs={12}>
              {renderSubjectSelection()}
            </Grid>
          )}
          {viewingYears && (
            <Grid item xs={12}>
              {renderYearSelection()}
            </Grid>
          )}
        </Grid>
      </Container>
    </ThemeProvider>
  );
}

export default TakeExam;
