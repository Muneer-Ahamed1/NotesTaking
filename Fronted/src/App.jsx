import React from 'react'
import { Header } from './pages/Header'
import  Footer  from './pages/Footer'
import {Outlet} from "react-router-dom"

function App() {
  return (
    <div className="app bg-slate-800 h-[100vh]">
      <Header/>
      <Outlet/>
      <Footer/>
    </div>
  )
}

export default App