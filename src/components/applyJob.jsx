import React from "react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";
import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import useFetch from "@/hooks/usefetch";
import { getApplyJob } from "@/api/apiApplications";
import { BarLoader } from "react-spinners";

const schema = z.object({
  experience: z
    .number()
    .min(0, { message: "Experience must be at lwast 0" })
    .int(),
  skills: z.string().min(1, { message: "Skills are required" }),
  education: z.enum(["Intermediate", "Graduate", "Post Graduate"], {
    message: "Education Is Required",
  }),
  resume: z
    .any()
    .refine(
      (file) =>
        file[0] &&
        (file[0].type === "application/pdf" ||
          file[0].type === "application/msword"),
      { message: "Only PDF or Word documents are allowed" }
    ),
});

const ApplyJobDrawer = ({ user, jobs, fetchJob, applied = false }) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(schema),
  });

   const {
    loading: applyLoading,
    error: applyError,
    fn: fnApply,
   } = useFetch(getApplyJob)

   const onSubmit = (data) => {
       fnApply({
        ...data,
        job_id: jobs.id,
        candidate_id: user.id,
        name: user.fullName,
        status: "applied",
        resume: data.resume[0],
       }).then(() => {
        fetchJob();
        reset();
       })
   }

  return (
    <Drawer open={applied ? false : undefined}>
      <DrawerTrigger asChild>
        <Button
          variant={jobs?.isOpen && !applied ? "blue" : "destructive"}
          disabled={!jobs?.isOpen || applied}
          size="lg"
        >
          {jobs?.isOpen ? (applied ? "Applied" : "Apply") : "Hiring Closed"}
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>
            Apply For {jobs?.title} at {jobs?.company?.name}
          </DrawerTitle>
          <DrawerDescription>Please Fill Up The below form.</DrawerDescription>
        </DrawerHeader>

        <form onSubmit={handleSubmit(onSubmit)} className=" flex flex-col gap-4 p-4 pb-0">
          <Input
            type="number"
            placeholder="Years Of Experiance"
            className=" flex-1"
            {...register("experience", {
              valueAsNumber: true,
            })}
          />

          {errors.experience && (
            <p className=" text-red-500">{errors.experience.message}</p>
          )}

          <Input
            type="text"
            placeholder="Skills (Comma Seprated)"
            className=" flex-1"
            {...register("skills")}
          />

          {errors.skills && (
            <p className=" text-red-500">{errors.skills.message}</p>
          )}

          <Controller
            name="education"
            control={control}
            render={({ field }) => (
              <RadioGroup
              onValueChange={field.onChange}
             {...field}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Intermediate" id="intermediate" />
                  <Label htmlFor="intermediate">Intermediate</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Graduate" id="graduate" />
                  <Label htmlFor="graduate">Graduate</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Post Graduate" id="post graduate" />
                  <Label htmlFor="post graduate">Post Graduate</Label>
                </div>
              </RadioGroup>
            )}
          />
           {errors.education && (
            <p className=" text-red-500">{errors.education.message}</p>
          )}


          <Input
            type="file"
            accept=".pdf, .doc, .docx"
            className=" flex-1 file:text-gray-200"
            {...register("resume")}
          />
           {errors.resume && (
            <p className=" text-red-500">{errors.resume.message}</p>
          )}

           {applyError?.message && (
            <p className=" text-red-500">{applyError?.message}</p>
          )}

          {applyLoading && <BarLoader className="mb-4" width={"100%"} color="#36d7b7" />}

          <Button type="submit" variant="blue" size="lg">
            Apply
          </Button>
        </form>

        <DrawerFooter>
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default ApplyJobDrawer;
