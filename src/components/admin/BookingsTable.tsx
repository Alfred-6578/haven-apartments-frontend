'use client'
import React from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { format, formatDistanceToNowStrict } from 'date-fns'
import StatusPill from './StatusPill'
import BookingActionsMenu from './BookingActionsMenu'
import { adminProperties, type Booking } from '@/lib/admin-mock-data'

const imageFor = (propertyId: string) =>
    adminProperties.find(p => p.id === propertyId)?.image ?? 'sundry-house-01.webp'

const initialsOf = (name: string) =>
    name
        .split(' ')
        .map(n => n[0])
        .slice(0, 2)
        .join('')
        .toUpperCase()

const relativeCheckIn = (date: Date) => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const target = new Date(date)
    target.setHours(0, 0, 0, 0)
    if (target.getTime() === today.getTime()) return 'today'
    const distance = formatDistanceToNowStrict(date, { addSuffix: true })
    return distance
}

const statusDotColor: Record<Booking['status'], string> = {
    pending: 'bg-warning',
    confirmed: 'bg-emerald-700',
    'checked-in': 'bg-emerald-500',
    completed: 'bg-ink-400',
    cancelled: 'bg-error',
}

interface Props {
    bookings: Booking[]
    selectedIds: Set<string>
    onToggleSelect: (id: string) => void
    onToggleSelectAll: () => void
}

const BookingsTable = ({ bookings, selectedIds, onToggleSelect, onToggleSelectAll }: Props) => {
    const router = useRouter()
    const allSelected = bookings.length > 0 && bookings.every(b => selectedIds.has(b.id))

    return (
        <>
            {/* Mobile card list */}
            <div className='md:hidden space-y-3'>
                {bookings.map((b) => (
                    <article
                        key={b.id}
                        onClick={() => router.push(`/admin/bookings/${b.id}`)}
                        className='bg-cream-50 border border-cream-300 rounded-xl p-4 cursor-pointer hover:bg-cream-100 transition-colors'
                    >
                        <div className='flex items-start justify-between gap-3'>
                            <div className='flex items-center gap-3 min-w-0 flex-1'>
                                <div className='w-10 h-10 rounded-full bg-cream-200 border border-cream-300 text-ink-900 flex items-center justify-center text-xs font-medium shrink-0'>
                                    {initialsOf(b.guestName)}
                                </div>
                                <div className='min-w-0'>
                                    <p className='text-ink-900 font-medium leading-tight truncate'>
                                        {b.guestName}
                                    </p>
                                    <p className='font-mono text-[11px] text-ink-500 truncate'>
                                        {b.id}
                                    </p>
                                </div>
                            </div>
                            <div onClick={(e) => e.stopPropagation()} className='shrink-0'>
                                <BookingActionsMenu booking={b} />
                            </div>
                        </div>

                        <div className='mt-3 pt-3 border-t border-cream-300'>
                            <p className='text-sm text-ink-700 truncate'>{b.propertyName}</p>
                            <p className='text-xs text-ink-500 truncate'>{b.neighborhood}</p>
                        </div>

                        <div className='mt-3 grid grid-cols-3 gap-3 text-xs'>
                            <div>
                                <p className='text-ink-500 uppercase tracking-[0.1em] text-[10px]'>
                                    Check-in
                                </p>
                                <p className='text-ink-900 mt-0.5'>
                                    {format(b.checkIn, 'MMM d')}
                                </p>
                            </div>
                            <div>
                                <p className='text-ink-500 uppercase tracking-[0.1em] text-[10px]'>
                                    Nights
                                </p>
                                <p className='text-ink-900 mt-0.5 tabular-nums'>{b.nights}</p>
                            </div>
                            <div className='text-right'>
                                <p className='text-ink-500 uppercase tracking-[0.1em] text-[10px]'>
                                    Amount
                                </p>
                                <p className='text-ink-900 font-medium mt-0.5 tabular-nums'>
                                    ₦{b.totalAmount.toLocaleString()}
                                </p>
                            </div>
                        </div>

                        <div className='mt-3 pt-3 border-t border-cream-300'>
                            <StatusPill status={b.status} />
                        </div>
                    </article>
                ))}
            </div>

            {/* Desktop table */}
            <div className='max-md:hidden bg-cream-50 border border-cream-300 rounded-xl overflow-hidden'>
            <div className='overflow-x-auto'>
                <table className='w-full text-sm'>
                    <thead>
                        <tr className='bg-cream-100 border-b border-cream-300'>
                            <th className='max-md:hidden py-3 px-4 w-10'>
                                <input
                                    type='checkbox'
                                    checked={allSelected}
                                    onChange={onToggleSelectAll}
                                    className='w-4 h-4 rounded border-cream-400 accent-emerald-700 cursor-pointer'
                                    aria-label='Select all'
                                />
                            </th>
                            <th className='max-md:hidden text-left py-3 px-4 text-[11px] uppercase tracking-[0.12em] text-ink-500 font-medium'>
                                Booking
                            </th>
                            <th className='text-left py-3 px-3 md:px-4 text-[11px] uppercase tracking-[0.12em] text-ink-500 font-medium'>
                                Guest
                            </th>
                            <th className='max-md:hidden text-left py-3 px-4 text-[11px] uppercase tracking-[0.12em] text-ink-500 font-medium'>
                                Property
                            </th>
                            <th className='max-md:hidden text-left py-3 px-4 text-[11px] uppercase tracking-[0.12em] text-ink-500 font-medium'>
                                Check-in
                            </th>
                            <th className='max-md:hidden text-left py-3 px-4 text-[11px] uppercase tracking-[0.12em] text-ink-500 font-medium'>
                                Nights
                            </th>
                            <th className='text-right md:text-left py-3 px-3 md:px-4 text-[11px] uppercase tracking-[0.12em] text-ink-500 font-medium'>
                                Amount
                            </th>
                            <th className='max-md:hidden text-left py-3 px-4 text-[11px] uppercase tracking-[0.12em] text-ink-500 font-medium'>
                                Status
                            </th>
                            <th className='py-3 px-3 md:px-4 w-10'>
                                <span className='sr-only'>Actions</span>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {bookings.map(b => (
                            <tr
                                key={b.id}
                                className='border-b border-cream-300 last:border-b-0 hover:bg-cream-100 transition-colors cursor-pointer'
                                onClick={() => router.push(`/admin/bookings/${b.id}`)}
                            >
                                <td className='max-md:hidden py-4 px-4' onClick={(e) => e.stopPropagation()}>
                                    <input
                                        type='checkbox'
                                        checked={selectedIds.has(b.id)}
                                        onChange={() => onToggleSelect(b.id)}
                                        className='w-4 h-4 rounded border-cream-400 accent-emerald-700 cursor-pointer'
                                        aria-label={`Select booking ${b.id}`}
                                    />
                                </td>
                                <td className='max-md:hidden py-4 px-4'>
                                    <span className='font-mono text-xs text-ink-500'>{b.id}</span>
                                </td>
                                <td className='py-4 px-3 md:px-4'>
                                    <div className='flex items-center gap-2 md:gap-3'>
                                        <div className='w-9 h-9 rounded-full bg-cream-200 border border-cream-300 text-ink-900 flex items-center justify-center text-xs font-medium shrink-0'>
                                            {initialsOf(b.guestName)}
                                        </div>
                                        <div className='min-w-0'>
                                            <div className='flex items-center gap-1.5'>
                                                <span
                                                    className={`md:hidden inline-block w-1.5 h-1.5 rounded-full shrink-0 ${statusDotColor[b.status]}`}
                                                    aria-label={`Status: ${b.status}`}
                                                />
                                                <p className='text-ink-900 font-medium leading-tight truncate'>
                                                    {b.guestName}
                                                </p>
                                            </div>
                                            <p className='text-xs text-ink-500 truncate md:hidden'>
                                                {format(b.checkIn, 'MMM d')} · {b.nights}n
                                            </p>
                                            <p className='text-xs text-ink-500 truncate max-md:hidden'>
                                                {b.guestEmail}
                                            </p>
                                        </div>
                                    </div>
                                </td>
                                <td className='max-md:hidden py-4 px-4'>
                                    <div className='flex items-center gap-3'>
                                        <div className='relative w-10 h-10 rounded-lg overflow-hidden shrink-0 bg-cream-200'>
                                            <Image
                                                src={require(`@/assets/images/properties/${imageFor(b.propertyId)}`)}
                                                alt={b.propertyName}
                                                fill
                                                sizes='40px'
                                                className='object-cover'
                                            />
                                        </div>
                                        <div className='min-w-0'>
                                            <p className='text-ink-900 font-medium leading-tight truncate'>
                                                {b.propertyName}
                                            </p>
                                            <p className='text-xs text-ink-500 truncate'>{b.neighborhood}</p>
                                        </div>
                                    </div>
                                </td>
                                <td className='max-md:hidden py-4 px-4 whitespace-nowrap'>
                                    <p className='text-ink-900'>{format(b.checkIn, 'MMM d, yyyy')}</p>
                                    <p className='text-xs text-ink-500'>{relativeCheckIn(b.checkIn)}</p>
                                </td>
                                <td className='max-md:hidden py-4 px-4 text-ink-900 tabular-nums'>{b.nights}</td>
                                <td className='py-4 px-3 md:px-4 text-right md:text-left text-ink-900 font-medium tabular-nums whitespace-nowrap'>
                                    ₦{b.totalAmount.toLocaleString()}
                                </td>
                                <td className='max-md:hidden py-4 px-4'>
                                    <StatusPill status={b.status} />
                                </td>
                                <td className='py-4 px-3 md:px-4 text-right' onClick={(e) => e.stopPropagation()}>
                                    <BookingActionsMenu booking={b} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            </div>
        </>
    )
}

export default BookingsTable
