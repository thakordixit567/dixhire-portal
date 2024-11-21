import React from 'react'
import { Outlet } from 'react-router-dom'
import './../App.css'

const Applayout = () => {
  return (
    <div>
      <div className='grid-background'>
        
      </div>
      <Outlet/>
    </div>
  )
}

export default Applayout


