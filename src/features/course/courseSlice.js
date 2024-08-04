import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { courseService } from "./courseService";

export const addACourse = createAsyncThunk(
  "course/add",
  async (title, thunkAPI) => {
    try {
      return await courseService.addCourse(title);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const getAllCourses = createAsyncThunk(
  "courses/all",
  async (thunkAPI) => {
    try {
      return await courseService.getCourses();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const initialState = {
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
};
export const courseSlice = createSlice({
  name: "course",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllCourses.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllCourses.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.course = action.payload;
      })
      .addCase(getAllCourses.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
        if (state.isError === true) {
          toast.error("Something went wrong!");
        }
      })
      .addCase(addACourse.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addACourse.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.createdCourse = action.payload;
        if (state.isError === true) {
          toast.success("Course added successfully!");
        }
      })
      .addCase(addACourse.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
        if (state.isError === true) {
          toast.error("Something went wrong!");
        }
      });
  },
});

export default courseSlice.reducer;
