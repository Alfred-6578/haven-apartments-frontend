import React from 'react'

const items: { color: string; label: string }[] = [
    { color: 'bg-emerald-100', label: 'Confirmed' },
    { color: 'bg-warning/20', label: 'Pending' },
    { color: 'bg-ink-200', label: 'Completed' },
    { color: 'bg-error/15', label: 'Cancelled' },
]

const CalendarLegend = () => {
    return (
        <div className='flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-ink-500'>
            {items.map(({ color, label }) => (
                <div key={label} className='flex items-center gap-2'>
                    <span className={`inline-block w-3 h-3 rounded ${color} border border-cream-300`} />
                    {label}
                </div>
            ))}
        </div>
    )
}

export default CalendarLegend
