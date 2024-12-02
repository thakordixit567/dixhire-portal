import { getSingleJob } from "@/api/apiJobs";
import useFetch from "@/hooks/usefetch";
import { useUser } from "@clerk/clerk-react";
import MDEditor from "@uiw/react-md-editor";
import { Briefcase, DoorClosed, DoorOpen, MapPinIcon } from "lucide-react";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { BarLoader } from "react-spinners";

const joppage = () => {
  const { isLoaded, user } = useUser();
  const { id } = useParams();

  const {
    fn: fnJobs,
    data: jobs,
    loading: loadingJobs,
  } = useFetch(getSingleJob, {
    job_id: id,
  });

  useEffect(() => {
    if (isLoaded) fnJobs();
  }, [isLoaded]);

  if (!isLoaded || loadingJobs) {
    return <BarLoader className="mb-4" width={"100%"} color="#36d7b7" />;
  }

  return (
    <div className=" flex flex-col gap-8 mt-5">
      <div className=" flex flex-col-reverse gap-6 md:flex-row justify-between items-center">
        <h1 className=" gradient-title font-sourgammy font-extrabold pb-3 text-4xl sm:text-6xl">
          {jobs?.title}
        </h1>
        <img
          src={jobs?.company?.logo_url}
          className=" h-12"
          alt={jobs?.title}
        />
      </div>

      <div className=" flex justify-between">
        <div className=" flex gap-2">
          <MapPinIcon />
          {jobs?.location}
        </div>
        <div className=" flex gap-2">
          <Briefcase /> {jobs?.applications?.length} Applications
        </div>
        <div className=" flex gap-2">
           {
            jobs?.isOpen? (
              <>
               <DoorOpen /> Open
              </>
            ): (
              <>
               <DoorClosed /> Closed
              </>
            )
           }
        </div>
      </div>

      <h2 className=" text-2xl sm:text-3xl font-bold">About the job</h2>
      <p className=" sm:text-xl">{jobs?.description}</p>

      <h2 className=" text-2xl sm:text-3xl font-bold">What We Are Looking For</h2>
      <MDEditor.Markdown 
      source= {jobs?.requirements} 
      className=" bg-transparent  sm:text-lg" 
      />
    </div>
  );
};

export default joppage;
