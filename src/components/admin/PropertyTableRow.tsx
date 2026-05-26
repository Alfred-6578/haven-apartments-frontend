'use client'
import React from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import StatusPill from './StatusPill'
import PropertyActionsMenu from './PropertyActionsMenu'
import type { AdminProperty } from '@/lib/admin-mock-data'

const PropertyTableRow = ({ property }: { property: AdminProperty }) => {
    const router = useRouter()

    return (
        <tr
            className='border-b border-cream-300 last:border-b-0 hover:bg-cream-100 transition-colors cursor-pointer'
            onClick={() => router.push(`/admin/properties/${property.id}`)}
        >
            <td className='py-4 px-2 md:px-4'>
                <div className='flex items-center gap-3'>
                    <div className='relative w-12 h-12 rounded-lg overflow-hidden shrink-0 bg-cream-200'>
                        <Image
                            src={require(`@/assets/images/properties/${property.image}`)}
                            alt={property.name}
                            fill
                            sizes='48px'
                            className='object-cover'
                        />
                    </div>
                    <p className='text-ink-900 font-medium leading-tight'>{property.name}</p>
                </div>
            </td>
            <td className='max-md:hidden py-4 px-4 text-ink-700'>{property.neighborhood}</td>
            <td className='max-md:hidden py-4 px-4 text-ink-700 text-sm whitespace-nowrap'>
                {property.bedrooms}BR · {property.bathrooms} bath · sleeps {property.guestCapacity}
            </td>
            <td className='py-4 px-2 md:px-4 text-ink-900 tabular-nums whitespace-nowrap'>
                ₦{property.pricePerNight.toLocaleString()}
            </td>
            <td className='max-md:hidden py-4 px-4 min-w-[160px]'>
                <div className='flex items-center gap-3'>
                    <div className='flex-1 h-1 bg-cream-300 rounded-full overflow-hidden'>
                        <div
                            className='h-full bg-emerald-700 rounded-full'
                            style={{ width: `${property.occupancyRate}%` }}
                        />
                    </div>
                    <span className='text-sm text-ink-700 tabular-nums w-9 text-right'>
                        {property.occupancyRate}%
                    </span>
                </div>
            </td>
            <td className='max-md:hidden py-4 px-4 text-ink-900 tabular-nums whitespace-nowrap'>
                ₦{property.totalRevenue.toLocaleString()}
            </td>
            <td className='py-4 px-2 md:px-4'>
                <StatusPill status={property.status} />
            </td>
            <td className='py-4 px-2 md:px-4 text-right' onClick={(e) => e.stopPropagation()}>
                <PropertyActionsMenu property={property} />
            </td>
        </tr>
    )
}

export default PropertyTableRow
