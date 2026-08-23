import { Link } from '@tanstack/react-router'
import { doctorHoverIcons } from './ServiceIcons'
import { branches } from '../../data/branches'
import { useBranch } from '../../context/BranchContext'
import type { TeamMember } from '../doctors/schema'

interface DoctorCardProps {
  doctor: TeamMember
}

export default function DoctorCard({ doctor }: DoctorCardProps) {
  const { selectedBranch } = useBranch()

  return (
    <Link
      to="/doctors/$slug"
      params={{ slug: doctor.slug }}
      className="group block bg-bg-card border border-violet-200 rounded-xl p-8 hover:bg-violet-50/50 hover:border-violet-300 hover:shadow-xl hover:shadow-violet-500/10 transition-all duration-300 hover:-translate-y-1"
    >
      {/* Avatar — doctor photo swaps to specialty icon on hover */}
      <div className="relative w-16 h-16 mb-5 overflow-hidden rounded-full bg-violet-100 ring-2 ring-violet-200 group-hover:ring-violet-400 transition-all duration-500">
        {/* Doctor photo */}
        <img
          src={doctor.image}
          alt={doctor.name}
          className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110 group-hover:brightness-50"
          loading="lazy"
        />
        {/* Hover overlay with specialty icon */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-all duration-500 group-hover:opacity-100">
          <div className="w-7 h-7 text-white drop-shadow-lg">
            {doctorHoverIcons[doctor.slug] ?? (
              <svg className="w-full h-full" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
              </svg>
            )}
          </div>
        </div>
      </div>

      {/* Name */}
      <h3 className="text-lg font-bold text-slate-900 mb-1 group-hover:text-violet-600 transition-colors duration-300">
        {doctor.name}
      </h3>

      {/* Role */}
      <p className="text-sm text-violet-600 font-medium mb-1">
        {doctor.role}
      </p>

      {/* Specialty */}
      <p className="text-sm text-slate-400">
        {doctor.specialty}
      </p>

      {/* Branches */}
      <div className="mt-4 flex flex-wrap gap-1.5">
        {doctor.branchIds.map(bid => {
          const branch = branches.find(b => b.id === bid)
          if (!branch) return null
          const isCurrent = branch.id === selectedBranch.id
          return (
            <span
              key={bid}
              className={`inline-flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 rounded-full transition-colors ${
                isCurrent
                  ? 'bg-violet-100 text-violet-700 border border-violet-200'
                  : 'bg-slate-50 text-slate-400 border border-slate-200'
              }`}
            >
              <svg className={`w-2.5 h-2.5 ${isCurrent ? 'text-violet-500' : 'text-slate-300'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {branch.name}
            </span>
          )
        })}
      </div>

      {/* Arrow */}
      <div className="mt-5 flex items-center gap-1 text-violet-600 text-sm font-medium opacity-0 translate-x-[-8px] group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
        View Profile
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25" />
        </svg>
      </div>
    </Link>
  )
}
