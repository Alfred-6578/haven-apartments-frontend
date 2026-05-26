import { useCallback, useEffect, useState } from 'react'

export function useInView<T extends HTMLElement = HTMLDivElement>(
    options: IntersectionObserverInit = { threshold: 0.15 },
) {
    const [node, setNode] = useState<T | null>(null)
    const [visible, setVisible] = useState(false)

    const ref = useCallback((n: T | null) => setNode(n), [])

    useEffect(() => {
        if (!node) return
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                setVisible(true)
                observer.disconnect()
            }
        }, options)
        observer.observe(node)
        return () => observer.disconnect()
    }, [node])

    return { ref, visible }
}
