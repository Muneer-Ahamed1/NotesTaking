import React, { useEffect } from 'react'
import NoteCard from '../../../pages/NoteCard'
import { Trash, Heart } from 'lucide-react'
import { getLikedNotesSlice,deleteLikedNotesByIdSlice} from '../LikedNotesSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useLoaderData } from 'react-router-dom'
import { NavLink,Link } from 'react-router-dom'


export const likedNotesLoader= async ()=> {
 
  return  "Something went wrong";
  
  
    
}
export default function LikedNotes() {
  const dispatch=useDispatch();
  useEffect( ()=>{
    dispatch(getLikedNotesSlice());
  },[])
  const data=useLoaderData();
  const likedNotesData=useSelector((state)=>state.likedNotes.likedNotes);  
  if(likedNotesData && likedNotesData.length==0) {
    return (<div className="w-full h-screen flex justify-center items-center  font-bold text-2xl">
      Empty No Liked Notes
    </div>)
  }
  return (
    <div className="mx-auto flex max-w-3xl flex-col space-y-4 p-6 px-2 sm:p-10 sm:px-2">
      <h2 className="text-3xl font-bold">Your Liked Notes</h2>
      <p className="mt-3 text-sm font-medium text-gray-700">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum eius repellat ipsam, sit
        praesentium incidunt.
      </p>
      <ul className="flex flex-col divide-y divide-gray-200">
        { likedNotesData && likedNotesData.map((notes) => (
          <li key={notes._id} className="flex flex-col py-6 sm:flex-row sm:justify-between">
            <div className="flex w-full space-x-2 sm:space-x-4">
              
              <div className="flex w-full flex-col justify-between pb-4">
                <div className="flex w-full justify-between space-x-2 pb-2">
                  <div className="space-y-1">
                    <Link className="text-lg font-semibold leading-snug sm:pr-8 cursor-pointer">{notes.title}</Link>
                    <p className="text-sm">{notes.category}</p>
                  </div>
                  <div className="text-right">
                  <button type="button" className="flex items-center space-x-2 px-2 py-1 pl-0 hover:text-red-600"
                  onClick={()=>{
                    dispatch(deleteLikedNotesByIdSlice(notes._id))
                  }}
                  >
                    <Trash size={20}  />
                    <span>Remove</span>
                  </button>
                  </div>
                </div>
                <div className="flex divide-x text-sm">
                 
                  
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
      
      
    </div>
  )
}
