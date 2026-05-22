'use client'
import React from 'react'
import { FiGrid, FiList } from 'react-icons/fi'

type View = 'grid' | 'list'

interface Props {
    view: View
    onChange: (view: View) => void
}

const ViewToggle = ({ view, onChange }: Props) => {
    const btnClass = (active: boolean) =>
        `flex items-center justify-center w-8 h-8 rounded-full transition-colors cursor-pointer ${
            active ? 'bg-cream-50 text-ink-900 shadow-sm' : 'text-ink-500 hover:text-ink-900'
        }`

    return (
        <div
            className='inline-flex items-center bg-cream-100 border border-cream-300 rounded-full p-1'
            role='group'
            aria-label='View toggle'
        >
            <button
                type='button'
                onClick={() => onChange('grid')}
                className={btnClass(view === 'grid')}
                aria-label='Grid view'
                aria-pressed={view === 'grid'}
            >
                <FiGrid size={14} />
            </button>
            <button
                type='button'
                onClick={() => onChange('list')}
                className={btnClass(view === 'list')}
                aria-label='List view'
                aria-pressed={view === 'list'}
            >
                <FiList size={14} />
            </button>
        </div>
    )
}

export default ViewToggle
