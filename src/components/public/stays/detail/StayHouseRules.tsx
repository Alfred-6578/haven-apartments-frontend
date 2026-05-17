import React from 'react'
import { FaCircleCheck } from 'react-icons/fa6'

const houseRules = [
    'Check-in from 3pm, self check-in via keypad.',
    'Check-out by 11am.',
    'No smoking. No parties or events.',
    'Quiet hours from 10pm to 7am.',
]

const StayHouseRules = () => {
    return (
        <section className='py-10'>
            <h2 className='font-heading text-2xl md:text-3xl text-ink-900 mb-5'>House rules</h2>
            <ul className='space-y-3 text-ink-700'>
                {houseRules.map((rule, i) => (
                    <li key={i} className='flex gap-3'>
                        <FaCircleCheck className='text-emerald-700 mt-1 shrink-0' />
                        <span>{rule}</span>
                    </li>
                ))}
            </ul>
        </section>
    )
}

export default StayHouseRules
