'use client'
import React from 'react'
import { properties } from '@/data/properties'
import ProductCard from '@/components/ui/ProductCard'
import { useInView } from '@/hooks/useInView'

const SimilarStays = ({ currentSlug }: { currentSlug: string }) => {
    const { ref, visible } = useInView<HTMLDivElement>()
    const similarStays = properties.filter(p => p.slug !== currentSlug).slice(0, 3)

    return (
        <div ref={ref} className='px-5 tny:px-6 sm:px-8 lg:px-12 py-16 md:py-24 bg-cream-100 border-t border-cream-300'>
            <div className='mb-10 md:mb-12 max-w-7xl mx-auto'>
                <span className={`block text-xs font-medium uppercase tracking-[0.15em] text-ink-500 mb-2 ${visible ? 'about-eyebrow-reveal' : 'opacity-0'}`}>
                    You might also like
                </span>
                <h2 className={`font-heading text-3xl md:text-4xl text-ink-900 leading-tight ${visible ? 'about-headline-reveal' : 'opacity-0'}`}>
                    Other <em className='italic'>quiet</em> picks.
                </h2>
            </div>
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-7xl mx-auto'>
                {similarStays.map((p, i) => (
                    <ProductCard
                        key={p.slug}
                        {...p}
                        visible={visible}
                        index={i}
                        link={`/stays/${p.slug}`}
                    />
                ))}
            </div>
        </div>
    )
}

export default SimilarStays
