import React from 'react'
import './../App.css'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel'
import companies from '../data/companies.json'
import Autoplay from 'embla-carousel-autoplay'

const Startpage = () => {
  return (
   <main className=' flex flex-col gap-10 sm:gap-20 py-20 sm:py-20'>
     <section className=' text-center'>
       <h1 className=' flex flex-col  items-center justify-center gradient-title text-3xl font-extrabold sm:text-6xl lg:text-6xl'> 
       Find Your Dream Job{""}
       <span className=' flex items-center gap-3 sm:gap-6'>
       And Get{""}
        <span className=' text-indigo-400 underline'> Hired</span>
        </span> 
        </h1>
        <p className=' text-gray-300 sm:mt-4 md:mt-4 lg:mt-6 text-xs sm:text-xl'>
        Discover a multitude of job opportunities or identify the ideal candidate.
        </p>
     </section>

     <div className=' flex gap-6  justify-center'>
         {/* buttons */}

         <Link to='/jobs'>
            <Button variant="blue" size="xl">Find Jobs</Button>
         </Link>

         <Link to='/postjob'>
            <Button variant="destructive" size="xl">Post Job</Button>
         </Link>
       
    </div>
          {/* carousel */}
          <Carousel
          plugins={[Autoplay({ delay: 2000 })]}
          className="w-full py-10">
            <CarouselContent className=" flex gap-5 sm:gap-20 items-center">
              {companies.map(({ name, id, path }) => {
                return (
                  <CarouselItem key={id} className=" basis-1/3 lg:basis-1/6">
                    <img 
                    src={path} 
                    alt={name} 
                    className=' h-9 sm:h-14 object-contain' 
                    />
                  </CarouselItem>
                )
              })}
            </CarouselContent>
          </Carousel>
        {/* banner */}
        <img src="./banner.jpg" className='w-full' alt="" />
        
       <section>
       
       </section>

       {/* Accordian */}
   </main>
  )
}

export default Startpage