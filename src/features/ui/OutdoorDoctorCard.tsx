import { useState } from 'react'
import type { OpdDoctor } from '../doctors/schema'

/* ── Helpers ── */

function initialsOf(name: string): string {
  const clean = name.replace(/^Dr\.?\s*/i, '')
  const tokens = clean
    .replace(/\./g, ' ')
    .split(/\s+/)
    .filter(Boolean)
  if (tokens.length === 0) return 'DR'
  return tokens
    .map(t => t.charAt(0).toUpperCase())
    .slice(0, 2)
    .join('')
}

export const DEPT_ICONS: Record<string, string> = {
  Cardiology: '❤️',
  'Cardiothoracic Surgeon': '🫀',
  'Chest Medicine': '🫁',
  Dermatology: '🧴',
  Endocrinology: '⚖️',
  'ENT Surgeon': '👂',
  Gastroenterology: '🦠',
  'General Physician': '🩺',
  'General Surgeon': '🔪',
  'General Surgery': '🔪',
  Gynaecology: '🤰',
  Haematology: '🩸',
  'Infectious Diseases': '🦟',
  Medicine: '💊',
  Nephrology: '🫘',
  'Neuro Medicine': '🧠',
  'Neuro Surgery': '🧠',
  Neurology: '🧠',
  Oncology: '🎗️',
  Ophthalmology: '👁️',
  Orthopaedic: '🦴',
  'Orthopaedic Surgeon': '🦴',
  Paediatric: '👶',
  'Paediatric Cardio': '👼',
  'Paediatric Cardiology': '👶',
  'Paediatric Endocrinology': '👶',
  Physiatry: '🦵',
  'Physician & Critical Care': '🏥',
  Psychiatry: '🧠',
  Pulmonology: '🫁',
  Rheumatology: '🦵',
  Urology: '🚻',
  Pathology: '🔬',
  Radiology: '🩻',
}

export function OutdoorDoctorCard({ doc, department }: { doc: OpdDoctor; department: string }) {
  const [expanded, setExpanded] = useState(false)
  const visibleSlots = expanded ? doc.schedule : doc.schedule.slice(0, 3)

  return (
    <div className="bg-bg-card rounded-2xl border border-violet-200 p-6 hover:shadow-xl hover:border-violet-300 hover:-translate-y-1 transition-all duration-300">
      <div className="flex items-center gap-4 mb-4">
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-violet-500 to-violet-700 flex items-center justify-center text-white font-bold text-sm shrink-0">
          {initialsOf(doc.name)}
        </div>
        <div className="min-w-0">
          <h3 className="font-bold text-slate-900 truncate">{doc.name}</h3>
          <p className="text-xs text-slate-400 truncate">{department}{doc.qualification ? ` · ${doc.qualification}` : ''}</p>
        </div>
      </div>
      <div className="border-t border-violet-100 pt-4">
        <p className="text-xs font-medium text-slate-400 uppercase tracking-wider mb-3">
          Consultation Schedule
        </p>
        {doc.schedule.length > 0 ? (
          <>
            <div className="flex flex-wrap gap-2">
              {visibleSlots.map(slot => (
                <span
                  key={`${slot.day}-${slot.time}`}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-violet-700 bg-violet-50 border border-violet-200 px-2.5 py-1 rounded-full"
                >
                  <svg className="w-3 h-3 shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
                  </svg>
                  <span>{slot.day}</span>
                  <span className="text-slate-500 font-medium">{slot.time}</span>
                </span>
              ))}
            </div>
            {doc.schedule.length > 3 && (
              <button
                onClick={() => setExpanded(e => !e)}
                aria-expanded={expanded}
                className="mt-3 text-xs font-semibold text-violet-600 hover:text-violet-700 transition-colors inline-flex items-center gap-1"
              >
                {expanded ? 'Show less' : `+${doc.schedule.length - 3} more`}
                <svg
                  className={`w-3 h-3 transition-transform duration-200 ${expanded ? 'rotate-180' : ''}`}
                  fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                </svg>
              </button>
            )}
          </>
        ) : (
          <p className="text-xs text-slate-400">Not scheduled at this branch</p>
        )}
      </div>
    </div>
  )
}
