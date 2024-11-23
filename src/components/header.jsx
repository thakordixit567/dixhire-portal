import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from './ui/button'
import { SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/clerk-react'

const header = () => {
  return (
    <>
    <nav className=' py-4 flex justify-between items-center'>
       <Link>
         <img src="./dixhire.png" className=' h-20' />
       </Link>

       <Button variant="outline">Button</Button>
      
      {/*
    <SignedOut>
        <SignInButton />
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>
       
    */}
       

    </nav>
    
    </>
  )
}

export default header
