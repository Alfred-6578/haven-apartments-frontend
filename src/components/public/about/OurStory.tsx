'use client'
import React from 'react'
import Image from 'next/image'
import { useInView } from '@/hooks/useInView'

const OurStory = () => {
  const { ref, visible } = useInView<HTMLElement>()

  return (
    <section
        ref={ref}
        className='max-lg:flex-col flex flex-row-reverse justify-between gap-10 px-5 tny:px-6 sm:px-8 lg:px-12 py-20 md:py-26 bg-cream-50'
    >
        <div className="space-y-6 md:space-y-7 lg:mt-4 lg:max-w-[610px]">
            <span className={`block text-xs font-medium uppercase tracking-[0.15em] text-ink-500 ${visible ? 'about-eyebrow-reveal' : 'opacity-0'}`}>
                Our story
            </span>

            <h2 className={`font-heading text-4xl md:text-5xl lg:text-[50px] text-ink-900 leading-[1.08] ${visible ? 'about-headline-reveal' : 'opacity-0'}`}>
                It started with a <em className='italic'>refused</em> couch.
            </h2>

            <div className={`space-y-5 text-ink-700 text-lg leading-relaxed ${visible ? 'about-body-reveal' : 'opacity-0'}`}>
                <p>
                    In 2023, a friend booked a Lekki shortlet from photos. The couch in the actual flat was cracked leather, not the linen one in the listing. The wifi was a phone hotspot. The host stopped replying at 11pm.
                </p>
                <p>
                    We kept thinking — how is this normal? Lagos has beautiful homes. The pictures aren't the problem. The promise is.
                </p>
                <p>
                    So we started Haven Homes. We sleep in every home before listing it. We pick the host, not just the place. And we say no to most of what we see.
                </p>
            </div>
        </div>
        <div className={`aspect-[4/4] md:aspect-[3/2.5] lg:aspect-[4/4] xl:w-[46%] w-full rounded-2xl overflow-hidden ${visible ? 'about-image-reveal' : 'opacity-0'}`}>
            <Image
                src={require('@/assets/images/standard-host.jpeg')}
                alt="A Haven host welcoming a guest"
                width={800}
                height={1000}
                className='w-full h-full object-cover'
            />
        </div>
    </section>
  )
}

export default OurStory
