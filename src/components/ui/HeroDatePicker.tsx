'use client'
import { addDays } from 'date-fns'
import React, { Dispatch, useState } from 'react'
import { DateRange, DayPicker } from 'react-day-picker'
import 'react-day-picker/dist/style.css'

const HeroDatePicker = ({
    selected,
    type="arrival",
    arrivalDate,
    onSelect,
    inline = false,
}:{
    selected: Date | undefined,
    type: 'arrival' | 'departure' ,
    arrivalDate?: Date | undefined,
    onSelect: (date: Date | undefined) => void,
    inline?: boolean,
}) => {
    const [range, setRange] = useState<DateRange | undefined>()
    const [open, setOpen] = useState(false)


    const wrapperClass = inline
        ? "flex flex-col items-center p-3"
        : "absolute transition-all duration-300 top-full left-0 bg-cream-50 rounded-lg mt-4 p-3 xsm:p-5 py-6 shadow-2xl z-10"

    return (
        <div className={wrapperClass}>
            <p className='text-[11px] uppercase tracking-[0.18em] text-ink-500 font-medium mb-3 px-1'>
                Pick your {type === 'arrival' ? 'check-in' : 'check-out'}
            </p>
            <DayPicker
                mode='single'
                required={true}
                selected={selected}
                onSelect={onSelect}
                disabled={type === 'arrival' ? {before: new Date()} : {before: arrivalDate ? addDays(arrivalDate, 1) : new Date()}}
                classNames={{
                    // month: 'bg-cream-50',
                    month_caption: 'font-serif text-sm vsm:text-md md:text-xl text-ink-900 mb-4',
                    weekday: 'text-xs text-ink-500 uppercase tracking-wider font-medium',
                    day: 'h-10 w-10 rounded-full text-ink-700 hover:bg-cream-200 transition-colors',
                    today: 'font-semibold text-emerald-700',
                    selected: 'bg-emerald-700 text-cream-100! hover:bg-emerald-700/90',
                    disabled: 'text-ink-300 line-through cursor-not-allowed',
                    button_previous: 'absolute right-8 -top-2.5 md:-top-1 h-11 w-11 rounded-full hover:bg-cream-200 transition-colors flex items-center justify-center cursor-pointer',
                    button_next: 'absolute right-0 -top-2.5 md:-top-1 h-11 w-11 rounded-full hover:bg-cream-200 transition-colors flex items-center justify-center cursor-pointer',
                    
                    // The SVG chevron icon inside each button
                    chevron: 'h-4 w-4 md:h-5 md:w-5 fill-ink-700',
                    
                    // The container that wraps the nav buttons
                    // nav: 'relative h-9',

                    outside: 'text-ink-300',
                }}
            />
        </div>
      
  )
}

export default HeroDatePicker