'use client'
import React, { useMemo } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { format } from 'date-fns'
import StatusPill from './StatusPill'
import type { Booking, AdminProperty } from '@/lib/admin-mock-data'

interface Props {
    bookings: Booking[]
    properties: AdminProperty[]
    rangeStart: Date
    rangeEnd: Date
}

const CalendarMobileList = ({ bookings, properties, rangeStart, rangeEnd }: Props) => {
    const router = useRouter()

    const propertyById = useMemo(() => {
        const map = new Map<string, AdminProperty>()
        properties.forEach((p) => map.set(p.id, p))
        return map
    }, [properties])

    const visibleBookings = useMemo(() => {
        return [...bookings]
            .filter((b) => b.checkIn <= rangeEnd && b.checkOut > rangeStart)
            .sort((a, b) => a.checkIn.getTime() - b.checkIn.getTime())
    }, [bookings, rangeStart, rangeEnd])

    if (visibleBookings.length === 0) {
        return (
            <div className='bg-cream-50 border border-cream-300 rounded-xl py-12 text-center'>
                <p className='text-ink-500 text-sm'>No bookings in this range.</p>
            </div>
        )
    }

    return (
        <div className='space-y-3'>
            {visibleBookings.map((b) => {
                const prop = propertyById.get(b.propertyId)
                return (
                    <button
                        key={b.id}
                        type='button'
                        onClick={() => router.push(`/admin/bookings/${b.id}`)}
                        className='w-full bg-cream-50 border border-cream-300 rounded-xl p-4 text-left flex items-start gap-3 hover:bg-cream-100 transition-colors cursor-pointer'
                    >
                        {prop && (
                            <div className='relative w-14 h-14 rounded-lg overflow-hidden shrink-0 bg-cream-200'>
                                <Image
                                    src={require(`@/assets/images/properties/${prop.image}`)}
                                    alt={prop.name}
                                    fill
                                    sizes='56px'
                                    className='object-cover'
                                />
                            </div>
                        )}
                        <div className='flex-1 min-w-0'>
                            <div className='flex items-start justify-between gap-2'>
                                <p className='font-medium text-ink-900 leading-tight truncate'>
                                    {b.guestName}
                                </p>
                                <div className='shrink-0'>
                                    <StatusPill status={b.status} />
                                </div>
                            </div>
                            <p className='text-sm text-ink-700 truncate mt-0.5'>
                                {b.propertyName}
                            </p>
                            <p className='text-xs text-ink-500 mt-1'>
                                {format(b.checkIn, 'MMM d')} – {format(b.checkOut, 'MMM d, yyyy')} · {b.nights}n
                            </p>
                        </div>
                    </button>
                )
            })}
        </div>
    )
}

export default CalendarMobileList
