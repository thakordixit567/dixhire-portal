import { getJobs } from "@/api/apiJobs";
import useFetch from "@/hooks/usefetch";
import { useUser } from "@clerk/clerk-react";
import { useEffect, useState } from "react";
import { BarLoader } from "react-spinners";
import Jobcard from "@/components/jobcard";
import { getCompanies } from "@/api/apiCompanies";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { City, State, Country } from "country-state-city";

const joblisting = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [location, setLocation] = useState("");
  const [company_id, setCompany_id] = useState("");
  const { isLoaded } = useUser();

  const {
    fn: fnJobs,
    data: jobs,
    loading: loadingJobs,
  } = useFetch(getJobs, {
    location,
    company_id,
    searchQuery,
  });

  const {
    // loading: loadingCompanies,
    data: companies,
    fn: fnCompanies,
  } = useFetch(getCompanies);

  useEffect(() => {
    if (isLoaded) fnCompanies();
  }, [isLoaded]);

  useEffect(() => {
    if (isLoaded) fnJobs();
  }, [isLoaded, location, searchQuery, company_id]);

  const hanldeSearch = (e) => {
    e.preventDefault();
    let formData = new FormData(e.target);

    const query = formData.get("search-query");
    if (query) setSearchQuery(query);
  };

  if (!isLoaded) {
    return <BarLoader className="mb-4" width={"100%"} color="#36d7b7" />;
  }

  return (
    <div>
      <h1 className=" font-doto gradient-title text-red-400 font-extrabold text-6xl sm:text-7xl text-center pb-8 ">
        Latest Jobs
      </h1>

      <form
        onSubmit={hanldeSearch}
        className=" h-12 flex w-full gap-2 items-center mb-3"
      >
        <Input
          type="text"
          placeholder="Search Jobs By Title...."
          name="search-query"
          className=" font-extrabold flex-1 px-4 text-md "
        />
        <Button type="submit" className="  h-full sm:w-28" variant="blue">
          Search
        </Button>
      </form>

      <div>
        <Select value={location} onValueChange={(value) => setLocation(value)}>
          <SelectTrigger>
            <SelectValue
              className=" font-sourgammy"
              placeholder="Filter By Location"
            />
          </SelectTrigger>
          <SelectContent className=" font-sourgammy">
            <SelectGroup>
              {State.getStatesOfCountry("IN").map(({name}) => {
              return (
                <SelectItem key={name} value={name}>{name}</SelectItem>
              );
              })}
            </SelectGroup>
          </SelectContent>
        </Select>

        <Select
        value={company_id}
        onValueChange={(value) => setCompany_id(value)}
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
      <Button variant="destructive" className=" sm:w-1/2">
        Clear Filters
      </Button>
      </div>

      {loadingJobs && (
        <BarLoader className="mt-4" width={"100%"} color="#36d7b7" />
      )}

      {loadingJobs == false && (
        <div className="  mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {jobs?.length ? (
            jobs.map((job) => {
              return (
                <Jobcard
                  key={job.id}
                  job={job}
                  savedInit={job?.saved?.length > 0}
                />
              );
            })
          ) : (
            <div> No Jobs Found😖</div>
          )}
        </div>
      )}
    </div>
  );
};

export default joblisting;
