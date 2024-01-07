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
import DashBoard from './features/Dashboard/component/DashBoard.jsx'
import LikedNotesPage from "./pages/LikedNotesPage.jsx"
import { likedNotesLoader } from "./features/LikedNotes/component/LikedNotes.jsx"
import ProtectedRoutes from "./utils/ProtectedRoutes.jsx"
import Profile from './features/Profile/components/Profile.jsx'
import ProfileTemplate from "./features/Profile/components/ProfileTemplate.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <ErrorPage />,
    element: <App />,
    children: [
      {
        path: "",
        element: <Home />
      },
      {
        path: "/register",
        element: <RegisterPage />
      },
      {
        path: "/login",
        element: <Login />
      },
      {
        path: "/dashboard",

        element: (
          <ProtectedRoutes>
            <DashBoard />
          </ProtectedRoutes>
        )
      },
      {
        path: "/likedNotes",
        loader: (likedNotesLoader),
        element: (
          <ProtectedRoutes>
            <LikedNotesPage />
          </ProtectedRoutes>
        )
      },
      {
        path: "/profile",
        element: (
          <ProtectedRoutes>
            <Profile />
          </ProtectedRoutes>
        )
      },
      {
        path: "/NoteUpdate/:id",
        element: (
          <ProtectedRoutes>
            <ProfileTemplate />
          </ProtectedRoutes>
        )
      },
      {
        path: "/addNote",
        element: (
          <ProtectedRoutes>
            <ProfileTemplate />
          </ProtectedRoutes>
        )
      }

    ]

  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={Store}>
    <RouterProvider router={router} />
  </Provider>
)
