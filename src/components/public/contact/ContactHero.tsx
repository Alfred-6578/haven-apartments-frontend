'use client'
import React from 'react'

const ContactHero = () => {
  return (
    <section className='relative bg-ink-900 px-5 tny:px-6 sm:px-8 lg:px-12 pt-36 md:pt-44 pb-20 md:pb-24 text-center overflow-hidden'>
        {/* Subtle radial wash to lift the type */}
        <div
            className='absolute inset-0 pointer-events-none opacity-60'
            style={{
                background:
                    'radial-gradient(ellipse at top, rgba(45,74,62,0.25) 0%, rgba(26,22,20,0) 55%)',
            }}
            aria-hidden
        />
        <div className='relative'>
            <span className='contact-hero-eyebrow-reveal block text-xs uppercase tracking-[0.2em] text-cream-200/60 mb-5'>
                Get in touch
            </span>
            <h1 className='contact-hero-headline-reveal font-heading text-4xl xsm:text-5xl tny:text-[56px] md:text-7xl font-semibold text-cream-50 max-w-3xl mx-auto leading-[1.05]'>
                Tell us what you <em className='italic'>need.</em>
            </h1>
            <p className='contact-hero-subtitle-reveal text-cream-200/70 text-lg leading-relaxed max-w-2xl mx-auto mt-6'>
                Booking question, host inquiry, or something we haven't thought of — we'd rather hear from you than not.
            </p>
        </div>
    </section>
  )
}

export default ContactHero
