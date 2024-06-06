import React, { useState } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Container, Button, Grid, Paper, Typography, GlobalStyles } from '@mui/material';
import questions from './questions.json';

const theme = createTheme({
  palette: {
    primary: {
      main: '#C7B1BC',
    },
    secondary: {
      main: '#C298A7',
    },
  },
});

const subjects = Object.keys(questions);

function Quiz() {
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showCorrectAnswer, setShowCorrectAnswer] = useState(false);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

  const handleSubjectSelect = (subject) => {
    setSelectedSubject(subject);
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setShowCorrectAnswer(false);
    setScore(0);
    setQuizFinished(false);
  };

  const handleAnswerSelect = (answer) => {
    setSelectedAnswer(answer);
    if (answer === questions[selectedSubject][currentIndex].correctAnswer) {
      setScore(score + 1);
    }
    setShowCorrectAnswer(true);
  };

  const handleNextQuestion = () => {
    setSelectedAnswer(null);
    setShowCorrectAnswer(false);
    setCurrentIndex(currentIndex + 1);
  };

  const handlePreviousQuestion = () => {
    if (currentIndex > 0) {
      setSelectedAnswer(null);
      setShowCorrectAnswer(false);
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleFinishQuiz = () => {
    setQuizFinished(true);
  };

  const handleBackToList = () => {
    setSelectedSubject(null);
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setShowCorrectAnswer(false);
    setScore(0);
    setQuizFinished(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles styles={{
        body: {
          backgroundColor: '#8887A0'
        },
      }} />
      <Container
        maxWidth="md"
        style={{
          height: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#B0B6CA',
          padding: '24px',
          borderRadius: '10px',
          boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
        }}
      >
        {!selectedSubject ? (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Typography variant="h4" style={{ marginBottom: '16px', textAlign: 'center' }}>
              Subjects
            </Typography>
            <Grid container spacing={2}>
              {subjects.map((subject, index) => (
                <Grid item xs={12} key={index}>
                  <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    fullWidth
                    onClick={() => handleSubjectSelect(subject)}
                    style={{ borderColor: '#fff' }} // Set border color to white
                  >
                    {subject}
                  </Button>
                </Grid>
              ))}
            </Grid>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Typography variant="h5" style={{ marginBottom: '16px', textAlign: 'center' }}>
              {selectedSubject} Quiz
            </Typography>
            {!quizFinished && (
              <>
                <Typography variant="h6" style={{ marginBottom: '16px', textAlign: 'center' }}>
                  Question {currentIndex + 1}: {questions[selectedSubject][currentIndex].question}
                </Typography>
                <Grid container spacing={2}>
                  {questions[selectedSubject][currentIndex].answers.map((answer, index) => (
                    <Grid item xs={12} key={index}>
                      <Paper
                        variant={
                          selectedAnswer === answer
                            ? 'elevation'
                            : showCorrectAnswer && answer === questions[selectedSubject][currentIndex].correctAnswer
                            ? 'elevation'
                            : 'outlined'
                        }
                        onClick={() => handleAnswerSelect(answer)}
                        style={{
                          padding: '16px',
                          cursor: 'pointer',
                          borderColor: selectedAnswer === answer ? '#3f51b5' : 'inherit',
                          borderRadius: '10px',
                          backgroundColor:
                            showCorrectAnswer && answer === questions[selectedSubject][currentIndex].correctAnswer
                              ? '#4caf50'
                              : showCorrectAnswer && selectedAnswer === answer && answer !== questions[selectedSubject][currentIndex].correctAnswer
                              ? '#f44336'
                              : '#fff',
                        }}
                      >
                        <Typography variant="body1">
                          {answer}
                          {showCorrectAnswer && (
                            <span style={{ marginLeft: '8px', color: answer === questions[selectedSubject][currentIndex].correctAnswer ? '#fff' : '#000' }}>
                              {answer === questions[selectedSubject][currentIndex].correctAnswer ? ' (Correct)' : ' (Incorrect)'}
                            </span>
                          )}
                          {showCorrectAnswer && answer === questions[selectedSubject][currentIndex].correctAnswer && (
                            <Typography variant="body2" style={{ marginTop: '8px', color: '#fff' }}>
                              Explanation: {questions[selectedSubject][currentIndex].answersExplanations[index]}
                            </Typography>
                          )}
                        </Typography>
                      </Paper>
                    </Grid>
                  ))}
                </Grid>
                <div style={{ marginTop: '16px', display: 'flex', justifyContent: 'space-between' }}>
                  {currentIndex > 0 && (
                    <Button variant="contained" color="primary" onClick={handlePreviousQuestion}>
                      Previous
                    </Button>
                  )}
                  {currentIndex < questions[selectedSubject].length - 1 && (
                    <Button variant="contained" color="primary" onClick={handleNextQuestion}>
                      Next
                    </Button>
                  )}
                  {currentIndex === questions[selectedSubject].length - 1 && (
                    <Button variant="contained" color="primary" onClick={handleFinishQuiz}>
                      Finish Quiz
                    </Button>
                  )}
                </div>
              </>
            )}
            {quizFinished && (
              <div style={{ marginTop: '16px' }}>
                <Typography variant="h6">
                  Quiz Finished! Your score: {score}/{questions[selectedSubject].length}
                </Typography>
                <Button variant="contained" color="primary" onClick={handleBackToList} style={{ marginTop: '16px' }}>
                  Back to Subject List
                </Button>
              </div>
            )}
          </div>
        )}
      </Container>
    </ThemeProvider>
  );
}

export default Quiz;
