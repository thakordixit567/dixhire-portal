import { useUser } from "@clerk/clerk-react";
import React from "react";
import { Card, CardHeader, CardTitle } from "./ui/card";
import { Trash2Icon } from "lucide-react";

const jobcard = ({
  job,
  isMyJob = false,
  savedInt = false,
  onJobSaved = () => {},
}) => {
  const { user } = useUser();

  return (
    <Card>
      <CardHeader>
         <CardTitle>{job.title}</CardTitle>
      </CardHeader>
    </Card>
  );
};

export default jobcard;
