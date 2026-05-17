'use client'
import React, { useRef, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { format } from 'date-fns'
import {
    IoShieldCheckmarkOutline,
    IoCheckmarkCircleOutline,
    IoLockClosedOutline,
} from 'react-icons/io5'
import { FiArrowRight } from 'react-icons/fi'
import { GoChevronDown } from 'react-icons/go'
import HeroDatePicker from '@/components/ui/HeroDatePicker'
import GuestPicker from '@/components/ui/GuestPicker'
import { useClickOutside } from '@/hooks/useClickOutside'
import type { ProductCardProps } from '@/types/properties'

const CLEANING_FEE = 15000
const SERVICE_RATE = 0.05

const StayBookingCard = ({ stay }: { stay: ProductCardProps }) => {
    const searchParams = useSearchParams()

    const [arrivalDate, setArrivalDate] = useState<Date | undefined>(() => {
        const a = searchParams.get('arrival')
        return a ? new Date(a) : undefined
    })
    const [departureDate, setDepartureDate] = useState<Date | undefined>(() => {
        const d = searchParams.get('departure')
        return d ? new Date(d) : undefined
    })
    const [guestCount, setGuestCount] = useState<number | undefined>(() => {
        const g = searchParams.get('guests')
        return g ? parseInt(g) : undefined
    })

    const [arrivalOpen, setArrivalOpen] = useState(false)
    const [departureOpen, setDepartureOpen] = useState(false)
    const [guestOpen, setGuestOpen] = useState(false)
    const arrivalRef = useRef<HTMLDivElement>(null)
    const departureRef = useRef<HTMLDivElement>(null)
    const guestRef = useRef<HTMLDivElement>(null)

    useClickOutside(arrivalRef, () => setArrivalOpen(false), arrivalOpen)
    useClickOutside(departureRef, () => setDepartureOpen(false), departureOpen)
    useClickOutside(guestRef, () => setGuestOpen(false), guestOpen)

    const handleArrivalSelect = (date: Date | undefined) => {
        setArrivalDate(date)
        setArrivalOpen(false)
        if (date && departureDate && date >= departureDate) setDepartureDate(undefined)
    }
    const handleDepartureSelect = (date: Date | undefined) => {
        setDepartureDate(date)
        setDepartureOpen(false)
    }

    const nights =
        arrivalDate && departureDate
            ? Math.max(0, Math.round((departureDate.getTime() - arrivalDate.getTime()) / 86400000))
            : 0
    const subtotal = nights * stay.price
    const cleaningFee = nights > 0 ? CLEANING_FEE : 0
    const serviceFee = Math.round(subtotal * SERVICE_RATE)
    const total = subtotal + cleaningFee + serviceFee

    return (
        <aside className='lg:sticky lg:top-28 self-start'>
            <div className='stay-booking-card-reveal bg-cream-50 border border-cream-300 rounded-2xl p-6 md:p-7 shadow-sm'>
                <div className='mb-5'>
                    <span className='font-heading text-3xl text-ink-900 font-semibold'>
                        ₦{stay.price.toLocaleString()}
                    </span>
                    <span className='text-ink-500 text-sm ml-1'>/ night</span>
                </div>

                <div className='border border-cream-300 rounded-xl mb-4'>
                    <div className='grid grid-cols-2 divide-x divide-cream-300'>
                        <div ref={arrivalRef} className='relative'>
                            <button
                                type='button'
                                onClick={() => setArrivalOpen(prev => !prev)}
                                className='w-full px-3.5 py-3 text-left hover:bg-cream-100 rounded-tl-xl transition-colors cursor-pointer'
                            >
                                <span className='block text-[10px] uppercase tracking-[0.12em] text-ink-500 mb-0.5 font-medium'>
                                    Check in
                                </span>
                                <span className={`block text-sm ${arrivalDate ? 'text-ink-900' : 'text-ink-300'}`}>
                                    {arrivalDate ? format(arrivalDate, 'MMM dd, yyyy') : 'Add date'}
                                </span>
                            </button>
                            {arrivalOpen && (
                                <div className='absolute z-30 top-full left-0'>
                                    <HeroDatePicker selected={arrivalDate} type='arrival' onSelect={handleArrivalSelect} />
                                </div>
                            )}
                        </div>
                        <div ref={departureRef} className='relative'>
                            <button
                                type='button'
                                onClick={() => {
                                    if (!arrivalDate) {
                                        setArrivalOpen(true)
                                        return
                                    }
                                    setDepartureOpen(prev => !prev)
                                }}
                                className='w-full px-3.5 py-3 text-left hover:bg-cream-100 rounded-tr-xl transition-colors cursor-pointer'
                            >
                                <span className='block text-[10px] uppercase tracking-[0.12em] text-ink-500 mb-0.5 font-medium'>
                                    Check out
                                </span>
                                <span className={`block text-sm ${departureDate ? 'text-ink-900' : 'text-ink-300'}`}>
                                    {departureDate ? format(departureDate, 'MMM dd, yyyy') : 'Add date'}
                                </span>
                            </button>
                            {departureOpen && (
                                <div className='absolute z-30 top-full right-0'>
                                    <HeroDatePicker
                                        selected={departureDate}
                                        type='departure'
                                        arrivalDate={arrivalDate}
                                        onSelect={handleDepartureSelect}
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                    <div ref={guestRef} className='relative border-t border-cream-300'>
                        <button
                            type='button'
                            onClick={() => setGuestOpen(prev => !prev)}
                            className='w-full px-3.5 py-3 text-left hover:bg-cream-100 rounded-b-xl transition-colors cursor-pointer flex items-center justify-between'
                        >
                            <span>
                                <span className='block text-[10px] uppercase tracking-[0.12em] text-ink-500 mb-0.5 font-medium'>
                                    Guests
                                </span>
                                <span className={`block text-sm ${guestCount ? 'text-ink-900' : 'text-ink-300'}`}>
                                    {guestCount ? `${guestCount} ${guestCount === 1 ? 'Guest' : 'Guests'}` : 'Add guests'}
                                </span>
                            </span>
                            <GoChevronDown className='text-ink-400' />
                        </button>
                        {guestOpen && (
                            <div className='absolute z-30 top-full left-0 right-0'>
                                <GuestPicker
                                    guestCapacity={stay.guestCapacity}
                                    setGuestCount={(n) => {
                                        setGuestCount(n)
                                        setGuestOpen(false)
                                    }}
                                />
                            </div>
                        )}
                    </div>
                </div>

                {nights > 0 && (
                    <p className='text-xs text-ink-500 mb-4'>
                        {nights} {nights > 1 ? 'nights' : 'night'} · {guestCount ?? 1} {(guestCount ?? 1) > 1 ? 'guests' : 'guest'}
                    </p>
                )}

                <button className='group w-full flex items-center justify-center gap-2 bg-emerald-700 hover:bg-emerald-900 text-cream-50 font-medium py-3.5 rounded-full transition-colors cursor-pointer'>
                    Reserve
                    <FiArrowRight className='transition-transform group-hover:translate-x-1' />
                </button>
                <p className='text-xs text-ink-500 text-center mt-3'>You won't be charged yet</p>

                {nights > 0 && (
                    <div className='mt-6 pt-5 border-t border-cream-300 space-y-3 text-sm'>
                        <div className='flex justify-between text-ink-700'>
                            <span>₦{stay.price.toLocaleString()} × {nights} {nights > 1 ? 'nights' : 'night'}</span>
                            <span>₦{subtotal.toLocaleString()}</span>
                        </div>
                        <div className='flex justify-between text-ink-700'>
                            <span>Cleaning fee</span>
                            <span>₦{cleaningFee.toLocaleString()}</span>
                        </div>
                        <div className='flex justify-between text-ink-700'>
                            <span>Service fee</span>
                            <span>₦{serviceFee.toLocaleString()}</span>
                        </div>
                        <div className='flex justify-between font-bold text-ink-900 pt-3 border-t border-cream-300 text-base'>
                            <span>Total</span>
                            <span>₦{total.toLocaleString()}</span>
                        </div>
                    </div>
                )}
            </div>

            <ul className='mt-5 space-y-2.5 text-sm text-ink-500 px-1'>
                <li className='flex items-center gap-2.5'>
                    <IoShieldCheckmarkOutline className='text-ink-700 shrink-0' />
                    Free cancellation up to 24hrs before check-in
                </li>
                <li className='flex items-center gap-2.5'>
                    <IoCheckmarkCircleOutline className='text-ink-700 shrink-0' />
                    Instant confirmation
                </li>
                <li className='flex items-center gap-2.5'>
                    <IoLockClosedOutline className='text-ink-700 shrink-0' />
                    Secure payment via Paystack
                </li>
            </ul>
        </aside>
    )
}

export default StayBookingCard
