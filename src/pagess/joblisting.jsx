import { getJobs } from '@/api/apijobs'

import React, { useEffect } from 'react'

const joblisting = () => {
  


  const fetchJobs = async()=>{
    const supabaseAccessToken = await session.getToken({
       template: "supabase",
    });
    
   const data = await getJobs(supabaseAccessToken);
   console.log(data);
  };


 useEffect(() => {
    fetchJobs()
 }, []);

  return (
    <div>
    joblisting
    joblisting
    </div>
  )
}

export default joblisting
