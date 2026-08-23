import { useState } from 'react'
import { Link } from '@tanstack/react-router'
import { branches } from '../../data/branches'
import { diagnosticBranchDepartments } from '../../data/diagnosticBranchDepartments'
import { useBranch } from '../../context/BranchContext'
import type { Department } from '../../data/departments'
import DepartmentCardSkeleton from './DepartmentCardSkeleton'

interface DepartmentCardProps {
  dept: Department
  index?: number
}

export default function DepartmentCard({ dept, index = 0 }: DepartmentCardProps) {
  const { selectedBranch } = useBranch()
  const [imgLoaded, setImgLoaded] = useState(false)

  const branchContent = diagnosticBranchDepartments[selectedBranch.id]?.[dept.id]
  const branchSections = branchContent && branchContent.sections.length > 0 ? branchContent.sections : dept.sections
  const heroImage = branchSections.find(s => s.img)?.img
  const testCount = branchSections.reduce((n, s) => n + s.tests.length, 0)

  // Show skeleton until the hero image (if any) has loaded
  if (heroImage && !imgLoaded) {
    return (
      <div
        className="opacity-0 animate-fade-in-up"
        style={{ animationDelay: `${(index % 4) * 80}ms`, animationFillMode: 'forwards' }}
      >
        <img
          src={heroImage}
          alt=""
          className="sr-only"
          onLoad={() => setImgLoaded(true)}
          aria-hidden="true"
        />
        <DepartmentCardSkeleton />
      </div>
    )
  }

  return (
    <Link
      to="/departments/$id"
      params={{ id: dept.id }}
      className="group flex flex-col bg-bg-card rounded-2xl border border-violet-200 overflow-hidden hover:border-violet-400 hover:shadow-2xl hover:shadow-violet-500/15 transition-all duration-300 h-full"
    >
      {/* Image / icon header */}
      <div className="relative h-36 overflow-hidden">
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
        <div className="absolute bottom-3 left-3 right-3">
          <span className="inline-flex items-center gap-1.5 bg-white/90 backdrop-blur-sm text-slate-800 px-2.5 py-1 rounded-full text-[11px] font-semibold shadow-sm">
            <svg className="w-3 h-3 text-violet-600" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            {testCount} tests & procedures
          </span>
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-col flex-1 p-5">
        <div className="flex items-center gap-3 mb-2">
          <span className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-500 to-violet-700 flex items-center justify-center text-lg shadow-md shadow-violet-500/25 shrink-0 transition-transform duration-500 group-hover:scale-110">
            {dept.icon}
          </span>
          <h3 className="font-bold text-slate-900 leading-snug group-hover:text-violet-600 transition-colors">
            {dept.name}
          </h3>
        </div>
        <p className="text-sm text-slate-500 leading-relaxed mb-3 line-clamp-2">{dept.tagline}</p>

        {/* Branch availability */}
        <div className="flex flex-wrap gap-1.5 mt-auto">
          {branches.map(b => {
            const available = dept.branchIds.includes(b.id)
            const isSelected = b.id === selectedBranch.id
            return (
              <span
                key={b.id}
                className="relative group/tip"
              >
                <span
                  className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold transition-colors ${
                    isSelected
                      ? 'bg-violet-600 text-white'
                      : available
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : 'bg-slate-50 text-slate-300 border border-slate-200'
                  }`}
                >
                  {b.name}
                </span>
                {/* Tooltip */}
                <span
                  className="pointer-events-none absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-52 opacity-0 scale-95 group-hover/tip:opacity-100 group-hover/tip:scale-100 transition-all duration-200 z-50"
                  role="tooltip"
                >
                  <span className="block bg-slate-900 text-white rounded-xl shadow-xl shadow-black/20 p-3 text-left">
                    <span className="flex items-center justify-between mb-1.5">
                      <span className="text-xs font-bold">{b.name}</span>
                      <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-full ${
                        available ? 'bg-emerald-500/20 text-emerald-300' : 'bg-slate-600 text-slate-400'
                      }`}>
                        {available ? 'Available' : 'Not Available'}
                      </span>
                    </span>
                    <span className="text-[11px] text-slate-400 leading-snug block">{b.address}</span>
                    {isSelected && (
                      <span className="inline-flex items-center gap-1 text-[10px] text-violet-300 font-medium mt-1.5">
                        <svg className="w-2.5 h-2.5" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                        </svg>
                        Currently selected
                      </span>
                    )}
                  </span>
                  {/* Arrow */}
                  <span className="absolute top-full left-1/2 -translate-x-1/2 -mt-px border-4 border-transparent border-t-slate-900" aria-hidden="true" />
                </span>
              </span>
            )
          })}
        </div>

        <div className="mt-4 pt-3 border-t border-violet-100 flex items-center justify-between">
          <span className="text-xs text-slate-400">{dept.branchIds.length} {dept.branchIds.length === 1 ? 'branch' : 'branches'}</span>
          <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-violet-600 group-hover:gap-2.5 transition-all">
            Explore
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
            </svg>
          </span>
        </div>
      </div>
    </Link>
  )
}
