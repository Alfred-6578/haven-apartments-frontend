'use client'
import React, { useEffect, useState } from 'react'
import { FiAlertTriangle, FiXCircle } from 'react-icons/fi'
import { format } from 'date-fns'
import Modal from './Modal'
import type { Booking } from '@/lib/admin-mock-data'

interface Props {
    booking: Booking | null
    isOpen: boolean
    onClose: () => void
}

const labelClass = 'block text-[11px] uppercase tracking-[0.12em] text-ink-500 font-medium mb-1.5'

const CancelBookingModal = ({ booking, isOpen, onClose }: Props) => {
    const [reason, setReason] = useState('')
    const [refund, setRefund] = useState(true)

    useEffect(() => {
        if (isOpen) {
            setReason('')
            setRefund(true)
        }
    }, [isOpen])

    if (!booking) return null

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        // Frontend stub — wire to API later.
        // eslint-disable-next-line no-console
        console.log('[stub] cancel booking', booking.id, { reason, refund })
        onClose()
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose} title='Cancel booking'>
            <form onSubmit={handleSubmit} className='space-y-4'>
                <div className='flex items-start gap-3 p-4 bg-warning/10 border border-warning/30 rounded-lg'>
                    <FiAlertTriangle size={18} className='text-warning shrink-0 mt-0.5' />
                    <p className='text-sm text-ink-700'>
                        Cancelling notifies the guest by email. This can&apos;t be undone.
                    </p>
                </div>

                {/* Booking summary */}
                <div className='bg-cream-100 border border-cream-300 rounded-lg p-4 space-y-1'>
                    <p className='font-medium text-ink-900'>{booking.guestName}</p>
                    <p className='text-sm text-ink-700'>{booking.propertyName}</p>
                    <p className='text-xs text-ink-500'>
                        {format(booking.checkIn, 'MMM d')} – {format(booking.checkOut, 'MMM d, yyyy')} · {booking.nights}n · ₦{booking.totalAmount.toLocaleString()}
                    </p>
                </div>

                <label className='block'>
                    <span className={labelClass}>Reason (optional)</span>
                    <textarea
                        rows={3}
                        value={reason}
                        onChange={(e) => setReason(e.target.value)}
                        placeholder='Guest request, property issue, double-booking…'
                        className='w-full bg-cream-50 border border-cream-300 rounded-lg px-3.5 py-2.5 text-sm text-ink-900 placeholder:text-ink-300 focus:outline-none focus:border-ink-700 transition-colors resize-none'
                    />
                </label>

                {booking.paymentStatus === 'paid' && (
                    <label className='flex items-start gap-3 cursor-pointer'>
                        <input
                            type='checkbox'
                            checked={refund}
                            onChange={(e) => setRefund(e.target.checked)}
                            className='w-4 h-4 mt-0.5 rounded border-cream-400 accent-emerald-700 cursor-pointer'
                        />
                        <span className='text-sm text-ink-700'>
                            Refund guest ₦{booking.totalAmount.toLocaleString()} to original payment method
                        </span>
                    </label>
                )}

                <div className='flex items-center justify-end gap-3 pt-3 mt-2 border-t border-cream-300'>
                    <button
                        type='button'
                        onClick={onClose}
                        className='px-5 py-2.5 rounded-full text-sm text-ink-700 hover:bg-cream-200 transition-colors cursor-pointer'
                    >
                        Keep booking
                    </button>
                    <button
                        type='submit'
                        className='inline-flex items-center gap-2 bg-error hover:bg-error/90 text-cream-50 text-sm font-medium px-5 py-2.5 rounded-full transition-colors cursor-pointer'
                    >
                        <FiXCircle size={14} />
                        Confirm cancellation
                    </button>
                </div>
            </form>
        </Modal>
    )
}

export default CancelBookingModal
