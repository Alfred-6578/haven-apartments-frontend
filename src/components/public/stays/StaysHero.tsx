'use client'
import React, { useRef, useState } from 'react'
import Image from 'next/image'
import { FiSearch } from 'react-icons/fi'
import GuestPicker from '@/components/ui/GuestPicker'
import { GoChevronDown } from 'react-icons/go'
import HeroDatePicker from '@/components/ui/HeroDatePicker'
import { useClickOutside } from '@/hooks/useClickOutside'
import { format } from 'date-fns';
import { IoClose } from 'react-icons/io5'


export interface StaysHeroProps {
    arrivalDate: Date | undefined
    setArrivalDate: React.Dispatch<React.SetStateAction<Date | undefined>>
    departureDate: Date | undefined
    setDepartureDate: React.Dispatch<React.SetStateAction<Date | undefined>>
    guestCount: number | undefined
    setGuestCount: React.Dispatch<React.SetStateAction<number | undefined>>
}


const StaysHero = ({arrivalDate, setArrivalDate, departureDate, setDepartureDate, guestCount, setGuestCount}:StaysHeroProps) => {
    const [searchOpen, setSearchOpen] = useState(false);
    const [arrivalPickerOpen, setArrivalPickerOpen] = useState(false)
    const [departurePickerOpen, setDeparturePickerOpen] = useState(false)
    const [guestCountOpen, setGuestCountOpen] = useState(false)
    const [sheetActive, setSheetActive] = useState<'arrival' | 'departure' | 'guests' | null>(null)
    const arrivalRef = useRef<HTMLDivElement>(null)
    const departureRef = useRef<HTMLDivElement>(null)
    const guestRef = useRef<HTMLDivElement>(null)

    useClickOutside(arrivalRef, () => setArrivalPickerOpen(false), arrivalPickerOpen)
    useClickOutside(departureRef, () => setDeparturePickerOpen(false), departurePickerOpen)
    useClickOutside(guestRef, () => setGuestCountOpen(false), guestCountOpen)

    const handleArrivalSelect = (date: Date | undefined) => {
        setArrivalDate?.(date)
        if (date && departureDate && date >= departureDate) {
            setDepartureDate?.(undefined)
        }
    }


  return (
    <section className='relative w-full h-[62vh]'>
        <div className="absolute inset-0 overflow-hidden">
            <div className="absolute inset-0">
                <Image
                    src={require('@/assets/images/stays-hero-bg-.jpeg')}
                    alt='hero-image'
                    fill
                    placeholder='blur'
                    // sizes='95vw'
                    className='object-cover animate-kenburns'
                    style={{ objectPosition: 'center 62%' }}
                    priority
                />
            </div>
         <div className="absolute inset-0 bg-gradient-to-t from-ink-900 via-ink-900/60 to-ink-900/70" />
        </div>
        <div className="relative w-full h-full flex flex-col items-center justify-center px-5 tny:px-6 sm:px-8 lg:px-12">
            <h1 className="hero-headline-reveal font-heading text-[32px] xsm:text-4xl max-tny:leading-10 tny:text-[40px] md:text-5xl text-center font-semibold text-white mt-3">
                Every home, <em className="italic">quietly</em> chosen.
            </h1>
            <p className="hero-subtitle-reveal text-cream-200/70 text-s max-w-3xl text-center mt-4">
                Each one picked because we'd book it ourselves — quiet streets, considered design, hosts who answer when something matters. Filter by neighborhood, choose by capacity, settle in tonight.
            </p>
        </div>

        <div className="absolute w-full flex justify-center px-3 tny:px-6 sm:px-8 lg:px-12">
            <button
                onClick={() => setSearchOpen(true)}
                className="md:hidden flex items-center gap-3 w-full bg-cream-50 rounded-full pl-4.5 pr-2 py-2 -mt-8 text-left shadow-lg active:scale-[0.99] transition hero-cta-reveal"
            >
                <div className="flex-1 min-w-0">
                    <p className="text-ink-900 text-[15px] tny:text-md font-medium leading-tight">Find your stay</p>
                    <p className="text-xs tny:text-sm text-ink-400 truncate">Anywhere · Any dates · Add guests</p>
                </div>
                <span className="flex items-center justify-center w-11 h-11 rounded-full bg-emerald-700 text-cream-100 shrink-0">
                    <FiSearch size={18} />
                </span>
            </button>
            <div className="hidden md:flex justify-between w-full max-w-330 shadow-lg bg-cream-50 rounded-full px-2.5 lg:px-4 py-2 -mt-8 hero-cta-reveal">
                <div className="grid grid-cols-3 w-[calc(100%-150px)]">
                    <div
                        ref={arrivalRef}
                        className=" py-2 px-4 lg:px-6 w-auto relative"
                    >
                        <div
                            onClick={()=> setArrivalPickerOpen(!arrivalPickerOpen)}
                            className="flex items-center h-full"
                        >
                            <span 
                                className='border-none outline-none w-full min-w-0 text-ink-800'>
                                <p className={`${arrivalDate ? 'text-sm' : 'text-md'} transition-all duration-300 text-ink-400`}>Arrival</p> 
                                {arrivalDate && <p className="text-sm lg:text-md">{format(arrivalDate, 'MMM dd, yyyy')}</p>}
                            </span>
                            <GoChevronDown size={24} />
                        </div>

                        {arrivalPickerOpen && (
                            <HeroDatePicker selected={arrivalDate} type='arrival' onSelect={handleArrivalSelect} />
                            
                        )}
                    </div>
                    <div
                        ref={departureRef}
                        className="border-x-1 border-ink-300 py-2 px-4 lg:px-6 relative"
                    >
                        <div
                            onClick={() => {
                                if (!arrivalDate) {
                                    setArrivalPickerOpen(true)
                                    return
                                }
                                setDeparturePickerOpen(prev => !prev)
                            }}
                            className="flex items-center h-full"
                        >
                            <span
                                className='border-none outline-none w-full min-w-0 text-ink-800'>
                                <p className={`${departureDate ? 'text-sm' : 'text-md'} transition-all duration-300 text-ink-400`}>Departure</p>
                                {departureDate && <p className="text-sm lg:text-md">{format(departureDate, 'MMM dd, yyyy')}</p>}
                            </span>
                            <GoChevronDown size={24} />
                        </div>

                        {departurePickerOpen && (
                            <HeroDatePicker selected={departureDate} type='departure' arrivalDate={arrivalDate} onSelect={(date) => setDepartureDate?.(date)} />
                        )}
                    </div>
                    <div ref={guestRef} className="flex items-center py-2 px-4 lg:px-6 relative">
                        <div
                            onClick={() => { setGuestCountOpen(prev => !prev) }}
                            className="flex items-center w-full h-full"
                        >
                            <span className='border-none outline-none w-full min-w-0 placeholder:text-ink-400 text-ink-800'>
                                <p className={`${guestCount ? 'text-sm' : 'text-md'} transition-all duration-300 text-ink-400`}>Guests</p>
                                <p className="text-sm lg:text-md">{guestCount ? `${guestCount} ${guestCount === 1 ? 'Guest' : 'Guests'}` : ''}</p>
                            </span>
                            <GoChevronDown size={24} />
                        </div>
                        {
                            guestCountOpen && setGuestCount && (
                                <GuestPicker guestCapacity={4} setGuestCount={setGuestCount}/>
                            )
                        }
                    </div>
                </div>
                <div className="flex justify-end shrink-0">
                    <button className='flex gap-3 items-center  bg-emerald-700 text-cream-100 hover:bg-emerald-900 py-1.5 px-5 lg:py-2.5 lg:px-6 rounded-full transition duration-300'>
                        <FiSearch /> Book Now
                    </button>
                </div>
            </div>
        </div>

        {/* Mobile search sheet */}
        {searchOpen && (
            <div className="md:hidden fixed inset-0 z-50">
                <div
                    className="absolute inset-0 bg-ink-900/60 animate-hero-fade-in"
                    onClick={() => setSearchOpen(false)}
                    aria-hidden
                />
                <div
                    role="dialog"
                    aria-modal="true"
                    aria-label="Search stays"
                    className="absolute inset-x-0 bottom-0 bg-cream-50 rounded-t-3xl px-4 pt-3 pb-8 max-h-[92vh] overflow-y-auto animate-slide-up-sheet"
                >
                    <div className="mx-auto h-1.5 w-10 rounded-full bg-cream-300 mb-5" />

                    <div className="flex items-center justify-between mb-5">
                        <h2 className="text-2xl font-heading font-semibold text-ink-900">Search stays</h2>
                        <button
                            onClick={() => setSearchOpen(false)}
                            className="p-2 -mr-2 rounded-full hover:bg-cream-200 transition"
                            aria-label="Close search"
                        >
                            <IoClose size={22} className="text-ink-700" />
                        </button>
                    </div>

                    <div className="space-y-2.5">
                        <div className="bg-cream-100 rounded-2xl overflow-hidden">
                            <button
                                type="button"
                                onClick={() => setSheetActive(prev => prev === 'arrival' ? null : 'arrival')}
                                className="w-full text-left px-5 py-3.5"
                            >
                                <span className="block text-[11px] uppercase tracking-wider text-ink-400 mb-0.5 font-medium">Arrival</span>
                                <span className={`block ${arrivalDate ? 'text-ink-800' : 'text-ink-300'}`}>
                                    {arrivalDate ? format(arrivalDate, 'MMM dd, yyyy') : 'When are you coming?'}
                                </span>
                            </button>
                            {sheetActive === 'arrival' && (
                                <div className="border-t border-cream-300">
                                    <HeroDatePicker
                                        selected={arrivalDate}
                                        type="arrival"
                                        onSelect={(d) => {
                                            handleArrivalSelect(d)
                                            if (d) setSheetActive('departure')
                                        }}
                                        inline
                                    />
                                </div>
                            )}
                        </div>

                        <div className="bg-cream-100 rounded-2xl overflow-hidden">
                            <button
                                type="button"
                                onClick={() => {
                                    if (!arrivalDate) { setSheetActive('arrival'); return }
                                    setSheetActive(prev => prev === 'departure' ? null : 'departure')
                                }}
                                className="w-full text-left px-5 py-3.5"
                            >
                                <span className="block text-[11px] uppercase tracking-wider text-ink-400 mb-0.5 font-medium">Departure</span>
                                <span className={`block ${departureDate ? 'text-ink-800' : 'text-ink-300'}`}>
                                    {departureDate ? format(departureDate, 'MMM dd, yyyy') : 'When are you leaving?'}
                                </span>
                            </button>
                            {sheetActive === 'departure' && (
                                <div className="border-t border-cream-300">
                                    <HeroDatePicker
                                        selected={departureDate}
                                        type="departure"
                                        arrivalDate={arrivalDate}
                                        onSelect={(d) => {
                                            setDepartureDate?.(d)
                                            if (d) setSheetActive('guests')
                                        }}
                                        inline
                                    />
                                </div>
                            )}
                        </div>

                        <div className="bg-cream-100 rounded-2xl overflow-hidden">
                            <button
                                type="button"
                                onClick={() => setSheetActive(prev => prev === 'guests' ? null : 'guests')}
                                className="w-full text-left px-5 py-3.5"
                            >
                                <span className="block text-[11px] uppercase tracking-wider text-ink-400 mb-0.5 font-medium">Guests</span>
                                <span className={`block ${guestCount ? 'text-ink-800' : 'text-ink-300'}`}>
                                    {guestCount ? `${guestCount} ${guestCount === 1 ? 'Guest' : 'Guests'}` : 'How many?'}
                                </span>
                            </button>
                            {sheetActive === 'guests' && (
                                <div className="border-t border-cream-300">
                                    <GuestPicker
                                        guestCapacity={4}
                                        setGuestCount={(n) => {
                                            if (typeof n === 'function') {
                                                setGuestCount?.(n(guestCount))
                                            } else {
                                                setGuestCount?.(n)
                                            }
                                            setSheetActive(null)
                                        }}
                                        inline
                                    />
                                </div>
                            )}
                        </div>
                    </div>

                    <button className="mt-6 w-full flex gap-3 items-center justify-center bg-emerald-700 text-cream-100 hover:bg-emerald-900 py-4 rounded-full transition duration-300 font-medium">
                        <FiSearch size={18} /> Search stays
                    </button>
                </div>
            </div>
        )}
        
    </section>
  )
}

export default StaysHero