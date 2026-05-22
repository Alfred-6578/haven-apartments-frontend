'use client'
import React from 'react'
import { IoMailOutline, IoChatbubbleEllipsesOutline, IoKeyOutline } from 'react-icons/io5'

const steps = [
    {
        icon: IoMailOutline,
        title: 'Check your email',
        body: "Booking details, host's WhatsApp number, and the exact address are on their way.",
    },
    {
        icon: IoChatbubbleEllipsesOutline,
        title: 'Hear from your host',
        body: 'The day before check-in your host will message you with walking directions and parking notes.',
    },
    {
        icon: IoKeyOutline,
        title: 'Let yourself in',
        body: 'Keypad code arrives on the morning of check-in. No keys to swap, no waiting around.',
    },
]

const WhatsNext = () => {
    return (
        <section className='booking-next-reveal mt-12 md:mt-14'>
            <h2 className='font-heading text-2xl md:text-3xl text-ink-900 mb-8 text-center'>What happens next</h2>
            <ol className='grid md:grid-cols-3 gap-6 md:gap-8'>
                {steps.map((step, i) => {
                    const Icon = step.icon
                    return (
                        <li key={step.title} className='text-center md:text-left'>
                            <div className='inline-flex items-center justify-center w-11 h-11 rounded-full bg-cream-100 text-ink-800 mb-4'>
                                <Icon size={20} />
                            </div>
                            <p className='text-[10px] uppercase tracking-[0.15em] text-ink-400 font-medium mb-1.5 tabular-nums'>
                                Step 0{i + 1}
                            </p>
                            <h3 className='font-heading text-lg text-ink-900 mb-2 leading-tight'>{step.title}</h3>
                            <p className='text-ink-700 text-sm leading-relaxed'>{step.body}</p>
                        </li>
                    )
                })}
            </ol>
        </section>
    )
}

export default WhatsNext
