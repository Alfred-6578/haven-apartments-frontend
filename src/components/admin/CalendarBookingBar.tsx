'use client'
import React from 'react'
import { differenceInDays } from 'date-fns'
import type { Booking } from '@/lib/admin-mock-data'

const STATUS_BG: Record<Booking['status'], string> = {
    confirmed: 'bg-emerald-100 hover:bg-emerald-200 text-emerald-900',
    'checked-in': 'bg-emerald-200 hover:bg-emerald-200/80 text-emerald-900',
    pending: 'bg-warning/20 hover:bg-warning/30 text-ink-900',
    completed: 'bg-ink-200 hover:bg-ink-200/80 text-ink-900',
    cancelled: 'bg-error/15 hover:bg-error/25 text-ink-900',
}

interface Props {
    booking: Booking
    rangeStart: Date
    daysCount: number
    dayWidth: number
    onClick: (event: React.MouseEvent<HTMLButtonElement>, booking: Booking) => void
}

const CalendarBookingBar = ({ booking, rangeStart, daysCount, dayWidth, onClick }: Props) => {
    const actualStart = differenceInDays(booking.checkIn, rangeStart)
    // checkOut is the departure day (exclusive) — bar ends the night before
    const actualEnd = differenceInDays(booking.checkOut, rangeStart) - 1

    const startIndex = Math.max(0, actualStart)
    const endIndex = Math.min(daysCount - 1, actualEnd)

    if (endIndex < startIndex) return null

    const startsInRange = actualStart >= 0
    const endsInRange = actualEnd < daysCount

    const left = startIndex * dayWidth + 3
    const width = (endIndex - startIndex + 1) * dayWidth - 6

    return (
        <button
            type='button'
            onClick={(e) => onClick(e, booking)}
            style={{ left: `${left}px`, width: `${width}px` }}
            className={`absolute top-2.5 h-[60px] ${STATUS_BG[booking.status]} ${startsInRange ? 'rounded-l-lg' : ''} ${endsInRange ? 'rounded-r-lg' : ''} px-2 py-1.5 flex items-start text-left cursor-pointer transition-colors`}
            aria-label={`${booking.guestName} booking`}
        >
            <span className='text-[11px] font-medium truncate w-full leading-tight'>
                {booking.guestName}
            </span>
        </button>
    )
}

export default CalendarBookingBar
