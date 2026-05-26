'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import { FiArrowLeft, FiCamera, FiCheckCircle } from 'react-icons/fi'
import { adminBookings, adminProperties } from '@/lib/admin-mock-data'

const inputClass =
    'w-full bg-cream-50 border border-cream-300 rounded-lg px-3.5 py-2.5 text-sm text-ink-900 placeholder:text-ink-300 focus:outline-none focus:border-ink-700 transition-colors'
const labelClass = 'block text-[11px] uppercase tracking-[0.12em] text-ink-500 font-medium mb-1.5'
const sectionCard = 'bg-cream-50 border border-cream-300 rounded-xl p-6'

const initialProfile = {
    firstName: 'Adaeze',
    lastName: 'Okafor',
    email: 'adaeze@havenhomes.ng',
    phone: '+234 803 555 0142',
    title: 'Operations',
    timezone: 'Africa/Lagos',
    memberSince: new Date(2024, 6, 12),
}

const timezones = [
    'Africa/Lagos',
    'Africa/Accra',
    'Africa/Nairobi',
    'Europe/London',
    'America/New_York',
]

export default function AdminProfilePage() {
    const [form, setForm] = useState(initialProfile)
    const [saved, setSaved] = useState(false)

    const update = <K extends keyof typeof form>(key: K, value: (typeof form)[K]) => {
        setForm((prev) => ({ ...prev, [key]: value }))
        setSaved(false)
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        // Frontend stub — wire to API later.
        // eslint-disable-next-line no-console
        console.log('[stub] save profile', form)
        setSaved(true)
        setTimeout(() => setSaved(false), 2000)
    }

    const initials =
        (form.firstName[0] ?? '') + (form.lastName[0] ?? '')

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
                    Profile
                </h1>
                <p className='text-ink-500 mt-1 text-sm'>
                    Your personal info, visible only to your team.
                </p>
            </header>

            {/* Avatar */}
            <section className={`${sectionCard} mb-6`}>
                <div className='flex items-center gap-5'>
                    <div className='relative'>
                        <div className='w-20 h-20 rounded-full bg-cream-200 border border-cream-300 text-ink-900 flex items-center justify-center text-2xl font-heading'>
                            {initials.toUpperCase()}
                        </div>
                        <button
                            type='button'
                            className='absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-cream-50 border border-cream-300 text-ink-700 hover:text-ink-900 hover:bg-cream-100 flex items-center justify-center transition-colors cursor-pointer'
                            aria-label='Change photo'
                        >
                            <FiCamera size={14} />
                        </button>
                    </div>
                    <div>
                        <p className='font-heading text-2xl text-ink-900 leading-tight'>
                            {form.firstName} {form.lastName}
                        </p>
                        <p className='text-sm text-ink-500 mt-0.5'>
                            {form.title} · Haven Homes
                        </p>
                    </div>
                </div>
            </section>

            {/* Personal info */}
            <form onSubmit={handleSubmit}>
                <section className={`${sectionCard} mb-6`}>
                    <h2 className='font-heading text-xl text-ink-900 mb-5'>Personal info</h2>
                    <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                        <label className='block'>
                            <span className={labelClass}>First name</span>
                            <input
                                type='text'
                                required
                                value={form.firstName}
                                onChange={(e) => update('firstName', e.target.value)}
                                className={inputClass}
                            />
                        </label>
                        <label className='block'>
                            <span className={labelClass}>Last name</span>
                            <input
                                type='text'
                                required
                                value={form.lastName}
                                onChange={(e) => update('lastName', e.target.value)}
                                className={inputClass}
                            />
                        </label>
                        <label className='block sm:col-span-2'>
                            <span className={labelClass}>Email</span>
                            <input
                                type='email'
                                required
                                value={form.email}
                                onChange={(e) => update('email', e.target.value)}
                                className={inputClass}
                            />
                        </label>
                        <label className='block'>
                            <span className={labelClass}>Phone</span>
                            <input
                                type='tel'
                                value={form.phone}
                                onChange={(e) => update('phone', e.target.value)}
                                className={inputClass}
                            />
                        </label>
                        <label className='block'>
                            <span className={labelClass}>Title</span>
                            <input
                                type='text'
                                value={form.title}
                                onChange={(e) => update('title', e.target.value)}
                                placeholder='Operations'
                                className={inputClass}
                            />
                        </label>
                        <label className='block sm:col-span-2'>
                            <span className={labelClass}>Timezone</span>
                            <select
                                value={form.timezone}
                                onChange={(e) => update('timezone', e.target.value)}
                                className={`${inputClass} cursor-pointer`}
                            >
                                {timezones.map((tz) => (
                                    <option key={tz} value={tz}>
                                        {tz}
                                    </option>
                                ))}
                            </select>
                        </label>
                    </div>

                    <div className='flex items-center justify-end gap-3 pt-5 mt-5 border-t border-cream-300'>
                        {saved && (
                            <span className='inline-flex items-center gap-1.5 text-sm text-emerald-700'>
                                <FiCheckCircle size={14} />
                                Saved
                            </span>
                        )}
                        <button
                            type='submit'
                            className='inline-flex items-center gap-2 bg-emerald-700 hover:bg-emerald-900 text-cream-50 text-sm font-medium px-5 py-2.5 rounded-full transition-colors cursor-pointer'
                        >
                            Save changes
                        </button>
                    </div>
                </section>
            </form>

            {/* Activity */}
            <section className={sectionCard}>
                <h2 className='font-heading text-xl text-ink-900 mb-5'>Activity</h2>
                <div className='grid grid-cols-3 gap-4'>
                    <ActivityStat
                        label='Member since'
                        value={initialProfile.memberSince.toLocaleDateString('en-GB', {
                            month: 'short',
                            year: 'numeric',
                        })}
                    />
                    <ActivityStat
                        label='Properties'
                        value={String(adminProperties.length)}
                    />
                    <ActivityStat
                        label='Bookings handled'
                        value={String(adminBookings.length)}
                    />
                </div>
            </section>
        </div>
    )
}

const ActivityStat = ({ label, value }: { label: string; value: string }) => (
    <div>
        <p className={labelClass}>{label}</p>
        <p className='font-heading text-2xl text-ink-900 mt-1 tabular-nums'>{value}</p>
    </div>
)
