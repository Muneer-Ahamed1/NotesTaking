import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import ErrorPage from "./pages/ErrorPage.jsx"
import Home from './pages/Home.jsx'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Store from "./store.js";
import { Provider } from 'react-redux'
import RegisterPage from './pages/RegisterPage.jsx'
import Login from './features/User/component/Login.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <ErrorPage />,
    element:<App/>,
    children: [
      {
        path: "",
        element: <Home />
      },
      {
        path:"/register",
        element:<RegisterPage/>
      },
      {
        path:"/login",
        element:<Login/>
      }
    ]

  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
<Provider store={Store}>
<RouterProvider router={router} />
</Provider>
)
