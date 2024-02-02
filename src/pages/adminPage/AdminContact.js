import React from 'react'
import {Form,Input} from 'antd'
import {useSelector,useDispatch} from "react-redux"
import { Hideloading, Showloading } from '../../redux/portfolioSlice'
import {message} from 'antd'
import axios  from 'axios'

const AdminContact = () => {

  const dispatch =useDispatch()
  const {portfolioData} = useSelector(state=>state.portfolio)
 
  const onFinish = async(values)=>{
     try{
      dispatch(Showloading())
      const response = await axios.put(process.env.REACT_APP_BASE_URL+"/portfolio/update-contact",{
        ...values,
        _id:portfolioData.contact._id
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
      <Form onFinish={onFinish} layout='vertical' initialValues={portfolioData.contact}>
        {/* <Form.Item name="welcomeText" label='Welcome Text'>
          <input placeholder='Intro'/>
        </Form.Item> */}
        <Form.Item name="name" label='Name'>
          <input placeholder='Name'/>
        </Form.Item>
        <Form.Item name="email" label='Email'>
          <input placeholder='Email'/>
        </Form.Item>
        <Form.Item name="gender" label='Gender'>
          <textarea   placeholder='Gender'/>
        </Form.Item>
        <Form.Item name="age" label='Age'>
          <textarea   placeholder='Age'/>
        </Form.Item>
        <Form.Item name="mobile" label='Mobile'>
          <textarea   placeholder='Mobile'/>
        </Form.Item>
        <Form.Item name="address" label='Address'>
          <textarea   placeholder='Address'/>
        </Form.Item>
        <div className="flex justify-end w-full">
          <button className="px-10 sm:px-5 sm:py-1 py-2 bg-primary text-white" type='submit'>Save</button>
        </div>
      </Form>
    </div>
  )
}

export default AdminContact