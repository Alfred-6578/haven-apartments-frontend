'use client'
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { format } from 'date-fns'
import { IoLocationOutline } from 'react-icons/io5'
import { FiArrowRight } from 'react-icons/fi'
import type { ProductCardProps } from '@/types/properties'

interface Props {
    stay: ProductCardProps
    arrivalDate: Date | undefined
    departureDate: Date | undefined
    guestCount: number | undefined
}

const BookingTripCard = ({ stay, arrivalDate, departureDate, guestCount }: Props) => {
    return (
        <div className='booking-trip-reveal bg-cream-50 border border-cream-300 rounded-2xl p-6 md:p-7 shadow-sm text-left'>
            <div className='flex gap-4 pb-6 border-b border-cream-300'>
                <div className='relative w-24 h-24 md:w-28 md:h-28 rounded-xl overflow-hidden shrink-0'>
                    <Image
                        src={require(`@/assets/images/properties/${stay.image}`)}
                        alt={stay.name}
                        fill
                        sizes='112px'
                        className='object-cover'
                    />
                </div>
                <div className='min-w-0 flex flex-col justify-center'>
                    <span className='inline-block self-start text-[10px] uppercase tracking-[0.12em] px-2 py-0.5 bg-emerald-100 text-emerald-700 rounded-full mb-1.5 font-medium'>
                        {stay.tag}
                    </span>
                    <h2 className='font-heading text-xl md:text-2xl text-ink-900 leading-tight'>{stay.name}</h2>
                    <p className='flex items-center gap-1 text-sm text-ink-500 mt-1'>
                        <IoLocationOutline className='shrink-0' /> {stay.address}
                    </p>
                </div>
            </div>

            <div className='grid sm:grid-cols-3 gap-5 pt-6'>
                <div>
                    <p className='text-[10px] uppercase tracking-[0.15em] text-ink-500 font-medium mb-1'>Check in</p>
                    <p className='text-ink-900'>{arrivalDate ? format(arrivalDate, 'MMM dd, yyyy') : '—'}</p>
                    <p className='text-xs text-ink-500 mt-0.5'>From 3:00 PM</p>
                </div>
                <div>
                    <p className='text-[10px] uppercase tracking-[0.15em] text-ink-500 font-medium mb-1'>Check out</p>
                    <p className='text-ink-900'>{departureDate ? format(departureDate, 'MMM dd, yyyy') : '—'}</p>
                    <p className='text-xs text-ink-500 mt-0.5'>By 11:00 AM</p>
                </div>
                <div>
                    <p className='text-[10px] uppercase tracking-[0.15em] text-ink-500 font-medium mb-1'>Guests</p>
                    <p className='text-ink-900'>
                        {guestCount ? `${guestCount} ${guestCount === 1 ? 'guest' : 'guests'}` : '—'}
                    </p>
                </div>
            </div>

            <Link
                href={`/stays/${stay.slug}`}
                className='inline-flex items-center gap-1.5 mt-6 text-sm text-ink-700 hover:text-emerald-700 underline-offset-4 hover:underline transition-colors group'
            >
                View stay details
                <FiArrowRight className='transition-transform group-hover:translate-x-1' />
            </Link>
        </div>
    )
}

export default BookingTripCard
