'use client'
import React, { useEffect, useMemo, useState } from 'react'
import { FiPlus, FiDownload, FiCalendar, FiInbox } from 'react-icons/fi'
import { adminBookings, adminProperties, type Booking } from '@/lib/admin-mock-data'
import SearchInput from '@/components/admin/SearchInput'
import FilterPill from '@/components/admin/FilterPill'
import FilterDropdown from '@/components/admin/FilterDropdown'
import BookingsTable from '@/components/admin/BookingsTable'
import Pagination from '@/components/admin/Pagination'
import EmptyState from '@/components/admin/EmptyState'
import AddBookingModal from '@/components/admin/AddBookingModal'
import ExportPreviewModal from '@/components/admin/ExportPreviewModal'

const PAGE_SIZE = 10

type StatusFilter = 'all' | Booking['status']

const statusOptions: { value: StatusFilter; label: string }[] = [
    { value: 'all', label: 'All' },
    { value: 'pending', label: 'Pending' },
    { value: 'confirmed', label: 'Confirmed' },
    { value: 'checked-in', label: 'Checked-in' },
    { value: 'completed', label: 'Completed' },
    { value: 'cancelled', label: 'Cancelled' },
]

const dateRangeOptions = [
    { value: 'all', label: 'All time' },
    { value: 'next-7', label: 'Next 7 days' },
    { value: 'next-30', label: 'Next 30 days' },
    { value: 'last-7', label: 'Last 7 days' },
    { value: 'last-30', label: 'Last 30 days' },
    { value: 'last-90', label: 'Last 90 days' },
]

const applyDateRangeFilter = (booking: Booking, range: string) => {
    if (range === 'all') return true
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const checkIn = new Date(booking.checkIn)
    checkIn.setHours(0, 0, 0, 0)

    const dayMs = 86400000
    switch (range) {
        case 'next-7':
            return checkIn >= today && checkIn <= new Date(today.getTime() + 7 * dayMs)
        case 'next-30':
            return checkIn >= today && checkIn <= new Date(today.getTime() + 30 * dayMs)
        case 'last-7':
            return checkIn >= new Date(today.getTime() - 7 * dayMs) && checkIn <= today
        case 'last-30':
            return checkIn >= new Date(today.getTime() - 30 * dayMs) && checkIn <= today
        case 'last-90':
            return checkIn >= new Date(today.getTime() - 90 * dayMs) && checkIn <= today
        default:
            return true
    }
}

export default function AdminBookingsPage() {
    const [searchQuery, setSearchQuery] = useState('')
    const [statusFilter, setStatusFilter] = useState<StatusFilter>('all')
    const [propertyFilter, setPropertyFilter] = useState('all')
    const [dateRangeFilter, setDateRangeFilter] = useState('all')
    const [currentPage, setCurrentPage] = useState(1)
    const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set())
    const [addOpen, setAddOpen] = useState(false)
    const [previewOpen, setPreviewOpen] = useState(false)

    const propertyOptions = useMemo(
        () => [
            { value: 'all', label: 'All properties' },
            ...adminProperties.map(p => ({ value: p.id, label: p.name })),
        ],
        [],
    )

    const filteredBookings = useMemo(() => {
        return adminBookings.filter(b => {
            if (searchQuery) {
                const q = searchQuery.toLowerCase()
                if (
                    !b.guestName.toLowerCase().includes(q) &&
                    !b.id.toLowerCase().includes(q)
                ) {
                    return false
                }
            }
            if (statusFilter !== 'all' && b.status !== statusFilter) return false
            if (propertyFilter !== 'all' && b.propertyId !== propertyFilter) return false
            if (!applyDateRangeFilter(b, dateRangeFilter)) return false
            return true
        })
    }, [searchQuery, statusFilter, propertyFilter, dateRangeFilter])

    const totalPages = Math.max(1, Math.ceil(filteredBookings.length / PAGE_SIZE))
    const paginatedBookings = filteredBookings.slice(
        (currentPage - 1) * PAGE_SIZE,
        currentPage * PAGE_SIZE,
    )

    // Reset page when filters change
    useEffect(() => {
        setCurrentPage(1)
    }, [searchQuery, statusFilter, propertyFilter, dateRangeFilter])

    const clearFilters = () => {
        setSearchQuery('')
        setStatusFilter('all')
        setPropertyFilter('all')
        setDateRangeFilter('all')
    }

    const toggleSelect = (id: string) => {
        setSelectedIds(prev => {
            const next = new Set(prev)
            if (next.has(id)) next.delete(id)
            else next.add(id)
            return next
        })
    }

    const toggleSelectAll = () => {
        setSelectedIds(prev => {
            const allCurrentSelected = paginatedBookings.every(b => prev.has(b.id))
            if (allCurrentSelected) {
                const next = new Set(prev)
                paginatedBookings.forEach(b => next.delete(b.id))
                return next
            }
            const next = new Set(prev)
            paginatedBookings.forEach(b => next.add(b.id))
            return next
        })
    }

    return (
        <div className='max-w-7xl mx-auto pt-4 pb-12'>
            {/* Header */}
            <header className='flex max-md:flex-col max-md:items-start max-md:gap-4 justify-between items-end mb-8'>
                <div>
                    <h1 className='font-heading text-3xl md:text-[32px] text-ink-900 leading-tight'>
                        Bookings
                    </h1>
                    <p className='text-ink-500 mt-1'>{adminBookings.length} total bookings</p>
                </div>
                <button
                    type='button'
                    onClick={() => setAddOpen(true)}
                    className='inline-flex items-center gap-2 bg-emerald-700 hover:bg-emerald-900 text-cream-50 font-medium px-5 py-2.5 rounded-full transition-colors cursor-pointer'
                >
                    <FiPlus size={16} />
                    Add booking
                </button>
            </header>

            <AddBookingModal isOpen={addOpen} onClose={() => setAddOpen(false)} />

            <ExportPreviewModal
                isOpen={previewOpen}
                onClose={() => setPreviewOpen(false)}
                bookings={filteredBookings}
                filters={{
                    search: searchQuery || undefined,
                    statusLabel:
                        statusFilter !== 'all'
                            ? statusOptions.find(o => o.value === statusFilter)?.label
                            : undefined,
                    propertyLabel:
                        propertyFilter !== 'all'
                            ? propertyOptions.find(o => o.value === propertyFilter)?.label
                            : undefined,
                    dateRangeLabel:
                        dateRangeFilter !== 'all'
                            ? dateRangeOptions.find(o => o.value === dateRangeFilter)?.label
                            : undefined,
                }}
            />

            {/* Filter bar */}
            <div className='bg-cream-50 border border-cream-300 rounded-xl p-4 flex flex-wrap gap-3 items-center'>
                <SearchInput
                    value={searchQuery}
                    onChange={setSearchQuery}
                    placeholder='Search by guest or booking ID'
                />

                <div className='flex flex-wrap gap-2 items-center'>
                    {statusOptions.map(opt => (
                        <FilterPill
                            key={opt.value}
                            label={opt.label}
                            active={statusFilter === opt.value}
                            onClick={() => setStatusFilter(opt.value)}
                        />
                    ))}
                </div>

                <div className='flex gap-2 items-center ml-auto'>
                    <FilterDropdown
                        options={propertyOptions}
                        selected={propertyFilter}
                        onSelect={setPropertyFilter}
                    />
                    <FilterDropdown
                        options={dateRangeOptions}
                        selected={dateRangeFilter}
                        onSelect={setDateRangeFilter}
                        icon={FiCalendar}
                    />
                    <button
                        type='button'
                        onClick={() => setPreviewOpen(true)}
                        disabled={filteredBookings.length === 0}
                        className='inline-flex items-center gap-2 bg-cream-50 text-ink-700 border border-cream-300 rounded-full px-3.5 py-1.5 text-sm hover:bg-cream-200 disabled:opacity-60 disabled:hover:bg-cream-50 disabled:cursor-not-allowed transition-colors cursor-pointer whitespace-nowrap'
                        title={
                            filteredBookings.length === 0
                                ? 'No bookings match your filters'
                                : `Preview ${filteredBookings.length} bookings before download`
                        }
                    >
                        <FiDownload size={14} />
                        Export
                        {filteredBookings.length > 0 && (
                            <span className='text-ink-400 tabular-nums'>· {filteredBookings.length}</span>
                        )}
                    </button>
                </div>
            </div>

            {/* Table or empty state */}
            <div className='mt-6'>
                {filteredBookings.length === 0 ? (
                    <div className='bg-cream-50 border border-cream-300 rounded-xl'>
                        <EmptyState
                            icon={FiInbox}
                            title='No bookings match your filters.'
                            body='Try adjusting your search or clearing the filters.'
                            actionLabel='Clear filters'
                            onAction={clearFilters}
                        />
                    </div>
                ) : (
                    <>
                        <BookingsTable
                            bookings={paginatedBookings}
                            selectedIds={selectedIds}
                            onToggleSelect={toggleSelect}
                            onToggleSelectAll={toggleSelectAll}
                        />

                        <div className='mt-6'>
                            <Pagination
                                currentPage={currentPage}
                                totalPages={totalPages}
                                pageSize={PAGE_SIZE}
                                totalItems={filteredBookings.length}
                                onPageChange={setCurrentPage}
                            />
                        </div>
                    </>
                )}
            </div>
        </div>
    )
}
