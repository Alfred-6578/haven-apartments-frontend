'use client'
import React, { useMemo, useState } from 'react'
import { FiPlus, FiInbox } from 'react-icons/fi'
import { adminProperties, type AdminProperty } from '@/lib/admin-mock-data'
import SearchInput from '@/components/admin/SearchInput'
import FilterPill from '@/components/admin/FilterPill'
import FilterDropdown from '@/components/admin/FilterDropdown'
import ViewToggle from '@/components/admin/ViewToggle'
import PropertyGridCard from '@/components/admin/PropertyGridCard'
import PropertyTableRow from '@/components/admin/PropertyTableRow'
import EmptyState from '@/components/admin/EmptyState'
import AddPropertyModal from '@/components/admin/AddPropertyModal'

type StatusFilter = 'all' | AdminProperty['status']
type SortBy = 'recent' | 'revenue-desc' | 'occupancy-desc' | 'name-asc'

const statusOptions: { value: StatusFilter; label: string }[] = [
    { value: 'all', label: 'All' },
    { value: 'live', label: 'Live' },
    { value: 'draft', label: 'Draft' },
    { value: 'maintenance', label: 'Maintenance' },
]

const sortOptions: { value: SortBy; label: string }[] = [
    { value: 'recent', label: 'Most recent' },
    { value: 'revenue-desc', label: 'Highest revenue' },
    { value: 'occupancy-desc', label: 'Highest occupancy' },
    { value: 'name-asc', label: 'Name (A–Z)' },
]

export default function AdminPropertiesPage() {
    const [view, setView] = useState<'grid' | 'list'>('grid')
    const [searchQuery, setSearchQuery] = useState('')
    const [statusFilter, setStatusFilter] = useState<StatusFilter>('all')
    const [neighborhoodFilter, setNeighborhoodFilter] = useState('all')
    const [sortBy, setSortBy] = useState<SortBy>('recent')
    const [addOpen, setAddOpen] = useState(false)

    const neighborhoodOptions = useMemo(() => {
        const unique = Array.from(new Set(adminProperties.map(p => p.neighborhood)))
        return [
            { value: 'all', label: 'All neighborhoods' },
            ...unique.map(n => ({ value: n, label: n })),
        ]
    }, [])

    const counts = useMemo(
        () => ({
            total: adminProperties.length,
            live: adminProperties.filter(p => p.status === 'live').length,
            draft: adminProperties.filter(p => p.status === 'draft').length,
            maintenance: adminProperties.filter(p => p.status === 'maintenance').length,
        }),
        [],
    )

    const filteredProperties = useMemo(() => {
        const filtered = adminProperties.filter(p => {
            if (searchQuery) {
                const q = searchQuery.toLowerCase()
                if (
                    !p.name.toLowerCase().includes(q) &&
                    !p.neighborhood.toLowerCase().includes(q)
                ) {
                    return false
                }
            }
            if (statusFilter !== 'all' && p.status !== statusFilter) return false
            if (neighborhoodFilter !== 'all' && p.neighborhood !== neighborhoodFilter) return false
            return true
        })

        return [...filtered].sort((a, b) => {
            switch (sortBy) {
                case 'revenue-desc':
                    return b.totalRevenue - a.totalRevenue
                case 'occupancy-desc':
                    return b.occupancyRate - a.occupancyRate
                case 'name-asc':
                    return a.name.localeCompare(b.name)
                default:
                    return 0
            }
        })
    }, [searchQuery, statusFilter, neighborhoodFilter, sortBy])

    const clearFilters = () => {
        setSearchQuery('')
        setStatusFilter('all')
        setNeighborhoodFilter('all')
    }

    return (
        <div className='max-w-7xl mx-auto pt-4 pb-12'>
            {/* Header */}
            <header className='flex max-md:flex-col max-md:items-start max-md:gap-4 justify-between items-end mb-8'>
                <div>
                    <h1 className='font-heading text-3xl md:text-[32px] text-ink-900 leading-tight'>
                        Properties
                    </h1>
                    <p className='text-ink-500 mt-1 text-sm'>
                        {counts.total} {counts.total === 1 ? 'property' : 'properties'} ·{' '}
                        {counts.live} live, {counts.draft} draft, {counts.maintenance} maintenance
                    </p>
                </div>
                <div className='flex items-center gap-3'>
                    <div className='max-md:hidden'>
                        <ViewToggle view={view} onChange={setView} />
                    </div>
                    <button
                        type='button'
                        onClick={() => setAddOpen(true)}
                        className='inline-flex items-center gap-2 bg-emerald-700 hover:bg-emerald-900 text-cream-50 font-medium px-5 py-2.5 rounded-full transition-colors cursor-pointer'
                    >
                        <FiPlus size={16} />
                        Add property
                    </button>
                </div>
            </header>

            <AddPropertyModal isOpen={addOpen} onClose={() => setAddOpen(false)} />

            {/* Filter bar */}
            <div className='bg-cream-50 border border-cream-300 rounded-xl p-4 flex flex-wrap gap-3 items-center'>
                <SearchInput
                    value={searchQuery}
                    onChange={setSearchQuery}
                    placeholder='Search properties'
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
                <div className='flex flex-wrap gap-2 items-center md:ml-auto'>
                    <FilterDropdown
                        options={neighborhoodOptions}
                        selected={neighborhoodFilter}
                        onSelect={setNeighborhoodFilter}
                    />
                    <FilterDropdown
                        options={sortOptions}
                        selected={sortBy}
                        onSelect={(v) => setSortBy(v as SortBy)}
                        prefix='Sort by'
                    />
                </div>
            </div>

            {/* Content */}
            <div className='mt-6'>
                {filteredProperties.length === 0 ? (
                    <div className='bg-cream-50 border border-cream-300 rounded-xl'>
                        {adminProperties.length === 0 ? (
                            <EmptyState
                                icon={FiInbox}
                                title='No properties yet.'
                                body='Add your first one to get started.'
                                actionLabel='Add property'
                                onAction={() => setAddOpen(true)}
                            />
                        ) : (
                            <EmptyState
                                icon={FiInbox}
                                title='No properties match your filters.'
                                body='Try adjusting your search or clearing the filters.'
                                actionLabel='Clear filters'
                                onAction={clearFilters}
                            />
                        )}
                    </div>
                ) : view === 'grid' ? (
                    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
                        {filteredProperties.map(p => (
                            <PropertyGridCard key={p.id} property={p} />
                        ))}
                    </div>
                ) : (
                    <>
                        {/* Mobile: cards (list view falls back to cards below md) */}
                        <div className='md:hidden grid grid-cols-1 sm:grid-cols-2 gap-4'>
                            {filteredProperties.map(p => (
                                <PropertyGridCard key={p.id} property={p} />
                            ))}
                        </div>
                        {/* Desktop: table */}
                        <div className='max-md:hidden bg-cream-50 border border-cream-300 rounded-xl overflow-hidden'>
                        <div className='overflow-x-auto'>
                            <table className='w-full text-sm'>
                                <thead>
                                    <tr className='bg-cream-100 border-b border-cream-300'>
                                        <th className='text-left py-3 px-2 md:px-4 text-[11px] uppercase tracking-[0.12em] text-ink-500 font-medium'>
                                            Property
                                        </th>
                                        <th className='max-md:hidden text-left py-3 px-4 text-[11px] uppercase tracking-[0.12em] text-ink-500 font-medium'>
                                            Neighborhood
                                        </th>
                                        <th className='max-md:hidden text-left py-3 px-4 text-[11px] uppercase tracking-[0.12em] text-ink-500 font-medium'>
                                            Specs
                                        </th>
                                        <th className='text-left py-3 px-2 md:px-4 text-[11px] uppercase tracking-[0.12em] text-ink-500 font-medium'>
                                            Price/night
                                        </th>
                                        <th className='max-md:hidden text-left py-3 px-4 text-[11px] uppercase tracking-[0.12em] text-ink-500 font-medium'>
                                            Occupancy
                                        </th>
                                        <th className='max-md:hidden text-left py-3 px-4 text-[11px] uppercase tracking-[0.12em] text-ink-500 font-medium'>
                                            Revenue
                                        </th>
                                        <th className='text-left py-3 px-2 md:px-4 text-[11px] uppercase tracking-[0.12em] text-ink-500 font-medium'>
                                            Status
                                        </th>
                                        <th className='py-3 px-2 md:px-4 w-10'>
                                            <span className='sr-only'>Actions</span>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredProperties.map(p => (
                                        <PropertyTableRow key={p.id} property={p} />
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        </div>
                    </>
                )}
            </div>

        </div>
    )
}
