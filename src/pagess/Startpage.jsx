import React from "react";
import "./../App.css";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import companies from "../data/companies.json";
import faqs from "../data/faq.json";
import Autoplay from "embla-carousel-autoplay";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const Startpage = () => {
  return (
    <main className=" flex flex-col gap-10 sm:gap-20 py-20 sm:py-20">
      <section className=" text-center">
        <h1 className=" flex flex-col  items-center justify-center gradient-title text-3xl font-extrabold sm:text-6xl lg:text-6xl">
          Find Your Dream Job{""}
          <span className=" flex items-center gap-3 sm:gap-6">
            And Get{""}
            <span className=" text-indigo-400 underline"> Hired</span>
          </span>
        </h1>
        <p className=" text-gray-300 sm:mt-4 md:mt-4 lg:mt-6 text-xs sm:text-xl">
          Discover a multitude of job opportunities or identify the ideal
          candidate.
        </p>
      </section>

      <div className=" flex gap-6  justify-center">
        {/* buttons */}

        <Link to="/jobs">
          <Button variant="blue" size="xl">
            Find Jobs
          </Button>
        </Link>

        <Link to="/postjob">
          <Button variant="destructive" size="xl">
            Post Job
          </Button>
        </Link>
      </div>
      {/* carousel */}
      <Carousel plugins={[Autoplay({ delay: 2000 })]} className="w-full py-10">
        <CarouselContent className=" flex gap-5 sm:gap-20 items-center">
          {companies.map(({ name, id, path }) => {
            return (
              <CarouselItem key={id} className=" basis-1/3 lg:basis-1/6">
                <img
                  src={path}
                  alt={name}
                  className=" h-9 sm:h-14 object-contain"
                />
              </CarouselItem>
            );
          })}
        </CarouselContent>
      </Carousel>
      {/* banner */}
      <img src="./banner.jpg" className="w-full" alt="" />

      <section className=" grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>For Job Seekers</CardTitle>
          </CardHeader>
          <CardContent className=" font-semibold">
            Explore job openings and submit your applications, keep track of
            your application progress, and participate in various other tasks
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>For Employers</CardTitle>
          </CardHeader>
          <CardContent className=" font-semibold">
            Publish job listings, coordinate application management, and select
            the top candidates.
          </CardContent>
        </Card>
      </section>

      {/* Accordian */}
      <Accordion type="single" collapsible>
          {faqs.map((faq, index)=>{
            return (
              <AccordionItem key={index} value={`item-${index+1}`}>
            <AccordionTrigger>{faq.question}</AccordionTrigger>
            <AccordionContent>
            {faq.answer}
            </AccordionContent>
          </AccordionItem>
            )
          })}
        
      </Accordion>
    </main>
  );
};

export default Startpage;
