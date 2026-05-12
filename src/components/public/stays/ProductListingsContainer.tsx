import ProductCard from '@/components/ui/ProductCard'
import { ProductCardProps } from '@/types/properties'
import React from 'react'

const ProductListingsContainer = ({properties}:{properties:ProductCardProps[]}) => {
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
                    />
                ))
            }
        </div>
    </div>
  )
}

export default ProductListingsContainer
