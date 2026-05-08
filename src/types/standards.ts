export interface StandardsCardProps {
  tag: string
  title: string
  description: string
  image: string
  isActive?: boolean
  onHover?: () => void
  onLeave?: () => void
  visible?: boolean
  index?: number
}