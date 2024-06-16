import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {toast} from "react-toastify";
import {courseMaterialService} from './courseMaterialService';


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
const initialState = {
    isLoading: false,
    isSuccess: false,
    isError: false,
    message: ""
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
        state.message = action.error;
        if(state.isError === true){
            toast.error("Something went wrong!")
        }
      });
  },
});

export default courseMaterialSlice.reducer;




