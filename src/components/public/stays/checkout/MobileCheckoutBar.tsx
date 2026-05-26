'use client'
import React from 'react'
import { FiArrowRight } from 'react-icons/fi'
import type { ProductCardProps } from '@/types/properties'

const CLEANING_FEE = 15000
const SERVICE_RATE = 0.05

interface Props {
    stay: ProductCardProps
    arrivalDate: Date | undefined
    departureDate: Date | undefined
}

const MobileCheckoutBar = ({ stay, arrivalDate, departureDate }: Props) => {
    const nights =
        arrivalDate && departureDate
            ? Math.max(0, Math.round((departureDate.getTime() - arrivalDate.getTime()) / 86400000))
            : 0
    const subtotal = nights * stay.price
    const cleaningFee = nights > 0 ? CLEANING_FEE : 0
    const serviceFee = Math.round(subtotal * SERVICE_RATE)
    const total = subtotal + cleaningFee + serviceFee

    return (
        <div
            className='lg:hidden fixed bottom-0 inset-x-0 z-40 bg-cream-50/95 backdrop-blur border-t border-cream-300 px-5 py-4'
            style={{ paddingBottom: 'max(1rem, env(safe-area-inset-bottom))' }}
        >
            <div className='flex items-center justify-between gap-4 max-w-7xl mx-auto'>
                <div className='min-w-0'>
                    <p className='text-[10px] uppercase tracking-[0.12em] text-ink-500 font-medium mb-0.5'>
                        {nights > 0 ? `Total · ${nights} ${nights > 1 ? 'nights' : 'night'}` : 'Total'}
                    </p>
                    <p className='font-heading text-xl text-ink-900 font-semibold truncate'>
                        {nights > 0 ? `₦${total.toLocaleString()}` : '—'}
                    </p>
                </div>
                <button
                    type='submit'
                    form='checkout-form'
                    disabled={nights === 0}
                    className='group flex items-center gap-2 bg-emerald-700 hover:bg-emerald-900 text-cream-50 font-medium px-5 py-3 rounded-full transition-colors cursor-pointer disabled:bg-ink-300 disabled:cursor-not-allowed disabled:hover:bg-ink-300 shrink-0'
                >
                    Confirm and pay
                    <FiArrowRight className='transition-transform group-hover:translate-x-1' />
                </button>
            </div>
        </div>
    )
}

export default MobileCheckoutBar
