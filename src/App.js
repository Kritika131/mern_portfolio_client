import React from 'react'
import { RouterProvider, createBrowserRouter, Navigate } from 'react-router-dom'
import Home from './pages/home'
import Loader from './components/Loader'
import { useSelector } from "react-redux"
import Admin from './pages/adminPage'
import "./App.css"
import Login from './pages/adminPage/Login'
import SignUp from './pages/adminPage/Signup'
import ForgotPassword from './pages/adminPage/ForgotPassword'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/admin-login" replace />
  },
  {
    path: "/portfolio/:username",
    element: <Home />
  },
  {
    path: "/admin",
    element: <Admin />
  },
  {
    path: "/admin-signup",
    element: <SignUp />
  },
  {
    path: "/admin-login",
    element: <Login />
  },
  {
    path: "/forgot-password",
    element: <ForgotPassword />
  }
])

const App = () => {
  const { loading } = useSelector((state) => state.portfolio)

  return (
    <>
      {loading ? <Loader /> : null}
      <RouterProvider router={router} />
    </>
  )
}

export default App
