import { useEffect, useRef, useState } from 'react'

type RevealDirection = 'up' | 'down' | 'left' | 'right' | 'scale' | 'none'

interface RevealProps {
  children: React.ReactNode
  /** Animation direction when element enters viewport */
  direction?: RevealDirection
  /** Delay in ms before the animation starts */
  delay?: number
  /** Additional CSS classes */
  className?: string
  /** IntersectionObserver threshold (0-1). Lower = triggers sooner */
  threshold?: number
  /** Keep monitoring after initial reveal (useful for sticky elements) */
  once?: boolean
  /** HTML tag to render as (default: div) */
  as?: 'div' | 'section' | 'article' | 'span' | 'header' | 'footer' | 'main' | 'aside' | 'nav'
}

const directionStyles: Record<RevealDirection, string> = {
  up: 'translate-y-10',
  down: '-translate-y-10',
  left: 'translate-x-10',
  right: '-translate-x-10',
  scale: 'scale-95',
  none: '',
}

export default function Reveal({
  children,
  direction = 'up',
  delay = 0,
  className = '',
  threshold = 0.1,
  once = false,
  as: Tag = 'div',
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          if (once) observer.unobserve(el)
        } else if (!once) {
          setIsVisible(false)
        }
      },
      { threshold }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold, once])

  return (
    <Tag
      ref={ref}
      className={`transition-all duration-700 ease-out will-change-transform ${className} ${
        isVisible
          ? 'opacity-100 translate-y-0 translate-x-0 scale-100'
          : `opacity-0 ${directionStyles[direction]}`
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </Tag>
  )
}
