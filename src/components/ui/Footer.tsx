'use client'
import Link from 'next/link'
import { FaInstagram, FaWhatsapp } from 'react-icons/fa'
import { RiTwitterXLine } from 'react-icons/ri'
import { IoMailOutline } from 'react-icons/io5'
import { FiArrowRight } from 'react-icons/fi'
import { useInView } from '@/hooks/useInView'

const stayLinks = [
    { label: 'All stays', href: '/stays' },
    { label: 'Lekki', href: '/stays?area=lekki' },
    { label: 'Victoria Island', href: '/stays?area=victoria-island' },
    { label: 'Ikoyi', href: '/stays?area=ikoyi' },
    { label: 'Banana Island', href: '/stays?area=banana-island' },
]

const companyLinks = [
    { label: 'About', href: '/about' },
    { label: 'Standards', href: '/#standards' },
    { label: 'Press', href: '/press' },
    { label: 'Careers', href: '/careers' },
]

const supportLinks = [
    { label: 'Contact', href: '/contact' },
    { label: 'Help center', href: '/help' },
    { label: 'FAQ', href: '/faq' },
    { label: 'Host a home', href: '/host' },
]

const Footer = () => {
    const { ref, visible } = useInView<HTMLElement>()

    const columnAnim = (i: number) => ({
        className: visible ? '' : 'opacity-0',
        style: {
            animation: visible
                ? `fade-in-up 0.5s cubic-bezier(0.22, 0.61, 0.36, 1) ${300 + i * 80}ms backwards`
                : undefined,
        },
    })

    return (
        <footer ref={ref} className='bg-ink-900 text-cream-100'>
            {/* Brand + Newsletter */}
            <div className='px-5 tny:px-6 sm:px-8 lg:px-12 pt-16 pb-12 grid lg:grid-cols-[1fr_1.2fr] gap-10 lg:gap-16 items-start border-b border-cream-100/10'>
                <div className={visible ? 'footer-brand-reveal' : 'opacity-0'}>
                    <h3 className='font-heading text-2xl text-cream-50'>Haven Homes</h3>
                    <p className='text-cream-200/60 mt-3 max-w-sm text-sm leading-relaxed'>
                        Hand-picked homes. Quietly chosen, warmly kept.
                    </p>
                </div>

                <div className={visible ? 'footer-newsletter-reveal' : 'opacity-0'}>
                    <span className='text-xs uppercase tracking-[0.15em] text-cream-200/50'>Stay in the loop</span>
                    <p className='text-cream-100/80 mt-2 mb-4 text-sm leading-relaxed max-w-md'>
                        New homes, quiet weekends, the occasional discount.
                    </p>
                    <form className='flex max-sm:flex-col gap-3 max-w-lg'>
                        <input
                            type='email'
                            required
                            placeholder='you@example.com'
                            className='flex-1 min-w-0 bg-transparent border border-cream-100/20 rounded-full px-5 py-3 text-cream-50 placeholder:text-cream-200/40 focus:outline-none focus:border-emerald-500/80 transition-colors'
                        />
                        <button
                            type='submit'
                            className='group bg-emerald-700 hover:bg-emerald-900 transition-colors text-cream-50 font-medium px-6 py-3 rounded-full inline-flex items-center justify-center gap-2 whitespace-nowrap'
                        >
                            Subscribe
                            <FiArrowRight className='transition-transform group-hover:translate-x-0.5' />
                        </button>
                    </form>
                </div>
            </div>

            {/* Link columns */}
            <div className='px-5 tny:px-6 sm:px-8 lg:px-12 py-14 grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-12 border-b border-cream-100/10'>
                <div {...columnAnim(0)}>
                    <h4 className='text-xs uppercase tracking-[0.15em] text-cream-200/50 mb-5'>Stays</h4>
                    <ul className='space-y-3'>
                        {stayLinks.map((link) => (
                            <li key={link.href}>
                                <Link href={link.href} className='text-cream-100/80 hover:text-emerald-200 transition-colors'>
                                    {link.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                <div {...columnAnim(1)}>
                    <h4 className='text-xs uppercase tracking-[0.15em] text-cream-200/50 mb-5'>Company</h4>
                    <ul className='space-y-3'>
                        {companyLinks.map((link) => (
                            <li key={link.href}>
                                <Link href={link.href} className='text-cream-100/80 hover:text-emerald-200 transition-colors'>
                                    {link.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                <div {...columnAnim(2)}>
                    <h4 className='text-xs uppercase tracking-[0.15em] text-cream-200/50 mb-5'>Support</h4>
                    <ul className='space-y-3'>
                        {supportLinks.map((link) => (
                            <li key={link.href}>
                                <Link href={link.href} className='text-cream-100/80 hover:text-emerald-200 transition-colors'>
                                    {link.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                <div {...columnAnim(3)}>
                    <h4 className='text-xs uppercase tracking-[0.15em] text-cream-200/50 mb-5'>Connect</h4>
                    <ul className='space-y-3'>
                        <li>
                            <a
                                href='https://wa.me/2348000000000'
                                target='_blank'
                                rel='noreferrer'
                                className='inline-flex items-center gap-2.5 text-cream-100/80 hover:text-emerald-200 transition-colors'
                            >
                                <FaWhatsapp /> WhatsApp
                            </a>
                        </li>
                        <li>
                            <a
                                href='https://instagram.com/havenhomes'
                                target='_blank'
                                rel='noreferrer'
                                className='inline-flex items-center gap-2.5 text-cream-100/80 hover:text-emerald-200 transition-colors'
                            >
                                <FaInstagram /> Instagram
                            </a>
                        </li>
                        <li>
                            <a
                                href='https://x.com/havenhomes'
                                target='_blank'
                                rel='noreferrer'
                                className='inline-flex items-center gap-2.5 text-cream-100/80 hover:text-emerald-200 transition-colors'
                            >
                                <RiTwitterXLine /> Twitter / X
                            </a>
                        </li>
                        <li className=''>
                            <a
                                href='mailto:hello@havenhomes.ng'
                                className='inline-flex items-center gap-2.5 text-cream-100/80 hover:text-emerald-200 transition-colors'
                            >
                                <IoMailOutline /> 
                                <p className='break-all'>hello@havenhomes.ng</p>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>

            {/* Bottom strip */}
            <div className={`px-5 tny:px-6 sm:px-8 lg:px-12 py-6 flex max-md:flex-col max-md:gap-4 justify-between items-center text-sm text-cream-200/50 ${visible ? 'footer-legal-reveal' : 'opacity-0'}`}>
                <p>© {new Date().getFullYear()} Haven Homes — Made in Nigeria.</p>
                <div className='flex gap-6'>
                    <Link href='/privacy' className='hover:text-cream-100 transition-colors'>Privacy</Link>
                    <Link href='/terms' className='hover:text-cream-100 transition-colors'>Terms</Link>
                    <Link href='/cookies' className='hover:text-cream-100 transition-colors'>Cookies</Link>
                </div>
            </div>
        </footer>
    )
}

export default Footer
