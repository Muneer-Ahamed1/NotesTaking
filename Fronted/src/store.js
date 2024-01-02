import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/User/userSlice"

const Store=configureStore({
    reducer:{
        User:userReducer,
    }
})

export default Store;