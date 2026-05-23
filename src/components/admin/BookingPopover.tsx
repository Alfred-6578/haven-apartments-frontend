'use client'
import React, { useEffect, useState } from 'react'
import { FiX, FiMessageSquare, FiExternalLink } from 'react-icons/fi'
import { format } from 'date-fns'
import StatusPill from './StatusPill'
import type { Booking } from '@/lib/admin-mock-data'

interface Props {
    booking: Booking
    position: { x: number; y: number }
    onClose: () => void
    onViewDetails: () => void
}

const POPOVER_WIDTH = 300

const BookingPopover = ({ booking, position, onClose, onViewDetails }: Props) => {
    const [coords, setCoords] = useState({ left: position.x, top: position.y + 8 })

    useEffect(() => {
        const left = Math.max(8, Math.min(position.x, window.innerWidth - POPOVER_WIDTH - 8))
        const top = position.y + 8
        setCoords({ left, top })
    }, [position])

    useEffect(() => {
        const handleKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose()
        }
        window.addEventListener('keydown', handleKey)
        return () => window.removeEventListener('keydown', handleKey)
    }, [onClose])

    return (
        <>
            <div className='fixed inset-0 z-40' onClick={onClose} aria-hidden />
            <div
                role='dialog'
                aria-label={`Booking ${booking.id}`}
                className='fixed z-50 bg-cream-50 border border-cream-300 rounded-xl p-5 animate-fade-in-up'
                style={{
                    left: `${coords.left}px`,
                    top: `${coords.top}px`,
                    width: `${POPOVER_WIDTH}px`,
                    boxShadow: '0 8px 24px rgba(26, 22, 20, 0.10)',
                }}
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    type='button'
                    onClick={onClose}
                    className='absolute top-3 right-3 text-ink-500 hover:text-ink-900 transition-colors cursor-pointer'
                    aria-label='Close'
                >
                    <FiX size={16} />
                </button>

                <h3 className='font-heading text-lg text-ink-900 leading-tight pr-6'>
                    {booking.guestName}
                </h3>
                <p className='text-sm text-ink-500 mt-1'>{booking.propertyName}</p>
                <p className='text-xs text-ink-500 mt-0.5'>
                    {format(booking.checkIn, 'MMM d')} – {format(booking.checkOut, 'MMM d, yyyy')} · {booking.nights}n
                </p>

                <div className='mt-3'>
                    <StatusPill status={booking.status} />
                </div>

                <div className='flex gap-2 mt-4 pt-4 border-t border-cream-300'>
                    <button
                        type='button'
                        onClick={onViewDetails}
                        className='inline-flex items-center gap-1.5 px-3 py-1.5 text-sm text-ink-700 border border-cream-300 rounded-full hover:bg-cream-100 transition-colors cursor-pointer'
                    >
                        <FiExternalLink size={13} />
                        View details
                    </button>
                    <button
                        type='button'
                        className='inline-flex items-center gap-1.5 px-3 py-1.5 text-sm text-ink-700 border border-cream-300 rounded-full hover:bg-cream-100 transition-colors cursor-pointer'
                    >
                        <FiMessageSquare size={13} />
                        Message
                    </button>
                </div>
            </div>
        </>
    )
}

export default BookingPopover
