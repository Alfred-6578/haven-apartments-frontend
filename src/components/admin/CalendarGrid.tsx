'use client'
import React from 'react'
import Image from 'next/image'
import { format, isToday, isWeekend } from 'date-fns'
import type { Booking, AdminProperty } from '@/lib/admin-mock-data'
import CalendarBookingBar from './CalendarBookingBar'

const DAY_WIDTH = 64

interface Props {
    properties: AdminProperty[]
    bookings: Booking[]
    days: Date[]
    onBookingClick: (event: React.MouseEvent<HTMLButtonElement>, booking: Booking) => void
}

const CalendarGrid = ({ properties, bookings, days, onBookingClick }: Props) => {
    const rangeStart = days[0]
    const rangeEnd = days[days.length - 1]

    const bookingsForProperty = (id: string) =>
        bookings.filter(
            (b) =>
                b.propertyId === id &&
                b.checkIn <= rangeEnd &&
                b.checkOut > rangeStart,
        )

    return (
        <div className='flex border border-cream-300 rounded-xl overflow-hidden bg-cream-50'>
            {/* Sticky property column */}
            <div className='w-[180px] shrink-0 border-r border-cream-300 bg-cream-50'>
                <div className='h-16 border-b border-cream-300 px-4 flex items-end pb-2'>
                    <span className='text-[11px] uppercase tracking-[0.12em] text-ink-500 font-medium'>
                        Property
                    </span>
                </div>
                {properties.map((prop) => (
                    <div
                        key={prop.id}
                        className='h-20 border-b border-cream-300 last:border-b-0 px-4 flex items-center gap-3'
                    >
                        <div className='relative w-10 h-10 rounded-lg overflow-hidden shrink-0 bg-cream-200'>
                            <Image
                                src={require(`@/assets/images/properties/${prop.image}`)}
                                alt={prop.name}
                                fill
                                sizes='40px'
                                className='object-cover'
                            />
                        </div>
                        <div className='min-w-0'>
                            <p className='text-sm text-ink-900 font-medium leading-tight truncate'>
                                {prop.name}
                            </p>
                            <p className='text-[11px] text-ink-500 truncate'>
                                {prop.neighborhood}
                            </p>
                        </div>
                    </div>
                ))}
                {properties.length === 0 && (
                    <div className='h-20 px-4 flex items-center text-sm text-ink-500'>
                        No properties.
                    </div>
                )}
            </div>

            {/* Scrollable day grid */}
            <div className='overflow-x-auto flex-1'>
                <div style={{ width: `${days.length * DAY_WIDTH}px` }}>
                    {/* Header */}
                    <div className='h-16 flex border-b border-cream-300'>
                        {days.map((day) => {
                            const today = isToday(day)
                            const weekend = isWeekend(day)
                            return (
                                <div
                                    key={day.toISOString()}
                                    className={`shrink-0 border-r border-cream-300 last:border-r-0 flex flex-col items-center justify-end pb-2 ${today ? 'bg-emerald-100' : weekend ? 'bg-cream-100' : ''}`}
                                    style={{ width: `${DAY_WIDTH}px` }}
                                >
                                    <span
                                        className={`text-sm font-medium ${today ? 'text-emerald-700' : 'text-ink-900'}`}
                                    >
                                        {format(day, 'd')}
                                    </span>
                                    <span className='text-[10px] text-ink-500 uppercase tracking-wider'>
                                        {format(day, 'EEE')}
                                    </span>
                                </div>
                            )
                        })}
                    </div>

                    {/* Property rows */}
                    {properties.map((prop) => (
                        <div
                            key={prop.id}
                            className='relative h-20 border-b border-cream-300 last:border-b-0 flex'
                        >
                            {/* Background cells */}
                            {days.map((day) => {
                                const today = isToday(day)
                                const weekend = isWeekend(day)
                                return (
                                    <div
                                        key={day.toISOString()}
                                        className={`shrink-0 border-r border-cream-300 last:border-r-0 ${today ? 'bg-emerald-50' : weekend ? 'bg-cream-100' : ''}`}
                                        style={{ width: `${DAY_WIDTH}px` }}
                                    />
                                )
                            })}
                            {/* Booking bars (absolute over row) */}
                            {bookingsForProperty(prop.id).map((b) => (
                                <CalendarBookingBar
                                    key={b.id}
                                    booking={b}
                                    rangeStart={rangeStart}
                                    daysCount={days.length}
                                    dayWidth={DAY_WIDTH}
                                    onClick={onBookingClick}
                                />
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default CalendarGrid
