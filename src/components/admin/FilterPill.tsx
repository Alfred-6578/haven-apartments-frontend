'use client'
import React from 'react'

interface Props {
    label: string
    active: boolean
    onClick: () => void
}

const FilterPill = ({ label, active, onClick }: Props) => {
    return (
        <button
            type='button'
            onClick={onClick}
            className={`px-3.5 py-1.5 rounded-full text-sm font-medium border transition-colors cursor-pointer whitespace-nowrap ${
                active
                    ? 'bg-emerald-700 text-cream-50 border-emerald-700'
                    : 'bg-cream-50 text-ink-700 border-cream-300 hover:bg-cream-200'
            }`}
        >
            {label}
        </button>
    )
}

export default FilterPill
