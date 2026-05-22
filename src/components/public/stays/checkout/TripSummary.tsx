'use client'
import React from 'react'
import Link from 'next/link'
import { format } from 'date-fns'
import { FiEdit2 } from 'react-icons/fi'

interface Props {
    stay: { slug: string }
    arrivalDate: Date | undefined
    departureDate: Date | undefined
    guestCount: number | undefined
}

const TripSummary = ({ stay, arrivalDate, departureDate, guestCount }: Props) => {
    const editHref = (() => {
        const params = new URLSearchParams()
        if (arrivalDate) params.set('arrival', arrivalDate.toISOString().split('T')[0])
        if (departureDate) params.set('departure', departureDate.toISOString().split('T')[0])
        if (guestCount) params.set('guests', String(guestCount))
        const qs = params.toString()
        return qs ? `/stays/${stay.slug}?${qs}` : `/stays/${stay.slug}`
    })()

    return (
        <section className='pb-8 border-b border-cream-300'>
            <h2 className='font-heading text-2xl md:text-3xl text-ink-900 mb-6'>Your trip</h2>
            <div className='space-y-4'>
                <div className='flex items-start justify-between gap-6'>
                    <div>
                        <p className='text-xs uppercase tracking-[0.12em] text-ink-500 mb-1 font-medium'>Dates</p>
                        <p className='text-ink-900'>
                            {arrivalDate && departureDate
                                ? `${format(arrivalDate, 'MMM dd')} → ${format(departureDate, 'MMM dd, yyyy')}`
                                : 'No dates selected'}
                        </p>
                    </div>
                    <Link
                        href={editHref}
                        className='inline-flex items-center gap-1.5 text-sm text-ink-700 hover:text-emerald-700 transition-colors underline-offset-4 hover:underline shrink-0'
                    >
                        <FiEdit2 size={14} /> Edit
                    </Link>
                </div>
                <div className='flex items-start justify-between gap-6'>
                    <div>
                        <p className='text-xs uppercase tracking-[0.12em] text-ink-500 mb-1 font-medium'>Guests</p>
                        <p className='text-ink-900'>
                            {guestCount ? `${guestCount} ${guestCount === 1 ? 'guest' : 'guests'}` : 'No guests selected'}
                        </p>
                    </div>
                    <Link
                        href={editHref}
                        className='inline-flex items-center gap-1.5 text-sm text-ink-700 hover:text-emerald-700 transition-colors underline-offset-4 hover:underline shrink-0'
                    >
                        <FiEdit2 size={14} /> Edit
                    </Link>
                </div>
            </div>
        </section>
    )
}

export default TripSummary
