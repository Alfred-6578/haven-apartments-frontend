'use client'
import React, { useEffect, useState } from 'react'
import { FiCheck } from 'react-icons/fi'
import { format } from 'date-fns'
import Modal from './Modal'
import { adminProperties, type Booking } from '@/lib/admin-mock-data'

interface Props {
    booking: Booking | null
    isOpen: boolean
    onClose: () => void
}

const inputClass =
    'w-full bg-cream-50 border border-cream-300 rounded-lg px-3.5 py-2.5 text-sm text-ink-900 placeholder:text-ink-300 focus:outline-none focus:border-ink-700 transition-colors'
const labelClass = 'block text-[11px] uppercase tracking-[0.12em] text-ink-500 font-medium mb-1.5'

const splitName = (full: string): [string, string] => {
    const parts = full.trim().split(/\s+/)
    if (parts.length === 0) return ['', '']
    if (parts.length === 1) return [parts[0], '']
    return [parts[0], parts.slice(1).join(' ')]
}

const EditBookingModal = ({ booking, isOpen, onClose }: Props) => {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [propertyId, setPropertyId] = useState(adminProperties[0].id)
    const [checkIn, setCheckIn] = useState('')
    const [checkOut, setCheckOut] = useState('')
    const [guests, setGuests] = useState(1)
    const [status, setStatus] = useState<Booking['status']>('pending')

    useEffect(() => {
        if (!booking) return
        const [first, last] = splitName(booking.guestName)
        setFirstName(first)
        setLastName(last)
        setEmail(booking.guestEmail)
        setPhone(booking.guestPhone)
        setPropertyId(booking.propertyId)
        setCheckIn(format(booking.checkIn, 'yyyy-MM-dd'))
        setCheckOut(format(booking.checkOut, 'yyyy-MM-dd'))
        setGuests(booking.guests)
        setStatus(booking.status)
    }, [booking])

    if (!booking) return null

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        // Frontend stub — wire to API later.
        // eslint-disable-next-line no-console
        console.log('[stub] update booking', booking.id, {
            firstName,
            lastName,
            email,
            phone,
            propertyId,
            checkIn,
            checkOut,
            guests,
            status,
        })
        onClose()
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose} title={`Edit booking · ${booking.id}`}>
            <form onSubmit={handleSubmit} className='space-y-4'>
                <div className='grid grid-cols-2 gap-3'>
                    <label className='block'>
                        <span className={labelClass}>First name</span>
                        <input
                            type='text'
                            required
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            className={inputClass}
                        />
                    </label>
                    <label className='block'>
                        <span className={labelClass}>Last name</span>
                        <input
                            type='text'
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
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
                        {adminProperties.map((p) => (
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

                <div className='grid grid-cols-2 gap-3'>
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
                    <label className='block'>
                        <span className={labelClass}>Status</span>
                        <select
                            value={status}
                            onChange={(e) => setStatus(e.target.value as Booking['status'])}
                            className={`${inputClass} appearance-none cursor-pointer`}
                        >
                            <option value='pending'>Pending</option>
                            <option value='confirmed'>Confirmed</option>
                            <option value='checked-in'>Checked in</option>
                            <option value='completed'>Completed</option>
                            <option value='cancelled'>Cancelled</option>
                        </select>
                    </label>
                </div>

                <div className='flex items-center justify-end gap-3 pt-3 mt-2 border-t border-cream-300'>
                    <button
                        type='button'
                        onClick={onClose}
                        className='px-5 py-2.5 rounded-full text-sm text-ink-700 hover:bg-cream-200 transition-colors cursor-pointer'
                    >
                        Cancel
                    </button>
                    <button
                        type='submit'
                        className='inline-flex items-center gap-2 bg-emerald-700 hover:bg-emerald-900 text-cream-50 text-sm font-medium px-5 py-2.5 rounded-full transition-colors cursor-pointer'
                    >
                        <FiCheck size={14} />
                        Save changes
                    </button>
                </div>
            </form>
        </Modal>
    )
}

export default EditBookingModal
