import { useUser } from "@clerk/clerk-react";
import React from "react";
import { BarLoader } from "react-spinners";
import CreatedJobs from "./../components/createdJobs";
import CreatedApplicants from "./../components/createdApplication";

const Myjobsmy = () => {
  const { user, isLoaded } = useUser();

  if (!isLoaded) {
    return <BarLoader className="mb-4" width={"100%"} color="#36d7b7" />;
  }

  return (
    <div>
      <h1 className=" gradient-title font-extrabold font-doto text-5xl sm:text-7xl text-center pb-8">
        {user?.unsafeMetadata?.role === "candidate"
          ? "My Applications"
          : "My Jobs"}
      </h1>
      {user?.unsafeMetadata?.role === "candidate" ? (
        <CreatedApplicants />
        ): (
        <CreatedJobs />)} 
    </div>
  );
};

export default Myjobsmy;
