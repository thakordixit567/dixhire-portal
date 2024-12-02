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
} from "@/components/ui/drawer"
import { Button } from "./ui/button";


const ApplyJobDrawer = ({ user, jobs, fetchJob, applied = false}) => {
  return (

    <Drawer open={applied ? false : undefined}>
  <DrawerTrigger>
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
      <DrawerTitle>Are you absolutely sure?</DrawerTitle>
      <DrawerDescription>This action cannot be undone.</DrawerDescription>
    </DrawerHeader>
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
