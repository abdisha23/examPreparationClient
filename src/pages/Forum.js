import React, { useState, useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
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
import { Formik, Form, Field, ErrorMessage, useFormik } from 'formik';
import * as Yup from 'yup';
import {createForumPost, getForumPost} from "../features/forum/forumSlice";
import { getAllCourses } from '../features/course/courseSlice';

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
const forumSchema = Yup.object().shape({
  title: Yup.string().required('Title is required'),
  post: Yup.string().required('Content is required'),
});
const Forum = () => {
  const dispatch = useDispatch();
  const [categories, setCategories] = useState([]);
  const [discussions, setDiscussions] = useState([]);

  useEffect(() => {
    dispatch(getForumPost())
    dispatch(getAllCourses());
    const fetchedCategories = ['General', 'Technical', 'Q&A'];
    const fetchedDiscussions = [
      { id: 1, category: 'General', topic: 'Welcome to the Forum', author: 'Admin', responses: 10 },
      { id: 2, category: 'Technical', topic: {}, author: 'UserA', responses: 5 },
    ];
    setCategories(fetchedCategories);
    setDiscussions(fetchedDiscussions);
  }, []);

  const currentUser = JSON.parse(localStorage.getItem('user'));

  const formik = useFormik({
    initialValues: {
        subject: 'Biology',
        title: '',
        post: '',
        postedBy: currentUser._id,
      },
      validationSchema: forumSchema,
      onSubmit: ((values) => {
        dispatch(createForumPost(values));
        }),
    });


  // const handlePostSubmit = (values, { resetForm }) => {
  //   dispatch((values));
  //   // resetForm();
  // };
const forumState = useSelector((state) => state?.forum?.allForumPosts);
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
          {/* <Grid item xs={12} sm={6}>
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
          </Grid> */}

          <Grid item xs={12} sm={6}>
            <Typography variant="h5" style={{ color: '#4A4A4A', marginBottom: '10px' }}>
              Discussions
            </Typography>
            {forumState?.map((forum, index) => (
              <Box key={index} style={{ marginBottom: '20px' }}>
                <Typography variant="h6">{forum.title}</Typography>
                <Typography variant="subtitle2">Question: {forum.post}</Typography>
                <Typography variant="body1">Posted by: {forum.postedBy}</Typography>
                {/* <Typography variant="body2">Responses: {forum.postReplies.map((reply, index) => {
                  reply.title
                })}</Typography> */}
                <Divider style={{ marginTop: '10px', marginBottom: '10px' }} />
              </Box>
            ))}
          </Grid>
        </Grid>

        <Divider style={{ marginTop: '20px', marginBottom: '20px' }} />

        <Typography variant="h5" style={{ color: '#4A4A4A', marginBottom: '20px' }}>
          Create a Post
        </Typography>
            <form onSubmit={formik.handleSubmit}>
              <TextField
                name="title"
                label="Post Title"
                variant="outlined"
                fullWidth
                value={formik.values.title}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.title && Boolean(formik.errors.title)}
                helperText={formik.touched.title && formik.errors.title}
                style={{ marginBottom: '20px' }}
              />
              <TextField
                name="post"
                label="Post Content"
                multiline
                rows={4}
                variant="outlined"
                fullWidth
                value={formik.values.post}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.post && Boolean(formik.errors.post)}
                helperText={formik.touched.post && formik.errors.post}
                style={{ marginBottom: '20px' }}
              />
              <Button type="submit" variant="contained" color="primary" style={{ marginTop: '10px' }}>
                Post
              </Button>
            </form>
      </Container>
    </ThemeProvider>
  );
};

export default Forum;