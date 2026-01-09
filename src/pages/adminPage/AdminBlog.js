import React, { useState } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { Modal, Form, message, Switch } from 'antd'
import { Hideloading, Showloading, reloadingData } from '../../redux/portfolioSlice'
import api from '../../api/axios'

const AdminBlog = () => {
  const dispatch = useDispatch()
  const { portfolioData } = useSelector(state => state.portfolio)
  const blogs = portfolioData?.blogs || []
  const [showModal, setShowModal] = useState(false)
  const [selectedItemForEdit, setSelectedItemForEdit] = useState(null)
  const [type, setType] = useState('add')
  const [coverImage, setCoverImage] = useState('')
  const [uploading, setUploading] = useState(false)
  const [published, setPublished] = useState(false)

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
        setCoverImage(response.data.url)
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
      const payload = {
        ...values,
        coverImage: coverImage || values.coverImage,
        published,
        tags: values.tags ? values.tags.split(',').map(t => t.trim()) : []
      }

      if (selectedItemForEdit) {
        response = await api.put("/portfolio/update-blog", {
          ...payload,
          id: selectedItemForEdit._id,
        })
      } else {
        response = await api.post("/portfolio/add-blog", payload)
      }
      dispatch(Hideloading())
      if (response.data.success) {
        message.success(response.data.msg)
        setShowModal(false)
        setSelectedItemForEdit(null)
        setCoverImage('')
        setPublished(false)
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
      const response = await api.delete("/portfolio/delete-blog/" + item._id)
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
          setCoverImage('')
          setPublished(false)
          setShowModal(true)
        }}>Add Blog Post</button>
      </div>

      <div className="grid grid-cols-2 mt-5 sm:grid-cols-1 gap-5">
        {blogs.map((blog) => (
          <div key={blog._id} className="shadow border border-gray-200 rounded-lg bg-white overflow-hidden">
            {blog.coverImage && (
              <div className="h-48 bg-gray-100">
                <img src={blog.coverImage} alt={blog.title} className="w-full h-full object-cover" />
              </div>
            )}
            <div className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <span className={`text-xs px-2 py-1 rounded-full ${blog.published ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                  {blog.published ? 'Published' : 'Draft'}
                </span>
                <span className="text-xs text-gray-500">{blog.views || 0} views</span>
              </div>
              <h1 className='text-primary text-lg font-semibold mb-2'>{blog.title}</h1>
              <p className='text-gray-600 text-sm mb-3 line-clamp-2'>{blog.excerpt || blog.content?.substring(0, 100)}...</p>
              {blog.tags && blog.tags.length > 0 && (
                <div className="flex flex-wrap gap-1 mb-3">
                  {blog.tags.map((tag, idx) => (
                    <span key={idx} className="bg-gray-100 text-gray-600 text-xs px-2 py-0.5 rounded">{tag}</span>
                  ))}
                </div>
              )}
              <div className="flex justify-end gap-3 mt-4">
                <button className="bg-red-500 text-white px-3 py-1 rounded-lg text-sm hover:bg-red-600"
                  onClick={() => onDelete(blog)}>Delete</button>
                <button className="bg-primary text-white px-3 py-1 rounded-lg text-sm hover:opacity-90"
                  onClick={() => {
                    setSelectedItemForEdit(blog)
                    setCoverImage(blog.coverImage || '')
                    setPublished(blog.published || false)
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
          title={selectedItemForEdit ? "Edit Blog Post" : "Add Blog Post"}
          footer={null}
          width={700}
          onCancel={() => {
            setShowModal(false)
            setSelectedItemForEdit(null)
            setCoverImage('')
            setPublished(false)
          }}>
          <Form
            layout='vertical'
            onFinish={onFinish}
            initialValues={{
              ...selectedItemForEdit,
              tags: selectedItemForEdit?.tags?.join(', ') || ''
            }}>
            <Form.Item name="title" label="Title" rules={[{ required: true }]}>
              <input placeholder='Blog post title' className="w-full border rounded-lg p-2" />
            </Form.Item>
            <Form.Item name="excerpt" label="Excerpt">
              <input placeholder='Brief summary of the post' className="w-full border rounded-lg p-2" />
            </Form.Item>
            <Form.Item name="content" label="Content" rules={[{ required: true }]}>
              <textarea placeholder='Write your blog post content here...' className="w-full border rounded-lg p-2" rows={10} />
            </Form.Item>
            <Form.Item name="tags" label="Tags (comma-separated)">
              <input placeholder='React, Web Development, Tutorial' className="w-full border rounded-lg p-2" />
            </Form.Item>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Cover Image</label>
              <div className="flex items-center gap-4">
                {(coverImage || selectedItemForEdit?.coverImage) && (
                  <img src={coverImage || selectedItemForEdit?.coverImage} alt="Preview" className="w-32 h-20 object-cover rounded" />
                )}
                <label className="cursor-pointer bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-lg text-sm">
                  {uploading ? 'Uploading...' : 'Upload Cover'}
                  <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} disabled={uploading} />
                </label>
              </div>
            </div>
            <Form.Item label="Publish">
              <Switch checked={published} onChange={setPublished} />
              <span className="ml-2 text-sm text-gray-500">
                {published ? 'Visible to public' : 'Saved as draft'}
              </span>
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

export default AdminBlog
