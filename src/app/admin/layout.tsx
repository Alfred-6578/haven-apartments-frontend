'use client'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
    FiHome,
    FiCalendar,
    FiGrid,
    FiArrowLeft,
    FiChevronDown,
    FiMenu,
    FiX,
} from 'react-icons/fi'

const navItems = [
    { label: 'Dashboard', href: '/admin', icon: FiHome },
    { label: 'Bookings', href: '/admin/bookings', icon: FiCalendar },
    { label: 'Properties', href: '/admin/properties', icon: FiGrid },
    { label: 'Calendar', href: '/admin/calendar', icon: FiCalendar },
]

const isActiveRoute = (href: string, pathname: string) =>
    href === '/admin' ? pathname === '/admin' : pathname.startsWith(href)

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname()
    const [sidebarOpen, setSidebarOpen] = useState(false)

    const currentPage = navItems.find(item => isActiveRoute(item.href, pathname))

    // Close drawer on route change
    useEffect(() => {
        setSidebarOpen(false)
    }, [pathname])

    return (
        <div className='min-h-screen bg-cream-50'>
            {/* Sidebar — fixed on desktop, drawer on mobile */}
            <aside
                className={`fixed inset-y-0 left-0 z-40 w-60 bg-cream-100 border-r border-cream-300 transform transition-transform duration-300 ${
                    sidebarOpen ? 'translate-x-0' : '-translate-x-full'
                } md:translate-x-0`}
            >
                <div className='flex flex-col h-full'>
                    <div className='flex items-center justify-between px-6 py-5 border-b border-cream-300'>
                        <Link href='/admin' className='font-heading text-xl text-ink-900'>
                            Haven Homes
                        </Link>
                        <button
                            type='button'
                            onClick={() => setSidebarOpen(false)}
                            className='md:hidden text-ink-500 hover:text-ink-900 transition-colors'
                            aria-label='Close menu'
                        >
                            <FiX size={20} />
                        </button>
                    </div>

                    <nav className='flex-1 py-4 pr-2 overflow-y-auto'>
                        <ul className='space-y-1'>
                            {navItems.map(item => {
                                const Icon = item.icon
                                const active = isActiveRoute(item.href, pathname)
                                return (
                                    <li key={item.href}>
                                        <Link
                                            href={item.href}
                                            className={`flex items-center gap-3 px-3 py-2.5 text-sm border-l-[3px] transition-colors ${
                                                active
                                                    ? 'bg-emerald-50 text-emerald-900 border-emerald-700 rounded-r-lg font-medium'
                                                    : 'text-ink-700 hover:bg-cream-200 border-transparent rounded-lg'
                                            }`}
                                        >
                                            <Icon size={18} />
                                            <span>{item.label}</span>
                                        </Link>
                                    </li>
                                )
                            })}
                        </ul>
                    </nav>

                    <div className='p-3 border-t border-cream-300'>
                        <Link
                            href='/'
                            className='inline-flex items-center gap-2 px-3 py-2 text-sm text-ink-500 hover:text-ink-900 transition-colors'
                        >
                            <FiArrowLeft size={16} />
                            Back to site
                        </Link>
                    </div>
                </div>
            </aside>

            {/* Mobile drawer overlay */}
            {sidebarOpen && (
                <div
                    className='fixed inset-0 bg-ink-900/40 z-30 md:hidden'
                    onClick={() => setSidebarOpen(false)}
                    aria-hidden
                />
            )}

            {/* Main content area */}
            <div className='md:ml-60 flex flex-col min-h-screen'>
                {/* Top bar */}
                <header className='sticky top-0 z-20 h-16 bg-cream-50 border-b border-cream-300 flex items-center justify-between px-5 md:px-8'>
                    <div className='flex items-center gap-3'>
                        <button
                            type='button'
                            onClick={() => setSidebarOpen(true)}
                            className='md:hidden text-ink-700 hover:text-ink-900 transition-colors'
                            aria-label='Open menu'
                        >
                            <FiMenu size={20} />
                        </button>
                        <nav className='text-sm' aria-label='Breadcrumb'>
                            <span className='text-ink-500'>Admin</span>
                            <span className='text-ink-300 mx-2'>/</span>
                            <span className='text-ink-900 font-medium'>
                                {currentPage?.label ?? 'Dashboard'}
                            </span>
                        </nav>
                    </div>

                    <div className='flex items-center gap-2'>
                        <div
                            className='w-9 h-9 rounded-full bg-cream-100 border border-cream-300 text-ink-900 flex items-center justify-center text-sm font-medium'
                            aria-hidden
                        >
                            AO
                        </div>
                        <span className='text-sm text-ink-900 max-md:hidden'>Adaeze O.</span>
                        <FiChevronDown size={14} className='text-ink-500' />
                    </div>
                </header>

                <main className='flex-1 p-5 md:p-8'>{children}</main>
            </div>
        </div>
    )
}
