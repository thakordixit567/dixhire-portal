import { useUser } from '@clerk/clerk-react'
import React from 'react'
import { Navigate, useLocation } from 'react-router-dom';

const protectedroute = ({ children }) => 
{

 const { isSignedIn, user, isLoaded} = useUser();
 const { pathname } =  useLocation();

 if( isLoaded && !isSignedIn &&  isSignedIn!==undefined){
    return <Navigate to='/?sign-in=true' /> ;
 }

 //check onbording status

  return children;
}

export default protectedroute