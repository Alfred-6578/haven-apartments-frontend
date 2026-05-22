'use client'
import React, { useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import {
    FiMoreVertical,
    FiEye,
    FiEdit2,
    FiCopy,
    FiCheckCircle,
    FiXCircle,
} from 'react-icons/fi'
import { useClickOutside } from '@/hooks/useClickOutside'
import type { Booking } from '@/lib/admin-mock-data'

const BookingActionsMenu = ({ booking }: { booking: Booking }) => {
    const router = useRouter()
    const [open, setOpen] = useState(false)
    const [copied, setCopied] = useState(false)
    const ref = useRef<HTMLDivElement>(null)
    useClickOutside(ref, () => setOpen(false), open)

    const close = () => setOpen(false)

    const view = () => {
        close()
        router.push(`/admin/bookings/${booking.id}`)
    }

    const edit = () => {
        close()
        router.push(`/admin/bookings/${booking.id}/edit`)
    }

    const copyId = async () => {
        try {
            await navigator.clipboard.writeText(booking.id)
            setCopied(true)
            setTimeout(() => {
                setCopied(false)
                close()
            }, 900)
        } catch {
            close()
        }
    }

    const cancel = () => {
        const ok = window.confirm(
            `Cancel booking ${booking.id} for ${booking.guestName}? This can't be undone.`,
        )
        if (ok) {
            // Frontend stub — wire to API later.
            // eslint-disable-next-line no-console
            console.log('[stub] cancel booking', booking.id)
        }
        close()
    }

    return (
        <div ref={ref} className='relative inline-block'>
            <button
                type='button'
                onClick={() => setOpen(prev => !prev)}
                className='text-ink-500 hover:text-ink-900 hover:bg-cream-200 rounded-full w-8 h-8 flex items-center justify-center transition-colors cursor-pointer'
                aria-haspopup='menu'
                aria-expanded={open}
                aria-label={`Actions for ${booking.id}`}
            >
                <FiMoreVertical size={18} />
            </button>

            {open && (
                <div
                    role='menu'
                    className='absolute right-0 top-full mt-1 w-52 bg-cream-50 border border-cream-300 rounded-xl shadow-xl py-1.5 z-30 animate-fade-in-up'
                >
                    <button
                        type='button'
                        role='menuitem'
                        onClick={view}
                        className='w-full flex items-center gap-3 px-4 py-2 text-sm text-ink-700 hover:bg-cream-100 transition-colors cursor-pointer'
                    >
                        <FiEye size={15} className='text-ink-500' />
                        View details
                    </button>
                    <button
                        type='button'
                        role='menuitem'
                        onClick={edit}
                        className='w-full flex items-center gap-3 px-4 py-2 text-sm text-ink-700 hover:bg-cream-100 transition-colors cursor-pointer'
                    >
                        <FiEdit2 size={15} className='text-ink-500' />
                        Edit booking
                    </button>
                    <button
                        type='button'
                        role='menuitem'
                        onClick={copyId}
                        className='w-full flex items-center gap-3 px-4 py-2 text-sm text-ink-700 hover:bg-cream-100 transition-colors cursor-pointer'
                    >
                        {copied ? (
                            <FiCheckCircle size={15} className='text-emerald-700' />
                        ) : (
                            <FiCopy size={15} className='text-ink-500' />
                        )}
                        {copied ? 'Copied!' : 'Copy booking ID'}
                    </button>

                    <div className='border-t border-cream-300 mt-1 pt-1'>
                        <button
                            type='button'
                            role='menuitem'
                            onClick={cancel}
                            className='w-full flex items-center gap-3 px-4 py-2 text-sm text-error hover:bg-error/5 transition-colors cursor-pointer'
                        >
                            <FiXCircle size={15} />
                            Cancel booking
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default BookingActionsMenu
