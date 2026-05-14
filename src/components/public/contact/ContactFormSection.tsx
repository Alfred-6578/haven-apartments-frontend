'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import { FiArrowRight } from 'react-icons/fi'
import { useInView } from '@/hooks/useInView'

const topics = [
    { value: 'booking', label: 'A booking question' },
    { value: 'hosting', label: 'Listing my home with you' },
    { value: 'press', label: 'Press or partnership' },
    { value: 'other', label: 'Something else' },
]

const ContactFormSection = () => {
    const { ref, visible } = useInView<HTMLDivElement>()
    const [topic, setTopic] = useState('booking')

  return (
    <div ref={ref} className='px-5 tny:px-6 sm:px-8 lg:px-12 py-20 md:py-26 bg-cream-100 border-t border-cream-300'>
        <div className='grid lg:grid-cols-[1.4fr_1fr] gap-12 lg:gap-20 max-w-6xl mx-auto'>
            {/* Form */}
            <div className={visible ? 'about-body-reveal' : 'opacity-0'}>
                <span className={`block text-xs font-medium uppercase tracking-[0.15em] text-ink-500 mb-3 ${visible ? 'about-eyebrow-reveal' : 'opacity-0'}`}>
                    Send us a note
                </span>
                <h2 className={`font-heading text-3xl md:text-4xl text-ink-900 leading-tight mb-8 ${visible ? 'about-headline-reveal' : 'opacity-0'}`}>
                    Write to us, <em className='italic'>plainly.</em>
                </h2>

                <form className='space-y-5' onSubmit={(e) => e.preventDefault()}>
                    <div className='grid sm:grid-cols-2 gap-5'>
                        <label className='block'>
                            <span className='block text-xs uppercase tracking-[0.12em] text-ink-500 mb-2'>Name</span>
                            <input
                                type='text'
                                required
                                placeholder='Your name'
                                className='w-full bg-cream-50 border border-cream-300 rounded-xl px-4 py-3 text-ink-900 placeholder:text-ink-300 focus:outline-none focus:border-ink-700 transition-colors'
                            />
                        </label>
                        <label className='block'>
                            <span className='block text-xs uppercase tracking-[0.12em] text-ink-500 mb-2'>Email</span>
                            <input
                                type='email'
                                required
                                placeholder='you@example.com'
                                className='w-full bg-cream-50 border border-cream-300 rounded-xl px-4 py-3 text-ink-900 placeholder:text-ink-300 focus:outline-none focus:border-ink-700 transition-colors'
                            />
                        </label>
                    </div>

                    <div>
                        <span className='block text-xs uppercase tracking-[0.12em] text-ink-500 mb-3'>I'm reaching out about</span>
                        <div className='flex flex-wrap gap-2'>
                            {topics.map(t => (
                                <button
                                    type='button'
                                    key={t.value}
                                    onClick={() => setTopic(t.value)}
                                    className={`px-4 py-2 text-sm rounded-full transition-colors cursor-pointer ${topic === t.value ? 'bg-ink-900 text-cream-50' : 'bg-cream-50 text-ink-700 border border-cream-300 hover:border-ink-400'}`}
                                >
                                    {t.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    <label className='block'>
                        <span className='block text-xs uppercase tracking-[0.12em] text-ink-500 mb-2'>Message</span>
                        <textarea
                            required
                            rows={6}
                            placeholder="Tell us what you're after — dates, neighborhood, the kind of place that would feel right."
                            className='w-full bg-cream-50 border border-cream-300 rounded-xl px-4 py-3 text-ink-900 placeholder:text-ink-300 focus:outline-none focus:border-ink-700 transition-colors resize-none'
                        />
                    </label>

                    <button
                        type='submit'
                        className='group inline-flex items-center gap-2 bg-ink-900 hover:bg-emerald-700 text-cream-50 font-medium px-7 py-3.5 rounded-full transition-colors cursor-pointer'
                    >
                        Send note
                        <FiArrowRight className='transition-transform group-hover:translate-x-1' />
                    </button>
                </form>
            </div>

            {/* Sidebar */}
            <aside className={`space-y-10 lg:pt-12 ${visible ? '' : 'opacity-0'}`} style={{
                animation: visible
                    ? 'fade-in-up 0.8s cubic-bezier(0.22, 0.61, 0.36, 1) 0.3s backwards'
                    : undefined,
            }}>
                <div className='border-l-2 border-cream-300 pl-5'>
                    <span className='block text-xs uppercase tracking-[0.15em] text-ink-500 mb-2'>Office</span>
                    <p className='text-ink-900 leading-relaxed'>
                        14b Admiralty Way<br />
                        Lekki Phase 1, Lagos<br />
                        <span className='text-ink-500 text-sm'>By appointment only</span>
                    </p>
                </div>

                <div className='border-l-2 border-cream-300 pl-5'>
                    <span className='block text-xs uppercase tracking-[0.15em] text-ink-500 mb-2'>Hours</span>
                    <p className='text-ink-900 leading-relaxed'>
                        Mon–Sun, 8am – 10pm WAT<br />
                        <span className='text-ink-500 text-sm'>Median reply under 4 hours</span>
                    </p>
                </div>

                <div className='border-l-2 border-cream-300 pl-5'>
                    <span className='block text-xs uppercase tracking-[0.15em] text-ink-500 mb-2'>For hosts</span>
                    <p className='text-ink-700 leading-relaxed mb-3'>
                        Wondering if your home is a fit? We have a short form for that.
                    </p>
                    <Link
                        href='/host'
                        className='inline-flex items-center gap-2 text-ink-900 hover:text-emerald-700 text-sm font-medium transition-colors group'
                    >
                        List your home
                        <FiArrowRight className='transition-transform group-hover:translate-x-1' />
                    </Link>
                </div>
            </aside>
        </div>
    </div>
  )
}

export default ContactFormSection
