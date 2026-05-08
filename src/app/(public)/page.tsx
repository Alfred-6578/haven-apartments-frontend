import React from 'react'
import Hero from '@/components/public/landingPage/Hero'
import About from '@/components/public/landingPage/About'
import Marquee from '@/components/public/landingPage/Marquee'
import ProductListing from '@/components/public/landingPage/ProductListing'
import Standards from '@/components/public/landingPage/Standards'
import Testimonial from '@/components/public/landingPage/Testimonial'
import Cta from '@/components/public/landingPage/Cta'

const HomePage = () => {
  return (
    <div className=''>
        <Hero/>
        <About/>
        <Marquee />
        <ProductListing />
        <Standards />
        <Testimonial />
        <Cta />
    </div>
  )
}

export default HomePage