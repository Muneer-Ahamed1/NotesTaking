import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { register,login } from "./userApi";

export const registerSlice = createAsyncThunk('user/register', async (data, thunkAPI) => {
    try {
        console.log(data);
        const response = await register(data);
        return response.data;
    } catch (e) {
        throw thunkAPI.rejectWithValue(JSON.parse(e.response.data.message));
    }
});

export const loginSlice=createAsyncThunk("user/login",async (data,thunkAPI)=>{
    try{
        const response=await login(data);
        console.log(response);
        return response.data;
    }
    catch(e) {
        console.log(e.response.data.message);
        throw thunkAPI.rejectWithValue(e.response.data.message);
    }
})

const user = createSlice({
    name: "user",
    initialState: {
        loading: false,
        error: {
            err: false,
            message: '',
        },
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(registerSlice.pending, (state) => {
                state.loading = true;
            })
            .addCase(registerSlice.fulfilled, (state, { payload }) => {
                state.loading = false;
                // Handle the fulfilled case if needed
            })
            .addCase(registerSlice.rejected, (state, { payload }) => {
                state.error.message = payload
                state.error.err = true;
                state.loading=false;
            })
            .addCase(loginSlice.pending,(state)=>{
                state.loading=true;
            })
            .addCase(loginSlice.fulfilled,(state,{payload})=>{
              state.loading=false; 
            })
            .addCase(loginSlice.rejected,(state,{payload})=>{
                state.error.err=true;
                state.error.message=payload;
            })
    },
});

export default user.reducer;
