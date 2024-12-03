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

const ApplyJobDrawer = ({ user, jobs, fetchJob, applied = false }) => {
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

        <form className=" flex flex-col gap-4 p-4 pb-0">
          <Input
            type="number"
            placeholder="Years Of Experiance"
            className=" flex-1"
          />
          <Input
            type="text"
            placeholder="Skills (Comma Seprated)"
            className=" flex-1"
          />
        </form>

        <DrawerFooter>
          <Button>Submit</Button>
          <DrawerClose>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default ApplyJobDrawer;
