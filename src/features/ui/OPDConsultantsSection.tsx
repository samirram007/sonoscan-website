import { useState, useMemo } from 'react'
import { Link } from '@tanstack/react-router'
import type { OpdDepartmentGroup } from '../doctors/schema'

interface OPDConsultantsSectionProps {
  groups: OpdDepartmentGroup[]
  branchName: string
  /** Show only first N departments. If omitted, show all. */
  previewCount?: number
}

const DEPT_ICONS: Record<string, string> = {
  Cardiology: '❤️',
  Neurology: '🧠',
  Gastroenterology: '🦠',
  ENT: '👂',
  'Paediatric Cardiology': '👶',
  PFT: '🫁',
  Pathology: '🔬',
  'Radiology & Imaging': '🩻',
}

export default function OPDConsultantsSection({
  groups,
  branchName,
  previewCount,
}: OPDConsultantsSectionProps) {
  const [search, setSearch] = useState('')
  const [deptFilter, setDeptFilter] = useState('all')

  const departments = useMemo(() => {
    const names = groups.map(g => g.name)
    return ['all', ...names]
  }, [groups])

  const filteredGroups = useMemo(() => {
    const base = previewCount ? groups.slice(0, previewCount) : groups
    const q = search.toLowerCase().trim()

    return base
      .map(group => {
        // Department filter
        if (deptFilter !== 'all' && group.name !== deptFilter) return null

        // Search filter
        const doctors = q
          ? group.doctors.filter(
              d =>
                d.name.toLowerCase().includes(q) ||
                d.qualification.toLowerCase().includes(q)
            )
          : group.doctors

        if (doctors.length === 0) return null
        return { ...group, doctors }
      })
      .filter(Boolean) as OpdDepartmentGroup[]
  }, [groups, previewCount, search, deptFilter])

  const [deptOpen, setDeptOpen] = useState(false)

  const totalFiltered = filteredGroups.reduce((n, g) => n + g.doctors.length, 0)

  const selectedLabel = deptFilter === 'all' ? 'All Departments' : deptFilter
  const selectedIcon = deptFilter === 'all' ? '🩺' : (DEPT_ICONS[deptFilter] ?? '🩺')

  return (
    <section className="py-16 lg:py-20 bg-bg-base border-b border-violet-200">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 bg-violet-100 text-violet-700 px-4 py-2 rounded-full text-sm font-medium mb-4 border border-violet-200">
            🩺 OPD Consultations
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
            Specialist OPD Doctors at {branchName}
          </h2>
          <p className="text-lg text-slate-500">
            Explore our specialist consultation schedule across multiple departments.
          </p>
        </div>

        {/* Search + Filter bar */}
        <div className="flex flex-col sm:flex-row gap-3 mb-10 max-w-2xl mx-auto">
          {/* Search input */}
          <div className="relative flex-1">
            <svg
              className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
              />
            </svg>
            <input
              type="text"
              placeholder="Search doctors by name or qualification…"
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-violet-200 bg-bg-card text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-500/30 focus:border-violet-400 transition-all"
            />
            {search && (
              <button
                onClick={() => setSearch('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                aria-label="Clear search"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>

          {/* Department dropdown */}
          <div className="relative sm:w-56">
            <button
              type="button"
              onClick={() => setDeptOpen(prev => !prev)}
              onBlur={() => setTimeout(() => setDeptOpen(false), 150)}
              className="w-full flex items-center gap-2 pl-4 pr-10 py-3 rounded-xl border border-violet-200 bg-bg-card text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-violet-500/30 focus:border-violet-400 transition-all cursor-pointer text-left"
            >
              <span className="text-base leading-none">{selectedIcon}</span>
              <span className="flex-1 truncate">{selectedLabel}</span>
            </button>
            {/* Dropdown menu */}
            {deptOpen && (
              <div className="absolute z-50 mt-2 w-full bg-bg-card border border-violet-200 rounded-xl shadow-xl shadow-violet-500/10 py-1.5 max-h-64 overflow-y-auto">
                {departments.map(dept => {
                  const icon = dept === 'all' ? '🩺' : (DEPT_ICONS[dept] ?? '🩺')
                  const label = dept === 'all' ? 'All Departments' : dept
                  const active = deptFilter === dept
                  return (
                    <button
                      key={dept}
                      type="button"
                      onClick={() => { setDeptFilter(dept); setDeptOpen(false) }}
                      className={`w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-left transition-colors ${
                        active
                          ? 'bg-violet-100 text-violet-700 font-medium'
                          : 'text-slate-700 hover:bg-violet-50'
                      }`}
                    >
                      <span className="text-base leading-none w-5 text-center">{icon}</span>
                      <span className="flex-1 truncate">{label}</span>
                      {active && (
                        <svg className="w-4 h-4 text-violet-600 shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                        </svg>
                      )}
                    </button>
                  )
                })}
              </div>
            )}
            <svg
              className={`absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none transition-transform ${deptOpen ? 'rotate-180' : ''}`}
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
            </svg>
          </div>
        </div>

        {/* Results count */}
        {(search || deptFilter !== 'all') && (
          <p className="text-sm text-slate-400 mb-6 text-center">
            Showing {totalFiltered} doctor{totalFiltered !== 1 ? 's' : ''} in{' '}
            {deptFilter === 'all' ? 'all departments' : deptFilter}
            {search && (
              <> matching &ldquo;{search}&rdquo;</>
            )}
          </p>
        )}

        {/* Doctor groups */}
        {filteredGroups.length > 0 ? (
          <div className="space-y-10">
            {filteredGroups.map(group => (
              <div key={group.id}>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-violet-700 flex items-center justify-center text-lg shadow-md shadow-violet-500/25 shrink-0">
                    {DEPT_ICONS[group.name] ?? '🩺'}
                  </div>
                  <h3 className="font-semibold text-slate-900">{group.name}</h3>
                  <span className="text-xs text-slate-400">
                    {group.doctors.length} doctor{group.doctors.length !== 1 ? 's' : ''}
                  </span>
                </div>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {group.doctors.map(doc => (
                    <div
                      key={doc.name}
                      className="bg-bg-card rounded-xl border border-violet-200 p-4 hover:shadow-lg hover:border-violet-300 transition-all duration-300"
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-violet-500 to-violet-700 flex items-center justify-center text-white font-bold text-xs shrink-0">
                          {doc.name
                            .replace(/^Dr\.?\s*/i, '')
                            .split(/\s+/)
                            .map(t => t.charAt(0).toUpperCase())
                            .slice(0, 2)
                            .join('')}
                        </div>
                        <div className="min-w-0">
                          <h4 className="font-semibold text-slate-900 text-sm truncate">
                            {doc.name}
                          </h4>
                          <p className="text-xs text-slate-400 truncate">{doc.qualification}</p>
                        </div>
                      </div>
                      {doc.schedule.length > 0 && (
                        <div className="flex flex-wrap gap-1.5">
                          {doc.schedule.slice(0, 3).map(slot => (
                            <span
                              key={`${slot.day}-${slot.time}`}
                              className="text-[10px] font-semibold text-violet-700 bg-violet-50 border border-violet-200 px-2 py-0.5 rounded-full"
                            >
                              {slot.day} {slot.time}
                            </span>
                          ))}
                          {doc.schedule.length > 3 && (
                            <span className="text-[10px] text-slate-400">
                              +{doc.schedule.length - 3} more
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-violet-100 flex items-center justify-center">
              <svg className="w-8 h-8 text-violet-400" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
              </svg>
            </div>
            <p className="text-slate-500 font-medium">No doctors found</p>
            <p className="text-sm text-slate-400 mt-1">Try adjusting your search or filter</p>
          </div>
        )}

        {/* View All link */}
        <div className="text-center mt-10">
          <Link
            to="/outdoor-doctor"
            className="group inline-flex items-center gap-2 bg-violet-600 hover:bg-violet-700 text-white px-8 py-3.5 rounded-xl font-semibold transition-all hover:shadow-xl hover:shadow-violet-500/25 active:scale-[0.98]"
          >
            View All OPD Doctors
            <svg
              className="w-4 h-4 transition-transform group-hover:translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  )
}
