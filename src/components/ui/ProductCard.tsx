'use client'
import React from 'react'
import Image from 'next/image'
import { IoLocationOutline, IoPeopleOutline } from 'react-icons/io5';
import { LiaBedSolid } from 'react-icons/lia';
import { MdOutlineBathtub } from 'react-icons/md';
import Link from 'next/link';
import { FiArrowRight } from 'react-icons/fi';

interface ProductCardProps {
    name: string;
    address: string;
    bedrooms: number;
    guestCapacity: number;
    bathrooms: number;
    price: number;
    image: string;
    tag: string;
    visible?: boolean;
    index?: number;
    // Add more properties as needed
}

const ProductCard = ({name,address,bedrooms,guestCapacity,bathrooms,price,image,tag,visible = true,index = 0}:ProductCardProps) => {
  return (
    <div
        className={`rounded-xl bg-cream-50 group shadow-lg p-3 lg:p-4 max-h-300 overflow-hidden cursor-pointer ${visible ? '' : 'opacity-0'}`}
        style={{
            animation: visible
                ? `fade-in-up 0.7s cubic-bezier(0.22, 0.61, 0.36, 1) ${700 + index * 80}ms backwards`
                : undefined,
        }}
    >
        <div className="w-full aspect-[3/2.5] vsm:aspect-[3/2] sm:aspect-[3/2.5] overflow-hidden rounded-xl">
            <Image className='rounded-xl w-full group-hover:scale-[1.07] transition-transform duration-800 h-full object-cover' src={require(`@/assets/images/properties/${image}`)} alt={name} />
        </div>
        <div className="mt-2">
            <div className="flex justify-between font-bold text-ink-900">
                <h4 className="text-[20px]">{name}</h4>
                
            </div>
            <p className="text-s flex gap-0.5 items-center mb-1"><IoLocationOutline /> {address}</p>
            <div className="flex gap-x-2 xsm:gap-x-4 flex-wrap text-sm font-medium text-ink-900">
                <span className="flex gap-0.5 items-center"><LiaBedSolid size={18} />{bedrooms} {bedrooms > 1 ? 'Bedrooms': 'Bedroom'}</span>
                <span className="flex gap-0.5 items-center"><MdOutlineBathtub size={18} />{bathrooms} {bathrooms > 1 ? 'Bathrooms': 'Bathroom'}</span>
                <span className="flex gap-0.5 items-center"><IoPeopleOutline size={18} />{bedrooms} {guestCapacity > 1 ? 'Guests': 'Guest'}</span>
            </div>
            <div className="flex gap-6 items-center justify-between pt-3 mt-3 border-t border-cream-300">
                <div className="flex items-baseline gap-1">
                    <span className="font-bold text-ink-900 text-lg">₦{price.toLocaleString()}</span>
                    <span className="text-sm text-ink-500">/night</span>
                </div>
                <Link
                    href={`/stays/${name}`}
                    className="group relative w-10 h-10 rounded-full bg-ink-900 hover:bg-emerald-700 flex items-center justify-center text-cream-50 overflow-hidden transition-colors"
                    aria-label={`View ${name}`}
                >
                    <FiArrowRight className="absolute transition-transform duration-300 group-hover:translate-x-10" />
                    <FiArrowRight className="absolute transition-transform duration-300 -translate-x-10 group-hover:translate-x-0" />
                </Link>


            </div>
        </div>
    </div>
  )
}

export default ProductCard