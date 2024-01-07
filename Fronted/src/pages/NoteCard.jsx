import React,{useState} from 'react'
import {addLikedNotesSlice} from '../features/LikedNotes/LikedNotesSlice';
import { useDispatch } from 'react-redux';
function NoteCard({title,description,user,category,id}) {
    const [isClick, setClick] = useState(false);
    const dispatch=useDispatch();
    console.log(id)

    

  return (
    <div className="card md:h-[40vh] flex flex-col justify-evenly p-4 border-2  rounded-md bg-slate-100">
        <div className="wrap-first flex items-center gap-4 justify-between">
        <h1 className=' text-xl text-slate-800 font-bold'>{title}</h1>
        <p className=' text-gray-600 font-medium text-sm'>{category}</p>
        </div>
        <div className="wrap-second">
            <h2 className=' text-wrap text-base'>{description}</h2>

        </div>
        <div className="liked-btn flex  items-center justify-between">
            <p>{user}</p>
            <p className=' font-bold text-red-700 hover:text-red-400 cursor-pointer'
            onClick={()=>{
                dispatch(addLikedNotesSlice(id));
                
            }}
            >Liked</p>

        </div>

    </div>
  )
}

export default NoteCard