import { Link, Outlet, useLocation } from '@tanstack/react-router'
import { useState, useEffect, Suspense, useRef, useCallback } from 'react'
import PageFallback from './PageFallback'
import { BranchProvider, useBranch } from '../../context/BranchContext'
import { branches, primaryNumber } from '../../data/branches'
import BranchSelector from './BranchSelector'

const TOTAL_SERVICE_ITEMS = branches.length + 1 // branches + "View All Branches"
const PAGE_SIZE = 3

const topBarSocials = [
  {
    name: 'facebook',
    href: 'https://www.facebook.com/SonoscanDiagnostic/',
    icon: <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" /></svg>,
  },
  {
    name: 'instagram',
    href: 'https://www.instagram.com/sonoscan_healthcare/',
    icon: <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" /></svg>,
  },
  {
    name: 'linkedin',
    href: 'https://www.linkedin.com/company/sonoscan-healthcare-pvt-ltd',
    icon: <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>,
  },
  {
    name: 'youtube',
    href: 'https://www.youtube.com/@sonoscanhealthcarewb',
    icon: <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" /></svg>,
  },
]

const socialIconStyles = {
  facebook: 'hover:bg-blue-600',
  instagram: 'hover:bg-pink-600',
  linkedin: 'hover:bg-sky-700',
  youtube: 'hover:bg-red-600',
}

function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [servicesOpen, setServicesOpen] = useState(false)
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false)
  const [focusedIndex, setFocusedIndex] = useState(-1)
  const servicesRef = useRef<HTMLDivElement>(null)
  const servicesToggleRef = useRef<HTMLButtonElement>(null)
  const serviceItemRefs = useRef<(HTMLAnchorElement | null)[]>([])

  // Reset branchItemRefs array length
  serviceItemRefs.current = serviceItemRefs.current.slice(0, TOTAL_SERVICE_ITEMS)

  // Close dropdown and reset focus
  const closeServices = useCallback(() => {
    setServicesOpen(false)
    setFocusedIndex(-1)
    servicesToggleRef.current?.focus()
  }, [])

  // Open dropdown and focus first item
  const openServices = useCallback(() => {
    setServicesOpen(true)
    setFocusedIndex(0)
  }, [])

  const handleToggleKeyDown = useCallback((e: React.KeyboardEvent) => {
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault()
        if (!servicesOpen) {
          openServices()
        } else {
          setFocusedIndex(prev => (prev < TOTAL_SERVICE_ITEMS - 1 ? prev + 1 : 0))
        }
        break
      case 'ArrowUp':
        e.preventDefault()
        if (!servicesOpen) {
          openServices()
          setFocusedIndex(TOTAL_SERVICE_ITEMS - 1)
        } else {
          setFocusedIndex(prev => (prev > 0 ? prev - 1 : TOTAL_SERVICE_ITEMS - 1))
        }
        break
      case 'Home':
        e.preventDefault()
        if (!servicesOpen) openServices()
        else setFocusedIndex(0)
        break
      case 'End':
        e.preventDefault()
        if (!servicesOpen) openServices()
        setFocusedIndex(TOTAL_SERVICE_ITEMS - 1)
        break
      case 'PageUp':
        e.preventDefault()
        if (!servicesOpen) {
          openServices()
        } else {
          setFocusedIndex(prev => Math.max(0, prev - PAGE_SIZE))
        }
        break
      case 'PageDown':
        e.preventDefault()
        if (!servicesOpen) {
          openServices()
        } else {
          setFocusedIndex(prev => Math.min(TOTAL_SERVICE_ITEMS - 1, prev + PAGE_SIZE))
        }
        break
      case 'Enter':
      case ' ':
        e.preventDefault()
        if (!servicesOpen) {
          openServices()
        } else {
          closeServices()
        }
        break
      case 'Escape':
        if (servicesOpen) {
          e.preventDefault()
          closeServices()
        }
        break
    }
  }, [servicesOpen, openServices, closeServices])

  const handleDropdownKeyDown = useCallback((e: React.KeyboardEvent) => {
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault()
        setFocusedIndex(prev => (prev < TOTAL_SERVICE_ITEMS - 1 ? prev + 1 : 0))
        break
      case 'ArrowUp':
        e.preventDefault()
        setFocusedIndex(prev => (prev > 0 ? prev - 1 : TOTAL_SERVICE_ITEMS - 1))
        break
      case 'Home':
        e.preventDefault()
        setFocusedIndex(0)
        break
      case 'End':
        e.preventDefault()
        setFocusedIndex(TOTAL_SERVICE_ITEMS - 1)
        break
      case 'PageUp':
        e.preventDefault()
        setFocusedIndex(prev => Math.max(0, prev - PAGE_SIZE))
        break
      case 'PageDown':
        e.preventDefault()
        setFocusedIndex(prev => Math.min(TOTAL_SERVICE_ITEMS - 1, prev + PAGE_SIZE))
        break
      case 'Enter':
        e.preventDefault()
        if (focusedIndex >= 0 && focusedIndex < TOTAL_SERVICE_ITEMS) {
          const el = serviceItemRefs.current[focusedIndex]
          if (el) {
            el.click()  // triggers onClick={closeServices} on the link
          }
        }
        break
      case 'Escape':
        e.preventDefault()
        closeServices()
        break
      case 'Tab':
        closeServices()
        break
    }
  }, [focusedIndex, closeServices])

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-xl border-b border-slate-200 shadow-sm shadow-black/5">
      {/* Top bar */}
      <div className="hidden lg:block bg-slate-950 border-b border-violet-100 text-sm">
        <div className="max-w-screen-2xl mx-auto px-6 py-2 flex items-center justify-between">
          <div className="flex items-center gap-6">
            {/* Location Selector */}
            <BranchSelector variant="navbar" showDoctorCount={false} />

            <span className="flex items-center gap-2 text-slate-300">
              <svg className="w-4 h-4 text-violet-500" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
              </svg>
              Mon - Fri: 9:00 AM - 11:00 PM
            </span>
          </div>
          {/* Social site menu */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400 font-medium uppercase tracking-wider mr-1">Follow Us</span>
            <div className="flex items-center gap-1">
              {topBarSocials.map(social => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                  className={`w-8 h-8 rounded-full bg-white/10 border border-white/10 flex items-center justify-center text-slate-300 transition-all hover:scale-110 hover:text-white ${socialIconStyles[social.name as keyof typeof socialIconStyles] ?? 'hover:bg-white/20'}`}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="max-w-screen-2xl mx-auto px-6">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-56 h-20    flex items-center justify-center    group-hover:shadow-violet-500/40 transition-shadow">
              <img src="../images/logo.png" alt="sonoscan" />
            </div>
           
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-5 xl:gap-9">
            <NavLink to="/">Home</NavLink>
            <NavLink to="/about">About</NavLink>
            {/* Services Dropdown */}
            <div
              ref={servicesRef}
              className="relative"
              onMouseEnter={() => setServicesOpen(true)}
              onMouseLeave={() => { setServicesOpen(false); setFocusedIndex(-1) }}
              onFocus={() => setServicesOpen(true)}
              onBlur={(e) => {
                if (!e.currentTarget.contains(e.relatedTarget as Node)) {
                  setServicesOpen(false)
                  setFocusedIndex(-1)
                }
              }}
            >
              <button
                ref={servicesToggleRef}
                onClick={() => setServicesOpen(!servicesOpen)}
                onKeyDown={handleToggleKeyDown}
                aria-haspopup="true"
                aria-expanded={servicesOpen}
                aria-label="Services menu"
                className="flex items-center gap-1 text-slate-600 hover:text-violet-600 font-medium transition-colors relative after:absolute after:bottom-[-4px] after:left-0 after:w-full after:h-0.5 after:bg-violet-500 after:scale-x-0 after:origin-right after:transition-transform hover:after:scale-x-100 hover:after:origin-left"
              >
                Services
                <svg
                  className={`w-4 h-4 transition-transform duration-200 ${servicesOpen ? 'rotate-180' : ''}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                </svg>
              </button>

              {servicesOpen && (
                <div
                  className="absolute top-full left-1/2 -translate-x-1/2 pt-2"
                  role="menu"
                  aria-label="Select a branch service"
                  aria-activedescendant={focusedIndex >= 0 ? `service-item-${focusedIndex}` : undefined}
                  onKeyDown={handleDropdownKeyDown}
                >
                  <div className="bg-white rounded-xl shadow-xl shadow-black/10 border border-violet-200 py-3 w-64 animate-fade-in-down">
                    {branches.map((branch, i) => {
                      const isFocused = focusedIndex === i
                      return (
                        <Link
                          key={branch.id}
                          ref={el => { serviceItemRefs.current[i] = el }}
                          id={`service-item-${i}`}
                          role="menuitem"
                          to="/services/$id"
                          params={{ id: branch.id }}
                          className={`flex items-center gap-4 px-5 py-3 text-slate-600 transition-colors group ${i < branches.length - 1 ? 'border-b border-violet-100' : ''} ${
                            isFocused
                              ? 'bg-violet-50/70 text-violet-600'
                              : 'hover:text-violet-600 hover:bg-violet-50/70'
                          }`}
                          onClick={() => closeServices()}
                          onMouseEnter={() => setFocusedIndex(i)}
                        >
                          <span className="w-8 h-8 rounded-lg bg-violet-100 flex items-center justify-center shrink-0">
                            <svg className="w-4 h-4 text-violet-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                          </span>
                          <div>
                            <p className={`text-sm font-medium transition-colors ${
                              isFocused ? 'text-violet-700' : 'text-slate-900 group-hover:text-violet-600'
                            }`}>{branch.name}</p>
                            <p className="text-xs text-slate-400">{branch.address}</p>
                          </div>
                        </Link>
                      )
                    })}
                    <Link
                      ref={el => { serviceItemRefs.current[TOTAL_SERVICE_ITEMS - 1] = el }}
                      id={`service-item-${TOTAL_SERVICE_ITEMS - 1}`}
                      role="menuitem"
                      to="/services"
                      className={`flex items-center gap-2 px-5 py-3 text-sm font-medium transition-colors ${
                        focusedIndex === TOTAL_SERVICE_ITEMS - 1
                          ? 'bg-violet-50/70 text-violet-700'
                          : 'text-violet-600 hover:bg-violet-50/70'
                      }`}
                      onClick={() => closeServices()}
                      onMouseEnter={() => setFocusedIndex(TOTAL_SERVICE_ITEMS - 1)}
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                      </svg>
                      View All Branches
                    </Link>
                  </div>
                </div>
              )}
            </div>

            <NavLink to="/outdoor-doctor">Outdoor Doctor</NavLink>
            <NavLink to="/gallery">Gallery</NavLink>
            <NavLink to="/career">Career</NavLink>
            <NavLink to="/contact">Contact Us</NavLink>
            <Link
              to="/appointments"
              className="bg-violet-600 hover:bg-violet-700 text-white px-6 py-2.5 rounded-lg font-medium transition-all hover:shadow-lg hover:shadow-violet-500/30 active:scale-95"
            >
              Book Appointment
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 rounded-lg hover:bg-violet-50 transition-colors"
            aria-label="Toggle menu"
          >
            {isOpen ? (
              <svg className="w-6 h-6 text-slate-600" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6 text-slate-600" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="lg:hidden pb-6 border-t border-slate-200 animate-fade-in-up">
            <div className="flex flex-col gap-2 pt-4">
              <MobileNavLink to="/" onClick={() => setIsOpen(false)}>Home</MobileNavLink>
              <MobileNavLink to="/about" onClick={() => setIsOpen(false)}>About</MobileNavLink>
              {/* Mobile Services Accordion */}
              <div>
                <button
                  onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                  className="flex w-full items-center justify-between text-slate-700 hover:text-violet-600 hover:bg-violet-50 px-4 py-3 rounded-lg font-medium transition-colors"
                >
                  Services
                  <svg
                    className={`w-4 h-4 transition-transform duration-200 ${mobileServicesOpen ? 'rotate-180' : ''}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                  </svg>
                </button>
                {mobileServicesOpen && (
                  <div className="ml-4 mt-1 space-y-1 pb-2 animate-fade-in-down">
                    {branches.map((branch) => (
                      <Link
                        key={branch.id}
                        to="/services/$id"
                        params={{ id: branch.id }}
                        onClick={() => { setMobileServicesOpen(false); setIsOpen(false) }}
                        className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm text-slate-600 hover:text-violet-600 hover:bg-violet-50 transition-colors"
                      >
                        <span className="w-7 h-7 rounded-md bg-violet-100 flex items-center justify-center shrink-0">
                          <svg className="w-3.5 h-3.5 text-violet-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                        </span>
                        {branch.name}
                      </Link>
                    ))}
                    <Link
                      to="/services"
                      onClick={() => { setMobileServicesOpen(false); setIsOpen(false) }}
                      className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium text-violet-600 hover:bg-violet-50 transition-colors"
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                      </svg>
                      View All Branches
                    </Link>
                  </div>
                )}
              </div>
              <MobileNavLink to="/outdoor-doctor" onClick={() => setIsOpen(false)}>Outdoor Doctor</MobileNavLink>
              <MobileNavLink to="/gallery" onClick={() => setIsOpen(false)}>Gallery</MobileNavLink>
              <MobileNavLink to="/career" onClick={() => setIsOpen(false)}>Career</MobileNavLink>
              <MobileNavLink to="/contact" onClick={() => setIsOpen(false)}>Contact Us</MobileNavLink>
              <Link
                to="/appointments"
                onClick={() => setIsOpen(false)}
                className="mt-2 bg-violet-600 hover:bg-violet-700 text-white text-center px-6 py-3 rounded-lg font-medium transition-all"
              >
                Book Appointment
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}

function NavLink({ to, children }: { to: string; children: React.ReactNode }) {
  return (
    <Link
      to={to}
      activeProps={() => ({ className: 'text-violet-600 font-semibold' })}
      className="text-slate-600 hover:text-violet-600 font-medium transition-colors relative after:absolute after:bottom-[-4px] after:left-0 after:w-full after:h-0.5 after:bg-violet-500 after:scale-x-0 after:origin-right after:transition-transform hover:after:scale-x-100 hover:after:origin-left"
    >
      {children}
    </Link>
  )
}

function MobileNavLink({ to, onClick, children }: { to: string; onClick: () => void; children: React.ReactNode }) {
  return (
    <Link
      to={to}
      onClick={onClick}
      className="text-slate-700 hover:text-violet-600 hover:bg-violet-50 px-4 py-3 rounded-lg font-medium transition-colors"
    >
      {children}
    </Link>
  )
}

function SplashScreen() {
  const [visible, setVisible] = useState(true)
  const [fadeOut, setFadeOut] = useState(false)

  useEffect(() => {
    const fadeTimer = setTimeout(() => setFadeOut(true), 2500)
    const removeTimer = setTimeout(() => setVisible(false), 3000)

    return () => {
      clearTimeout(fadeTimer)
      clearTimeout(removeTimer)
    }
  }, [])

  if (!visible) return null

  return (
    <div
      role="status"
      aria-label="Loading Sonoscan Healthcare"
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#0a0715] transition-opacity duration-500 ease-out ${
        fadeOut ? 'opacity-0' : 'opacity-100'
      }`}
    >
      {/* Subtle radial gradient for depth */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,rgba(168,85,247,0.12),transparent_70%)]" />

      {/* Logo */}
      
      <div className="relative animate-splash-logo animate-splash-logo-float mb-8">
        <div className="w-64 h-28 p-4 bg-white  rounded-2xl flex items-center justify-center">
          <img src="../images/logo.png" alt="sonoscan" />
          
        </div>
      </div>

      {/* Brand Name */}
      <div className="relative text-center mb-4">
        <h1 className="text-4xl font-bold animate-fade-in-up animate-splash-title-pulse">
          <span className="text-white">Sonoscan</span>
          <span className="text-violet-300">Healthcare</span>
        </h1>
      </div>

      {/* Tagline */}
      <div className="animate-fade-in-up" style={{ animationDelay: '500ms' }}>
        <p className="relative text-violet-300/60 text-sm mb-2 animate-splash-title-pulse">
          Eastern India's most trusted diagnostic center.
        </p>
      </div>
      <div className="animate-fade-in-up" style={{ animationDelay: '650ms' }}>
        <p className="relative text-slate-500 text-xs mb-10 animate-splash-title-pulse">
          Trusted Healthcare Provider Since 1990
        </p>
      </div>

      {/* Pulsing dots */}
      <div className="relative flex items-center gap-2">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="w-2.5 h-2.5 rounded-full bg-violet-400/80 animate-splash-dot"
            style={{ animationDelay: `${i * 0.3}s` }}
          />
        ))}
      </div>
    </div>
  )
}

function ScrollToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 400)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <button
      onClick={scrollToTop}
      aria-label="Scroll to top"
      className={`fixed bottom-8 right-8 z-50 w-14 h-14 bg-gradient-to-br from-violet-500 to-violet-700 hover:from-violet-600 hover:to-violet-800 text-white rounded-2xl shadow-xl shadow-violet-500/30 hover:shadow-violet-500/50 flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 ${
        visible
          ? 'opacity-100 translate-y-0 pointer-events-auto'
          : 'opacity-0 translate-y-4 pointer-events-none'
      }`}
    >
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 10.5 12 3m0 0 7.5 7.5M12 3v18" />
      </svg>
    </button>
  )
}

/**
 * Returns a context-aware WhatsApp message based on the current page path.
 */
function getWhatsAppMessage(pathname: string): string {
  const path = pathname.replace(/\/$/, '') // strip trailing slash

  if (path === '/about') {
    return 'Hi! I was reading about Sonoscan Healthcare and would like to know more about your clinic\'s history, mission, and accreditations. Can you share more details?'
  }
  if (path === '/services' || path === '/services/') {
    return 'Hi! I am interested in your diagnostic services. Could you share details about pathology tests, radiology scans, and other services available at Sonoscan Healthcare?'
  }
  if (path.startsWith('/services/')) {
    const serviceSlug = path.split('/services/')[1]
    const serviceNames: Record<string, string> = {
      'primary-care': 'Pathology & Lab Diagnostics',
      'mental-health': 'Radiology & Imaging',
      'dental-care': 'Multi-Specialty OPD',
      'eye-care': 'Health Check Packages',
    }
    const serviceName = serviceNames[serviceSlug] || 'diagnostic services'
    return `Hi! I am interested in ${serviceName} at Sonoscan Healthcare. Could you please share more details about the tests, pricing, and how I can book an appointment?`
  }
  if (path === '/appointments') {
    return 'Hi! I would like to book an appointment at Sonoscan Healthcare. Could you help me with the available slots and which doctor I should consult for my health concerns?'
  }
  if (path === '/contact') {
    return 'Hi! I am trying to get in touch with Sonoscan Healthcare. Could you help me with my query or connect me with the right department?'
  }
  if (path === '/gallery') {
    return 'Hi! I was browsing the Sonoscan Healthcare gallery and would like to know more about your facilities and diagnostic services.'
  }
  if (path.startsWith('/doctors')) {
    return 'Hi! I would like to know more about the specialist doctors at Sonoscan Healthcare. Can you share details about their availability and how I can book a consultation?'
  }
  // Default: home page and any other page
  return 'Hi! I would like to know more about Sonoscan Healthcare diagnostic services. Can you share details about pathology tests, radiology scans, and health check packages available at your centre?'
}

function PhoneButton() {
  const { selectedBranch } = useBranch()
  return (
    <a
      href={`tel:+91${primaryNumber(selectedBranch.phone)}`}
      aria-label="Call us"
      style={{ animationDelay: '2s' }}
      className="fixed bottom-52 right-8 z-50 w-14 h-14 bg-gradient-to-br from-violet-500 to-violet-700 hover:from-violet-400 hover:to-violet-600 text-white rounded-2xl shadow-xl shadow-violet-500/30 hover:shadow-violet-500/50 flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 group animate-fade-in-up"
    >
      {/* Tooltip */}
      <span className="absolute right-16 bg-slate-900 text-white text-xs font-medium px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap shadow-lg pointer-events-none">
        Call {selectedBranch.name}: {selectedBranch.phone}
      </span>
      {/* Pulse ring */}
      <span className="absolute inset-0 rounded-2xl bg-violet-500/30 animate-ping opacity-20 group-hover:opacity-30" />
      {/* Phone Icon */}
      <svg className="w-7 h-7 relative z-10" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
      </svg>
    </a>
  )
}

function WhatsAppButton() {
  const { pathname } = useLocation()
  const { selectedBranch } = useBranch()
  const message = encodeURIComponent(getWhatsAppMessage(pathname))
  const whatsappUrl = `https://wa.me/91${primaryNumber(selectedBranch.whatsapp)}?text=${message}`

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      style={{ animationDelay: '2.5s' }}
      className="fixed bottom-36 right-8 z-50 w-14 h-14 bg-gradient-to-br from-emerald-500 to-green-600 hover:from-emerald-400 hover:to-green-500 text-white rounded-2xl shadow-xl shadow-emerald-500/30 hover:shadow-emerald-500/50 flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 group animate-fade-in-up"
    >
      {/* Tooltip */}
      <span className="absolute right-16 bg-slate-900 text-white text-xs font-medium px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap shadow-lg pointer-events-none">
        Chat with us on WhatsApp
      </span>
      {/* Pulse ring */}
      <span className="absolute inset-0 rounded-2xl bg-emerald-500/30 animate-ping opacity-20 group-hover:opacity-30" />
      {/* WhatsApp Icon */}
      <svg className="w-7 h-7 relative z-10" viewBox="0 0 24 24" fill="currentColor">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
      </svg>
    </a>
  )
}

function Footer() {
  const { selectedBranch } = useBranch()
  return (
    <footer className="bg-white text-slate-800 border-t border-slate-200">
      {/* Newsletter Section */}
      <div className="border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 py-12 lg:py-16">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl lg:text-3xl font-bold mb-2 text-slate-900">Stay Updated</h3>
              <p className="text-slate-500">Subscribe to our newsletter for health tips and clinic updates.</p>
            </div>
            <div className="flex gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                aria-label="Email address for newsletter"
                className="flex-1 px-5 py-3 rounded-lg bg-slate-50 text-slate-900 placeholder-slate-400 border border-slate-200 focus:outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 transition-all"
              />
              <button className="bg-violet-600 hover:bg-violet-700 text-white px-6 py-3 rounded-lg font-medium transition-all hover:shadow-lg hover:shadow-violet-500/25 whitespace-nowrap">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-6 py-12 lg:py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="w-56 h-20 mb-4 flex items-center justify-center">
              <img src="../images/logo.png" alt="Sonoscan Healthcare" className="max-w-full max-h-full object-contain" />
            </div>
            <p className="text-slate-500 mb-6 leading-relaxed">
              Sonoscan Healthcare is a leading diagnostic centre in West Bengal, offering comprehensive pathology, radiology, and multi-specialty OPD services across Kolkata, Malda, Balurghat, and Gangarampur.
            </p>
            <div className="flex gap-3 flex-wrap">
              {[
                {
                  name: 'facebook',
                  href: 'https://www.facebook.com/SonoscanDiagnostic/',
                  icon: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" /></svg>,
                },
                {
                  name: 'instagram',
                  href: 'https://www.instagram.com/sonoscan_healthcare/',
                  icon: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" /></svg>,
                },
                {
                  name: 'linkedin',
                  href: 'https://www.linkedin.com/company/sonoscan-healthcare-pvt-ltd',
                  icon: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>,
                },
                {
                  name: 'youtube',
                  href: 'https://www.youtube.com/@sonoscanhealthcarewb',
                  icon: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" /></svg>,
                },
                {
                  name: 'whatsapp',
                  href: `https://wa.me/91${primaryNumber(selectedBranch.whatsapp)}`,
                  icon: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>,
                },
              ].map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-10 h-10 rounded-xl border flex items-center justify-center transition-all ${
                    social.name === 'whatsapp'
                      ? 'bg-emerald-500 hover:bg-emerald-600 text-white border-emerald-500 hover:border-emerald-600'
                      : 'bg-slate-100 hover:bg-violet-600 text-slate-500 hover:text-white border-slate-200 hover:border-violet-500'
                  }`}
                  aria-label={social.name}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-slate-900 mb-5">Quick Links</h4>
            <ul className="space-y-3">
              {[
                { label: 'Home', to: '/' },
                { label: 'About Us', to: '/about' },
                { label: 'Our Services', to: '/services' },
                { label: 'Outdoor Doctor', to: '/outdoor-doctor' },

                { label: 'Gallery', to: '/gallery' },
                { label: 'Career', to: '/career' },
                { label: 'Contact Us', to: '/contact' },
                { label: 'Book Appointment', to: '/appointments' },
              ].map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    className="text-slate-500 hover:text-violet-600 transition-colors flex items-center gap-2"
                  >
                    <svg className="w-3 h-3 text-violet-500" fill="currentColor" viewBox="0 0 12 12">
                      <path d="M4.5 2.25L7.5 6L4.5 9.75" stroke="currentColor" strokeWidth="1.5" fill="none" />
                    </svg>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold text-slate-900 mb-5">Our Services</h4>
            <ul className="space-y-3">
              {[
                { name: 'Primary Care', id: 'primary-care' },
                { name: 'Mental Health', id: 'mental-health' },
                { name: 'Dental Care', id: 'dental-care' },
                { name: 'Eye Care', id: 'eye-care' },
              ].map((service) => (
                <li key={service.id}>
                  <Link
                    to="/services/$id"
                    params={{ id: service.id }}
                    className="text-slate-500 hover:text-violet-600 transition-colors flex items-center gap-2"
                  >
                    <svg className="w-3 h-3 text-violet-500" fill="currentColor" viewBox="0 0 12 12">
                      <path d="M4.5 2.25L7.5 6L4.5 9.75" stroke="currentColor" strokeWidth="1.5" fill="none" />
                    </svg>
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-slate-900 mb-5">Contact Info</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 text-violet-500 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                </svg>
                <div>
                  <span className="text-slate-600 block">{selectedBranch.name}: {selectedBranch.address}</span>
                  <span className="text-slate-400 text-sm">Other branches: Malda, Balurghat & Gangarampur</span>
                </div>
              </li>

              {/* Park Clinic */}
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 text-violet-500 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                </svg>
                <div>
                  <span className="text-slate-600 block font-medium">Park Clinic</span>
                  <span className="text-slate-400 text-xs">Technically Supported by SONOSCAN</span>
                  <span className="text-slate-500 block text-sm mt-1">4, Gorky Terrace, Kolkata - 700017</span>
                  <span className="text-slate-400 text-xs block mt-0.5">Phone: 9775992022 / 9775992024</span>
                </div>
              </li>

              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 text-violet-500 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
                </svg>
                <div>
                  <span className="text-slate-600 block">{selectedBranch.phone}</span>
                  <span className="text-slate-400 text-sm">WhatsApp: {selectedBranch.whatsapp}</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 text-violet-500 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                </svg>
                <span className="text-slate-600">info@sonoscanhealthcare.com</span>
              </li>
            </ul>

            {/* Other Units */}
            <details className="group mt-5">
              <summary className="flex items-center gap-2 cursor-pointer text-sm font-medium text-violet-600 hover:text-violet-700 transition-colors">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" />
                </svg>
                View All Other Units (7)
                <svg className="w-3 h-3 ml-auto group-open:rotate-180 transition-transform" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                </svg>
              </summary>
              <div className="mt-3 space-y-2 pl-2">
                <div className="text-xs text-slate-500 border-l-2 border-violet-200 pl-3">
                  <p className="font-medium text-slate-600">C.T. Scan Unit</p>
                  <p>Malda Medical College & Hospital, Malda — 9775990400</p>
                </div>
                <div className="text-xs text-slate-500 border-l-2 border-violet-200 pl-3">
                  <p className="font-medium text-slate-600">Buniadpur</p>
                  <p>Laxmi Market, Buniadpur, Dakshin Dinajpur — 9775990900</p>
                </div>
                <div className="text-xs text-slate-500 border-l-2 border-violet-200 pl-3">
                  <p className="font-medium text-slate-600">Balurghat</p>
                  <p>Hospital More, Balurghat — 9775996998</p>
                </div>
                <div className="text-xs text-slate-500 border-l-2 border-violet-200 pl-3">
                  <p className="font-medium text-slate-600">Chanchal</p>
                  <p>College Road, Chanchal, Malda — 9775991393</p>
                </div>
                <div className="text-xs text-slate-500 border-l-2 border-violet-200 pl-3">
                  <p className="font-medium text-slate-600">Kaliachak</p>
                  <p>Opposite Thana Gate, Kaliachak — 9775994778</p>
                </div>
                <div className="text-xs text-slate-500 border-l-2 border-violet-200 pl-3">
                  <p className="font-medium text-slate-600">Raiganj</p>
                  <p>Ukilpara, Raiganj, Uttar Dinajpur — 9775991602</p>
                </div>
              </div>
            </details>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-slate-400 text-sm">&copy; {new Date().getFullYear()} Sonoscan Healthcare. All rights reserved.</p>
          <div className="flex gap-6 text-sm">
            <Link to="/privacy" className="text-slate-400 hover:text-violet-600 transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="text-slate-400 hover:text-violet-600 transition-colors">Terms of Service</Link>
            <Link to="/cookies" className="text-slate-400 hover:text-violet-600 transition-colors">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default function RootLayout() {
  return (
    <BranchProvider>
    <div className="min-h-screen flex flex-col bg-bg-base">
      <SplashScreen />
      <Navbar />
      <main className="flex-1 pt-16 lg:pt-28">
        <Suspense fallback={<PageFallback />}>
          <Outlet />
        </Suspense>
      </main>
      <PhoneButton />
      <WhatsAppButton />
      <ScrollToTop />
      <Footer />
    </div>
    </BranchProvider>
  )
}
