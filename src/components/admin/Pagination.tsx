'use client'
import React from 'react'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'

interface Props {
    currentPage: number
    totalPages: number
    pageSize: number
    totalItems: number
    onPageChange: (page: number) => void
}

const buildPageList = (current: number, total: number): (number | 'ellipsis')[] => {
    if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1)

    const pages: (number | 'ellipsis')[] = [1]
    const start = Math.max(2, current - 1)
    const end = Math.min(total - 1, current + 1)

    if (start > 2) pages.push('ellipsis')
    for (let i = start; i <= end; i++) pages.push(i)
    if (end < total - 1) pages.push('ellipsis')

    pages.push(total)
    return pages
}

const Pagination = ({ currentPage, totalPages, pageSize, totalItems, onPageChange }: Props) => {
    const first = totalItems === 0 ? 0 : (currentPage - 1) * pageSize + 1
    const last = Math.min(currentPage * pageSize, totalItems)
    const pageList = buildPageList(currentPage, totalPages)

    return (
        <div className='flex max-md:flex-col max-md:items-start max-md:gap-4 items-center justify-between'>
            <p className='text-sm text-ink-500'>
                Showing {first}–{last} of {totalItems}
            </p>
            <div className='flex items-center gap-1.5'>
                <button
                    type='button'
                    onClick={() => onPageChange(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className='w-9 h-9 flex items-center justify-center rounded-lg border border-cream-300 text-ink-700 hover:bg-cream-200 transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-transparent'
                    aria-label='Previous page'
                    title='Previous page'
                >
                    <FiChevronLeft size={16} />
                </button>

                {pageList.map((p, i) =>
                    p === 'ellipsis' ? (
                        <span key={`e-${i}`} className='w-9 h-9 flex items-center justify-center text-ink-500'>
                            …
                        </span>
                    ) : (
                        <button
                            key={p}
                            type='button'
                            onClick={() => onPageChange(p)}
                            className={`w-9 h-9 flex items-center justify-center rounded-lg text-sm border transition-colors cursor-pointer ${
                                p === currentPage
                                    ? 'bg-ink-900 text-cream-50 border-ink-900'
                                    : 'border-cream-300 text-ink-700 hover:bg-cream-200'
                            }`}
                            aria-current={p === currentPage ? 'page' : undefined}
                        >
                            {p}
                        </button>
                    ),
                )}

                <button
                    type='button'
                    onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
                    disabled={currentPage === totalPages || totalPages === 0}
                    className='w-9 h-9 flex items-center justify-center rounded-lg border border-cream-300 text-ink-700 hover:bg-cream-200 transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-transparent'
                    aria-label='Next page'
                    title='Next page'
                >
                    <FiChevronRight size={16} />
                </button>
            </div>
        </div>
    )
}

export default Pagination
