import {createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {toast} from "react-toastify";
import { userService } from "./userService";


export const registerUser = createAsyncThunk("auth/register", async(userData,thunkAPI) => {
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
        builder.addCase(registerUser.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(registerUser.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.isError = false;
            state.createdUser = action.payload;
            if(state.isSuccess === true){
                toast.success("Registration successful!")
            }
       })
        .addCase(registerUser.rejected, (state, action) => {
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
    //    .addCase(getUserProductWishlist.pending, (state) => {
    //     state.isLoading = true;
    //     })
    //     .addCase(getUserProductWishlist.fulfilled, (state, action) => {
    //         state.isLoading = false;
    //         state.isSuccess = true;
    //         state.isError = false;
    //         state.wishlist = action.payload;
    //     })
    //     .addCase(getUserProductWishlist.rejected, (state, action) => {
    //         state.isLoading = false;
    //         state.isSuccess = false;
    //         state.isError = true;
    //         state.message = action.error;
    //     })
    //     .addCase(addProdToCart.pending, (state) => {
    //         state.isLoading = true;
    //     })
    //     .addCase(addProdToCart.fulfilled, (state, action) => {
    //         state.isLoading = false;
    //         state.isSuccess = true;
    //         state.isError = false;
    //         state.cartProducts = action.payload;
    //         if(state.isSuccess === true){
    //             toast.success("Product added to cart successfully!")
    //         }
    //     })
    //     .addCase(addProdToCart.rejected, (state, action) => {
    //         state.isLoading = false;
    //         state.isSuccess = false;
    //         state.isError = true;
    //         state.message = action.error;
    //     })
    //     .addCase(removeProdFromCart.pending, (state) => {
    //         state.isLoading = true;
    //     })
    //     .addCase(removeProdFromCart.fulfilled, (state, action) => {
    //         state.isLoading = false;
    //         state.isSuccess = true;
    //         state.isError = false;
    //         state.deletedProduct = action.payload;
    //         if(state.isSuccess === true){
    //             toast.success("Product deleted from cart successfully!")
    //         }  
    //     })
    //     .addCase(removeProdFromCart.rejected, (state, action) => {
    //         state.isLoading = false;
    //         state.isSuccess = false;
    //         state.isError = true;
    //         state.message = action.error;
    //     })
    //     .addCase(getUserCart.pending, (state) => {
    //         state.isLoading = true;
    //     })
    //     .addCase(getUserCart.fulfilled, (state, action) => {
    //         state.isLoading = false;
    //         state.isSuccess = true;
    //         state.isError = false;
    //         state.userCart = action.payload;
            
    //     })
    //     .addCase(getUserCart.rejected, (state, action) => {
    //         state.isLoading = false;
    //         state.isSuccess = false;
    //         state.isError = true;
    //         state.message = action.error;
    //     })
    //     .addCase(createUserOrder.pending, (state) => {
    //         state.isLoading = true;
    //     })
    //     .addCase(createUserOrder.fulfilled, (state, action) => {
    //         state.isLoading = false;
    //         state.isSuccess = true;
    //         state.isError = false;
    //         state.orderedProducts = action.payload;    
    //     })
    //     .addCase(createUserOrder.rejected, (state, action) => {
    //         state.isLoading = false;
    //         state.isSuccess = false;
    //         state.isError = true;
    //         state.message = action.error;
    //     })
    //     .addCase(getUserOrders.pending, (state) => {
    //         state.isLoading = true;
    //     })
    //     .addCase(getUserOrders.fulfilled, (state, action) => {
    //         state.isLoading = false;
    //         state.isSuccess = true;
    //         state.isError = false;
    //         state.userOrder = action.payload;    
    //     })
    //     .addCase(getUserOrders.rejected, (state, action) => {
    //         state.isLoading = false;
    //         state.isSuccess = false;
    //         state.isError = true;
    //         state.message = action.error;
    //     })
    //     .addCase(updateUserProfile.pending, (state) => {
    //         state.isLoading = true;
    //     })
    //     .addCase(updateUserProfile.fulfilled, (state, action) => {
    //         state.isLoading = false;
    //         state.isSuccess = true;
    //         state.isError = false;
    //         state.updatedUser = action.payload;   
    //         if(state.isSuccess){
    //             toast.success("User updated successfully!")
    //         } 
    //     })
    //     .addCase(updateUserProfile.rejected, (state, action) => {
    //         state.isLoading = false;
    //         state.isSuccess = false;
    //         state.isError = true;
    //         state.message = action.error;
    //     })
    //     .addCase(forgotUserPassword.pending, (state) => {
    //         state.isLoading = true;
    //     })
    //     .addCase(forgotUserPassword.fulfilled, (state, action) => {
    //         state.isLoading = false;
    //         state.isSuccess = true;
    //         state.isError = false;
    //         state.token = action.payload;   
    //         if(state.isSuccess){
    //             toast.success("Forgot password email sent successfully!")
    //         } 
    //     })
    //     .addCase(forgotUserPassword.rejected, (state, action) => {
    //         state.isLoading = false;
    //         state.isSuccess = false;
    //         state.isError = true;
    //         state.message = action.error;
    //     })
    //     .addCase(resetUserPassword.pending, (state) => {
    //         state.isLoading = true;
    //     })
    //     .addCase(resetUserPassword.fulfilled, (state, action) => {
    //         state.isLoading = false;
    //         state.isSuccess = true;
    //         state.isError = false;
    //         state.password = action.payload;   
    //         if(state.isSuccess){
    //             toast.success("Password updatd successfully!")
    //         } 
    //     })
    //     .addCase(resetUserPassword.rejected, (state, action) => {
    //         state.isLoading = false;
    //         state.isSuccess = false;
    //         state.isError = true;
    //         state.message = action.error;
    //     })
    },
});

export default authSlice.reducer;
