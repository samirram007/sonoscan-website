import { Link } from '@tanstack/react-router'
import { useRef, useCallback, type KeyboardEvent } from 'react'
import SEO from '../ui/SEO'
import { departments } from '../../data/departments'
import { diagnosticBranchDepartments } from '../../data/diagnosticBranchDepartments'
import { branches } from '../../data/branches'
import { useBranch } from '../../context/BranchContext'
import Reveal from '../ui/Reveal'
import BrandWave from '../ui/BrandWave'

function CheckIcon({ className = 'w-3.5 h-3.5' }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth="3" stroke="currentColor" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
    </svg>
  )
}

function CrossIcon({ className = 'w-3 h-3' }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth="3" stroke="currentColor" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
    </svg>
  )
}

// Display order mirrors the source site's department listing
// (diagnostic-doctor.php): Pathology → Radiology → … → Others.
const sourceOrder = ['pathology', 'radiology', 'cardiology', 'neurology', 'ent', 'gastroenterology', 'urology', 'dental', 'skin', 'others']

export default function DepartmentsPage() {
  const { selectedBranch, setSelectedBranch } = useBranch()

  // Per-department branch availability comes straight from the source data
  // (diagnostic-doctor.php), which lists exactly which branches each
  // department runs at.
  // Departments available at the currently selected branch are sorted first
  // so the highlighted column is always at the top of the matrix; source
  // display order is preserved within each group (stable sort).
  const availability = departments
    .map(dept => {
      const availableBranchIds = new Set(dept.branchIds)
      const testCount = dept.sections.reduce((n, s) => n + s.tests.length, 0)
      return { dept, availableBranchIds, testCount }
    })
    .sort((a, b) => {
      const rankA = a.availableBranchIds.has(selectedBranch.id) ? 0 : 1
      const rankB = b.availableBranchIds.has(selectedBranch.id) ? 0 : 1
      return rankA - rankB
    })
  const availabilityByDept = new Map(availability.map(a => [a.dept.id, a]))

  // Number of departments that run at each branch — shown under each branch
  // heading in the matrix so visitors can gauge coverage at a glance.
  const branchCounts = new Map(
    branches.map((b): [string, number] => [b.id, availability.filter(a => a.availableBranchIds.has(b.id)).length]),
  )

  // WAI-ARIA radiogroup pattern for the matrix column headers (roving
  // tabindex): only the selected branch is in the tab order, and arrow
  // keys move focus + select, Home/End jump to the first/last branch.
  const branchRadioRefs = useRef<(HTMLButtonElement | null)[]>([])

  const handleBranchRadioKeyDown = useCallback((e: KeyboardEvent<HTMLButtonElement>, index: number) => {
    const count = branches.length
    let nextIndex: number | null = null
    switch (e.key) {
      case 'ArrowRight':
      case 'ArrowDown':
        nextIndex = (index + 1) % count
        break
      case 'ArrowLeft':
      case 'ArrowUp':
        nextIndex = (index - 1 + count) % count
        break
      case 'Home':
        nextIndex = 0
        break
      case 'End':
        nextIndex = count - 1
        break
    }
    if (nextIndex !== null) {
      e.preventDefault()
      setSelectedBranch(branches[nextIndex])
      branchRadioRefs.current[nextIndex]?.focus()
    }
  }, [setSelectedBranch])

  // Departments that run at the currently selected branch — mirrors the
  // source site's branch-aware department listing (diagnostic-doctor.php),
  // which only shows the departments available at the chosen branch.
  const branchDepts = departments
    .filter(dept => dept.branchIds.includes(selectedBranch.id))
    .sort((a, b) => {
      const ra = sourceOrder.indexOf(a.id)
      const rb = sourceOrder.indexOf(b.id)
      return (ra === -1 ? 99 : ra) - (rb === -1 ? 99 : rb)
    })

  return (
    <>
      <SEO
        title="Departments | Sonoscan Healthcare"
        description="Explore the departments at Sonoscan Healthcare — Pathology, Radiology & Imaging, Cardiology, Gastroenterology, Neurology, ENT, Urology, Dental, Skin and more."
      />

      {/* ═══ Hero ═══ */}
      <section className="rounded-b-4xl relative overflow-hidden min-h-screen bg-[#0a0715] -mt-16 lg:-mt-28">
        <div className="absolute inset-0 overflow-hidden">
          <img
            src="../images/lab.png"
            alt="Sonoscan departments"
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
          <div className="max-w-2xl">
            <nav
              className="flex flex-wrap items-center gap-2 text-sm text-white/60 mb-4 opacity-0 animate-fade-in-up"
              style={{ animationDelay: '700ms', animationFillMode: 'forwards' }}
              aria-label="Breadcrumb"
            >
              <Link to="/" className="text-white/60 hover:text-white transition-colors shrink-0">Home</Link>
              <svg className="w-3.5 h-3.5 text-white/30 shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
              </svg>
              <span className="text-white/80 min-w-0 truncate" aria-current="page">Departments</span>
            </nav>
            <div
              className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium mb-6 border border-white/10 opacity-0 animate-fade-in-up"
              style={{ animationDelay: '900ms', animationFillMode: 'forwards' }}
            >
              🏥 Our Departments
            </div>
            <h1
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-[1.1] mb-6 opacity-0 animate-fade-in-up"
              style={{ animationDelay: '1100ms', animationFillMode: 'forwards' }}
            >
              Departments At{' '}
              <span className="text-violet-300">Sonoscan</span>
            </h1>
            <p
              className="text-lg lg:text-xl text-slate-300 leading-relaxed max-w-xl mb-10 opacity-0 animate-fade-in-up"
              style={{ animationDelay: '1300ms', animationFillMode: 'forwards' }}
            >
              From NABL-accredited pathology to advanced radiology, dental and aesthetics — explore the departments that make Sonoscan Eastern India's most trusted diagnostic centre.
            </p>
            <div className="opacity-0 animate-fade-in-up" style={{ animationDelay: '1500ms', animationFillMode: 'forwards' }}>
              <Link
                to="/appointments"
                className="group relative inline-flex items-center justify-center bg-[#27272e] text-white pt-[17.5px] pb-[19.5px] px-[30px] rounded-[5px] font-semibold text-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-black/30 active:scale-[0.97]"
              >
                <span className="relative z-10 transition-colors duration-500 group-hover:text-black">Book An Appointment</span>
                <span className="absolute inset-0 bg-white scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500 ease-out" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
        <BrandWave variant="white" />
      </section>

      {/* ═══ Availability by branch ═══ */}
      <section className="py-16 lg:py-20 bg-bg-surface border-b border-violet-200">
        <div className="max-w-7xl mx-auto px-6">
          <Reveal direction="up">
            <div className="text-center max-w-2xl mx-auto mb-10">
              <p className="text-xs font-semibold text-violet-600 uppercase tracking-wider mb-2">Availability Matrix</p>
              <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
                Which Departments Run At Which Branch?
              </h2>
              <p className="text-slate-500 leading-relaxed">
                Not every department operates at every location. Departments available at {selectedBranch.name} are listed first. Check where your nearest specialist is before you visit.
              </p>
            </div>
          </Reveal>

          <Reveal direction="up" delay={100}>
            <div className="bg-bg-card rounded-2xl border border-violet-200 overflow-hidden shadow-lg shadow-violet-500/5">
              <div className="overflow-x-auto">
                <div className="min-w-[720px]">
                  {/* Header row — radiogroup so screen readers treat the
                      branch columns as a single-choice group. The radiogroup
                      contains ONLY the radio buttons; the View branch links
                      live in a separate row below so the group holds nothing
                      but radios (strict ARIA APG compliance). */}
                  <div className="grid grid-cols-[1.3fr_repeat(4,1fr)] bg-violet-600 text-white">
                    <div className="px-5 py-4 text-sm font-semibold">Department</div>
                    <div
                      role="radiogroup"
                      aria-label="Select a branch to highlight in the matrix"
                      aria-orientation="horizontal"
                      className="col-span-4 grid grid-cols-4"
                    >
                      {branches.map((b, bi) => {
                        const isSelected = b.id === selectedBranch.id
                        return (
                          <button
                            key={b.id}
                            ref={el => { branchRadioRefs.current[bi] = el }}
                            type="button"
                            role="radio"
                            aria-checked={isSelected}
                            tabIndex={isSelected ? 0 : -1}
                            onClick={() => setSelectedBranch(b)}
                            onKeyDown={(e) => handleBranchRadioKeyDown(e, bi)}
                            aria-label={`Show departments at ${b.name}${isSelected ? ' (currently selected)' : ''}`}
                            title={isSelected ? `${b.name} — currently selected` : `Switch to ${b.name}`}
                            className={`w-full px-3 pt-3 pb-2 flex flex-col items-center justify-center gap-1 text-sm font-semibold transition-colors cursor-pointer ${
                              isSelected ? 'bg-violet-500/60' : 'hover:bg-violet-500/60'
                            }`}
                          >
                            <span className="flex items-center gap-1.5">
                              <svg className="w-3.5 h-3.5 shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" aria-hidden="true">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                              </svg>
                              {b.name}
                            </span>
                            <span
                              className={`text-[11px] font-medium leading-none ${
                                isSelected ? 'text-white/90' : 'text-violet-100/80'
                              }`}
                            >
                              {branchCounts.get(b.id)} of {availability.length} departments
                            </span>
                          </button>
                        )
                      })}
                    </div>

                    {/* View branch links — a sibling row (not inside the
                        radiogroup), aligned to the same 4 column tracks so
                        each link sits directly under its branch button. */}
                    <div className="col-start-2 col-span-4 grid grid-cols-4">
                      {branches.map(b => {
                        const isSelected = b.id === selectedBranch.id
                        return (
                          <Link
                            key={b.id}
                            to="/services/$id"
                            params={{ id: b.id }}
                            aria-label={`View ${b.name} branch page`}
                            className={`px-3 pt-1 pb-2.5 inline-flex items-center justify-center gap-1 text-[11px] font-medium underline-offset-2 hover:underline transition-colors ${
                              isSelected
                                ? 'bg-violet-500/60 text-white/90 hover:text-white'
                                : 'text-violet-100/80 hover:bg-violet-500/60 hover:text-white'
                            }`}
                          >
                            View branch
                            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" aria-hidden="true">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                            </svg>
                          </Link>
                        )
                      })}
                    </div>
                  </div>

                  {/* Department rows */}
                  {availability.map(({ dept, availableBranchIds, testCount }, i) => (
                    <div
                      key={dept.id}
                      className={`grid grid-cols-[1.3fr_repeat(4,1fr)] ${i % 2 === 0 ? 'bg-white' : 'bg-violet-50/50'}`}
                    >
                      <div className="px-5 py-4 flex items-center gap-3 min-w-0">
                        <span className="text-xl shrink-0" aria-hidden="true">{dept.icon}</span>
                        <div className="min-w-0">
                          <Link
                            to="/departments/$id"
                            params={{ id: dept.id }}
                            search={{ branch: selectedBranch.id }}
                            className="text-sm font-semibold text-slate-900 truncate hover:text-violet-600 transition-colors"
                          >
                            {dept.name}
                          </Link>
                          <p className="text-xs text-slate-400">{testCount} tests & procedures</p>
                        </div>
                      </div>
                      {branches.map(b => {
                        const available = availableBranchIds.has(b.id)
                        const isSelected = b.id === selectedBranch.id
                        return (
                          <div
                            key={b.id}
                            className={`px-3 py-4 flex items-center justify-center border-l border-violet-100 ${
                              isSelected ? 'bg-violet-100/70' : ''
                            }`}
                          >
                            {available ? (
                              <span
                                className="w-7 h-7 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-sm shadow-emerald-500/40"
                                role="img"
                                aria-label={`${dept.name} available at ${b.name}`}
                                title={`${dept.name} available at ${b.name}`}
                              >
                                <CheckIcon className="w-4 h-4" />
                              </span>
                            ) : (
                              <span
                                className="w-7 h-7 rounded-full bg-slate-200 text-slate-400 flex items-center justify-center"
                                role="img"
                                aria-label={`${dept.name} not available at ${b.name}`}
                                title={`${dept.name} not available at ${b.name}`}
                              >
                                <CrossIcon />
                              </span>
                            )}
                          </div>
                        )
                      })}
                    </div>
                  ))}
                </div>
              </div>

              {/* Legend */}
              <div className="px-5 py-3.5 border-t border-violet-200 bg-bg-surface flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-slate-500">
                <span className="inline-flex items-center gap-1.5">
                  <span className="w-3.5 h-3.5 rounded-full bg-emerald-500 inline-block" />
                  Available
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <span className="w-3.5 h-3.5 rounded-full bg-slate-300 inline-block" />
                  Not available
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <span className="w-3.5 h-3.5 rounded bg-violet-200 ring-1 ring-violet-300 inline-block" />
                  Your selected branch
                </span>
                <span className="inline-flex items-center gap-1.5 text-violet-600 font-medium">
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.042 21.672 13.684 16.6m0 0-2.51 2.225.569-9.47 5.227 7.917-3.286-.672Zm-7.518-.267A8.25 8.25 0 1 1 20.25 10.5M8.288 14.212A5.25 5.25 0 1 1 17.25 10.5" />
                  </svg>
                  Click a branch column to switch
                </span>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══ Department grid (diagnostic-doctor.php style) ═══ */}
      <section className="py-20 lg:py-28 bg-bg-base">
        <div className="max-w-7xl mx-auto px-6">
          <Reveal direction="up">
            <div className="text-center max-w-2xl mx-auto mb-14">
              <p className="text-xs font-semibold text-violet-600 uppercase tracking-wider mb-2">
                Departments At {selectedBranch.name}
              </p>
              <h2 className="text-3xl lg:text-4xl font-bold text-slate-900">
                {branchDepts.length} Departments At Our {selectedBranch.name} Centre
              </h2>
              <p className="text-slate-500 leading-relaxed mt-4">
                Only the departments currently running at our {selectedBranch.name} branch are shown below. Use the branch selector to see which departments run at each location.
              </p>
            </div>
          </Reveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {branchDepts.map((dept, i) => {
              const deptAvailability = availabilityByDept.get(dept.id)!
              // Prefer the branch-specific scraped content (sections + images)
              // so the card reflects the selected branch, falling back to the
              // curated department sections when no branch page exists.
              const branchContent = diagnosticBranchDepartments[selectedBranch.id]?.[dept.id]
              const branchSections =
                branchContent && branchContent.sections.length > 0 ? branchContent.sections : dept.sections
              const testCount = branchSections.reduce((n, s) => n + s.tests.length, 0)
              const heroImage = branchSections.find(s => s.img)?.img
              return (
                <Reveal key={dept.id} direction="up" delay={(i % 3) * 80} threshold={0.05}>
                  <Link
                    to="/departments/$id"
                    params={{ id: dept.id }}
                    search={{ branch: selectedBranch.id }}
                    className="group flex flex-col bg-bg-card rounded-2xl border border-violet-200 overflow-hidden hover:border-violet-400 hover:shadow-2xl hover:shadow-violet-500/15 transition-all duration-300 h-full"
                  >
                    {/* Image / icon header */}
                    <div className="relative h-44 overflow-hidden">
                      {heroImage ? (
                        <img
                          src={heroImage}
                          alt={dept.name}
                          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                          loading="lazy"
                        />
                      ) : (
                        <div
                          className="absolute inset-0 flex items-center justify-center text-6xl"
                          style={{ background: 'linear-gradient(135deg, #ede9fe 0%, #e0e7ff 100%)' }}
                        >
                          <span className="transition-transform duration-500 group-hover:scale-125" aria-hidden="true">{dept.icon}</span>
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" aria-hidden="true" />
                      <div className="absolute bottom-4 left-4 right-4">
                        <span className="inline-flex items-center gap-1.5 bg-white/90 backdrop-blur-sm text-slate-800 px-3 py-1 rounded-full text-xs font-semibold shadow-sm">
                          <svg className="w-3 h-3 text-violet-600" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                          {testCount} tests & procedures
                        </span>
                      </div>
                    </div>

                    {/* Body */}
                    <div className="flex flex-col flex-1 p-6">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-violet-700 flex items-center justify-center text-xl shadow-md shadow-violet-500/25 shrink-0">
                          {dept.icon}
                        </span>
                        <h3 className="font-bold text-slate-900 leading-snug group-hover:text-violet-600 transition-colors">
                          {dept.name}
                        </h3>
                      </div>
                      <p className="text-sm text-slate-500 leading-relaxed mb-4 line-clamp-2">{dept.tagline}</p>

                      {/* Branch availability */}
                      <div className="flex flex-wrap gap-1.5 mt-auto">
                        {branches.map(b => {
                          const available = deptAvailability.availableBranchIds.has(b.id)
                          const isSelected = b.id === selectedBranch.id
                          return (
                            <span
                              key={b.id}
                              className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold ${
                                isSelected
                                  ? 'bg-violet-600 text-white border border-violet-600'
                                  : available
                                    ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                                    : 'bg-slate-50 text-slate-300 border border-slate-200'
                              }`}
                            >
                              {isSelected ? (
                                <svg className="w-2.5 h-2.5" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" aria-hidden="true">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                                </svg>
                              ) : available ? (
                                <CheckIcon className="w-2.5 h-2.5" />
                              ) : (
                                <CrossIcon className="w-2 h-2" />
                              )}
                              {b.name}
                            </span>
                          )
                        })}
                      </div>

                      <div className="mt-5 pt-4 border-t border-violet-100 flex items-center justify-between">
                        <span className="text-xs text-slate-400">
                          View at {selectedBranch.name} — {testCount} tests & procedures
                        </span>
                        <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-violet-600 group-hover:gap-2.5 transition-all">
                          Explore
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                          </svg>
                        </span>
                      </div>
                    </div>
                  </Link>
                </Reveal>
              )
            })}
          </div>
        </div>
      </section>

      {/* ═══ CTA ═══ */}
      <section className="py-20 lg:py-24 bg-bg-surface border-t border-violet-200">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <Reveal direction="up">
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-6">
              Looking For A Specific Department?
            </h2>
          </Reveal>
          <Reveal direction="up" delay={120}>
            <p className="text-lg text-slate-500 mb-10 max-w-2xl mx-auto">
              Our team will guide you to the right specialist. Get in touch or book an appointment today.
            </p>
          </Reveal>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/appointments"
              className="inline-flex items-center gap-2 bg-violet-600 hover:bg-violet-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all hover:shadow-2xl hover:shadow-violet-500/25 active:scale-95"
            >
              Book An Appointment
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
              </svg>
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 border-2 border-violet-300 hover:border-violet-400 text-slate-600 hover:text-slate-900 px-8 py-4 rounded-lg font-semibold text-lg transition-all"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
