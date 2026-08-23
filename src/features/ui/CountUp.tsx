import { useState, useEffect, useRef } from 'react'

interface CountUpProps {
  value: string
  duration?: number
}

/**
 * Parses a stat-like value string into a numeric target and suffix label.
 * Examples: "25+" → { target: 25, label: "+" }, "50K+" → { target: 50, label: "K+" }
 */
function parseValue(value: string): { target: number; label: string } {
  const match = value.match(/^([\d,]+)(.*)$/)
  if (!match) return { target: 0, label: value }
  const num = Number(match[1].replace(/,/g, ''))
  return { target: Number.isNaN(num) ? 0 : num, label: match[2] }
}

export default function CountUp({ value, duration = 1000 }: CountUpProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [current, setCurrent] = useState(0)
  const [finished, setFinished] = useState(false)
  const ref = useRef<HTMLSpanElement>(null)
  const startTimeRef = useRef<number | null>(null)
  const rafRef = useRef<number | null>(null)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const hasPlayedRef = useRef(false)
  const { target, label } = parseValue(value)

  // Observe the parent block element — replay animation each time it scrolls into view
  useEffect(() => {
    const el = ref.current?.parentElement
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Reset states so animation replays from 0
          setCurrent(0)
          setFinished(false)
          setIsVisible(true)
        } else {
          // Reset when leaving viewport so it can replay on re-entry
          if (timeoutRef.current !== null) {
            clearTimeout(timeoutRef.current)
            timeoutRef.current = null
          }
          setIsVisible(false)
          setCurrent(0)
          setFinished(false)
        }
      },
      { threshold: 0.3 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  // Animate count-up — slower on first play (full duration), faster on replays (half duration)
  useEffect(() => {
    if (!isVisible) return

    const activeDuration = hasPlayedRef.current ? duration / 2 : duration
    startTimeRef.current = null

    const animate = (timestamp: number) => {
      if (startTimeRef.current === null) {
        startTimeRef.current = timestamp
      }

      const elapsed = timestamp - startTimeRef.current
      const progress = Math.min(elapsed / activeDuration, 1)

      // Ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3)
      setCurrent(Math.round(eased * target))

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(animate)
      } else {
        hasPlayedRef.current = true
        // Small delay so the pulse fires just after count-up ends, not on the same frame
        timeoutRef.current = setTimeout(() => setFinished(true), 200)
      }
    }

    rafRef.current = requestAnimationFrame(animate)
    return () => {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current)
      }
      if (timeoutRef.current !== null) {
        clearTimeout(timeoutRef.current)
        timeoutRef.current = null
      }
    }
  }, [isVisible, target, duration])

  return (
    <span ref={ref}>
      <span className={finished ? 'animate-number-pulse inline-block' : 'inline-block'}>
        {isVisible ? current.toLocaleString() : '0'}
      </span>
      {label && (
        <span className={finished ? 'animate-suffix-pulse inline-block' : 'inline-block'}>
          {label}
        </span>
      )}
    </span>
  )
}
