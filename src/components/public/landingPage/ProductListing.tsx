'use client'
import ProductCard from '@/components/ui/ProductCard'
import { properties } from '@/data/properties'
import Link from 'next/link'
import React from 'react'
import { FiArrowRight } from 'react-icons/fi'
import { useInView } from '@/hooks/useInView'

const ProductListing = () => {
  const { ref, visible } = useInView<HTMLDivElement>()

  return (
    <div ref={ref} className='px-5 tny:px-6 sm:px-8 lg:px-12 py-26'>
        <div className="flex max-md:flex-col justify-between  md:items-center mb-8 md:mb-16 gap-6">
            <div className="">
                <span className={`block text-ink-500 text-sm ${visible ? 'product-eyebrow-reveal' : 'opacity-0'}`}>WHERE TO STAY</span>
                <h2 className={`mb-3 mt-1 text-4xl sm:text-5xl  font-heading text-ink-900 ${visible ? 'product-headline-reveal' : 'opacity-0'}`}>Lagos, hand-picked.</h2>
                <p className={`max-w-md ${visible ? 'product-body-reveal' : 'opacity-0'}`}>Twenty-six stays across the city's quieter corners. Each one chosen because we'd book it ourselves.</p>
            </div>
            <div className={`md:text-center ${visible ? 'product-cta-reveal' : 'opacity-0'}`}>
                <Link
                    href="/stays"
                    className="inline-flex items-center gap-2 text-ink-700 hover:text-emerald-700 transition-colors group"
                >
                    <span className="text-sm font-medium">Browse all stays</span>
                    <FiArrowRight className="transition-transform group-hover:translate-x-1" />
                </Link>
            </div>
        </div>
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
                        visible={visible}
                        index={index}
                        key={index}
                    />
                ))
            }
        </div>
    </div>
  )
}

export default ProductListing