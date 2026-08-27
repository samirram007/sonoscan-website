import { useState, useEffect, useRef, useCallback } from 'react'
import { Link } from '@tanstack/react-router'
import SEO from '../ui/SEO'
import { stats, testimonials, coreValues } from '../../data/home'
import { branches } from '../../data/branches'
import { useBranch } from '../../context/BranchContext'
import Reveal from '../ui/Reveal'
import CountUp from '../ui/CountUp'
import BrandWave from '../ui/BrandWave'

/* ── Building Slideshow ── */
const buildingSlides = [
  { src: '../images/kolkataabout.png', alt: 'Sonoscan Kolkata flagship centre' },
  { src: '../images/maldaabout.png', alt: 'Sonoscan Malda centre' },
  { src: '../images/blgabout.png', alt: 'Sonoscan Balurghat centre' },
  { src: '../images/gangaabout.png', alt: 'Sonoscan Gangarampur centre' },

]

function BuildingSlideshow() {
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const total = buildingSlides.length

  useEffect(() => {
    if (paused) return
    intervalRef.current = setInterval(() => {
      setActive(prev => (prev + 1) % total)
    }, 4500)
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
      }, 4500)
    }
  }

  return (
    <div
      className="relative aspect-square rounded-2xl overflow-hidden bg-slate-100"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Slides */}
      {buildingSlides.map((slide, i) => (
        <div
          key={slide.src}
          className="absolute inset-0 transition-all duration-1000 ease-in-out"
          style={{ opacity: i === active ? 1 : 0, transform: `scale(${i === active ? 1 : 1.08})` }}
        >
          <img
            src={slide.src}
            alt={slide.alt}
            className={`w-full h-full object-cover ${i === active ? 'animate-hero-zoom-slow' : ''}`}
            loading="lazy"
          />
        </div>
      ))}

      {/* Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 z-10">
        {buildingSlides.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            aria-label={`Show slide ${i + 1} of ${total}`}
            className={`transition-all duration-500 rounded-full ${
              i === active ? 'w-6 h-2 bg-white shadow' : 'w-2 h-2 bg-white/50 hover:bg-white/80'
            }`}
          />
        ))}
      </div>
    </div>
  )
}

/* ── Star Rating ── */
function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-1.5">
      {Array.from({ length: 5 }, (_, i) => (
        <svg
          key={i}
          className={`w-5 h-5 ${i < rating ? 'text-amber-400' : 'text-slate-200'}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  )
}

/* ── Testimonials Carousel ── */
function TestimonialCarousel() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const touchStartX = useRef(0)
  const touchStartY = useRef(0)

  const total = testimonials.length

  const clearTimer = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
  }, [])

  const startTimer = useCallback(() => {
    clearTimer()
    intervalRef.current = setInterval(() => {
      setActiveIndex(prev => (prev + 1) % total)
    }, 5000)
  }, [clearTimer, total])

  useEffect(() => {
    if (!isPaused) startTimer()
    else clearTimer()
    return clearTimer
  }, [isPaused, startTimer, clearTimer])

  const goTo = useCallback((index: number) => {
    clearTimer()
    setActiveIndex(index)
    if (!isPaused) startTimer()
  }, [clearTimer, isPaused, startTimer])

  const goNext = useCallback(() => goTo((activeIndex + 1) % total), [activeIndex, total, goTo])
  const goPrev = useCallback(() => goTo((activeIndex - 1 + total) % total), [activeIndex, total, goTo])

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
    touchStartY.current = e.touches[0].clientY
  }

  const handleTouchEnd = (e: React.TouchEvent) => {
    const diffX = touchStartX.current - e.changedTouches[0].clientX
    const diffY = touchStartY.current - e.changedTouches[0].clientY
    if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 50) {
      if (diffX > 0) goNext()
      else goPrev()
    }
  }

  const testimonial = testimonials[activeIndex]
  const initials = testimonial.name.split(' ').map(n => n[0]).join('')

  return (
    <div className="relative max-w-7xl mx-auto px-6">
      {/* Section header */}
      <div className="text-center max-w-2xl mx-auto mb-14">
        <div className="inline-flex items-center gap-2 bg-violet-100 text-violet-700 px-4 py-2 rounded-full text-sm font-medium mb-4 border border-violet-200">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
          </svg>
          Patient Testimonials
        </div>
        <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
          What Our Patients Say About Us
        </h2>
        <p className="text-lg text-slate-500">
          Real experiences from our patients — hear their stories about the care we provide.
        </p>
      </div>

      {/* Carousel */}
      <div
        className="max-w-3xl mx-auto"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* Slide area */}
        <div className="relative overflow-hidden rounded-2xl">
          {/* Progress bar */}
          <div className="absolute top-0 left-0 right-0 z-10 h-1 bg-violet-100/80 rounded-t-2xl overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-violet-500 to-violet-400 rounded-full transition-all duration-300"
              style={{
                width: `${((activeIndex + 1) / total) * 100}%`,
                transition: 'width 0.5s ease',
              }}
            />
          </div>

          {/* Card */}
          <div
            className="bg-bg-card border border-violet-200 rounded-2xl p-8 sm:p-10 lg:p-12 shadow-xl shadow-violet-500/5"
            role="region"
            aria-label={`Testimonial ${activeIndex + 1} of ${total}`}
            aria-roledescription="carousel"
          >
            {/* Quote icon */}
            <div className="mb-6 text-violet-300/40">
              <svg className="w-10 h-10 sm:w-12 sm:h-12" fill="currentColor" viewBox="0 0 24 24">
                <path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311C9.591 11.69 11 13.154 11 15c0 2.21-1.79 4-4 4a3.987 3.987 0 0 1-2.417-.679Zm8.5 0C12.053 16.227 11.5 15 11.5 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311C18.091 11.69 19.5 13.154 19.5 15c0 2.21-1.79 4-4 4a3.987 3.987 0 0 1-2.417-.679Z" />
              </svg>
            </div>

            {/* Star rating */}
            <StarRating rating={testimonial.rating} />

            {/* Quote text */}
            <div className="relative mt-6 mb-8">
              <p className="text-lg sm:text-xl text-slate-700 leading-relaxed italic">
                &ldquo;{testimonial.text}&rdquo;
              </p>
            </div>

            {/* Divider */}
            <div className="w-20 h-0.5 bg-gradient-to-r from-violet-300 to-transparent rounded-full mb-6" />

            {/* Author */}
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-violet-500 to-violet-700 flex items-center justify-center text-white font-bold text-lg shadow-md shadow-violet-500/30">
                {initials}
              </div>
              <div>
                <p className="font-bold text-slate-900 text-lg">{testimonial.name}</p>
                <p className="text-sm text-slate-500 flex items-center gap-1.5">
                  <svg className="w-3.5 h-3.5 text-violet-400" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                  </svg>
                  Verified Patient
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-6 mt-8">
          {/* Prev arrow */}
          <button
            onClick={goPrev}
            className="w-10 h-10 rounded-full border border-violet-200 bg-bg-card flex items-center justify-center text-violet-600 hover:bg-violet-100 hover:border-violet-300 transition-all active:scale-90"
            aria-label="Previous testimonial"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
            </svg>
          </button>

          {/* Dots */}
          <div className="flex items-center gap-2.5" role="tablist" aria-label="Testimonial slides">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                role="tab"
                aria-selected={i === activeIndex}
                aria-label={`Testimonial ${i + 1} of ${total}`}
                className={`transition-all duration-500 rounded-full ${
                  i === activeIndex
                    ? 'w-8 h-2.5 bg-violet-600 shadow-sm shadow-violet-400/50'
                    : 'w-2.5 h-2.5 bg-violet-200 hover:bg-violet-300'
                }`}
              />
            ))}
          </div>

          {/* Next arrow */}
          <button
            onClick={goNext}
            className="w-10 h-10 rounded-full border border-violet-200 bg-bg-card flex items-center justify-center text-violet-600 hover:bg-violet-100 hover:border-violet-300 transition-all active:scale-90"
            aria-label="Next testimonial"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
            </svg>
          </button>
        </div>

        {/* Slide counter */}
        <p className="text-center text-xs text-slate-400 mt-4">
          {String(activeIndex + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
        </p>
      </div>
    </div>
  )
}

/* ── Core Values Icon Map ── */
const coreValueIcons: Record<string, React.ReactNode> = {
  heart: (
    <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
    </svg>
  ),
  shield: (
    <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
    </svg>
  ),
  star: (
    <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
    </svg>
  ),
  lightbulb: (
    <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 0 0 1.5-.189m-1.5.189a6.01 6.01 0 0 1-1.5-.189m3.75 7.478a12.06 12.06 0 0 1-4.5 0m3.75 2.383a14.406 14.406 0 0 1-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 1 0-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />
    </svg>
  ),
  people: (
    <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
    </svg>
  ),
}

/* ── Core Values Section ── */
function CoreValuesSection() {
  const values = coreValues

  return (
    <div className="relative max-w-7xl mx-auto px-6">
      {/* Section header */}
      <div className="text-center max-w-2xl mx-auto mb-14">
        <div className="inline-flex items-center gap-2 bg-violet-100 text-violet-700 px-4 py-2 rounded-full text-sm font-medium mb-4 border border-violet-200">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
          </svg>
          Our Core Values
        </div>
        <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
          Guided by{' '}
          <span className="text-violet-600">Values That Matter</span>
        </h2>
        <p className="text-lg text-slate-500">
          Our mission and vision are brought to life through the values we practice every day.
        </p>
      </div>

      {/* Mission + Vision cards */}
      <div className="grid md:grid-cols-2 gap-6 mb-12">
        {/* Mission */}
        <Reveal direction="left" threshold={0.1}>
          <div className="group relative bg-gradient-to-br from-violet-600 to-violet-800 rounded-2xl p-8 lg:p-10 text-white overflow-hidden">
            <div className="absolute inset-0 opacity-10">
              <div className="absolute -top-20 -right-20 w-60 h-60 bg-white/20 rounded-full blur-3xl" />
              <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-white/10 rounded-full blur-2xl" />
            </div>
            <div className="relative z-10">
              <div className="w-14 h-14 bg-white/15 backdrop-blur-sm rounded-xl flex items-center justify-center mb-5 border border-white/20">
                <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 0 1-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 0 0 6.16-12.12A14.98 14.98 0 0 0 9.631 8.41m5.96 5.96a14.926 14.926 0 0 1-5.841 2.58m-.119-8.54a6 6 0 0 0-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 0 0-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 0 1-2.448-2.448 14.9 14.9 0 0 1 .06-.312m-2.24 2.39a4.493 4.493 0 0 0-1.757 4.306 4.493 4.493 0 0 0 4.306-1.758M16.5 9a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-1">Our Mission</h3>
              <div className="w-12 h-0.5 bg-violet-300/50 rounded-full mb-4" />
              <p className="text-violet-100 leading-relaxed">
                To provide quality healthcare at an affordable cost for society through state-of-the-art diagnostic and multispecialty services, delivered with Accuracy, Sincerity, and Integrity.
              </p>
            </div>
          </div>
        </Reveal>

        {/* Vision */}
        <Reveal direction="right" threshold={0.1}>
          <div className="group relative bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-8 lg:p-10 text-white overflow-hidden">
            <div className="absolute inset-0 opacity-10">
              <div className="absolute -top-20 -left-20 w-60 h-60 bg-violet-400/20 rounded-full blur-3xl" />
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-violet-300/10 rounded-full blur-2xl" />
            </div>
            <div className="relative z-10">
              <div className="w-14 h-14 bg-white/15 backdrop-blur-sm rounded-xl flex items-center justify-center mb-5 border border-white/20">
                <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-1">Our Vision</h3>
              <div className="w-12 h-0.5 bg-slate-400/50 rounded-full mb-4" />
              <p className="text-slate-300 leading-relaxed">
                To be the Single Largest Diagnostic Service Provider in Eastern India, continuing to pioneer in medical services while making healthcare accessible and affordable for all.
              </p>
            </div>
          </div>
        </Reveal>
      </div>

      {/* Core Values grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-5">
        {values.map((value, i) => (
          <Reveal key={value.title} direction="up" delay={i * 100} threshold={0.1}>
            <div
              className={`group bg-bg-card rounded-2xl p-6 border ${value.border} ${value.hover} transition-all duration-300 hover:-translate-y-1 hover:shadow-lg text-center`}
            >
              {/* Icon */}
              <div
                className={`w-14 h-14 mx-auto mb-4 rounded-xl ${value.bg} flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:rotate-3`}
              >
                {coreValueIcons[value.iconName]}
              </div>

              <h3 className="text-base font-bold text-slate-900 mb-2 group-hover:text-violet-600 transition-colors">
                {value.title}
              </h3>

              <p className="text-xs text-slate-500 leading-relaxed">
                {value.description}
              </p>

              {/* Bottom accent */}
              <div className={`mt-4 w-8 h-0.5 mx-auto rounded-full bg-gradient-to-r ${value.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  )
}

/* ── Accreditations & Certifications ── */
function AccreditationsSection() {
  const accreditations = [
    {
      acronym: 'NABL',
      fullName: 'National Accreditation Board for Laboratories',
      description: 'Laboratory Testing & Calibration Accreditation (ISO 15189) — all our labs are NABL approved',
      gradient: 'from-emerald-600 to-emerald-800',
      lightBg: 'bg-emerald-50',
      shadow: 'shadow-emerald-500/20',
      ring: 'ring-emerald-300',
    },
    {
      acronym: '3T MRI',
      fullName: '3 Tesla Silent MRI Technology',
      description: 'Latest generation silent MRI for superior diagnostic imaging with patient comfort',
      gradient: 'from-violet-600 to-violet-800',
      lightBg: 'bg-violet-50',
      shadow: 'shadow-violet-500/20',
      ring: 'ring-violet-300',
    },
    {
      acronym: '128 CT',
      fullName: '128 Slice CT Scan Technology',
      description: 'Advanced multidetector CT imaging for rapid, high-resolution diagnostic scans',
      gradient: 'from-amber-500 to-amber-700',
      lightBg: 'bg-amber-50',
      shadow: 'shadow-amber-500/20',
      ring: 'ring-amber-300',
    },
  ]

  return (
    <div className="relative max-w-7xl mx-auto px-6">
      {/* Section header */}
      <div className="text-center max-w-2xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 bg-violet-100 text-violet-700 px-4 py-2 rounded-full text-sm font-medium mb-4 border border-violet-200">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
          </svg>
          Technology & Certifications
        </div>
        <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
          Powered by{' '}
          <span className="text-violet-600">Advanced Technology</span>
        </h2>
        <p className="text-lg text-slate-500">
          All our laboratories are NABL accredited, ensuring the highest standards of diagnostic accuracy and quality management across every branch.
        </p>
      </div>

      {/* Accreditations row — large logo-style badges */}
      <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
        {accreditations.map((acc, i) => (
          <Reveal key={acc.acronym} direction="up" delay={i * 150} threshold={0.1}>
            <div
              className={`group relative bg-bg-card rounded-2xl border-2 border-transparent p-8 lg:p-10 text-center transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl ${acc.shadow} ${acc.ring} hover:ring-2 overflow-hidden`}
            >
              {/* Large logo badge */}
              <div
                className={`relative mx-auto w-28 h-28 sm:w-32 sm:h-32 rounded-2xl bg-gradient-to-br ${acc.gradient} flex items-center justify-center text-white shadow-xl mb-6 transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 group-hover:shadow-2xl`}
              >
                {/* Inner glow */}
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-30 transition-opacity duration-500 bg-white/20" />
                <span className="relative text-2xl sm:text-3xl font-black tracking-wider drop-shadow-lg">
                  {acc.acronym}
                </span>
              </div>

              {/* Full name */}
              <h3 className="text-base font-bold text-slate-900 mb-2 leading-snug">
                {acc.fullName}
              </h3>

              {/* Description */}
              <p className="text-sm text-slate-500 leading-relaxed">
                {acc.description}
              </p>

              {/* Trusted badge */}
              <div className="mt-5 inline-flex items-center gap-1.5 text-xs font-medium text-violet-600 bg-violet-50 px-3 py-1.5 rounded-full border border-violet-200 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-1 group-hover:translate-y-0">
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
                Verified & Recognized
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      {/* Bottom trust strip */}
      <Reveal direction="up" delay={500} threshold={0.1}>
        <div className="mt-10 text-center">
          <div className="inline-flex items-center gap-2.5 bg-gradient-to-r from-violet-50 to-bg-card border border-violet-200 rounded-2xl px-8 py-4 shadow-sm">
            <svg className="w-5 h-5 text-violet-500 shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
            </svg>
            <span className="text-sm text-slate-600">
              NABL approved labs with advanced diagnostic capabilities across all branches
            </span>
          </div>
        </div>
      </Reveal>
    </div>
  )
}

function BranchLocationsGrid() {
  const { selectedBranch, setSelectedBranch } = useBranch()

  return (
    <section className="py-20 lg:py-28 bg-bg-surface relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-violet-500/5 rounded-full blur-3xl animate-float-slow" />
      </div>
      <div className="relative max-w-7xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 bg-violet-100 text-violet-700 px-4 py-2 rounded-full text-sm font-medium mb-4 border border-violet-200">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            Our Locations
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
            Find a Branch Near You
          </h2>
          <p className="text-lg text-slate-500">
            With four convenient locations across West Bengal — Kolkata, Malda, Balurghat, and Gangarampur — quality healthcare is always within reach.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {branches.map((branch, i) => {
            const isSelected = selectedBranch.id === branch.id
            return (
              <Reveal key={branch.id} direction="up" delay={i * 100} threshold={0.1}>
                <button
                  onClick={() => setSelectedBranch(branch)}
                  className={`w-full text-left bg-bg-card rounded-2xl border-2 p-6 transition-all duration-300 ${
                    isSelected
                      ? 'border-violet-500 shadow-xl shadow-violet-500/15 ring-1 ring-violet-500/20'
                      : 'border-violet-200 hover:border-violet-300 hover:shadow-lg'
                  }`}
                >
                  {/* Top accent bar for selected state */}
                  {isSelected && (
                    <div className="flex items-center gap-2 mb-4">
                      <span className="inline-flex items-center gap-1 bg-violet-600 text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
                        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                        </svg>
                        Selected
                      </span>
                    </div>
                  )}

                  {/* Branch icon */}
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-all ${
                    isSelected
                      ? 'bg-gradient-to-br from-violet-500 to-violet-700 text-white shadow-lg shadow-violet-500/30'
                      : 'bg-violet-100 text-violet-600'
                  }`}>
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>

                  {/* Branch name */}
                  <h3 className={`text-lg font-bold mb-1 transition-colors ${
                    isSelected ? 'text-violet-700' : 'text-slate-900'
                  }`}>
                    {branch.name}
                  </h3>
                  <p className="text-sm text-slate-500 mb-4 line-clamp-2">{branch.address}</p>

                  {/* Quick details */}
                  <div className="space-y-2 text-xs text-slate-400">
                    <div className="flex items-center gap-2">
                      <svg className="w-3.5 h-3.5 shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
                      </svg>
                      {branch.phone}
                    </div>
                    <div className="flex items-center gap-2">
                      <svg className="w-3.5 h-3.5 shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                      </svg>
                      {branch.hours}
                    </div>
                  </div>

                  {/* View Details link */}
                  <Link
                    to="/services/$id"
                    params={{ id: branch.id }}
                    className={`mt-4 inline-flex items-center gap-1 text-sm font-medium transition-colors ${
                      isSelected ? 'text-violet-600' : 'text-slate-400 hover:text-violet-600'
                    }`}
                    onClick={(e) => e.stopPropagation()}
                  >
                    View Details
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                    </svg>
                  </Link>
                </button>
              </Reveal>
            )
          })}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 bg-violet-600 hover:bg-violet-700 text-white px-8 py-4 rounded-xl font-semibold transition-all hover:shadow-xl hover:shadow-violet-500/25 active:scale-[0.98]"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
            </svg>
            View All Locations
          </Link>
        </div>
      </div>
    </section>
  )
}

/* ── Sonoscan Timeline ── */
function SonoscanTimeline() {
  const [visibleCount, setVisibleCount] = useState(5)
  const [hovering, setHovering] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  // Auto-collapse when scrolling back up (section leaves viewport)
  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) setVisibleCount(5)
      },
      { threshold: 0 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const milestones = [
    { year: '1990', title: 'Echocardiography & Ultrasonography', description: 'he Beginning of Advanced Diagnostic Excellence.' },
    { year: '1991', title: 'E.E.G & E.C.G.', description: 'Setting the Standard in EEG & ECG Diagnostics.' },
    { year: '1992', title: 'Pathology Laboratory', description: 'Building a Foundation of Accurate Laboratory Medicine.' },
    { year: '1993', title: 'Endoscopy', description: 'Advancing Precision in Gastrointestinal Diagnosis.' },
    { year: '1994', title: 'Histopathology, Cytology & FNAC', description: 'Enhancing Diagnostic Confidence Through Expert Pathology.' },
    { year: '1995', title: 'Lung Function Test', description: 'Supporting Better Respiratory Health with Precision Testing.' },
    { year: '1996', title: 'Whole Body CT Scan', description: 'Introducing Advanced Cross-Sectional Imaging.' },
    { year: '1997', title: 'Multispeciality Outdoor', description: 'Expanding Comprehensive Healthcare Services.' },
    { year: '1998', title: 'Colonoscopy', description: 'Advancing Preventive Gastrointestinal Care.' },
    { year: '1999', title: 'Colour Doppler', description: 'Visualizing Better Vascular & Cardiac Health.' },
    { year: '2000', title: 'Audiometry & Tympanometry', description: 'Caring for Better Hearing and Ear Health.' },
    { year: '2001', title: 'Hormonal Assay', description: 'Redefining Precision in Hormonal Diagnostics.' },
    { year: '2002', title: 'TMT & Holter Monitoring', description: 'Comprehensive Cardiac Monitoring Begins.' },
    { year: '2003', title: 'EMG & NCV.', description: 'Excellence in Neurodiagnostic Services.' },
    { year: '2004', title: 'Multi Slice Spiral CT Scan', description: 'A New Era of High-Speed Diagnostic Imaging.' },
    { year: '2005', title: 'ISO Accreditation', description: 'Quality Recognized. Excellence Certified.' },
    { year: '2006', title: 'Paramedical Course & MRI Service', description: 'Empowering Future Healthcare Professionals., Advanced MRI for Superior Clinical Diagnosis.' },
    { year: '2007', title: 'Dialysis, Neurosurgery & Critical Care', description: 'Delivering Compassionate Renal Care also Comprehensive Care for Critical Moments.' },
    { year: '2008', title: 'Sonoscan Balurghat, NABL & ISO Accreditation', description: 'Expanding Quality Healthcare Across Bengal, International Standards. Trusted Diagnostics.' },
    { year: '2009', title: '4D Ultrasonography & OPG', description: 'Sharper Imaging. Better Clinical Decisions.' },
    { year: '2010', title: 'Microbiology Department', description: 'Strengthening Infection Diagnosis with Precision.' },
    { year: '2011', title: 'CT Scan Unit at Malda Medical College', description: 'Partnering with Public Healthcare for Better Access.' },
    { year: '2012', title: 'WBHS Approved Class-I Diagnostic Centre', description: 'Government Recognized. Patient Trusted.' },
    { year: '2013', title: 'Automated Biochemistry Analyzer', description: 'Automation for Faster, More Accurate Results.' },
    { year: '2014', title: 'Laryngoscopy', description: 'Expanding Advanced ENT Diagnostics.' },
    { year: '2015', title: 'Barcode System in Laboratory', description: 'Smarter Technology. Safer Diagnostics.' },
    { year: '2016', title: 'Sonoscan Kolkata Branch', description: 'A New Landmark in Advanced Diagnostics.' },
    { year: '2017', title: '3 Tesla Silent MRI & CT Coronary Angiography', description: 'Experience the Future of MRI Comfort with Next-Generation Non-Invasive Heart Imaging.' },
    { year: '2018', title: 'NABL Accreditation (Kolkata)', description: 'Quality That Earned National Recognition.' },
    { year: '2019', title: 'HB Electrophoresis (HPLC)', description: 'Precision Diagnostics for Blood Disorders.' },
    { year: '2020', title: 'COVID Vaccination & RT-PCR Testing', description: 'Standing with the Community During the Pandemic also Reliable COVID Testing When It Mattered Most.' },
    { year: '2021', title: 'Online Report Delivery', description: 'Healthcare at Your Fingertips.' },
    { year: '2022', title: 'BMD / DEXA Scan', description: 'Supporting Stronger Bones for a Healthier Tomorrow.' },
    { year: '2023', title: 'Mammography & Dental Unit', description: 'Early Detection. Better Protection. Complete Oral Healthcare Under One Roof.,' },
    { year: '2024', title: '384 Slice Coronary CT Scan', description: 'Redefining Cardiac Imaging with AI-Powered Precision.' },
    { year: '2025', title: 'Sonoscan Gangarampur', description: 'Bringing Trusted Diagnostics Closer to Every Community.' },
    { year: '2026', title: 'Collaboration with Park Clinic', description: '"Park Sonoscan Clinic – Technically Supported by Sonoscan: A Partnership Built on Trust, Innovation, and Excellence in Patient Care."' },
  ]

  return (
    <section ref={sectionRef} className="py-20 lg:py-28 bg-bg-surface relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 -translate-y-1/2 -right-40 w-[500px] h-[500px] bg-violet-500/5 rounded-full blur-3xl" />
      </div>
      <div className="relative max-w-7xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 bg-violet-100 text-violet-700 px-4 py-2 rounded-full text-sm font-medium mb-4 border border-violet-200">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
            </svg>
            Our Journey
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
            A Legacy of{' '}
            <span className="text-violet-600">Healthcare Excellence</span>
          </h2>
          <p className="text-lg text-slate-500">
            From a single diagnostic centre in Malda to Eastern India's largest diagnostic service provider — our journey has been driven by a commitment to quality and affordability.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {milestones.slice(0, visibleCount).map((milestone, i) => (
            <Reveal key={milestone.year} direction="up" delay={i * 20} threshold={0.1}>
              <div className="relative flex items-start gap-6 pb-10 last:pb-0">
                {/* Timeline line */}
                {i < Math.min(visibleCount, milestones.length) - 1 && (
                  <div className="absolute left-[19px] top-12 w-0.5 bg-gradient-to-b from-violet-400 to-violet-200" style={{ height: 'calc(100% + 2.5rem)' }} />
                )}

                {/* Year badge */}
                <div className="relative z-10 shrink-0">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold shadow-lg ${
                    milestone.year === 'Today'
                      ? 'bg-gradient-to-br from-violet-500 to-violet-700 text-white shadow-violet-500/30'
                      : 'bg-white text-violet-700 border-2 border-violet-300'
                  }`}>
                    {milestone.year === 'Today' ? (
                      <span className="w-2 h-2 bg-white rounded-full" />
                    ) : (
                      milestone.year
                    )}
                  </div>
                </div>

                {/* Card */}
                <div className="flex-1 bg-bg-card rounded-2xl border border-violet-200 p-6 lg:p-8 transition-all duration-300 hover:shadow-lg hover:border-violet-300 hover:-translate-y-0.5">
                  <div className="flex items-center gap-3 mb-2">
                    <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                      milestone.year === 'Today'
                        ? 'bg-violet-100 text-violet-700'
                        : 'bg-slate-100 text-slate-500'
                    }`}>
                      {milestone.year}
                    </span>
                    <h3 className="text-lg font-bold text-slate-900">{milestone.title}</h3>
                  </div>
                  <p className="text-sm text-slate-500 leading-relaxed">{milestone.description}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Show More button */}
        {visibleCount < milestones.length && (
          <div className="relative mt-12">
            {/* Ghost preview — absolutely positioned so it doesn't shift layout */}
            {hovering && (
              <div className="absolute inset-x-0 top-full pt-6 opacity-35 pointer-events-none transition-opacity duration-300">
                <div className="max-w-4xl mx-auto">
                  {milestones.slice(visibleCount, visibleCount + 5).map((milestone) => (
                    <div key={milestone.year} className="relative flex items-start gap-6 pb-10 last:pb-0">
                      <div className="relative z-10 shrink-0">
                        <div className="w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold bg-white text-violet-700 border-2 border-violet-300">
                          {milestone.year}
                        </div>
                      </div>
                      <div className="flex-1 bg-bg-card rounded-2xl border border-violet-200 p-6 lg:p-8">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-slate-100 text-slate-500">
                            {milestone.year}
                          </span>
                          <h3 className="text-lg font-bold text-slate-900">{milestone.title}</h3>
                        </div>
                        <p className="text-sm text-slate-500 leading-relaxed">{milestone.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="text-center">
              <button
                onClick={() => setVisibleCount(prev => Math.min(prev + 5, milestones.length))}
                onMouseEnter={() => setHovering(true)}
                onMouseLeave={() => setHovering(false)}
                className="inline-flex items-center gap-2 bg-white border-2 border-violet-200 text-violet-700 px-8 py-3.5 rounded-xl font-semibold transition-all hover:border-violet-300 hover:bg-violet-50 hover:shadow-lg active:scale-[0.98]"
              >
                Show More
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                </svg>
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

export default function AboutPage() {
  return (
    <>
      <SEO
        title="About Us | Sonoscan Healthcare"
        description="Learn about Sonoscan Healthcare's journey from 1990 to becoming Eastern India's largest diagnostic service provider. Our mission, values, and commitment to affordable quality healthcare."
      />
      {/* ═══ Hero Section ═══ */}
      <section className="rounded-b-4xl relative overflow-hidden min-h-screen bg-[#0a0715] -mt-16 lg:-mt-28">
        {/* Background image with slide-in animation */}
        <div className="absolute inset-0 overflow-hidden">
          <img
            src="../images/about.png"
            alt="Medical team"
            className="w-full h-full object-cover animate-slide-in-top"
            loading="eager"
          />
        </div>

        {/* Violet gradient overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'linear-gradient(90deg, #5552e7, rgba(85,82,231,0.55) 45%, rgba(255,255,255,0))', zIndex: 3 }}
        />

        {/* Subtle dot pattern */}
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, #5552e7 1px, transparent 0)', backgroundSize: '40px 40px' }} />

        {/* Load overlay — fades out to reveal content */}
        <div className="absolute inset-0 z-40 pointer-events-none bg-[#0a0715] animate-overlay-fade" />

        {/* Text content */}
        <div className="container relative z-30 max-w-7xl mx-auto px-6 h-screen flex items-center pt-16 lg:pt-28">
          <div className="max-w-2xl">
            {/* Badge */}
            <div
              className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium mb-6 border border-white/10 opacity-0 animate-fade-in-up"
              style={{ animationDelay: '900ms', animationFillMode: 'forwards' }}
            >
              About Us
            </div>
            {/* Heading */}
            <h1
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-[1.1] mb-6 opacity-0 animate-fade-in-up"
              style={{ animationDelay: '1100ms', animationFillMode: 'forwards' }}
            >
              Eastern India's Most Trusted{' '}
              <span className="text-violet-300">Diagnostic Centre</span>
            </h1>
            {/* Description */}
            <p
              className="text-lg lg:text-xl text-slate-300 leading-relaxed max-w-xl mb-10 opacity-0 animate-fade-in-up"
              style={{ animationDelay: '1300ms', animationFillMode: 'forwards' }}
            >
              Since 1990, SONOSCAN has been providing quality healthcare at an affordable cost. Today we serve over 1 lakh patients every month across 4 branches in West Bengal.
            </p>
            {/* CTA Button */}
            <div className="opacity-0 animate-fade-in-up" style={{ animationDelay: '1500ms', animationFillMode: 'forwards' }}>
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
            </div>
          </div>
        </div>

        <BrandWave variant="white" />
      </section>

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
          </div>
        </section>
      </Reveal>

      {/* ═══ About / Features Section ═══ */}
      <section className="py-20 lg:py-28 bg-bg-base relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 -translate-y-1/2 -left-40 w-[600px] h-[600px] bg-violet-500/[0.04] rounded-full blur-3xl animate-float-slow" />
          <div className="absolute -bottom-32 -right-32 w-[400px] h-[400px] bg-violet-500/[0.03] rounded-full blur-3xl animate-float" />
          <div className="absolute inset-0 opacity-[0.015]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, #5552e7 1px, transparent 0)', backgroundSize: '40px 40px' }} />
        </div>

        <div className="relative max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* ── Left column: Content ── */}
            <Reveal direction="left" threshold={0.1}>
              <div>
                {/* Section badge */}
                <div className="inline-flex items-center gap-2 bg-violet-100 text-violet-700 px-4 py-2 rounded-full text-sm font-medium mb-6 border border-violet-200">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
                  </svg>
                  Your Health, Our Priority
                </div>

                {/* Heading */}
                <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 leading-[1.2] mb-6">
                  We Always Ensure the Best{' '}
                  <span className="text-violet-600">Diagnostic Services</span>{' '}
                  for Your Health
                </h2>

                <p className="text-slate-500 leading-relaxed mb-10">
                  SONOSCAN, the best diagnostic centre in Kolkata, started its journey with a mission to provide quality healthcare, at an affordable cost for society. Today this healthcare organization treats more than one lakh patients per month — the Single Largest Diagnostic Service Provider in the Eastern zone.
                </p>

                {/* Features list */}
                <div className="space-y-6">
                  {[
                    {
                      icon: (
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418" />
                        </svg>
                      ),
                      title: 'State-of-the-Art Technology',
                      description: '3 Tesla silent MRI, 128 slice CT Scan, DR system X-Ray, and advanced Pathology Laboratory with PCR, GEN-EXPERT, Histopathology, and Liquid Based Cytology.',
                    },
                    {
                      icon: (
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                        </svg>
                      ),
                      title: 'Affordable Healthcare for All',
                      description: 'Our core mission is to provide quality healthcare at an affordable cost. We offer transparent pricing across all diagnostic tests and health check packages.',
                    },
                    {
                      icon: (
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
                        </svg>
                      ),
                      title: '24×7 Emergency Services',
                      description: 'Round-the-clock emergency healthcare services available in Kolkata, Malda, and Balurghat with fully-equipped facilities ready to handle any medical situation.',
                    },
                    {
                      icon: (
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
                        </svg>
                      ),
                      title: '44+ Specialist Doctors',
                      description: 'A multidisciplinary team of reputed Pathologists, Radiologists, Cardiologists, Neurologists, and other specialists providing comprehensive diagnostic care.',
                    },
                  ].map((feature, i) => (
                    <Reveal key={feature.title} direction="left" delay={i * 80} threshold={0.1}>
                      <div className="group flex items-start gap-5 p-5 rounded-2xl transition-all duration-300 hover:bg-bg-card hover:shadow-lg hover:shadow-violet-500/10 hover:border hover:border-violet-200">
                        <div className="w-14 h-14 bg-gradient-to-br from-violet-100 to-violet-50 group-hover:from-violet-500 group-hover:to-violet-600 rounded-2xl flex items-center justify-center text-violet-600 group-hover:text-white shrink-0 transition-all duration-300 shadow-sm group-hover:shadow-lg group-hover:shadow-violet-500/30">
                          {feature.icon}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-lg font-bold text-slate-900 mb-1 group-hover:text-violet-600 transition-colors duration-300">
                            {feature.title}
                          </h3>
                          <p className="text-slate-500 leading-relaxed text-sm group-hover:text-slate-600 transition-colors duration-300">
                            {feature.description}
                          </p>
                        </div>
                        <svg className="w-5 h-5 text-violet-300 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 shrink-0 mt-1" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                        </svg>
                      </div>
                    </Reveal>
                  ))}
                </div>

                {/* CTA */}
                <Reveal direction="up" delay={400} threshold={0.1}>
                  <div className="mt-10 pt-8 border-t border-violet-100">
                    <Link
                      to="/appointments"
                      className="group inline-flex items-center gap-3 bg-violet-600 hover:bg-violet-700 text-white px-7 py-3.5 rounded-xl font-semibold transition-all hover:shadow-xl hover:shadow-violet-500/25 active:scale-[0.98]"
                    >
                      Book a Diagnostic Test
                      <svg className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                      </svg>
                    </Link>
                  </div>
                </Reveal>
              </div>
            </Reveal>

            {/* ── Right column: Building slideshow with logo ── */}
            <Reveal direction="right" delay={200} threshold={0.1}>
              <div className="relative">
                {/* Main card — building slideshow */}
                <div className="bg-bg-card rounded-3xl border border-violet-200 shadow-2xl shadow-violet-500/10 p-8 lg:p-10">
                  <BuildingSlideshow />
                </div>

                {/* Logo card */}
                <div className="absolute -bottom-5 -right-5 lg:-bottom-7 lg:-right-7 bg-white rounded-2xl border border-violet-200 shadow-xl p-6 lg:p-8 hidden sm:block animate-float-slow">
                  <img
                    src="../images/logo.png"
                    alt="Sonoscan Healthcare"
                    className="h-20 lg:h-16 w-auto object-contain"
                  />
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ═══ Timeline Section ═══ */}
      <SonoscanTimeline />

      {/* ═══ Core Values ═══ */}
      <section className="py-20 lg:py-28 bg-bg-base relative overflow-hidden">
        <div className="relative">
          <CoreValuesSection />
        </div>
      </section>

      {/* ═══ Accreditations ═══ */}
      <section className="py-20 lg:py-28 bg-bg-surface relative overflow-hidden">
        <AccreditationsSection />
      </section>

      {/* ═══ Testimonials ═══ */}
      <section className="py-20 lg:py-28 bg-bg-base relative overflow-hidden">
        <TestimonialCarousel />
      </section>

      {/* ═══ Branch Locations ═══ */}
      <BranchLocationsGrid />
    </>
  )
}
