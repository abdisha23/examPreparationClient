import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  List,
  ListItem,
  ListItemText,
  TextField,
  Button,
  ThemeProvider,
  createTheme,
  CssBaseline,
  Paper,
  Box,
  Grid,
  Divider
} from '@mui/material';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const theme = createTheme({
  palette: {
    primary: {
      main: '#4A4A4A',
    },
    secondary: {
      main: '#D7DCE2',
    },
    background: {
      default: '#F5F5F5',
    },
  },
  typography: {
    fontFamily: 'Roboto, sans-serif',
    h4: {
      fontWeight: 'bold',
      marginBottom: '20px',
    },
    h5: {
      fontWeight: 'bold',
      marginBottom: '10px',
    },
    h6: {
      fontWeight: 'bold',
      marginBottom: '10px',
    },
    subtitle1: {
      color: '#2D2D2D',
    },
    subtitle2: {
      color: '#5A5A5A',
    },
    body1: {
      color: '#7A7A7A',
    },
    body2: {
      color: '#9A9A9A',
    },
  },
});

const Forum = () => {
  const [categories, setCategories] = useState([]);
  const [discussions, setDiscussions] = useState([]);

  useEffect(() => {
    const fetchedCategories = ['General', 'Technical', 'Q&A'];
    const fetchedDiscussions = [
      { id: 1, category: 'General', topic: 'Welcome to the Forum', author: 'Admin', responses: 10 },
      { id: 2, category: 'Technical', topic: 'What is electricity?', author: 'UserA', responses: 5 },
    ];
    setCategories(fetchedCategories);
    setDiscussions(fetchedDiscussions);
  }, []);

  const initialValues = {
    postTitle: '',
    postContent: '',
  };

  const validationSchema = Yup.object().shape({
    postTitle: Yup.string().required('Title is required'),
    postContent: Yup.string().required('Content is required'),
  });

  const handlePostSubmit = (values, { resetForm }) => {
    const postWithTimestamp = {
      ...values,
      timestamp: new Date().toISOString(),
    };
    console.log('Posting:', postWithTimestamp);
    resetForm();
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container
        maxWidth="md"
        component={Paper}
        elevation={3}
        style={{
          minHeight: '80vh',
          padding: '40px',
          marginTop: '80px',
          backgroundColor: '#F5F5F5',
        }}
      >
        <Typography variant="h4" style={{ color: '#4A4A4A', marginBottom: '20px' }}>
          Welcome to the Forum
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <Typography variant="h5" style={{ color: '#4A4A4A', marginBottom: '10px' }}>
              Categories
            </Typography>
            <List>
              {categories.map((category, index) => (
                <ListItem button key={index} onClick={() => console.log('Category:', category)}>
                  <ListItemText primary={<Typography variant="subtitle1">{category}</Typography>} />
                </ListItem>
              ))}
            </List>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Typography variant="h5" style={{ color: '#4A4A4A', marginBottom: '10px' }}>
              Discussions
            </Typography>
            {discussions.map((discussion) => (
              <Box key={discussion.id} style={{ marginBottom: '20px' }}>
                <Typography variant="h6">{discussion.topic}</Typography>
                <Typography variant="subtitle2">Category: {discussion.category}</Typography>
                <Typography variant="body1">Author: {discussion.author}</Typography>
                <Typography variant="body2">Responses: {discussion.responses}</Typography>
                <Divider style={{ marginTop: '10px', marginBottom: '10px' }} />
              </Box>
            ))}
          </Grid>
        </Grid>

        <Divider style={{ marginTop: '20px', marginBottom: '20px' }} />

        <Typography variant="h5" style={{ color: '#4A4A4A', marginBottom: '20px' }}>
          Create a Post
        </Typography>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handlePostSubmit}
        >
          {({ values, handleChange, handleBlur, touched, errors }) => (
            <Form>
              <Field
                as={TextField}
                name="postTitle"
                label="Post Title"
                variant="outlined"
                fullWidth
                value={values.postTitle}
                onChange={handleChange}
                onBlur={handleBlur}
                error={!!errors.postTitle && touched.postTitle}
                helperText={<ErrorMessage name="postTitle" />}
                style={{ marginBottom: '20px' }}
              />
              <Field
                as={TextField}
                name="postContent"
                label="Post Content"
                multiline
                rows={4}
                variant="outlined"
                fullWidth
                value={values.postContent}
                onChange={handleChange}
                onBlur={handleBlur}
                error={!!errors.postContent && touched.postContent}
                helperText={<ErrorMessage name="postContent" />}
                style={{ marginBottom: '20px' }}
              />
              <Button type="submit" variant="contained" color="primary" style={{ marginTop: '10px' }}>
                Post
              </Button>
            </Form>
          )}
        </Formik>
      </Container>
    </ThemeProvider>
  );
};

export default Forum;