import React from 'react'
import Intro from './intro/Intro'
import About from './About'
import Experiences from './Education'
import Header from '../../components/Header'
import Projects from './Projects'
import Contact from './Contact'
import Footer from './Footer'
import LeftSider from '../../components/LeftSider'
import {useSelector} from 'react-redux'

const Home = () => {
  const {loading,portfolioData} = useSelector((state)=>state.portfolio)

  return (
    <div className='py-6 px-12 bg-primary sm:px-5 '>
      
      <Header admin={false}/>
        {portfolioData && (
      <div className="px-24 sm:px-0">
      <Intro/>
      <About/>
      <Experiences/>
      <Projects/>
      <Contact/>
      <Footer/>
      <LeftSider/>
      
      </div>

        ) }
      
    </div>
  )
}

export default Home