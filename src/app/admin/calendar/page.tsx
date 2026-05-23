'use client'
import React, { useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import {
    addMonths,
    addWeeks,
    eachDayOfInterval,
    endOfMonth,
    endOfWeek,
    format,
    startOfMonth,
    startOfWeek,
    subMonths,
    subWeeks,
} from 'date-fns'
import { adminBookings, adminProperties, type Booking } from '@/lib/admin-mock-data'
import FilterPill from '@/components/admin/FilterPill'
import FilterDropdown from '@/components/admin/FilterDropdown'
import CalendarGrid from '@/components/admin/CalendarGrid'
import CalendarMobileList from '@/components/admin/CalendarMobileList'
import BookingPopover from '@/components/admin/BookingPopover'
import CalendarLegend from '@/components/admin/CalendarLegend'

type View = 'month' | 'week'

export default function AdminCalendarPage() {
    const router = useRouter()
    const [view, setView] = useState<View>('month')
    const [anchorDate, setAnchorDate] = useState(new Date())
    const [propertyFilter, setPropertyFilter] = useState('all')
    const [popover, setPopover] = useState<{ booking: Booking; x: number; y: number } | null>(null)

    const propertyOptions = useMemo(
        () => [
            { value: 'all', label: 'All properties' },
            ...adminProperties.map((p) => ({ value: p.id, label: p.name })),
        ],
        [],
    )

    const filteredProperties = useMemo(
        () =>
            propertyFilter === 'all'
                ? adminProperties
                : adminProperties.filter((p) => p.id === propertyFilter),
        [propertyFilter],
    )

    const filteredBookings = useMemo(
        () =>
            propertyFilter === 'all'
                ? adminBookings
                : adminBookings.filter((b) => b.propertyId === propertyFilter),
        [propertyFilter],
    )

    const days = useMemo(() => {
        if (view === 'week') {
            const start = startOfWeek(anchorDate, { weekStartsOn: 1 })
            const end = endOfWeek(anchorDate, { weekStartsOn: 1 })
            return eachDayOfInterval({ start, end })
        }
        const start = startOfMonth(anchorDate)
        const end = endOfMonth(anchorDate)
        return eachDayOfInterval({ start, end })
    }, [view, anchorDate])

    const rangeLabel = useMemo(() => {
        if (view === 'week') {
            const start = days[0]
            const end = days[days.length - 1]
            const sameMonth = start.getMonth() === end.getMonth()
            return sameMonth
                ? `${format(start, 'MMM d')} – ${format(end, 'd, yyyy')}`
                : `${format(start, 'MMM d')} – ${format(end, 'MMM d, yyyy')}`
        }
        return format(anchorDate, 'MMMM yyyy')
    }, [view, anchorDate, days])

    const navigate = (direction: -1 | 1) => {
        if (view === 'week') {
            setAnchorDate(direction === -1 ? subWeeks(anchorDate, 1) : addWeeks(anchorDate, 1))
        } else {
            setAnchorDate(direction === -1 ? subMonths(anchorDate, 1) : addMonths(anchorDate, 1))
        }
    }

    const handleBookingClick = (
        event: React.MouseEvent<HTMLButtonElement>,
        booking: Booking,
    ) => {
        const rect = event.currentTarget.getBoundingClientRect()
        setPopover({
            booking,
            x: rect.left,
            y: rect.bottom,
        })
    }

    const handleViewDetails = () => {
        if (popover) {
            router.push(`/admin/bookings/${popover.booking.id}`)
            setPopover(null)
        }
    }

    return (
        <div className='max-w-7xl mx-auto pt-4 pb-12'>
            {/* Header */}
            <header className='flex max-lg:flex-col max-lg:items-start max-lg:gap-4 justify-between lg:items-end mb-8'>
                <div>
                    <h1 className='font-heading text-3xl md:text-[32px] text-ink-900 leading-tight'>
                        Calendar
                    </h1>
                    <p className='text-ink-500 mt-1 text-sm'>
                        All bookings across your portfolio
                    </p>
                </div>

                <div className='flex flex-wrap items-center gap-3'>
                    {/* View toggle */}
                    <div className='flex gap-1.5'>
                        <FilterPill
                            label='Month'
                            active={view === 'month'}
                            onClick={() => setView('month')}
                        />
                        <FilterPill
                            label='Week'
                            active={view === 'week'}
                            onClick={() => setView('week')}
                        />
                    </div>

                    {/* Property filter */}
                    <FilterDropdown
                        options={propertyOptions}
                        selected={propertyFilter}
                        onSelect={setPropertyFilter}
                    />

                    {/* Today */}
                    <button
                        type='button'
                        onClick={() => setAnchorDate(new Date())}
                        className='px-3.5 py-1.5 text-sm text-ink-700 border border-cream-300 rounded-full hover:bg-cream-200 transition-colors cursor-pointer'
                    >
                        Today
                    </button>

                    {/* Month/week nav */}
                    <div className='flex items-center gap-2'>
                        <button
                            type='button'
                            onClick={() => navigate(-1)}
                            className='w-8 h-8 flex items-center justify-center rounded-full text-ink-700 hover:bg-cream-200 transition-colors cursor-pointer'
                            aria-label={view === 'week' ? 'Previous week' : 'Previous month'}
                        >
                            <FiChevronLeft size={16} />
                        </button>
                        <span className='font-heading text-lg text-ink-900 min-w-[160px] text-center'>
                            {rangeLabel}
                        </span>
                        <button
                            type='button'
                            onClick={() => navigate(1)}
                            className='w-8 h-8 flex items-center justify-center rounded-full text-ink-700 hover:bg-cream-200 transition-colors cursor-pointer'
                            aria-label={view === 'week' ? 'Next week' : 'Next month'}
                        >
                            <FiChevronRight size={16} />
                        </button>
                    </div>
                </div>
            </header>

            {/* Mobile: chronological list */}
            <div className='md:hidden'>
                <CalendarMobileList
                    bookings={filteredBookings}
                    properties={filteredProperties}
                    rangeStart={days[0]}
                    rangeEnd={days[days.length - 1]}
                />
            </div>

            {/* Desktop: calendar grid */}
            <div className='max-md:hidden'>
                <CalendarGrid
                    properties={filteredProperties}
                    bookings={filteredBookings}
                    days={days}
                    onBookingClick={handleBookingClick}
                />
            </div>

            {/* Legend */}
            <div className='mt-6'>
                <CalendarLegend />
            </div>

            {/* Popover */}
            {popover && (
                <BookingPopover
                    booking={popover.booking}
                    position={{ x: popover.x, y: popover.y }}
                    onClose={() => setPopover(null)}
                    onViewDetails={handleViewDetails}
                />
            )}
        </div>
    )
}
