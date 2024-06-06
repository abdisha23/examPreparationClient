import axios from "axios";
import { base_url, config } from "../../utils/axiosConfig";


const register = async(userData) => {
    const response = await axios.post(`${base_url}user/create`, userData)
    if(response.data){
        return response.data;
    }
}
const login = async(userData) => {
    const response = await axios.post(`${base_url}user/user-login`, userData)
    if(response.data){
        localStorage.setItem("user", JSON.stringify(response.data));
        return response.data;
    }
};
// const getUserWishlist = async() => {
//     const response = await axios.get(`${base_url}user/wishlist`, config);
//     if(response.data){
        
//         return response.data;
//     }

// }
// const addToCart = async(cartData) => {
//     const response = await axios.post(`${base_url}user/cart`, cartData, config);
//     if(response.data){
        
//         return response.data;
//     }
// }
// const removeFromCart = async(cartItemId) => {
//     const response = await axios.delete(`${base_url}user/delete-cart/${cartItemId}`, config);
//     if(response.data){
        
//         return response.data;
//     }
// }
// const getCart = async() => {
//     const response = await axios.get(`${base_url}user/cart`, config);
//     if(response.data){
        
//         return response.data;
//     }

// }
// const createOrder = async(orderDetail) => {
//     const response = await axios.post(`${base_url}user/create-order`, orderDetail, config);
//     if(response.data) {
//         return response.data;
//     }
// }
// const getOrders = async() => {
//     const response = await axios.get(`${base_url}user/get-orders`, config);
//     if(response.data) {
//         console.log(response.data)
//         return response.data;
//     }
// }
// const updateUser = async(data) => {
//     const response = await axios.put(`${base_url}user/update-user`, data, config);
//     if(response.data) {
//         return response.data;
//     }
// }
// const forgotPassword = async(data) => {
//     const response = await axios.post(`${base_url}user/forgot-password`, data);
//     if(response.data){
//         return response.data;
//     }
// }
// const resetPassword = async(data) => {
//     const response = await axios.put(`${base_url}user/reset-password/${data?.token}`, {password: data?.password});
//     if(response.data){
//         return response.data;
//     }
// }
export const userService = {
    register,
    login,
    // getUserWishlist,
    // addToCart,
    // removeFromCart,
    // getCart,
    // createOrder,
    // getOrders,
    // updateUser,
    // forgotPassword,
    // resetPassword
}