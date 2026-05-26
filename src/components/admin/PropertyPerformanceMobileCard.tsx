'use client'
import React from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import StatusPill from './StatusPill'
import PropertyActionsMenu from './PropertyActionsMenu'
import type { AdminProperty } from '@/lib/admin-mock-data'

const formatRevenue = (n: number) => {
    if (n >= 1_000_000) return `₦${(n / 1_000_000).toFixed(1)}M`
    if (n >= 1_000) return `₦${Math.round(n / 1_000)}K`
    return `₦${n}`
}

const PropertyPerformanceMobileCard = ({ property }: { property: AdminProperty }) => {
    const router = useRouter()

    return (
        <article
            onClick={() => router.push(`/admin/properties/${property.id}`)}
            className='bg-cream-50 border border-cream-300 rounded-xl p-4 cursor-pointer hover:bg-cream-100 transition-colors'
        >
            <div className='flex items-start gap-3'>
                <div className='relative w-12 h-12 rounded-lg overflow-hidden shrink-0 bg-cream-200'>
                    <Image
                        src={require(`@/assets/images/properties/${property.image}`)}
                        alt={property.name}
                        fill
                        sizes='48px'
                        className='object-cover'
                    />
                </div>
                <div className='flex-1 min-w-0'>
                    <p className='text-ink-900 font-medium leading-tight truncate'>
                        {property.name}
                    </p>
                    <p className='text-[11px] text-ink-500 truncate'>{property.neighborhood}</p>
                </div>
                <div onClick={(e) => e.stopPropagation()} className='shrink-0'>
                    <PropertyActionsMenu property={property} />
                </div>
            </div>

            <div className='mt-3 pt-3 border-t border-cream-300 grid grid-cols-3 gap-3 text-xs'>
                <div>
                    <p className='text-ink-500 uppercase tracking-[0.1em] text-[10px]'>Bookings</p>
                    <p className='text-ink-900 mt-0.5 tabular-nums'>{property.totalBookings}</p>
                </div>
                <div>
                    <p className='text-ink-500 uppercase tracking-[0.1em] text-[10px]'>Revenue</p>
                    <p className='text-ink-900 mt-0.5 font-medium tabular-nums'>
                        {formatRevenue(property.totalRevenue)}
                    </p>
                </div>
                <div className='text-right'>
                    <p className='text-ink-500 uppercase tracking-[0.1em] text-[10px]'>Occupancy</p>
                    <p className='text-ink-900 mt-0.5 tabular-nums'>{property.occupancyRate}%</p>
                </div>
            </div>

            <div className='mt-3'>
                <StatusPill status={property.status} />
            </div>
        </article>
    )
}

export default PropertyPerformanceMobileCard
