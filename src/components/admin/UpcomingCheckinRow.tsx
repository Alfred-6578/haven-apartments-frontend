'use client'
import React from 'react'
import Image from 'next/image'
import { format } from 'date-fns'
import { FiMoreVertical } from 'react-icons/fi'
import StatusPill from './StatusPill'
import { adminProperties, type Booking } from '@/lib/admin-mock-data'

const imageFor = (propertyId: string) =>
    adminProperties.find(p => p.id === propertyId)?.image ?? 'sundry-house-01.webp'

const UpcomingCheckinRow = ({ booking, isLast }: { booking: Booking; isLast?: boolean }) => {
    return (
        <div className={`flex items-center gap-4 py-4 ${isLast ? '' : 'border-b border-cream-300'}`}>
            <div className='relative w-12 h-12 rounded-lg overflow-hidden shrink-0 bg-cream-200'>
                <Image
                    src={require(`@/assets/images/properties/${imageFor(booking.propertyId)}`)}
                    alt={booking.propertyName}
                    fill
                    sizes='48px'
                    className='object-cover'
                />
            </div>
            <div className='flex-1 min-w-0'>
                <p className='text-ink-900 font-medium truncate'>{booking.guestName}</p>
                <p className='text-[13px] text-ink-500 truncate'>
                    {booking.propertyName} · {format(booking.checkIn, 'MMM d')} → {format(booking.checkOut, 'MMM d')}
                </p>
            </div>
            <StatusPill status={booking.status} />
            <button
                type='button'
                className='text-ink-500 hover:text-ink-900 p-1 transition-colors cursor-pointer'
                aria-label='More options'
            >
                <FiMoreVertical size={18} />
            </button>
        </div>
    )
}

export default UpcomingCheckinRow
