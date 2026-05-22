'use client'
import React, { useState } from 'react'
import { FaWhatsapp } from 'react-icons/fa'

const GuestForm = () => {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [note, setNote] = useState('')

    return (
        <section className='py-10 border-b border-cream-300'>
            <h2 className='font-heading text-2xl md:text-3xl text-ink-900 mb-2'>Who's coming</h2>
            <p className='text-ink-500 text-sm mb-6'>
                We'll send your booking details and the host's contact info here.
            </p>

            <div className='space-y-5'>
                <div className='grid sm:grid-cols-2 gap-4'>
                    <label className='block'>
                        <span className='block text-xs uppercase tracking-[0.12em] text-ink-500 mb-2 font-medium'>
                            First name
                        </span>
                        <input
                            type='text'
                            required
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            placeholder='Ada'
                            className='w-full bg-cream-50 border border-cream-300 rounded-xl px-4 py-3 text-ink-900 placeholder:text-ink-300 focus:outline-none focus:border-ink-700 transition-colors'
                        />
                    </label>
                    <label className='block'>
                        <span className='block text-xs uppercase tracking-[0.12em] text-ink-500 mb-2 font-medium'>
                            Last name
                        </span>
                        <input
                            type='text'
                            required
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            placeholder='Okafor'
                            className='w-full bg-cream-50 border border-cream-300 rounded-xl px-4 py-3 text-ink-900 placeholder:text-ink-300 focus:outline-none focus:border-ink-700 transition-colors'
                        />
                    </label>
                </div>

                <label className='block'>
                    <span className='block text-xs uppercase tracking-[0.12em] text-ink-500 mb-2 font-medium'>
                        Email
                    </span>
                    <input
                        type='email'
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder='you@example.com'
                        className='w-full bg-cream-50 border border-cream-300 rounded-xl px-4 py-3 text-ink-900 placeholder:text-ink-300 focus:outline-none focus:border-ink-700 transition-colors'
                    />
                </label>

                <label className='block'>
                    <span className='flex items-center gap-1.5 text-xs uppercase tracking-[0.12em] text-ink-500 mb-2 font-medium'>
                        Phone
                        <FaWhatsapp className='text-emerald-700' size={12} />
                        <span className='normal-case tracking-normal text-ink-400 font-normal'>
                            — we'll use this on WhatsApp
                        </span>
                    </span>
                    <input
                        type='tel'
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder='+234 800 000 0000'
                        className='w-full bg-cream-50 border border-cream-300 rounded-xl px-4 py-3 text-ink-900 placeholder:text-ink-300 focus:outline-none focus:border-ink-700 transition-colors'
                    />
                </label>

                <label className='block'>
                    <span className='block text-xs uppercase tracking-[0.12em] text-ink-500 mb-2 font-medium'>
                        Note to host{' '}
                        <span className='normal-case tracking-normal text-ink-400 font-normal'>— optional</span>
                    </span>
                    <textarea
                        rows={4}
                        value={note}
                        onChange={(e) => setNote(e.target.value)}
                        placeholder='Arriving late, traveling with kids, anything we should know.'
                        className='w-full bg-cream-50 border border-cream-300 rounded-xl px-4 py-3 text-ink-900 placeholder:text-ink-300 focus:outline-none focus:border-ink-700 transition-colors resize-none'
                    />
                </label>
            </div>
        </section>
    )
}

export default GuestForm
