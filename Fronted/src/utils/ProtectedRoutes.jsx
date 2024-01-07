import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from "react-router-dom";


function ProtectedRoutes({children}) {
  const isLogin=useSelector((state)=>state.User.isLogin);
  console.log(isLogin)
  if(isLogin) {
    return(
    <>
    {children}
    </>
    )

  }
  else{
    return(
    <Navigate to="/login" replace={true} />
    )

  }
  
}

export default ProtectedRoutes