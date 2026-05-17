'use client'
import FilterPills from '@/components/public/stays/FilterPills'
import StaysHero from '@/components/public/stays/StaysHero'
import React, { useState } from 'react'
import { filters } from '@/data/filters'
import ProductListingsContainer from '@/components/public/stays/ProductListingsContainer'
import { properties } from '@/data/properties'

const StaysPage = () => {
    const [activeVibe, setActiveVibe] = useState('All')
    const [activeNeighborhood, setActiveNeighborhood] = useState('All')
    const [activeGuests, setActiveGuests] = useState('Any size')
    const [activePrice, setActivePrice] = useState('Any price')
    const [arrivalDate, setArrivalDate] = useState<Date | undefined>(undefined)
    const [departureDate, setDepartureDate] = useState<Date | undefined>(undefined)
    const [guestCount, setGuestCount] = useState<number | undefined>(undefined)

    const filteredProperties = properties.filter(property => {
        const matchesVibe = activeVibe === 'All' || property.tag === activeVibe
        const matchesNeighborhood = activeNeighborhood === 'All' || property.address.toLowerCase().includes(activeNeighborhood.toLowerCase())
        const matchesGuests = activeGuests === 'Any size' || property.guestCapacity >= parseInt(activeGuests)
        const matchesPrice =
            activePrice === 'Any price' ||
            (activePrice === '$0 - $100' && property.price <= 100) ||
            (activePrice === '$100 - $200' && property.price > 100 && property.price <= 200) ||
            (activePrice === '$200+' && property.price > 200)

        return matchesVibe && matchesNeighborhood && matchesGuests && matchesPrice
    })
  return (
    <div className=''>
        <StaysHero 
            arrivalDate={arrivalDate}
            setArrivalDate={setArrivalDate}
            departureDate={departureDate}
            setDepartureDate={setDepartureDate}
            guestCount={guestCount}
            setGuestCount={setGuestCount}
        />
        <div className="mt-12 md:mt-15">
            <FilterPills 
                filtersList={filters}
                activeVibe={activeVibe}
                setActiveVibe={setActiveVibe}
                activeNeighborhood={activeNeighborhood}
                setActiveNeighborhood={setActiveNeighborhood}
                activeGuests={activeGuests}
                setActiveGuests={setActiveGuests}
                activePrice={activePrice}
                setActivePrice={setActivePrice}

            />
            <ProductListingsContainer 
                properties={filteredProperties}
                arrivalDate={arrivalDate}
                setArrivalDate={setArrivalDate}
                departureDate={departureDate}
                setDepartureDate={setDepartureDate}
                guestCount={guestCount}
                setGuestCount={setGuestCount}
            />
        </div>
    </div>
  )
}

export default StaysPage