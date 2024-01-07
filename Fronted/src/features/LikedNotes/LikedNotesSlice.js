import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addLikedNotes,deleteLikedNotesById,getAllLikedNotes } from "./LikedNotesApi";

export const addLikedNotesSlice=createAsyncThunk("/api/liked/addLiked",async (id,thunkApi)=>{
    try{
    const response = await addLikedNotes({id:id});
    return response.data;
    }
    catch(e){
        return e.message;
    }
})
export const deleteLikedNotesByIdSlice=createAsyncThunk("/api/liked/deleteLikedNotesById", async (id,thunkApi)=>{
    try{
        console.log(id);
        const response=await deleteLikedNotesById(id);
        return response.data;
    }
    
    catch(e){
        throw thunkApi.rejectWithValue(e.message);
    }
})

export const getLikedNotesSlice=createAsyncThunk("/api/liked/getAllLikedNotes",async (_,thunkApi)=>{
    try{
        const response=await getAllLikedNotes();
        return response.data;

    }
    catch(e){
        throw thunkApi.rejectWithValue(e.message);

    }
})

const likedNotes=createSlice({
    name:"likedNotes",
    initialState:{
        loading:false,
        likedNotes:null,
        error:{
            err:false,
            message:""
        }
    },
    reducers:{},
    extraReducers:(builder) => {
        builder
        .addCase(addLikedNotesSlice.pending,(state)=>{
            state.loading=true;
        })
        .addCase(addLikedNotesSlice.fulfilled,(state,{payload})=>{
            state.loading=false;
        })
        .addCase(addLikedNotesSlice.rejected,(state,{payload})=>{
            state.error.err=true;
            state.error.message=payload
        })
        .addCase(deleteLikedNotesByIdSlice.fulfilled,(state,{payload})=>{
            state.loading=false;
             console.log(payload)
            let newArr=[...state.likedNotes];
            
            const index = newArr.findIndex((note) => note._id === payload);
            if (index !== -1) newArr.splice(index, 1);
            state.likedNotes=newArr;

        })
        .addCase(deleteLikedNotesByIdSlice.rejected,(state,{payload})=>{
            state.error.err=true;
            state.error.message=payload;
        })
        .addCase(getLikedNotesSlice.pending,(state)=>{
            state.loading=true;
        })
        .addCase(getLikedNotesSlice.fulfilled,(state,{payload})=>{
            state.loading=false;
            state.likedNotes=payload;
        })
        .addCase(getLikedNotesSlice.rejected,(state,{payload})=>{
            state.loading=false;
            state.error.err=true;
            state.error.message=payload;
        })
        
    }
})

export default likedNotes.reducer;