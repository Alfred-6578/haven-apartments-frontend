'use client'
import React, { useState } from 'react'
import { IoCheckmarkSharp, IoCopyOutline } from 'react-icons/io5'
import { FaCheck } from 'react-icons/fa6'

const BookingHero = ({ reference }: { reference: string }) => {
    const [copied, setCopied] = useState(false)

    const copy = async () => {
        try {
            await navigator.clipboard.writeText(reference)
            setCopied(true)
            setTimeout(() => setCopied(false), 1800)
        } catch {
            // clipboard unavailable — quietly ignore
        }
    }

    return (
        <div className='text-center'>
            <div className='booking-check-reveal inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 mb-6'>
                <IoCheckmarkSharp size={32} strokeWidth={3} />
            </div>

            <span className='booking-eyebrow-reveal block text-xs uppercase tracking-[0.2em] text-ink-500 mb-3 font-medium'>
                Booking confirmed
            </span>

            <h1 className='booking-headline-reveal font-heading text-4xl xsm:text-5xl md:text-6xl lg:text-7xl text-ink-900 font-semibold leading-[1.02] mb-5'>
                You're <em className='italic'>in.</em>
            </h1>

            <p className='booking-subtitle-reveal text-ink-700 text-lg leading-relaxed max-w-xl mx-auto mb-10'>
                Your stay is set. We've sent the booking details and your host's WhatsApp to the email on file.
            </p>

            <button
                type='button'
                onClick={copy}
                className='booking-ref-reveal group inline-flex items-center gap-4 bg-cream-100 border border-cream-300 hover:border-ink-300 rounded-xl pl-6 pr-4 py-4 transition-colors cursor-pointer'
                aria-label='Copy booking reference'
            >
                <div className='text-left'>
                    <p className='text-[10px] uppercase tracking-[0.15em] text-ink-500 font-medium mb-0.5'>
                        Booking reference
                    </p>
                    <p className='font-heading text-xl text-ink-900 tabular-nums tracking-wider'>{reference}</p>
                </div>
                <span className='w-9 h-9 rounded-full bg-ink-900 group-hover:bg-emerald-700 text-cream-50 flex items-center justify-center transition-colors'>
                    {copied ? <FaCheck size={14} /> : <IoCopyOutline size={16} />}
                </span>
            </button>
        </div>
    )
}

export default BookingHero
