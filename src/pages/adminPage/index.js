import React, { useEffect } from 'react'
import Header from '../../components/Header'
import {Tabs} from "antd"
import AdminIntro from './AdminIntro'
import AdminAbout from './AdminAbout'
import {useSelector} from 'react-redux'
import AdminEducation from './AdminEducation'
import AdminProjects from './AdminProjects'
import AdminContact from './AdminContact'

const  {TabPane} = Tabs

const Admin = () => {

  const {portfolioData} = useSelector((state)=>state.portfolio)
  const {token} = useSelector((state)=>state.user)
  useEffect(()=>{
    if(!token){
      window.location.href="/admin-login"
    }
  },[])
  return (
    <div className='px-16 py-5 sm:px-6 '>
      <Header admin={true} />
     
      {portfolioData &&  
      <div className=' pb-10 mt-8 sm:mt-6'>
        {/* <Tabs defaultActiveKey='1' tabPosition='left' > */}
        <Tabs defaultActiveKey='1'  >
          <TabPane tab="Intro" key="1">
            <AdminIntro/>
          </TabPane>
          <TabPane tab="About" key="2">
            <AdminAbout/>
          </TabPane>
          <TabPane tab="Education" key="3">
            <AdminEducation/>
          </TabPane>
          <TabPane tab="Project" key="4">
            <AdminProjects/>
          </TabPane>
          <TabPane tab="Contact" key="5">
            <AdminContact/>
          </TabPane>
        </Tabs>
      </div> 
        }     
    </div>
  )
}

export default Admin