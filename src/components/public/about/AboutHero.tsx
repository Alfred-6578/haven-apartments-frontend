'use client'
import React from 'react'
import Image from 'next/image'

const AboutHero = () => {
  return (
    <section className='relative w-full h-[58vh] min-h-[480px]'>
        <div className="absolute inset-0 overflow-hidden">
            <div className="absolute inset-0">
                <Image
                    src={require('@/assets/images/haven-homes-hero-img.jpg')}
                    alt='Inside a Haven home'
                    fill
                    placeholder='blur'
                    sizes='100vw'
                    className='object-cover animate-kenburns'
                    style={{ objectPosition: 'center 55%' }}
                    priority
                />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-ink-900 via-ink-900/55 to-ink-900/65" />
        </div>

        <div className="relative w-full h-full flex flex-col items-center justify-center px-5 tny:px-6 sm:px-8 lg:px-12">
            <span className='about-hero-eyebrow-reveal block text-xs uppercase tracking-[0.2em] text-cream-200/70 mb-5'>
                Who we are
            </span>
            <h1 className='about-hero-headline-reveal font-heading text-[34px] xsm:text-4xl max-tny:leading-10 tny:text-[44px] md:text-6xl text-center font-semibold text-cream-50 max-w-3xl leading-[1.05]'>
                Every home. <em className='italic'>One</em> standard.
            </h1>
            <p className='about-hero-subtitle-reveal text-cream-200/75 text-s max-w-2xl text-center mt-6 leading-relaxed'>
                Haven Homes is a small Nigerian company. We pick the apartments we'd book ourselves — then we make sure they actually deliver on the photos.
            </p>
        </div>
    </section>
  )
}

export default AboutHero
