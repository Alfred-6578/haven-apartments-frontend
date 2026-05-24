'use client'
import React, { useMemo, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useParams, useRouter } from 'next/navigation'
import { format, formatDistanceToNowStrict } from 'date-fns'
import {
    FiArrowLeft,
    FiArrowRight,
    FiBarChart2,
    FiCalendar,
    FiCheckCircle,
    FiChevronDown,
    FiEdit2,
    FiExternalLink,
    FiHome,
    FiUsers,
} from 'react-icons/fi'
import { useClickOutside } from '@/hooks/useClickOutside'
import { useEscapeKey } from '@/hooks/useEscapeKey'
import { adminBookings, adminProperties, type AdminProperty } from '@/lib/admin-mock-data'
import StatusPill from '@/components/admin/StatusPill'

const labelClass = 'text-[11px] uppercase tracking-[0.12em] text-ink-500 font-medium'

const formatRevenue = (n: number) => {
    if (n >= 1_000_000) return `₦${(n / 1_000_000).toFixed(1)}M`
    if (n >= 1_000) return `₦${Math.round(n / 1_000)}K`
    return `₦${n}`
}

const statusOptions: { value: AdminProperty['status']; label: string }[] = [
    { value: 'live', label: 'Live — bookable' },
    { value: 'draft', label: 'Draft — not visible' },
    { value: 'maintenance', label: 'Maintenance — paused' },
]

export default function AdminPropertyDetailPage() {
    const params = useParams()
    const router = useRouter()
    const id = typeof params?.id === 'string' ? params.id : ''
    const [statusMenuOpen, setStatusMenuOpen] = useState(false)
    const statusMenuRef = React.useRef<HTMLDivElement>(null)
    useClickOutside(statusMenuRef, () => setStatusMenuOpen(false), statusMenuOpen)
    useEscapeKey(statusMenuOpen, () => setStatusMenuOpen(false))

    const property = adminProperties.find((p) => p.id === id)

    const bookingsForProperty = useMemo(
        () =>
            property
                ? [...adminBookings]
                      .filter((b) => b.propertyId === property.id)
                      .sort((a, b) => b.checkIn.getTime() - a.checkIn.getTime())
                : [],
        [property],
    )

    if (!property) {
        return (
            <div className='max-w-2xl mx-auto pt-16 pb-32 text-center'>
                <span className='block text-xs uppercase tracking-[0.2em] text-ink-500 mb-4'>404</span>
                <h1 className='font-heading text-4xl text-ink-900 mb-3'>Property not found</h1>
                <p className='text-ink-500 text-sm'>
                    We couldn&apos;t find a property with ID <code className='font-mono'>{id}</code>.
                </p>
                <Link
                    href='/admin/properties'
                    className='inline-flex items-center gap-2 mt-8 text-sm text-emerald-700 hover:text-emerald-900 transition-colors'
                >
                    <FiArrowLeft size={14} />
                    Back to properties
                </Link>
            </div>
        )
    }

    const updateStatus = (next: AdminProperty['status']) => {
        // Frontend stub — wire to API later.
        // eslint-disable-next-line no-console
        console.log('[stub] update property status', property.id, '→', next)
        setStatusMenuOpen(false)
    }

    const now = new Date()
    const upcoming = bookingsForProperty.filter(
        (b) => b.checkIn >= now && b.status !== 'cancelled' && b.status !== 'completed',
    )
    const past = bookingsForProperty.filter(
        (b) => b.status === 'completed' || b.checkOut < now,
    )

    return (
        <div className='max-w-6xl mx-auto pt-4 pb-12'>
            {/* Breadcrumb */}
            <Link
                href='/admin/properties'
                className='inline-flex items-center gap-2 text-sm text-ink-500 hover:text-ink-900 transition-colors mb-6'
            >
                <FiArrowLeft size={14} />
                Back to properties
            </Link>

            {/* Header */}
            <header className='flex max-md:flex-col max-md:items-start max-md:gap-4 justify-between items-end mb-8'>
                <div>
                    <div className='flex items-center gap-3'>
                        <StatusPill status={property.status} />
                    </div>
                    <h1 className='font-heading text-3xl md:text-[32px] text-ink-900 leading-tight mt-2'>
                        {property.name}
                    </h1>
                    <p className='text-ink-500 mt-1 text-sm'>{property.neighborhood}</p>
                </div>

                <div className='flex flex-wrap items-center gap-2'>
                    <div ref={statusMenuRef} className='relative'>
                        <button
                            type='button'
                            onClick={() => setStatusMenuOpen((p) => !p)}
                            className='inline-flex items-center gap-1.5 text-sm text-ink-700 border border-cream-300 rounded-full px-4 py-2 hover:bg-cream-200 transition-colors cursor-pointer'
                        >
                            Status
                            <FiChevronDown
                                size={14}
                                className={`transition-transform ${statusMenuOpen ? 'rotate-180' : ''}`}
                            />
                        </button>
                        {statusMenuOpen && (
                            <div
                                role='menu'
                                className='absolute right-0 top-full mt-2 w-60 bg-cream-50 border border-cream-300 rounded-xl shadow-xl py-1.5 z-30 animate-fade-in-up'
                            >
                                {statusOptions.map((opt) => (
                                    <button
                                        key={opt.value}
                                        type='button'
                                        role='menuitem'
                                        onClick={() => updateStatus(opt.value)}
                                        className={`w-full flex items-center justify-between gap-2 px-4 py-2.5 text-sm transition-colors cursor-pointer ${
                                            property.status === opt.value
                                                ? 'bg-emerald-50 text-emerald-900 font-medium'
                                                : 'text-ink-700 hover:bg-cream-100'
                                        }`}
                                    >
                                        {opt.label}
                                        {property.status === opt.value && (
                                            <FiCheckCircle size={14} className='text-emerald-700' />
                                        )}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                    <button
                        type='button'
                        className='inline-flex items-center gap-1.5 text-sm text-ink-700 border border-cream-300 rounded-full px-4 py-2 hover:bg-cream-200 transition-colors cursor-pointer'
                    >
                        <FiEdit2 size={13} />
                        Edit
                    </button>
                    <a
                        href={`/stays/${property.id.replace(/^prop-/, '')}`}
                        target='_blank'
                        rel='noopener noreferrer'
                        className='inline-flex items-center gap-1.5 text-sm text-ink-700 border border-cream-300 rounded-full px-4 py-2 hover:bg-cream-200 transition-colors cursor-pointer'
                    >
                        <FiExternalLink size={13} />
                        View public
                    </a>
                </div>
            </header>

            {/* Hero image */}
            <div className='relative aspect-[16/7] rounded-2xl overflow-hidden bg-cream-200 mb-6'>
                <Image
                    src={require(`@/assets/images/properties/${property.image}`)}
                    alt={property.name}
                    fill
                    sizes='(min-width: 1024px) 1024px, 100vw'
                    className='object-cover'
                    priority
                />
            </div>

            {/* Stats grid */}
            <section className='grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8'>
                <StatTile
                    label='Occupancy'
                    value={`${property.occupancyRate}%`}
                    icon={<FiBarChart2 size={16} />}
                />
                <StatTile
                    label='Total bookings'
                    value={String(property.totalBookings)}
                    icon={<FiCalendar size={16} />}
                />
                <StatTile
                    label='Total revenue'
                    value={formatRevenue(property.totalRevenue)}
                    icon={<FiBarChart2 size={16} />}
                />
                <StatTile
                    label='Price / night'
                    value={`₦${property.pricePerNight.toLocaleString()}`}
                    icon={<FiHome size={16} />}
                />
            </section>

            {/* Specs + upcoming */}
            <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
                {/* Specs */}
                <section className='bg-cream-50 border border-cream-300 rounded-xl p-5'>
                    <h2 className='font-heading text-xl text-ink-900 mb-4'>Details</h2>
                    <dl className='space-y-3 text-sm'>
                        <SpecRow label='Bedrooms' value={String(property.bedrooms)} />
                        <SpecRow label='Bathrooms' value={String(property.bathrooms)} />
                        <SpecRow
                            label='Guest capacity'
                            value={
                                <span className='inline-flex items-center gap-1.5'>
                                    {property.guestCapacity}
                                    <FiUsers size={13} className='text-ink-500' />
                                </span>
                            }
                        />
                        <SpecRow label='Neighborhood' value={property.neighborhood} />
                        <SpecRow
                            label='Price / night'
                            value={`₦${property.pricePerNight.toLocaleString()}`}
                        />
                    </dl>
                </section>

                {/* Upcoming bookings */}
                <section className='lg:col-span-2 bg-cream-50 border border-cream-300 rounded-xl p-5'>
                    <div className='flex items-center justify-between mb-4'>
                        <h2 className='font-heading text-xl text-ink-900'>Upcoming bookings</h2>
                        <span className='text-xs text-ink-500 tabular-nums'>{upcoming.length}</span>
                    </div>
                    {upcoming.length === 0 ? (
                        <p className='text-sm text-ink-500 py-8 text-center'>
                            No upcoming bookings.
                        </p>
                    ) : (
                        <ul className='divide-y divide-cream-300 -my-3'>
                            {upcoming.map((b) => (
                                <li key={b.id}>
                                    <button
                                        type='button'
                                        onClick={() => router.push(`/admin/bookings/${b.id}`)}
                                        className='w-full py-3 flex items-center gap-3 text-left hover:bg-cream-100 -mx-2 px-2 rounded-lg transition-colors cursor-pointer'
                                    >
                                        <div className='w-9 h-9 rounded-full bg-cream-200 border border-cream-300 text-ink-900 flex items-center justify-center text-xs font-medium shrink-0'>
                                            {b.guestName
                                                .split(' ')
                                                .map((n) => n[0])
                                                .slice(0, 2)
                                                .join('')
                                                .toUpperCase()}
                                        </div>
                                        <div className='flex-1 min-w-0'>
                                            <p className='text-ink-900 font-medium truncate leading-tight'>
                                                {b.guestName}
                                            </p>
                                            <p className='text-xs text-ink-500'>
                                                {format(b.checkIn, 'MMM d')} – {format(b.checkOut, 'MMM d, yyyy')} · {b.nights}n
                                            </p>
                                        </div>
                                        <StatusPill status={b.status} />
                                        <FiArrowRight
                                            size={14}
                                            className='text-ink-300 shrink-0'
                                        />
                                    </button>
                                </li>
                            ))}
                        </ul>
                    )}
                </section>
            </div>

            {/* Past bookings */}
            {past.length > 0 && (
                <section className='bg-cream-50 border border-cream-300 rounded-xl p-5 mt-6'>
                    <div className='flex items-center justify-between mb-4'>
                        <h2 className='font-heading text-xl text-ink-900'>Recent stays</h2>
                        <span className='text-xs text-ink-500 tabular-nums'>{past.length}</span>
                    </div>
                    <ul className='divide-y divide-cream-300 -my-3'>
                        {past.slice(0, 6).map((b) => (
                            <li key={b.id}>
                                <button
                                    type='button'
                                    onClick={() => router.push(`/admin/bookings/${b.id}`)}
                                    className='w-full py-3 flex items-center gap-3 text-left hover:bg-cream-100 -mx-2 px-2 rounded-lg transition-colors cursor-pointer'
                                >
                                    <div className='w-9 h-9 rounded-full bg-cream-200 border border-cream-300 text-ink-900 flex items-center justify-center text-xs font-medium shrink-0'>
                                        {b.guestName
                                            .split(' ')
                                            .map((n) => n[0])
                                            .slice(0, 2)
                                            .join('')
                                            .toUpperCase()}
                                    </div>
                                    <div className='flex-1 min-w-0'>
                                        <p className='text-ink-900 font-medium truncate leading-tight'>
                                            {b.guestName}
                                        </p>
                                        <p className='text-xs text-ink-500'>
                                            {format(b.checkIn, 'MMM d, yyyy')} ·{' '}
                                            {formatDistanceToNowStrict(b.checkOut, { addSuffix: true })}
                                        </p>
                                    </div>
                                    <span className='text-sm text-ink-700 tabular-nums whitespace-nowrap'>
                                        ₦{b.totalAmount.toLocaleString()}
                                    </span>
                                    <StatusPill status={b.status} />
                                </button>
                            </li>
                        ))}
                    </ul>
                </section>
            )}
        </div>
    )
}

const StatTile = ({
    label,
    value,
    icon,
}: {
    label: string
    value: string
    icon: React.ReactNode
}) => (
    <div className='bg-cream-50 border border-cream-300 rounded-xl p-4'>
        <div className='flex items-center justify-between'>
            <p className={labelClass}>{label}</p>
            <span className='text-ink-400'>{icon}</span>
        </div>
        <p className='font-heading text-2xl text-ink-900 mt-1 tabular-nums'>{value}</p>
    </div>
)

const SpecRow = ({ label, value }: { label: string; value: React.ReactNode }) => (
    <div className='flex items-center justify-between gap-3'>
        <dt className='text-ink-500'>{label}</dt>
        <dd className='text-ink-900 font-medium'>{value}</dd>
    </div>
)
