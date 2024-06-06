import React, { useState } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import  { createGlobalStyle } from 'styled-components';
import { Container, Grid, Button, Typography, List, ListItem, ListItemText } from '@mui/material';

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

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    background-color: #ADECC5; 
  }
`;

const globalStyles = {
  backgroundColor: '#C59090', 
  padding: '20px',
};

const subjects = [
  {
    name: 'Physics',
    grade: '9-12',
    chapters: [
      { title: 'Chapter 1', materials: ['Notes', 'Videos', 'PDFs'] },
      { title: 'Chapter 2', materials: ['Notes', 'Videos', 'PDFs'] },
    ],
  },
  {
    name: 'Mathematics',
    grade: '9-12',
    chapters: [
      { title: 'Chapter 1', materials: ['Notes', 'Videos', 'PDFs'] },
      { title: 'Chapter 2', materials: ['Notes', 'Videos', 'PDFs'] },
    ],
  },
  {
    name: 'English',
    grade: '9-12',
    chapters: [
      { title: 'Chapter 1', materials: ['Notes', 'Videos', 'PDFs'] },
      { title: 'Chapter 2', materials: ['Notes', 'Videos', 'PDFs'] },
    ],
  },
  {
    name: 'History',
    grade: '9-12',
    chapters: [
      { title: 'Chapter 1', materials: ['Notes', 'Videos', 'PDFs'] },
      { title: 'Chapter 2', materials: ['Notes', 'Videos', 'PDFs'] },
    ],
  },
  {
    name: 'Chemistry',
    grade: '9-12',
    chapters: [
      { title: 'Chapter 1', materials: ['Notes', 'Videos', 'PDFs'] },
      { title: 'Chapter 2', materials: ['Notes', 'Videos', 'PDFs'] },
    ],
  },
  {
    name: 'Biology',
    grade: '9-12',
    chapters: [
      { title: 'Chapter 1', materials: ['Notes', 'Videos', 'PDFs'] },
      { title: 'Chapter 2', materials: ['Notes', 'Videos', 'PDFs'] },
    ],
  },
  {
    name: 'Aptitude',
    grade: '9-12',
    chapters: [
      { title: 'Chapter 1', materials: ['Notes', 'Videos', 'PDFs'] },
      { title: 'Chapter 2', materials: ['Notes', 'Videos', 'PDFs'] },
    ],
  },
  {
    name: 'Economics',
    grade: '9-12',
    chapters: [
      { title: 'Chapter 1', materials: ['Notes', 'Videos', 'PDFs'] },
      { title: 'Chapter 2', materials: ['Notes', 'Videos', 'PDFs'] },
    ],
  },
];

function MaterialAccess() {
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [selectedChapter, setSelectedChapter] = useState(null);
  const [viewingChapters, setViewingChapters] = useState(false);
  const [currentChapterIndex, setCurrentChapterIndex] = useState(0);

  const handleSubjectSelect = (subject) => {
    setSelectedSubject(subject);
    setSelectedChapter(subject.chapters[0]);
    setViewingChapters(true);
    setCurrentChapterIndex(0);
  };

  const handlePreviousChapter = () => {
    if (viewingChapters && currentChapterIndex > 0) {
      setSelectedChapter(selectedSubject.chapters[currentChapterIndex - 1]);
      setCurrentChapterIndex(currentChapterIndex - 1);
    } else {
      setViewingChapters(false);
    }
  };

  const handleNextChapter = () => {
    if (currentChapterIndex < selectedSubject.chapters.length - 1) {
      setSelectedChapter(selectedSubject.chapters[currentChapterIndex + 1]);
      setCurrentChapterIndex(currentChapterIndex + 1);
    }
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

  const renderChapterNavigation = () => (
    <div>
      <Typography variant="h4" className="title">{selectedSubject.name} - {selectedChapter.title}</Typography>
      <Typography variant="body1">Boost your knowledge on the chapter with the following materials</Typography>
      <div className="button-group" style={{ display: 'flex', gap: '10px', marginBottom: 15 }}>
        {currentChapterIndex > 0 && (
          <Button
            variant="contained"
            color="primary"
            onClick={handlePreviousChapter}
            className="material-button"
          >
            Previous Chapter
          </Button>
        )}
        {currentChapterIndex < selectedSubject.chapters.length - 1 && (
          <Button
            variant="contained"
            color="primary"
            onClick={handleNextChapter}
            className="material-button"
          >
            Next Chapter
          </Button>
        )}
        <Button
          variant="contained"
          color="primary"
          onClick={() => setViewingChapters(false)}
          className="material-button"
        >
          Back to Subjects
        </Button>
      </div>
      <div className="button-group" style={{ display: 'flex', gap: '20px' }}>
        {selectedChapter.materials.map((material, index) => (
          <Button
            key={index}
            variant="outlined"
            color="primary"
            className="material-button"
            onClick={() => handleMaterialDownload(material)}
          >
            View {material}
          </Button>
        ))}
        <Button
          variant="outlined"
          color="primary"
          className="material-button"
          onClick={handleMaterialDownloadAll}
        >
          Download
        </Button>
      </div>
    </div>
  );

  const handleMaterialDownload = (material) => {
    console.log(`View/Download ${material}`);
  };

  const handleMaterialDownloadAll = () => {
    console.log('Download All Materials');
  };

  return (
    <ThemeProvider theme={theme}>
    <GlobalStyle styles={{ body: { GlobalStyle} }}/>
      <Container maxWidth="md" style={globalStyles}>
        <Grid container spacing={3}>
          {!viewingChapters && (
            <Grid item xs={12}>
              {renderSubjectSelection()}
            </Grid>
          )}
          {viewingChapters && (
            <Grid item xs={12}>
              {renderChapterNavigation()}
            </Grid>
          )}
        </Grid>
      </Container>
    </ThemeProvider>
  );
}

export default MaterialAccess;
