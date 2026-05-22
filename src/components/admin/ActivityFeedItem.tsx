import React from 'react'

type Variant = 'positive' | 'neutral' | 'negative'

const DOT_COLORS: Record<Variant, string> = {
    positive: 'bg-emerald-500',
    neutral: 'bg-ink-300',
    negative: 'bg-error',
}

interface Props {
    text: string
    time: string
    variant: Variant
}

const ActivityFeedItem = ({ text, time, variant }: Props) => {
    return (
        <div className='flex items-start gap-3 py-2'>
            <span className={`w-2 h-2 rounded-full mt-2 shrink-0 ${DOT_COLORS[variant]}`} aria-hidden />
            <div className='flex-1 min-w-0'>
                <p className='text-sm text-ink-900 leading-snug'>{text}</p>
                <p className='text-xs text-ink-500 mt-0.5'>{time}</p>
            </div>
        </div>
    )
}

export default ActivityFeedItem
