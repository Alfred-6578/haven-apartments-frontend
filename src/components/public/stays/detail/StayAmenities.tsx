'use client'
import React from 'react'
import {
    IoWifiOutline,
    IoSnowOutline,
    IoRestaurantOutline,
    IoTvOutline,
    IoCarOutline,
    IoFlashOutline,
    IoKeyOutline,
    IoShieldCheckmarkOutline,
    IoSparklesOutline,
} from 'react-icons/io5'
import { useInView } from '@/hooks/useInView'

const amenities = [
    { icon: IoWifiOutline, label: 'High-speed wifi' },
    { icon: IoSnowOutline, label: 'Air conditioning' },
    { icon: IoRestaurantOutline, label: 'Full kitchen' },
    { icon: IoTvOutline, label: 'Smart TV' },
    { icon: IoFlashOutline, label: '24/7 power' },
    { icon: IoCarOutline, label: 'Secured parking' },
    { icon: IoKeyOutline, label: 'Self check-in' },
    { icon: IoShieldCheckmarkOutline, label: '24/7 security' },
    { icon: IoSparklesOutline, label: 'Daily cleaning' },
]

const StayAmenities = () => {
    const { ref, visible } = useInView<HTMLElement>()

    return (
        <section ref={ref} className='py-10 border-b border-cream-300'>
            <h2 className='font-heading text-2xl md:text-3xl text-ink-900 mb-6'>What this stay offers</h2>
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8'>
                {amenities.map((amenity, i) => {
                    const Icon = amenity.icon
                    return (
                        <div
                            key={amenity.label}
                            className={`flex items-center gap-3 ${visible ? '' : 'opacity-0'}`}
                            style={{
                                animation: visible
                                    ? `fade-in-up 0.6s cubic-bezier(0.22, 0.61, 0.36, 1) ${i * 50}ms backwards`
                                    : undefined,
                            }}
                        >
                            <span className='w-10 h-10 rounded-lg bg-cream-100 flex items-center justify-center text-ink-800 shrink-0'>
                                <Icon size={18} />
                            </span>
                            <span className='text-ink-700'>{amenity.label}</span>
                        </div>
                    )
                })}
            </div>
        </section>
    )
}

export default StayAmenities
