'use client'
import React from 'react'
import { format } from 'date-fns'
import { FiDownload, FiFileText } from 'react-icons/fi'
import Modal from './Modal'
import type { Booking } from '@/lib/admin-mock-data'

interface FiltersInfo {
    search?: string
    statusLabel?: string
    propertyLabel?: string
    dateRangeLabel?: string
}

interface Props {
    isOpen: boolean
    onClose: () => void
    bookings: Booking[]
    filters?: FiltersInfo
}

const statusDotColor: Record<string, string> = {
    pending: 'bg-warning',
    confirmed: 'bg-emerald-700',
    'checked-in': 'bg-emerald-500',
    completed: 'bg-ink-400',
    cancelled: 'bg-error',
}

const ExportPreviewModal = ({ isOpen, onClose, bookings, filters }: Props) => {
    const today = new Date()
    const total = bookings.reduce((sum, b) => sum + b.totalAmount, 0)
    const totalNights = bookings.reduce((sum, b) => sum + b.nights, 0)
    const avgNights = bookings.length > 0 ? Math.round((totalNights / bookings.length) * 10) / 10 : 0

    const filterPills: { label: string; value: string }[] = []
    if (filters?.search) filterPills.push({ label: 'Search', value: `"${filters.search}"` })
    if (filters?.statusLabel) filterPills.push({ label: 'Status', value: filters.statusLabel })
    if (filters?.propertyLabel) filterPills.push({ label: 'Property', value: filters.propertyLabel })
    if (filters?.dateRangeLabel) filterPills.push({ label: 'Range', value: filters.dateRangeLabel })

    const handlePrint = () => {
        window.print()
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose} title='Export preview' maxWidth='max-w-5xl'>
            {/* Printable report */}
            <div className='report-print'>
                {/* Letterhead */}
                <div className='flex max-md:flex-col max-md:gap-4 md:items-end md:justify-between pb-7 mb-8 border-b-2 border-ink-900'>
                    <div>
                        <p className='text-[10px] uppercase tracking-[0.25em] text-ink-500 mb-2 font-medium'>
                            Bookings report
                        </p>
                        <h1 className='font-heading text-[34px] text-ink-900 leading-none font-medium'>
                            Haven Homes
                        </h1>
                        <p className='text-xs text-ink-500 mt-2 italic'>Editorial shortlets · Lagos</p>
                    </div>
                    <div className='md:text-right'>
                        <p className='text-[10px] uppercase tracking-[0.15em] text-ink-500 font-medium mb-1'>
                            Issued
                        </p>
                        <p className='text-sm text-ink-900 font-medium'>
                            {format(today, 'd MMMM yyyy')}
                        </p>
                        <p className='text-xs text-ink-500 mt-0.5'>{format(today, "EEEE 'at' HH:mm")}</p>
                    </div>
                </div>

                {/* Summary stats */}
                <div className='grid grid-cols-3 gap-3 md:gap-4 mb-6'>
                    <div className='p-4 bg-cream-100 rounded-lg border border-cream-300'>
                        <p className='text-[10px] uppercase tracking-[0.12em] text-ink-500 font-medium mb-1'>
                            Bookings
                        </p>
                        <p className='font-heading text-2xl text-ink-900 leading-none tabular-nums'>
                            {bookings.length}
                        </p>
                    </div>
                    <div className='p-4 bg-cream-100 rounded-lg border border-cream-300'>
                        <p className='text-[10px] uppercase tracking-[0.12em] text-ink-500 font-medium mb-1'>
                            Nights total
                        </p>
                        <p className='font-heading text-2xl text-ink-900 leading-none tabular-nums'>
                            {totalNights}
                        </p>
                    </div>
                    <div className='p-4 bg-cream-100 rounded-lg border border-cream-300'>
                        <p className='text-[10px] uppercase tracking-[0.12em] text-ink-500 font-medium mb-1'>
                            Avg nights
                        </p>
                        <p className='font-heading text-2xl text-ink-900 leading-none tabular-nums'>
                            {avgNights}
                        </p>
                    </div>
                </div>

                {/* Filters */}
                {filterPills.length > 0 && (
                    <div className='mb-6'>
                        <p className='text-[10px] uppercase tracking-[0.15em] text-ink-500 font-medium mb-2'>
                            Filters applied
                        </p>
                        <div className='flex flex-wrap gap-2'>
                            {filterPills.map(p => (
                                <span
                                    key={p.label}
                                    className='inline-flex items-center gap-1.5 text-xs px-3 py-1 bg-cream-100 border border-cream-300 rounded-full'
                                >
                                    <span className='text-ink-500'>{p.label}:</span>
                                    <span className='text-ink-900 font-medium'>{p.value}</span>
                                </span>
                            ))}
                        </div>
                    </div>
                )}

                {/* Table */}
                <div className='overflow-x-auto'>
                    <table className='w-full text-sm border-collapse min-w-[640px]'>
                        <thead>
                            <tr className='bg-cream-100'>
                                <th className='text-left py-3 px-3 text-[10px] uppercase tracking-[0.12em] text-ink-500 font-medium border-b-2 border-ink-900'>
                                    ID
                                </th>
                                <th className='text-left py-3 px-3 text-[10px] uppercase tracking-[0.12em] text-ink-500 font-medium border-b-2 border-ink-900'>
                                    Guest
                                </th>
                                <th className='text-left py-3 px-3 text-[10px] uppercase tracking-[0.12em] text-ink-500 font-medium border-b-2 border-ink-900'>
                                    Property
                                </th>
                                <th className='text-left py-3 px-3 text-[10px] uppercase tracking-[0.12em] text-ink-500 font-medium border-b-2 border-ink-900'>
                                    Stay
                                </th>
                                <th className='text-right py-3 px-3 text-[10px] uppercase tracking-[0.12em] text-ink-500 font-medium border-b-2 border-ink-900'>
                                    Nts
                                </th>
                                <th className='text-right py-3 px-3 text-[10px] uppercase tracking-[0.12em] text-ink-500 font-medium border-b-2 border-ink-900'>
                                    Amount
                                </th>
                                <th className='text-left py-3 px-3 text-[10px] uppercase tracking-[0.12em] text-ink-500 font-medium border-b-2 border-ink-900'>
                                    Status
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {bookings.map(b => (
                                <tr
                                    key={b.id}
                                    className='border-b border-cream-300 last:border-b-0'
                                >
                                    <td className='py-3 px-3 align-top font-mono text-[11px] text-ink-500'>
                                        {b.id}
                                    </td>
                                    <td className='py-3 px-3 align-top'>
                                        <p className='text-ink-900 leading-tight'>{b.guestName}</p>
                                        <p className='text-[11px] text-ink-500 mt-0.5'>{b.guestEmail}</p>
                                    </td>
                                    <td className='py-3 px-3 align-top'>
                                        <p className='text-ink-900 leading-tight'>{b.propertyName}</p>
                                        <p className='text-[11px] text-ink-500 mt-0.5'>{b.neighborhood}</p>
                                    </td>
                                    <td className='py-3 px-3 align-top text-xs text-ink-700'>
                                        {format(b.checkIn, 'MMM d')} → {format(b.checkOut, 'MMM d, yyyy')}
                                    </td>
                                    <td className='py-3 px-3 align-top text-right text-ink-900 tabular-nums'>
                                        {b.nights}
                                    </td>
                                    <td className='py-3 px-3 align-top text-right text-ink-900 tabular-nums font-medium'>
                                        ₦{b.totalAmount.toLocaleString()}
                                    </td>
                                    <td className='py-3 px-3 align-top'>
                                        <span className='inline-flex items-center gap-1.5 text-xs text-ink-700 capitalize whitespace-nowrap'>
                                            <span
                                                className={`w-1.5 h-1.5 rounded-full ${
                                                    statusDotColor[b.status] || 'bg-ink-300'
                                                }`}
                                            />
                                            {b.status.replace('-', ' ')}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Grand total */}
                <div className='mt-8 pt-5 border-t-2 border-ink-900 flex max-md:flex-col max-md:gap-3 md:justify-between md:items-end'>
                    <div>
                        <p className='text-[10px] uppercase tracking-[0.15em] text-ink-500 font-medium'>
                            Grand total
                        </p>
                        <p className='text-xs text-ink-500 mt-0.5 italic'>
                            Across {bookings.length}{' '}
                            {bookings.length === 1 ? 'booking' : 'bookings'}
                        </p>
                    </div>
                    <p className='font-heading text-3xl text-ink-900 tabular-nums font-medium leading-none'>
                        ₦{total.toLocaleString()}
                    </p>
                </div>

                {/* Letterhead footer */}
                <div className='mt-10 pt-4 border-t border-cream-300 flex max-md:flex-col max-md:gap-1 md:justify-between items-baseline text-[10px] uppercase tracking-[0.12em] text-ink-500'>
                    <span>Haven Homes · havenhomes.ng</span>
                    <span>Generated {format(today, "d MMM yyyy 'at' HH:mm")}</span>
                </div>
            </div>

            {/* Action bar — hidden from print */}
            <div className='report-no-print mt-8 pt-6 border-t border-cream-300 flex flex-col md:flex-row md:items-center md:justify-between gap-4'>
                <p className='text-xs text-ink-500 flex items-center gap-2 max-md:order-2'>
                    <FiFileText size={14} className='shrink-0' />
                    Choose <span className='font-medium text-ink-900'>Save as PDF</span> as destination in the print dialog.
                </p>
                <div className='flex gap-3 max-md:order-1 max-md:w-full max-md:justify-end'>
                    <button
                        type='button'
                        onClick={onClose}
                        className='px-5 py-2.5 rounded-full text-sm text-ink-700 hover:bg-cream-200 transition-colors cursor-pointer'
                    >
                        Cancel
                    </button>
                    <button
                        type='button'
                        onClick={handlePrint}
                        className='group inline-flex items-center gap-2 bg-emerald-700 hover:bg-emerald-900 text-cream-50 text-sm font-medium px-5 py-2.5 rounded-full transition-colors cursor-pointer'
                    >
                        <FiDownload size={14} />
                        Download PDF
                    </button>
                </div>
            </div>
        </Modal>
    )
}

export default ExportPreviewModal
