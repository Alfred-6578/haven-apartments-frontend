import React from 'react'

type Status =
    | 'pending'
    | 'confirmed'
    | 'checked-in'
    | 'completed'
    | 'cancelled'
    | 'live'
    | 'draft'
    | 'maintenance'

const STYLES: Record<Status, { bg: string; text: string; label: string }> = {
    pending: { bg: 'bg-warning/15', text: 'text-warning', label: 'Pending' },
    confirmed: { bg: 'bg-emerald-100', text: 'text-emerald-900', label: 'Confirmed' },
    'checked-in': { bg: 'bg-emerald-100', text: 'text-emerald-900', label: 'Checked in' },
    completed: { bg: 'bg-cream-200', text: 'text-ink-700', label: 'Completed' },
    cancelled: { bg: 'bg-error/15', text: 'text-error', label: 'Cancelled' },
    live: { bg: 'bg-emerald-100', text: 'text-emerald-900', label: 'Live' },
    draft: { bg: 'bg-warning/15', text: 'text-warning', label: 'Draft' },
    maintenance: { bg: 'bg-error/15', text: 'text-error', label: 'Maintenance' },
}

const StatusPill = ({ status }: { status: Status }) => {
    const s = STYLES[status]
    return (
        <span
            className={`inline-block text-[11px] uppercase tracking-[0.1em] px-2.5 py-1 rounded-full font-medium ${s.bg} ${s.text}`}
        >
            {s.label}
        </span>
    )
}

export default StatusPill
