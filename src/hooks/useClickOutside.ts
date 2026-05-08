import { RefObject, useEffect } from 'react'

export function useClickOutside(
    ref: RefObject<HTMLElement | null>,
    onClickOutside: () => void,
    enabled: boolean = true,
) {
    useEffect(() => {
        if (!enabled) return
        const handler = (e: MouseEvent) => {
            if (ref.current && !ref.current.contains(e.target as Node)) {
                onClickOutside()
            }
        }
        document.addEventListener('mousedown', handler)
        return () => document.removeEventListener('mousedown', handler)
    }, [ref, onClickOutside, enabled])
}
