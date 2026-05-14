import AboutHero from '@/components/public/about/AboutHero'
import OurStory from '@/components/public/about/OurStory'
import Stats from '@/components/public/about/Stats'
import Principles from '@/components/public/about/Principles'
import AboutCta from '@/components/public/about/AboutCta'
import React from 'react'

const AboutPage = () => {
  return (
    <div>
        <AboutHero />
        <OurStory />
        <Stats />
        <Principles />
        <AboutCta />
    </div>
  )
}

export default AboutPage
