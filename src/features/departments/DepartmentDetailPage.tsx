import { useEffect, useMemo } from 'react'
import { Link, useNavigate, useParams, useSearch } from '@tanstack/react-router'
import SEO from '../ui/SEO'
import { departments } from '../../data/departments'
import { branches } from '../../data/branches'
import { teamMembers } from '../../data/doctors'
import { diagnosticBranchDepartments } from '../../data/diagnosticBranchDepartments'
import { useBranch } from '../../context/BranchContext'
import BrandWave from '../ui/BrandWave'
import Reveal from '../ui/Reveal'
import DoctorCard from '../ui/DoctorCard'

function CheckIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
    </svg>
  )
}

export default function DepartmentDetailPage() {
  const { id } = useParams({ from: '/departments/$id' })
  const { selectedBranch, setSelectedBranch } = useBranch()
  const search = useSearch({ from: '/departments/$id' })
  const navigate = useNavigate({ from: '/departments/$id' })
  const dept = departments.find(d => d.id === id)

  const availableBranchIds = useMemo(() => dept?.branchIds ?? [], [dept])

  // Support deep links like /departments/pathology?branch=gangarampur (mirrors
  // the source site's services.php?d=...&c=... pattern). Keeps the selected
  // branch in sync with the URL when present, and clears the param when it
  // points at a branch this department isn't available at.
  useEffect(() => {
    if (!dept || !search.branch) return
    const b = branches.find(x => x.id === search.branch)
    if (b && availableBranchIds.includes(b.id)) {
      setSelectedBranch(b)
    } else {
      navigate({ search: {} })
    }
  }, [dept, search.branch, availableBranchIds, setSelectedBranch, navigate])

  if (!dept) {
    return (
      <>
        <SEO title="Department Not Found | Sonoscan Healthcare" description="The requested department could not be found at Sonoscan Healthcare." />
        <section className="min-h-screen bg-bg-base flex items-center justify-center px-6">
          <div className="text-center animate-fade-in-up">
            <div className="text-6xl mb-6">🔍</div>
            <h1 className="text-3xl font-bold text-slate-900 mb-4">Department Not Found</h1>
            <p className="text-slate-500 mb-8">The department you're looking for doesn't exist.</p>
            <Link
              to="/departments"
              className="bg-violet-600 hover:bg-violet-700 text-white px-8 py-3 rounded-lg font-semibold transition-all"
            >
              Back to Departments
            </Link>
          </div>
        </section>
      </>
    )
  }

  // Branch-specific content from the source site (services.php?d=X&c=Branch)
  const branchContent = diagnosticBranchDepartments[selectedBranch.id]?.[dept.id]
  const isAvailableAtBranch = dept.branchIds.includes(selectedBranch.id)

  // Use the branch content when available; otherwise fall back to the curated
  // department content so the page never looks empty.
  const sections = branchContent?.sections && branchContent.sections.length > 0 ? branchContent.sections : dept.sections
  const sourceTitle = branchContent?.sourceTitle || dept.sourceTitle
  const intro = branchContent?.intro || dept.intro

  const currentIndex = departments.findIndex(d => d.id === id)
  const prevDept = currentIndex > 0 ? departments[currentIndex - 1] : null
  const nextDept = currentIndex < departments.length - 1 ? departments[currentIndex + 1] : null

  const heroImage = sections.find(s => s.img)?.img ?? ''
  const totalTests = sections.reduce((n, s) => n + s.tests.length, 0)

  return (
    <>
      <SEO
        title={`${dept.name} at ${selectedBranch.name} | Sonoscan Healthcare`}
        description={`${dept.name} at Sonoscan ${selectedBranch.name}. ${dept.tagline}. Available at ${dept.branchIds.length} branches. Book an appointment today.`}
      />

      {/* ═══ Hero ═══ */}
      <section className="rounded-b-4xl relative overflow-hidden min-h-screen bg-[#0a0715] -mt-16 lg:-mt-28">
        <div className="absolute inset-0 overflow-hidden">
          {heroImage ? (
            <img
              src={heroImage}
              alt={`${dept.name} at ${selectedBranch.name}`}
              className="w-full h-full object-cover animate-slide-in-top"
              loading="eager"
            />
          ) : (
            <div
              className="w-full h-full animate-slide-in-top"
              style={{ background: 'linear-gradient(135deg, #1e1b4b 0%, #5552e7 55%, #8b5cf6 100%)' }}
            />
          )}
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
              <span className="text-white/80 min-w-0 truncate" aria-current="page">{dept.name}</span>
            </nav>

            <div
              className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium mb-6 border border-white/10 opacity-0 animate-fade-in-up"
              style={{ animationDelay: '900ms', animationFillMode: 'forwards' }}
            >
              {dept.icon} {sourceTitle || 'Department'}
            </div>

            <h1
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-[1.1] mb-6 opacity-0 animate-fade-in-up"
              style={{ animationDelay: '1100ms', animationFillMode: 'forwards' }}
            >
              {dept.name}
            </h1>

            <p
              className="text-lg lg:text-xl text-slate-300 leading-relaxed max-w-xl mb-8 opacity-0 animate-fade-in-up"
              style={{ animationDelay: '1300ms', animationFillMode: 'forwards' }}
            >
              {dept.tagline}
            </p>

            <div
              className="flex flex-wrap gap-4 opacity-0 animate-fade-in-up"
              style={{ animationDelay: '1500ms', animationFillMode: 'forwards' }}
            >
              <div className="flex items-center gap-1.5 text-sm text-white/70">
                <svg className="w-4 h-4 text-violet-300" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                {sections.length} procedure section{sections.length === 1 ? '' : 's'}
              </div>
              <div className="flex items-center gap-1.5 text-sm text-white/70">
                <svg className="w-4 h-4 text-violet-300" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
                {totalTests} tests & procedures
              </div>
              <div className="flex items-center gap-1.5 text-sm text-white/70">
                <svg className="w-4 h-4 text-violet-300" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                </svg>
                {dept.branchIds.length} {dept.branchIds.length === 1 ? 'branch' : 'branches'}
              </div>
            </div>
          </div>
        </div>
        <BrandWave variant="white" />
      </section>

      {/* ═══ Branch switcher ═══ */}
      <section className="py-8 bg-bg-surface border-b border-violet-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-wrap items-center justify-center gap-2.5">
            <span className="text-sm font-semibold text-slate-700 mr-1">Branch:</span>
            {branches.map(b => {
              const available = dept.branchIds.includes(b.id)
              const isActive = b.id === selectedBranch.id
              return (
                <button
                  key={b.id}
                  onClick={() => {
                    if (!available) return
                    setSelectedBranch(b)
                    navigate({ search: { branch: b.id } })
                  }}
                  disabled={!available}
                  aria-pressed={isActive}
                  title={available ? `Show ${dept.name} at ${b.name}` : `${dept.name} not available at ${b.name}`}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all border ${
                    isActive
                      ? 'bg-violet-600 text-white border-violet-600 shadow-lg shadow-violet-500/25'
                      : available
                        ? 'bg-bg-card text-slate-600 border-violet-200 hover:border-violet-400 hover:text-violet-600'
                        : 'bg-slate-50 text-slate-300 border-slate-200 cursor-not-allowed opacity-70'
                  }`}
                >
                  <span className="inline-flex items-center gap-1.5">
                    {available ? <CheckIcon className="w-3 h-3" /> : <span aria-hidden="true">✕</span>}
                    {b.name}
                  </span>
                </button>
              )
            })}
          </div>
        </div>
      </section>

      {/* ═══ About ═══ */}
      <section className="py-16 lg:py-20 bg-bg-surface border-b border-violet-200">
        <div className="max-w-7xl mx-auto px-6">
          <Reveal direction="up">
            <div className="max-w-3xl mx-auto text-center">
              <p className="text-xs font-semibold text-violet-600 uppercase tracking-wider mb-3">About The Department</p>
              <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-3">
                {dept.name} At {selectedBranch.name}
              </h2>
              {!isAvailableAtBranch && (
                <p className="inline-flex items-center gap-2 bg-amber-50 border border-amber-200 text-amber-700 text-sm font-medium px-4 py-2 rounded-full mb-6">
                  ⚠️ This department isn't running at {selectedBranch.name} — showing content from our closest branch.
                </p>
              )}
              <p className="text-slate-600 leading-relaxed text-lg">{intro}</p>
              <p className="text-slate-500 leading-relaxed mt-4">{dept.description}</p>
              {sections.some(s => s.img) && (
                <div className="grid sm:grid-cols-2 gap-4 mt-10 text-left">
                  {sections.slice(0, 2).map(s => (
                    s.img ? (
                      <div key={s.title} className="rounded-2xl overflow-hidden border border-violet-200 shadow-lg shadow-violet-500/5 group">
                        <img
                          src={s.img}
                          alt={`${s.title} at ${selectedBranch.name}`}
                          className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-105"
                          loading="lazy"
                        />
                      </div>
                    ) : null
                  ))}
                </div>
              )}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══ Procedure sections ═══ */}
      <section className="py-20 lg:py-28 bg-bg-base">
        <div className="max-w-7xl mx-auto px-6">
          <Reveal direction="up">
            <div className="text-center max-w-2xl mx-auto mb-14">
              <p className="text-xs font-semibold text-violet-600 uppercase tracking-wider mb-2">What We Offer</p>
              <h2 className="text-3xl lg:text-4xl font-bold text-slate-900">
                {sourceTitle || 'Procedures & Tests'}
              </h2>
              <p className="text-slate-500 leading-relaxed mt-3">
                Procedures available at the {selectedBranch.name} branch
              </p>
            </div>
          </Reveal>

          <div className="space-y-10">
            {sections.map((section, i) => (
              <Reveal key={`${section.title}-${i}`} direction="up" delay={i * 60} threshold={0.05}>
                <div className="bg-bg-card rounded-3xl border border-violet-200 overflow-hidden shadow-lg shadow-violet-500/5 grid lg:grid-cols-5">
                  {section.img ? (
                    <div className="lg:col-span-2 relative min-h-56 lg:min-h-80 overflow-hidden">
                      <img
                        src={section.img}
                        alt={`${section.title} at ${selectedBranch.name}`}
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" aria-hidden="true" />
                    </div>
                  ) : (
                    <div
                      className="lg:col-span-2 min-h-56 lg:min-h-80 relative overflow-hidden"
                      style={{ background: 'linear-gradient(135deg, #ede9fe 0%, #e0e7ff 100%)' }}
                    >
                      <div className="absolute inset-0 flex items-center justify-center text-7xl opacity-40" aria-hidden="true">
                        {dept.icon}
                      </div>
                    </div>
                  )}
                  <div className="lg:col-span-3 p-7 lg:p-10">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-violet-700 flex items-center justify-center text-white shrink-0">
                        {dept.icon}
                      </div>
                      <h3 className="text-xl lg:text-2xl font-bold text-slate-900">{section.title}</h3>
                    </div>
                    {section.description && (
                      <p className="text-slate-600 leading-relaxed mb-5">{section.description}</p>
                    )}
                    {section.tests.length > 0 && (
                      <ul className="grid sm:grid-cols-2 gap-3">
                        {section.tests.map(test => (
                          <li key={test} className="flex items-start gap-2.5 text-sm text-slate-600">
                            <span className="w-5 h-5 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center shrink-0 mt-0.5">
                              <CheckIcon className="w-3 h-3 text-emerald-600" />
                            </span>
                            {test}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ Our Doctors ═══ */}
      <section className="py-20 lg:py-24 bg-bg-base border-t border-violet-200">
        <div className="max-w-7xl mx-auto px-6">
          <Reveal direction="up">
            <div className="text-center max-w-2xl mx-auto mb-14">
              <p className="text-xs font-semibold text-violet-600 uppercase tracking-wider mb-2">Our Team</p>
              <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-3">
OPD Consultants at {selectedBranch.name}
              </h2>
              <p className="text-slate-500 leading-relaxed">
                Our experienced specialists are dedicated to providing exceptional care in {dept.name.toLowerCase()}.
              </p>
            </div>
          </Reveal>

          {(() => {
            const deptDoctors = teamMembers
              .filter(doc => doc.branchIds.includes(selectedBranch.id) && doc.specialty === dept.name)
              .sort((a, b) => a.name.localeCompare(b.name))

            if (deptDoctors.length === 0) {
              return (
                <Reveal direction="up">
                  <div className="text-center py-16 bg-bg-card rounded-2xl border border-violet-200">
                    <div className="text-5xl mb-4">👨‍⚕️</div>
                    <p className="text-slate-500 mb-2">No doctors are currently listed for {dept.name} at {selectedBranch.name}.</p>
                    <p className="text-sm text-slate-400 mb-6">Our department specialists are available through our OPD consultation service.</p>
                    <Link
                      to="/outdoor-doctor"
                      className="inline-flex items-center gap-2 bg-violet-600 hover:bg-violet-700 text-white px-6 py-3 rounded-lg font-semibold transition-all hover:shadow-lg active:scale-[0.98]"
                    >
                      View OPD Schedule
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                      </svg>
                    </Link>
                  </div>
                </Reveal>
              )
            }

            return (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {deptDoctors.map((doctor, i) => (
                  <Reveal key={doctor.slug} direction="up" delay={i * 50} threshold={0.01}>
                    <DoctorCard doctor={doctor} />
                  </Reveal>
                ))}
              </div>
            )
          })()}

          <div className="text-center mt-10">
            <Link
              to="/doctors"
              className="group/link inline-flex items-center gap-2 text-violet-600 font-medium hover:text-violet-700 transition-colors"
            >
              <span className="overflow-hidden h-5 inline-block align-middle">
                <span className="flex flex-col transition-transform duration-300 group-hover/link:-translate-y-1/2">
                  <span className="h-5 leading-5">View All Specialists</span>
                  <span className="h-5 leading-5">View All Specialists</span>
                </span>
              </span>
              <svg className="w-4 h-4 transition-all duration-300 group-hover/link:translate-x-1" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* ═══ Availability ═══ */}
      <section className="py-20 lg:py-24 bg-bg-surface border-t border-violet-200">
        <div className="max-w-5xl mx-auto px-6">
          <Reveal direction="up">
            <div className="text-center mb-10">
              <p className="text-xs font-semibold text-violet-600 uppercase tracking-wider mb-2">Where To Find Us</p>
              <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">Available At {dept.branchIds.length} {dept.branchIds.length === 1 ? 'Branch' : 'Branches'}</h2>
              <p className="text-slate-500">Select a branch to see its exact procedures and images.</p>
            </div>
          </Reveal>

          <Reveal direction="up" delay={100}>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {branches.map(b => {
                const available = dept.branchIds.includes(b.id)
                const isSelected = b.id === selectedBranch.id
                return (
                  <button
                    key={b.id}
                    onClick={() => {
                      if (!available) return
                      setSelectedBranch(b)
                      navigate({ search: { branch: b.id } })
                    }}
                    disabled={!available}
                    className={`rounded-2xl border p-6 text-left transition-all ${
                      isSelected
                        ? 'bg-violet-50 border-violet-400 ring-2 ring-violet-300'
                        : available
                          ? 'bg-bg-card border-emerald-200 hover:shadow-lg hover:shadow-emerald-500/10 hover:border-emerald-300'
                          : 'bg-slate-50 border-slate-200 opacity-60'
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-3">
                      <span
                        className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          available ? 'bg-emerald-500 text-white' : 'bg-slate-300 text-slate-500'
                        }`}
                      >
                        {available ? <CheckIcon className="w-4 h-4" /> : <span aria-hidden="true">—</span>}
                      </span>
                      <h3 className="font-semibold text-slate-900">{b.name}</h3>
                      {isSelected && (
                        <span className="ml-auto text-[10px] font-bold uppercase tracking-wider text-violet-600 bg-violet-100 px-2 py-0.5 rounded-full">
                          Viewing
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-slate-500 leading-relaxed mb-4">{b.address}</p>
                    <span
                      className={`inline-flex items-center gap-1.5 text-sm font-medium ${
                        available ? 'text-violet-600' : 'text-slate-400'
                      }`}
                    >
                      {available ? 'Switch to this branch' : 'Not available'}
                      {available && (
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                        </svg>
                      )}
                    </span>
                  </button>
                )
              })}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══ CTA ═══ */}
      <section className="py-20 lg:py-24 bg-bg-base border-t border-violet-200">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <Reveal direction="up">
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-6">
              Need {dept.name} Services At {selectedBranch.name}?
            </h2>
          </Reveal>
          <Reveal direction="up" delay={120}>
            <p className="text-lg text-slate-500 mb-10 max-w-2xl mx-auto">
              Book an appointment or talk to our team to find out more about {dept.name.toLowerCase()} at Sonoscan {selectedBranch.name}.
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
              to="/departments"
              className="inline-flex items-center gap-2 border-2 border-violet-300 hover:border-violet-400 text-slate-600 hover:text-slate-900 px-8 py-4 rounded-lg font-semibold text-lg transition-all"
            >
              All Departments
            </Link>
          </div>
        </div>
      </section>

      {/* ═══ Prev / Next ═══ */}
      <section className="pb-20 bg-bg-base">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between pt-8 border-t border-violet-200">
            {prevDept ? (
              <Link
                to="/departments/$id"
                params={{ id: prevDept.id }}
                className="flex items-center gap-2 text-slate-500 hover:text-violet-600 transition-colors group"
              >
                <svg className="w-5 h-5 transition-transform group-hover:-translate-x-1" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                </svg>
                <span className="hidden sm:inline">{prevDept.icon} {prevDept.name}</span>
              </Link>
            ) : <div />}
            {nextDept && (
              <Link
                to="/departments/$id"
                params={{ id: nextDept.id }}
                className="flex items-center gap-2 text-slate-500 hover:text-violet-600 transition-colors group"
              >
                <span className="hidden sm:inline">{nextDept.name} {nextDept.icon}</span>
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
