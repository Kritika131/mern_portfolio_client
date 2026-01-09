import React, { useEffect, useState } from 'react'
import { useDispatch } from "react-redux"
import { message } from 'antd'
import { Hideloading, Showloading } from '../../redux/portfolioSlice'
import api from '../../api/axios'

const AdminAnalytics = () => {
  const dispatch = useDispatch()
  const [analytics, setAnalytics] = useState(null)
  const [days, setDays] = useState(30)

  const fetchAnalytics = async () => {
    try {
      dispatch(Showloading())
      const response = await api.get(`/portfolio/analytics?days=${days}`)
      dispatch(Hideloading())
      if (response.data.success) {
        setAnalytics(response.data.data)
      } else {
        message.error(response.data.msg)
      }
    } catch (err) {
      dispatch(Hideloading())
      message.error(err.response?.data?.msg || 'Failed to fetch analytics')
    }
  }

  useEffect(() => {
    fetchAnalytics()
  }, [days])

  const StatCard = ({ title, value, icon, color }) => (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-500 text-sm mb-1">{title}</p>
          <h3 className="text-3xl font-bold text-gray-800">{value}</h3>
        </div>
        <div className={`w-12 h-12 rounded-lg ${color} flex items-center justify-center`}>
          {icon}
        </div>
      </div>
    </div>
  )

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-800">Analytics Overview</h2>
        <select
          value={days}
          onChange={(e) => setDays(Number(e.target.value))}
          className="border rounded-lg px-4 py-2 text-sm"
        >
          <option value={7}>Last 7 days</option>
          <option value={30}>Last 30 days</option>
          <option value={90}>Last 90 days</option>
        </select>
      </div>

      {analytics ? (
        <>
          {/* Stats Grid */}
          <div className="grid grid-cols-4 sm:grid-cols-2 gap-5 mb-8">
            <StatCard
              title="Total Views"
              value={analytics.totalViews || 0}
              color="bg-blue-100"
              icon={
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              }
            />
            <StatCard
              title={`Views (${days} days)`}
              value={analytics.recentViews || 0}
              color="bg-green-100"
              icon={
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              }
            />
            <StatCard
              title="Unique Visitors (7 days)"
              value={analytics.uniqueVisitorsLastWeek || 0}
              color="bg-purple-100"
              icon={
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              }
            />
            <StatCard
              title="Top Projects"
              value={analytics.topProjects?.length || 0}
              color="bg-orange-100"
              icon={
                <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              }
            />
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-2 sm:grid-cols-1 gap-6">
            {/* Daily Views */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Daily Views</h3>
              {analytics.dailyStats && analytics.dailyStats.length > 0 ? (
                <div className="space-y-3">
                  {analytics.dailyStats.slice(-7).map((stat, idx) => (
                    <div key={idx} className="flex items-center gap-4">
                      <span className="text-sm text-gray-500 w-24">
                        {new Date(stat.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                      </span>
                      <div className="flex-1 bg-gray-100 rounded-full h-4">
                        <div
                          className="bg-gradient-to-r from-thirdry to-secondary h-4 rounded-full transition-all"
                          style={{ width: `${Math.min((stat.views / Math.max(...analytics.dailyStats.map(s => s.views))) * 100, 100)}%` }}
                        />
                      </div>
                      <span className="text-sm font-medium text-gray-700 w-12 text-right">{stat.views}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-sm">No data available yet</p>
              )}
            </div>

            {/* Top Projects */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Top Projects by Clicks</h3>
              {analytics.topProjects && analytics.topProjects.length > 0 ? (
                <div className="space-y-4">
                  {analytics.topProjects.map((project, idx) => (
                    <div key={project._id} className="flex items-center gap-4">
                      <span className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold ${
                        idx === 0 ? 'bg-yellow-500' : idx === 1 ? 'bg-gray-400' : idx === 2 ? 'bg-amber-600' : 'bg-gray-300'
                      }`}>
                        {idx + 1}
                      </span>
                      <div className="flex-1">
                        <p className="font-medium text-gray-800">{project.title}</p>
                        <p className="text-sm text-gray-500">{project.clicks || 0} clicks</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-sm">No project clicks recorded yet</p>
              )}
            </div>
          </div>

          {/* Tips Section */}
          <div className="mt-6 bg-gradient-to-r from-thirdry/10 to-secondary/10 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Tips to Increase Views</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-center gap-2">
                <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Share your portfolio link on LinkedIn and social media
              </li>
              <li className="flex items-center gap-2">
                <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Add your portfolio URL to your email signature
              </li>
              <li className="flex items-center gap-2">
                <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Write blog posts to attract organic traffic
              </li>
              <li className="flex items-center gap-2">
                <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Keep your projects and skills updated
              </li>
            </ul>
          </div>
        </>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-500">Loading analytics...</p>
        </div>
      )}
    </div>
  )
}

export default AdminAnalytics
