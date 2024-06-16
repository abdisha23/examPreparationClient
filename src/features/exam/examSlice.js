import {createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {toast} from "react-toastify";
import { examService } from "./examService";


export const createAExam = createAsyncThunk(
    'exam/create',
    async ({ courseId, examData }, thunkAPI) => {
      try {
        return await examService.createExam(courseId, examData);
      } catch (error) {
        // Handle Axios error serialization
        if (!error.response) {
          // Network error
          return thunkAPI.rejectWithValue({
            message: error.message,
            status: 'failed',
          });
        }
        // Axios error with response
        return thunkAPI.rejectWithValue({
          message: error.response.data.message,
          status: error.response.status,
        });
      }
    }
  );
export const getAllExams = createAsyncThunk("exam/all", async(courseId,thunkAPI) => {
    try{
        return await examService.getExams(courseId);
    }catch(error){
        return thunkAPI.rejectWithValue(error)
    }
    
});


const initialState = {
    isLoading: false,
    isSuccess: false,
    isError: false,
    message: ""
}
 export const examSlice = createSlice({
    name: "exams",
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(createAExam.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(createAExam.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.isError = false;
            state.createdExam = action.payload;
            if(state.isSuccess === true){
                toast.success("Exam created successfully!")
            }
       })
        .addCase(createAExam.rejected, (state, action) => {
            state.isLoading = false;
            state.isSuccess = false;
            state.isError = true;
            state.message = action.payload.error;
            if(state.isError === true){
                toast.error("Something went wrong!")
            }
        })
        .addCase(getAllExams.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(getAllExams.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.isError = false;
            state.allExams = action.payload;
        })
        .addCase(getAllExams.rejected, (state, action) => {
            state.isLoading = false;
            state.isSuccess = false;
            state.isError = true;
            state.message = action.error;
            if(state.isError === true){
                toast.error("Some thing went wrong!")
            }
       })
    }
});
       export default examSlice.reducer;