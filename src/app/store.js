import { configureStore } from '@reduxjs/toolkit';
import authReduce from "../features/user/userSlice";
// import productReducer from "../features/product/productSlice";
// import blogReducer from '../features/blog/blogSlice';
// import contactReducer from '../features/contact/contactSlice';

export const store = configureStore({
  reducer: {
    auth: authReduce,
    // product: productReducer,
    // blog: blogReducer,
    // contact: contactReducer
  },
});

