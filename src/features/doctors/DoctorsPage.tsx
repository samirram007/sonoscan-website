import { useState, useEffect, useRef, useMemo, useCallback } from 'react'
import { Link } from '@tanstack/react-router'
import { teamMembers } from '../../data/doctors'
import { useBranch } from '../../context/BranchContext'
import BranchSelector from '../ui/BranchSelector'
import SEO from '../ui/SEO'
import Reveal from '../ui/Reveal'
import DoctorCard from '../ui/DoctorCard'
import BrandWave from '../ui/BrandWave'
import type { TeamMember } from './schema'

/* ── Specialty icons ── */
const specialtyIcons: Record<string, string> = {
  Pathology: '🔬',
  Radiology: '🩻',
  Cardiology: '❤️',
  'Paediatric Cardiology': '👶',
  Gastroenterology: '🫁',
  Neurology: '🧠',
  ENT: '👂',
  PFT: '💨',
}

const specialtyColors: Record<string, string> = {
  Pathology: 'from-rose-500 to-pink-600',
  Radiology: 'from-sky-500 to-cyan-600',
  Cardiology: 'from-red-500 to-rose-600',
  'Paediatric Cardiology': 'from-pink-400 to-rose-500',
  Gastroenterology: 'from-emerald-500 to-teal-600',
  Neurology: 'from-violet-500 to-purple-600',
  ENT: 'from-indigo-500 to-blue-600',
  PFT: 'from-teal-500 to-emerald-600',
}

const specialtyBadge: Record<string, string> = {
  Pathology: 'bg-rose-100 text-rose-700 border-rose-200',
  Radiology: 'bg-sky-100 text-sky-700 border-sky-200',
  Cardiology: 'bg-red-100 text-red-700 border-red-200',
  'Paediatric Cardiology': 'bg-pink-100 text-pink-700 border-pink-200',
  Gastroenterology: 'bg-emerald-100 text-emerald-700 border-emerald-200',
  Neurology: 'bg-violet-100 text-violet-700 border-violet-200',
  ENT: 'bg-indigo-100 text-indigo-700 border-indigo-200',
  PFT: 'bg-teal-100 text-teal-700 border-teal-200',
}

function getSpecialtyIcon(spec: string) {
  return specialtyIcons[spec] ?? '🏥'
}

function getSpecialtyGradient(spec: string) {
  return specialtyColors[spec] ?? 'from-violet-500 to-purple-600'
}

function getSpecialtyBadge(spec: string) {
  return specialtyBadge[spec] ?? 'bg-slate-100 text-slate-700 border-slate-200'
}

export default function DoctorsPage() {
  const { selectedBranch } = useBranch()
  const [searchDoctor, setSearchDoctor] = useState('')
  const [activeSpecialty, setActiveSpecialty] = useState<string | null>(null)
  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(new Set())
  const groupRefs = useRef<Record<string, HTMLDivElement | null>>({})

  // Memoize branch doctors to avoid unnecessary re-computation
  const branchDoctors = useMemo(
    () => teamMembers.filter(doc => doc.branchIds.includes(selectedBranch.id)),
    [selectedBranch.id]
  )

  // Reset filter when branch changes
  useEffect(() => {
    setSearchDoctor('')
    setActiveSpecialty(null)
  }, [selectedBranch.id])

  // Compute specialties available in this branch, sorted
  const specialties = useMemo(
    () => Array.from(new Set(branchDoctors.map(d => d.specialty))).sort(),
    [branchDoctors]
  )

  // Derive expandedAll from expandedGroups
  const expandedAll = expandedGroups.size === specialties.length && specialties.length > 0

  // Initialize expanded groups to all expanded
  useEffect(() => {
    setExpandedGroups(new Set(specialties))
  }, [specialties])

  // Derive filtered doctors (across all groups)
  const filteredDoctors = useMemo(
    () =>
      branchDoctors.filter(doc => {
        const matchesSearch =
          searchDoctor === '' ||
          doc.name.toLowerCase().includes(searchDoctor.toLowerCase()) ||
          doc.specialty.toLowerCase().includes(searchDoctor.toLowerCase()) ||
          doc.role.toLowerCase().includes(searchDoctor.toLowerCase())
        const matchesSpecialty = activeSpecialty ? doc.specialty === activeSpecialty : true
        return matchesSearch && matchesSpecialty
      }),
    [branchDoctors, searchDoctor, activeSpecialty]
  )

  // Group filtered doctors by specialty
  const groupedDoctors = useMemo(() => {
    const groups: Record<string, TeamMember[]> = {}
    for (const doc of filteredDoctors) {
      if (!groups[doc.specialty]) groups[doc.specialty] = []
      groups[doc.specialty].push(doc)
    }
    return groups
  }, [filteredDoctors])

  // Scroll to the active specialty group when it changes
  const activeGroupRef = useRef<string | null>(null)
  useEffect(() => {
    if (activeSpecialty && activeGroupRef.current !== activeSpecialty) {
      activeGroupRef.current = activeSpecialty
      const el = groupRefs.current[activeSpecialty]
      if (el) {
        // Small delay to let React commit expanded state
        requestAnimationFrame(() => {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' })
        })
      }
    }
    if (!activeSpecialty) activeGroupRef.current = null
  }, [activeSpecialty])

  // When specialty filter changes, expand that group
  const handleSpecialtyClick = useCallback((spec: string | null) => {
    if (spec === activeSpecialty) {
      setActiveSpecialty(null)
    } else {
      setActiveSpecialty(spec)
      if (spec) {
        setExpandedGroups(prev => {
          const next = new Set(prev)
          next.add(spec)
          return next
        })
      }
    }
  }, [activeSpecialty])

  const toggleGroup = useCallback((spec: string) => {
    setExpandedGroups(prev => {
      const next = new Set(prev)
      if (next.has(spec)) next.delete(spec)
      else next.add(spec)
      return next
    })
  }, [])

  const toggleAll = useCallback(() => {
    if (expandedAll) {
      setExpandedGroups(new Set())
    } else {
      setExpandedGroups(new Set(specialties))
    }
  }, [expandedAll, specialties])

  const totalCount = filteredDoctors.length

  return (
    <>
      <SEO
        title="Our Doctors | Sonoscan Healthcare"
        description="Meet our team of experienced medical specialists at Sonoscan Healthcare. Browse doctors by specialty and book an appointment online."
      />

      {/* ═══ Hero ═══ */}
      <section className="rounded-b-4xl relative overflow-hidden min-h-[50vh] bg-[#0a0715] -mt-16 lg:-mt-28 flex items-center">
        <div className="absolute inset-0 overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1551076805-e1869033e561?w=1920&q=80"
            alt="Medical team"
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

        <div className="container relative z-30 max-w-7xl mx-auto px-6 pt-28 pb-16">
          <div className="max-w-2xl opacity-0 animate-fade-in-up" style={{ animationDelay: '900ms', animationFillMode: 'forwards' }}>
            <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium mb-6 border border-white/10">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {selectedBranch.name} Branch
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-[1.1] mb-6">
              Meet Our{' '}
              <span className="text-violet-300">Medical Experts</span>
            </h1>
            <p className="text-lg lg:text-xl text-slate-300 leading-relaxed max-w-xl">
              Our team of experienced specialists at {selectedBranch.name} is dedicated to providing you with the highest quality healthcare.
            </p>
          </div>
        </div>

        <BrandWave variant="white" />
      </section>

      {/* ═══ Filter Bar (sticky) ═══ */}
      <section className="py-6 bg-bg-base border-b border-violet-200 sticky top-0 z-20 backdrop-blur-sm bg-bg-base/95">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* Branch + search row */}
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <BranchSelector variant="default" showDoctorCount />
              <div className="relative flex-1 sm:min-w-[280px]">
                <svg
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                </svg>
                <input
                  type="text"
                  value={searchDoctor}
                  onChange={e => setSearchDoctor(e.target.value)}
                  placeholder="Search name, specialty, or role..."
                  className="w-full pl-10 pr-4 py-3 bg-bg-card border border-violet-200 rounded-xl text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-500/30 focus:border-violet-400 transition-all text-sm"
                />
                {searchDoctor && (
                  <button
                    onClick={() => setSearchDoctor('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                    </svg>
                  </button>
                )}
              </div>
            </div>

            {/* Expand/collapse all */}
            <button
              onClick={toggleAll}
              className="hidden md:flex items-center gap-1.5 text-xs font-medium text-slate-500 hover:text-violet-600 transition-colors shrink-0"
            >
              <svg
                className={`w-3.5 h-3.5 transition-transform ${expandedAll ? '' : 'rotate-180'}`}
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 15.75 7.5-7.5 7.5 7.5" />
              </svg>
              {expandedAll ? 'Collapse All' : 'Expand All'}
            </button>
          </div>

          {/* Specialty filter chips */}
          <div className="flex flex-wrap items-center gap-2 mt-4">
            <button
              onClick={() => handleSpecialtyClick(null)}
              className={`group inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg font-medium transition-all border ${
                activeSpecialty === null
                  ? 'bg-violet-600 text-white border-violet-600 shadow-sm shadow-violet-300/30'
                  : 'bg-bg-card text-slate-500 border-violet-200 hover:border-violet-300 hover:text-slate-700'
              }`}
            >
              <span>All Specialties</span>
              <span
                className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                  activeSpecialty === null
                    ? 'bg-white/20 text-white'
                    : 'bg-violet-100 text-violet-600 group-hover:bg-violet-200'
                }`}
              >
                {branchDoctors.length}
              </span>
            </button>

            {specialties.map(spec => {
              const groupCount = groupedDoctors[spec]?.length ?? 0
              const isActive = activeSpecialty === spec
              return (
                <button
                  key={spec}
                  onClick={() => handleSpecialtyClick(spec)}
                  className={`group inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg font-medium transition-all border ${
                    isActive
                      ? 'bg-violet-600 text-white border-violet-600 shadow-sm shadow-violet-300/30 scale-105'
                      : 'bg-bg-card text-slate-500 border-violet-200 hover:border-violet-300 hover:text-slate-700'
                  } ${searchDoctor && !groupCount ? 'opacity-30 pointer-events-none' : ''}`}
                >
                  <span className="text-sm leading-none">{getSpecialtyIcon(spec)}</span>
                  <span>{spec}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                      isActive
                        ? 'bg-white/20 text-white'
                        : 'bg-violet-100 text-violet-600 group-hover:bg-violet-200'
                    }`}
                  >
                    {groupCount}
                  </span>
                </button>
              )
            })}
          </div>

          {/* Mobile specialty chips */}
          <div className="md:hidden flex flex-wrap gap-2 mt-4">
            <button
              onClick={() => handleSpecialtyClick(null)}
              className={`text-xs px-3 py-1.5 rounded-lg font-medium transition-all border ${
                activeSpecialty === null
                  ? 'bg-violet-600 text-white border-violet-600'
                  : 'bg-bg-card text-slate-500 border-violet-200'
              }`}
            >
              All ({branchDoctors.length})
            </button>
            {specialties.map(spec => {
              const groupCount = groupedDoctors[spec]?.length ?? 0
              return (
                <button
                  key={spec}
                  onClick={() => handleSpecialtyClick(spec)}
                  className={`text-xs px-3 py-1.5 rounded-lg font-medium transition-all border ${
                    activeSpecialty === spec
                      ? 'bg-violet-600 text-white border-violet-600'
                      : 'bg-bg-card text-slate-500 border-violet-200 hover:border-violet-300'
                  } ${searchDoctor && !groupCount ? 'opacity-30 pointer-events-none' : ''}`}
                >
                  {getSpecialtyIcon(spec)} {spec} ({groupCount})
                </button>
              )
            })}
          </div>
        </div>
      </section>

      {/* ═══ Grouped Doctor Sections ═══ */}
      <section className="py-12 lg:py-16 bg-bg-surface">
        <div className="max-w-7xl mx-auto px-6">
          {totalCount === 0 ? (
            <div className="text-center py-20">
              <div className="text-5xl mb-4">🔍</div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">No Doctors Found</h3>
              <p className="text-slate-500">
                {searchDoctor
                  ? `No specialists match "${searchDoctor}" at ${selectedBranch.name}. Try a different search term.`
                  : `No specialists available at ${selectedBranch.name}. Try selecting a different branch.`}
              </p>
            </div>
          ) : (
            <div className="space-y-8">
              {specialties.map((spec, groupIdx) => {
                const doctors = groupedDoctors[spec] ?? []
                if (doctors.length === 0) return null
                const isExpanded = expandedGroups.has(spec)
                const isActiveSpec = activeSpecialty === spec

                return (
                  <Reveal key={spec} direction="up" delay={groupIdx * 100} threshold={0.01}>
                    <div
                      ref={el => { groupRefs.current[spec] = el }}
                      id={`group-${spec}`}
                      className={`bg-bg-card rounded-2xl border overflow-hidden transition-all duration-300 ${
                        isActiveSpec
                          ? 'border-violet-300 shadow-lg shadow-violet-200/30 ring-1 ring-violet-200'
                          : 'border-violet-200 hover:border-violet-200 shadow-sm'
                      }`}
                    >
                      {/* ── Group Header (clickable) ── */}
                      <button
                        onClick={() => toggleGroup(spec)}
                        className="w-full flex items-center justify-between px-6 py-4 hover:bg-violet-50/50 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          {/* Gradient icon circle */}
                          <div
                            className={`w-10 h-10 rounded-xl bg-gradient-to-br ${getSpecialtyGradient(spec)} flex items-center justify-center text-lg shadow-sm shrink-0`}
                          >
                            {getSpecialtyIcon(spec)}
                          </div>
                          <div className="text-left">
                            <h3 className="text-lg font-bold text-slate-900">{spec}</h3>
                            <p className="text-xs text-slate-500">
                              {doctors.length} specialist{doctors.length !== 1 ? 's' : ''}
                              {searchDoctor && ` matching "${searchDoctor}"`}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          {/* Active indicator */}
                          {isActiveSpec && (
                            <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${getSpecialtyBadge(spec)}`}>
                              Active Filter
                            </span>
                          )}
                          <svg
                            className={`w-4 h-4 text-slate-400 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="2"
                            stroke="currentColor"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                          </svg>
                        </div>
                      </button>

                      {/* ── Group Content (collapsible) ── */}
                      <div
                        className={`transition-all duration-500 ease-in-out overflow-hidden ${
                          isExpanded ? 'max-h-[5000px] opacity-100' : 'max-h-0 opacity-0'
                        }`}
                      >
                        <div className="px-6 pb-6 pt-2 border-t border-violet-100">
                          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                            {doctors.map((doctor, i) => (
                              <Reveal key={doctor.slug} direction="up" delay={i * 80} threshold={0.01}>
                                <DoctorCard doctor={doctor} />
                              </Reveal>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </Reveal>
                )
              })}
            </div>
          )}

          {/* Summary bar */}
          <div className="flex items-center justify-between mt-10 px-4">
            <p className="text-sm text-slate-400">
              Showing {totalCount} of {branchDoctors.length} specialists at {selectedBranch.name}
            </p>
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <span className="inline-block w-2 h-2 rounded-full bg-violet-400" />
              {specialties.length} departments
            </div>
          </div>
        </div>
      </section>

      {/* ═══ CTA ═══ */}
      <section className="py-16 lg:py-20 bg-bg-base border-t border-violet-200">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <Reveal direction="up" threshold={0.01}>
            <div className="inline-flex items-center gap-2 bg-violet-100 text-violet-700 px-4 py-2 rounded-full text-sm font-medium mb-4 border border-violet-200">
              Ready to Book?
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
              Take the First Step Towards Better Health
            </h2>
            <p className="text-lg text-slate-500 mb-8 max-w-2xl mx-auto">
              Schedule an appointment with one of our expert physicians at {selectedBranch.name} today.
            </p>
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
        </div>
      </section>
    </>
  )
}
