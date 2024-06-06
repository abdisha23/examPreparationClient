import {createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {toast} from "react-toastify";
import { examService } from "./examService";


export const createExam = createAsyncThunk("exam/create", async(examData,thunkAPI) => {
    try{
        return await examService.create(examData);
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
 export const authSlice = createSlice({
    name: "exam",
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(createExam.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(createExam.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.isError = false;
            state.createdExam = action.payload;
            if(state.isSuccess === true){
                toast.success("Exam created successfully!")
            }
       })
        .addCase(createExam.rejected, (state, action) => {
            state.isLoading = false;
            state.isSuccess = false;
            state.isError = true;
            state.message = action.error;
            if(state.isError === true){
                toast.error("Something went wrong!")
            }
        })
    //     .addCase(loginUser.pending, (state) => {
    //         state.isLoading = true;
    //     })
    //     .addCase(loginUser.fulfilled, (state, action) => {
    //         state.isLoading = false;
    //         state.isSuccess = true;
    //         state.isError = false;
    //         state.user = action.payload;
    //         if(state.isSuccess === true){
    //             toast.success("You are logged in successfully!")
    //         }
            
    //     })
    //     .addCase(loginUser.rejected, (state, action) => {
    //         state.isLoading = false;
    //         state.isSuccess = false;
    //         state.isError = true;
    //         state.message = action.error;
    //         if(state.isError === true){
    //             toast.error("Some thing went wrong!")
            }
       });

       export default examSlice.reducer;