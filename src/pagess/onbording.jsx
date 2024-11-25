import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/clerk-react";
import React from "react";
import { useNavigate } from "react-router-dom";
import { BarLoader } from "react-spinners";

const onbording = () => {
  const { user, isLoaded } = useUser();
  const navigate = useNavigate();

  const handleRoleSelection = async (role) => {
    await user
      .update({
        unsafeMetadata: { role },
      })
      .then(() => {
        navigate(role === "recruiter" ? "/postjob" : "/jobs");
      });
  };

  if (!isLoaded) {
    return <BarLoader className="mb-4" width={"100%"} color="#36d7b7" />;
  }

  return (
    <div className=" flex flex-col items-center justify-center mt-32">
      <h2 className=" gradient-title  font-extrabold text-6xl sm:text-7xl tracking-tighter">
        I am a.....
      </h2>
      <div className=" mt-16 grid grid-cols-2 gap-4 w-full md:px-40">
        <Button
          variant="blue"
          className=" font-bold text-2xl h-32"
          onClick={() => handleRoleSelection("candidate")}
        >
          Candidate
        </Button>
        <Button
          variant="destructive"
          className=" font-bold text-2xl h-32"
          onClick={() => handleRoleSelection("recruiter")}
        >
          Recruiter
        </Button>
      </div>
    </div>
  );
};

export default onbording;
