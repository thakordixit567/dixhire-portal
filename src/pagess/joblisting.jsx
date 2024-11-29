import { getJobs } from "@/api/apiJobs";
import { useSession } from "@clerk/clerk-react";
import React, { useEffect } from "react";

const joblisting = () => {
  const { session } = useSession();

  const fetchJobs = async () => {
    const supabaseAccessToken = await session.getToken({
      template: "supabase",
    });
    getJobs(supabaseAccessToken);
  };

  useEffect(() => {
   
  }, []);
  return <div>joblisting joblisting</div>;
};

export default joblisting;
