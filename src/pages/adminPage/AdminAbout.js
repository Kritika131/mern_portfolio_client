import React, { useState } from 'react'
import { Form } from 'antd'
import { useSelector, useDispatch } from "react-redux"
import { Hideloading, Showloading, reloadingData } from '../../redux/portfolioSlice'
import { message } from 'antd'
import api from '../../api/axios'
import FileUpload from '../../components/FileUpload'

const AdminAbout = () => {
  const dispatch = useDispatch()
  const { portfolioData } = useSelector(state => state.portfolio)
  const [mediaType, setMediaType] = useState(
    portfolioData?.about?.lottie_url?.includes('lottiefiles') || portfolioData?.about?.lottie_url?.endsWith('.json') ? 'lottie' : 'image'
  )
  const [imageUrl, setImageUrl] = useState(
    !(portfolioData?.about?.lottie_url?.includes('lottiefiles') || portfolioData?.about?.lottie_url?.endsWith('.json'))
      ? portfolioData?.about?.lottie_url || ''
      : ''
  )
  const [lottieUrl, setLottieUrl] = useState(
    portfolioData?.about?.lottie_url?.includes('lottiefiles') || portfolioData?.about?.lottie_url?.endsWith('.json')
      ? portfolioData?.about?.lottie_url
      : ''
  )

  const onFinish = async (values) => {
    try {
      const tempSkills = values.skills.split(',').map(s => s.trim()).filter(Boolean)
      const mediaUrl = mediaType === 'lottie' ? lottieUrl : imageUrl

      dispatch(Showloading())
      const response = await api.put("/portfolio/update-about", {
        ...values,
        skills: tempSkills,
        lottie_url: mediaUrl,
        _id: portfolioData.about._id
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
      <Form onFinish={onFinish} layout='vertical' initialValues={{
        ...portfolioData.about,
        skills: portfolioData.about.skills.join(", "),
      }}>
        {/* Media Type Selector */}
        <div className="mb-6">
          <label className="block text-sm font-semibold text-gray-700 mb-3">About Section Media</label>
          <div className="flex gap-4 mb-4">
            <button
              type="button"
              onClick={() => setMediaType('lottie')}
              className={`flex-1 py-3 px-4 rounded-lg border-2 transition-all ${
                mediaType === 'lottie'
                  ? 'border-thirdry bg-thirdry/10 text-thirdry'
                  : 'border-gray-200 text-gray-500 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center justify-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="font-medium">Lottie Animation</span>
              </div>
            </button>
            <button
              type="button"
              onClick={() => setMediaType('image')}
              className={`flex-1 py-3 px-4 rounded-lg border-2 transition-all ${
                mediaType === 'image'
                  ? 'border-thirdry bg-thirdry/10 text-thirdry'
                  : 'border-gray-200 text-gray-500 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center justify-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span className="font-medium">Image</span>
              </div>
            </button>
          </div>

          {/* Lottie URL Input */}
          {mediaType === 'lottie' && (
            <div className="space-y-3">
              <input
                type="text"
                value={lottieUrl}
                onChange={(e) => setLottieUrl(e.target.value)}
                placeholder="https://assets.lottiefiles.com/..."
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:border-thirdry focus:ring-1 focus:ring-thirdry outline-none"
              />
              {lottieUrl && (
                <div className="flex items-center justify-center p-4 bg-gray-50 rounded-lg">
                  <lottie-player
                    src={lottieUrl}
                    speed="1"
                    style={{ width: "192px", height: "192px" }}
                    autoplay
                    loop
                  ></lottie-player>
                </div>
              )}
              <p className="text-xs text-gray-500">
                Get free animations from <a href="https://lottiefiles.com" target="_blank" rel="noopener noreferrer" className="text-thirdry hover:underline">LottieFiles.com</a>
              </p>
            </div>
          )}

          {/* Image Upload */}
          {mediaType === 'image' && (
            <FileUpload
              type="image"
              value={imageUrl}
              onChange={setImageUrl}
              uploadEndpoint="/portfolio/upload/image"
              placeholder="Drop your about image here"
              shape="square"
              previewSize="w-48 h-48"
              maxSize={5}
            />
          )}
        </div>

        {/* Description Fields */}
        <div className="space-y-4">
          <Form.Item name="description_1" label={<span className="font-medium">Description (Paragraph 1)</span>}>
            <textarea
              placeholder='Write about yourself, your background, and what you do...'
              rows={4}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:border-thirdry focus:ring-1 focus:ring-thirdry outline-none resize-none"
            />
          </Form.Item>
          <Form.Item name="description_2" label={<span className="font-medium">Description (Paragraph 2)</span>}>
            <textarea
              placeholder='Additional details about your interests, goals, or philosophy...'
              rows={4}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:border-thirdry focus:ring-1 focus:ring-thirdry outline-none resize-none"
            />
          </Form.Item>
          <Form.Item name="skills" label={<span className="font-medium">Skills (comma-separated)</span>}>
            <textarea
              placeholder='JavaScript, React, Node.js, Python, MongoDB...'
              rows={3}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:border-thirdry focus:ring-1 focus:ring-thirdry outline-none resize-none"
            />
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

export default AdminAbout
