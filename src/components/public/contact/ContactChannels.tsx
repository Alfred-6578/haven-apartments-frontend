'use client'
import React from 'react'
import { FaWhatsapp } from 'react-icons/fa'
import { IoMailOutline, IoLocationOutline } from 'react-icons/io5'
import { FiArrowUpRight } from 'react-icons/fi'
import { useInView } from '@/hooks/useInView'

const channels = [
    {
        icon: FaWhatsapp,
        eyebrow: 'Fastest',
        title: 'WhatsApp',
        body: 'Best for booking questions. 8am–10pm WAT, every day.',
        action: '+234 800 000 0000',
        href: 'https://wa.me/2348000000000',
    },
    {
        icon: IoMailOutline,
        eyebrow: 'For anything longer',
        title: 'Email',
        body: 'We aim to reply within four hours during the day.',
        action: 'hello@havenhomes.ng',
        href: 'mailto:hello@havenhomes.ng',
    },
    {
        icon: IoLocationOutline,
        eyebrow: 'In person',
        title: 'Office',
        body: 'Visit us in Lekki Phase 1 — by appointment only.',
        action: 'Book a visit',
        href: 'mailto:hello@havenhomes.ng?subject=Office%20visit',
    },
]

const ContactChannels = () => {
    const { ref, visible } = useInView<HTMLDivElement>()

  return (
    <div ref={ref} className='px-5 tny:px-6 sm:px-8 lg:px-12 py-20 md:py-24 bg-cream-50'>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6 max-w-6xl mx-auto'>
            {channels.map((channel, i) => {
                const Icon = channel.icon
                return (
                    <a
                        key={channel.title}
                        href={channel.href}
                        target={channel.href.startsWith('http') ? '_blank' : undefined}
                        rel={channel.href.startsWith('http') ? 'noreferrer' : undefined}
                        className={`group relative bg-cream-100 hover:bg-cream-200 border border-cream-300 rounded-2xl p-7 md:p-8 transition-colors ${visible ? '' : 'opacity-0'}`}
                        style={{
                            animation: visible
                                ? `fade-in-up 0.7s cubic-bezier(0.22, 0.61, 0.36, 1) ${i * 120}ms backwards`
                                : undefined,
                        }}
                    >
                        <div className='flex items-start justify-between mb-6'>
                            <div className='w-11 h-11 rounded-full bg-ink-900 text-cream-50 flex items-center justify-center group-hover:bg-emerald-700 transition-colors'>
                                <Icon size={18} />
                            </div>
                            <FiArrowUpRight size={20} className='text-ink-400 group-hover:text-ink-900 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all' />
                        </div>
                        <span className='block text-[11px] uppercase tracking-[0.15em] text-ink-500 mb-2'>
                            {channel.eyebrow}
                        </span>
                        <h3 className='font-heading text-2xl text-ink-900 mb-2'>
                            {channel.title}
                        </h3>
                        <p className='text-ink-700 text-sm leading-relaxed mb-5'>
                            {channel.body}
                        </p>
                        <p className='text-ink-900 font-medium text-sm border-t border-cream-300 pt-4 break-all'>
                            {channel.action}
                        </p>
                    </a>
                )
            })}
        </div>
    </div>
  )
}

export default ContactChannels
