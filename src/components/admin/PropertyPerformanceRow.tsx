'use client'
import React from 'react'
import Image from 'next/image'
import { FiMoreVertical } from 'react-icons/fi'
import StatusPill from './StatusPill'
import type { AdminProperty } from '@/lib/admin-mock-data'

const PropertyPerformanceRow = ({ property }: { property: AdminProperty }) => {
    return (
        <tr className='border-b border-cream-300 last:border-b-0 hover:bg-cream-100 transition-colors'>
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
                    <div className='min-w-0'>
                        <p className='text-ink-900 font-medium leading-tight'>{property.name}</p>
                        <p className='text-[13px] text-ink-500'>{property.neighborhood}</p>
                    </div>
                </div>
            </td>
            <td className='max-md:hidden py-4 px-4 text-ink-900 tabular-nums'>{property.totalBookings}</td>
            <td className='py-4 px-2 md:px-4 text-ink-900 tabular-nums whitespace-nowrap'>₦{property.totalRevenue.toLocaleString()}</td>
            <td className='max-md:hidden py-4 px-4 min-w-[160px]'>
                <div className='flex items-center gap-3'>
                    <div className='flex-1 h-1.5 bg-cream-200 rounded-full overflow-hidden'>
                        <div
                            className='h-full bg-emerald-700 rounded-full'
                            style={{ width: `${property.occupancyRate}%` }}
                        />
                    </div>
                    <span className='text-sm text-ink-700 tabular-nums w-9 text-right'>{property.occupancyRate}%</span>
                </div>
            </td>
            <td className='py-4 px-2 md:px-4'>
                <StatusPill status={property.status} />
            </td>
            <td className='py-4 px-2 md:px-4 text-right'>
                <button
                    type='button'
                    className='text-ink-500 hover:text-ink-900 p-1 transition-colors cursor-pointer'
                    aria-label={`More options for ${property.name}`}
                >
                    <FiMoreVertical size={18} />
                </button>
            </td>
        </tr>
    )
}

export default PropertyPerformanceRow
