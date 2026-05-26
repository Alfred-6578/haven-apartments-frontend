'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import {
    FiArrowLeft,
    FiCheckCircle,
    FiCreditCard,
    FiLock,
    FiPlus,
    FiTrash2,
    FiUserPlus,
} from 'react-icons/fi'
import Toggle from '@/components/admin/Toggle'

const inputClass =
    'w-full bg-cream-50 border border-cream-300 rounded-lg px-3.5 py-2.5 text-sm text-ink-900 placeholder:text-ink-300 focus:outline-none focus:border-ink-700 transition-colors'
const labelClass = 'block text-[11px] uppercase tracking-[0.12em] text-ink-500 font-medium mb-1.5'
const sectionCard = 'bg-cream-50 border border-cream-300 rounded-xl p-6'

const teamMembers = [
    {
        name: 'Adaeze Okafor',
        email: 'adaeze@havenhomes.ng',
        role: 'Owner',
        isYou: true,
    },
    {
        name: 'Tunde Adeyemi',
        email: 'tunde@havenhomes.ng',
        role: 'Operations',
        isYou: false,
    },
]

export default function AdminSettingsPage() {
    // Notifications
    const [notifNewBooking, setNotifNewBooking] = useState(true)
    const [notifCancellation, setNotifCancellation] = useState(true)
    const [notifCheckinReminder, setNotifCheckinReminder] = useState(true)
    const [notifSMS, setNotifSMS] = useState(false)
    const [notifBrowser, setNotifBrowser] = useState(false)

    // Display
    const [currency, setCurrency] = useState('NGN')
    const [dateFormat, setDateFormat] = useState('MMM d, yyyy')

    // Security
    const [twoFA, setTwoFA] = useState(false)
    const [savedSection, setSavedSection] = useState<string | null>(null)

    const saveSection = (section: string) => {
        // Frontend stub — wire to API later.
        // eslint-disable-next-line no-console
        console.log('[stub] save settings section', section)
        setSavedSection(section)
        setTimeout(() => setSavedSection(null), 2000)
    }

    const renderSavedLabel = (section: string) =>
        savedSection === section ? (
            <span className='inline-flex items-center gap-1.5 text-sm text-emerald-700'>
                <FiCheckCircle size={14} />
                Saved
            </span>
        ) : null

    const handleDeleteAccount = () => {
        const ok = window.confirm(
            'Delete your account? This will remove all your data permanently and cannot be undone.',
        )
        if (ok) {
            // Frontend stub
            // eslint-disable-next-line no-console
            console.log('[stub] delete account')
        }
    }

    return (
        <div className='max-w-3xl mx-auto pt-4 pb-12'>
            <Link
                href='/admin'
                className='inline-flex items-center gap-2 text-sm text-ink-500 hover:text-ink-900 transition-colors mb-6'
            >
                <FiArrowLeft size={14} />
                Back to dashboard
            </Link>

            <header className='mb-8'>
                <h1 className='font-heading text-3xl md:text-[32px] text-ink-900 leading-tight'>
                    Settings
                </h1>
                <p className='text-ink-500 mt-1 text-sm'>
                    Notifications, display preferences, payments, and account access.
                </p>
            </header>

            {/* Notifications */}
            <section className={`${sectionCard} mb-6`}>
                <h2 className='font-heading text-xl text-ink-900 mb-5'>Notifications</h2>
                <div className='divide-y divide-cream-300'>
                    <ToggleRow
                        label='New booking'
                        description='Email me when a guest books one of my properties.'
                        enabled={notifNewBooking}
                        onChange={setNotifNewBooking}
                    />
                    <ToggleRow
                        label='Cancellations'
                        description='Email me when a guest cancels.'
                        enabled={notifCancellation}
                        onChange={setNotifCancellation}
                    />
                    <ToggleRow
                        label='Check-in reminders'
                        description='Daily email of upcoming check-ins.'
                        enabled={notifCheckinReminder}
                        onChange={setNotifCheckinReminder}
                    />
                    <ToggleRow
                        label='SMS alerts'
                        description='Text message for urgent issues only.'
                        enabled={notifSMS}
                        onChange={setNotifSMS}
                    />
                    <ToggleRow
                        label='Browser notifications'
                        description='Show a push when the dashboard is open.'
                        enabled={notifBrowser}
                        onChange={setNotifBrowser}
                    />
                </div>
                <div className='flex items-center justify-end gap-3 pt-5 mt-5 border-t border-cream-300'>
                    {renderSavedLabel('notifications')}
                    <button
                        type='button'
                        onClick={() => saveSection('notifications')}
                        className='inline-flex items-center gap-2 bg-emerald-700 hover:bg-emerald-900 text-cream-50 text-sm font-medium px-5 py-2.5 rounded-full transition-colors cursor-pointer'
                    >
                        Save preferences
                    </button>
                </div>
            </section>

            {/* Display */}
            <section className={`${sectionCard} mb-6`}>
                <h2 className='font-heading text-xl text-ink-900 mb-5'>Display</h2>
                <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                    <label className='block'>
                        <span className={labelClass}>Currency</span>
                        <select
                            value={currency}
                            onChange={(e) => setCurrency(e.target.value)}
                            className={`${inputClass} cursor-pointer`}
                        >
                            <option value='NGN'>NGN — Nigerian Naira (₦)</option>
                            <option value='USD'>USD — US Dollar ($)</option>
                            <option value='GBP'>GBP — British Pound (£)</option>
                            <option value='EUR'>EUR — Euro (€)</option>
                        </select>
                    </label>
                    <label className='block'>
                        <span className={labelClass}>Date format</span>
                        <select
                            value={dateFormat}
                            onChange={(e) => setDateFormat(e.target.value)}
                            className={`${inputClass} cursor-pointer`}
                        >
                            <option value='MMM d, yyyy'>Mar 5, 2026</option>
                            <option value='d MMM yyyy'>5 Mar 2026</option>
                            <option value='dd/MM/yyyy'>05/03/2026</option>
                            <option value='MM/dd/yyyy'>03/05/2026</option>
                        </select>
                    </label>
                </div>
                <div className='flex items-center justify-end gap-3 pt-5 mt-5 border-t border-cream-300'>
                    {renderSavedLabel('display')}
                    <button
                        type='button'
                        onClick={() => saveSection('display')}
                        className='inline-flex items-center gap-2 bg-emerald-700 hover:bg-emerald-900 text-cream-50 text-sm font-medium px-5 py-2.5 rounded-full transition-colors cursor-pointer'
                    >
                        Save preferences
                    </button>
                </div>
            </section>

            {/* Payments */}
            <section className={`${sectionCard} mb-6`}>
                <h2 className='font-heading text-xl text-ink-900 mb-5'>Payouts</h2>
                <div className='flex items-center gap-4 p-4 bg-cream-100 border border-cream-300 rounded-lg'>
                    <div className='w-10 h-10 rounded-full bg-emerald-100 text-emerald-900 flex items-center justify-center shrink-0'>
                        <FiCreditCard size={16} />
                    </div>
                    <div className='flex-1 min-w-0'>
                        <p className='text-sm text-ink-900 font-medium'>GTBank · 0123****89</p>
                        <p className='text-xs text-ink-500'>Adaeze Okafor · Default account</p>
                    </div>
                    <button
                        type='button'
                        className='shrink-0 inline-flex items-center gap-1.5 text-sm text-ink-700 border border-cream-300 rounded-full px-3.5 py-1.5 hover:bg-cream-200 transition-colors cursor-pointer'
                    >
                        Edit
                    </button>
                </div>
                <button
                    type='button'
                    className='mt-3 inline-flex items-center gap-1.5 text-sm text-emerald-700 hover:text-emerald-900 transition-colors cursor-pointer'
                >
                    <FiPlus size={14} />
                    Add payout method
                </button>
                <div className='mt-5 pt-5 border-t border-cream-300 text-xs text-ink-500'>
                    Payouts processed via Paystack · Funds typically arrive within 1–2 business days.
                </div>
            </section>

            {/* Team */}
            <section className={`${sectionCard} mb-6`}>
                <div className='flex items-center justify-between mb-5'>
                    <h2 className='font-heading text-xl text-ink-900'>Team</h2>
                    <button
                        type='button'
                        className='inline-flex items-center gap-1.5 text-sm text-ink-700 border border-cream-300 rounded-full px-3.5 py-1.5 hover:bg-cream-200 transition-colors cursor-pointer'
                    >
                        <FiUserPlus size={13} />
                        Invite
                    </button>
                </div>
                <ul className='divide-y divide-cream-300 -my-3'>
                    {teamMembers.map((m) => (
                        <li key={m.email} className='py-3 flex items-center gap-3'>
                            <div className='w-9 h-9 rounded-full bg-cream-200 border border-cream-300 text-ink-900 flex items-center justify-center text-xs font-medium shrink-0'>
                                {m.name
                                    .split(' ')
                                    .map((n) => n[0])
                                    .slice(0, 2)
                                    .join('')
                                    .toUpperCase()}
                            </div>
                            <div className='flex-1 min-w-0'>
                                <p className='text-sm text-ink-900 font-medium truncate'>
                                    {m.name}
                                    {m.isYou && (
                                        <span className='ml-2 text-xs text-ink-500 font-normal'>
                                            (you)
                                        </span>
                                    )}
                                </p>
                                <p className='text-xs text-ink-500 truncate'>{m.email}</p>
                            </div>
                            <span className='text-xs text-ink-700 uppercase tracking-[0.1em]'>
                                {m.role}
                            </span>
                        </li>
                    ))}
                </ul>
            </section>

            {/* Security */}
            <section className={`${sectionCard} mb-6`}>
                <h2 className='font-heading text-xl text-ink-900 mb-5'>Security</h2>
                <div className='space-y-4'>
                    <div className='flex items-center justify-between gap-4 pb-4 border-b border-cream-300'>
                        <div className='flex-1 min-w-0'>
                            <p className='text-sm text-ink-900 font-medium'>Password</p>
                            <p className='text-xs text-ink-500 mt-0.5'>
                                Last changed 3 months ago
                            </p>
                        </div>
                        <button
                            type='button'
                            className='shrink-0 inline-flex items-center gap-1.5 text-sm text-ink-700 border border-cream-300 rounded-full px-3.5 py-1.5 hover:bg-cream-200 transition-colors cursor-pointer'
                        >
                            <FiLock size={13} />
                            Change
                        </button>
                    </div>
                    <div className='flex items-center justify-between gap-4'>
                        <div className='flex-1 min-w-0'>
                            <p className='text-sm text-ink-900 font-medium'>Two-factor authentication</p>
                            <p className='text-xs text-ink-500 mt-0.5'>
                                Require a code from your phone when signing in.
                            </p>
                        </div>
                        <Toggle
                            enabled={twoFA}
                            onChange={setTwoFA}
                            label='Two-factor authentication'
                        />
                    </div>
                </div>
            </section>

            {/* Danger zone */}
            <section className='bg-error/5 border border-error/30 rounded-xl p-6'>
                <h2 className='font-heading text-xl text-error mb-2'>Danger zone</h2>
                <p className='text-sm text-ink-700'>
                    Permanently delete your account and all associated data. This action cannot be undone.
                </p>
                <button
                    type='button'
                    onClick={handleDeleteAccount}
                    className='mt-4 inline-flex items-center gap-1.5 text-sm text-error border border-error/40 rounded-full px-4 py-2 hover:bg-error/10 transition-colors cursor-pointer'
                >
                    <FiTrash2 size={13} />
                    Delete account
                </button>
            </section>
        </div>
    )
}

const ToggleRow = ({
    label,
    description,
    enabled,
    onChange,
}: {
    label: string
    description: string
    enabled: boolean
    onChange: (v: boolean) => void
}) => (
    <div className='flex items-start justify-between gap-4 py-4 first:pt-0 last:pb-0'>
        <div className='flex-1 min-w-0'>
            <p className='text-sm text-ink-900 font-medium'>{label}</p>
            <p className='text-xs text-ink-500 mt-0.5'>{description}</p>
        </div>
        <Toggle enabled={enabled} onChange={onChange} label={label} />
    </div>
)
