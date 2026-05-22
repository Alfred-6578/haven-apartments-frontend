'use client'
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { FiMapPin } from 'react-icons/fi'
import type { AdminProperty } from '@/lib/admin-mock-data'

const formatRevenue = (n: number) => {
    if (n >= 1_000_000) return `₦${(n / 1_000_000).toFixed(1)}M`
    if (n >= 1_000) return `₦${Math.round(n / 1_000)}K`
    return `₦${n}`
}

const overlayPillFor: Record<AdminProperty['status'], string> = {
    live: 'text-emerald-900',
    draft: 'text-ink-700',
    maintenance: 'text-warning',
}

const PropertyGridCard = ({ property }: { property: AdminProperty }) => {
    return (
        <Link
            href={`/admin/properties/${property.id}`}
            className='group block bg-cream-50 border border-cream-300 rounded-2xl hover:shadow-lg transition-shadow'
        >
            {/* Image */}
            <div className='relative aspect-[4/3] overflow-hidden rounded-t-2xl bg-cream-200'>
                <Image
                    src={require(`@/assets/images/properties/${property.image}`)}
                    alt={property.name}
                    fill
                    sizes='(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw'
                    className='object-cover group-hover:scale-[1.02] transition-transform duration-500'
                />
                <span
                    className={`absolute top-3 right-3 inline-block text-[11px] uppercase tracking-[0.1em] font-medium px-2.5 py-1 rounded-full bg-cream-50/95 backdrop-blur ${overlayPillFor[property.status]}`}
                >
                    {property.status === 'live'
                        ? 'Live'
                        : property.status === 'draft'
                          ? 'Draft'
                          : 'Maintenance'}
                </span>
            </div>

            {/* Body */}
            <div className='p-5'>
                <h3 className='font-heading text-xl text-ink-900 leading-tight mb-1'>
                    {property.name}
                </h3>
                <p className='flex items-center gap-1 text-[13px] text-ink-500 mb-3'>
                    <FiMapPin size={12} />
                    {property.neighborhood}
                </p>
                <p className='text-[13px] text-ink-700 mb-3'>
                    {property.bedrooms}BR · {property.bathrooms} bath · sleeps {property.guestCapacity}
                </p>
                <p className='text-ink-900 font-medium'>
                    ₦{property.pricePerNight.toLocaleString()}
                    <span className='text-ink-500 font-normal text-sm'>/night</span>
                </p>

                {/* Footer stats */}
                <div className='grid grid-cols-2 gap-3 pt-4 mt-4 border-t border-cream-300'>
                    <div>
                        <p className='text-[10px] uppercase tracking-[0.12em] text-ink-500 font-medium'>
                            Occupancy
                        </p>
                        <p className='text-ink-900 font-medium mt-0.5 tabular-nums'>
                            {property.occupancyRate}%
                        </p>
                    </div>
                    <div>
                        <p className='text-[10px] uppercase tracking-[0.12em] text-ink-500 font-medium'>
                            Revenue
                        </p>
                        <p className='text-ink-900 font-medium mt-0.5 tabular-nums'>
                            {formatRevenue(property.totalRevenue)}
                        </p>
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default PropertyGridCard
