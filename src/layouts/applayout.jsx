import React from 'react'
import { Outlet } from 'react-router-dom'
import './../App.css'
import Header from './../components/header'

const Applayout = () => {
  return (
    <div>
      <div className='grid-background'>
        <main className=' min-h-screen container'>
        <Header/>
        <Outlet/>
        </main>
        <div className=' p-10 text-center bg-gray-800 mt-10'> 
           Made With ❤️ By Dixit 
        </div>
      </div>
    
    </div>
  )
}

export default Applayout


