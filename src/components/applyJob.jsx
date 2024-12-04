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

const schema = z.object({
  
})

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
          <RadioGroup defaultValue="option-one">
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
          <Input
          type="file"
          accept=".pdf, .doc, .docx"
          className=" flex-1 file:text-gray-200"
        />
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
