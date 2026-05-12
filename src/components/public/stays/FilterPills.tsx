'use client'
import React, { useEffect, useRef, useState } from 'react'
import { HiOutlineAdjustments } from 'react-icons/hi'
import { FilterGroup } from '@/types/filters'
import { IoClose } from 'react-icons/io5'



interface FilterPillsProps {
    filtersList: FilterGroup[],
    activeVibe: string,
    setActiveVibe: (vibe: string) => void
    activeNeighborhood: string,
    setActiveNeighborhood: (neighborhood: string) => void
    activeGuests: string,
    setActiveGuests: (guests: string) => void
    activePrice: string,
    setActivePrice: (price: string) => void
}

const FilterPills = ({filtersList, activeVibe, setActiveVibe, activeNeighborhood, setActiveNeighborhood, activeGuests, setActiveGuests, activePrice, setActivePrice,}: FilterPillsProps) => {
    const [isFilterOpen, setIsFilterOpen] = useState(false)
    const desktopRef = useRef<HTMLDivElement>(null)
    const mobileRef = useRef<HTMLDivElement>(null)
    const filterButtonRef = useRef<HTMLButtonElement>(null)

    const navByKey: Record<string, { variable: string; setter: (v: string) => void }> = {
        neighborhood: { variable: activeNeighborhood, setter: setActiveNeighborhood },
        guests: { variable: activeGuests, setter: setActiveGuests },
        price: { variable: activePrice, setter: setActivePrice },
    }

    const ResetFilter = () => {
        setActiveNeighborhood('All')
        setActiveGuests('Any size')
        setActivePrice('Any price')
        setActiveVibe('All')
        setIsFilterOpen(false)
    }

    useEffect(() => {
        if (!isFilterOpen) return
        const handler = (e: MouseEvent) => {
            const t = e.target as Node
            const insideEither =
                desktopRef.current?.contains(t) ||
                mobileRef.current?.contains(t) ||
                filterButtonRef.current?.contains(t)
            if (!insideEither) setIsFilterOpen(false)
        }
        document.addEventListener('mousedown', handler)
        return () => document.removeEventListener('mousedown', handler)
    }, [isFilterOpen])

  return (
    <div className="relative">
        <div className='flex justify-between gap-1 relative px-3 tny:px-6 sm:px-8 lg:px-12' style={{scrollbarWidth: 'none'}}>
            <div className="flex gap-1.5 md:gap-3 overflow-x-auto text-xs" style={{scrollbarWidth: 'none'}}>
            {
                [ ...filtersList[filtersList.length - 1].options.map(r => r.label)].map((value,i)=>(
                    <button
                        key={i}
                        className={`
                            "flex gap-1 px-2.5 py-0.5 md:py-1 rounded-xl transition-color duration-200 cursor-pointer shrink-0 flex-1"
                            ${activeVibe === value ? 'bg-ink-900 text-cream-100': 'text-ink-600 border border-ink-400/30'}
                        `}
                        onClick={()=> setActiveVibe(value)}
                    >
                        {value}
                    </button>
                ))
            }
            </div>
            <button
                ref={filterButtonRef}
                className="flex gap-1 px-1.5 md:text-sm cursor-pointer xsm:px-2.5 items-center text-xs border-ink-400 rounded-xl text-ink-800 "
                onClick={()=> setIsFilterOpen(prev => !prev)}
           >
                <HiOutlineAdjustments size={14} />
                Filter
            </button>

        </div>
       { isFilterOpen &&
        <div ref={desktopRef} className="animate-fade-in-up absolute hidden md:flex justify-end right-0 sm:px-8 lg:px-12">
            <div className="bg-cream-50 p-5 rounded-xl shadow-xl border border-cream-300">
                {
                    filtersList.map((filter) => {
                        const nav = navByKey[filter.key]
                        return filter.label !== 'Vibe' && nav && (
                            <div className='mb-3' key={filter.key}>
                                    <h4 className='text-sm font-semibold mb-1.5'>{filter.label}</h4>

                                    <div className="flex gap-2 flex-wrap max-w-100">
                                        {
                                            filter.options.map((option, optIdx) => (
                                                <button
                                                    key={optIdx}
                                                    className={`flex gap-1 text-xs px-2.5 py-0.5 md:py-1 rounded-xl transition-colors duration-200 cursor-pointer ${nav.variable === option.label ? 'bg-ink-900 text-cream-100' : 'text-ink-600 border border-ink-400/30'}`}
                                                    onClick={() => {
                                                        nav.setter(option.label)
                                                    }}
                                                >
                                                    {option.label}
                                                </button>
                                            ))
                                        }
                                    </div>
                                </div>
                            )
                        })
                }
                <button onClick={ResetFilter} className="mt-6 w-full flex gap-3 items-center justify-center bg-error/90 text-cream-100 hover:bg-error py-3 rounded-full transition duration-300 font-medium">
                    Reset Filter
                </button>
            </div>

        </div>
        }
        { isFilterOpen && (
            <div className="md:hidden fixed inset-0 z-50">
                <div
                    className="absolute inset-0 bg-ink-900/60 animate-hero-fade-in"
                    aria-hidden
                />
                <div
                    role="dialog"
                    aria-modal="true"
                    aria-label="Filter stays"
                    ref={mobileRef}
                    className="absolute inset-x-0 bottom-0 bg-cream-50 rounded-t-3xl px-4 pt-3 pb-8 max-h-[92vh] overflow-y-auto animate-slide-up-sheet"
                >
                    <div className="mx-auto h-1.5 w-10 rounded-full bg-cream-300 mb-5" />

                    <div className="flex items-center justify-between mb-5">
                        <h2 className="text-2xl font-heading font-semibold text-ink-900">Filter stays</h2>
                        <button
                            onClick={() => setIsFilterOpen(false)}
                            className="p-2 -mr-2 rounded-full hover:bg-cream-200 transition"
                            aria-label="Close search"
                        >
                            <IoClose size={22} className="text-ink-700" />
                        </button>
                    </div>

                    <div className="space-y-2.5">
                        {
                            filtersList.map((filter) => {
                                const nav = navByKey[filter.key]
                                return filter.label !== 'Vibe' && nav && (
                                    <div className='mb-5' key={filter.key}>
                                            <h4 className='font-semibold mb-2.5'>{filter.label}</h4>

                                            <div className="flex gap-2 flex-wrap max-w-100">
                                                {
                                                    filter.options.map((option, optIdx) => (
                                                        <button
                                                            key={optIdx}
                                                            className={`flex gap-1 text-sm px-2.5 py-0.5 md:py-1 rounded-xl transition-colors duration-200 cursor-pointer ${nav.variable === option.label ? 'bg-ink-900 text-cream-100' : 'text-ink-600 border border-ink-400/30'}`}
                                                            onClick={() => {
                                                                nav.setter(option.label)
                                                            }}
                                                        >
                                                            {option.label}
                                                        </button>
                                                    ))
                                                }
                                            </div>
                                        </div>
                                    )
                                })
                        }
                    </div>

                    <button onClick={ResetFilter} className="mt-6 w-full flex gap-3 items-center justify-center bg-error/90 text-cream-100 hover:bg-error py-4 rounded-full transition duration-300 font-medium">
                        Reset Filter
                    </button>
                </div>
            </div>
        )}
    </div>
  )
}

export default FilterPills
