import React from 'react'
import {Form,Input} from 'antd'
import {useSelector,useDispatch} from "react-redux"
import { Hideloading, Showloading } from '../../redux/portfolioSlice'
import {message} from 'antd'
import { useState } from 'react'
import axios  from 'axios'

const AdminIntro = () => {

  const dispatch =useDispatch()
  const {portfolioData} = useSelector(state=>state.portfolio)
 
  const onFinish = async(values)=>{
     try{
      
      dispatch(Showloading())
      let response = await axios.put(process.env.REACT_APP_BASE_URL+"/portfolio/update-intro",{
          ...values,
          _id:portfolioData.intro._id
        } )

      
      dispatch(Hideloading())
      if(response.data.success){
        message.success(response.data.msg)
      }else{
        
        message.error(response.data.msg)
      }
    }catch(err){
      message.error(err.message)
      dispatch(Hideloading())
      // console.log(err);
     }
  }
  

  return (
    <div>
      {/* <Form onFinish={onFinish} layout='vertical' > */}
      <Form onFinish={onFinish} layout='vertical' initialValues={portfolioData.intro }>
        <Form.Item name="welcomeText" label='Welcome Text'>
          <input placeholder='Intro'/>
        </Form.Item>
        <Form.Item name="name" label='Name'>
          <input placeholder='Name'/>
        </Form.Item>
        <Form.Item name="caption" label='Caption'>
          <input placeholder='Caption'/>
        </Form.Item>
        <Form.Item name="description" label='Description'>
          <textarea   placeholder='Description'/>
        </Form.Item>
        <div className="flex justify-end w-full">
          <button className="px-10 sm:px-5 sm:py-1 py-2 bg-primary text-white" type='submit'>Save</button>
        </div>
      </Form>
    </div>
  )
}

export default AdminIntro