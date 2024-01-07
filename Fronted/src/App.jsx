import React from 'react'
import { Header } from './pages/Header'
import  Footer  from './pages/Footer'
import {Outlet} from "react-router-dom"
import "./index.css"


function App() {
  return (
    <div className="app bg-yellow-500 h-[100vh]">
      <Header/>
      <Outlet/>
      <Footer/>
    </div>
  )
}

export default App