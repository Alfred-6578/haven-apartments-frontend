import React from 'react'
import { format } from 'date-fns'
import { FiBarChart2, FiCalendar, FiPieChart, FiUsers } from 'react-icons/fi'
import { adminBookings, adminProperties } from '@/lib/admin-mock-data'
import StatCard from '@/components/admin/StatCard'
import UpcomingCheckinRow from '@/components/admin/UpcomingCheckinRow'
import ActivityFeedItem from '@/components/admin/ActivityFeedItem'
import PropertyPerformanceRow from '@/components/admin/PropertyPerformanceRow'
import PropertyPerformanceMobileCard from '@/components/admin/PropertyPerformanceMobileCard'

const OPERATOR_NAME = 'Adaeze'

const greetingFor = (hour: number) =>
    hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening'

const activityFeed: { text: string; time: string; variant: 'positive' | 'neutral' | 'negative' }[] = [
    { text: 'Booking confirmed — Marina Loft', time: '2h ago', variant: 'positive' },
    { text: 'Payment received — ₦285,000', time: '4h ago', variant: 'positive' },
    { text: 'New booking — Sundry House', time: 'Yesterday', variant: 'neutral' },
    { text: 'Check-in completed — Palm & Pine', time: '2 days ago', variant: 'positive' },
    { text: 'Property updated — The Eko Brief', time: '2 days ago', variant: 'neutral' },
    { text: 'Booking cancelled — Six Degrees', time: '3 days ago', variant: 'negative' },
]

export default function AdminDashboardPage() {
    const today = new Date()

    // ---- Derived stats ----
    const revenueThisMonth = adminBookings
        .filter(b => ['confirmed', 'checked-in', 'completed'].includes(b.status))
        .filter(
            b =>
                b.checkIn.getMonth() === today.getMonth() &&
                b.checkIn.getFullYear() === today.getFullYear(),
        )
        .reduce((sum, b) => sum + b.totalAmount, 0)

    const avgOccupancy = Math.round(
        adminProperties.reduce((sum, p) => sum + p.occupancyRate, 0) / adminProperties.length,
    )

    const sevenDaysFromNow = new Date(today.getTime() + 7 * 86400000)
    const upcomingCount = adminBookings.filter(
        b => b.status === 'confirmed' && b.checkIn >= today && b.checkIn <= sevenDaysFromNow,
    ).length

    const activeStays = adminBookings.filter(b => b.status === 'checked-in').length

    // ---- Upcoming list (next 5 by check-in date, confirmed or pending) ----
    const upcomingBookings = [...adminBookings]
        .filter(b => ['confirmed', 'pending'].includes(b.status) && b.checkIn >= today)
        .sort((a, b) => a.checkIn.getTime() - b.checkIn.getTime())
        .slice(0, 5)

    return (
        <div className='max-w-7xl mx-auto'>
            {/* Section 1: Greeting */}
            <section className='pt-4 pb-8'>
                <h1 className='font-heading text-3xl md:text-4xl text-ink-900'>
                    {greetingFor(today.getHours())}, {OPERATOR_NAME}.
                </h1>
                <p className='text-ink-500 mt-2'>{format(today, 'EEEE, d MMMM yyyy')}</p>
            </section>

            {/* Section 2: Stats grid */}
            <section className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
                <StatCard
                    label='Revenue this month'
                    value={`₦${revenueThisMonth.toLocaleString()}`}
                    change={12}
                    icon={FiBarChart2}
                />
                <StatCard
                    label='Occupancy rate'
                    value={`${avgOccupancy}%`}
                    change={8}
                    icon={FiPieChart}
                />
                <StatCard
                    label='Upcoming check-ins'
                    value={String(upcomingCount)}
                    change={25}
                    icon={FiCalendar}
                />
                <StatCard
                    label='Active stays'
                    value={String(activeStays)}
                    change={-5}
                    icon={FiUsers}
                />
            </section>

            {/* Section 3: Upcoming + Activity */}
            <section className='grid grid-cols-12 gap-6 mt-12'>
                {/* Upcoming check-ins (8 cols) */}
                <div className='col-span-12 lg:col-span-8'>
                    <header className='mb-4'>
                        <h2 className='font-heading text-[22px] text-ink-900'>Upcoming check-ins</h2>
                        <p className='text-sm text-ink-500'>Next 7 days</p>
                    </header>
                    <div className='bg-cream-50 border border-cream-300 rounded-xl px-5'>
                        {upcomingBookings.length === 0 ? (
                            <p className='py-12 text-ink-500 text-center text-sm'>
                                No upcoming check-ins.
                            </p>
                        ) : (
                            upcomingBookings.map((b, i) => (
                                <UpcomingCheckinRow
                                    key={b.id}
                                    booking={b}
                                    isLast={i === upcomingBookings.length - 1}
                                />
                            ))
                        )}
                    </div>
                </div>

                {/* Recent activity (4 cols) */}
                <div className='col-span-12 lg:col-span-4'>
                    <header className='mb-4'>
                        <h2 className='font-heading text-[22px] text-ink-900'>Recent activity</h2>
                    </header>
                    <div className='bg-cream-50 border border-cream-300 rounded-xl p-5 space-y-1'>
                        {activityFeed.map((event, i) => (
                            <ActivityFeedItem key={i} {...event} />
                        ))}
                    </div>
                </div>
            </section>

            {/* Section 4: Properties at a glance */}
            <section className='mt-12 mb-12'>
                <header className='mb-4'>
                    <h2 className='font-heading text-[22px] text-ink-900'>Properties at a glance</h2>
                    <p className='text-sm text-ink-500'>This month's performance</p>
                </header>
                {/* Mobile: cards */}
                <div className='md:hidden space-y-3'>
                    {adminProperties.map(p => (
                        <PropertyPerformanceMobileCard key={p.id} property={p} />
                    ))}
                </div>
                {/* Desktop: table */}
                <div className='max-md:hidden bg-cream-50 border border-cream-300 rounded-xl overflow-hidden'>
                    <div className='overflow-x-auto'>
                        <table className='w-full text-sm'>
                            <thead>
                                <tr className='bg-cream-100 border-b border-cream-300'>
                                    <th className='text-left py-3 px-2 md:px-4 text-[11px] uppercase tracking-[0.12em] text-ink-700 font-medium'>
                                        Property
                                    </th>
                                    <th className='max-md:hidden text-left py-3 px-4 text-[11px] uppercase tracking-[0.12em] text-ink-700 font-medium'>
                                        Bookings
                                    </th>
                                    <th className='text-left py-3 px-2 md:px-4 text-[11px] uppercase tracking-[0.12em] text-ink-700 font-medium'>
                                        Revenue
                                    </th>
                                    <th className='max-md:hidden text-left py-3 px-4 text-[11px] uppercase tracking-[0.12em] text-ink-700 font-medium'>
                                        Occupancy
                                    </th>
                                    <th className='text-left py-3 px-2 md:px-4 text-[11px] uppercase tracking-[0.12em] text-ink-700 font-medium'>
                                        Status
                                    </th>
                                    <th className='py-3 px-2 md:px-4'>
                                        <span className='sr-only'>Actions</span>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {adminProperties.map(p => (
                                    <PropertyPerformanceRow key={p.id} property={p} />
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>
        </div>
    )
}
