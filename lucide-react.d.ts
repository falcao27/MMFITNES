declare module 'lucide-react' {
  import type { ForwardRefExoticComponent, RefAttributes, SVGProps } from 'react'

  type LucideIcon = ForwardRefExoticComponent<SVGProps<SVGSVGElement> & RefAttributes<SVGSVGElement>>

  export const ArrowRight: LucideIcon
  export const Check: LucideIcon
  export const ChevronLeft: LucideIcon
  export const ChevronRight: LucideIcon
  export const Heart: LucideIcon
  export const Menu: LucideIcon
  export const MessageCircle: LucideIcon
  export const Minus: LucideIcon
  export const Plus: LucideIcon
  export const Search: LucideIcon
  export const ShoppingBag: LucideIcon
  export const Trash2: LucideIcon
  export const X: LucideIcon
}
