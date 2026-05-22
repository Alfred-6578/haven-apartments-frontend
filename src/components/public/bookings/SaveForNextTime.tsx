'use client'
import React, { useState } from 'react'
import { FiArrowRight } from 'react-icons/fi'
import { IoCheckmarkCircleOutline } from 'react-icons/io5'

const SaveForNextTime = () => {
    const [password, setPassword] = useState('')
    const [dismissed, setDismissed] = useState(false)
    const [saved, setSaved] = useState(false)

    if (dismissed || saved) {
        return (
            <div className='booking-save-reveal mt-14 md:mt-20 rounded-2xl bg-cream-100 border border-cream-300 p-6 text-center'>
                <IoCheckmarkCircleOutline className='inline-block text-emerald-700 mb-2' size={24} />
                <p className='text-ink-700 text-sm'>
                    {saved
                        ? 'Account saved. You can sign in next time with the email you used.'
                        : "No problem. Your booking details are still on the way to your email."}
                </p>
            </div>
        )
    }

    return (
        <section className='booking-save-reveal mt-14 md:mt-20 rounded-2xl bg-ink-900 text-cream-100 p-8 md:p-10 lg:p-12 overflow-hidden relative'>
            <div
                className='absolute inset-0 pointer-events-none opacity-60'
                style={{
                    background:
                        'radial-gradient(ellipse at top right, rgba(45,74,62,0.25) 0%, rgba(26,22,20,0) 60%)',
                }}
                aria-hidden
            />
            <div className='relative grid lg:grid-cols-[1.2fr_1fr] gap-8 lg:gap-12 items-center'>
                <div>
                    <span className='block text-xs uppercase tracking-[0.2em] text-cream-200/60 mb-3 font-medium'>
                        Save this for next time?
                    </span>
                    <h3 className='font-heading text-2xl md:text-3xl text-cream-50 leading-tight mb-3'>
                        One password, <em className='italic'>no</em> forms next time.
                    </h3>
                    <p className='text-cream-200/70 leading-relaxed max-w-md'>
                        We've already got your details. Set a password and you can see this booking, plus book again in one tap.
                    </p>
                </div>

                <form
                    onSubmit={(e) => {
                        e.preventDefault()
                        if (password.length < 6) return
                        setSaved(true)
                    }}
                    className='flex flex-col gap-3'
                >
                    <label className='block'>
                        <span className='block text-[10px] uppercase tracking-[0.15em] text-cream-200/50 mb-2 font-medium'>
                            Choose a password
                        </span>
                        <input
                            type='password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder='At least 6 characters'
                            className='w-full bg-cream-100/10 border border-cream-100/20 rounded-full px-5 py-3 text-cream-50 placeholder:text-cream-200/40 focus:outline-none focus:border-cream-100/60 transition-colors'
                        />
                    </label>
                    <div className='flex flex-col sm:flex-row gap-3'>
                        <button
                            type='submit'
                            disabled={password.length < 6}
                            className='group flex-1 inline-flex items-center justify-center gap-2 bg-emerald-700 hover:bg-emerald-900 text-cream-50 font-medium px-6 py-3 rounded-full transition-colors cursor-pointer disabled:bg-cream-100/15 disabled:cursor-not-allowed disabled:hover:bg-cream-100/15'
                        >
                            Set password
                            <FiArrowRight className='transition-transform group-hover:translate-x-1' />
                        </button>
                        <button
                            type='button'
                            onClick={() => setDismissed(true)}
                            className='inline-flex items-center justify-center px-6 py-3 text-sm text-cream-200/70 hover:text-cream-50 underline-offset-4 hover:underline transition-colors cursor-pointer'
                        >
                            No thanks
                        </button>
                    </div>
                </form>
            </div>
        </section>
    )
}

export default SaveForNextTime
