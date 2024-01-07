import { asyncThunkCreator, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { register,login,logout } from "./userApi";

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
        return response;
    }
    catch(e) {
        console.log(e.response.data.message);
        throw thunkAPI.rejectWithValue(e.response.data.message);
    }
})
export const logoutSlice=createAsyncThunk("user/logout",async ()=>{
    try{
        const response=await logout();
        return response.message;

    }
    catch(e){
        throw thunkAPI.rejectWithValue(e.message);
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
        isLogin:false,
        isLoginInfo:null

    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(registerSlice.pending, (state) => {
                state.loading = true;
            })
            .addCase(registerSlice.fulfilled, (state, { payload }) => {
                state.loading = false;
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
              state.isLogin=true;
              state.isLoginInfo=payload.data;
            })
            .addCase(loginSlice.rejected,(state,{payload})=>{
                state.error.err=true;
                state.error.message=payload;
            })
            .addCase(logoutSlice.fulfilled,(state,{payload})=>{
                state.isLogin=false;
            })
    },
});

export default user.reducer;
