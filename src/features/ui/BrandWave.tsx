interface BrandWaveProps {
  /** 'white' for dark backgrounds (hero with images), 'violet' for light backgrounds (CTA, stats) */
  variant?: 'violet' | 'white'
}

/**
 * A multi-layered wave SVG decoration that sits at the bottom of sections.
 * - `violet` variant: subtle brand violet (#5552e7) for light-themed sections
 * - `white` variant: subtle white for dark image-backed hero sections
 */
export default function BrandWave({ variant = 'violet' }: BrandWaveProps) {
  const isWhite = variant === 'white'

  const colors = isWhite
    ? {
        deep: 'rgba(255, 255, 255, 0.05)',
        mid: 'rgba(255, 255, 255, 0.03)',
        surface: 'rgba(255, 255, 255, 0.015)',
      }
    : {
        deep: 'rgba(85, 82, 231, 0.07)',
        mid: 'rgba(85, 82, 231, 0.04)',
        surface: 'rgba(85, 82, 231, 0.02)',
      }

  return (
    <div
      aria-hidden="true"
      className="absolute bottom-0 left-0 right-0 w-full pointer-events-none overflow-hidden"
      style={{ height: '191px' }}
    >
      <svg
        viewBox="0 0 1920 191"
        preserveAspectRatio="none"
        className="w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Deep wave */}
        <path
          d="M0,16 C240,80 480,0 720,40 C960,80 1200,0 1440,40 C1680,80 1824,16 1920,24 L1920,191 L0,191 Z"
          fill={colors.deep}
        />
        {/* Mid wave */}
        <path
          d="M0,48 C320,112 640,0 960,48 C1280,96 1600,0 1920,32 L1920,191 L0,191 Z"
          fill={colors.mid}
        />
        {/* Surface wave */}
        <path
          d="M0,80 C400,144 800,16 1200,80 C1600,144 1850,48 1920,64 L1920,191 L0,191 Z"
          fill={colors.surface}
        />
      </svg>
    </div>
  )
}
