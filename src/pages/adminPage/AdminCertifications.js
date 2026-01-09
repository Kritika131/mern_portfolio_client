import React, { useState } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { Modal, Form, message } from 'antd'
import { Hideloading, Showloading, reloadingData } from '../../redux/portfolioSlice'
import api from '../../api/axios'

const AdminCertifications = () => {
  const dispatch = useDispatch()
  const { portfolioData } = useSelector(state => state.portfolio)
  const certifications = portfolioData?.certifications || []
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
        response = await api.put("/portfolio/update-certification", {
          ...payload,
          id: selectedItemForEdit._id,
        })
      } else {
        response = await api.post("/portfolio/add-certification", payload)
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
      const response = await api.delete("/portfolio/delete-certification/" + item._id)
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
        }}>Add Certification</button>
      </div>

      <div className="grid grid-cols-3 mt-5 sm:grid-cols-1 gap-5">
        {certifications.map((cert) => (
          <div key={cert._id} className="shadow border border-gray-200 rounded-lg bg-white overflow-hidden">
            {cert.image && (
              <div className="h-40 bg-gray-100">
                <img src={cert.image} alt={cert.title} className="w-full h-full object-cover" />
              </div>
            )}
            <div className="p-4">
              <h1 className='text-primary text-lg font-semibold'>{cert.title}</h1>
              <p className='text-gray-600 text-sm'>{cert.issuer}</p>
              <p className='text-gray-500 text-xs mt-1'>{cert.date}</p>
              {cert.credentialUrl && (
                <a href={cert.credentialUrl} target="_blank" rel="noopener noreferrer"
                   className="text-blue-500 text-sm hover:underline mt-2 inline-block">
                  View Credential
                </a>
              )}
              <div className="flex justify-end gap-3 mt-4">
                <button className="bg-red-500 text-white px-3 py-1 rounded-lg text-sm hover:bg-red-600"
                  onClick={() => onDelete(cert)}>Delete</button>
                <button className="bg-primary text-white px-3 py-1 rounded-lg text-sm hover:opacity-90"
                  onClick={() => {
                    setSelectedItemForEdit(cert)
                    setImageUrl(cert.image || '')
                    setShowModal(true)
                    setType("edit")
                  }}>Edit</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {(type === "add" || selectedItemForEdit) && (
        <Modal
          open={showModal}
          title={selectedItemForEdit ? "Edit Certification" : "Add Certification"}
          footer={null}
          onCancel={() => {
            setShowModal(false)
            setSelectedItemForEdit(null)
            setImageUrl('')
          }}>
          <Form layout='vertical' onFinish={onFinish} initialValues={selectedItemForEdit}>
            <Form.Item name="title" label="Certificate Title" rules={[{ required: true }]}>
              <input placeholder='e.g. AWS Solutions Architect' className="w-full border rounded-lg p-2" />
            </Form.Item>
            <Form.Item name="issuer" label="Issuing Organization" rules={[{ required: true }]}>
              <input placeholder='e.g. Amazon Web Services' className="w-full border rounded-lg p-2" />
            </Form.Item>
            <Form.Item name="date" label="Issue Date">
              <input placeholder='e.g. January 2024' className="w-full border rounded-lg p-2" />
            </Form.Item>
            <Form.Item name="credentialUrl" label="Credential URL">
              <input placeholder='https://...' className="w-full border rounded-lg p-2" />
            </Form.Item>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Certificate Image</label>
              <div className="flex items-center gap-4">
                {(imageUrl || selectedItemForEdit?.image) && (
                  <img src={imageUrl || selectedItemForEdit?.image} alt="Preview" className="w-20 h-20 object-cover rounded" />
                )}
                <label className="cursor-pointer bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-lg text-sm">
                  {uploading ? 'Uploading...' : 'Upload Image'}
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

export default AdminCertifications
