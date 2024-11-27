import { getJobs } from '@/api/apijobs'
import useFetch from '@/hooks/usefetch'
import { useUser } from '@clerk/clerk-react'

import Jobcard from '@/components/jobcard'

import React, { useEffect, useState } from 'react'
import { BarLoader } from 'react-spinners'

const jobListing = () => {

const [searchQuery, setsearchQuery] = useState("");
const [location, setLocation] = useState("");
const [company_id, setCompany_id] = useState("");  

const { isLoaded } = useUser();  
  
const
 { fn: fnJobs, 
  data: jobs, 
  loading: loadingJobs
} =  
 useFetch(getJobs, {
  location,
  company_id,
  searchQuery,
 });



 useEffect(() => {
    if (isLoaded) fnJobs();
 }, [isLoaded, location, company_id, searchQuery]);

 if (!isLoaded) {
  return <BarLoader className="mb-4" width={"100%"} color="#36d7b7" />;
}
 


  return (
    <div>
      <h1 className=' 
       gradient-title
      
       text-6xl 
       sm:text-7xl 
       text-center 
       pb-8 font-extrabold font-rampart'> 
       Latest Jobs
       </h1>
     
       {loadingJobs && (
        <BarLoader className="mt-4" width={"100%"} color="#36d7b7" />
       ) }

       { loadingJobs === false && (
          <div>
            {jobs?.length? (
               jobs.map((job) => {
                return <Jobcard key={job.id} job={job} />;
               })
            ): (
              <div> No Jobs Found 😖</div>
            )}
          </div>
       )}

    </div>
  )
}

export default jobListing
