'use client'
import standards from '@/data/standards'
import Link from 'next/link'
import React, { useRef, useState } from 'react'
import { FiArrowRight } from 'react-icons/fi'
import StandardsCard from './StandardsCard'
import { useInView } from '@/hooks/useInView'

const Standards = () => {
    const [activeIndex, setActiveIndex] = useState<number>(2)
    const { ref, visible } = useInView<HTMLDivElement>()

    const [mobileIndex, setMobileIndex] = useState(0)
    const touchStartX = useRef(0)
    const touchEndX = useRef(0)

    const handleTouchStart = (e: React.TouchEvent) => {
        touchStartX.current = e.touches[0].clientX
    }
    const handleTouchMove = (e: React.TouchEvent) => {
        touchEndX.current = e.touches[0].clientX
    }
    const handleTouchEnd = () => {
        const diff = touchStartX.current - touchEndX.current
        if (Math.abs(diff) < 50) return
        if (diff > 0 && mobileIndex < standards.length - 1) setMobileIndex(prev => prev + 1)
        if (diff < 0 && mobileIndex > 0) setMobileIndex(prev => prev - 1)
    }

  return (
    <div ref={ref} className='px-5 tny:px-6 sm:px-8 lg:px-12 py-12 md:py-16'>
        <div className="flex max-md:flex-col justify-between  md:items-center mb-8 md:mb-16 gap-6">
            <div className="">
                <span className={`block text-ink-500 text-sm ${visible ? 'standards-eyebrow-reveal' : 'opacity-0'}`}>
                    STANDARDS
                </span>
                <h2 className={`mb-3 mt-1 text-4xl sm:text-5xl  font-heading text-ink-900 ${visible ? 'standards-headline-reveal' : 'opacity-0'}`}>
                    What's in every Haven Home.
                </h2>
                <p className={`max-w-lg ${visible ? 'standards-body-reveal' : 'opacity-0'}`}>
                    The same care, the same checks, regardless of which one you book.
                </p>
            </div>
            <div className={`md:text-center ${visible ? 'standards-cta-reveal' : 'opacity-0'}`}>
                <Link
                    href="/stays"
                    className="inline-flex items-center gap-2 text-ink-700 hover:text-emerald-700 transition-colors group"
                >
                    <span className="text-sm font-medium">Explore More</span>
                    <FiArrowRight className="transition-transform group-hover:translate-x-1" />
                </Link>
            </div>
        </div>
        <div className="hidden md:flex gap-3 mt-10">
            {
                standards.map((standard, i)=>(
                    <StandardsCard
                        key={i}
                        tag={standard.tag}
                        title={standard.title}
                        description={standard.description}
                        image={standard.image}
                        isActive={activeIndex === i}
                        onHover={()=> setActiveIndex(i)}
                        visible={visible}
                        index={i}
                    />
                ))
            }
        </div>
        <div
            className={`md:hidden mt-8 ${visible ? '' : 'opacity-0'}`}
            style={{
                animation: visible
                    ? `fade-in-up 0.8s cubic-bezier(0.22, 0.61, 0.36, 1) 0.7s backwards`
                    : undefined,
            }}
        >
            <div
                className="overflow-hidden rounded-2xl"
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
            >
                <StandardsCard
                    {...standards[mobileIndex]}
                    isActive={true}
                    onHover={() => {}}
                    onLeave={() => {}}
                />

            </div>
            <div className="flex justify-center gap-2 mt-4">
            {standards.map((_, i) => (
                <button
                key={i}
                onClick={() => setMobileIndex(i)}
                className={`h-1.5 rounded-full transition-all duration-300 ${i === mobileIndex ? 'w-6 bg-ink-700' : 'w-1.5 bg-ink-200'}`}
                />
            ))}
            </div>
        </div>
    </div>
  )
}

export default Standards