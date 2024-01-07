import React, { useEffect } from 'react'
import { useDispatch,useSelector } from 'react-redux'
import { getAllNoteSlice } from '../dashboardSlice'
import {getCategorySlice} from "../../Category/categorySlice"
import NoteCard from '../../../pages/NoteCard';

function DashBoard() {
    const dispatch = useDispatch();
    useEffect(()=>{
        console.log("I am here")
        dispatch(getAllNoteSlice());
        dispatch(getCategorySlice());
    },[])

    const notes=useSelector((state)=>state.Notes.Notes)
    console.log(notes)
  return (
    <div className="dashboard bg-yellow-500 grid grid-cols-3 gap-2 m-2">
        {
            notes && notes.map((vl)=>{
              const{title,description,category,_id,user}=vl
                return(
                <NoteCard title={title}
                key={_id}
                id={_id}
                description={description}
                category={category}
                user={ "user"}
                />
               )
            })
        }

    </div>
  )
}

export default DashBoard