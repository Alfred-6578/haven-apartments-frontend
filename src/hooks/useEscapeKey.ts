'use client'
import { useEffect } from 'react'

export const useEscapeKey = (active: boolean, callback: () => void) => {
    useEffect(() => {
        if (!active) return
        const handler = (e: KeyboardEvent) => {
            if (e.key === 'Escape') callback()
        }
        window.addEventListener('keydown', handler)
        return () => window.removeEventListener('keydown', handler)
    }, [active, callback])
}
