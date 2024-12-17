import { getSavedJobs } from "@/api/apiJobs";
import useFetch from "@/hooks/usefetch";
import { useUser } from "@clerk/clerk-react";
import React, { useEffect } from "react";
import { BarLoader } from "react-spinners";
import Jobcard from "@/components/jobcard";

const savedjobs = () => {
  const { isLoaded } = useUser();
  const {
    loading: loadingSavedJobs,
    data: dataSavedJobs,
    fn: fnSavedJobs,
  } = useFetch(getSavedJobs);

  useEffect(() => {
    if (isLoaded) fnSavedJobs();
  }, [isLoaded])

  if (!isLoaded || loadingSavedJobs) {
    return <BarLoader width={"100%"} color="#36d7b7" />
  }

  return <div>
         <h1 className=" gradient-title font-extrabold font-doto text-6xl sm:text-7xl text-center pb-8" >
           Saved Jobs
         </h1>

         {loadingSavedJobs == false && (
          <div className="  mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {dataSavedJobs?.length ? (
              dataSavedJobs.map((saved) => {
                return (
                  <Jobcard
                    key={saved.id}
                    job={saved?.job}
                    savedInit={true}
                    onJobSaved={fnSavedJobs}
                  />
                );
              })
            ) : (
              <div> No Saved Jobs Found😖</div>
            )}
          </div>
        )}
  </div>;
};

export default savedjobs;
