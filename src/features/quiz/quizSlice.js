import {createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {toast} from "react-toastify";
import { quizService } from "./quizService";


export const createAQuiz = createAsyncThunk(
    'quiz/create',
    async ({ courseId, quizData }, thunkAPI) => {
      try {
        return await quizService.createQuiz(courseId, quizData);
      } catch (error) {
        if (!error.response) {
          return thunkAPI.rejectWithValue({
            message: error.message,
            status: 'failed',
          });
        }
        return thunkAPI.rejectWithValue({
          message: error.response.data.message,
          status: error.response.status,
        });
      }
    }
  );
export const getAllQuizzes = createAsyncThunk("quiz/all", async(courseId,thunkAPI) => {
    try{
        return await quizService.getQuizzes(courseId);
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
 export const quizSlice = createSlice({
    name: "quizzes",
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(createAQuiz.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(createAQuiz.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.isError = false;
            state.createdQuiz = action.payload;
            if(state.isSuccess === true){
                toast.success("Quiz created successfully!")
            }
       })
        .addCase(createAQuiz.rejected, (state, action) => {
            state.isLoading = false;
            state.isSuccess = false;
            state.isError = true;
            state.message = action.payload.error;
            if(state.isError === true){
                toast.error("Something went wrong!")
            }
        })
        .addCase(getAllQuizzes.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(getAllQuizzes.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.isError = false;
            state.allQuizzes = action.payload;
        })
        .addCase(getAllQuizzes.rejected, (state, action) => {
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
       export default quizSlice.reducer;