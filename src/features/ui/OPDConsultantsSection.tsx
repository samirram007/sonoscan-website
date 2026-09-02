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

function getInitials(name: string) {
  return name
    .replace(/^Dr\.?\s*/i, '')
    .split(/\s+/)
    .map(t => t.charAt(0).toUpperCase())
    .slice(0, 2)
    .join('')
}

export default function OPDConsultantsSection({
  groups,
  branchName,
  previewCount,
}: OPDConsultantsSectionProps) {
  const [search, setSearch] = useState('')
  const [deptFilter, setDeptFilter] = useState('all')
  const [deptChipFilter, setDeptChipFilter] = useState('all')

  const departments = useMemo(() => {
    const base = previewCount ? groups.slice(0, previewCount) : groups
    return ['all', ...base.map(g => g.name)]
  }, [groups, previewCount])

  const deptChips = useMemo(() => {
    const base = previewCount ? groups.slice(0, previewCount) : groups
    return base.map(g => ({
      name: g.name,
      icon: DEPT_ICONS[g.name] ?? '🩺',
    }))
  }, [groups, previewCount])

  const filteredGroups = useMemo(() => {
    const base = previewCount ? groups.slice(0, previewCount) : groups
    const q = search.toLowerCase().trim()

    return base
      .map(group => {
        if (deptFilter !== 'all' && group.name !== deptFilter) return null
        if (deptChipFilter !== 'all' && group.name !== deptChipFilter) return null

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
  }, [groups, previewCount, search, deptFilter, deptChipFilter])

  const totalFiltered = filteredGroups.reduce((n, g) => n + g.doctors.length, 0)
  const totalDoctors = (previewCount ? groups.slice(0, previewCount) : groups).reduce(
    (n, g) => n + g.doctors.length,
    0
  )

  return (
    <section className="bg-[#fbfaf7]">
    <div className="max-w-7xl mx-auto px-6 py-20 lg:py-28">
      {/* Header — matches Doctors at {branch.name} */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
        <div>
          <p className="text-[#e2644a] text-sm font-bold uppercase tracking-[0.2em] mb-3">
            Meet the OPD specialists
          </p>
          <h2 className="text-4xl font-black tracking-[-0.04em] text-[#1c2730]">
            Specialist OPD Doctors at {branchName}
          </h2>
        </div>
        <Link
          to="/outdoor-doctor"
          className="font-bold text-sm text-[#1c5948] hover:text-[#e2644a] transition-colors"
        >
          View all OPD doctors ↗
        </Link>
      </div>

      {/* Search + Filter bar — matches Doctors section */}
      <div className="flex flex-col md:flex-row gap-3 mb-5">
        <label className="relative flex-1">
          <span className="sr-only">Search doctors</span>
          <svg
            className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
            />
          </svg>
          <input
            type="search"
            value={search}
            onChange={event => setSearch(event.target.value)}
            placeholder="Search by doctor or qualification"
            className="w-full rounded-xl border border-[#1c2730]/15 bg-white py-3.5 pl-11 pr-4 text-sm text-[#1c2730] outline-none focus:border-[#e2644a]"
          />
        </label>
        <label className="md:w-64">
          <span className="sr-only">Filter by department</span>
          <select
            value={deptFilter}
            onChange={event => {
              setDeptFilter(event.target.value)
              setDeptChipFilter(event.target.value)
            }}
            className="w-full rounded-xl border border-[#1c2730]/15 bg-white px-4 py-3.5 text-sm text-[#1c2730] outline-none focus:border-[#e2644a]"
          >
            <option value="all">All departments</option>
            {departments.filter(d => d !== 'all').map(dept => (
              <option key={dept} value={dept}>
                {dept}
              </option>
            ))}
          </select>
        </label>
      </div>

      {/* Department chip filters — matches Doctors section */}
      {deptChips.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-8">
          <button
            type="button"
            onClick={() => {
              setDeptChipFilter('all')
              setDeptFilter('all')
            }}
            className={`rounded-full border px-4 py-2 text-xs font-bold transition-colors ${
              deptChipFilter === 'all'
                ? 'border-[#1c5948] bg-[#1c5948] text-white'
                : 'border-[#1c2730]/15 bg-white text-slate-600 hover:border-[#1c5948]'
            }`}
          >
            All departments
          </button>
          {deptChips.map(({ name, icon }) => (
            <button
              key={name}
              type="button"
              onClick={() => {
                const next = deptChipFilter === name ? 'all' : name
                setDeptChipFilter(next)
                setDeptFilter(next)
              }}
              className={`rounded-full border px-4 py-2 text-xs font-bold transition-colors ${
                deptChipFilter === name
                  ? 'border-[#e2644a] bg-[#e2644a] text-white'
                  : 'border-[#1c2730]/15 bg-white text-slate-600 hover:border-[#e2644a]'
              }`}
            >
              <span className="mr-1.5">{icon}</span>
              {name}
            </button>
          ))}
        </div>
      )}

      {/* Results count */}
      <p className="mb-5 text-sm text-slate-500">
        Showing {totalFiltered} of {totalDoctors} doctors
      </p>

      {/* Doctor card grid — matches Doctors at {branch.name} style */}
      {filteredGroups.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredGroups.map(group => (
            <div
              key={group.id}
              className="overflow-hidden rounded-2xl border border-[#1c2730]/10 bg-white"
            >
              <div className="flex items-center justify-between bg-[#1c2730] px-5 py-4">
                <h3 className="font-black text-white">
                  {group.name}
                  <span className="ml-2 text-white/60 font-medium text-sm">
                    ({group.doctors.length})
                  </span>
                </h3>
                <span className="rounded-full bg-[#f0b35b] px-2.5 py-1 text-xs font-black text-[#1c2730]">
                  {group.doctors.length}
                </span>
              </div>
              <div className="divide-y divide-[#1c2730]/10">
                {group.doctors.map(doc => (
                  <div
                    key={doc.name}
                    className="group flex items-center gap-3 px-5 py-4 hover:bg-[#f5f1e9] transition-colors"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#d8e7dc] text-xs font-black text-[#1c5948]">
                      {getInitials(doc.name)}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-bold text-[#1c2730] group-hover:text-[#e2644a]">
                        {doc.name}
                      </p>
                      <p className="truncate text-xs text-slate-500">{doc.qualification}</p>
                      {doc.schedule.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-1">
                          {doc.schedule.slice(0, 2).map(slot => (
                            <span
                              key={`${slot.day}-${slot.time}`}
                              className="text-[10px] font-semibold text-[#1c5948] bg-[#d8e7dc] px-1.5 py-0.5 rounded"
                            >
                              {slot.day} {slot.time}
                            </span>
                          ))}
                          {doc.schedule.length > 2 && (
                            <span className="text-[10px] text-slate-400">
                              +{doc.schedule.length - 2} more
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed border-[#1c2730]/20 bg-white py-12 text-center text-sm text-slate-500">
          No doctors found. Try another search or filter.
        </div>
      )}
    </div>
    </section>
  )
}
