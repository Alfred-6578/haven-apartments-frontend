'use client'
import React from 'react'
import { IoLockClosedOutline, IoCardOutline } from 'react-icons/io5'

const PaymentSection = () => {
    return (
        <section className='py-10'>
            <h2 className='font-heading text-2xl md:text-3xl text-ink-900 mb-2'>Pay</h2>
            <p className='text-ink-500 text-sm mb-6'>
                Secure payment via Paystack — cards, bank transfer, and USSD all welcome.
            </p>

            <div className='border border-cream-300 rounded-xl p-5 bg-cream-50 flex items-center gap-4'>
                <span className='w-11 h-11 rounded-full bg-ink-900 text-cream-50 flex items-center justify-center shrink-0'>
                    <IoCardOutline size={20} />
                </span>
                <div className='flex-1 min-w-0'>
                    <p className='text-ink-900 font-medium'>Paystack</p>
                    <p className='text-ink-500 text-sm'>You'll enter card details on the next step.</p>
                </div>
                <IoLockClosedOutline className='text-ink-400 shrink-0' size={18} />
            </div>

            <p className='mt-5 text-xs text-ink-500 leading-relaxed'>
                By selecting <span className='text-ink-900 font-medium'>Reserve</span>, you agree to Haven Homes'{' '}
                <a href='/terms' className='underline underline-offset-2 hover:text-ink-900'>House Rules</a>
                ,{' '}
                <a href='/refunds' className='underline underline-offset-2 hover:text-ink-900'>Refund Policy</a>
                , and that Haven Homes can charge your payment method if you cause damage.
            </p>
        </section>
    )
}

export default PaymentSection
