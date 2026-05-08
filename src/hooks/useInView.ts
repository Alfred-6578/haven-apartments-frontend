import { useEffect, useRef, useState } from 'react'

export function useInView<T extends HTMLElement = HTMLDivElement>(
    options: IntersectionObserverInit = { threshold: 0.15 },
) {
    const ref = useRef<T>(null)
    const [visible, setVisible] = useState(false)

    useEffect(() => {
        const node = ref.current
        if (!node) return
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                setVisible(true)
                observer.disconnect()
            }
        }, options)
        observer.observe(node)
        return () => observer.disconnect()
    }, [])

    return { ref, visible }
}
