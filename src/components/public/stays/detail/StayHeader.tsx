import React from 'react'
import { IoLocationOutline, IoPeopleOutline } from 'react-icons/io5'
import { LiaBedSolid } from 'react-icons/lia'
import { MdOutlineBathtub } from 'react-icons/md'
import type { ProductCardProps } from '@/types/properties'

const descriptionFor = (stay: ProductCardProps) => {
    const intros: Record<string, string> = {
        New: "A fresh addition to our shortlist. We've stayed here ourselves — it earned its spot quickly.",
        'Quiet Stay': 'For when you need the city to step back. Soft mornings, no foot traffic, the kind of place you exhale into.',
        Family: 'Built for kids underfoot and adults who need their own corner. Generous spaces, considered storage, the small details that matter by day three.',
        Boutique: 'Small, particular, ours. Hand-picked finishes and a host who answers when something matters.',
        Business: 'Wired for video calls and grown-up dinner reservations. Strong wifi, a real desk, blackout blinds.',
        'City View': 'The city, framed. Floor-to-ceiling windows and a view that earns the rent.',
    }
    return intros[stay.tag] || 'One of the collection. Quietly chosen, warmly kept.'
}

const StayHeader = ({ stay }: { stay: ProductCardProps }) => {
    return (
        <div>
            <span className='stay-tag-reveal inline-block text-xs px-2.5 py-1 bg-emerald-100 text-emerald-700 rounded-full mb-4 font-medium'>
                {stay.tag}
            </span>
            <h1 className='stay-title-reveal font-heading text-2xl vsm:text-3xl sm:text-4xl text-ink-900 font-semibold leading-[1.05]'>
                {stay.name}
            </h1>
            <p className='stay-address-reveal flex items-center gap-1.5 mt-2 text-ink-600'>
                <IoLocationOutline /> {stay.address}
            </p>
            <p className='stay-facts-reveal text-ink-700 text-base md:text-lg leading-relaxed mt-4 max-w-2xl'>
                {descriptionFor(stay)}
            </p>

            <div className='flex flex-wrap gap-x-7 gap-y-3 mt-6 pb-8 border-b border-cream-300 text-ink-700'>
                <span className='flex items-center gap-2'>
                    <IoPeopleOutline size={20} className='text-ink-500' />
                    <b className='text-ink-900'>{stay.guestCapacity}</b> Guests
                </span>
                <span className='flex items-center gap-2'>
                    <LiaBedSolid size={20} className='text-ink-500' />
                    <b className='text-ink-900'>{stay.bedrooms}</b> {stay.bedrooms > 1 ? 'Bedrooms' : 'Bedroom'}
                </span>
                <span className='flex items-center gap-2'>
                    <MdOutlineBathtub size={20} className='text-ink-500' />
                    <b className='text-ink-900'>{stay.bathrooms}</b> {stay.bathrooms > 1 ? 'Bathrooms' : 'Bathroom'}
                </span>
            </div>
        </div>
    )
}

export default StayHeader
