'use client'
import React from 'react'
import { useInView } from '@/hooks/useInView'

const principles = [
    {
        title: 'We sleep there first.',
        body: "Every home gets a real overnight before it goes live. We check the shower pressure, the bedside lamp, the wifi at 2am — the things photos can't tell you.",
    },
    {
        title: 'Hosts matter more than headshots.',
        body: 'A great home with a careless host is a bad stay. We meet hosts before we list anything, and we keep a list of who answers at midnight when it matters.',
    },
    {
        title: 'We answer fast.',
        body: 'WhatsApp from 8am to 10pm WAT, every day. Median first reply is under four hours. If your power goes out at 1am, message anyway.',
    },
    {
        title: 'We say no, often.',
        body: 'Around eight in ten places we visit never make the list. Listing fewer homes means we can stand behind the ones that do.',
    },
]

const Principles = () => {
    const { ref, visible } = useInView<HTMLDivElement>()

  return (
    <div ref={ref} className='px-5 tny:px-6 sm:px-8 lg:px-12 py-20 md:py-26 bg-cream-50'>
        <div className='max-w-4xl mx-auto'>
            <div className='mb-12 md:mb-16'>
                <span
                    className={`block text-xs font-medium uppercase tracking-[0.15em] text-ink-500 mb-3 ${visible ? '' : 'opacity-0'}`}
                    style={{
                        animation: visible
                            ? 'fade-in-up 0.6s cubic-bezier(0.22, 0.61, 0.36, 1) 0s backwards'
                            : undefined,
                    }}
                >
                    How we work
                </span>
                <h2
                    className={`font-heading text-4xl md:text-5xl text-ink-900 leading-[1.1] max-w-2xl ${visible ? '' : 'opacity-0'}`}
                    style={{
                        animation: visible
                            ? 'fade-in-up 0.8s cubic-bezier(0.22, 0.61, 0.36, 1) 0.15s backwards'
                            : undefined,
                    }}
                >
                    Four things we won't <em className='italic'>compromise</em> on.
                </h2>
            </div>

            <ol className='space-y-12 md:space-y-16'>
                {principles.map((principle, i) => (
                    <li
                        key={principle.title}
                        className='grid grid-cols-[auto_1fr] gap-6 md:gap-10 items-start'
                    >
                        <span
                            className={`font-heading text-3xl md:text-4xl text-ink-300 tabular-nums ${visible ? '' : 'opacity-0'}`}
                            style={{
                                animation: visible
                                    ? `fade-in-up 0.6s cubic-bezier(0.22, 0.61, 0.36, 1) ${400 + i * 180}ms backwards`
                                    : undefined,
                            }}
                        >
                            0{i + 1}
                        </span>
                        <div>
                            <h3
                                className={`font-heading text-2xl md:text-3xl text-ink-900 mb-3 leading-tight ${visible ? '' : 'opacity-0'}`}
                                style={{
                                    animation: visible
                                        ? `fade-in-up 0.7s cubic-bezier(0.22, 0.61, 0.36, 1) ${450 + i * 180}ms backwards`
                                        : undefined,
                                }}
                            >
                                {principle.title}
                            </h3>
                            <p
                                className={`text-ink-700 text-base md:text-lg leading-relaxed max-w-xl ${visible ? '' : 'opacity-0'}`}
                                style={{
                                    animation: visible
                                        ? `fade-in-up 0.7s cubic-bezier(0.22, 0.61, 0.36, 1) ${550 + i * 180}ms backwards`
                                        : undefined,
                                }}
                            >
                                {principle.body}
                            </p>
                        </div>
                    </li>
                ))}
            </ol>
        </div>
    </div>
  )
}

export default Principles
