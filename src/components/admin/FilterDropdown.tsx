'use client'
import React, { useRef, useState } from 'react'
import type { IconType } from 'react-icons'
import { FiChevronDown, FiCheck } from 'react-icons/fi'
import { useClickOutside } from '@/hooks/useClickOutside'

interface Option {
    value: string
    label: string
}

interface Props {
    options: Option[]
    selected: string
    onSelect: (value: string) => void
    icon?: IconType
    prefix?: string
}

const FilterDropdown = ({ options, selected, onSelect, icon: Icon, prefix }: Props) => {
    const [open, setOpen] = useState(false)
    const ref = useRef<HTMLDivElement>(null)
    useClickOutside(ref, () => setOpen(false), open)

    const current = options.find(o => o.value === selected) ?? options[0]

    return (
        <div ref={ref} className='relative'>
            <button
                type='button'
                onClick={() => setOpen(prev => !prev)}
                className='flex items-center gap-2 bg-cream-50 text-ink-700 border border-cream-300 rounded-full px-3.5 py-1.5 text-sm hover:bg-cream-200 transition-colors cursor-pointer whitespace-nowrap'
                aria-haspopup='listbox'
                aria-expanded={open}
            >
                {Icon && <Icon size={14} className='text-ink-500' />}
                <span>
                    {prefix && <span className='text-ink-500'>{prefix}: </span>}
                    {current.label}
                </span>
                <FiChevronDown
                    size={14}
                    className={`text-ink-500 transition-transform ${open ? 'rotate-180' : ''}`}
                />
            </button>

            {open && (
                <div
                    role='listbox'
                    className='absolute right-0 top-full mt-2 min-w-[200px] bg-cream-50 border border-cream-300 rounded-xl shadow-xl py-1.5 z-30 animate-fade-in-up'
                >
                    {options.map(opt => {
                        const isSelected = opt.value === selected
                        return (
                            <button
                                key={opt.value}
                                type='button'
                                role='option'
                                aria-selected={isSelected}
                                onClick={() => {
                                    onSelect(opt.value)
                                    setOpen(false)
                                }}
                                className={`w-full flex items-center justify-between gap-3 px-4 py-2 text-sm transition-colors cursor-pointer ${
                                    isSelected
                                        ? 'bg-emerald-50 text-emerald-900 font-medium'
                                        : 'text-ink-700 hover:bg-cream-100'
                                }`}
                            >
                                <span>{opt.label}</span>
                                {isSelected && <FiCheck size={14} className='text-emerald-700' />}
                            </button>
                        )
                    })}
                </div>
            )}
        </div>
    )
}

export default FilterDropdown
