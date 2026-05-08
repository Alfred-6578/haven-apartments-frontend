'use client'
import React from 'react'
import Image from 'next/image'
import { StandardsCardProps } from '@/types/standards'


const StandardsCard = ({tag, title, description, image, isActive, onHover, onLeave, visible = true, index = 0}: StandardsCardProps) => {
  return (
    <div
        className={`relative rounded-xl overflow-hidden cursor-pointer transition-all duration-300 flex-1 ease-in-out h-[400px] vsm:h-[450px] sm:h-[500px]
            ${isActive ? 'flex-[2.5]':'flex-[1]'} ${visible ? '' : 'opacity-0'}
        `}
        style={{
            animation: visible
                ? `fade-in-up 0.7s cubic-bezier(0.22, 0.61, 0.36, 1) ${700 + index * 80}ms backwards`
                : undefined,
        }}
        onMouseEnter={onHover}
        onMouseLeave={onLeave}
    >
        <Image 
            src={require(`@/assets/images/${image}`)}
            alt={title}
            fill
            sizes="(max-width: 640px) 100vw, 33vw"
            className='object-cover transition-transform duration-500'
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-900 via-ink-900/60 to-transparent" />
        
        <div className={`absolute inset-0 left-3 -top-1 h-full flex items-end p-4 transition-opacity duration-400 ${isActive ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
            <div className="rotate-180 [writing-mode:vertical-rl]">
                <p className="text-xs text-cream-300/70 mb-1">{tag}</p>
                <h3 className="text-lg text-cream-300 font-semibold leading-tight">{title}</h3>
            </div>
        </div>
        <div className={`absolute inset-0 left-3 -top-1 h-full flex items-end px-2 py-4 vsm:px-3 vsm:py-6 md:px-2 lg:px-4 md:py-4 lg:py-7  transition-opacity duration-400 ${!isActive ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
            <div className="">
                <p className="text-xs text-cream-300/70 mb-1">{tag}</p>
                <h3 className="text-lg text-cream-300 font-semibold leading-tight">{title}</h3>
                <p className="text-sm text-cream-300/90 mt-2 max-w-md">{description}</p>
            </div>
        </div>
    </div>
  )
}

export default StandardsCard