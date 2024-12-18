import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Boxes, BriefcaseBusiness, Download, School } from "lucide-react";
import useFetch from "@/hooks/usefetch";
import { updateApplications } from "@/api/apiApplications";
import { BarLoader } from "react-spinners";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Applicationcard = ({ applications, isCandidate = false }) => {
  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = applications?.resume;
    link.target = "_blank";
    link.click();
  };

  const { loading: loadingHiringStatus, fn: fnHiringStatus } = useFetch(
    updateApplications,
    {
      job_id: applications.job_id,
    }
  );

  const handleStatusChange = (status) => {
    fnHiringStatus(status);
  };

  return (
    <Card>
      {loadingHiringStatus && (
        <BarLoader className="mb-4" width={"100%"} color="#36d7b7" />
      )}
      <CardHeader>
        <CardTitle className=" font-kanit flex justify-between font-bold">
          {isCandidate
            ? `${applications?.jobs?.title} at ${applications?.jobs?.company?.name}`
            : applications?.name}
          <Download
            size={18}
            className=" bg-white text-black rounded-full h-8 w-8 p-1.5 cursor-pointer"
            onClick={handleDownload}
          />
        </CardTitle>
      </CardHeader>

      <CardContent className=" flex flex-col gap-4  flex-1">
        <div className=" font-sourgammy flex flex-col md:flex-row justify-between">
          <div className=" flex gap-2 items-center">
            <BriefcaseBusiness size={18} />
            {applications?.experience} years of experience
          </div>
          <div className=" flex gap-2 items-center">
            <School size={18} />
            Education : {applications?.education}
          </div>
          <div className=" flex gap-2 items-center">
            <Boxes size={18} />
            Skills : {applications?.skills}
          </div>
        </div>
        <hr />
      </CardContent>
      <CardFooter className=" flex justify-between font-sourgammy">
        <span>{new Date(applications?.created_at).toLocaleString()}</span>
        {isCandidate ? (
          <span className=" capitalize font-bold">
            {" "}
            Status: {applications?.status}
          </span>
        ) : (
          <Select onValueChange={handleStatusChange} defaultValue={applications.status}>
            <SelectTrigger className=" w-52">
              <SelectValue
                placeholder="Applications Status"
              />
            </SelectTrigger >
            <SelectContent>
              <SelectItem value="applied">Applied</SelectItem>
              <SelectItem value="interviewing">Interviweing</SelectItem>
              <SelectItem value="hired">Hired</SelectItem>
              <SelectItem value="rejected">Rejected</SelectItem>
            </SelectContent>
          </Select>
        )}
      </CardFooter>
    </Card>
  );
};

export default Applicationcard;
