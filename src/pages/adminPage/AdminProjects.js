import React, { useState } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { Modal, Form, message } from 'antd'
import { Hideloading, Showloading, reloadingData } from '../../redux/portfolioSlice'
import api from '../../api/axios'

const AdminProjects = () => {
  const dispatch = useDispatch()
  const { portfolioData } = useSelector(state => state.portfolio)
  const { projects } = portfolioData
  const [showModal, setShowModal] = useState(false)
  const [selectedItemForEdit, setSelectedItemForEdit] = useState(null)
  const [type, setType] = useState('add')

  const onFinish = async (values) => {
    try {
      const tempTechnologies = values?.technologies?.split(",") || []
      values.technologies = tempTechnologies
      dispatch(Showloading())
      let response
      if (selectedItemForEdit) {
        response = await api.put("/portfolio/update-project", {
          ...values,
          _id: selectedItemForEdit._id,
        })
      } else {
        response = await api.post("/portfolio/add-project", values)

      }
      dispatch(Hideloading())
      if(response.data.success){
        message.success(response.data.msg)
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
      // console.log(err);
     }
  }
  const onDelete = async (item) => {
    try {
      dispatch(Showloading())
      const response = await api.delete("/portfolio/delete-project/" + item._id)
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
          setType("add")
          setSelectedItemForEdit(null);
          setShowModal(true);
        }}>Add Projects</button>
      </div>
      <div className="grid grid-cols-3 mt-5 justify-center sm:grid-cols-1 gap-5">
        {projects.map((project)=>(
          <div className="shadow border overflow-x-auto border-gray-400 p-5 flex-col gap-5 ">
            <h1 className='text-primary text-xl font-semibold'>{project.title}</h1>
            <hr/>
            <img src={project.image} className='h-60 w-80' alt="" />
            {/* <h1> {project.image}</h1> */}
            <h1>github-link : {project.github_link}</h1>
            <h1>Deployed-link : {project.deployed_link}</h1>
            <h1>Technologie Used : {project.technologies}</h1>
            <h1>Description : {project.description}</h1>
            <div className="flex justify-end gap-4 mt-5">
              <button className="bg-red-500 text-white px-5 py-2 rounded-sm"
              onClick={()=>{
                onDelete(project);
              }}
              >Delete</button>
              <button className="bg-primary text-white px-5 py-2 rounded-sm"
              onClick={()=>{
                setSelectedItemForEdit(project);
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
            <Modal visible={showModal} title={selectedItemForEdit ? "Edit Project" : "Add Project"} footer={null} onCancel={()=>{
        setShowModal(false);
        setSelectedItemForEdit(null)
      }}>
        {/* <Form layout='vertical' onFinish={onFinish}> */}
        <Form layout='vertical' onFinish={onFinish} initialValues={
         { ...selectedItemForEdit,
          technologies:selectedItemForEdit?.technologies?.join(' , ')
        } || {}}>
          <Form.Item name="title" label="Title">
            <input placeholder='Title'/>
          </Form.Item>
          <Form.Item name="image" label="Image_url">
            <input placeholder='Image_url'/>
          </Form.Item>
          <Form.Item name="deployed_link" label="Deployed Link">
            <input placeholder='Deployed Link'/>
          </Form.Item>
          <Form.Item name="github_link" label="Github_link">
            <input placeholder='Github_link'/>
          </Form.Item>
          <Form.Item name="description" label="Description">
            <textarea placeholder ='Description'/>
          </Form.Item>
          <Form.Item name="technologies" label="Technologies">
            <input placeholder='Technologies'/>
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

export default AdminProjects