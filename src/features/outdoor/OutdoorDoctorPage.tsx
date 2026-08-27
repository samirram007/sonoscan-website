import { useMemo, useState, useEffect, useCallback } from 'react'
import { Link } from '@tanstack/react-router'
import SEO from '../ui/SEO'
import { outdoorDoctorGroups } from '../../data/outdoorDoctors'
import type { OpdDepartmentGroup } from '../doctors/schema'
import { useBranch } from '../../context/BranchContext'
import BranchSelector from '../ui/BranchSelector'
import Reveal from '../ui/Reveal'
import BrandWave from '../ui/BrandWave'
import { outdoorDoctorDepartments } from '../../data/departments'
import { DEPT_ICONS, OutdoorDoctorCard } from '../ui/OutdoorDoctorCard'

/* ── Helpers ── */

function sortGroups(groups: OpdDepartmentGroup[]): OpdDepartmentGroup[] {
  const known = new Set(outdoorDoctorDepartments)
  return [...groups].sort((a, b) => {
    const ai = known.has(a.name) ? outdoorDoctorDepartments.indexOf(a.name) : Infinity
    const bi = known.has(b.name) ? outdoorDoctorDepartments.indexOf(b.name) : Infinity
    return ai - bi || a.name.localeCompare(b.name)
  })
}

export default function OutdoorDoctorPage() {
  const { selectedBranch } = useBranch()
  const [search, setSearch] = useState('')
  const [activeDept, setActiveDept] = useState<string | null>(null)
  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(new Set())
  const groups = useMemo(
    () => sortGroups(outdoorDoctorGroups[selectedBranch.id] ?? []),
    [selectedBranch.id],
  )

  // Reset filters when branch changes
  useEffect(() => {
    setSearch('')
    setActiveDept(null)
  }, [selectedBranch.id])

  // Department names available at this branch
  const departments = useMemo(() => groups.map(g => g.name), [groups])

  // Initialize all groups expanded
  useEffect(() => {
    setExpandedGroups(new Set(departments))
  }, [departments])

  const expandedAll = expandedGroups.size === departments.length && departments.length > 0

  const filteredGroups = useMemo(() => {
    const q = search.trim().toLowerCase()
    return groups
      .map(g => ({
        ...g,
        doctors: g.doctors.filter(
          doc =>
            q === '' ||
            doc.name.toLowerCase().includes(q) ||
            doc.qualification.toLowerCase().includes(q) ||
            g.name.toLowerCase().includes(q),
        ),
      }))
      .filter(g => g.doctors.length > 0)
      .filter(g => (activeDept ? g.name === activeDept : true))
  }, [groups, search, activeDept])

  const totalDoctors = filteredGroups.reduce((sum, g) => sum + g.doctors.length, 0)
  const totalAll = groups.reduce((sum, g) => sum + g.doctors.length, 0)

  const handleDeptClick = useCallback((dept: string | null) => {
    if (dept === activeDept) {
      setActiveDept(null)
    } else {
      setActiveDept(dept)
      if (dept) {
        setExpandedGroups(prev => {
          const next = new Set(prev)
          next.add(dept)
          return next
        })
      }
    }
  }, [activeDept])

  const toggleGroup = useCallback((dept: string) => {
    setExpandedGroups(prev => {
      const next = new Set(prev)
      if (next.has(dept)) next.delete(dept)
      else next.add(dept)
      return next
    })
  }, [])

  const toggleAll = useCallback(() => {
    if (expandedAll) {
      setExpandedGroups(new Set())
    } else {
      setExpandedGroups(new Set(departments))
    }
  }, [expandedAll, departments])

  return (
    <>
      <SEO
        title="Outdoor Doctor | Sonoscan Healthcare"
        description="View the OPD doctor consultation schedule at Sonoscan Healthcare — specialist consultation days and timings across Kolkata, Malda, Balurghat, and Gangarampur."
      />

      {/* ═══ Hero ═══ */}
      <section className="rounded-b-4xl relative overflow-hidden min-h-[50vh] bg-[#0a0715] -mt-16 lg:-mt-28 flex items-center">
        <div className="absolute inset-0 overflow-hidden">
          <img
            src="../images/opd.png"
            alt="OPD consultation"
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
              Outdoor <span className="text-violet-300">Doctor</span>
            </h1>
            <p className="text-lg lg:text-xl text-slate-300 leading-relaxed max-w-xl">
              Find specialist consultation days and timings at the Sonoscan branch near you. Select a branch to view the OPD schedule.
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
              <BranchSelector variant="default" showDoctorCount={false} />
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
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  placeholder="Search doctor, qualification or department..."
                  className="w-full pl-10 pr-4 py-3 bg-bg-card border border-violet-200 rounded-xl text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-500/30 focus:border-violet-400 transition-all text-sm"
                />
                {search && (
                  <button
                    onClick={() => setSearch('')}
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

          {/* Department filter chips */}
          <div className="flex flex-wrap items-center gap-2 mt-4">
            <button
              onClick={() => handleDeptClick(null)}
              className={`group inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg font-medium transition-all border ${
                activeDept === null
                  ? 'bg-violet-600 text-white border-violet-600 shadow-sm shadow-violet-300/30'
                  : 'bg-bg-card text-slate-500 border-violet-200 hover:border-violet-300 hover:text-slate-700'
              }`}
            >
              <span>All Departments</span>
              <span
                className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                  activeDept === null
                    ? 'bg-white/20 text-white'
                    : 'bg-violet-100 text-violet-600 group-hover:bg-violet-200'
                }`}
              >
                {totalAll}
              </span>
            </button>

            {groups.map(g => {
              const isActive = activeDept === g.name
              return (
                <button
                  key={g.name}
                  onClick={() => handleDeptClick(g.name)}
                  className={`group inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg font-medium transition-all border ${
                    isActive
                      ? 'bg-violet-600 text-white border-violet-600 shadow-sm shadow-violet-300/30 scale-105'
                      : 'bg-bg-card text-slate-500 border-violet-200 hover:border-violet-300 hover:text-slate-700'
                  } ${search && !filteredGroups.find(fg => fg.name === g.name) ? 'opacity-30 pointer-events-none' : ''}`}
                >
                  <span className="text-sm leading-none">{DEPT_ICONS[g.name] ?? '🩺'}</span>
                  <span>{g.name}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                      isActive
                        ? 'bg-white/20 text-white'
                        : 'bg-violet-100 text-violet-600 group-hover:bg-violet-200'
                    }`}
                  >
                    {g.doctors.length}
                  </span>
                </button>
              )
            })}
          </div>
        </div>
      </section>

      {/* ═══ Grouped Department Sections ═══ */}
      <section className="py-12 lg:py-16 bg-bg-surface">
        <div className="max-w-7xl mx-auto px-6">
          {filteredGroups.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-5xl mb-4">🔍</div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">No Doctors Found</h3>
              <p className="text-slate-500">
                {search
                  ? `No outdoor doctors match "${search}" at ${selectedBranch.name}. Try a different search term.`
                  : `No outdoor doctors available at ${selectedBranch.name}. Try selecting a different branch.`}
              </p>
            </div>
          ) : (
            <div className="space-y-8">
              {filteredGroups.map((group, groupIdx) => {
                const isExpanded = expandedGroups.has(group.name)
                const isActiveDept = activeDept === group.name

                return (
                  <Reveal key={group.id} direction="up" delay={groupIdx * 100} threshold={0.01}>
                    <div
                      id={`group-${group.name}`}
                      className={`bg-bg-card rounded-2xl border overflow-hidden transition-all duration-300 ${
                        isActiveDept
                          ? 'border-violet-300 shadow-lg shadow-violet-200/30 ring-1 ring-violet-200'
                          : 'border-violet-200 hover:border-violet-200 shadow-sm'
                      }`}
                    >
                      {/* ── Group Header (clickable) ── */}
                      <button
                        onClick={() => toggleGroup(group.name)}
                        className="w-full flex items-center justify-between px-6 py-4 hover:bg-violet-50/50 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-violet-700 flex items-center justify-center text-lg shadow-sm shrink-0">
                            {DEPT_ICONS[group.name] ?? '🩺'}
                          </div>
                          <div className="text-left">
                            <h3 className="text-lg font-bold text-slate-900">{group.name}</h3>
                            <p className="text-xs text-slate-500">
                              {group.doctors.length} doctor{group.doctors.length !== 1 ? 's' : ''}
                              {search && ` matching "${search}"`}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          {isActiveDept && (
                            <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-violet-100 text-violet-700 border border-violet-200">
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
                          isExpanded ? 'max-h-[70vh] opacity-100 overflow-y-auto' : 'max-h-0 opacity-0'
                        }`}
                      >
                        <div className="px-6 pb-6 pt-2 border-t border-violet-100">
                          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                            {group.doctors.map(doc => (
                              <OutdoorDoctorCard key={doc.name} doc={doc} department={group.name} />
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
              Showing {totalDoctors} of {totalAll} outdoor doctors at {selectedBranch.name}
            </p>
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <span className="inline-block w-2 h-2 rounded-full bg-violet-400" />
              {filteredGroups.length} departments
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
              Need an OPD Consultation?
            </h2>
            <p className="text-lg text-slate-500 mb-8 max-w-2xl mx-auto">
              Book your specialist consultation today — our doctors are available across all Sonoscan branches.
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
