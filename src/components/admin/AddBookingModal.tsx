'use client'
import React, { useState } from 'react'
import { FiArrowRight } from 'react-icons/fi'
import Modal from './Modal'
import { adminProperties } from '@/lib/admin-mock-data'

interface Props {
    isOpen: boolean
    onClose: () => void
}

const AddBookingModal = ({ isOpen, onClose }: Props) => {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [propertyId, setPropertyId] = useState(adminProperties[0].id)
    const [checkIn, setCheckIn] = useState('')
    const [checkOut, setCheckOut] = useState('')
    const [guests, setGuests] = useState(1)

    const reset = () => {
        setFirstName('')
        setLastName('')
        setEmail('')
        setPhone('')
        setPropertyId(adminProperties[0].id)
        setCheckIn('')
        setCheckOut('')
        setGuests(1)
    }

    const close = () => {
        onClose()
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        // Frontend stub — wire to API later.
        // eslint-disable-next-line no-console
        console.log('[stub] create booking', {
            firstName,
            lastName,
            email,
            phone,
            propertyId,
            checkIn,
            checkOut,
            guests,
        })
        reset()
        close()
    }

    const inputClass =
        'w-full bg-cream-50 border border-cream-300 rounded-lg px-3.5 py-2.5 text-sm text-ink-900 placeholder:text-ink-300 focus:outline-none focus:border-ink-700 transition-colors'
    const labelClass = 'block text-[11px] uppercase tracking-[0.12em] text-ink-500 font-medium mb-1.5'

    return (
        <Modal isOpen={isOpen} onClose={close} title='Add booking'>
            <form onSubmit={handleSubmit} className='space-y-4'>
                <div className='grid grid-cols-2 gap-3'>
                    <label className='block'>
                        <span className={labelClass}>First name</span>
                        <input
                            type='text'
                            required
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            placeholder='Ada'
                            className={inputClass}
                        />
                    </label>
                    <label className='block'>
                        <span className={labelClass}>Last name</span>
                        <input
                            type='text'
                            required
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            placeholder='Okafor'
                            className={inputClass}
                        />
                    </label>
                </div>

                <label className='block'>
                    <span className={labelClass}>Email</span>
                    <input
                        type='email'
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder='guest@example.com'
                        className={inputClass}
                    />
                </label>

                <label className='block'>
                    <span className={labelClass}>Phone</span>
                    <input
                        type='tel'
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder='+234 800 000 0000'
                        className={inputClass}
                    />
                </label>

                <label className='block'>
                    <span className={labelClass}>Property</span>
                    <select
                        required
                        value={propertyId}
                        onChange={(e) => setPropertyId(e.target.value)}
                        className={`${inputClass} appearance-none cursor-pointer`}
                    >
                        {adminProperties.map(p => (
                            <option key={p.id} value={p.id}>
                                {p.name} — {p.neighborhood}
                            </option>
                        ))}
                    </select>
                </label>

                <div className='grid grid-cols-2 gap-3'>
                    <label className='block'>
                        <span className={labelClass}>Check in</span>
                        <input
                            type='date'
                            required
                            value={checkIn}
                            onChange={(e) => setCheckIn(e.target.value)}
                            className={inputClass}
                        />
                    </label>
                    <label className='block'>
                        <span className={labelClass}>Check out</span>
                        <input
                            type='date'
                            required
                            value={checkOut}
                            min={checkIn || undefined}
                            onChange={(e) => setCheckOut(e.target.value)}
                            className={inputClass}
                        />
                    </label>
                </div>

                <label className='block'>
                    <span className={labelClass}>Guests</span>
                    <input
                        type='number'
                        required
                        min={1}
                        max={20}
                        value={guests}
                        onChange={(e) => setGuests(parseInt(e.target.value) || 1)}
                        className={inputClass}
                    />
                </label>

                <div className='flex items-center justify-end gap-3 pt-3 mt-2 border-t border-cream-300'>
                    <button
                        type='button'
                        onClick={close}
                        className='px-5 py-2.5 rounded-full text-sm text-ink-700 hover:bg-cream-200 transition-colors cursor-pointer'
                    >
                        Cancel
                    </button>
                    <button
                        type='submit'
                        className='group inline-flex items-center gap-2 bg-emerald-700 hover:bg-emerald-900 text-cream-50 text-sm font-medium px-5 py-2.5 rounded-full transition-colors cursor-pointer'
                    >
                        Create booking
                        <FiArrowRight
                            size={14}
                            className='transition-transform group-hover:translate-x-1'
                        />
                    </button>
                </div>
            </form>
        </Modal>
    )
}

export default AddBookingModal
