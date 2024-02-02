import React from 'react'

const LeftSider = () => {
  return (
    <div className='social_icons fixed sm:static sm:pt-3 left-0 bottom-0 px-8 '>
      <div className="flex flex-col items-center">
        
      <div className="flex flex-col gap-3 sm:flex-row">
      {/* <box-icon type='logo' name='facebook-circle'></box-icon> */}
      <a href="https://api.whatsapp.com/send/?phone=9341740699" target="_blank">
      <box-icon type='logo' name='whatsapp'></box-icon>

      </a>
      <a href="https://www.linkedin.com/in/kritika-9aa54a229/" target='_blank'>
      <box-icon name='linkedin-square' type='logo' ></box-icon>
      </a>
      <a href="https://github.com/Kritika131/">
      <box-icon name='github' type='logo'></box-icon>
      </a>
      <a href="https://mail.google.com" target='_blank'>

      <box-icon name='envelope'  ></box-icon> 
      </a>
      <a href="https://instagram.com" target='_blank'>
        <box-icon name='instagram' type='logo'></box-icon>

      </a>

      </div>
      <div className="w-[2px] h-32 sm:hidden bg-gray-600"></div>
    </div>
    
    </div>
  )
}

export default LeftSider