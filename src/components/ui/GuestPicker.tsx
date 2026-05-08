import React, { Dispatch, SetStateAction } from 'react'

const GuestPicker = ({guestCapacity, setGuestCount, inline = false}:{guestCapacity: number, setGuestCount: React.Dispatch<React.SetStateAction<number | undefined>>, inline?: boolean}) => {
  const wrapperClass = inline
    ? 'p-2'
    : 'absolute transition-all duration-300 top-full min-w-60 left-0 bg-cream-50 rounded-lg mt-4 p-3 shadow-2xl z-10 '
  return (
    <div className={wrapperClass}>
        {
            Array.from({length: guestCapacity}, (_, i) => (
                <div key={i} onClick={()=> setGuestCount(i+1)} className="flex items-center gap-3 mb-2 hover:bg-cream-300/50 rounded-lg p-2 cursor-pointer transition-colors">
                    <div className="w-8 h-8 rounded-full bg-emerald-900 text-cream-50 flex items-center justify-center">
                        {i + 1}
                    </div>
                    <p className="text-sm text-ink-900">{i + 1} {i === 0 ? 'Guest' : 'Guests'}</p>
                </div>
            ))
        }
    </div>
  )
}

export default GuestPicker