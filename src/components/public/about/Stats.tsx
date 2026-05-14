'use client'
import React from 'react'
import { useInView } from '@/hooks/useInView'

const stats = [
    { value: '26', label: 'Hand-picked homes' },
    { value: '5', label: 'Lagos neighborhoods' },
    { value: '4hr', label: 'Median reply time' },
    { value: '100%', label: 'Vetted in-person' },
]

const Stats = () => {
    const { ref, visible } = useInView<HTMLDivElement>()

  return (
    <div ref={ref} className='bg-cream-100 px-5 tny:px-6 sm:px-8 lg:px-12 py-16 md:py-20 border-y border-cream-300'>
        <div className='grid grid-cols-2 md:grid-cols-4 gap-y-12 md:gap-x-8 max-w-6xl mx-auto'>
            {stats.map((stat, i) => (
                <div
                    key={stat.label}
                    className={`text-center md:text-left ${visible ? '' : 'opacity-0'}`}
                    style={{
                        animation: visible
                            ? `fade-in-up 0.7s cubic-bezier(0.22, 0.61, 0.36, 1) ${i * 100}ms backwards`
                            : undefined,
                    }}
                >
                    <p className='font-heading text-5xl md:text-6xl text-ink-900 leading-none mb-3'>
                        {stat.value}
                    </p>
                    <p className='text-sm text-ink-500 uppercase tracking-[0.12em]'>
                        {stat.label}
                    </p>
                </div>
            ))}
        </div>
    </div>
  )
}

export default Stats
