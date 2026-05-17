import ProductCard from '@/components/ui/ProductCard'
import { useInView } from '@/hooks/useInView'
import { ProductCardProps } from '@/types/properties'
import React from 'react'

export interface ProductListingsContainerProps {
    arrivalDate: Date | undefined
    setArrivalDate: React.Dispatch<React.SetStateAction<Date | undefined>>
    departureDate: Date | undefined
    setDepartureDate: React.Dispatch<React.SetStateAction<Date | undefined>>
    guestCount: number | undefined
    setGuestCount: React.Dispatch<React.SetStateAction<number | undefined>>
    properties:ProductCardProps[]
}


const ProductListingsContainer = ({properties, arrivalDate, setArrivalDate, departureDate, setDepartureDate, guestCount, setGuestCount}:ProductListingsContainerProps) => {
  const { ref, visible } = useInView<HTMLDivElement>({ threshold: 0.05 })


  const buildLink = (slug:string)=>{
    const params = new URLSearchParams()
    if (arrivalDate) params.set('arrival', arrivalDate.toISOString().split('T')[0])
    if (departureDate) params.set('departure', departureDate.toISOString().split('T')[0])
    if (guestCount) params.set('guests', guestCount.toString())
    const qs = params.toString() ? `?${params.toString()}` : ''
    return `/stays/${slug}?${qs}`
  }

  return (
    <div className='px-5 tny:px-6 sm:px-8 lg:px-12 py-8'>
        <p className="text-ink-600 text-sm mb-3">
            Showing <span className="font-bold">{properties.length}</span> properties
        </p>
         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xpl:grid-cols-4 gap-8 sm:gap-5 xl:gap-8">
            {
                properties.map((property, index) => (
                    <ProductCard
                        name={property.name}
                        address={property.address}
                        image={property.image}
                        price={property.price}
                        bedrooms={property.bedrooms}
                        guestCapacity={property.guestCapacity}
                        bathrooms={property.bathrooms}
                        tag={property.tag}
                        // visible={visible}
                        index={index}
                        key={index}
                        link={buildLink(property.slug)}
                    />
                ))
            }
        </div>
    </div>
  )
}

export default ProductListingsContainer
