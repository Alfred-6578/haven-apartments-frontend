'use client'
import React, { useState } from 'react'
import { FiArrowRight } from 'react-icons/fi'
import Modal from './Modal'
import { adminProperties } from '@/lib/admin-mock-data'

interface Props {
    isOpen: boolean
    onClose: () => void
}

const knownNeighborhoods = Array.from(new Set(adminProperties.map(p => p.neighborhood)))

const AddPropertyModal = ({ isOpen, onClose }: Props) => {
    const [name, setName] = useState('')
    const [neighborhood, setNeighborhood] = useState(knownNeighborhoods[0] ?? '')
    const [bedrooms, setBedrooms] = useState(1)
    const [bathrooms, setBathrooms] = useState(1)
    const [guestCapacity, setGuestCapacity] = useState(2)
    const [pricePerNight, setPricePerNight] = useState(100000)
    const [status, setStatus] = useState<'live' | 'draft' | 'maintenance'>('draft')

    const reset = () => {
        setName('')
        setNeighborhood(knownNeighborhoods[0] ?? '')
        setBedrooms(1)
        setBathrooms(1)
        setGuestCapacity(2)
        setPricePerNight(100000)
        setStatus('draft')
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        // Frontend stub — wire to API later.
        // eslint-disable-next-line no-console
        console.log('[stub] create property', {
            name,
            neighborhood,
            bedrooms,
            bathrooms,
            guestCapacity,
            pricePerNight,
            status,
        })
        reset()
        onClose()
    }

    const inputClass =
        'w-full bg-cream-50 border border-cream-300 rounded-lg px-3.5 py-2.5 text-sm text-ink-900 placeholder:text-ink-300 focus:outline-none focus:border-ink-700 transition-colors'
    const labelClass = 'block text-[11px] uppercase tracking-[0.12em] text-ink-500 font-medium mb-1.5'

    return (
        <Modal isOpen={isOpen} onClose={onClose} title='Add property'>
            <form onSubmit={handleSubmit} className='space-y-4'>
                <label className='block'>
                    <span className={labelClass}>Name</span>
                    <input
                        type='text'
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder='Sundry House'
                        className={inputClass}
                    />
                </label>

                <label className='block'>
                    <span className={labelClass}>Neighborhood</span>
                    <input
                        type='text'
                        required
                        list='neighborhood-suggestions'
                        value={neighborhood}
                        onChange={(e) => setNeighborhood(e.target.value)}
                        placeholder='Lekki Phase 1'
                        className={inputClass}
                    />
                    <datalist id='neighborhood-suggestions'>
                        {knownNeighborhoods.map(n => (
                            <option key={n} value={n} />
                        ))}
                    </datalist>
                </label>

                <div className='grid grid-cols-3 gap-3'>
                    <label className='block'>
                        <span className={labelClass}>Bedrooms</span>
                        <input
                            type='number'
                            required
                            min={0}
                            max={10}
                            value={bedrooms}
                            onChange={(e) => setBedrooms(parseInt(e.target.value) || 0)}
                            className={inputClass}
                        />
                    </label>
                    <label className='block'>
                        <span className={labelClass}>Bathrooms</span>
                        <input
                            type='number'
                            required
                            min={0}
                            max={10}
                            value={bathrooms}
                            onChange={(e) => setBathrooms(parseInt(e.target.value) || 0)}
                            className={inputClass}
                        />
                    </label>
                    <label className='block'>
                        <span className={labelClass}>Sleeps</span>
                        <input
                            type='number'
                            required
                            min={1}
                            max={20}
                            value={guestCapacity}
                            onChange={(e) => setGuestCapacity(parseInt(e.target.value) || 1)}
                            className={inputClass}
                        />
                    </label>
                </div>

                <label className='block'>
                    <span className={labelClass}>Price per night (₦)</span>
                    <input
                        type='number'
                        required
                        min={1000}
                        step={1000}
                        value={pricePerNight}
                        onChange={(e) => setPricePerNight(parseInt(e.target.value) || 0)}
                        className={inputClass}
                    />
                </label>

                <label className='block'>
                    <span className={labelClass}>Status</span>
                    <select
                        required
                        value={status}
                        onChange={(e) => setStatus(e.target.value as typeof status)}
                        className={`${inputClass} appearance-none cursor-pointer`}
                    >
                        <option value='draft'>Draft — not visible to guests</option>
                        <option value='live'>Live — bookable</option>
                        <option value='maintenance'>Maintenance — temporarily paused</option>
                    </select>
                </label>

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
                        className='group inline-flex items-center gap-2 bg-emerald-700 hover:bg-emerald-900 text-cream-50 text-sm font-medium px-5 py-2.5 rounded-full transition-colors cursor-pointer'
                    >
                        Create property
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

export default AddPropertyModal
