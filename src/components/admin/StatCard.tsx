import React from 'react'
import type { IconType } from 'react-icons'
import { FiTrendingDown, FiTrendingUp } from 'react-icons/fi'

interface Props {
    label: string
    value: string
    change: number
    icon: IconType
}

const StatCard = ({ label, value, change, icon: Icon }: Props) => {
    const positive = change >= 0
    return (
        <div className='bg-cream-50 border border-cream-300 rounded-xl p-6'>
            <div className='flex items-center justify-between mb-3'>
                <p className='text-[11px] uppercase tracking-[0.12em] text-ink-500 font-medium'>{label}</p>
                <Icon size={16} className='text-ink-500' />
            </div>
            <p className='font-heading text-[36px] font-medium text-ink-900 leading-none mb-3'>{value}</p>
            <div className={`inline-flex items-center gap-1 text-xs ${positive ? 'text-emerald-700' : 'text-error'}`}>
                {positive ? <FiTrendingUp size={14} /> : <FiTrendingDown size={14} />}
                <span>
                    {positive ? '+' : ''}
                    {change}% vs last month
                </span>
            </div>
        </div>
    )
}

export default StatCard
