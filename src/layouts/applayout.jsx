import React from 'react'
import { Outlet } from 'react-router-dom'

const Applayout = () => {
  return (
    <div>
      AppLayout
      <Outlet/>
    </div>
  )
}

export default Applayout


