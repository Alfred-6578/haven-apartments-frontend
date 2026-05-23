'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useParams } from 'next/navigation'
import { format, formatDistanceToNowStrict } from 'date-fns'
import {
    FiArrowLeft,
    FiArrowRight,
    FiCheckCircle,
    FiCopy,
    FiEdit2,
    FiLogIn,
    FiMail,
    FiMessageSquare,
    FiPhone,
    FiUsers,
    FiXCircle,
} from 'react-icons/fi'
import { adminBookings, adminProperties, type Booking } from '@/lib/admin-mock-data'
import StatusPill from '@/components/admin/StatusPill'
import EditBookingModal from '@/components/admin/EditBookingModal'
import CancelBookingModal from '@/components/admin/CancelBookingModal'

const paymentPill = (status: Booking['paymentStatus']) => {
    if (status === 'paid')
        return (
            <span className='inline-block text-[11px] uppercase tracking-[0.1em] px-2.5 py-1 rounded-full font-medium bg-emerald-100 text-emerald-900'>
                Paid
            </span>
        )
    if (status === 'refunded')
        return (
            <span className='inline-block text-[11px] uppercase tracking-[0.1em] px-2.5 py-1 rounded-full font-medium bg-cream-200 text-ink-700'>
                Refunded
            </span>
        )
    return (
        <span className='inline-block text-[11px] uppercase tracking-[0.1em] px-2.5 py-1 rounded-full font-medium bg-warning/15 text-warning'>
            Pending
        </span>
    )
}

const sectionCard = 'bg-cream-50 border border-cream-300 rounded-xl p-5'
const labelClass = 'text-[11px] uppercase tracking-[0.12em] text-ink-500 font-medium'

export default function AdminBookingDetailPage() {
    const params = useParams()
    const id = typeof params?.id === 'string' ? params.id : ''
    const [copied, setCopied] = useState(false)
    const [editOpen, setEditOpen] = useState(false)
    const [cancelOpen, setCancelOpen] = useState(false)

    const booking = adminBookings.find((b) => b.id === id)
    const property = booking ? adminProperties.find((p) => p.id === booking.propertyId) : null

    if (!booking) {
        return (
            <div className='max-w-2xl mx-auto pt-16 pb-32 text-center'>
                <span className='block text-xs uppercase tracking-[0.2em] text-ink-500 mb-4'>404</span>
                <h1 className='font-heading text-4xl text-ink-900 mb-3'>Booking not found</h1>
                <p className='text-ink-500 text-sm'>
                    We couldn&apos;t find a booking with ID <code className='font-mono'>{id}</code>.
                </p>
                <Link
                    href='/admin/bookings'
                    className='inline-flex items-center gap-2 mt-8 text-sm text-emerald-700 hover:text-emerald-900 transition-colors'
                >
                    <FiArrowLeft size={14} />
                    Back to bookings
                </Link>
            </div>
        )
    }

    const copyId = async () => {
        try {
            await navigator.clipboard.writeText(booking.id)
            setCopied(true)
            setTimeout(() => setCopied(false), 1200)
        } catch {
            /* noop */
        }
    }

    const updateStatus = (next: Booking['status']) => {
        // Frontend stub — wire to API later.
        // eslint-disable-next-line no-console
        console.log('[stub] update booking status', booking.id, '→', next)
    }


    const isPast = booking.status === 'completed' || booking.status === 'cancelled'

    return (
        <div className='max-w-5xl mx-auto pt-4 pb-12'>
            {/* Breadcrumb */}
            <Link
                href='/admin/bookings'
                className='inline-flex items-center gap-2 text-sm text-ink-500 hover:text-ink-900 transition-colors mb-6'
            >
                <FiArrowLeft size={14} />
                Back to bookings
            </Link>

            {/* Header */}
            <header className='flex max-md:flex-col max-md:items-start max-md:gap-4 justify-between items-end mb-8'>
                <div>
                    <div className='flex items-center gap-3 flex-wrap'>
                        <button
                            type='button'
                            onClick={copyId}
                            className='font-mono text-xs text-ink-500 inline-flex items-center gap-1.5 hover:text-ink-900 transition-colors cursor-pointer'
                            title='Copy booking ID'
                        >
                            {booking.id}
                            {copied ? (
                                <FiCheckCircle size={12} className='text-emerald-700' />
                            ) : (
                                <FiCopy size={11} />
                            )}
                        </button>
                        <StatusPill status={booking.status} />
                    </div>
                    <h1 className='font-heading text-3xl md:text-[32px] text-ink-900 leading-tight mt-2'>
                        {booking.guestName}
                    </h1>
                    <p className='text-ink-500 mt-1 text-sm'>
                        Booked {format(booking.createdAt, 'MMM d, yyyy')} ·{' '}
                        {formatDistanceToNowStrict(booking.createdAt, { addSuffix: true })}
                    </p>
                </div>

                <div className='flex flex-wrap items-center gap-2'>
                    <button
                        type='button'
                        onClick={() => setEditOpen(true)}
                        className='inline-flex items-center gap-1.5 text-sm text-ink-700 border border-cream-300 rounded-full px-4 py-2 hover:bg-cream-200 transition-colors cursor-pointer'
                    >
                        <FiEdit2 size={13} />
                        Edit
                    </button>
                    {!isPast && (
                        <button
                            type='button'
                            onClick={() => setCancelOpen(true)}
                            className='inline-flex items-center gap-1.5 text-sm text-error border border-error/30 rounded-full px-4 py-2 hover:bg-error/5 transition-colors cursor-pointer'
                        >
                            <FiXCircle size={13} />
                            Cancel
                        </button>
                    )}
                </div>
            </header>

            {/* Two-column body */}
            <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
                {/* Main column */}
                <div className='lg:col-span-2 space-y-6'>
                    {/* Stay */}
                    <section className={sectionCard}>
                        <h2 className='font-heading text-xl text-ink-900 mb-4'>Stay</h2>
                        <div className='grid grid-cols-2 sm:grid-cols-4 gap-5'>
                            <div>
                                <p className={labelClass}>Check-in</p>
                                <p className='text-ink-900 mt-1.5'>{format(booking.checkIn, 'EEE')}</p>
                                <p className='font-heading text-xl text-ink-900 leading-tight'>
                                    {format(booking.checkIn, 'MMM d')}
                                </p>
                                <p className='text-xs text-ink-500'>
                                    {format(booking.checkIn, 'yyyy')}
                                </p>
                            </div>
                            <div>
                                <p className={labelClass}>Check-out</p>
                                <p className='text-ink-900 mt-1.5'>{format(booking.checkOut, 'EEE')}</p>
                                <p className='font-heading text-xl text-ink-900 leading-tight'>
                                    {format(booking.checkOut, 'MMM d')}
                                </p>
                                <p className='text-xs text-ink-500'>
                                    {format(booking.checkOut, 'yyyy')}
                                </p>
                            </div>
                            <div>
                                <p className={labelClass}>Nights</p>
                                <p className='font-heading text-xl text-ink-900 mt-3 tabular-nums'>
                                    {booking.nights}
                                </p>
                            </div>
                            <div>
                                <p className={labelClass}>Guests</p>
                                <p className='font-heading text-xl text-ink-900 mt-3 tabular-nums inline-flex items-baseline gap-1.5'>
                                    {booking.guests}
                                    <FiUsers size={14} className='text-ink-500 self-center' />
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* Guest */}
                    <section className={sectionCard}>
                        <h2 className='font-heading text-xl text-ink-900 mb-4'>Guest</h2>
                        <div className='flex items-start gap-4'>
                            <div className='w-12 h-12 rounded-full bg-cream-200 border border-cream-300 text-ink-900 flex items-center justify-center text-sm font-medium shrink-0'>
                                {booking.guestName
                                    .split(' ')
                                    .map((n) => n[0])
                                    .slice(0, 2)
                                    .join('')
                                    .toUpperCase()}
                            </div>
                            <div className='flex-1 min-w-0'>
                                <p className='text-ink-900 font-medium'>{booking.guestName}</p>
                                <div className='mt-3 space-y-2 text-sm'>
                                    <a
                                        href={`mailto:${booking.guestEmail}`}
                                        className='flex items-center gap-2 text-ink-700 hover:text-emerald-700 transition-colors break-all'
                                    >
                                        <FiMail size={14} className='text-ink-500 shrink-0' />
                                        {booking.guestEmail}
                                    </a>
                                    <a
                                        href={`tel:${booking.guestPhone}`}
                                        className='flex items-center gap-2 text-ink-700 hover:text-emerald-700 transition-colors'
                                    >
                                        <FiPhone size={14} className='text-ink-500 shrink-0' />
                                        {booking.guestPhone}
                                    </a>
                                </div>
                            </div>
                            <button
                                type='button'
                                className='shrink-0 inline-flex items-center gap-1.5 text-sm text-ink-700 border border-cream-300 rounded-full px-3.5 py-1.5 hover:bg-cream-200 transition-colors cursor-pointer'
                            >
                                <FiMessageSquare size={13} />
                                Message
                            </button>
                        </div>
                    </section>

                    {/* Payment */}
                    <section className={sectionCard}>
                        <h2 className='font-heading text-xl text-ink-900 mb-4'>Payment</h2>
                        <div className='flex flex-wrap items-center justify-between gap-4'>
                            <div>
                                <p className={labelClass}>Total</p>
                                <p className='font-heading text-3xl text-ink-900 tabular-nums mt-1'>
                                    ₦{booking.totalAmount.toLocaleString()}
                                </p>
                            </div>
                            <div className='text-right'>
                                <p className={labelClass}>Status</p>
                                <div className='mt-2'>{paymentPill(booking.paymentStatus)}</div>
                            </div>
                        </div>
                        <div className='mt-4 pt-4 border-t border-cream-300 text-xs text-ink-500'>
                            {booking.nights} night{booking.nights === 1 ? '' : 's'} × ₦
                            {Math.round(booking.totalAmount / booking.nights).toLocaleString()}/night
                        </div>
                    </section>

                    {/* Timeline */}
                    <section className={sectionCard}>
                        <h2 className='font-heading text-xl text-ink-900 mb-4'>Timeline</h2>
                        <ol className='relative border-l border-cream-300 pl-5 space-y-4'>
                            <li>
                                <span className='absolute -left-[5px] mt-1.5 w-2.5 h-2.5 rounded-full bg-emerald-700 border-2 border-cream-50' />
                                <p className='text-sm text-ink-900 font-medium'>Booking created</p>
                                <p className='text-xs text-ink-500'>
                                    {format(booking.createdAt, 'MMM d, yyyy · h:mma')}
                                </p>
                            </li>
                            {booking.status !== 'pending' && booking.status !== 'cancelled' && (
                                <li>
                                    <span className='absolute -left-[5px] mt-1.5 w-2.5 h-2.5 rounded-full bg-emerald-700 border-2 border-cream-50' />
                                    <p className='text-sm text-ink-900 font-medium'>Confirmed</p>
                                    <p className='text-xs text-ink-500'>Payment received</p>
                                </li>
                            )}
                            {(booking.status === 'checked-in' || booking.status === 'completed') && (
                                <li>
                                    <span className='absolute -left-[5px] mt-1.5 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-cream-50' />
                                    <p className='text-sm text-ink-900 font-medium'>Checked in</p>
                                    <p className='text-xs text-ink-500'>
                                        {format(booking.checkIn, 'MMM d, yyyy')}
                                    </p>
                                </li>
                            )}
                            {booking.status === 'completed' && (
                                <li>
                                    <span className='absolute -left-[5px] mt-1.5 w-2.5 h-2.5 rounded-full bg-ink-400 border-2 border-cream-50' />
                                    <p className='text-sm text-ink-900 font-medium'>Stay completed</p>
                                    <p className='text-xs text-ink-500'>
                                        {format(booking.checkOut, 'MMM d, yyyy')}
                                    </p>
                                </li>
                            )}
                            {booking.status === 'cancelled' && (
                                <li>
                                    <span className='absolute -left-[5px] mt-1.5 w-2.5 h-2.5 rounded-full bg-error border-2 border-cream-50' />
                                    <p className='text-sm text-ink-900 font-medium'>Cancelled</p>
                                </li>
                            )}
                        </ol>
                    </section>
                </div>

                {/* Sidebar */}
                <aside className='space-y-6'>
                    {/* Property card */}
                    {property && (
                        <section className='bg-cream-50 border border-cream-300 rounded-xl overflow-hidden'>
                            <div className='relative aspect-[4/3]'>
                                <Image
                                    src={require(`@/assets/images/properties/${property.image}`)}
                                    alt={property.name}
                                    fill
                                    sizes='(min-width: 1024px) 280px, 100vw'
                                    className='object-cover'
                                />
                            </div>
                            <div className='p-5'>
                                <p className={labelClass}>Property</p>
                                <h3 className='font-heading text-xl text-ink-900 leading-tight mt-1.5'>
                                    {property.name}
                                </h3>
                                <p className='text-sm text-ink-500 mt-0.5'>{property.neighborhood}</p>
                                <p className='text-xs text-ink-700 mt-2'>
                                    {property.bedrooms}BR · {property.bathrooms} bath · sleeps{' '}
                                    {property.guestCapacity}
                                </p>
                                <Link
                                    href={`/admin/properties/${property.id}`}
                                    className='inline-flex items-center gap-1.5 mt-4 text-sm text-emerald-700 hover:text-emerald-900 transition-colors'
                                >
                                    View property
                                    <FiArrowRight size={13} />
                                </Link>
                            </div>
                        </section>
                    )}

                    {/* Status actions */}
                    {!isPast && (
                        <section className={sectionCard}>
                            <p className={labelClass}>Next steps</p>
                            <div className='mt-4 space-y-2'>
                                {booking.status === 'pending' && (
                                    <button
                                        type='button'
                                        onClick={() => updateStatus('confirmed')}
                                        className='w-full inline-flex items-center justify-center gap-2 bg-emerald-700 hover:bg-emerald-900 text-cream-50 text-sm font-medium px-4 py-2.5 rounded-full transition-colors cursor-pointer'
                                    >
                                        <FiCheckCircle size={14} />
                                        Confirm booking
                                    </button>
                                )}
                                {booking.status === 'confirmed' && (
                                    <button
                                        type='button'
                                        onClick={() => updateStatus('checked-in')}
                                        className='w-full inline-flex items-center justify-center gap-2 bg-emerald-700 hover:bg-emerald-900 text-cream-50 text-sm font-medium px-4 py-2.5 rounded-full transition-colors cursor-pointer'
                                    >
                                        <FiLogIn size={14} />
                                        Mark checked in
                                    </button>
                                )}
                                {booking.status === 'checked-in' && (
                                    <button
                                        type='button'
                                        onClick={() => updateStatus('completed')}
                                        className='w-full inline-flex items-center justify-center gap-2 bg-emerald-700 hover:bg-emerald-900 text-cream-50 text-sm font-medium px-4 py-2.5 rounded-full transition-colors cursor-pointer'
                                    >
                                        <FiCheckCircle size={14} />
                                        Mark completed
                                    </button>
                                )}
                            </div>
                        </section>
                    )}
                </aside>
            </div>
            <EditBookingModal
                booking={editOpen ? booking : null}
                isOpen={editOpen}
                onClose={() => setEditOpen(false)}
            />
            <CancelBookingModal
                booking={cancelOpen ? booking : null}
                isOpen={cancelOpen}
                onClose={() => setCancelOpen(false)}
            />
        </div>
    )
}
