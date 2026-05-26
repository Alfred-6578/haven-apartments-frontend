import { FilterGroup } from '@/types/filters'

export const filters: FilterGroup[] = [
    {
        key: 'neighborhood',
        label: 'Neighborhood',
        options: [
            { label: 'All', value: 'all' },
            { label: 'Lekki', value: 'lekki' },
            { label: 'Victoria Island', value: 'victoria-island' },
            { label: 'Ikoyi', value: 'ikoyi' },
            { label: 'Banana Island', value: 'banana-island' },
            { label: 'Eko Atlantic', value: 'eko-atlantic' },
        ],
    },
    {
        key: 'guests',
        label: 'Guests',
        options: [
            { label: 'Any size', value: 'all' },
            { label: '1–2 guests', value: '1-2' },
            { label: '3–4 guests', value: '3-4' },
            { label: '5+ guests', value: '5+' },
        ],
    },
    {
        key: 'price',
        label: 'Price',
        options: [
            { label: 'Any price', value: 'all' },
            { label: 'Under ₦100k', value: 'under-100k' },
            { label: '₦100k – ₦150k', value: '100k-150k' },
            { label: '₦150k+', value: '150k-plus' },
        ],
    },
    {
        key: 'vibe',
        label: 'Vibe',
        options: [
            { label: 'All', value: 'all' },
            { label: 'New', value: 'new' },
            { label: 'Quiet Stay', value: 'quiet-stay' },
            { label: 'Family', value: 'family' },
            { label: 'Boutique', value: 'boutique' },
            { label: 'Business', value: 'business' },
            { label: 'City View', value: 'city-view' },
        ],
    },
]
