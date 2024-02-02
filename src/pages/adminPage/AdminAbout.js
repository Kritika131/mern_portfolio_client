import React from 'react'
import {Form,Input} from 'antd'
import {useSelector,useDispatch} from "react-redux"
import { Hideloading, Showloading } from '../../redux/portfolioSlice'
import {message} from 'antd'
import axios  from 'axios'

const AdminAbout = () => {

  const dispatch =useDispatch()
  const {portfolioData} = useSelector(state=>state.portfolio)
 
  const onFinish = async(values)=>{
     try{
      const tempSkills = values.skills.split(',');
      values.skills = tempSkills;
      dispatch(Showloading())
      const response = await axios.put(process.env.REACT_APP_BASE_URL+"/portfolio/update-about",{
        ...values,
        _id:portfolioData.about._id
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
      <Form onFinish={onFinish} layout='vertical' initialValues={{
        ...portfolioData.about,
        skills:portfolioData.about.skills.join(" , "),
      }}>
        <Form.Item name="lottieURL" label='Lottie URL/image URL'>
          <Input placeholder='Lottie URL'/>
        </Form.Item>
        
        <Form.Item name="description_1" label='Description-1'>
          <textarea  placeholder='Description-1'/>
        </Form.Item>
        <Form.Item name="description_2" label='Description-2'>
          <textarea  placeholder='Description-2'/>
        </Form.Item>
        <Form.Item name="skills" label='Skills'>
          <textarea  placeholder='Skills'/>
        </Form.Item>
        <div className="flex justify-end w-full">
          <button className="px-10 sm:px-5 sm:py-1 py-2 bg-primary text-white" type='submit'>Save</button>
        </div>
      </Form>
    </div>
  )
}

export default AdminAbout