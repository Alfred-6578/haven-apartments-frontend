'use client'
import React, { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { useParams, useSearchParams } from 'next/navigation'
import { FiArrowRight } from 'react-icons/fi'
import { properties } from '@/data/properties'
import type { ProductCardProps } from '@/types/properties'
import BookingHero from '@/components/public/bookings/BookingHero'
import BookingTripCard from '@/components/public/bookings/BookingTripCard'
import WhatsNext from '@/components/public/bookings/WhatsNext'
import SaveForNextTime from '@/components/public/bookings/SaveForNextTime'

const BookingConfirmationPage = () => {
    const params = useParams()
    const searchParams = useSearchParams()
    const reference = typeof params?.ref === 'string' ? params.ref : ''
    const staySlug = searchParams.get('stay') ?? ''

    const [stay, setStay] = useState<ProductCardProps | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const foundStay = properties.find(p => p.slug === staySlug)
        setStay(foundStay ?? null)
        setLoading(false)
    }, [staySlug])

    const arrivalDate = useMemo(() => {
        const a = searchParams.get('arrival')
        return a ? new Date(a) : undefined
    }, [searchParams])
    const departureDate = useMemo(() => {
        const d = searchParams.get('departure')
        return d ? new Date(d) : undefined
    }, [searchParams])
    const guestCount = useMemo(() => {
        const g = searchParams.get('guests')
        return g ? parseInt(g) : undefined
    }, [searchParams])

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
                    We couldn't find that <em className='italic'>booking.</em>
                </h1>
                <p className='text-ink-700 mb-8 max-w-md mx-auto'>
                    The reference may have expired, or the booking link is incomplete.
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
        <div className='pt-24 md:pt-32 pb-20 md:pb-28 px-5 tny:px-6 sm:px-8 lg:px-12 max-w-3xl mx-auto'>
            <BookingHero reference={reference} />

            <div className='mt-12 md:mt-14'>
                <BookingTripCard
                    stay={stay}
                    arrivalDate={arrivalDate}
                    departureDate={departureDate}
                    guestCount={guestCount}
                />
            </div>

            <WhatsNext />

            <SaveForNextTime />

            <div className='mt-14 text-center'>
                <Link
                    href='/stays'
                    className='inline-flex items-center gap-2 text-sm text-ink-500 hover:text-ink-900 underline-offset-4 hover:underline transition-colors group'
                >
                    Browse more stays
                    <FiArrowRight className='transition-transform group-hover:translate-x-1' />
                </Link>
            </div>
        </div>
    )
}

export default BookingConfirmationPage
