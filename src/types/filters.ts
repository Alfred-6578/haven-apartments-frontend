export interface FilterOption {
    label: string
    value: string
}

export interface FilterGroup {
    key: 'neighborhood' | 'guests' | 'price' | 'vibe'
    label: string
    options: FilterOption[]
}
