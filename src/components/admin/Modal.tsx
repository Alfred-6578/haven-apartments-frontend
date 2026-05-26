'use client'
import React, { useEffect } from 'react'
import { FiX } from 'react-icons/fi'

interface Props {
    isOpen: boolean
    onClose: () => void
    title: string
    children: React.ReactNode
    maxWidth?: string
}

const Modal = ({ isOpen, onClose, title, children, maxWidth = 'max-w-lg' }: Props) => {
    useEffect(() => {
        if (!isOpen) return
        const handler = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose()
        }
        window.addEventListener('keydown', handler)
        return () => window.removeEventListener('keydown', handler)
    }, [isOpen, onClose])

    useEffect(() => {
        if (!isOpen) return
        const prev = document.body.style.overflow
        document.body.style.overflow = 'hidden'
        return () => {
            document.body.style.overflow = prev
        }
    }, [isOpen])

    if (!isOpen) return null

    return (
        <div
            role='dialog'
            aria-modal='true'
            aria-label={title}
            className='fixed inset-0 z-[100] flex items-center justify-center p-4 bg-ink-900/50 backdrop-blur-sm'
            style={{ animation: 'hero-fade-in 0.15s ease-out backwards' }}
            onClick={onClose}
        >
            <div
                className={`bg-cream-50 rounded-2xl shadow-2xl w-full ${maxWidth} max-h-[90vh] overflow-y-auto`}
                onClick={(e) => e.stopPropagation()}
                style={{ animation: 'fade-in-up 0.2s cubic-bezier(0.22, 0.61, 0.36, 1) backwards' }}
            >
                <div className='flex items-center justify-between px-6 py-4 border-b border-cream-300 sticky top-0 bg-cream-50 rounded-t-2xl'>
                    <h2 className='font-heading text-xl text-ink-900'>{title}</h2>
                    <button
                        type='button'
                        onClick={onClose}
                        className='w-9 h-9 rounded-full flex items-center justify-center text-ink-500 hover:text-ink-900 hover:bg-cream-100 transition-colors cursor-pointer'
                        aria-label='Close'
                        title='Close'
                    >
                        <FiX size={20} />
                    </button>
                </div>
                <div className='p-6'>{children}</div>
            </div>
        </div>
    )
}

export default Modal
