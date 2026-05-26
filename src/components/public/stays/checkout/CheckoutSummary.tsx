'use client'
import React from 'react'
import Image from 'next/image'
import { format } from 'date-fns'
import { IoLocationOutline } from 'react-icons/io5'
import { FiArrowRight } from 'react-icons/fi'
import type { ProductCardProps } from '@/types/properties'

const CLEANING_FEE = 15000
const SERVICE_RATE = 0.05

interface Props {
    stay: ProductCardProps
    arrivalDate: Date | undefined
    departureDate: Date | undefined
    guestCount: number | undefined
}

const CheckoutSummary = ({ stay, arrivalDate, departureDate, guestCount }: Props) => {
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
            <div className='bg-cream-50 border border-cream-300 rounded-2xl p-6 shadow-sm'>
                <div className='flex gap-4 pb-5 border-b border-cream-300'>
                    <div className='relative w-20 h-20 rounded-xl overflow-hidden shrink-0'>
                        <Image
                            src={require(`@/assets/images/properties/${stay.image}`)}
                            alt={stay.name}
                            fill
                            sizes='80px'
                            className='object-cover'
                        />
                    </div>
                    <div className='min-w-0 flex flex-col justify-center'>
                        <span className='inline-block self-start text-[10px] uppercase tracking-[0.12em] px-2 py-0.5 bg-emerald-100 text-emerald-700 rounded-full mb-1.5 font-medium'>
                            {stay.tag}
                        </span>
                        <h3 className='font-heading text-base text-ink-900 leading-tight truncate'>{stay.name}</h3>
                        <p className='flex items-center gap-1 text-xs text-ink-500 mt-0.5 truncate'>
                            <IoLocationOutline className='shrink-0' /> {stay.address}
                        </p>
                    </div>
                </div>

                <div className='py-5 border-b border-cream-300 space-y-2 text-sm'>
                    <div className='flex justify-between text-ink-700'>
                        <span className='text-xs uppercase tracking-[0.12em] text-ink-500 font-medium'>Dates</span>
                        <span className='text-ink-900'>
                            {arrivalDate && departureDate
                                ? `${format(arrivalDate, 'MMM dd')} → ${format(departureDate, 'MMM dd')}`
                                : '—'}
                        </span>
                    </div>
                    <div className='flex justify-between text-ink-700'>
                        <span className='text-xs uppercase tracking-[0.12em] text-ink-500 font-medium'>Guests</span>
                        <span className='text-ink-900'>{guestCount ? `${guestCount}` : '—'}</span>
                    </div>
                </div>

                {nights > 0 ? (
                    <div className='py-5 space-y-3 text-sm border-b border-cream-300'>
                        <div className='flex justify-between text-ink-700'>
                            <span>
                                ₦{stay.price.toLocaleString()} × {nights} {nights > 1 ? 'nights' : 'night'}
                            </span>
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
                    </div>
                ) : (
                    <div className='py-5 text-sm text-ink-500 border-b border-cream-300'>
                        Pick dates on the stay page to see the breakdown.
                    </div>
                )}

                <div className='pt-5 flex justify-between items-baseline'>
                    <span className='font-heading text-lg text-ink-900 font-semibold'>Total</span>
                    <span className='font-heading text-2xl text-ink-900 font-semibold'>
                        ₦{total.toLocaleString()}
                    </span>
                </div>

                <button
                    type='submit'
                    form='checkout-form'
                    disabled={nights === 0}
                    className='group mt-5 w-full flex items-center justify-center gap-2 bg-emerald-700 hover:bg-emerald-900 text-cream-50 font-medium py-3.5 rounded-full transition-colors cursor-pointer disabled:bg-ink-300 disabled:cursor-not-allowed disabled:hover:bg-ink-300'
                >
                    Confirm and pay
                    <FiArrowRight className='transition-transform group-hover:translate-x-1' />
                </button>
                <p className='text-xs text-ink-500 text-center mt-3'>You won't be charged a hold</p>
            </div>
        </aside>
    )
}

export default CheckoutSummary
