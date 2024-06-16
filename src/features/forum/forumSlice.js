import {createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {toast} from "react-toastify";
import { forumService } from "./forumService";


export const createForumPost = createAsyncThunk("forum/create", async(forumData,thunkAPI) => {
    try{
        return await forumService.createForum(forumData);
    }catch(error){
        return thunkAPI.rejectWithValue(error)
    }
    
});
export const getForumPost = createAsyncThunk("forum/get", async(thunkAPI) => {
    try{
        return await forumService.getForum();
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
 export const forumSlice = createSlice({
    name: "forum",
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(createForumPost.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(createForumPost.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.isError = false;
            state.createdForum = action.payload;
            if(state.isSuccess === true){
                toast.success("Forum posted successfully!")
            }
       })
        .addCase(createForumPost.rejected, (state, action) => {
            state.isLoading = false;
            state.isSuccess = false;
            state.isError = true;
            state.message = action.error;
            if(state.isError === true){
                toast.error("Something went wrong!")
            }
        })
        .addCase(getForumPost.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(getForumPost.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.isError = false;
            state.allForumPosts = action.payload;
            
        })
        .addCase(getForumPost.rejected, (state, action) => {
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

export default forumSlice.reducer;
