import React, { useState } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Container, Grid, Button, Typography, List, ListItem, ListItemText, LinearProgress } from '@mui/material';

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
    years: ['Year 1', 'Year 2', 'Year 3'],
  },
  {
    name: 'Mathematics',
    grade: '9-12',
    years: ['Year 1', 'Year 2', 'Year 3'],
  },
  {
    name: 'English',
    grade: '9-12',
    years: ['Year 1', 'Year 2', 'Year 3'],
  },
  {
    name: 'History',
    grade: '9-12',
    years: ['Year 1', 'Year 2', 'Year 3'],
  },
  {
    name: 'Chemistry',
    grade: '9-12',
    years: ['Year 1', 'Year 2', 'Year 3'],
  },
  {
    name: 'Biology',
    grade: '9-12',
    years: ['Year 1', 'Year 2', 'Year 3'],
  },
  {
    name: 'Aptitude',
    grade: '9-12',
    years: ['Year 1', 'Year 2', 'Year 3'],
  },
  {
    name: 'Economics',
    grade: '9-12',
    years: ['Year 1', 'Year 2', 'Year 3'],
  },
];

function TrackProgress() {
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [viewingYears, setViewingYears] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleSubjectSelect = (subject) => {
    setSelectedSubject(subject);
    setViewingYears(true);
  };

  const handleYearSelect = (year) => {
    console.log(`Selected Year: ${year}`);
    setProgress(50);
  };

  const handleStartExam = () => {
    // Implement logic to start the exam
    console.log('Exam Started');
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
      <Typography variant="h4" className="title">{selectedSubject.name} - Select a Year</Typography>
      <Button variant="contained" color="primary" onClick={() => setViewingYears(false)}>
        Back to Subjects
      </Button>
      <List>
        {selectedSubject.years.map((year, index) => (
          <ListItem button key={index} onClick={() => handleYearSelect(year)}>
            <ListItemText primary={year} />
          </ListItem>
        ))}
      </List>
      <Button variant="contained" color="primary" onClick={handleStartExam}>
        Start Exam
      </Button>
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
        {progress > 0 && <LinearProgress variant="determinate" value={progress} />}
      </Container>
    </ThemeProvider>
  );
}

export default TrackProgress;
