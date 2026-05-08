'use client'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { RiDoubleQuotesL } from 'react-icons/ri'
import { GoArrowLeft, GoArrowRight } from 'react-icons/go'
import { useInView } from '@/hooks/useInView'

const testimonials = [
  {
    name: 'Aitan Mohammed',
    role: 'Product Manager at Y5 Studio',
    avatar: 'https://i.pravatar.cc/150?img=11',
    quote: 'With our dedication and expertise in hospitality, we strive to provide stays that are not just accommodations, but a comforting journey toward relaxation and memorable experiences.',
  },
  {
    name: 'Chioma Okafor',
    role: 'Travel Blogger & Content Creator',
    avatar: 'https://i.pravatar.cc/150?img=5',
    quote: 'StayHaven exceeded every expectation. From the seamless check-in to the impeccable room service, every detail was thoughtfully curated. This is hospitality at its finest.',
  },
  {
    name: 'David Adeyemi',
    role: 'CEO at NovaTech Solutions',
    avatar: 'https://i.pravatar.cc/150?img=12',
    quote: 'I travel frequently for business, and StayHaven has become my go-to. The executive suites are perfect for working remotely, and the concierge team is phenomenal.',
  },
  {
    name: 'Fatima Bello',
    role: 'Interior Designer',
    avatar: 'https://i.pravatar.cc/150?img=9',
    quote: "As a designer, I notice every detail — and StayHaven's interiors are stunning. The blend of modern luxury with warm, welcoming spaces is truly world-class.",
  },
  {
    name: 'James Okonkwo',
    role: 'Frequent Guest & Platinum Member',
    avatar: 'https://i.pravatar.cc/150?img=7',
    quote: "Three years and counting. The loyalty program is genuinely rewarding, and the staff remember your preferences. It feels like coming home every time.",
  },
]



const Testimonial = () => {
    const [active, setActive] = useState(0)
    const { ref, visible } = useInView<HTMLDivElement>()

    useEffect(() => {
        const interval = setInterval(() => {
        setActive(prev => (prev + 1) % testimonials.length)
        }, 6000)
        return () => clearInterval(interval)
    }, [])

  const prev = () => setActive(p => (p - 1 + testimonials.length) % testimonials.length)
  const next = () => setActive(p => (p + 1) % testimonials.length)

  const bgStyle = (i: number) => ({
    animation: visible
        ? `fade-in-up 0.8s cubic-bezier(0.22, 0.61, 0.36, 1) ${i * 40}ms backwards`
        : undefined,
  })

  const current = testimonials[active]
  return (
    <div ref={ref} className='px-5 tny:px-6 sm:px-8 lg:px-12 py-12 md:py-16 relative mb-22'>
        <div className="hidden vsm:grid grid-cols-2 lg:grid-cols-4 gap-4 items-center">
            <div className="grid grid-cols-1 gap-4">
                <div className={`relative rounded-2xl overflow-hidden ${visible ? '' : 'opacity-0'}`} style={bgStyle(0)}>
                    <Image className='rounded-2xl h-42 object-cover' src={require('@/assets/images/properties/interior-cozy-den-01.webp')} alt='image'/>
                </div>
                <div className={`relative rounded-2xl overflow-hidden ${visible ? '' : 'opacity-0'}`} style={bgStyle(1)}>
                    <Image className='rounded-2xl h-42 object-cover' src={require('@/assets/images/properties/interior-eclectic-art-01.jpeg')} alt='image'/>

                </div>
            </div>
            <div className="hidden lg:grid grid-cols-1 gap-4">
                <div className={`relative rounded-2xl overflow-hidden ${visible ? '' : 'opacity-0'}`} style={bgStyle(2)}>
                   <Image className='rounded-2xl h-38 object-cover' src={require('@/assets/images/properties/interior-game-room-01.webp')} alt='image'/>
                </div>
                <div className={`relative rounded-2xl overflow-hidden ${visible ? '' : 'opacity-0'}`} style={bgStyle(3)}>
                    <Image className='rounded-2xl h-38 object-cover' src={require('@/assets/images/properties/interior-lagos-luxe-01.jpeg')} alt='image'/>
                </div>
            </div>
            <div className="hidden lg:grid grid-cols-1 gap-4">
                <div className={`relative rounded-2xl overflow-hidden ${visible ? '' : 'opacity-0'}`} style={bgStyle(4)}>
                   <Image className='rounded-2xl h-38 object-cover' src={require('@/assets/images/properties/interior-marble-grand-01.jpeg')} alt='image'/>
                </div>
                <div className={`relative rounded-2xl overflow-hidden ${visible ? '' : 'opacity-0'}`} style={bgStyle(5)}>
                    <Image className='rounded-2xl h-38 object-cover' src={require('@/assets/images/properties/interior-marble-spacious-01.webp')} alt='image'/>
                </div>
            </div>
            <div className="grid grid-cols-1 gap-4">
                <div className={`relative rounded-2xl overflow-hidden ${visible ? '' : 'opacity-0'}`} style={bgStyle(6)}>
                   <Image className='rounded-2xl h-42 object-cover' src={require('@/assets/images/properties/interior-bright-marble-01.jpeg')} alt='image'/>
                </div>
                <div className={`relative rounded-2xl overflow-hidden ${visible ? '' : 'opacity-0'}`} style={bgStyle(7)}>
                    <Image className='rounded-2xl h-42 object-cover' src={require('@/assets/images/properties/interior-monochrome-luxe-01.jpeg')} alt='image'/>
                </div>
            </div>
        </div>
        <div className="vsm:absolute vsm:inset-0 h-full w-full flex max-vsm:flex-col items-center justify-center">
            <div className="flex flex-col items-center justify-center w-[90vw] max-w-lg aspect-square shadow-2xl bg-cream-50/95 backdrop-blur-sm rounded-full px-8 vsm:px-12 p-8 text-center">
                <div className={`flex items-center gap-1.5 mb-5 ${visible ? 'testimonial-eyebrow-reveal' : 'opacity-0'}`}>
                    <div className='text-xs border-ink-300 border-1 py-1 px-2 rounded-full'>
                        Testimonial
                    </div>
                </div>
                <div className={visible ? 'testimonial-quote-reveal' : 'opacity-0'}>
                    <RiDoubleQuotesL className="text-ink-500 text-2xl mb-2 mx-auto" />
                    <p className="text-sm italic text-ink-900 mb-6">"{current.quote}"</p>

                </div>
                <div className={`flex flex-col items-center justify-center gap-4 ${visible ? 'testimonial-avatar-reveal' : 'opacity-0'}`}>
                    <Image src={current.avatar} alt={current.name} width={45} height={45} className='rounded-full'/>
                    <div>
                        <p className="text-sm font-bold text-ink-900">{current.name}</p>
                        <p className="text-xs text-ink-500">{current.role}</p>
                    </div>
                </div>
                {/* Dots */}
                <div className={`flex gap-1.5 mt-4 ${visible ? 'testimonial-dots-reveal' : 'opacity-0'}`}>
                {testimonials.map((_, i) => (
                    <button
                    key={i}
                    onClick={() => setActive(i)}
                    className={`h-1.5 rounded-full transition-all duration-300 ${i === active ? 'w-5 bg-ink-700' : 'w-1.5 bg-ink-300'}`}
                    />
                ))}
                </div>
                <div className={`hidden vsm:flex justify-center gap-3 mt-6 ${visible ? 'testimonial-buttons-reveal' : 'opacity-0'}`}>
                    <button
                        onClick={prev}
                        className="border border-ink-700 rounded-full p-2.5 hover:bg-ink-700 hover:text-cream-300 transition-colors cursor-pointer"
                    >
                        <GoArrowLeft className="text-current font-black text-lg" />
                    </button>
                    <button
                        onClick={next}
                        className="bg-ink-700 text-cream-300 rounded-full p-2.5 hover:bg-ink-700/80 transition-colors cursor-pointer"
                    >
                        <GoArrowRight className="font-black text-lg" />
                    </button>
                </div>
            </div>
            <div className={`vsm:hidden flex justify-center gap-3 mt-6 ${visible ? 'testimonial-buttons-reveal' : 'opacity-0'}`}>
                <button
                    onClick={prev}
                    className="border border-ink-700 rounded-full p-2.5 hover:bg-ink-700 hover:text-cream-300 transition-colors cursor-pointer"
                >
                    <GoArrowLeft className="text-current font-black text-lg" />
                </button>
                <button
                    onClick={next}
                    className="bg-ink-700 text-cream-300 rounded-full p-2.5 hover:bg-ink-700/80 transition-colors cursor-pointer"
                >
                    <GoArrowRight className="font-black text-lg" />
                </button>
            </div>
        </div>
        
    </div>
  )
}

export default Testimonial