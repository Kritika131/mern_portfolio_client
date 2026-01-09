import React, { useState } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { Modal, Form, message } from 'antd'
import { Hideloading, Showloading, reloadingData } from '../../redux/portfolioSlice'
import api from '../../api/axios'

const AdminEducation = () => {
  const dispatch = useDispatch()
  const { portfolioData } = useSelector(state => state.portfolio)
  const { educations } = portfolioData
  const [showModal, setShowModal] = useState(false)
  const [selectedItemForEdit, setSelectedItemForEdit] = useState(null)
  const [type, setType] = useState('add')

  const onFinish = async (values) => {
    try {
      dispatch(Showloading())
      let response
      if (selectedItemForEdit) {
        response = await api.put("/portfolio/update-education", {
          ...values,
          _id: selectedItemForEdit._id,
        })
      } else {
        response = await api.post("/portfolio/add-education", values)

      }
      dispatch(Hideloading())
      if(response.data.success){
        message.success(response.data.msg)
        // console.log("if--", response.data.msg);
        setShowModal(false)
        setSelectedItemForEdit(null)
        dispatch(Hideloading())
        dispatch(reloadingData(true))
      }else{
        
        message.error(response.data.msg)
      }
    }catch(err){
      message.error(err.message)
      dispatch(Hideloading())
      console.log(err);
     }
  }
  const onDelete = async (item) => {
    try {
      dispatch(Showloading())
      const response = await api.delete("/portfolio/delete-education/" + item._id)
      dispatch(Hideloading())
      if (response.data.success) {
        message.success(response.data.msg)
        dispatch(reloadingData(true))
      } else {
        message.error(response.data.msg)
      }
    } catch (err) {
      message.error(err.response?.data?.msg || err.message)
      dispatch(Hideloading())
    }
  }
  return (
    <div>
      <div className="flex justify-end">
        <button className="bg-primary px-5 py-2 text-white" onClick={()=>{
          // console.log("clicked");
          setType("add")
          setSelectedItemForEdit(null);
          setShowModal(true);
        }}>Add Education</button>
      </div>
      <div className="grid grid-cols-4 mt-5 justify-center sm:grid-cols-1 gap-5">
        {educations && educations.map((ed)=>(
          <div className="shadow border border-gray-400 p-5 flex-col ">
            <h1 className='text-primary text-xl font-semibold'>{ed.period}</h1>
            <hr/>
            <h1>Course : {ed.title}</h1>
            <h1>Collage : {ed.collage}</h1>
            <h1>Percentage : {ed.percentage}</h1>
            <h1>{ed.description}</h1>
            <div className="flex justify-end gap-4 mt-5">
              <button className="bg-red-500 text-white px-5 py-2 rounded-sm"
              onClick={()=>{
                onDelete(ed);
              }}
              >Delete</button>
              <button className="bg-primary text-white px-5 py-2 rounded-sm"
              onClick={()=>{
                setSelectedItemForEdit(ed);
                setShowModal(true)
                setType("edit")
              }}
              >Edit</button>
            </div>
          </div>
        ))}
      </div>

      
      {
        (type==="add" || selectedItemForEdit) && (
            <Modal visible={showModal} title={selectedItemForEdit ? "Edit Experience" : "Add Experience"} footer={null} onCancel={()=>{
        setShowModal(false);
        setSelectedItemForEdit(null)
      }}>
        {/* <Form layout='vertical' onFinish={onFinish}> */}
        <Form layout='vertical' onFinish={onFinish} initialValues={selectedItemForEdit}>
          <Form.Item name="period" label="Period">
            <input placeholder='Period'/>
          </Form.Item>
          <Form.Item name="title" label="Title">
            <input placeholder='Title'/>
          </Form.Item>
          <Form.Item name="collage" label="Collage">
            <input placeholder='Collage'/>
          </Form.Item>
          <Form.Item name="percentage" label="Percentage">
            <input placeholder='Percentage'/>
          </Form.Item>
          <Form.Item name="description" label="Description">
            <input placeholder='Description'/>
          </Form.Item>
          <div className="flex justify-end">
            <button className='border-primary text-primary px-5 py-2' onClick={()=>{
              setShowModal(false)
              setSelectedItemForEdit(null)
            }}>Cancel</button>
            <button className="bg-primary text-white px-5 py-2">{selectedItemForEdit ? "Update" :"Add"}</button>
          </div>
        </Form>
            </Modal>
        )
      }
  
    </div>
  )
}

export default AdminEducation