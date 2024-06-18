import {createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {toast} from "react-toastify";
import { userService } from "./userService";


export const signupStudent = createAsyncThunk("student/signup", async(userData,thunkAPI) => {
    try{
        return await userService.signup(userData);
    }catch(error){
        return thunkAPI.rejectWithValue(error)
    }
    
});
export const registerSME = createAsyncThunk("sme/register", async(userData,thunkAPI) => {
    try{
        return await userService.register(userData);
    }catch(error){
        return thunkAPI.rejectWithValue(error)
    }
    
});
export const loginUser = createAsyncThunk("auth/login", async(userData,thunkAPI) => {
    try{
        return await userService.login(userData);
    }catch(error){
        return thunkAPI.rejectWithValue(error)
    }
    
// });
// export const getUserProductWishlist = createAsyncThunk(
//     "user/wishlist", async(thunkAPI) => {
//         try{
//             return await userService.getUserWishlist();
//         }catch(error){
//             thunkAPI.rejectWithValue(error);
//         }
//     });
// export const addProdToCart = createAsyncThunk(
// "user/add-cart", async(cartData, thunkAPI) => {
//     try{
//         return await userService.addToCart(cartData);
//     }catch(error){
//         thunkAPI.rejectWithValue(error);
//     }
// });
// export const removeProdFromCart = createAsyncThunk(
//     "user/delete-cart", async(id,  thunkAPI) => {
//         try{
//             return await userService.removeFromCart(id);
//         }catch(error){
//             thunkAPI.rejectWithValue(error);
//         }
// });
// export const getUserCart = createAsyncThunk(
//     "user/get-cart", async(thunkAPI) => {
//         try{
//             return await userService.getCart();
//         }catch(error){
//             thunkAPI.rejectWithValue(error);
//         }
//     });
// export const createUserOrder = createAsyncThunk(
//     "user/create-order", async(orderDetail, thunkAPI) => {
//         try{
//             return await userService.createOrder(orderDetail);
//         }catch(error){
//             thunkAPI.rejectWithValue(error);
//         }
//     });
// export const getUserOrders = createAsyncThunk(
//     "user/get-orders", async(thunkAPI) => {
//         try{
//             return await userService.getOrders();
//         }catch(error){
//             thunkAPI.rejectWithValue(error);
//         }
//     });
// export const updateUserProfile = createAsyncThunk(
//     "user/update-user-profile", async(data,thunkAPI) => {
//         try{
//             return await userService.updateUser(data);
//         }catch(error){
//             thunkAPI.rejectWithValue(error);
//         }
//     });
// export const forgotUserPassword = createAsyncThunk(
//     "user/forgot-user-password", async(data,thunkAPI) => {
//         try{
//             return await userService.forgotPassword(data);
//         }catch(error){
//             thunkAPI.rejectWithValue(error);
//         }
//     });
// export const resetUserPassword = createAsyncThunk(
//     "user/reset-user-password", async(data,thunkAPI) => {
//         try{
//             return await userService.resetPassword(data);
//         }catch(error){
//             thunkAPI.rejectWithValue(error);
//         }
    });
const getUserFromLocalStorage = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null;
const initialState = {
    user: getUserFromLocalStorage,
    isLoading: false,
    isSuccess: false,
    isError: false,
    message: ""
}
 export const authSlice = createSlice({
    name: "auth",
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(signupStudent.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(signupStudent.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.isError = false;
            state.createdUser = action.payload;
            if(state.isSuccess === true){
                toast.success("Registration successful!")
            }
       })
        .addCase(signupStudent.rejected, (state, action) => {
            state.isLoading = false;
            state.isSuccess = false;
            state.isError = true;
            state.message = action.error;
            if(state.isError === true){
                toast.error("Something went wrong!")
            }
        })
        .addCase(registerSME.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(registerSME.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.isError = false;
            state.createdUser = action.payload;
            if(state.isSuccess === true){
                toast.success("Registration successful!")
            }
       })
        .addCase(registerSME.rejected, (state, action) => {
            state.isLoading = false;
            state.isSuccess = false;
            state.isError = true;
            state.message = action.error;
            if(state.isError === true){
                toast.error("Something went wrong!")
            }
        })
        .addCase(loginUser.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(loginUser.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.isError = false;
            state.user = action.payload;
            if(state.isSuccess === true){
                toast.success("You are logged in successfully!")
                
            }
            
        })
        .addCase(loginUser.rejected, (state, action) => {
            state.isLoading = false;
            state.isSuccess = false;
            state.isError = true;
            state.message = action.error;
            if(state.isError === true){
                toast.error("Some thing went wrong!")
            }
       })
    },
});

export default authSlice.reducer;
