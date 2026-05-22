'use client'
import React from 'react'
import { FiSearch } from 'react-icons/fi'

interface Props {
    value: string
    onChange: (value: string) => void
    placeholder?: string
}

const SearchInput = ({ value, onChange, placeholder = 'Search…' }: Props) => {
    return (
        <div className='relative flex-1 min-w-[200px] max-w-md'>
            <FiSearch
                size={16}
                className='absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-500 pointer-events-none'
            />
            <input
                type='search'
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                className='w-full bg-cream-50 border border-cream-300 rounded-full pl-10 pr-4 py-2 text-sm text-ink-900 placeholder:text-ink-300 focus:outline-none focus:border-ink-700 transition-colors'
            />
        </div>
    )
}

export default SearchInput
