'use client'
import React, { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import {
    FiMoreVertical,
    FiEye,
    FiEdit2,
    FiCopy,
    FiCheckCircle,
    FiExternalLink,
    FiTrash2,
} from 'react-icons/fi'
import { useClickOutside } from '@/hooks/useClickOutside'
import type { AdminProperty } from '@/lib/admin-mock-data'
import EditPropertyModal from './EditPropertyModal'

const MENU_WIDTH = 224 // w-56
const MENU_HEIGHT_EST = 280

const statusLabel: Record<AdminProperty['status'], string> = {
    live: 'Set live',
    draft: 'Set as draft',
    maintenance: 'Set maintenance',
}

const PropertyActionsMenu = ({ property }: { property: AdminProperty }) => {
    const router = useRouter()
    const [open, setOpen] = useState(false)
    const [copied, setCopied] = useState(false)
    const [editOpen, setEditOpen] = useState(false)
    const [coords, setCoords] = useState<{ top: number; left: number; flipUp: boolean }>({
        top: 0,
        left: 0,
        flipUp: false,
    })
    const buttonRef = useRef<HTMLButtonElement>(null)
    const menuRef = useRef<HTMLDivElement>(null)
    useClickOutside(menuRef, () => setOpen(false), open)

    const updateCoords = () => {
        if (!buttonRef.current) return
        const rect = buttonRef.current.getBoundingClientRect()
        const spaceBelow = window.innerHeight - rect.bottom
        const flipUp = spaceBelow < MENU_HEIGHT_EST + 16
        setCoords({
            top: flipUp ? rect.top - 4 : rect.bottom + 4,
            left: Math.max(8, rect.right - MENU_WIDTH),
            flipUp,
        })
    }

    useEffect(() => {
        if (!open) return
        const onScroll = () => setOpen(false)
        window.addEventListener('scroll', onScroll, true)
        window.addEventListener('resize', updateCoords)
        return () => {
            window.removeEventListener('scroll', onScroll, true)
            window.removeEventListener('resize', updateCoords)
        }
    }, [open])

    const close = () => setOpen(false)

    const toggle = () => {
        if (open) {
            setOpen(false)
            return
        }
        updateCoords()
        setOpen(true)
    }

    const view = () => {
        close()
        router.push(`/admin/properties/${property.id}`)
    }

    const edit = () => {
        close()
        setEditOpen(true)
    }

    const copyId = async () => {
        try {
            await navigator.clipboard.writeText(property.id)
            setCopied(true)
            setTimeout(() => {
                setCopied(false)
                close()
            }, 900)
        } catch {
            close()
        }
    }

    const viewPublic = () => {
        const slug = property.id.replace(/^prop-/, '')
        window.open(`/stays/${slug}`, '_blank', 'noopener,noreferrer')
        close()
    }

    const setStatus = (next: AdminProperty['status']) => {
        // Frontend stub — wire to API later.
        // eslint-disable-next-line no-console
        console.log('[stub] set property status', property.id, '→', next)
        close()
    }

    const remove = () => {
        const ok = window.confirm(
            `Delete property "${property.name}"? Existing bookings will be preserved but this listing will be removed.`,
        )
        if (ok) {
            // eslint-disable-next-line no-console
            console.log('[stub] delete property', property.id)
        }
        close()
    }

    const otherStatuses = (['live', 'draft', 'maintenance'] as const).filter(
        (s) => s !== property.status,
    )

    return (
        <>
            <button
                ref={buttonRef}
                type='button'
                onClick={toggle}
                className='text-ink-500 hover:text-ink-900 hover:bg-cream-200 rounded-full w-8 h-8 flex items-center justify-center transition-colors cursor-pointer'
                aria-haspopup='menu'
                aria-expanded={open}
                aria-label={`Actions for ${property.name}`}
            >
                <FiMoreVertical size={18} />
            </button>

            {open && (
                <div
                    ref={menuRef}
                    role='menu'
                    className='fixed bg-cream-50 border border-cream-300 rounded-xl shadow-xl py-1.5 z-30 animate-fade-in-up'
                    style={{
                        top: `${coords.top}px`,
                        left: `${coords.left}px`,
                        width: `${MENU_WIDTH}px`,
                        transform: coords.flipUp ? 'translateY(-100%)' : undefined,
                    }}
                >
                    <button
                        type='button'
                        role='menuitem'
                        onClick={view}
                        className='w-full flex items-center gap-3 px-4 py-2 text-sm text-ink-700 hover:bg-cream-100 transition-colors cursor-pointer'
                    >
                        <FiEye size={15} className='text-ink-500' />
                        View details
                    </button>
                    <button
                        type='button'
                        role='menuitem'
                        onClick={edit}
                        className='w-full flex items-center gap-3 px-4 py-2 text-sm text-ink-700 hover:bg-cream-100 transition-colors cursor-pointer'
                    >
                        <FiEdit2 size={15} className='text-ink-500' />
                        Edit property
                    </button>
                    <button
                        type='button'
                        role='menuitem'
                        onClick={copyId}
                        className='w-full flex items-center gap-3 px-4 py-2 text-sm text-ink-700 hover:bg-cream-100 transition-colors cursor-pointer'
                    >
                        {copied ? (
                            <FiCheckCircle size={15} className='text-emerald-700' />
                        ) : (
                            <FiCopy size={15} className='text-ink-500' />
                        )}
                        {copied ? 'Copied!' : 'Copy property ID'}
                    </button>
                    <button
                        type='button'
                        role='menuitem'
                        onClick={viewPublic}
                        className='w-full flex items-center gap-3 px-4 py-2 text-sm text-ink-700 hover:bg-cream-100 transition-colors cursor-pointer'
                    >
                        <FiExternalLink size={15} className='text-ink-500' />
                        View on site
                    </button>

                    <div className='border-t border-cream-300 mt-1 pt-1'>
                        <p className='px-4 pt-1 pb-1 text-[10px] uppercase tracking-[0.12em] text-ink-500 font-medium'>
                            Status
                        </p>
                        {otherStatuses.map((s) => (
                            <button
                                key={s}
                                type='button'
                                role='menuitem'
                                onClick={() => setStatus(s)}
                                className='w-full flex items-center gap-3 px-4 py-2 text-sm text-ink-700 hover:bg-cream-100 transition-colors cursor-pointer'
                            >
                                <span className='w-[15px]' aria-hidden />
                                {statusLabel[s]}
                            </button>
                        ))}
                    </div>

                    <div className='border-t border-cream-300 mt-1 pt-1'>
                        <button
                            type='button'
                            role='menuitem'
                            onClick={remove}
                            className='w-full flex items-center gap-3 px-4 py-2 text-sm text-error hover:bg-error/5 transition-colors cursor-pointer'
                        >
                            <FiTrash2 size={15} />
                            Delete property
                        </button>
                    </div>
                </div>
            )}

            <EditPropertyModal
                property={editOpen ? property : null}
                isOpen={editOpen}
                onClose={() => setEditOpen(false)}
            />
        </>
    )
}

export default PropertyActionsMenu
