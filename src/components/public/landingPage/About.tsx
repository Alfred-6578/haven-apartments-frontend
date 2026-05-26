'use client'
import React from 'react'
import { FiArrowRight } from 'react-icons/fi'
import Image from 'next/image'
import { useInView } from '@/hooks/useInView'

const About = () => {
  const { ref, visible } = useInView<HTMLElement>()

  return (
    <section
        ref={ref}
        className='max-lg:flex-col flex justify-between gap-10 px-5 tny:px-6 sm:px-8 lg:px-12 py-26 bg-cream-100'
    >
        <div className="space-y-6 md:space-y-8 lg:mt-7">
            {/* Small uppercase label */}
            <span className={`block text-xs font-medium uppercase tracking-[0.15em] text-ink-500 ${visible ? 'about-eyebrow-reveal' : 'opacity-0'}`}>
                A different kind of stay
            </span>

            {/* Headline in Fraunces, with italic emphasis */}
            <h2 className={`font-heading text-4xl md:text-5xl lg:text-[50px] text-ink-900 leading-[1.1] ${visible ? 'about-headline-reveal' : 'opacity-0'}`}>
                Most shortlets are listings.
                <br />
                Ours are <em className="italic">decisions.</em>
            </h2>

            {/* Body paragraph */}
            <p className={`text-ink-700 text-lg leading-relaxed lg:max-w-lg ${visible ? 'about-body-reveal' : 'opacity-0'}`}>
                We pick the spaces we'd stay in ourselves — quiet streets, considered design, hosts who answer when something matters. Twenty-six homes, hand-picked. All bookable tonight.
            </p>

            {/* Pill CTA */}
            <a
                href="/about"
                className={`inline-flex items-center gap-2 px-5 py-3 bg-ink-900 text-cream-50 rounded-full text-sm font-medium hover:bg-emerald-700 transition-colors ${visible ? 'about-cta-reveal' : 'opacity-0'}`}
            >
                <span>Read our story</span>
                <FiArrowRight />
            </a>
        </div>
        <div className={`aspect-[4/5] md:aspect-[3/2.5] xl:w-[49%] w-full rounded-2xl overflow-hidden ${visible ? 'about-image-reveal' : 'opacity-0'}`}>
            <Image
                src={require('@/assets/images/section-2.jpg')}
                alt=""
                width={800}
                height={1000}
                className="w-full h-full object-cover"
            />
        </div>
    </section>
  )
}

export default About