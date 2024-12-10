import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { State } from "country-state-city";
import { getCompanies } from "@/api/apiCompanies";
import useFetch from "@/hooks/usefetch";
import { useUser } from "@clerk/clerk-react";
import { BarLoader } from "react-spinners";

const schema = z.object({
  title: z.string().min(1, { message: "Tile Is Require" }),
  description: z.string().min(1, { message: "Description Is Require" }),
  location: z.string().min(1, { message: "Choose A Location" }),
  company_id: z.string().min(1, { message: "Select Or Add New Company" }),
  requirements: z.string().min(1, { message: "Requirments Are Require" }),
});

const postjob = () => {
 
  const { isLoaded, user} = useUser();

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      location: "",
      company_id: "",
      requirements: "",
    },
    resolver: zodResolver(schema),
  });

  const {
    loading: loadingCompanies,
    data: companies,
    fn: fnCompanies,
    lo
  } = useFetch(getCompanies);

  useEffect(() => {
    if (isLoaded) fnCompanies();
  }, [isLoaded]);

  if (!isLoaded || loadingCompanies) {
    return <BarLoader className="mb-4" width={"100%"} color="#36d7b7" />;
  }

  return (
    <div>
      <h1 className=" gradient-title font-doto font-extrabold pb-8 text-center text-5xl sm:text-6xl">
        Post A Job
      </h1>

      <form>
        <Input placeholder="Job Title" {...register("title")} />
        {errors.title && (
          <p className=" text-red-500"> {errors.title.message} </p>
        )}
      </form>

      <Textarea placeholder="Job Description" {...register("description")} />
      {errors.description && (
        <p className="text-red-500">{errors.description.message}</p>
      )}

      <Select 
      //value={location} 
      //onValueChange={(value) => setLocation(value)}
      >
        <SelectTrigger>
          <SelectValue
            className=" font-sourgammy"
            placeholder="Filter By Location"
          />
        </SelectTrigger>
        <SelectContent className=" font-sourgammy">
          <SelectGroup>
            {State.getStatesOfCountry("IN").map(({ name }) => {
              return (
                <SelectItem key={name} value={name}>
                  {name}
                </SelectItem>
              );
            })}
          </SelectGroup>
        </SelectContent>
      </Select>

      <Select
        //value={company_id}
       // onValueChange={(value) => setCompany_id(value)}
      >
        <SelectTrigger>
          <SelectValue placeholder="Filter by Company" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {companies?.map(({ name, id }) => {
              return (
                <SelectItem key={name} value={id}>
                  {name}
                </SelectItem>
              );
            })}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default postjob;
