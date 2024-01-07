import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getCategory } from "./categoryApi";
export const getCategorySlice = createAsyncThunk("/api/category/getCategory", async (_, thunkApi) => {
    try {
        const res = await getCategory();
        return res.data;
    }
    catch (e) {
        throw thunkApi.rejectWithValue("Something went wrong while fetching data")
    }
})

const category = createSlice({
    name: "category",
    initialState: {
        loading: false,
        error: {
            err: false,
            message: ""
        },
        category: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getCategorySlice.pending, (state) => {
                state.loading = true
            }
            )
            .addCase(getCategorySlice.fulfilled,(state,{payload})=>{
                state.loading=true;
                state.category=payload
            })
            .addCase(getCategorySlice.rejected,(state,{payload})=>{
                state.error.err=true;
                state.error.message=payload || "Server Error"
            })
    }
})


export default category.reducer;
