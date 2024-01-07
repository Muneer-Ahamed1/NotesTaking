 import { createAsyncThunk, createSlice,current } from "@reduxjs/toolkit";
 import {getAllNotes,editNotesById,addNote,deleteNoteById} from "./dashboardApi";



 export const getAllNoteSlice = createAsyncThunk('notes/getAllNote', async () => {
     try {
         console.log("i am here")
         const response = await getAllNotes();
         return response.data;
     } catch (e) {
         throw e.message;
     }
 });
 export const editNotesByIdSlice=createAsyncThunk('notes/editNotesById', async (data,thunkAPI)=>{
    try{
        const{id}=data;
        delete data.id;
        let res=await editNotesById(id,data);
        return res.data;
    }
    catch(e){
        throw thunkAPI.rejectWithValue(e.message);
    }
 })
export const addNoteSlice=createAsyncThunk("note/addNoteSlice",async (data,thunkAPI)=>{
    try{
        let res=await addNote(data);
        return res.data;
    }
    catch(e){
        throw thunkAPI.rejectWithValue(e.message);
    }
})

export const deleteNoteByIdSlice=createAsyncThunk("note/deleteNoteByIdSlice",async (id,thunkAPI)=>{
    try{
        let res=await deleteNoteById(id);
        return res.data;
    }
    catch(e){
        throw thunkAPI.rejectWithValue(e);
    }
})

 const notes = createSlice({
     name: "notes",
     initialState: {
         loading: false,
         error: {
             err: false,
             message: '',
         },
         Notes:null,

     },
     reducers: {},
     extraReducers: (builder) => {
         builder
             .addCase(getAllNoteSlice.pending, (state) => {
                 state.loading = true;
             })
             .addCase(getAllNoteSlice.fulfilled, (state, { payload }) => {
                 state.loading = false;
                 state.Notes=payload;
                 // Handle the fulfilled case if needed
             })
             .addCase(getAllNoteSlice.rejected, (state, { payload }) => {
                 state.error.message = payload
                 state.error.err = true;
                 state.loading=false;
            })

            .addCase(editNotesByIdSlice.pending,(state)=>{
                state.loading=true;
            })
            .addCase(editNotesByIdSlice.fulfilled,(state,{payload})=>{
                state.Notes=payload;
                state.loading=false;
            })
            .addCase(editNotesByIdSlice.rejected,(state,{payload})=>{
                state.loading=false;
                state.error.err=true;
                state.error.message=payload;

            })
            .addCase(addNoteSlice.pending,(state)=>{
                state.loading=true;
            })
            .addCase(addNoteSlice.fulfilled,(state,{payload})=>{
                alert(payload.message);
                state.loading=false;
            })
            .addCase(addNoteSlice.rejected,(state,{payload})=>{
                state.error.err=true;
                state.error.message=payload;
                state.loading=false;
            })
            .addCase(deleteNoteByIdSlice.fulfilled,(state,{payload})=>{
                const dump=[...state.Notes]

                console.log(dump)
                console.log(payload)
                const index = dump.findIndex((note) => note._id === payload);
                if (index !== -1) dump.splice(index, 1); 
                state.Notes=dump;
                       
            })
            .addCase(deleteNoteByIdSlice.rejected,(state,{payload})=>{
                state.error.err=true;
                state.error.message=payload;
            })
           
     },

});

 export default notes.reducer;
