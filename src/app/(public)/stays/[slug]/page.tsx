'use client'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { FiArrowRight } from 'react-icons/fi'
import { properties } from '@/data/properties'
import type { ProductCardProps } from '@/types/properties'
import StayGallery from '@/components/public/stays/detail/StayGallery'
import StayHeader from '@/components/public/stays/detail/StayHeader'
import StayAmenities from '@/components/public/stays/detail/StayAmenities'
import StayHouseRules from '@/components/public/stays/detail/StayHouseRules'
import StayBookingCard from '@/components/public/stays/detail/StayBookingCard'
import SimilarStays from '@/components/public/stays/detail/SimilarStays'

const StayDetails = () => {
    const params = useParams()
    const slug = typeof params?.slug === 'string' ? params.slug : ''

    const [stay, setStay] = useState<ProductCardProps | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const foundStay = properties.find(p => p.slug === slug)
        setStay(foundStay ?? null)
        setLoading(false)
    }, [slug])

    if (loading) {
        return (
            <div className='min-h-[60vh] flex items-center justify-center'>
                <p className='text-ink-400 text-sm tracking-wider uppercase'>Loading…</p>
            </div>
        )
    }

    if (!stay) {
        return (
            <div className='px-5 tny:px-6 sm:px-8 lg:px-12 pt-40 pb-32 text-center min-h-[70vh]'>
                <span className='block text-xs uppercase tracking-[0.2em] text-ink-500 mb-4'>404</span>
                <h1 className='font-heading text-4xl md:text-5xl text-ink-900 mb-6 leading-tight'>
                    We couldn't find that <em className='italic'>home.</em>
                </h1>
                <p className='text-ink-700 mb-8 max-w-md mx-auto'>
                    It might have been booked, paused, or simply never existed. The full shortlist is one click away.
                </p>
                <Link
                    href='/stays'
                    className='inline-flex items-center gap-2 bg-ink-900 hover:bg-emerald-700 text-cream-50 px-6 py-3 rounded-full transition-colors font-medium'
                >
                    Browse all stays <FiArrowRight />
                </Link>
            </div>
        )
    }

    return (
        <div>
            <div className='pt-24 md:pt-28 pb-16 px-5 tny:px-6 sm:px-8 lg:px-12'>
                <nav className='stay-breadcrumb-reveal flex gap-2 mb-5 text-sm'>
                    <Link className='text-ink-400 hover:text-ink-800 transition-colors' href='/'>
                        Home
                    </Link>
                    <span className='text-ink-300'>›</span>
                    <Link className='text-ink-400 hover:text-ink-800 transition-colors' href='/stays'>
                        Stays
                    </Link>
                    <span className='text-ink-300'>›</span>
                    <span className='text-ink-900 font-medium truncate'>{stay.name}</span>
                </nav>

                <StayGallery stay={stay} />

                <div className='mt-10 md:mt-14 grid lg:grid-cols-[1.55fr_1fr] gap-10 lg:gap-16'>
                    <div>
                        <StayHeader stay={stay} />
                        <StayAmenities />
                        <StayHouseRules />
                    </div>
                    <StayBookingCard stay={stay} />
                </div>
            </div>

            <SimilarStays currentSlug={stay.slug} />
        </div>
    )
}

export default StayDetails
