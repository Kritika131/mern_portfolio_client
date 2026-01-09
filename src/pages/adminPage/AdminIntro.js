import React, { useState } from 'react'
import { Form } from 'antd'
import { useSelector, useDispatch } from "react-redux"
import { Hideloading, Showloading, reloadingData } from '../../redux/portfolioSlice'
import { message } from 'antd'
import api from '../../api/axios'
import FileUpload from '../../components/FileUpload'

const AdminIntro = () => {
  const dispatch = useDispatch()
  const { portfolioData } = useSelector(state => state.portfolio)
  const [profileImage, setProfileImage] = useState(portfolioData?.intro?.profileImage || '')
  const [resumeUrl, setResumeUrl] = useState(portfolioData?.intro?.resumeUrl || '')

  const onFinish = async (values) => {
    try {
      dispatch(Showloading())
      const response = await api.put("/portfolio/update-intro", {
        ...values,
        profileImage,
        resumeUrl,
        _id: portfolioData.intro._id
      })

      dispatch(Hideloading())
      if (response.data.success) {
        message.success(response.data.msg)
        dispatch(reloadingData(true))
      } else {
        message.error(response.data.msg)
      }
    } catch (err) {
      message.error(err.message)
      dispatch(Hideloading())
    }
  }

  return (
    <div>
      <Form onFinish={onFinish} layout='vertical' initialValues={portfolioData.intro}>
        {/* Upload Section */}
        <div className="grid grid-cols-2 gap-6 mb-8 sm:grid-cols-1">
          <FileUpload
            type="image"
            value={profileImage}
            onChange={setProfileImage}
            uploadEndpoint="/portfolio/upload/profile-image"
            label="Profile Image"
            placeholder="Drop your profile image here"
            shape="circle"
            previewSize="w-36 h-36"
            maxSize={5}
          />

          <FileUpload
            type="pdf"
            value={resumeUrl}
            onChange={setResumeUrl}
            uploadEndpoint="/portfolio/upload/resume"
            label="Resume (PDF)"
            placeholder="Drop your resume here"
            maxSize={10}
          />
        </div>

        {/* Form Fields */}
        <div className="space-y-4">
          <Form.Item name="welcomeText" label={<span className="font-medium">Welcome Text</span>}>
            <input placeholder='e.g. Hello, I am' className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:border-thirdry focus:ring-1 focus:ring-thirdry outline-none transition-all" />
          </Form.Item>
          <Form.Item name="name" label={<span className="font-medium">Name</span>}>
            <input placeholder='Your full name' className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:border-thirdry focus:ring-1 focus:ring-thirdry outline-none transition-all" />
          </Form.Item>
          <Form.Item name="caption" label={<span className="font-medium">Caption / Title</span>}>
            <input placeholder='e.g. Full Stack Developer' className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:border-thirdry focus:ring-1 focus:ring-thirdry outline-none transition-all" />
          </Form.Item>
          <Form.Item name="description" label={<span className="font-medium">Description</span>}>
            <textarea placeholder='Brief introduction about yourself...' rows={4} className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:border-thirdry focus:ring-1 focus:ring-thirdry outline-none transition-all resize-none" />
          </Form.Item>
        </div>

        <div className="flex justify-end w-full mt-6">
          <button className="px-8 py-2.5 bg-gradient-to-r from-thirdry to-secondary text-white rounded-lg font-medium hover:shadow-lg hover:shadow-thirdry/30 transition-all" type='submit'>
            Save Changes
          </button>
        </div>
      </Form>
    </div>
  )
}

export default AdminIntro
