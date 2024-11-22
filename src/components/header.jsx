import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from './ui/button'

const header = () => {
  return (
    <>
    <nav className=' py-4 flex justify-between items-center'>
       <Link>
         <img src="./dixhire.png" className=' h-20 cursor-pointer' />
       </Link>

       <Button variant="destructive">Button</Button>

    </nav>
    
    </>
  )
}

export default header
