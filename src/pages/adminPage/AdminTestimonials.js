import React, { useState } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { Modal, Form, message } from 'antd'
import { Hideloading, Showloading, reloadingData } from '../../redux/portfolioSlice'
import api from '../../api/axios'
import { User } from 'lucide-react'

const AdminTestimonials = () => {
  const dispatch = useDispatch()
  const { portfolioData } = useSelector(state => state.portfolio)
  const testimonials = portfolioData?.testimonials || []
  const [showModal, setShowModal] = useState(false)
  const [selectedItemForEdit, setSelectedItemForEdit] = useState(null)
  const [type, setType] = useState('add')
  const [imageUrl, setImageUrl] = useState('')
  const [uploading, setUploading] = useState(false)

  const handleImageUpload = async (e) => {
    const file = e.target.files[0]
    if (!file) return

    const formData = new FormData()
    formData.append('image', file)

    try {
      setUploading(true)
      const response = await api.post('/portfolio/upload/image', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })

      if (response.data.success) {
        setImageUrl(response.data.url)
        message.success('Image uploaded successfully!')
      } else {
        message.error(response.data.msg)
      }
    } catch (err) {
      message.error(err.response?.data?.msg || 'Failed to upload image')
    } finally {
      setUploading(false)
    }
  }

  const onFinish = async (values) => {
    try {
      dispatch(Showloading())
      let response
      const payload = { ...values, image: imageUrl || values.image }

      if (selectedItemForEdit) {
        response = await api.put("/portfolio/update-testimonial", {
          ...payload,
          id: selectedItemForEdit._id,
        })
      } else {
        response = await api.post("/portfolio/add-testimonial", payload)
      }
      dispatch(Hideloading())
      if (response.data.success) {
        message.success(response.data.msg)
        setShowModal(false)
        setSelectedItemForEdit(null)
        setImageUrl('')
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
      const response = await api.delete("/portfolio/delete-testimonial/" + item._id)
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
          setImageUrl('')
          setShowModal(true)
        }}>Add Testimonial</button>
      </div>

      <div className="grid grid-cols-2 mt-5 sm:grid-cols-1 gap-5">
        {testimonials.map((testimonial) => (
          <div key={testimonial._id} className="shadow border border-gray-200 p-5 rounded-lg bg-white">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-14 h-14 rounded-full overflow-hidden bg-gray-200 flex-shrink-0">
                {testimonial.image ? (
                  <img src={testimonial.image} alt={testimonial.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400 text-xl font-bold">
                    {testimonial.name?.charAt(0)}
                  </div>
                )}
              </div>
              <div>
                <h1 className='text-primary text-lg font-semibold'>{testimonial.name}</h1>
                <p className='text-gray-600 text-sm'>{testimonial.role}</p>
                {testimonial.company && <p className='text-gray-500 text-xs'>{testimonial.company}</p>}
              </div>
            </div>
            <p className='text-gray-600 text-sm italic'>"{testimonial.text}"</p>
            <div className="flex justify-end gap-3 mt-4">
              <button className="bg-red-500 text-white px-3 py-1 rounded-lg text-sm hover:bg-red-600"
                onClick={() => onDelete(testimonial)}>Delete</button>
              <button className="bg-primary text-white px-3 py-1 rounded-lg text-sm hover:opacity-90"
                onClick={() => {
                  setSelectedItemForEdit(testimonial)
                  setImageUrl(testimonial.image || '')
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
          title={selectedItemForEdit ? "Edit Testimonial" : "Add Testimonial"}
          footer={null}
          onCancel={() => {
            setShowModal(false)
            setSelectedItemForEdit(null)
            setImageUrl('')
          }}>
          <Form layout='vertical' onFinish={onFinish} initialValues={selectedItemForEdit}>
            <Form.Item name="name" label="Name" rules={[{ required: true }]}>
              <input placeholder='Client/Colleague name' className="w-full border rounded-lg p-2" />
            </Form.Item>
            <Form.Item name="role" label="Role/Title" rules={[{ required: true }]}>
              <input placeholder='e.g. CEO, Project Manager' className="w-full border rounded-lg p-2" />
            </Form.Item>
            <Form.Item name="company" label="Company">
              <input placeholder='Company name' className="w-full border rounded-lg p-2" />
            </Form.Item>
            <Form.Item name="text" label="Testimonial" rules={[{ required: true }]}>
              <textarea placeholder='What they said about you...' className="w-full border rounded-lg p-2" rows={4} />
            </Form.Item>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Photo</label>
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-200">
                  {(imageUrl || selectedItemForEdit?.image) ? (
                    <img src={imageUrl || selectedItemForEdit?.image} alt="Preview" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                      <User className="w-8 h-8" />
                    </div>
                  )}
                </div>
                <label className="cursor-pointer bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-lg text-sm">
                  {uploading ? 'Uploading...' : 'Upload Photo'}
                  <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} disabled={uploading} />
                </label>
              </div>
            </div>
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

export default AdminTestimonials
