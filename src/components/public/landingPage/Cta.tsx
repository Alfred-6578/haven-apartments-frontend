'use client'
import Link from 'next/link'
import { FiArrowRight } from 'react-icons/fi'
import { useInView } from '@/hooks/useInView'

const Cta = () => {
    const { ref, visible } = useInView<HTMLElement>()

    return (
        <section ref={ref} className='px-5 tny:px-6 sm:px-8 lg:px-12 py-24 md:py-32 bg-cream-200 text-center'>
            <span className={`block text-xs uppercase tracking-[0.2em] text-ink-500 ${visible ? 'cta-eyebrow-reveal' : 'opacity-0'}`}>
                Ready when you are
            </span>
            <h2 className={`font-heading text-4xl sm:text-5xl md:text-6xl text-ink-900 mt-4 mb-6 leading-[1.05] max-w-3xl mx-auto ${visible ? 'cta-headline-reveal' : 'opacity-0'}`}>
                Find a <em className='italic'>quieter</em> stay.
            </h2>
            <p className={`text-ink-700 text-lg leading-relaxed max-w-xl mx-auto mb-10 ${visible ? 'cta-body-reveal' : 'opacity-0'}`}>
                Hand-picked homes across the city. Booked tonight, ready tonight.
            </p>
            <Link
                href='/stays'
                className={`group inline-flex items-center gap-2 bg-emerald-700 hover:bg-emerald-900 text-cream-50 font-medium px-8 py-4 rounded-full transition-colors ${visible ? 'cta-button-reveal' : 'opacity-0'}`}
            >
                Find your stay
                <FiArrowRight className='transition-transform group-hover:translate-x-1' />
            </Link>
        </section>
    )
}

export default Cta
