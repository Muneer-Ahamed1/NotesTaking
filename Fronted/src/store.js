import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/User/userSlice"
import noteReducer from './features/Dashboard/dashboardSlice'
import likedNotesReducer from "./features/LikedNotes/LikedNotesSlice";
import categoryReducer from "./features/Category/categorySlice";
const Store=configureStore({
    reducer:{
        User:userReducer,
        Notes:noteReducer,
        likedNotes:likedNotesReducer,
        Category:categoryReducer

    }
})

export default Store;