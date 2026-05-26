'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { FiAlertCircle, FiEye, FiEyeOff, FiLoader } from 'react-icons/fi'

const inputClass =
    'w-full bg-cream-50 border border-cream-300 rounded-lg px-3.5 py-2.5 text-sm text-ink-900 placeholder:text-ink-300 focus:outline-none focus:border-ink-700 transition-colors'
const labelClass = 'text-[11px] uppercase tracking-[0.12em] text-ink-500 font-medium'

const DEMO_EMAIL = 'admin@havenhomes.com'
const DEMO_PASSWORD = 'demo'

export default function AdminLoginPage() {
    const router = useRouter()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [keepSignedIn, setKeepSignedIn] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setLoading(true)
        setError('')

        setTimeout(() => {
            if (email.trim().toLowerCase() === DEMO_EMAIL && password === DEMO_PASSWORD) {
                const maxAge = keepSignedIn ? 60 * 60 * 24 * 30 : 60 * 60 * 24
                document.cookie = `havenhomes_admin=true; path=/; max-age=${maxAge}; SameSite=Lax`
                router.push('/admin')
            } else {
                setError('Invalid email or password. Try the demo credentials below.')
                setLoading(false)
            }
        }, 700)
    }

    return (
        <div className='min-h-screen grid md:grid-cols-2'>
            {/* Left column — brand panel */}
            <div className='hidden md:flex bg-ink-900 p-12 flex-col justify-between'>
                <Link
                    href='/'
                    className='font-heading text-[22px] text-cream-50 hover:text-cream-100/80 transition-colors w-fit'
                >
                    Haven Homes
                </Link>
                <p className='font-heading text-[36px] text-cream-50 max-w-md leading-tight'>
                    The home of every Haven Home.
                </p>
                <p className='text-sm text-cream-100/60'>© 2026 Haven Homes. Lagos.</p>
            </div>

            {/* Right column — login form */}
            <div className='bg-cream-50 flex items-center justify-center p-6 sm:p-8'>
                <div className='w-full max-w-xl'>
                    <div className='space-y-6'>
                        <div>
                            <p className={labelClass}>Operator login</p>
                            <h1 className='font-heading text-[28px] text-ink-900 mt-1.5 leading-tight'>
                                Sign in to manage your stays.
                            </h1>
                            <p className='text-sm text-ink-700 mt-2'>
                                Use your operator credentials to access the dashboard.
                            </p>
                        </div>

                        <form onSubmit={handleSubmit} className='space-y-4'>
                            <label className='block'>
                                <span className={`${labelClass} block mb-1.5`}>Email</span>
                                <input
                                    type='email'
                                    required
                                    autoComplete='email'
                                    autoFocus
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder='you@havenhomes.com'
                                    className={inputClass}
                                />
                            </label>

                            <label className='block'>
                                <div className='flex items-center justify-between mb-1.5'>
                                    <span className={labelClass}>Password</span>
                                    <a
                                        href='#'
                                        onClick={(e) => e.preventDefault()}
                                        className='text-xs text-ink-500 hover:text-emerald-700 transition-colors'
                                    >
                                        Forgot?
                                    </a>
                                </div>
                                <div className='relative'>
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        required
                                        autoComplete='current-password'
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className={`${inputClass} pr-11`}
                                    />
                                    <button
                                        type='button'
                                        onClick={() => setShowPassword((p) => !p)}
                                        className='absolute right-3 top-1/2 -translate-y-1/2 text-ink-500 hover:text-ink-900 transition-colors cursor-pointer'
                                        aria-label={showPassword ? 'Hide password' : 'Show password'}
                                        title={showPassword ? 'Hide password' : 'Show password'}
                                    >
                                        {showPassword ? <FiEyeOff size={16} /> : <FiEye size={16} />}
                                    </button>
                                </div>
                            </label>

                            <label className='flex items-center gap-2 cursor-pointer'>
                                <input
                                    type='checkbox'
                                    checked={keepSignedIn}
                                    onChange={(e) => setKeepSignedIn(e.target.checked)}
                                    className='w-4 h-4 rounded border-cream-400 accent-emerald-700 cursor-pointer'
                                />
                                <span className='text-sm text-ink-700'>Keep me signed in</span>
                            </label>

                            <button
                                type='submit'
                                disabled={loading}
                                className='w-full inline-flex items-center justify-center gap-2 bg-emerald-700 hover:bg-emerald-900 text-cream-50 font-medium py-3 rounded-full transition-colors cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed'
                            >
                                {loading ? (
                                    <>
                                        <FiLoader size={16} className='animate-spin' />
                                        Signing in...
                                    </>
                                ) : (
                                    'Sign in'
                                )}
                            </button>

                            {error && (
                                <div className='flex items-start gap-2 text-sm text-error mt-2'>
                                    <FiAlertCircle size={16} className='shrink-0 mt-0.5' />
                                    <span>{error}</span>
                                </div>
                            )}
                        </form>

                        <div className='bg-cream-200 rounded-lg p-4 mt-6'>
                            <p className='text-[10px] uppercase tracking-[0.12em] text-ink-500 font-medium'>
                                Demo credentials
                            </p>
                            <p className='text-[13px] text-ink-700 mt-2 font-mono'>
                                Email: {DEMO_EMAIL}
                            </p>
                            <p className='text-[13px] text-ink-700 font-mono'>
                                Password: {DEMO_PASSWORD}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
