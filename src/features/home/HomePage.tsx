import { useState, useEffect, useRef } from 'react'
import { Link } from '@tanstack/react-router'
import SEO from '../ui/SEO'
import { serviceCards } from '../../data/services'
import { benefits, testimonials, stats } from '../../data/home'
import { primaryNumber } from '../../data/branches'
import { outdoorDoctorGroups } from '../../data/outdoorDoctors'
import { useBranch } from '../../context/BranchContext'
import Reveal from '../ui/Reveal'
import CountUp from '../ui/CountUp'
import { hoverIcons } from '../ui/ServiceIcons'
import DoctorSection from '../ui/DoctorSection'
import BrandWave from '../ui/BrandWave'

const SLIDE_INTERVAL = 5250

/* ── Global Health Standards Slideshow ── */
const globalStandardsSlides = [
  {
    icon: '🛡️',
    title: 'Global Health Standards',
    subtitle: 'Accredited by leading health organizations',
    description: 'Our processes align with internationally recognized quality and safety frameworks across every branch.',
  },
  {
    icon: '🏅',
    title: 'NABL Accredited Labs',
    subtitle: 'ISO 15189 Laboratory Accreditation',
    description: 'Every Sonoscan laboratory meets NABL standards for accuracy, traceability, and quality management.',
  },
  {
    icon: '🧬',
    title: 'Advanced Technology',
    subtitle: '3 Tesla MRI · 128/384 Slice CT · 4D USG',
    description: 'International-standard imaging and automated pathology analysers for precise, reliable results.',
  },
  {
    icon: '👨‍⚕️',
    title: 'Expert Medical Panel',
    subtitle: '44+ specialists across 11 departments',
    description: 'Board-certified pathologists, radiologists, cardiologists, and multi-specialty consultants.',
  },
]

function GlobalStandardsSlideshow() {
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const total = globalStandardsSlides.length

  useEffect(() => {
    if (paused) return
    intervalRef.current = setInterval(() => {
      setActive(prev => (prev + 1) % total)
    }, 5000)
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [paused, total])

  const goTo = (index: number) => {
    setActive(index)
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = setInterval(() => {
        setActive(prev => (prev + 1) % total)
      }, 5000)
    }
  }

  const slide = globalStandardsSlides[active]

  return (
    <div
      className="aspect-square bg-gradient-to-br from-violet-50 via-bg-elevated to-violet-50 rounded-2xl flex items-center justify-center relative overflow-hidden group"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="text-center px-6">
        <div key={active} className="animate-fade-in-up">
          <div className="w-24 h-24 mx-auto mb-5 bg-violet-100 rounded-full flex items-center justify-center text-4xl animate-float-slow">
            {slide.icon}
          </div>
          <p className="text-slate-700 font-semibold text-lg leading-snug">{slide.title}</p>
          <p className="text-violet-600/80 text-sm font-medium mt-1">{slide.subtitle}</p>
          <p className="text-slate-400 text-xs mt-3 leading-relaxed max-w-[240px] mx-auto">{slide.description}</p>
        </div>
      </div>

      {/* Dots */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex items-center gap-2">
        {globalStandardsSlides.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            aria-label={`Show slide ${i + 1} of ${total}`}
            className={`transition-all duration-500 rounded-full ${
              i === active ? 'w-6 h-2 bg-violet-600' : 'w-2 h-2 bg-violet-300 hover:bg-violet-400'
            }`}
          />
        ))}
      </div>
    </div>
  )
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: rating }, (_, i) => (
        <svg key={i} className="w-5 h-5 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  )
}

export default function HomePage() {
  const { selectedBranch } = useBranch()
  const [activeSlide, setActiveSlide] = useState(0)
  const [initialLoadComplete, setInitialLoadComplete] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const slideRef = useRef(0)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const heroRef = useRef<HTMLElement>(null)
  const slideCounter = useRef(0)
  const touchStartX = useRef(0)
  const touchStartY = useRef(0)
  const totalSlides = 3

  // Scroll-based parallax effect
  useEffect(() => {
    let ticking = false

    const updateParallax = () => {
      if (!heroRef.current) return
      const rect = heroRef.current.getBoundingClientRect()
      const heroTop = rect.top
      const heroHeight = rect.height
      const scrollOffset = Math.max(-heroHeight * 0.3, Math.min(heroHeight * 0.3, -heroTop * 0.1))

      const layers = heroRef.current.querySelectorAll('.parallax-layer')
      layers.forEach((layer) => {
        const el = layer as HTMLElement
        el.style.transform = `translateY(${scrollOffset}px)`
      })
      ticking = false
    }

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(updateParallax)
        ticking = true
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    updateParallax()

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    slideRef.current = activeSlide
  }, [activeSlide])

  useEffect(() => {
    const timer = setTimeout(() => setInitialLoadComplete(true), 1200)
    return () => clearTimeout(timer)
  }, [])

  const clearInterval_ = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
  }

  const startAutoAdvance = () => {
    clearInterval_()
    intervalRef.current = setInterval(() => {
      if (!isPaused) {
        slideCounter.current++
        setActiveSlide(prev => {
          const next = (prev + 1) % totalSlides
          slideRef.current = next
          return next
        })
      }
    }, SLIDE_INTERVAL)
  }

  useEffect(() => {
    if (!isPaused) {
      startAutoAdvance()
    } else {
      clearInterval_()
    }
    return () => clearInterval_()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPaused])

  const goToSlide = (index: number) => {
    slideCounter.current++
    clearInterval_()
    slideRef.current = index
    setActiveSlide(index)
    if (!isPaused) startAutoAdvance()
  }

  const goNext = () => goToSlide((activeSlide + 1) % totalSlides)
  const goPrev = () => goToSlide((activeSlide - 1 + totalSlides) % totalSlides)

  // Touch / swipe handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
    touchStartY.current = e.touches[0].clientY
  }

  const handleTouchEnd = (e: React.TouchEvent) => {
    const diffX = touchStartX.current - e.changedTouches[0].clientX
    const diffY = touchStartY.current - e.changedTouches[0].clientY
    // Only trigger swipe if horizontal movement exceeds vertical and threshold
    if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 50) {
      if (diffX > 0) goNext()
      else goPrev()
    }
  }

  const slides = [
    {
      src: '../images/slide1.png',
      alt: 'Team of medical professionals in modern hospital hallway',
    },
    {
      src: '../images/slide2.png',
      alt: 'Doctor consulting with patient in bright office',
    },
    {
      src: '../images/slide3.png',
      alt: 'Doctors walking in sunlit hospital corridor',
    },
  ]



  return (
    <>
      <SEO
        title="Sonoscan Healthcare | Your Health Journey Starts Here"
        description="Sonoscan Healthcare offers expert diagnostic services with compassionate professionals. Book your appointment today — trusted healthcare provider since 1998."
      />

      {/* ═══ Hero Section ═══ */}
      <section
        className="rounded-b-4xl relative overflow-hidden min-h-screen bg-[#0a0715] -mt-16 lg:-mt-28"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* Text content — sits above the slider */}
        <div className="container relative z-30 max-w-7xl mx-auto px-6 h-screen flex items-center pt-16 lg:pt-28">
          <div className="max-w-xl">
            {/* Heading */}
            <h1
              className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-white leading-[1.1] mb-6 opacity-0 animate-fade-in-up"
              style={{ animationDelay: '900ms', animationFillMode: 'forwards' }}
            >
              Your Health Journey{' '}
              <span className="text-violet-300">Starts Here</span>{' '}
              With Us
            </h1>
            {/* Description */}
            <p
              className="text-lg lg:text-xl text-slate-300 leading-relaxed mb-10 max-w-xl opacity-0 animate-fade-in-up"
              style={{ animationDelay: '1100ms', animationFillMode: 'forwards' }}
            >
              Lorem ipsum dolor sit amet consectetur Mi sagittis tristique volutpat ultrices adipiscing ac ornare arcu amet Est nunc erat.
            </p>
            {/* CTA Button */}
            <Reveal direction="scale" delay={1300} threshold={0.01}>
              <Link
                to="/appointments"
                className="group relative inline-flex items-center justify-center bg-[#27272e] text-white pt-[17.5px] pb-[19.5px] px-[30px] rounded-[5px] font-semibold text-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-black/30 active:scale-[0.97]"
              >
                <span className="relative z-10 transition-colors duration-500 group-hover:text-black">
                  Book An Appointment
                </span>
                <span
                  className="absolute inset-0 bg-white scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500 ease-out"
                  aria-hidden="true"
                />
              </Link>
            </Reveal>
          </div>
        </div>

        {/* ═══ Crossfade Carousel ═══ */}
        <div
          className="absolute inset-0"
          ref={heroRef as React.RefObject<HTMLDivElement>}
          role="region"
          aria-label="Hero carousel"
        >
          {/* Slides with crossfade + subtle zoom */}
          {slides.map((slide, i) => (
            <div
              key={i}
              className="absolute inset-0 transition-all duration-1000 ease-in-out will-change-transform"
              style={{
                opacity: i === activeSlide ? 1 : 0,
                transform: `scale(${i === activeSlide ? 1 : 1.08})`,
                zIndex: i === activeSlide ? 1 : 0,
              }}
              role="group"
              aria-label={`${i + 1} of ${totalSlides}`}
            >
              {/* Parallax layer */}
              <div className="parallax-layer absolute inset-0" style={{ transform: 'translateY(0)' }}>
                <img
                  src={slide.src}
                  alt={slide.alt}
                  className={`w-full h-full object-cover ${
                    i === 0 && !initialLoadComplete ? 'animate-slide-in-top' :
                    i === activeSlide && initialLoadComplete ? 'animate-hero-zoom-slow' : ''
                  }`}
                  loading={i === 0 ? 'eager' : 'lazy'}
                  sizes="100vw"
                />
              </div>
            </div>
          ))}
        </div>

        {/* Violet gradient overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'linear-gradient(90deg, #5552e7, rgba(85,82,231,0.55) 45%, rgba(255,255,255,0))', zIndex: 3 }}
        />

        {/* Arrow buttons — always visible on mobile, subtle on desktop */}
        <button
          onClick={goPrev}
          className="left-arrow absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 sm:w-14 sm:h-14 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 border border-white/20 flex items-center justify-center text-white transition-all duration-300 opacity-100 md:opacity-60 md:hover:opacity-100 md:focus:opacity-100 hover:scale-110 active:scale-95"
          aria-label="Previous slide"
        >
          <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
          </svg>
        </button>
        <button
          onClick={goNext}
          className="right-arrow absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 sm:w-14 sm:h-14 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 border border-white/20 flex items-center justify-center text-white transition-all duration-300 opacity-100 md:opacity-60 md:hover:opacity-100 md:focus:opacity-100 hover:scale-110 active:scale-95"
          aria-label="Next slide"
        >
          <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
          </svg>
        </button>

        {/* Progress bars — smooth CSS animation */}
        <div className="absolute left-0 right-0 z-30 flex gap-3 sm:gap-4 px-6 max-w-7xl mx-auto" style={{ bottom: '5.5rem' }}>
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="flex-1 h-[3px] sm:h-[2px] bg-white/20 overflow-hidden cursor-pointer rounded-full"
              onClick={() => goToSlide(i)}
            >
              <div
                className={`h-full bg-white rounded-full ${
                  i === activeSlide ? 'animate-progress-fill' : ''
                } ${i < activeSlide ? 'w-full' : ''}`}
                style={{
                  animationDuration: i === activeSlide ? `${SLIDE_INTERVAL}ms` : '0s',
                  width: i < activeSlide ? '100%' : i > activeSlide ? '0%' : undefined,
                  animationPlayState: isPaused && i === activeSlide ? 'paused' : 'running',
                }}
              />
            </div>
          ))}
        </div>

        {/* Dot navigation — larger tap targets on mobile */}
        <div className="absolute bottom-0 left-0 right-0 z-20 flex justify-center gap-3 sm:gap-4 pb-6 sm:pb-7">
          {[0, 1, 2].map((i) => (
            <button
              key={i}
              onClick={() => goToSlide(i)}
              className={`transition-all duration-300 rounded-full ${
                i === activeSlide
                  ? 'w-7 sm:w-8 h-2.5 sm:h-3 bg-white shadow-md shadow-white/30'
                  : 'w-2.5 sm:w-3 h-2.5 sm:h-3 bg-white/40 hover:bg-white/60'
              }`}
              aria-label={`Show slide ${i + 1} of ${totalSlides}`}
              aria-pressed={i === activeSlide}
            />
          ))}
        </div>

        {/* Load overlay — fades out to reveal content */}
        <div className="absolute inset-0 z-40 pointer-events-none bg-[#0a0715] animate-overlay-fade" />

        <BrandWave variant="white" />
        <div className="slider-overlay absolute inset-0 z-[2] pointer-events-none" />
      </section>

   

      {/* ═══ Services Section ═══ — flush 3-col grid with icon hover swap */}
      <Reveal direction="up">
        <section className="py-20 lg:py-28 bg-bg-surface">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <div className="inline-flex items-center gap-2 bg-violet-100 text-violet-700 px-4 py-2 rounded-full text-sm font-medium mb-4 border border-violet-200">
                Our Services
              </div>
              <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
                Discover Our Range Of Specialized Services
              </h2>
              <p className="text-lg text-slate-500">
                From routine check-ups to specialized treatments, we offer comprehensive healthcare services tailored to your needs.
              </p>
            </div>

            {/* ── Flush 2-column grid for 4 services ── */}
            <div className="border border-violet-200 rounded-xl overflow-hidden">
              {[serviceCards.slice(0, 2), serviceCards.slice(2, 4)].map((row, rowIdx) => (
                <div
                  key={rowIdx}
                  className={`grid grid-cols-1 sm:grid-cols-2 ${rowIdx < 1 ? 'border-b border-violet-200' : ''}`}
                >
                {row.map((service, colIdx) => (
                  <Reveal key={service.title} direction="up" delay={(rowIdx * 2 + colIdx) * 120} threshold={0.01}>
                    <div
                      className={`group relative p-8 lg:p-10 transition-colors duration-500 hover:bg-violet-50/50 ${colIdx < 1 ? 'sm:border-r border-violet-200' : ''}`}
                    >
                      {/* ── Clickable icon ── navigates to departments page */}
                      <Link
                        to="/departments"
                        className="block mb-5"
                      >
                        <div className="relative w-14 h-14">
                          {/* Default emoji icon */}
                          <span className="absolute inset-0 flex items-center justify-center text-3xl transition-all duration-500 group-hover:opacity-0 group-hover:scale-75">
                            {service.icon}
                          </span>
                          {/* Hover SVG icon */}
                          <span className="absolute inset-0 flex items-center justify-center opacity-0 scale-75 transition-all duration-500 group-hover:opacity-100 group-hover:scale-100">
                            {hoverIcons[service.id] ?? service.icon}
                          </span>
                        </div>
                      </Link>

                      <Link
                        to="/departments"
                        className="block"
                      >
                        <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-violet-600 transition-colors duration-300">
                          {service.title}
                        </h3>

                        <p className="text-slate-500 leading-relaxed mb-6 text-sm">
                          {service.description}
                        </p>
                      </Link>

                      {/* ── Read More with scale-in animation ── */}
                      <Reveal direction="scale" threshold={0.01}>
                        <Link
                          to="/departments"
                          className="group/link inline-flex items-center gap-2 text-violet-600 font-medium"
                        >
                          <span className="overflow-hidden h-5 inline-block align-middle">
                            <span className="flex flex-col transition-transform duration-300 group-hover/link:-translate-y-1/2">
                              <span className="h-5 leading-5">Read More</span>
                              <span className="h-5 leading-5">Read More</span>
                            </span>
                          </span>
                          <svg
                            className="w-4 h-4 transition-all duration-300 group-hover/link:translate-x-1"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="2"
                            stroke="currentColor"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25" />
                          </svg>
                        </Link>
                      </Reveal>
                    </div>
                  </Reveal>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </section>
      </Reveal>

      <DoctorSection previewCount={6} />

      {/* ═══ OPD Outdoor Doctors Preview ═══ */}
      {(() => {
        const currentBranchGroups = outdoorDoctorGroups[selectedBranch.id] ?? []
        if (currentBranchGroups.length === 0) return null
        // Show top 3 departments with their first 2 doctors each
        const previewGroups = currentBranchGroups.slice(0, 3)
        return (
          <Reveal direction="up">
            <section className="py-20 lg:py-28 bg-bg-surface">
              <div className="max-w-7xl mx-auto px-6">
                <div className="text-center max-w-2xl mx-auto mb-16">
                  <div className="inline-flex items-center gap-2 bg-violet-100 text-violet-700 px-4 py-2 rounded-full text-sm font-medium mb-4 border border-violet-200">
                    🩺 OPD Consultations
                  </div>
                  <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
                    Specialist OPD Doctors at {selectedBranch.name}
                  </h2>
                  <p className="text-lg text-slate-500">
                    Explore our specialist consultation schedule across multiple departments.
                  </p>
                </div>

                <div className="space-y-12">
                  {previewGroups.map((group) => (
                    <div key={group.id}>
                      <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-violet-700 flex items-center justify-center text-white text-lg shadow-md shadow-violet-500/25">
                          {group.name === 'Cardiology' ? '❤️' : group.name === 'Neurology' ? '🧠' : group.name === 'Gastroenterology' ? '🦠' : '🩺'}
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-slate-900">{group.name}</h3>
                          <p className="text-sm text-slate-400">{group.doctors.length} doctor{group.doctors.length !== 1 ? 's' : ''}</p>
                        </div>
                      </div>
                      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                        {group.doctors.slice(0, 2).map(doc => (
                          <div key={doc.name} className="bg-bg-card rounded-2xl border border-violet-200 p-5 hover:shadow-lg hover:border-violet-300 transition-all duration-300">
                            <div className="flex items-center gap-3 mb-3">
                              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-500 to-violet-700 flex items-center justify-center text-white font-bold text-xs shrink-0">
                                {doc.name.replace(/^Dr\.?\s*/i, '').split(/\s+/).map(t => t.charAt(0).toUpperCase()).slice(0, 2).join('')}
                              </div>
                              <div className="min-w-0">
                                <h4 className="font-semibold text-slate-900 text-sm truncate">{doc.name}</h4>
                                <p className="text-xs text-slate-400 truncate">{doc.qualification}</p>
                              </div>
                            </div>
                            {doc.schedule.length > 0 && (
                              <div className="flex flex-wrap gap-1.5">
                                {doc.schedule.slice(0, 3).map(slot => (
                                  <span key={`${slot.day}-${slot.time}`} className="text-[10px] font-semibold text-violet-700 bg-violet-50 border border-violet-200 px-2 py-0.5 rounded-full">
                                    {slot.day} {slot.time}
                                  </span>
                                ))}
                                {doc.schedule.length > 3 && (
                                  <span className="text-[10px] text-slate-400">+{doc.schedule.length - 3} more</span>
                                )}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="text-center mt-12">
                  <Link
                    to="/outdoor-doctor"
                    className="group inline-flex items-center gap-2 bg-violet-600 hover:bg-violet-700 text-white px-8 py-3.5 rounded-xl font-semibold transition-all hover:shadow-xl hover:shadow-violet-500/25 active:scale-[0.98]"
                  >
                    View All OPD Doctors
                    <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                    </svg>
                  </Link>
                </div>
              </div>
            </section>
          </Reveal>
        )
      })()}

      {/* ═══ Stats Section ═══ */}
      <Reveal direction="up">
        <section className="relative overflow-hidden bg-gradient-to-r from-violet-100 via-violet-50 to-bg-base border-y border-violet-200 py-12">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, #5552e7 1px, transparent 0)', backgroundSize: '30px 30px' }} />
          </div>
          <div className="relative max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {stats.map((stat, i) => (
                <Reveal key={stat.label} direction="up" delay={i * 200} threshold={0.01}>
                  <div className="text-center">
                    <div className="text-3xl lg:text-4xl font-bold text-slate-900 mb-1"><CountUp value={stat.value} /></div>
                    <div className="text-violet-600/80 text-sm lg:text-base">{stat.label}</div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>        <BrandWave />
        </section>
      </Reveal>

     

      {/* ═══ Testimonials Section ═══ */}
      <Reveal direction="up">
        <section className="py-20 lg:py-28 bg-bg-surface">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <div className="inline-flex items-center gap-2 bg-violet-100 text-violet-700 px-4 py-2 rounded-full text-sm font-medium mb-4 border border-violet-200">
                Testimonials
              </div>
              <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
                What Our Patients Say About Us
              </h2>
              <p className="text-lg text-slate-500">
                Hear from our patients about their experiences at Sonoscan Healthcare.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
              {testimonials.map((testimonial, i) => (
                <Reveal key={testimonial.name} direction="up" delay={i * 120} threshold={0.01}>
                  <div className="bg-bg-card border border-violet-200 rounded-lg p-8 hover:bg-violet-50/50 hover:border-violet-300 hover:shadow-xl hover:shadow-violet-500/10 transition-all duration-300 hover:-translate-y-1">
                    <StarRating rating={testimonial.rating} />
                    <p className="text-slate-600 mt-4 mb-6 leading-relaxed">"{testimonial.text}"</p>
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-violet-500 to-violet-700 flex items-center justify-center text-white font-bold text-sm">
                        {testimonial.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <p className="font-semibold text-slate-900">{testimonial.name}</p>
                        <p className="text-sm text-slate-500">{testimonial.role}</p>
                      </div>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      </Reveal>
          {/* ═══ WhatsApp CTA with QR Code ═══ */}
          <Reveal direction="up">
            <section className="py-16 lg:py-20 bg-bg-surface">
              <div className="max-w-7xl mx-auto px-6">
                <div className="bg-gradient-to-br from-emerald-500 to-green-700 rounded-2xl p-8 lg:p-10 relative overflow-hidden">
                  <div className="absolute -top-20 -right-20 w-60 h-60 bg-white/10 rounded-full blur-3xl" />
                  <div className="absolute -bottom-16 -left-16 w-48 h-48 bg-white/5 rounded-full blur-2xl" />

                  <div className="relative z-10 flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
                    <div className="flex-1 text-center lg:text-left">
                      <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium mb-5 border border-white/10">
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                        </svg>
                        Quick & Easy
                      </div>

                      <h3 className="text-2xl lg:text-3xl font-bold text-white mb-3">
                        Chat With Us on WhatsApp
                      </h3>
                      <p className="text-emerald-100/80 mb-6 max-w-md mx-auto lg:mx-0">
                        Have questions about our diagnostic services, health check packages, or appointment booking? Send us a message and we will get back to you right away.
                      </p>

                      <div className="flex flex-wrap justify-center lg:justify-start gap-3 mb-6">
                        {['Quick replies', 'Share reports', 'Book appointments'].map((benefit) => (
                          <span key={benefit} className="inline-flex items-center gap-1.5 bg-white/10 backdrop-blur-sm text-white text-sm px-3 py-1.5 rounded-full border border-white/10">
                            <svg className="w-3.5 h-3.5 text-emerald-300" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                            </svg>
                            {benefit}
                          </span>
                        ))}
                      </div>

                      <a
                        href={`https://wa.me/91${primaryNumber(selectedBranch.whatsapp)}?text=${encodeURIComponent(`Hi! I would like to know more about Sonoscan Healthcare (${selectedBranch.name}) diagnostic services, health check packages, and how to book an appointment.`)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 bg-white text-emerald-700 hover:bg-emerald-50 px-6 py-3 rounded-xl font-semibold transition-all hover:shadow-lg active:scale-[0.98]"
                      >
                        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                        </svg>
                        Start Chat
                      </a>
                    </div>

                    <div className="shrink-0">
                      <div className="bg-white rounded-2xl p-4 shadow-xl text-center">
                        <img
                          src={'https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=' + encodeURIComponent('https://wa.me/91' + primaryNumber(selectedBranch.whatsapp) + '?text=' + encodeURIComponent(`Hi! I would like to know more about Sonoscan Healthcare (${selectedBranch.name}) diagnostic services.`))}
                          alt="Scan to chat on WhatsApp"
                          className="w-36 h-36 mx-auto rounded-lg"
                          loading="lazy"
                        />
                        <p className="text-xs text-slate-500 mt-2 font-medium">Scan to chat instantly</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </Reveal>

 {/* ═══ Benefits Section ═══ */}
      <Reveal direction="up">
        <section className="py-20 lg:py-28 bg-bg-base">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              <div>
                <div className="inline-flex items-center gap-2 bg-violet-100 text-violet-700 px-4 py-2 rounded-full text-sm font-medium mb-4 border border-violet-200">
                  Why Choose Us
                </div>
                <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-6">
                  The Best Essence Of Our{' '}
                  <span className="text-violet-600">Medical Expertise</span>
                </h2>
                <p className="text-lg text-slate-500 mb-8">
                  We believe in proactive health management. Our team provides expert guidance and support to help you live your healthiest life.
                </p>

                <div className="space-y-6">
                  {benefits.map((benefit, i) => (
                    <Reveal key={benefit.title} direction="left" delay={i * 200} threshold={0.01}>
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 bg-violet-100 rounded-xl flex items-center justify-center shrink-0 mt-1">
                          <svg className="w-5 h-5 text-violet-600" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                          </svg>
                        </div>
                        <div>
                          <h3 className="font-semibold text-slate-900 mb-1">{benefit.title}</h3>
                          <p className="text-slate-500">{benefit.description}</p>
                        </div>
                      </div>
                    </Reveal>
                  ))}
                </div>
              </div>

              <Reveal direction="right" delay={200}>
                <div className="bg-bg-card rounded-2xl border border-violet-200 shadow-xl shadow-violet-500/5 p-8 lg:p-10 hover:animate-border-glow transition-all">
                  <GlobalStandardsSlideshow />
                </div>
              </Reveal>
            </div>
          </div>
        </section>
      </Reveal>
      {/* ═══ CTA Section ═══ */}
      <section className="py-20 lg:py-28 bg-bg-base relative overflow-hidden border-t border-violet-200">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-violet-500/5 rounded-full blur-3xl animate-float-slow" />
          <div className="absolute inset-0 opacity-[0.015]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, #5552e7 1px, transparent 0)', backgroundSize: '40px 40px' }} />
        </div>
        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <Reveal direction="up" delay={0} threshold={0.01}>
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-6">
              Take the First Step Towards Better Health
            </h2>
          </Reveal>
          <Reveal direction="up" delay={120} threshold={0.01}>
            <p className="text-lg text-slate-500 mb-10 max-w-2xl mx-auto">
              Schedule an appointment with our expert medical team today.
            </p>
          </Reveal>
          <div className="flex flex-wrap justify-center gap-4">
            <Reveal direction="scale" delay={240} threshold={0.01}>
              <Link
                to="/appointments"
                className="inline-flex items-center gap-2 bg-violet-600 hover:bg-violet-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all hover:shadow-2xl hover:shadow-violet-500/25 active:scale-95"
              >
                Book An Appointment
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                </svg>
              </Link>
            </Reveal>
            <Reveal direction="scale" delay={360} threshold={0.01}>
              <a
                href={`tel:+91${primaryNumber(selectedBranch.phone)}`}
                className="inline-flex items-center gap-2 border-2 border-violet-300 hover:border-violet-400 text-slate-600 hover:text-slate-900 px-8 py-4 rounded-lg font-semibold text-lg transition-all"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
                </svg>
                Call Us Now
              </a>
            </Reveal>
          </div>
        </div>

        <BrandWave />
      </section>
    </>
  )
}
