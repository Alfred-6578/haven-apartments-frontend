'use client'
import React from 'react'
import type { IconType } from 'react-icons'
import { FiInbox } from 'react-icons/fi'

interface Props {
    icon?: IconType
    title: string
    body?: string
    actionLabel?: string
    onAction?: () => void
}

const EmptyState = ({ icon: Icon = FiInbox, title, body, actionLabel, onAction }: Props) => {
    return (
        <div className='text-center py-16 px-6'>
            <Icon size={64} className='mx-auto text-ink-300 mb-5' />
            <h3 className='font-heading text-xl text-ink-900 mb-2'>{title}</h3>
            {body && <p className='text-ink-500 max-w-sm mx-auto'>{body}</p>}
            {actionLabel && onAction && (
                <button
                    type='button'
                    onClick={onAction}
                    className='mt-6 inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-cream-300 text-ink-700 hover:bg-cream-200 transition-colors cursor-pointer text-sm font-medium'
                >
                    {actionLabel}
                </button>
            )}
        </div>
    )
}

export default EmptyState
