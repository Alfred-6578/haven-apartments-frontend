'use client'
import React, { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import {
    FiMoreVertical,
    FiEye,
    FiEdit2,
    FiCopy,
    FiCheckCircle,
    FiMessageSquare,
    FiXCircle,
} from 'react-icons/fi'
import { useClickOutside } from '@/hooks/useClickOutside'
import { useEscapeKey } from '@/hooks/useEscapeKey'
import type { Booking } from '@/lib/admin-mock-data'
import EditBookingModal from './EditBookingModal'
import CancelBookingModal from './CancelBookingModal'

const MENU_WIDTH = 208 // w-52
const MENU_HEIGHT_EST = 220 // approx menu height for flip calc

const BookingActionsMenu = ({ booking }: { booking: Booking }) => {
    const router = useRouter()
    const [open, setOpen] = useState(false)
    const [copied, setCopied] = useState(false)
    const [editOpen, setEditOpen] = useState(false)
    const [cancelOpen, setCancelOpen] = useState(false)
    const [coords, setCoords] = useState<{ top: number; left: number; flipUp: boolean }>({
        top: 0,
        left: 0,
        flipUp: false,
    })
    const buttonRef = useRef<HTMLButtonElement>(null)
    const menuRef = useRef<HTMLDivElement>(null)
    useClickOutside(menuRef, () => setOpen(false), open)
    useEscapeKey(open, () => setOpen(false))

    const updateCoords = () => {
        if (!buttonRef.current) return
        const rect = buttonRef.current.getBoundingClientRect()
        const spaceBelow = window.innerHeight - rect.bottom
        const flipUp = spaceBelow < MENU_HEIGHT_EST + 16
        setCoords({
            top: flipUp ? rect.top - 4 : rect.bottom + 4,
            left: Math.max(8, rect.right - MENU_WIDTH),
            flipUp,
        })
    }

    useEffect(() => {
        if (!open) return
        const onScroll = () => setOpen(false)
        window.addEventListener('scroll', onScroll, true)
        window.addEventListener('resize', updateCoords)
        return () => {
            window.removeEventListener('scroll', onScroll, true)
            window.removeEventListener('resize', updateCoords)
        }
    }, [open])

    const close = () => setOpen(false)

    const toggle = () => {
        if (open) {
            setOpen(false)
            return
        }
        updateCoords()
        setOpen(true)
    }

    const view = () => {
        close()
        router.push(`/admin/bookings/${booking.id}`)
    }

    const edit = () => {
        close()
        setEditOpen(true)
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
        close()
        setCancelOpen(true)
    }

    const sendMessage = () => {
        // Frontend stub — wire to messaging UI later.
        // eslint-disable-next-line no-console
        console.log('[stub] message guest', booking.guestEmail)
        close()
    }

    const confirm = () => {
        // Frontend stub — wire to API later.
        // eslint-disable-next-line no-console
        console.log('[stub] confirm booking', booking.id)
        close()
    }

    const isPast = booking.status === 'completed' || booking.status === 'cancelled'

    return (
        <>
            <button
                ref={buttonRef}
                type='button'
                onClick={toggle}
                className='text-ink-500 hover:text-ink-900 hover:bg-cream-200 rounded-full w-8 h-8 flex items-center justify-center transition-colors cursor-pointer'
                aria-haspopup='menu'
                aria-expanded={open}
                aria-label={`Actions for ${booking.id}`}
                title='More actions'
            >
                <FiMoreVertical size={18} />
            </button>

            {open && (
                <div
                    ref={menuRef}
                    role='menu'
                    className='fixed bg-cream-50 border border-cream-300 rounded-xl shadow-xl py-1.5 z-30 animate-fade-in-up'
                    style={{
                        top: `${coords.top}px`,
                        left: `${coords.left}px`,
                        width: `${MENU_WIDTH}px`,
                        transform: coords.flipUp ? 'translateY(-100%)' : undefined,
                    }}
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
                        onClick={sendMessage}
                        className='w-full flex items-center gap-3 px-4 py-2 text-sm text-ink-700 hover:bg-cream-100 transition-colors cursor-pointer'
                    >
                        <FiMessageSquare size={15} className='text-ink-500' />
                        Send message
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

                    {booking.status === 'pending' && (
                        <div className='border-t border-cream-300 mt-1 pt-1'>
                            <button
                                type='button'
                                role='menuitem'
                                onClick={confirm}
                                className='w-full flex items-center gap-3 px-4 py-2 text-sm text-emerald-900 hover:bg-emerald-50 transition-colors cursor-pointer'
                            >
                                <FiCheckCircle size={15} className='text-emerald-700' />
                                Confirm booking
                            </button>
                        </div>
                    )}

                    {!isPast && (
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
                    )}
                </div>
            )}

            <EditBookingModal
                booking={editOpen ? booking : null}
                isOpen={editOpen}
                onClose={() => setEditOpen(false)}
            />
            <CancelBookingModal
                booking={cancelOpen ? booking : null}
                isOpen={cancelOpen}
                onClose={() => setCancelOpen(false)}
            />
        </>
    )
}

export default BookingActionsMenu
