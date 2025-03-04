import { getSingleJob, updateHiringStatus } from "@/api/apiJobs";
import useFetch from "@/hooks/usefetch";
import { useUser } from "@clerk/clerk-react";
import MDEditor from "@uiw/react-md-editor";
import { Briefcase, DoorClosed, DoorOpen, MapPinIcon } from "lucide-react";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { BarLoader } from "react-spinners";
import ApplyJobDrawer from "@/components/applyJob";
import Applicationcard from "@/components/applicationcard";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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

  const { fn: fnHiringStatus, loading: loadingHiringStatus } = useFetch(
    updateHiringStatus,
    {
      job_id: id,
    }
  );

  const handleStatusChange = (value) => {
    const isOpen = value === "open";
    fnHiringStatus(isOpen).then(() => fnJobs());
  };

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
          {jobs?.isOpen ? (
            <>
              <DoorOpen /> Open
            </>
          ) : (
            <>
              <DoorClosed /> Closed
            </>
          )}
        </div>
      </div>

      {loadingHiringStatus && <BarLoader width={"100%"} color="#36d7b7" />}
      {jobs?.recruiter_id === user?.id && (
        <Select onValueChange={handleStatusChange}>
          <SelectTrigger
            className={`w-full ${jobs?.isOpen ? "bg-green-950" : "bg-red-950"}`}
          >
            <SelectValue
              placeholder={
                "Hiring Status " + (jobs?.isOpen ? "( Open )" : "( Closed )")
              }
            />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="open">Open</SelectItem>
            <SelectItem value="closed">Closed</SelectItem>
          </SelectContent>
        </Select>
      )}

      <h2 className=" text-3xl font-bebasneue tracking-wider sm:text-4xl font-bold">
        About the job
      </h2>
      <p className=" font-semibold sm:text-xl">{jobs?.description}</p>

      <h2 className=" text-3xl sm:text-4xl font-bebasneue tracking-wider font-bold">
        What We Are Looking For
      </h2>
      <MDEditor.Markdown
        source={jobs?.requirements}
        className="bg-transparent  sm:text-lg"
      />

      {jobs?.recruiter_id !== user?.id && (
        <ApplyJobDrawer
          jobs={jobs}
          user={user}
          fetchJob={fnJobs}
          applied={jobs?.applications?.find(
            (ap) => ap.candidate_id === user.id
          )}
        />
      )}
      {
        jobs?.applications?.length > 0 && jobs?.recruiter_id === user?.id && (
          <div className=" flex flex-col gap-2">
            <h2 className="text-3xl sm:text-4xl font-bebasneue tracking-wider font-bold">
              Applications
            </h2>
            {jobs?.applications.map((applications)=> {
              return (
                <Applicationcard key={applications.id} applications={applications} />
              );
            })}
          </div>
        )
      }
    </div>
  );
};

export default joppage;
