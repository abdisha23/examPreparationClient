
import React from 'react';
import { useDispatch } from 'react-redux';
import { createACourseMaterial } from '../features/courseMaterial/courseMaterialSlice';
import {
  Button,
  Container,
  Grid,
  TextField,
  Typography,
  createTheme,
  ThemeProvider,
  Paper,
  CssBaseline
} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { styled } from '@mui/system';
import axios from 'axios';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#f50057',
    },
    background: {
      default: '#D6C5C5',
      paper: '#BDBDB6',
    },
    text: {
      primary: '#000',
      secondary: '#EEE5E5',
    },
    action: {
      hover: '#f5f5f5',
    },
  },
  shape: {
    borderRadius: 8,
  },
  spacing: 8,
  typography: {
    h5: {
      fontSize: '1.5rem',
      fontWeight: 500,
    },
    subtitle1: {
      fontSize: '1rem',
      color: '#F5E8E8',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 20,
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          marginBottom: 8,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          padding: 32,
          marginTop: 32,
        },
      },
    },
  },
});

const UploadArea = styled('div')(({ theme }) => ({
  marginTop: theme.spacing(2),
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  border: `2px dashed ${theme.palette.primary.main}`,
  borderRadius: theme.shape.borderRadius,
  padding: theme.spacing(4),
  backgroundColor: theme.palette.background.paper,
  color: theme.palette.text.secondary,
  cursor: 'pointer',
  transition: 'background-color 0.3s ease-in-out, border-color 0.3s ease-in-out',
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
    borderColor: theme.palette.primary.dark,
  },
}));

const MaterialUpload = () => {
  const dispatch = useDispatch();
  const initialValues = {
    title: '',
    description: '',
    file: null,
  };

  const validationSchema = Yup.object().shape({
    title: Yup.string().required('Required'),
    description: Yup.string().required('Required'),
    file: Yup.mixed().required('A file is required'),
  });

  const handleSubmit = async (values, { resetForm }) => {
    try {
      // Dispatch action to create course material
      const { title, description, file } = values;
      const formData = new FormData();
      formData.append('file', file);
      formData.append('title', title);
      formData.append('description', description);

      const actionResult = await dispatch(createACourseMaterial({ courseId: '123', fileToUpload: formData }));

      // Handle success or redirect
      if (actionResult.payload) {
        console.log('Material uploaded:', actionResult.payload);
        resetForm();
      } else {
        console.error('Error uploading material:', actionResult.error);
        // Handle error message display or other actions
      }
    } catch (error) {
      console.error('Error uploading material:', error);
      // Handle error message display or other actions
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: handleSubmit,
  });

return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container component="main" maxWidth="sm">
        <Paper elevation={3}>
          <Typography variant="h5" gutterBottom>
            Upload Course Material
          </Typography>
          <form onSubmit={formik.handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  label="Title"
                  fullWidth
                  name="title"
                  value={formik.values.title}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.title && Boolean(formik.errors.title)}
                  helperText={formik.touched.title && formik.errors.title}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  label="Description"
                  fullWidth
                  multiline
                  rows={4}
                  name="description"
                  value={formik.values.description}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.description && Boolean(formik.errors.description)}
                  helperText={formik.touched.description && formik.errors.description}
                />
              </Grid>
              <Grid item xs={12}>
                <UploadArea>
                  <input
                    type="file"
                    id="file-input"
                    accept=".pdf,.doc,.docx"
                    onChange={(event) => {
                      formik.setFieldValue('file', event.currentTarget.files[0]);
                    }}
                    style={{ display: 'none' }}
                  />
                  <label htmlFor="file-input">
                    <CloudUploadIcon fontSize="large" />
                    <Typography variant="subtitle1">Click or Drag & Drop to Upload</Typography>
                    {formik.values.file && <Typography variant="body2">{formik.values.file.name}</Typography>}
                  </label>
                </UploadArea>
                {formik.touched.file && formik.errors.file && (
                  <Typography variant="body2" color="error">
                    {formik.errors.file}
                  </Typography>
                )}
              </Grid>
              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  startIcon={<CloudUploadIcon />}
                  fullWidth
                >
                  Upload Material
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Container>
    </ThemeProvider>
  );
};

export default MaterialUpload;