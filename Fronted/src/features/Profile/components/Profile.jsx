import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {getAllNoteSlice,deleteNoteByIdSlice} from "../../Dashboard/dashboardSlice"
import { Link } from 'react-router-dom';

function Profile() {
    const dispatch=useDispatch();
    useEffect(()=>{
        dispatch(getAllNoteSlice());
    },[])
    
    const user=useSelector((state)=>state.User.isLoginInfo);
    const getNotes=useSelector((state)=>state.Notes.Notes)
    
    const deleteNoteById=(id)=>{
      console.log(id)
      dispatch(deleteNoteByIdSlice(id));

    }
    
    return (
     <div className='profile-wrapper h-[80vh] flex flex-col gap-6 overflow-auto '
     >
      <div className="wrapper-addNote p-4 ">
      <Link className=' px-4 py-2 bg-slate-900 rounded-md hover:bg-slate-700 text-white  text-wrap text-center font-semibold'
      to={"/addNote"}
      >Add A Note</Link>

      </div>
        <div className="profile">
            <div className="userName flex">
                <h1>UserName:</h1>
                <h1>{user && user.userName}</h1>
            </div>
            <div className="email flex">
                <h1>Email:</h1>
                <h1>{user && user.Email}</h1>
            </div>
        </div>
        <hr/>
        <div className="dashboard">
        <table class="table-fixed">
  <thead>
    <tr>
      <th>Name</th>
      <th>Category</th>
      <th>Delete</th>
      <th>Update</th>
    </tr>
  </thead>
  <tbody>
  {getNotes && getNotes.map((note)=>{
    const{_id,title,category}=note
    return(
        <tr key={_id}>
        <td>{title}</td>
        <td>{category}</td>
        <td className=' px-3 py-2 bg-red-700 hover:bg-red-500 text-white rounded-md' onClick={()=>deleteNoteById(_id)}>delete</td>
        <Link className='  px-3 py-2 bg-green-700 hover:bg-green-500 text-white rounded-md' to={`/NoteUpdate/${_id}`}>update</Link>
  
      </tr>

    )
  })}

    
   
    
  </tbody>
</table>

        </div>
    </div>
  )
}

export default Profile



