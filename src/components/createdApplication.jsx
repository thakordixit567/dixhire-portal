import { gettApplications } from "@/api/apiApplications";
import useFetch from "@/hooks/usefetch";
import { useUser } from "@clerk/clerk-react";
import React, { useEffect } from "react";
import { BarLoader } from "react-spinners";
import Applicationcard from "./applicationcard";

const createdApplication = () => {
  const { user } = useUser();
  const {
    loading: loadingApplications,
    data: dataApplications,
    fn: fnApplications,
  } = useFetch(gettApplications, {
    user_id: user.id,
  });

  useEffect(() => {
    fnApplications();
  }, []);

  if (loadingApplications) {
    return <BarLoader className="mb-4" width={"100%"} color="#36d7b7" />;
  }

  return (
    <div className=" flex flex-col gap-2">
      {dataApplications?.map((applications) => {
        return (
          <Applicationcard
            key={applications.id}
            applications={applications}
            isCandidate
          />
        );
      })}
    </div>
  );
};

export default createdApplication;
