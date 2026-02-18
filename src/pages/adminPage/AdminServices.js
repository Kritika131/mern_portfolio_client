import React, { useState } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { Modal, Form, message } from 'antd'
import { Hideloading, Showloading, reloadingData } from '../../redux/portfolioSlice'
import api from '../../api/axios'
import { Check } from 'lucide-react'

const AdminServices = () => {
  const dispatch = useDispatch()
  const { portfolioData } = useSelector(state => state.portfolio)
  const services = portfolioData?.services || []
  const [showModal, setShowModal] = useState(false)
  const [selectedItemForEdit, setSelectedItemForEdit] = useState(null)
  const [type, setType] = useState('add')

  const onFinish = async (values) => {
    try {
      dispatch(Showloading())
      let response
      const payload = {
        ...values,
        features: values.features ? values.features.split(',').map(f => f.trim()) : []
      }

      if (selectedItemForEdit) {
        response = await api.put("/portfolio/update-service", {
          ...payload,
          id: selectedItemForEdit._id,
        })
      } else {
        response = await api.post("/portfolio/add-service", payload)
      }
      dispatch(Hideloading())
      if (response.data.success) {
        message.success(response.data.msg)
        setShowModal(false)
        setSelectedItemForEdit(null)
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
      const response = await api.delete("/portfolio/delete-service/" + item._id)
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

  const iconOptions = [
    { value: 'code', label: 'Code', icon: '{ }' },
    { value: 'design', label: 'Design', icon: '<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>' },
    { value: 'mobile', label: 'Mobile', icon: 'mobile' },
    { value: 'database', label: 'Database', icon: 'db' },
    { value: 'cloud', label: 'Cloud', icon: 'cloud' },
    { value: 'api', label: 'API', icon: 'api' },
  ]

  return (
    <div>
      <div className="flex justify-end">
        <button className="bg-primary px-5 py-2 text-white rounded-lg" onClick={() => {
          setType("add")
          setSelectedItemForEdit(null)
          setShowModal(true)
        }}>Add Service</button>
      </div>

      <div className="grid grid-cols-3 mt-5 sm:grid-cols-1 gap-5">
        {services.map((service) => (
          <div key={service._id} className="shadow border border-gray-200 p-6 rounded-lg bg-white">
            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-thirdry to-secondary flex items-center justify-center text-white mb-4">
              <span className="text-xl">{service.icon === 'code' ? '{ }' : service.icon?.charAt(0).toUpperCase() || 'S'}</span>
            </div>
            <h1 className='text-primary text-lg font-semibold mb-2'>{service.title}</h1>
            <p className='text-gray-600 text-sm mb-3'>{service.description}</p>
            {service.features && service.features.length > 0 && (
              <ul className="text-sm text-gray-500 mb-4 space-y-1">
                {service.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-500" />
                    {feature}
                  </li>
                ))}
              </ul>
            )}
            {service.price && (
              <p className='text-thirdry font-bold mb-3'>{service.price}</p>
            )}
            <div className="flex justify-end gap-3 mt-4">
              <button className="bg-red-500 text-white px-3 py-1 rounded-lg text-sm hover:bg-red-600"
                onClick={() => onDelete(service)}>Delete</button>
              <button className="bg-primary text-white px-3 py-1 rounded-lg text-sm hover:opacity-90"
                onClick={() => {
                  setSelectedItemForEdit(service)
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
          title={selectedItemForEdit ? "Edit Service" : "Add Service"}
          footer={null}
          onCancel={() => {
            setShowModal(false)
            setSelectedItemForEdit(null)
          }}>
          <Form
            layout='vertical'
            onFinish={onFinish}
            initialValues={{
              ...selectedItemForEdit,
              features: selectedItemForEdit?.features?.join(', ') || ''
            }}>
            <Form.Item name="title" label="Service Title" rules={[{ required: true }]}>
              <input placeholder='e.g. Web Development' className="w-full border rounded-lg p-2" />
            </Form.Item>
            <Form.Item name="description" label="Description" rules={[{ required: true }]}>
              <textarea placeholder='Describe what this service includes...' className="w-full border rounded-lg p-2" rows={3} />
            </Form.Item>
            <Form.Item name="icon" label="Icon Type">
              <select className="w-full border rounded-lg p-2">
                <option value="">Select an icon</option>
                {iconOptions.map(opt => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </Form.Item>
            <Form.Item name="features" label="Features (comma-separated)">
              <input placeholder='Responsive Design, SEO Optimization, Fast Loading' className="w-full border rounded-lg p-2" />
            </Form.Item>
            <Form.Item name="price" label="Price (optional)">
              <input placeholder='e.g. Starting at $500' className="w-full border rounded-lg p-2" />
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

export default AdminServices
