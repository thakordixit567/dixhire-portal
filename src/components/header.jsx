import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Button } from "./ui/button";
import {
  SignIn,

  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/clerk-react";
import { BriefcaseBusiness, Heart, PenBox } from "lucide-react";

const header = () => {
   const [showSignIn, setshowSignin] = useState(false);

   const [search, setSearch] = useSearchParams();

   useEffect(() => {
    if(search.get('sign-in')){
      setshowSignin(true)
    }
   },[search]);

   const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      setshowSignin(false);
      setSearch({});
    }
   }

  return (
    <>
      <nav className=" py-4 flex justify-between items-center">
        <Link>
          <img src="./dixhire.png" className=" h-16" />
        </Link>


        <div className=" flex gap-8">
          <SignedOut>
            <Button variant="outline"   onClick={()=>setshowSignin(true)}>Login</Button>
          </SignedOut>
          
          <SignedIn>
          {/* add a condition here */}
         
          <Button
          variant='destructive' 
          className=' rounded-full'
        
          >
          <PenBox size={20} className="mr-2" />
          Post Job
         </Button>
          <Link to='/postjob'>
          </Link>
            <UserButton appearance={{
              elements:{
                avatarBox: " w-10 h-10",
              }
            }}>
             <UserButton.MenuItems>
               <UserButton.Link
                  label="My Jobs"
                  labelIcon={<BriefcaseBusiness size={15} />}
                  href="/myjob"
               />
               <UserButton.Link
                  label="Saved Jobs"
                  labelIcon={<Heart size={15} />}
                  href="/savedjob"
               />
             </UserButton.MenuItems>
            </UserButton>
          </SignedIn>
        </div>
      </nav>
      {showSignIn && 
        <div className=" fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
        onClick={handleOverlayClick}
        >
          <SignIn
          signUpForceRedirectUrl="/onbording"
          fallbackRedirectUrl="/onbording"
          />
        </div>}
    </>
  );
};

export default header;
