'use client'
import React from 'react'

interface Props {
    enabled: boolean
    onChange: (enabled: boolean) => void
    label?: string
}

const Toggle = ({ enabled, onChange, label }: Props) => (
    <button
        type='button'
        role='switch'
        aria-checked={enabled}
        aria-label={label}
        onClick={() => onChange(!enabled)}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors cursor-pointer shrink-0 ${
            enabled ? 'bg-emerald-700' : 'bg-cream-300'
        }`}
    >
        <span
            className={`inline-block h-4 w-4 transform rounded-full bg-cream-50 shadow-sm transition-transform ${
                enabled ? 'translate-x-[1.4rem]' : 'translate-x-1'
            }`}
        />
    </button>
)

export default Toggle
