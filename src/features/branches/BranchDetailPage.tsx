import { useEffect, useState, useMemo } from 'react'
import { Link, useLocation } from '@tanstack/react-router'
import SEO from '../ui/SEO'
import { branches, type Branch } from '../../data/branches'
import { appointmentDoctors, teamMembers } from '../../data/doctors'
import { departments } from '../../data/departments'
import { outdoorDoctorGroups } from '../../data/outdoorDoctors'
import { useBranch } from '../../context/BranchContext'
import BrandWave from '../ui/BrandWave'
import OPDConsultantsSection from '../ui/OPDConsultantsSection'

const serviceIcons: Record<string, string> = {
  'Primary Care': '\u{1F52C}',
  'Mental Health': '\u{1F9EC}',
  'Dental Care': '\u2764\uFE0F',
  'Eye Care': '\u{1F3E5}',
  'Cardiology': '\u2764\uFE0F',
  'Orthopedics': '\u{1F9B4}',
  'Pediatrics': '\u{1F476}',
  'Gynecology': '\u{1F469}',
}

function BranchNotFound() {
  return (
    <>
      <SEO title="Branch Not Found | Sonoscan Healthcare" description="The requested branch could not be found at Sonoscan Healthcare." />
      <section className="min-h-screen bg-bg-base flex items-center justify-center px-6">
        <div className="text-center animate-fade-in-up">
          <div className="w-20 h-20 mx-auto mb-6 bg-violet-100 rounded-full flex items-center justify-center">
            <svg className="w-10 h-10 text-violet-600" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-slate-900 mb-4">Branch Not Found</h1>
          <p className="text-slate-500 mb-8">The branch location you're looking for doesn't exist.</p>
          <Link
            to="/services"
            className="bg-violet-600 hover:bg-violet-700 text-white px-8 py-3 rounded-lg font-semibold transition-all"
          >
            View All Locations
          </Link>
        </div>
      </section>
    </>
  )
}

function BranchContent({ branch }: { branch: Branch }) {
  const branchIndex = branches.findIndex(b => b.id === branch.id)
  const prevBranch = branchIndex > 0 ? branches[branchIndex - 1] : null
  const nextBranch = branchIndex < branches.length - 1 ? branches[branchIndex + 1] : null

  // Filter doctors by branch
  const branchDoctors = appointmentDoctors.filter(doc => doc.branchIds.includes(branch.id))

  // Our Doctors search + filter state
  const [docSearch, setDocSearch] = useState('')
  const [docSpecFilter, setDocSpecFilter] = useState('all')
  const [docSpecOpen, setDocSpecOpen] = useState(false)

  const docSpecialtyIcons: Record<string, string> = {
    Cardiology: '❤️',
    Neurology: '🧠',
    Gastroenterology: '🦠',
    ENT: '👂',
    'Paediatric Cardiology': '👶',
    PFT: '🫁',
    Pathology: '🔬',
    Radiology: '🩻',
  }

  const docSpecialties = useMemo(() => {
    const set = new Set(branchDoctors.map(d => d.specialty))
    return ['all', ...Array.from(set).sort()]
  }, [branchDoctors])

  const filteredDoctors = useMemo(() => {
    const q = docSearch.toLowerCase().trim()
    return branchDoctors.filter(doc => {
      if (docSpecFilter !== 'all' && doc.specialty !== docSpecFilter) return false
      if (q && !doc.name.toLowerCase().includes(q) && !doc.specialty.toLowerCase().includes(q)) return false
      return true
    })
  }, [branchDoctors, docSearch, docSpecFilter])

  // OPD (outdoor) consultants roster for this branch, grouped by department
  const opdGroups = outdoorDoctorGroups[branch.id] ?? []

  // Look up correct doctor slug from teamMembers
  const getDoctorSlug = (name: string) =>
    teamMembers.find(t => t.name === name)?.slug ?? ''

  // Map service names to department pages for linking
  const branchServiceData = branch.services.map(name => {
    const deptSlug = name.toLowerCase().replace(/\s+/g, '-')
    const dept = departments.find(d => d.id === deptSlug)
    return { name, deptSlug, tagline: dept?.tagline, description: dept?.description }
  })

  return (
    <>
      {/* ═══ Hero Section ═══ */}
      <section className="rounded-b-4xl relative overflow-hidden min-h-screen bg-[#0a0715] -mt-16 lg:-mt-28">
        <div className="absolute inset-0 overflow-hidden">
          <img
            src={branch.image}
            alt={branch.name}
            className="w-full h-full object-cover animate-slide-in-top"
            loading="eager"
          />
        </div>

        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'linear-gradient(90deg, #5552e7, rgba(85,82,231,0.55) 45%, rgba(255,255,255,0))', zIndex: 3 }}
        />

        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, #5552e7 1px, transparent 0)', backgroundSize: '40px 40px' }} />

        <div className="absolute inset-0 z-40 pointer-events-none bg-[#0a0715] animate-overlay-fade" />

        <div className="container relative z-30 max-w-7xl mx-auto px-6 h-screen flex items-center pt-16 lg:pt-28">
          <div className="max-w-2xl opacity-0 animate-fade-in-up" style={{ animationDelay: '900ms', animationFillMode: 'forwards' }}>
            {/* Breadcrumb */}
            <nav
              className="flex items-center gap-2 text-sm text-white/60 mb-4"
              aria-label="Breadcrumb"
            >
              <Link to="/" className="text-white/60 hover:text-white transition-colors">Home</Link>
              <svg className="w-3.5 h-3.5 text-white/30" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
              </svg>
              <Link to="/services" className="text-white/60 hover:text-white transition-colors">Locations</Link>
              <svg className="w-3.5 h-3.5 text-white/30" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
              </svg>
              <span className="text-white/80" aria-current="page">{branch.name}</span>
            </nav>

            <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm text-white px-4 py-1.5 rounded-full text-xs font-medium mb-5 border border-white/20">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {branch.name} Branch
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-extrabold text-white leading-[1.1] mb-4">
              {branch.name}
            </h1>
            <p className="text-base lg:text-lg text-white/70 max-w-xl leading-relaxed mb-6">
              {branch.address}
            </p>

            {/* Quick stats */}
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-1.5 text-sm text-white/70 bg-white/10 backdrop-blur-sm rounded-lg px-3 py-2 border border-white/10">
                <svg className="w-4 h-4 text-violet-300" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
                {branch.hours}
              </div>
              <div className="flex items-center gap-1.5 text-sm text-white/70 bg-white/10 backdrop-blur-sm rounded-lg px-3 py-2 border border-white/10">
                <svg className="w-4 h-4 text-violet-300" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
                </svg>
                {branchDoctors.length} doctors on-site
              </div>
              <div className="flex items-center gap-1.5 text-sm text-white/70 bg-white/10 backdrop-blur-sm rounded-lg px-3 py-2 border border-white/10">
                <svg className="w-4 h-4 text-violet-300" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                {branch.services.length} services
              </div>
            </div>
          </div>
        </div>

        <BrandWave variant="white" />
      </section>

      {/* ═══ Branch Navigation Strip ═══ */}
      <section className="bg-bg-surface border-b border-violet-200">
        <div className="max-w-7xl mx-auto px-6 py-6 lg:py-8">
          <div className="flex items-center gap-3 mb-4">
            <svg className="w-5 h-5 text-violet-500 shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
            </svg>
            <h2 className="text-sm font-semibold text-slate-700 uppercase tracking-wider">Browse All Branches</h2>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {branches.map((b, i) => {
              const isActive = b.id === branch.id
              return (
                <Link
                  key={b.id}
                  to="/services/$id"
                  params={{ id: b.id }}
                  className={`relative flex items-center gap-3 rounded-xl p-4 transition-all group ${
                    isActive
                      ? 'bg-violet-600 text-white shadow-lg shadow-violet-500/25 ring-2 ring-violet-400'
                      : 'bg-bg-card border border-violet-200 hover:border-violet-300 hover:shadow-md text-slate-700 hover:text-violet-600'
                  }`}
                >
                  {/* Active indicator dot */}
                  {isActive && (
                    <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-emerald-400 rounded-full flex items-center justify-center ring-2 ring-white">
                      <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" strokeWidth="3" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                      </svg>
                    </span>
                  )}

                  {/* Number badge */}
                  <div className={`w-9 h-9 rounded-lg flex items-center justify-center text-sm font-bold shrink-0 transition-all ${
                    isActive
                      ? 'bg-white/20 text-white'
                      : 'bg-violet-100 text-violet-600 group-hover:bg-violet-200'
                  }`}>
                    {String(i + 1).padStart(2, '0')}
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className={`text-sm font-semibold truncate ${isActive ? 'text-white' : ''}`}>
                      {b.name}
                    </p>
                    <p className={`text-xs truncate mt-0.5 ${isActive ? 'text-violet-200' : 'text-slate-400'}`}>
                      {b.address.split(',')[0]}
                    </p>
                  </div>

                  {!isActive && (
                    <svg className="w-4 h-4 text-slate-300 group-hover:text-violet-500 transition-colors shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                    </svg>
                  )}
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* ═══ Main Content ═══ */}
      <section className="py-16 lg:py-24 bg-bg-surface">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-3 gap-10 lg:gap-14">
            {/* Left column — Description & Details */}
            <div className="lg:col-span-2 space-y-10">
              {/* Description */}
              <div className="animate-fade-in-up">
                <h2 className="text-2xl font-bold text-slate-900 mb-4">About {branch.name}</h2>
                <p className="text-slate-600 leading-relaxed">{branch.description}</p>
              </div>

              {/* Services Offered — enhanced with icons and links */}
              <div className="animate-fade-in-up" style={{ animationDelay: '100ms' }}>
                <div className="flex items-center justify-between mb-5">
                  <h2 className="text-2xl font-bold text-slate-900">Services Available</h2>
                  <Link
                    to="/services"
                    className="text-sm text-violet-600 hover:text-violet-700 font-medium flex items-center gap-1"
                  >
                    View all
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                    </svg>
                  </Link>
                </div>
                <div className="grid sm:grid-cols-2 gap-3">
                  {branchServiceData.map(({ name, deptSlug, tagline }) => {
                    const icon = serviceIcons[name] ?? '\u{1FA7A}'
                    return (
                      <Link
                        key={name}
                        to="/departments/$id"
                        params={{ id: deptSlug }}
                        className="relative group/tip flex items-start gap-3 bg-bg-card rounded-xl p-4 border border-violet-200 hover:border-violet-300 hover:bg-violet-50/50 transition-all"
                      >
                        <span className="text-xl shrink-0 mt-0.5">{icon}</span>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-slate-900 group-hover/tip:text-violet-600 transition-colors">{name}</p>
                          <p className="text-xs text-slate-400 mt-0.5 truncate">Available at this branch</p>
                        </div>
                        <svg className="w-4 h-4 text-slate-300 group-hover/tip:text-violet-500 transition-colors shrink-0 mt-1" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                        </svg>

                        {/* Tooltip */}
                        {tagline && (
                          <span
                            className="pointer-events-none absolute bottom-full left-0 right-0 mb-2 opacity-0 scale-95 group-hover/tip:opacity-100 group-hover/tip:scale-100 transition-all duration-200 z-50"
                            role="tooltip"
                          >
                            <span className="block bg-slate-900 text-white rounded-xl shadow-xl shadow-black/20 p-3 text-left">
                              <span className="flex items-center gap-2 mb-1.5">
                                <span className="text-base">{icon}</span>
                                <span className="text-xs font-bold">{name}</span>
                              </span>
                              <span className="text-[11px] text-slate-300 leading-relaxed block">{tagline}</span>
                              <span className="inline-flex items-center gap-1 text-[10px] text-violet-300 font-medium mt-2">
                                View department details
                                <svg className="w-2.5 h-2.5" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                                </svg>
                              </span>
                            </span>
                            <span className="absolute top-full left-6 -mt-px border-4 border-transparent border-t-slate-900" aria-hidden="true" />
                          </span>
                        )}
                      </Link>
                    )
                  })}
                </div>
              </div>

              {/* OPD / Outdoor Consultants */}
              {opdGroups.length > 0 && (
                <div className="animate-fade-in-up" style={{ animationDelay: '150ms' }}>
                  <OPDConsultantsSection
                    groups={opdGroups}
                    branchName={branch.name}
                  />
                </div>
              )}

              {/* Meet Our Doctors */}
              {branchDoctors.length > 0 && (
                <div className="animate-fade-in-up" style={{ animationDelay: '175ms' }}>
                  <h2 className="text-2xl font-bold text-slate-900 mb-5">
                    Our Doctors at {branch.name}
                  </h2>

                  {/* Search + Filter bar */}
                  <div className="flex flex-col sm:flex-row gap-3 mb-5">
                    {/* Search input */}
                    <div className="relative flex-1">
                      <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                      </svg>
                      <input
                        type="text"
                        placeholder="Search by name or specialty…"
                        value={docSearch}
                        onChange={e => setDocSearch(e.target.value)}
                        className="w-full pl-9 pr-8 py-2.5 rounded-lg border border-violet-200 bg-bg-card text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-500/30 focus:border-violet-400 transition-all"
                      />
                      {docSearch && (
                        <button
                          onClick={() => setDocSearch('')}
                          className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                          aria-label="Clear search"
                        >
                          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                          </svg>
                        </button>
                      )}
                    </div>

                    {/* Specialty dropdown */}
                    <div className="relative sm:w-64">
                      <button
                        type="button"
                        onClick={() => setDocSpecOpen(prev => !prev)}
                        onBlur={() => setTimeout(() => setDocSpecOpen(false), 150)}
                        className="w-full flex items-center gap-2 pl-3 pr-8 py-2.5 rounded-lg border border-violet-200 bg-bg-card text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-violet-500/30 focus:border-violet-400 transition-all cursor-pointer text-left"
                      >
                        <span className="text-base leading-none">{docSpecFilter === 'all' ? '🩺' : (docSpecialtyIcons[docSpecFilter] ?? '🩺')}</span>
                        <span className="flex-1 truncate">{docSpecFilter === 'all' ? 'All Specialties' : docSpecFilter}</span>
                      </button>
                      {docSpecOpen && (
                        <div className="absolute z-50 mt-1.5 w-full bg-bg-card border border-violet-200 rounded-lg shadow-xl shadow-violet-500/10 py-1 max-h-52 overflow-y-auto">
                          {docSpecialties.map(spec => {
                            const label = spec === 'all' ? 'All Specialties' : spec
                            const icon = spec === 'all' ? '🩺' : (docSpecialtyIcons[spec] ?? '🩺')
                            const active = docSpecFilter === spec
                            return (
                              <button
                                key={spec}
                                type="button"
                                onClick={() => { setDocSpecFilter(spec); setDocSpecOpen(false) }}
                                className={`w-full flex items-center gap-2.5 px-3 py-2 text-sm text-left transition-colors ${
                                  active ? 'bg-violet-100 text-violet-700 font-medium' : 'text-slate-700 hover:bg-violet-50'
                                }`}
                              >
                                <span className="text-base leading-none w-5 text-center">{icon}</span>
                                <span className="flex-1 truncate">{label}</span>
                                {active && (
                                  <svg className="w-3.5 h-3.5 text-violet-600 shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                                  </svg>
                                )}
                              </button>
                            )
                          })}
                        </div>
                      )}
                      <svg className={`absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 pointer-events-none transition-transform ${docSpecOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                      </svg>
                    </div>
                  </div>

                  {/* Results count */}
                  {(docSearch || docSpecFilter !== 'all') && (
                    <p className="text-xs text-slate-400 mb-4">
                      Showing {filteredDoctors.length} of {branchDoctors.length} doctors
                      {docSpecFilter !== 'all' && <> in {docSpecFilter}</>}
                      {docSearch && <> matching &ldquo;{docSearch}&rdquo;</>}
                    </p>
                  )}

                  {/* Doctor grid */}
                  {filteredDoctors.length > 0 ? (
                    <div className="grid sm:grid-cols-2 gap-4">
                      {filteredDoctors.map((doc) => {
                        const slug = getDoctorSlug(doc.name)
                        return (
                          <Link
                            key={doc.name}
                            to="/doctors/$slug"
                            params={{ slug }}
                            className="flex items-center gap-4 bg-bg-card rounded-xl p-4 border border-violet-200 hover:border-violet-300 hover:bg-violet-50/50 transition-all group"
                          >
                            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-violet-500 to-violet-700 flex items-center justify-center text-white font-bold text-sm shrink-0">
                              {doc.initials}
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-semibold text-slate-900 group-hover:text-violet-600 transition-colors truncate">{doc.name}</p>
                              <p className="text-xs text-slate-400 truncate">{doc.specialty}</p>
                              <div className="flex gap-1 mt-1.5">
                                {(doc.branchSchedule?.find(s => s.branchId === branch.id)?.days ?? []).map(day => (
                                  <span key={day} className="text-[9px] px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-700 font-medium">
                                    {day.slice(0, 2)}
                                  </span>
                                ))}
                              </div>
                            </div>
                            <svg className="w-4 h-4 text-slate-300 group-hover:text-violet-500 transition-colors shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                            </svg>
                          </Link>
                        )
                      })}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-slate-400 text-sm">No doctors found matching your criteria</p>
                    </div>
                  )}

                  <Link
                    to="/doctors"
                    className="inline-flex items-center gap-2 text-sm text-violet-600 font-medium hover:text-violet-700 transition-colors mt-4"
                  >
                    Meet our full team
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                    </svg>
                  </Link>
                </div>
              )}

              {/* Why Visit */}
              <div className="animate-fade-in-up" style={{ animationDelay: '200ms' }}>
                <h2 className="text-2xl font-bold text-slate-900 mb-5">Why Visit {branch.name}?</h2>
                <div className="grid sm:grid-cols-2 gap-5">
                  {[
                    {
                      icon: (
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                        </svg>
                      ),
                      title: 'Affordable Care',
                      description: 'Competitive pricing and flexible payment options to make healthcare accessible for everyone.',
                    },
                    {
                      icon: (
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                        </svg>
                      ),
                      title: 'Experienced Team',
                      description: `Our ${branchDoctors.length} dedicated doctors and specialists bring decades of combined experience.`,
                    },
                    {
                      icon: (
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                        </svg>
                      ),
                      title: 'Convenient Hours',
                      description: branch.hours,
                    },
                    {
                      icon: (
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
                        </svg>
                      ),
                      title: 'Modern Facility',
                      description: 'Fully equipped with the latest medical technology for accurate diagnosis and care.',
                    },
                  ].map((item) => (
                    <div key={item.title} className="bg-bg-card rounded-xl p-5 border border-violet-200 hover:border-violet-300 transition-all">
                      <div className="w-10 h-10 bg-violet-100 rounded-lg flex items-center justify-center mb-3 text-violet-600">
                        {item.icon}
                      </div>
                      <h3 className="font-semibold text-slate-900 mb-1">{item.title}</h3>
                      <p className="text-sm text-slate-500">{item.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right sidebar — info + sticky CTAs */}
            <div className="lg:col-span-1 space-y-10">
              <div className="space-y-6 animate-fade-in-up" style={{ animationDelay: '150ms' }}>
              {/* Contact Card */}
              <div className="bg-bg-card rounded-2xl p-6 border border-violet-200">
                <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wider mb-5">Contact Information</h3>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3 text-sm">
                    <svg className="w-5 h-5 text-violet-600 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                    </svg>
                    <div>
                      <p className="font-medium text-slate-900">Address</p>
                      <p className="text-slate-500 mt-0.5">{branch.address}</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3 text-sm">
                    <svg className="w-5 h-5 text-violet-600 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
                    </svg>
                    <div>
                      <p className="font-medium text-slate-900">Phone</p>
                      <a href={`tel:${branch.phone.split('/')[0].replace(/[^0-9]/g, '').trim()}`} className="text-violet-600 hover:text-violet-700 transition-colors mt-0.5 block">{branch.phone}</a>
                    </div>
                  </li>
                  <li className="flex items-start gap-3 text-sm">
                    <svg className="w-5 h-5 text-emerald-600 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
                    </svg>
                    <div>
                      <p className="font-medium text-slate-900">WhatsApp</p>
                      <a
                        href={`https://wa.me/91${branch.whatsapp.split('/')[0].replace(/[^0-9]/g, '').trim()}?text=${encodeURIComponent('Hi! I would like to know more about services at your ' + branch.name + ' branch.')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-emerald-600 hover:text-emerald-700 transition-colors mt-0.5 block"
                      >
                        {branch.whatsapp}
                      </a>
                    </div>
                  </li>
                  <li className="flex items-start gap-3 text-sm">
                    <svg className="w-5 h-5 text-violet-600 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                    </svg>
                    <div>
                      <p className="font-medium text-slate-900">Email</p>
                      <a href={`mailto:${branch.email}`} className="text-violet-600 hover:text-violet-700 transition-colors mt-0.5 block">{branch.email}</a>
                    </div>
                  </li>
                </ul>
              </div>

              {/* Quick Stats */}
              <div className="bg-gradient-to-br from-violet-500 to-violet-700 rounded-2xl p-6 text-white">
                <h3 className="text-sm font-semibold uppercase tracking-wider mb-4 opacity-80">Quick Facts</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-3xl font-bold">{branchDoctors.length}</p>
                    <p className="text-sm text-white/70 mt-1">Doctors</p>
                  </div>
                  <div>
                    <p className="text-3xl font-bold">{branch.services.length}</p>
                    <p className="text-sm text-white/70 mt-1">Services</p>
                  </div>
                  <div>
                    <p className="text-3xl font-bold">{branch.doctorCount}</p>
                    <p className="text-sm text-white/70 mt-1">Total Staff</p>
                  </div>
                  <div>
                    <p className="text-3xl font-bold">{branch.services.length * 3}+</p>
                    <p className="text-sm text-white/70 mt-1">Monthly Patients</p>
                  </div>
                </div>
              </div>

              {/* Branch Services Mini-List */}
              <div className="bg-bg-card rounded-2xl p-6 border border-violet-200">
                <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wider mb-4">Services at {branch.name}</h3>
                <div className="space-y-1">
                  {branchServiceData.map(({ name, deptSlug, tagline }) => {
                    const icon = serviceIcons[name] ?? '\u{1FA7A}'
                    return (
                      <Link
                        key={name}
                        to="/departments/$id"
                        params={{ id: deptSlug }}
                        className="relative group/tip flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-slate-600 hover:text-violet-600 hover:bg-violet-50 transition-colors"
                      >
                        <span className="text-base">{icon}</span>
                        {name}

                        {/* Tooltip */}
                        {tagline && (
                          <span
                            className="pointer-events-none absolute left-full top-1/2 -translate-y-1/2 ml-3 opacity-0 scale-95 group-hover/tip:opacity-100 group-hover/tip:scale-100 transition-all duration-200 z-50"
                            role="tooltip"
                          >
                            <span className="block bg-slate-900 text-white rounded-xl shadow-xl shadow-black/20 p-3 text-left w-56">
                              <span className="text-[11px] text-slate-300 leading-relaxed block">{tagline}</span>
                              <span className="inline-flex items-center gap-1 text-[10px] text-violet-300 font-medium mt-1.5">
                                View details
                                <svg className="w-2.5 h-2.5" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                                </svg>
                              </span>
                            </span>
                            <span className="absolute right-full top-1/2 -translate-y-1/2 mr-px border-4 border-transparent border-r-slate-900" aria-hidden="true" />
                          </span>
                        )}
                      </Link>
                    )
                  })}
                </div>
              </div>

              {/* Branch Doctors Mini-List */}
              {branchDoctors.length > 0 && (
                <div className="bg-bg-card rounded-2xl p-6 border border-violet-200">
                  <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wider mb-4">Doctors at {branch.name}</h3>
                  <div className="space-y-1">
                    {branchDoctors.slice(0, 5).map((doc) => {
                      const slug = getDoctorSlug(doc.name)
                      return (
                        <Link
                          key={doc.name}
                          to="/doctors/$slug"
                          params={{ slug }}
                          className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-slate-600 hover:text-violet-600 hover:bg-violet-50 transition-colors"
                        >
                          <div className="w-7 h-7 rounded-full bg-violet-100 flex items-center justify-center text-violet-600 font-bold text-[10px] shrink-0">
                            {doc.initials}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium truncate">{doc.name}</p>
                            <p className="text-xs text-slate-400 truncate">{doc.specialty}</p>
                          </div>
                        </Link>
                      )
                    })}
                    {branchDoctors.length > 5 && (
                      <Link
                        to="/doctors"
                        className="block text-center text-xs text-violet-600 font-medium pt-2 hover:text-violet-700 transition-colors"
                      >
                        +{branchDoctors.length - 5} more doctors
                      </Link>
                    )}
                  </div>
                </div>
              )}

              </div>
              {/* Sticky Action Buttons */}
              <div className="lg:sticky lg:top-32 space-y-6">
              {/* Call Button */}
              <a
                href={`tel:${branch.phone.split('/')[0].replace(/[^0-9]/g, '').trim()}`}
                className="block w-full text-center bg-violet-500 hover:bg-violet-600 text-white px-6 py-4 rounded-xl font-semibold transition-all hover:shadow-2xl hover:shadow-violet-500/25 active:scale-[0.98]"
              >
                <span className="flex items-center justify-center gap-2">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
                  </svg>
                  Call {branch.phone}
                </span>
              </a>

              {/* WhatsApp Chat Button */}
              <a
                href={`https://wa.me/91${branch.whatsapp.split('/')[0].replace(/[^0-9]/g, '').trim()}?text=${encodeURIComponent(`Hi! I would like to know more about Sonoscan Healthcare services available at your ${branch.name} branch. Can you share details about the diagnostic tests and how I can book an appointment?`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full text-center bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-4 rounded-xl font-semibold transition-all hover:shadow-2xl hover:shadow-emerald-500/25 active:scale-[0.98]"
              >
                <span className="flex items-center justify-center gap-2">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  Chat on WhatsApp
                </span>
              </a>

              {/* Book Button */}
              <Link
                to="/appointments"
                className="block w-full text-center bg-violet-600 hover:bg-violet-700 text-white px-6 py-4 rounded-xl font-semibold transition-all hover:shadow-2xl hover:shadow-violet-500/25 active:scale-[0.98]"
              >
                Book Appointment at {branch.name}
              </Link>
              </div>
            </div>
          </div>

          {/* ═══ WhatsApp CTA with QR Code ═══ */}
          <div className="mt-16 animate-fade-in-up">
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
                    Chat With Us About {branch.name}
                  </h3>
                  <p className="text-emerald-100/80 mb-6 max-w-md mx-auto lg:mx-0">
                    Have questions about services, pricing, or appointments at our {branch.name} branch? Send us a message on WhatsApp and we will get back to you right away.
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
                    href={`https://wa.me/91${branch.whatsapp.split('/')[0].replace(/[^0-9]/g, '').trim()}?text=${encodeURIComponent('Hi! I am interested in services at your ' + branch.name + ' branch. Could you share details about the diagnostic tests, pricing, and available doctors?')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-white text-emerald-700 hover:bg-emerald-50 px-6 py-3 rounded-xl font-semibold transition-all hover:shadow-lg active:scale-[0.98]"
                  >
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                    Ask About {branch.name}
                  </a>
                </div>

                <div className="shrink-0">
                  <div className="bg-white rounded-2xl p-4 shadow-xl text-center">
                    <img
                      src={'https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=' + encodeURIComponent('https://wa.me/91' + branch.whatsapp.split('/')[0].replace(/[^0-9]/g, '').trim() + '?text=' + encodeURIComponent('Hi! I am interested in services at your ' + branch.name + ' branch.'))}
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

          {/* Navigation between branches */}
          <div className="flex justify-between mt-16 pt-8 border-t border-violet-200 animate-fade-in-up" style={{ animationDelay: '300ms' }}>
            {prevBranch ? (
              <Link
                to="/services/$id"
                params={{ id: prevBranch.id }}
                className="flex items-center gap-2 text-slate-500 hover:text-violet-600 transition-colors group"
              >
                <svg className="w-5 h-5 transition-transform group-hover:-translate-x-1" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                </svg>
                <div className="hidden sm:block text-left">
                  <p className="text-xs text-slate-400">Previous</p>
                  <p className="text-sm font-medium">{prevBranch.name}</p>
                </div>
              </Link>
            ) : <div />}
            {nextBranch && (
              <Link
                to="/services/$id"
                params={{ id: nextBranch.id }}
                className="flex items-center gap-2 text-slate-500 hover:text-violet-600 transition-colors group"
              >
                <div className="hidden sm:block text-right">
                  <p className="text-xs text-slate-400">Next</p>
                  <p className="text-sm font-medium">{nextBranch.name}</p>
                </div>
                <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
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

export default function BranchDetailPage() {
  const { pathname } = useLocation()
  const branchId = pathname.split('/').pop()!
  const branch = branches.find(b => b.id === branchId)
  const { setSelectedBranch } = useBranch()

  // Sync global branch context when visiting a branch detail page
  useEffect(() => {
    if (branch) {
      setSelectedBranch(branch)
    }
  }, [branch, setSelectedBranch])

  if (!branch) return <BranchNotFound />

  return (
    <>
      <SEO
        title={`${branch.name} Branch | Sonoscan Healthcare`}
        description={`Visit our ${branch.name} branch at ${branch.address}. ${branch.description.slice(0, 120)} Book an appointment today.`}
      />
      <BranchContent branch={branch} />
    </>
  )
}
