import React, { useEffect, useState } from 'react'
import {  RouterProvider, createBrowserRouter } from 'react-router-dom'
import Home from './pages/home'
import Loader from './components/Loader'
import axios from "axios"
import {useDispatch,useSelector} from "react-redux"
import { Hideloading, SetPortfolioData, Showloading, reloadingData, } from './redux/portfolioSlice'
import Admin from './pages/adminPage'
import "./App.css"
import Login from './pages/adminPage/Login'
import SignUp from './pages/adminPage/Signup'

const router = createBrowserRouter([
  
  {
    path:"/",
    element:<Home/>
  },
  {
    path:"/admin",
    element:<Admin/>
  },
  {
    path:"/admin-signup",
    element:<SignUp/>
  },
  {
    path:"/admin-login",
    element:<Login/>
  }
])
const App = () => {
  const {loading,portfolioData,reloadData} = useSelector((state)=>state.portfolio)

  const dispatch = useDispatch()

  const getPortfolioData=async()=>{
      try{
        dispatch(Showloading())
        const response =await  axios.get(process.env.REACT_APP_BASE_URL+'/portfolio/get-portfolio-data');
        console.log(response.data) 
        if(response.data){
          dispatch(SetPortfolioData(response.data))
          dispatch(reloadingData(false))
          dispatch(Hideloading())
        }
        
      } catch (err){
         console.log("fetch data error ",err );
         dispatch(Hideloading())

      }
  }
  useEffect(()=>{
    if(!portfolioData){
      getPortfolioData()

    }
  },[portfolioData])

  useEffect(()=>{
     if(reloadData){
      getPortfolioData();
      console.log("portfolioData--",portfolioData);
     }
  },[reloadData])

  return (
    <>
    {loading ? <Loader/> : null }
    <RouterProvider router={router}/>
    </>
    )
}

export default App