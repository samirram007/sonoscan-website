import { useState, useRef, useCallback } from 'react'
import { Link, useParams } from '@tanstack/react-router'
import SEO from '../ui/SEO'
import { doctorsData } from '../../data/doctors'
import { branches } from '../../data/branches'
import { useBranch } from '../../context/BranchContext'
import { doctorHoverIcons } from '../ui/ServiceIcons'
import BrandWave from '../ui/BrandWave'

const PAGE_SIZE = 5

function slugify(name: string): string {
  return name.toLowerCase().replace(/^dr\.\s*/, '').replace(/\s+/g, '-')
}

export { doctorsData, slugify }

export default function DoctorProfilePage() {
  const { slug } = useParams({ from: '/doctors/$slug' })
  const { selectedBranch } = useBranch()
  const doctor = doctorsData[slug]

  // Hooks (must be called unconditionally, before any early returns)
  const [searchDoctor, setSearchDoctor] = useState('')
  const [focusedIndex, setFocusedIndex] = useState(-1)
  const searchRef = useRef<HTMLDivElement>(null)
  const searchInputRef = useRef<HTMLInputElement>(null)
  const resultItemRefs = useRef<(HTMLAnchorElement | null)[]>([])

  // Computed values (must be before useCallback hooks that reference them)
  const filteredDoctors = Object.values(doctorsData).filter(doc =>
    doc.branchIds.includes(selectedBranch.id) && (
      doc.name.toLowerCase().includes(searchDoctor.toLowerCase()) ||
      doc.specialty.toLowerCase().includes(searchDoctor.toLowerCase()) ||
      doc.role.toLowerCase().includes(searchDoctor.toLowerCase())
    )
  )

  resultItemRefs.current = resultItemRefs.current.slice(0, filteredDoctors.length)

  const hasResults = searchDoctor && filteredDoctors.length > 0

  const clearSearch = useCallback(() => {
    setSearchDoctor('')
    setFocusedIndex(-1)
  }, [])

  const handleInputKeyDown = useCallback((e: React.KeyboardEvent) => {
    const total = filteredDoctors.length

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault()
        if (hasResults) {
          setFocusedIndex(prev => (prev < total - 1 ? prev + 1 : 0))
        }
        break
      case 'ArrowUp':
        e.preventDefault()
        if (hasResults) {
          setFocusedIndex(prev => (prev > 0 ? prev - 1 : total - 1))
        }
        break
      case 'Home':
        e.preventDefault()
        if (hasResults) setFocusedIndex(0)
        break
      case 'End':
        e.preventDefault()
        if (hasResults) setFocusedIndex(total - 1)
        break
      case 'PageUp':
        e.preventDefault()
        if (hasResults) setFocusedIndex(prev => Math.max(0, prev - PAGE_SIZE))
        break
      case 'PageDown':
        e.preventDefault()
        if (hasResults) setFocusedIndex(prev => Math.min(total - 1, prev + PAGE_SIZE))
        break
      case 'Enter':
        if (hasResults && focusedIndex >= 0 && focusedIndex < total) {
          e.preventDefault()
          const el = resultItemRefs.current[focusedIndex]
          if (el) el.click()
        }
        break
      case 'Escape':
        if (searchDoctor) {
          e.preventDefault()
          setSearchDoctor('')
          setFocusedIndex(-1)
          searchInputRef.current?.blur()
        }
        break
    }
  }, [hasResults, focusedIndex, searchDoctor, filteredDoctors.length])

  const handleResultsKeyDown = useCallback((e: React.KeyboardEvent) => {
    const total = filteredDoctors.length

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault()
        setFocusedIndex(prev => (prev < total - 1 ? prev + 1 : 0))
        break
      case 'ArrowUp':
        e.preventDefault()
        setFocusedIndex(prev => (prev > 0 ? prev - 1 : total - 1))
        break
      case 'Home':
        e.preventDefault()
        setFocusedIndex(0)
        break
      case 'End':
        e.preventDefault()
        setFocusedIndex(total - 1)
        break
      case 'PageUp':
        e.preventDefault()
        setFocusedIndex(prev => Math.max(0, prev - PAGE_SIZE))
        break
      case 'PageDown':
        e.preventDefault()
        setFocusedIndex(prev => Math.min(total - 1, prev + PAGE_SIZE))
        break
      case 'Enter':
        e.preventDefault()
        if (focusedIndex >= 0 && focusedIndex < total) {
          const el = resultItemRefs.current[focusedIndex]
          if (el) el.click()
        }
        break
      case 'Escape':
        e.preventDefault()
        clearSearch()
        searchInputRef.current?.focus()
        break
      case 'Tab':
        clearSearch()
        break
    }
  }, [focusedIndex, filteredDoctors.length, clearSearch])

  const doctorInBranch = doctor && doctor.branchIds.includes(selectedBranch.id)

  if (!doctor) {
    return (
      <>
        <SEO title="Doctor Not Found | Sonoscan Healthcare" description="The requested doctor profile could not be found at Sonoscan Healthcare. Browse our team of expert medical professionals." />
        <section className="min-h-screen bg-bg-base flex items-center justify-center px-6">
          <div className="text-center animate-fade-in-up">
            <div className="text-6xl mb-6">🔍</div>
            <h1 className="text-3xl font-bold text-slate-900 mb-4">Doctor Not Found</h1>
            <p className="text-slate-500 mb-8">The doctor profile you're looking for doesn't exist.</p>
            <Link
              to="/doctors"
              className="bg-violet-600 hover:bg-violet-700 text-white px-8 py-3 rounded-lg font-semibold transition-all"
            >
              Browse Our Doctors
            </Link>
          </div>
        </section>
      </>
    )
  }

  if (!doctorInBranch) {
    return (
      <>
        <SEO title={`${doctor.name} | Sonoscan Healthcare`} description={`${doctor.name} is not currently available at ${selectedBranch.name}.`} />
        <section className="min-h-screen bg-bg-base flex items-center justify-center px-6">
          <div className="text-center animate-fade-in-up max-w-lg">
            <div className="w-20 h-20 mx-auto mb-6 bg-violet-100 rounded-full flex items-center justify-center">
              <svg className="w-10 h-10 text-violet-600" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-slate-900 mb-3">Not at This Branch</h1>
            <p className="text-slate-500 mb-2">
              <span className="font-semibold text-slate-700">{doctor.name}</span> is not currently practicing at our{' '}
              <span className="font-semibold text-violet-600">{selectedBranch.name}</span> branch.
            </p>
            <p className="text-slate-400 text-sm mb-8">
              Switch to a different branch where {doctor.name.split(' ').pop()} is available, or browse all doctors at {selectedBranch.name}.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link
                to="/doctors"
                className="bg-violet-600 hover:bg-violet-700 text-white px-6 py-3 rounded-lg font-semibold transition-all"
              >
                Doctors at {selectedBranch.name}
              </Link>
            </div>
            {/* Quick links to branches where doctor IS available */}
            {doctor.branchIds.length > 0 && (
              <div className="mt-6 pt-6 border-t border-violet-200">
                <p className="text-sm text-slate-500 mb-3">{doctor.name} is available at:</p>
                <div className="flex flex-wrap justify-center gap-2">
                  {doctor.branchIds.map(bid => {
                    const branch = branches.find(b => b.id === bid)
                    return branch ? (
                      <span
                        key={bid}
                        className="inline-flex items-center gap-1.5 bg-violet-100 text-violet-700 px-3 py-1.5 rounded-lg text-sm font-medium border border-violet-200"
                      >
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        {branch.name}
                      </span>
                    ) : null
                  })}
                </div>
              </div>
            )}
          </div>
        </section>
      </>
    )
  }

  const yearsOfExperience = doctor.education?.length
    ? new Date().getFullYear() - Math.min(...doctor.education.map(e => parseInt(e.year)))
    : 0

  const consultationFee = doctor.role.toLowerCase().includes('senior') ? '₹800' : '₹500'
  const patientsTreated = '5000+'

  // Only show prev/next navigation for doctors at the current branch
  const branchDoctorSlugs = Object.keys(doctorsData).filter(s =>
    doctorsData[s].branchIds.includes(selectedBranch.id)
  )
  const currentIndex = branchDoctorSlugs.indexOf(slug)
  const prevSlug = currentIndex > 0 ? branchDoctorSlugs[currentIndex - 1] : null
  const nextSlug = currentIndex < branchDoctorSlugs.length - 1 ? branchDoctorSlugs[currentIndex + 1] : null

  return (
    <>
      <SEO
        title={`${doctor.name} | Sonoscan Healthcare`}
        description={`Learn about ${doctor.name}, ${doctor.specialty} at Sonoscan Healthcare. View their profile, education, certifications, and book an appointment.`}
      />
      {/* ═══ Hero ═══ */}
      <section className="rounded-b-4xl relative overflow-hidden min-h-screen bg-[#0a0715] -mt-16 lg:-mt-28">
        {/* Background image with slide-in animation */}
        <div className="absolute inset-0 overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1551076805-e1869033e561?w=1920&q=80"
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

        <div className="container relative z-30 max-w-7xl mx-auto px-6 h-screen flex items-center pt-16 lg:pt-28">
          <div className="flex flex-wrap items-center gap-8 lg:gap-12 opacity-0 animate-fade-in-up" style={{ animationDelay: '900ms', animationFillMode: 'forwards' }}>
            {/* Avatar — photo swaps to specialty icon on hover */}
            <div className="shrink-0">
              <div className="group relative w-28 h-28 lg:w-36 lg:h-36 overflow-hidden rounded-full bg-violet-100 ring-4 ring-white/20 shadow-2xl shadow-violet-500/50 transition-all duration-500">
                {/* Doctor photo */}
                <img
                  src={doctor.image ?? 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&q=80'}
                  alt={doctor.name}
                  className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110 group-hover:brightness-50"
                  loading="lazy"
                />
                {/* Hover overlay with specialty icon */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-all duration-500 group-hover:opacity-100">
                  <div className="w-10 h-10 lg:w-12 lg:h-12 text-white drop-shadow-lg group-hover:animate-hover-pulse">
                    {doctorHoverIcons[doctor.slug] ?? (
                        <svg className="w-full h-full" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                        </svg>
                      )}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex-1 min-w-0">
              {/* Breadcrumb */}
              <nav
                className="flex items-center gap-2 text-sm text-white/60 mb-4 opacity-0 animate-fade-in-up flex-wrap"
                style={{ animationDelay: '700ms', animationFillMode: 'forwards' }}
                aria-label="Breadcrumb"
              >
                <Link
                  to="/"
                  className="text-white/60 hover:text-white transition-colors shrink-0"
                >
                  Home
                </Link>
                <svg className="w-3.5 h-3.5 text-white/30 shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                </svg>
                <Link
                  to="/about"
                  className="text-white/60 hover:text-white transition-colors shrink-0"
                >
                  Our Team
                </Link>
                <svg className="w-3.5 h-3.5 text-white/30 shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                </svg>
                <span className="text-white/80 truncate min-w-0" aria-current="page">{doctor.name}</span>
              </nav>

              {/* ── Doctor Search ── */}
              <div className="relative max-w-xs mb-4" ref={searchRef}>
                <svg
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40 pointer-events-none"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                </svg>
                <input
                  ref={searchInputRef}
                  type="text"
                  value={searchDoctor}
                  onChange={e => { setSearchDoctor(e.target.value); setFocusedIndex(-1) }}
                  onKeyDown={handleInputKeyDown}
                  placeholder="Search for a doctor..."
                  className="w-full pl-10 pr-4 py-2.5 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder:text-white/40 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500/40 focus:border-violet-400/50 transition-all"
                  role="combobox"
                  aria-expanded={searchDoctor !== ''}
                  aria-haspopup="listbox"
                  aria-autocomplete="list"
                  aria-controls="doctor-search-results"
                  aria-activedescendant={focusedIndex >= 0 ? `dr-result-${focusedIndex}` : undefined}
                  aria-label="Search for a doctor"
                />
                {/* Dropdown results */}
                {searchDoctor && filteredDoctors.length > 0 && (
                  <div
                    id="doctor-search-results"
                    role="listbox"
                    aria-label="Doctor search results"
                    aria-activedescendant={focusedIndex >= 0 ? `dr-result-${focusedIndex}` : undefined}
                    onKeyDown={handleResultsKeyDown}
                    className="absolute top-full left-0 right-0 mt-2 bg-[#1a1728] border border-white/10 rounded-xl overflow-hidden shadow-2xl z-50"
                  >
                    {filteredDoctors.map((doc, i) => {
                      const isFocused = focusedIndex === i
                      const isCurrent = doc.slug === slug
                      return (
                        <Link
                          key={doc.slug}
                          ref={el => { resultItemRefs.current[i] = el }}
                          id={`dr-result-${i}`}
                          role="option"
                          aria-selected={isCurrent}
                          to="/doctors/$slug"
                          params={{ slug: doc.slug }}
                          className={`flex items-center gap-3 px-4 py-3 text-sm transition-all duration-150 ${
                            isCurrent
                              ? 'bg-white/10 text-violet-300'
                              : isFocused
                                ? 'bg-white/15 text-white'
                                : 'text-white/80 hover:bg-white/10'
                          }`}
                          onClick={() => clearSearch()}
                          onMouseEnter={() => setFocusedIndex(i)}
                        >
                          <div className="w-8 h-8 rounded-full overflow-hidden bg-violet-500/20 shrink-0">
                            <img src={doc.image} alt={doc.name} className="w-full h-full object-cover" loading="lazy" />
                          </div>
                          <div className="min-w-0">
                            <div className={`font-medium truncate ${isCurrent ? 'text-violet-300' : isFocused ? 'text-white' : ''}`}>{doc.name}</div>
                            <div className={`text-xs truncate ${isFocused ? 'text-white/70' : 'text-white/50'}`}>{doc.specialty}</div>
                          </div>
                        </Link>
                      )
                    })}
                  </div>
                )}
                {searchDoctor && filteredDoctors.length === 0 && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-[#1a1728] border border-white/10 rounded-xl py-3 px-4 shadow-2xl z-50">
                    <p className="text-sm text-white/50">No doctors found matching your search.</p>
                  </div>
                )}
              </div>

              <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-medium mb-4 border border-white/20">
                {doctor.role}
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-[1.1] mb-2">
                {doctor.name}
              </h1>
              <p className="text-lg text-white/80">{doctor.specialty}</p>

              {/* Quick stats — with prominent branch indicator */}
              <div className="flex flex-wrap gap-4 mt-5">
                <div className="inline-flex items-center gap-1.5 bg-violet-500/20 backdrop-blur-sm text-violet-200 px-3.5 py-2 rounded-lg text-sm font-medium border border-violet-400/30 shadow-sm shadow-violet-500/10">
                  <svg className="w-4 h-4 text-violet-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span className="font-semibold">{selectedBranch.name}</span>
                  <span className="text-violet-300/60 text-xs ml-0.5">• Current Branch</span>
                </div>
                <div className="flex items-center gap-1.5 text-sm text-white/70">
                  <svg className="w-4 h-4 text-violet-300" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418" />
                  </svg>
                  {doctor.education?.length ?? 0} degrees
                </div>
                <div className="flex items-center gap-1.5 text-sm text-white/70">
                  <svg className="w-4 h-4 text-violet-300" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                  </svg>
                  {doctor.branchSchedule.find(s => s.branchId === selectedBranch.id)?.days.length ?? 0} days at {selectedBranch.name}
                </div>
                <div className="flex items-center gap-1.5 text-sm text-white/70">
                  <svg className="w-4 h-4 text-violet-300" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 0 1-.923 1.785A5.969 5.969 0 0 0 6 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337Z" />
                  </svg>
                  {doctor.languages?.length ?? 0} languages
                </div>
                {yearsOfExperience > 0 && (
                  <div className="flex items-center gap-1.5 text-sm text-white/70">
                    <svg className="w-4 h-4 text-violet-300" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>
                    {yearsOfExperience}+ yrs exp.
                  </div>
                )}
                <div className="flex items-center gap-1.5 text-sm text-white/70">
                  <svg className="w-4 h-4 text-violet-300" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
                  </svg>
                  {patientsTreated}+ patients
                </div>
                <div className="flex items-center gap-1.5 text-sm text-white/70">
                  <svg className="w-4 h-4 text-violet-300" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                  </svg>
                  {consultationFee} fee
                </div>
              </div>
            </div>
          </div>
        </div>

        <BrandWave variant="white" />
      </section>

      {/* ═══ Main Content ═══ */}
      <section className="py-16 lg:py-24 bg-bg-surface">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-3 gap-10 lg:gap-14">
            {/* Left column — Bio, Education, Publications */}
            <div className="lg:col-span-2 space-y-10">
              {/* Bio */}
              {doctor.bio && (
                <div className="animate-fade-in-up">
                  <h2 className="text-2xl font-bold text-slate-900 mb-4">About</h2>
                  <p className="text-slate-600 leading-relaxed">{doctor.bio}</p>
                </div>
              )}

              {/* Education */}
              {doctor.education && doctor.education.length > 0 && (
                <div className="animate-fade-in-up" style={{ animationDelay: '100ms' }}>
                  <h2 className="text-2xl font-bold text-slate-900 mb-5">Education & Training</h2>
                  <div className="space-y-4">
                    {doctor.education.map((edu, i) => (
                      <div key={i} className="flex gap-4">
                        <div className="w-10 h-10 bg-violet-100 rounded-xl flex items-center justify-center shrink-0 mt-0.5">
                          <svg className="w-5 h-5 text-violet-600" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342" />
                          </svg>
                        </div>
                        <div>
                          <p className="font-semibold text-slate-900">{edu.degree}</p>
                          <p className="text-sm text-slate-500">{edu.school}</p>
                          <p className="text-xs text-slate-400">{edu.year}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Career Timeline */}
              {doctor.education && doctor.education.length > 0 && (
                <div className="animate-fade-in-up" style={{ animationDelay: '150ms' }}>
                  <h2 className="text-2xl font-bold text-slate-900 mb-5 flex items-center gap-2">
                    <svg className="w-6 h-6 text-violet-600" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>
                    Career Timeline
                  </h2>
                  <div className="relative pl-8 border-l-2 border-violet-200 space-y-6">
                    {[...doctor.education].reverse().map((edu, i) => {
                      const yearsFromNow = new Date().getFullYear() - parseInt(edu.year)
                      return (
                        <div key={i} className="relative">
                          <div className="absolute -left-[calc(2rem+5px)] top-1 w-3.5 h-3.5 rounded-full bg-violet-600 border-2 border-white shadow-sm" />
                          <div className="bg-bg-card rounded-xl p-4 border border-violet-200 hover:border-violet-300 transition-all">
                            <p className="text-xs text-violet-600 font-semibold mb-1">{edu.year} — {yearsFromNow} years ago</p>
                            <p className="font-semibold text-slate-900">{edu.degree}</p>
                            <p className="text-sm text-slate-500">{edu.school}</p>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              )}

              {/* Publications */}
              {doctor.publications && doctor.publications.length > 0 && (
                <div className="animate-fade-in-up" style={{ animationDelay: '200ms' }}>
                  <h2 className="text-2xl font-bold text-slate-900 mb-5">Selected Publications</h2>
                  <div className="space-y-4">
                    {doctor.publications.map((pub, i) => (
                      <div key={i} className="bg-bg-card rounded-xl p-5 border border-violet-200">
                        <p className="text-slate-900 font-medium text-sm">{pub.title}</p>
                        <div className="flex items-center gap-3 mt-1.5 text-xs text-slate-400">
                          <span>{pub.journal}</span>
                          <span className="w-1 h-1 bg-slate-300 rounded-full" />
                          <span>{pub.year}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right sidebar */}
            <div className="space-y-8 animate-fade-in-up" style={{ animationDelay: '150ms' }}>
              {/* Certifications */}
              {doctor.certifications && doctor.certifications.length > 0 && (
                <div className="bg-bg-card rounded-2xl p-6 border border-violet-200">
                  <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wider mb-4">Certifications</h3>
                  <ul className="space-y-2.5">
                    {doctor.certifications.map((cert) => (
                      <li key={cert} className="flex items-start gap-2.5 text-sm text-slate-600">
                        <svg className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                        </svg>
                        {cert}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Specialties */}
              {doctor.specialties && doctor.specialties.length > 0 && (
                <div className="bg-bg-card rounded-2xl p-6 border border-violet-200">
                  <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wider mb-4">Specialties</h3>
                  <div className="flex flex-wrap gap-2">
                    {doctor.specialties.map((spec) => (
                      <span key={spec} className="bg-violet-100 text-violet-700 text-xs font-medium px-3 py-1.5 rounded-full border border-violet-200">
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Practicing At */}
              <div className="bg-bg-card rounded-2xl p-6 border border-violet-200">
                <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wider mb-4">
                  <span className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-violet-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    Practicing At
                  </span>
                </h3>
                <div className="space-y-2.5">
                  {doctor.branchIds.map(bid => {
                    const branch = branches.find(b => b.id === bid)
                    if (!branch) return null
                    const isActive = branch.id === selectedBranch.id
                    return (
                      <div
                        key={bid}
                        className={`flex items-start gap-3 p-3 rounded-xl ${
                          isActive
                            ? 'bg-violet-100 border border-violet-200 shadow-sm'
                            : 'bg-slate-50 border border-slate-200'
                        }`}
                      >
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5 ${
                          isActive
                            ? 'bg-violet-600 text-white'
                            : 'bg-slate-200 text-slate-500'
                        }`}>
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className={`text-sm font-semibold flex items-center gap-1.5 ${
                            isActive ? 'text-violet-700' : 'text-slate-700'
                          }`}>
                            {branch.name}
                            {isActive && (
                              <span className="text-[10px] bg-violet-200 text-violet-800 px-1.5 py-0.5 rounded-full font-medium">
                                Current
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-slate-400 mt-0.5 truncate">{branch.address}</p>
                          {/* Per-branch days */}
                          <div className="flex flex-wrap gap-1 mt-2">
                            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => {
                              const scheduleEntry = doctor.branchSchedule.find(s => s.branchId === bid)
                              const isAvailable = scheduleEntry?.days.includes(day)
                              return (
                                <span
                                  key={day}
                                  className={`text-[10px] px-1.5 py-0.5 rounded font-medium ${
                                    isAvailable
                                      ? 'bg-emerald-100 text-emerald-700'
                                      : 'bg-slate-100 text-slate-400'
                                  }`}
                                >
                                  {day.slice(0, 2)}
                                </span>
                              )
                            })}
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Languages */}
              {doctor.languages && doctor.languages.length > 0 && (
                <div className="bg-bg-card rounded-2xl p-6 border border-violet-200">
                  <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wider mb-4">Languages</h3>
                  <div className="flex flex-wrap gap-2">
                    {doctor.languages.map((lang) => (
                      <span key={lang} className="bg-slate-100 text-slate-700 text-xs font-medium px-3 py-1.5 rounded-full border border-slate-200">
                        {lang}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* OPD Weekly Schedule Calendar */}
              <div className="bg-bg-card rounded-2xl p-6 border border-violet-200">
                <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wider mb-4">
                  <span className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-violet-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>
                    OPD Schedule
                  </span>
                </h3>
                <div className="overflow-hidden rounded-xl border border-violet-200 divide-y divide-violet-100">
                  {/* Header row */}
                  <div className="bg-violet-50 grid grid-cols-7 text-center">
                    {['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(day => (
                      <div key={day} className="py-2 text-[10px] font-semibold text-violet-600 uppercase tracking-wider">{day}</div>
                    ))}
                  </div>
                  {/* Body row — check selected branch */}
                  <div className="grid grid-cols-7 text-center">
                    {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => {
                      const scheduleEntry = doctor.branchSchedule.find(s => s.branchId === selectedBranch.id)
                      const isAvailable = scheduleEntry?.days.includes(day)
                      return (
                        <div key={day} className={`py-3 border-r border-violet-100 last:border-r-0 transition-colors ${
                          isAvailable ? 'bg-emerald-50' : 'bg-slate-50'
                        }`}>
                          {isAvailable ? (
                            <div className="flex flex-col items-center gap-0.5">
                              <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-sm shadow-emerald-300" />
                              <span className="text-[10px] font-medium text-emerald-700">Available</span>
                            </div>
                          ) : (
                            <div className="flex flex-col items-center gap-0.5">
                              <div className="w-2 h-2 rounded-full bg-slate-300" />
                              <span className="text-[10px] text-slate-400">—</span>
                            </div>
                          )}
                        </div>
                      )
                    })}
                  </div>
                </div>
                {/* Mini branch legend */}
                <div className="mt-3 space-y-1.5">
                  {doctor.branchIds.map(bid => {
                    const branch = branches.find(b => b.id === bid)
                    const entry = doctor.branchSchedule.find(s => s.branchId === bid)
                    const isActive = bid === selectedBranch.id
                    return (
                      <div key={bid} className={`flex items-center gap-2 text-xs ${
                        isActive ? 'text-violet-700 font-medium' : 'text-slate-500'
                      }`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${isActive ? 'bg-violet-600' : 'bg-slate-300'}`} />
                        <span>{branch?.name ?? bid}:</span>
                        <span className="text-slate-400">{entry?.days.join(', ') ?? '—'}</span>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Patient Reviews */}
              {doctor.reviews && doctor.reviews.length > 0 && (
                <div className="bg-bg-card rounded-2xl p-6 border border-violet-200">
                  <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wider mb-4 flex items-center gap-2">
                    <svg className="w-4 h-4 text-amber-500" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                    Patient Reviews
                  </h3>
                  <div className="space-y-4">
                    {doctor.reviews.map((review, i) => (
                      <div key={i} className="bg-bg-elevated rounded-xl p-4 border border-violet-200">
                        <div className="flex items-center justify-between mb-2">
                          <p className="text-sm font-semibold text-slate-900">{review.name}</p>
                          <div className="flex items-center gap-0.5">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <svg
                                key={star}
                                className={`w-3.5 h-3.5 ${
                                  star <= review.rating ? 'text-amber-400' : 'text-slate-200'
                                }`}
                                fill="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                              </svg>
                            ))}
                          </div>
                        </div>
                        <p className="text-sm text-slate-600 leading-relaxed">&ldquo;{review.comment}&rdquo;</p>
                        <p className="text-xs text-slate-400 mt-1.5">{review.date}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Fun Fact */}
              {doctor.funFact && (
                <div className="bg-bg-card rounded-2xl p-6 border border-violet-200">
                  <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wider mb-4">Did You Know?</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">{doctor.funFact}</p>
                </div>
              )}

              {/* WhatsApp Share Button */}
              <a
                href={`https://wa.me/?text=${encodeURIComponent(`Hi! I would like to refer Dr. ${doctor.name}, ${doctor.specialty} at Sonoscan Healthcare (${selectedBranch.name} branch). They come highly recommended! You can check their profile here: ${window.location.origin}/doctors/${slug}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex w-full items-center justify-center gap-3 bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-4 rounded-xl font-semibold transition-all hover:shadow-2xl hover:shadow-emerald-500/25 active:scale-[0.98] mb-3"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Share via WhatsApp
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                </svg>
              </a>

              {/* Book Button */}
              <Link
                to="/appointments"
                className="block w-full text-center bg-violet-600 hover:bg-violet-700 text-white px-6 py-4 rounded-xl font-semibold transition-all hover:shadow-2xl hover:shadow-violet-500/25 active:scale-[0.98]"
              >
                Book Appointment with {doctor.name.split(' ')[1]}
              </Link>
            </div>
          </div>

          {/* Related Doctors — same specialty */}
          {(() => {
            const sameSpecialty = Object.values(doctorsData)
              .filter(d => d.specialty === doctor.specialty && d.slug !== slug && d.branchIds.includes(selectedBranch.id))
            if (sameSpecialty.length === 0) return null
            return (
              <div className="animate-fade-in-up mt-16" style={{ animationDelay: '200ms' }}>
                <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                  <svg className="w-6 h-6 text-violet-600" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                  </svg>
                  Other {doctor.specialty} Specialists
                </h2>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {sameSpecialty.slice(0, 6).map(doc => (
                    <Link
                      key={doc.slug}
                      to="/doctors/$slug"
                      params={{ slug: doc.slug }}
                      className="group flex items-center gap-3 bg-bg-card rounded-xl p-4 border border-violet-200 hover:border-violet-400 hover:shadow-lg transition-all"
                    >
                      <div className="w-12 h-12 rounded-full overflow-hidden shrink-0 ring-2 ring-violet-100 group-hover:ring-violet-300 transition-all">
                        <img src={doc.image} alt={doc.name} className="w-full h-full object-cover" loading="lazy" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-slate-900 group-hover:text-violet-700 transition-colors truncate">{doc.name}</p>
                        <p className="text-xs text-slate-500 truncate">{doc.role}</p>
                      </div>
                      <svg className="w-4 h-4 text-slate-300 ml-auto shrink-0 group-hover:text-violet-500 transition-colors" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                      </svg>
                    </Link>
                  ))}
                </div>
                {sameSpecialty.length > 6 && (
                  <div className="mt-4 text-center">
                    <Link
                      to="/doctors"
                      className="text-sm text-violet-600 hover:text-violet-700 font-medium transition-colors"
                    >
                      View all {sameSpecialty.length} {doctor.specialty} specialists →
                    </Link>
                  </div>
                )}
              </div>
            )
          })()}

          {/* Navigation between doctors */}
          <div className="flex justify-between flex-wrap gap-4 mt-16 pt-8 border-t border-violet-200 animate-fade-in-up" style={{ animationDelay: '300ms' }}>
            {prevSlug ? (
              <Link
                to="/doctors/$slug"
                params={{ slug: prevSlug }}
                className="flex items-center gap-2 text-sm sm:text-base text-slate-500 hover:text-violet-600 transition-colors shrink-0"
              >
                <svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                </svg>
                <span className="truncate">Previous Doctor</span>
              </Link>
            ) : <div />}
            {nextSlug && (
              <Link
                to="/doctors/$slug"
                params={{ slug: nextSlug }}
                className="flex items-center gap-2 text-sm sm:text-base text-slate-500 hover:text-violet-600 transition-colors shrink-0"
              >
                <span className="truncate">Next Doctor</span>
                <svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                </svg>
              </Link>
            )}
          </div>
        </div>
      </section>
    </>
  )
}
