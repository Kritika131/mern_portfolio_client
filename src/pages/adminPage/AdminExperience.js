import React, { useState } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { Modal, Form, message, Switch } from 'antd'
import { Hideloading, Showloading, reloadingData } from '../../redux/portfolioSlice'
import api from '../../api/axios'

const AdminExperience = () => {
  const dispatch = useDispatch()
  const { portfolioData } = useSelector(state => state.portfolio)
  const experiences = portfolioData?.experiences || []
  const [showModal, setShowModal] = useState(false)
  const [selectedItemForEdit, setSelectedItemForEdit] = useState(null)
  const [type, setType] = useState('add')
  const [isCurrent, setIsCurrent] = useState(false)

  const onFinish = async (values) => {
    try {
      dispatch(Showloading())
      let response
      const payload = {
        ...values,
        current: isCurrent,
        technologies: values.technologies ? values.technologies.split(',').map(t => t.trim()) : []
      }

      if (selectedItemForEdit) {
        response = await api.put("/portfolio/update-experience", {
          ...payload,
          id: selectedItemForEdit._id,
        })
      } else {
        response = await api.post("/portfolio/add-experience", payload)
      }
      dispatch(Hideloading())
      if (response.data.success) {
        message.success(response.data.msg)
        setShowModal(false)
        setSelectedItemForEdit(null)
        setIsCurrent(false)
        dispatch(reloadingData(true))
      } else {
        message.error(response.data.msg)
      }
    } catch (err) {
      message.error(err.response?.data?.msg || err.message)
      dispatch(Hideloading())
    }
  }

  const onDelete = async (item) => {
    try {
      dispatch(Showloading())
      const response = await api.delete("/portfolio/delete-experience/" + item._id)
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
        <button className="bg-primary px-5 py-2 text-white rounded-lg" onClick={() => {
          setType("add")
          setSelectedItemForEdit(null)
          setIsCurrent(false)
          setShowModal(true)
        }}>Add Experience</button>
      </div>

      <div className="grid grid-cols-2 mt-5 sm:grid-cols-1 gap-5">
        {experiences.map((exp) => (
          <div key={exp._id} className="shadow border border-gray-200 p-5 rounded-lg bg-white">
            <div className="flex justify-between items-start mb-3">
              <div>
                <h1 className='text-primary text-xl font-semibold'>{exp.role}</h1>
                <h2 className='text-gray-600 font-medium'>{exp.company}</h2>
              </div>
              {exp.current && (
                <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full">Current</span>
              )}
            </div>
            <p className='text-gray-500 text-sm mb-2'>{exp.duration}</p>
            {exp.location && <p className='text-gray-500 text-sm mb-2'>{exp.location}</p>}
            <p className='text-gray-600 text-sm mb-3'>{exp.description}</p>
            {exp.technologies && exp.technologies.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {exp.technologies.map((tech, idx) => (
                  <span key={idx} className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded">{tech}</span>
                ))}
              </div>
            )}
            <div className="flex justify-end gap-3 mt-4">
              <button className="bg-red-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-red-600"
                onClick={() => onDelete(exp)}>Delete</button>
              <button className="bg-primary text-white px-4 py-2 rounded-lg text-sm hover:opacity-90"
                onClick={() => {
                  setSelectedItemForEdit(exp)
                  setIsCurrent(exp.current || false)
                  setShowModal(true)
                  setType("edit")
                }}>Edit</button>
            </div>
          </div>
        ))}
      </div>

      {(type === "add" || selectedItemForEdit) && (
        <Modal
          open={showModal}
          title={selectedItemForEdit ? "Edit Experience" : "Add Experience"}
          footer={null}
          onCancel={() => {
            setShowModal(false)
            setSelectedItemForEdit(null)
            setIsCurrent(false)
          }}>
          <Form
            layout='vertical'
            onFinish={onFinish}
            initialValues={{
              ...selectedItemForEdit,
              technologies: selectedItemForEdit?.technologies?.join(', ') || ''
            }}>
            <Form.Item name="company" label="Company" rules={[{ required: true }]}>
              <input placeholder='Company name' className="w-full border rounded-lg p-2" />
            </Form.Item>
            <Form.Item name="role" label="Role/Position" rules={[{ required: true }]}>
              <input placeholder='e.g. Senior Developer' className="w-full border rounded-lg p-2" />
            </Form.Item>
            <Form.Item name="duration" label="Duration" rules={[{ required: true }]}>
              <input placeholder='e.g. Jan 2020 - Present' className="w-full border rounded-lg p-2" />
            </Form.Item>
            <Form.Item name="location" label="Location">
              <input placeholder='e.g. New York, NY' className="w-full border rounded-lg p-2" />
            </Form.Item>
            <Form.Item name="description" label="Description">
              <textarea placeholder='Describe your role and responsibilities' className="w-full border rounded-lg p-2" rows={3} />
            </Form.Item>
            <Form.Item name="technologies" label="Technologies (comma-separated)">
              <input placeholder='React, Node.js, MongoDB' className="w-full border rounded-lg p-2" />
            </Form.Item>
            <Form.Item label="Currently Working Here">
              <Switch checked={isCurrent} onChange={setIsCurrent} />
            </Form.Item>
            <div className="flex justify-end gap-3">
              <button type="button" className='border border-primary text-primary px-5 py-2 rounded-lg' onClick={() => {
                setShowModal(false)
                setSelectedItemForEdit(null)
              }}>Cancel</button>
              <button type="submit" className="bg-primary text-white px-5 py-2 rounded-lg">
                {selectedItemForEdit ? "Update" : "Add"}
              </button>
            </div>
          </Form>
        </Modal>
      )}
    </div>
  )
}

export default AdminExperience
