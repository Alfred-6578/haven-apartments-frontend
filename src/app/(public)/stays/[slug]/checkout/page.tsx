'use client'
import React, { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { useParams, useRouter, useSearchParams } from 'next/navigation'
import { FiArrowRight } from 'react-icons/fi'
import { properties } from '@/data/properties'
import type { ProductCardProps } from '@/types/properties'
import TripSummary from '@/components/public/stays/checkout/TripSummary'
import GuestForm from '@/components/public/stays/checkout/GuestForm'
import PaymentSection from '@/components/public/stays/checkout/PaymentSection'
import CheckoutSummary from '@/components/public/stays/checkout/CheckoutSummary'
import MobileCheckoutBar from '@/components/public/stays/checkout/MobileCheckoutBar'

const CheckoutPage = () => {
    const params = useParams()
    const searchParams = useSearchParams()
    const router = useRouter()
    const slug = typeof params?.slug === 'string' ? params.slug : ''

    const [stay, setStay] = useState<ProductCardProps | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const foundStay = properties.find(p => p.slug === slug)
        setStay(foundStay ?? null)
        setLoading(false)
    }, [slug])

    const arrivalDate = useMemo(() => {
        const a = searchParams.get('arrival')
        return a ? new Date(a) : undefined
    }, [searchParams])
    const departureDate = useMemo(() => {
        const d = searchParams.get('departure')
        return d ? new Date(d) : undefined
    }, [searchParams])
    const guestCount = useMemo(() => {
        const g = searchParams.get('guests')
        return g ? parseInt(g) : undefined
    }, [searchParams])

    const handleReserve = () => {
        if (!stay) return
        const ref = `HVN-${Date.now().toString(36).toUpperCase()}`
        const params = new URLSearchParams()
        params.set('stay', stay.slug)
        if (arrivalDate) params.set('arrival', arrivalDate.toISOString().split('T')[0])
        if (departureDate) params.set('departure', departureDate.toISOString().split('T')[0])
        if (guestCount) params.set('guests', String(guestCount))
        router.push(`/bookings/${ref}?${params.toString()}`)
    }

    if (loading) {
        return (
            <div className='min-h-[60vh] flex items-center justify-center'>
                <p className='text-ink-400 text-sm tracking-wider uppercase'>Loading…</p>
            </div>
        )
    }

    if (!stay) {
        return (
            <div className='px-5 tny:px-6 sm:px-8 lg:px-12 pt-40 pb-32 text-center min-h-[70vh]'>
                <span className='block text-xs uppercase tracking-[0.2em] text-ink-500 mb-4'>404</span>
                <h1 className='font-heading text-4xl md:text-5xl text-ink-900 mb-6 leading-tight'>
                    We couldn't find that <em className='italic'>home.</em>
                </h1>
                <Link
                    href='/stays'
                    className='inline-flex items-center gap-2 bg-ink-900 hover:bg-emerald-700 text-cream-50 px-6 py-3 rounded-full transition-colors font-medium'
                >
                    Browse all stays <FiArrowRight />
                </Link>
            </div>
        )
    }

    return (
        <div className='pt-24 md:pt-28 pb-32 lg:pb-20 px-5 tny:px-6 sm:px-8 lg:px-12 max-w-7xl mx-auto'>
            <nav className='stay-breadcrumb-reveal flex gap-2 mb-5 text-sm'>
                <Link className='text-ink-400 hover:text-ink-800 transition-colors' href='/'>
                    Home
                </Link>
                <span className='text-ink-300'>›</span>
                <Link className='text-ink-400 hover:text-ink-800 transition-colors' href='/stays'>
                    Stays
                </Link>
                <span className='text-ink-300'>›</span>
                <Link
                    className='text-ink-400 hover:text-ink-800 transition-colors truncate'
                    href={`/stays/${stay.slug}`}
                >
                    {stay.name}
                </Link>
                <span className='text-ink-300'>›</span>
                <span className='text-ink-900 font-medium'>Checkout</span>
            </nav>

            <h1 className='stay-title-reveal font-heading text-3xl xsm:text-4xl md:text-5xl text-ink-900 font-semibold leading-[1.05] mb-10'>
                Confirm and <em className='italic'>pay.</em>
            </h1>

            <div className='grid lg:grid-cols-[1.55fr_1fr] gap-10 lg:gap-16'>
                <form
                    id='checkout-form'
                    onSubmit={(e) => {
                        e.preventDefault()
                        handleReserve()
                    }}
                    noValidate={false}
                    className='stay-facts-reveal'
                >
                    <TripSummary
                        stay={stay}
                        arrivalDate={arrivalDate}
                        departureDate={departureDate}
                        guestCount={guestCount}
                    />
                    <GuestForm />
                    <PaymentSection />
                </form>

                <div className='stay-booking-card-reveal'>
                    <CheckoutSummary
                        stay={stay}
                        arrivalDate={arrivalDate}
                        departureDate={departureDate}
                        guestCount={guestCount}
                    />
                </div>
            </div>

            <MobileCheckoutBar
                stay={stay}
                arrivalDate={arrivalDate}
                departureDate={departureDate}
            />
        </div>
    )
}

export default CheckoutPage
