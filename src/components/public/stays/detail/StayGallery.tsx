'use client'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { IoClose } from 'react-icons/io5'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import type { ProductCardProps } from '@/types/properties'
import galleryImg1 from '@/assets/images/properties/interior-bright-marble-01.jpeg'
import galleryImg2 from '@/assets/images/properties/interior-cozy-den-01.webp'
import galleryImg3 from '@/assets/images/properties/interior-marble-grand-01.jpeg'

const galleryThumbs = [galleryImg1, galleryImg2, galleryImg3]
const LIGHTBOX_LENGTH = 4

const StayGallery = ({ stay }: { stay: ProductCardProps }) => {
    const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

    useEffect(() => {
        if (lightboxIndex === null) return
        const handler = (e: KeyboardEvent) => {
            if (e.key === 'Escape') setLightboxIndex(null)
            if (e.key === 'ArrowLeft') setLightboxIndex(i => (i === null ? null : (i - 1 + LIGHTBOX_LENGTH) % LIGHTBOX_LENGTH))
            if (e.key === 'ArrowRight') setLightboxIndex(i => (i === null ? null : (i + 1) % LIGHTBOX_LENGTH))
        }
        window.addEventListener('keydown', handler)
        return () => window.removeEventListener('keydown', handler)
    }, [lightboxIndex])

    useEffect(() => {
        if (lightboxIndex === null) return
        const prev = document.body.style.overflow
        document.body.style.overflow = 'hidden'
        return () => {
            document.body.style.overflow = prev
        }
    }, [lightboxIndex])

    return (
        <>
            <div className='stay-thumbs-reveal grid grid-cols-2 md:grid-cols-3 grid-rows-[2fr_1fr] md:grid-rows-2 gap-2 md:gap-3 h-[420px] md:h-[460px] rounded-2xl overflow-hidden'>
                <button
                    type='button'
                    onClick={() => setLightboxIndex(0)}
                    className='relative col-span-2 row-span-1 md:row-span-2 overflow-hidden group cursor-pointer text-left'
                    aria-label={`Open ${stay.name} gallery`}
                >
                    <Image
                        src={require(`@/assets/images/properties/${stay.image}`)}
                        alt={stay.name}
                        fill
                        sizes='(min-width: 768px) 66vw, 100vw'
                        className='object-cover group-hover:scale-[1.02] transition-transform duration-700'
                        priority
                    />
                    <span className='absolute top-4 left-4 bg-cream-50/95 backdrop-blur text-ink-900 text-xs font-medium px-3 py-1.5 rounded-full'>
                        {stay.tag}
                    </span>
                </button>
                <button
                    type='button'
                    onClick={() => setLightboxIndex(1)}
                    className='relative overflow-hidden group cursor-pointer'
                    aria-label='View interior photo 1'
                >
                    <Image src={galleryThumbs[0]} alt={`${stay.name} interior 1`} fill sizes='(min-width: 768px) 33vw, 50vw' className='object-cover group-hover:scale-[1.02] transition-transform duration-700' />
                </button>
                <button
                    type='button'
                    onClick={() => setLightboxIndex(2)}
                    className='relative overflow-hidden group cursor-pointer'
                    aria-label='View all photos'
                >
                    <Image src={galleryThumbs[1]} alt={`${stay.name} interior 2`} fill sizes='(min-width: 768px) 33vw, 50vw' className='object-cover group-hover:scale-[1.02] transition-transform duration-700' />
                    <div className='absolute inset-0 bg-ink-900/55 flex items-center justify-center text-cream-50 font-medium text-sm group-hover:bg-ink-900/45 transition-colors'>
                        +1 more
                    </div>
                </button>
            </div>

            {lightboxIndex !== null && (
                <div
                    role='dialog'
                    aria-modal='true'
                    aria-label={`${stay.name} gallery`}
                    className='fixed inset-0 z-[100] bg-ink-900/95 backdrop-blur-sm animate-hero-fade-in'
                    onClick={() => setLightboxIndex(null)}
                >
                    <div className='absolute inset-x-0 top-0 z-10 flex items-center justify-between px-5 md:px-8 py-5'>
                        <span className='text-cream-200/80 text-sm font-medium tabular-nums'>
                            {lightboxIndex + 1} <span className='text-cream-200/40'>/</span> {LIGHTBOX_LENGTH}
                        </span>
                        <button
                            type='button'
                            onClick={(e) => {
                                e.stopPropagation()
                                setLightboxIndex(null)
                            }}
                            className='w-11 h-11 rounded-full bg-cream-100/10 hover:bg-cream-100/20 text-cream-50 flex items-center justify-center transition-colors cursor-pointer'
                            aria-label='Close gallery'
                        >
                            <IoClose size={22} />
                        </button>
                    </div>

                    <button
                        type='button'
                        onClick={(e) => {
                            e.stopPropagation()
                            setLightboxIndex(i => (i === null ? null : (i - 1 + LIGHTBOX_LENGTH) % LIGHTBOX_LENGTH))
                        }}
                        className='absolute left-3 md:left-6 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-cream-100/10 hover:bg-cream-100/20 text-cream-50 flex items-center justify-center transition-colors cursor-pointer'
                        aria-label='Previous image'
                    >
                        <FiChevronLeft size={26} />
                    </button>

                    <button
                        type='button'
                        onClick={(e) => {
                            e.stopPropagation()
                            setLightboxIndex(i => (i === null ? null : (i + 1) % LIGHTBOX_LENGTH))
                        }}
                        className='absolute right-3 md:right-6 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-cream-100/10 hover:bg-cream-100/20 text-cream-50 flex items-center justify-center transition-colors cursor-pointer'
                        aria-label='Next image'
                    >
                        <FiChevronRight size={26} />
                    </button>

                    <div className='absolute inset-0 flex items-center justify-center px-16 md:px-24 py-20 md:py-24'>
                        <div
                            key={lightboxIndex}
                            className='relative w-full h-full max-w-6xl'
                            onClick={(e) => e.stopPropagation()}
                            style={{ animation: 'fade-in-up 0.4s cubic-bezier(0.22, 0.61, 0.36, 1) backwards' }}
                        >
                            <Image
                                src={
                                    lightboxIndex === 0
                                        ? require(`@/assets/images/properties/${stay.image}`)
                                        : galleryThumbs[lightboxIndex - 1]
                                }
                                alt={lightboxIndex === 0 ? stay.name : `${stay.name} interior ${lightboxIndex}`}
                                fill
                                sizes='100vw'
                                className='object-contain'
                                priority
                            />
                        </div>
                    </div>

                    <div className='absolute inset-x-0 bottom-6 md:bottom-8 z-10 flex justify-center gap-2'>
                        {Array.from({ length: LIGHTBOX_LENGTH }).map((_, i) => (
                            <button
                                key={i}
                                type='button'
                                onClick={(e) => {
                                    e.stopPropagation()
                                    setLightboxIndex(i)
                                }}
                                className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${i === lightboxIndex ? 'w-7 bg-cream-50' : 'w-1.5 bg-cream-100/35 hover:bg-cream-100/60'}`}
                                aria-label={`Go to image ${i + 1}`}
                            />
                        ))}
                    </div>
                </div>
            )}
        </>
    )
}

export default StayGallery
