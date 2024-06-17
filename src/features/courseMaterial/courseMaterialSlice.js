import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from "react-toastify";
import { courseMaterialService } from './courseMaterialService';

export const getAllCourseMaterials = createAsyncThunk(
  'allCourseMaterials/get',
  async (courseId, thunkAPI) => {
    try {
      return await courseMaterialService.getCourseMaterials(courseId);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.error);
    }
  }
);

export const createACourseMaterial = createAsyncThunk(
  'courseMaterial/create',
  async ({ courseId, fileToUpload }, thunkAPI) => {
    try {
      return await courseMaterialService.createCourseMaterial(courseId, fileToUpload);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.error);
    }
  }
);

const initialState = {
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
  courseMaterial: null,
  createdMaterial: null,
};

const courseMaterialSlice = createSlice({
  name: 'courseMaterial',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllCourseMaterials.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllCourseMaterials.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.courseMaterial = action.payload;
      })
      .addCase(getAllCourseMaterials.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error.message; // Update to action.error.message to get error message
        toast.error("Failed to fetch course materials."); // Toast notification for error
      })
      .addCase(createACourseMaterial.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createACourseMaterial.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.createdMaterial = action.payload;
      })
      .addCase(createACourseMaterial.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error.message; // Update to action.error.message to get error message
        toast.error("Failed to create course material."); // Toast notification for error
      });
  },
});

export default courseMaterialSlice.reducer;
