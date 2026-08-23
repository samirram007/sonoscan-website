import { useState, useEffect, useRef, useCallback } from 'react'
import { Link } from '@tanstack/react-router'
import { teamMembers } from '../../data/doctors'
import { branches } from '../../data/branches'
import { useBranch } from '../../context/BranchContext'
import Reveal from './Reveal'
import DoctorCard from './DoctorCard'

interface DoctorSectionProps {
  /** Show only this many doctors with a "Show Full Team" expand button. */
  previewCount?: number
}

export default function DoctorSection({ previewCount }: DoctorSectionProps) {
  const { selectedBranch, setSelectedBranch } = useBranch()
  const [searchDoctor, setSearchDoctor] = useState('')
  const [branchOpen, setBranchOpen] = useState(false)
  const [focusedIndex, setFocusedIndex] = useState<number>(-1)
  const [expanded, setExpanded] = useState(false)
  const searchRef = useRef<HTMLDivElement>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const branchToggleRef = useRef<HTMLButtonElement>(null)
  const branchItemRefs = useRef<(HTMLButtonElement | null)[]>([])

  // Filter doctors by the selected branch
  const branchDoctors = teamMembers.filter(doc => doc.branchIds.includes(selectedBranch.id))

  // Reset search when branch changes
  useEffect(() => {
    setSearchDoctor('')
  }, [selectedBranch.id])

  // Close branch dropdown on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setBranchOpen(false)
        setFocusedIndex(-1)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  // Scroll focused item into view
  useEffect(() => {
    if (focusedIndex >= 0 && branchItemRefs.current[focusedIndex]) {
      branchItemRefs.current[focusedIndex]?.scrollIntoView({ block: 'nearest' })
    }
  }, [focusedIndex])

  // Reset focusedIndex when dropdown opens/closes
  useEffect(() => {
    if (!branchOpen) {
      setFocusedIndex(-1)
    }
  }, [branchOpen])

  const openDropdown = useCallback(() => {
    setBranchOpen(true)
    setFocusedIndex(0)
  }, [])

  const closeDropdown = useCallback(() => {
    setBranchOpen(false)
    setFocusedIndex(-1)
    branchToggleRef.current?.focus()
  }, [])

  const selectBranch = useCallback((branch: typeof branches[number]) => {
    setSelectedBranch(branch)
    setBranchOpen(false)
    setFocusedIndex(-1)
    branchToggleRef.current?.focus()
  }, [setSelectedBranch])

  const handleToggleKeyDown = useCallback((e: React.KeyboardEvent) => {
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault()
        if (!branchOpen) {
          openDropdown()
        } else {
          setFocusedIndex(prev => (prev < branches.length - 1 ? prev + 1 : 0))
        }
        break
      case 'ArrowUp':
        e.preventDefault()
        if (!branchOpen) {
          openDropdown()
          setFocusedIndex(branches.length - 1)
        } else {
          setFocusedIndex(prev => (prev > 0 ? prev - 1 : branches.length - 1))
        }
        break
      case 'Home':
        e.preventDefault()
        if (!branchOpen) {
          openDropdown()
        } else {
          setFocusedIndex(0)
        }
        break
      case 'End':
        e.preventDefault()
        if (!branchOpen) {
          openDropdown()
          setFocusedIndex(branches.length - 1)
        } else {
          setFocusedIndex(branches.length - 1)
        }
        break
      case 'Enter':
      case ' ':
        e.preventDefault()
        if (!branchOpen) {
          openDropdown()
        } else {
          closeDropdown()
        }
        break
      case 'Escape':
        if (branchOpen) {
          e.preventDefault()
          closeDropdown()
        }
        break
    }
  }, [branchOpen, openDropdown, closeDropdown])

  const handleDropdownKeyDown = useCallback((e: React.KeyboardEvent) => {
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault()
        setFocusedIndex(prev => (prev < branches.length - 1 ? prev + 1 : 0))
        break
      case 'ArrowUp':
        e.preventDefault()
        setFocusedIndex(prev => (prev > 0 ? prev - 1 : branches.length - 1))
        break
      case 'Home':
        e.preventDefault()
        setFocusedIndex(0)
        break
      case 'End':
        e.preventDefault()
        setFocusedIndex(branches.length - 1)
        break
      case 'Enter':
        e.preventDefault()
        if (focusedIndex >= 0 && focusedIndex < branches.length) {
          selectBranch(branches[focusedIndex])
        }
        break
      case 'Escape':
        e.preventDefault()
        closeDropdown()
        break
      case 'Tab':
        closeDropdown()
        break
    }
  }, [focusedIndex, selectBranch, closeDropdown])

  // Reset branchItemRefs array length when branches change
  branchItemRefs.current = branchItemRefs.current.slice(0, branches.length)

  const filteredDoctors = branchDoctors.filter(doc =>
    doc.name.toLowerCase().includes(searchDoctor.toLowerCase()) ||
    doc.specialty.toLowerCase().includes(searchDoctor.toLowerCase()) ||
    doc.role.toLowerCase().includes(searchDoctor.toLowerCase())
  )

  const visibleDoctors = previewCount && !expanded ? filteredDoctors.slice(0, previewCount) : filteredDoctors
  const hasMore = previewCount !== undefined && filteredDoctors.length > previewCount

  return (
    <Reveal direction="up">
      <section className="py-20 lg:py-28 bg-bg-base">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 bg-violet-100 text-violet-700 px-4 py-2 rounded-full text-sm font-medium mb-4 border border-violet-200">
              Our Team
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
              Select a Doctor
            </h2>
            <p className="text-lg text-slate-500">
              Choose from our team of experienced medical specialists.
            </p>

            {/* ── Integrated Filter + Search Box ── */}
            <div className="relative max-w-lg mx-auto mt-8" ref={searchRef}>
              <div className="relative">
                <div className="flex items-stretch bg-bg-card border border-violet-200 rounded-xl focus-within:ring-2 focus-within:ring-violet-500/30 focus-within:border-violet-400 transition-all">
                  {/* Branch filter prefix */}
                  <div className="shrink-0">
                    <button
                      ref={branchToggleRef}
                      onClick={() => setBranchOpen(!branchOpen)}
                      onKeyDown={handleToggleKeyDown}
                      aria-expanded={branchOpen}
                      aria-haspopup="listbox"
                      aria-label={`Select branch. Current: ${selectedBranch.name}`}
                      className="flex items-center gap-1.5 h-full px-3.5 py-4 text-sm font-medium text-slate-700 hover:bg-violet-50/50 transition-colors border-r border-violet-200 rounded-l-xl"
                    >
                      <svg className="w-4 h-4 text-violet-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <span className="truncate max-w-[70px] sm:max-w-[80px]">{selectedBranch.name}</span>
                      <svg className={`w-3 h-3 text-slate-400 transition-transform duration-200 shrink-0 ${branchOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                  </div>

                  {/* Search input */}
                  <div className="relative flex-1 min-w-0">
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
                      placeholder="Search by name, specialty or role..."
                      className="w-full pl-10 pr-4 py-4 bg-transparent text-slate-900 placeholder:text-slate-400 focus:outline-none text-sm"
                    />
                  </div>

                  {/* Clear button */}
                  {searchDoctor && (
                    <button
                      onClick={() => setSearchDoctor('')}
                      className="px-3 flex items-center text-slate-400 hover:text-slate-600 transition-colors shrink-0 rounded-r-xl"
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                      </svg>
                    </button>
                  )}
                </div>

                {/* Branch dropdown - outside overflow-hidden area */}
                {branchOpen && (
                  <div
                    ref={dropdownRef}
                    onKeyDown={handleDropdownKeyDown}
                    role="listbox"
                    aria-label="Select a branch location"
                    aria-activedescendant={focusedIndex >= 0 ? `branch-option-${branches[focusedIndex].id}` : undefined}
                    className="absolute top-full left-0 mt-2 bg-white rounded-xl shadow-xl shadow-black/10 border border-violet-200 z-50 min-w-[280px] p-2 animate-fade-in-down text-left"
                  >
                    {branches.map((branch, i) => {
                      const isActive = selectedBranch.id === branch.id
                      const isFocused = focusedIndex === i
                      const count = teamMembers.filter(d => d.branchIds.includes(branch.id)).length
                      return (
                        <button
                          key={branch.id}
                          ref={el => { branchItemRefs.current[i] = el }}
                          id={`branch-option-${branch.id}`}
                          role="option"
                          aria-selected={isActive}
                          onClick={() => selectBranch(branch)}
                          onMouseEnter={() => setFocusedIndex(i)}
                          className={`w-full text-left px-3 py-2.5 rounded-lg text-sm transition-all duration-150 ${
                            isActive
                              ? 'bg-violet-100 text-violet-700'
                              : isFocused
                                ? 'bg-violet-50 text-violet-800'
                                : 'hover:bg-slate-50 text-gray-700'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className={`font-medium ${isActive ? 'text-violet-700' : isFocused ? 'text-violet-800' : ''}`}>{branch.name}</span>
                            <span className={`text-xs px-2 py-0.5 rounded-full ${
                              isActive ? 'bg-violet-200 text-violet-800' : 'bg-slate-100 text-slate-500'
                            }`}>
                              {count} doctor{count !== 1 ? 's' : ''}
                            </span>
                          </div>
                          <div className={`text-xs mt-0.5 ${isActive || isFocused ? 'text-violet-500' : 'text-gray-500'}`}>{branch.address}</div>
                        </button>
                      )
                    })}
                  </div>
                )}
              </div>

              {/* Active filter indicator */}
              {searchDoctor && (
                <p className="text-xs text-slate-400 mt-2 text-left">
                  Searching in <span className="font-medium text-violet-600">{selectedBranch.name}</span>
                </p>
              )}
            </div>
          </div>

          {/* ── Doctor Grid ── */}              {filteredDoctors.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-slate-400 mb-2">No doctors found at {selectedBranch.name} matching your search.</p>
                  <p className="text-sm text-slate-400">Try a different search term or switch to another branch location.</p>
                </div>
              ) : (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {visibleDoctors.map((doctor, i) => (
                    <Reveal key={doctor.slug} direction="up" delay={i * 50} threshold={0.01}>
                      <DoctorCard doctor={doctor} />
                    </Reveal>
                  ))}
                </div>
              )}

          {/* ── Show Full Team + View All ── */}
          <Reveal direction="up" delay={600} threshold={0.01}>
            <div className="text-center mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              {hasMore && (
                <button
                  onClick={() => setExpanded(prev => !prev)}
                  className="group inline-flex items-center gap-2 bg-violet-600 hover:bg-violet-700 text-white px-8 py-3.5 rounded-xl font-semibold transition-all hover:shadow-xl hover:shadow-violet-500/25 active:scale-[0.98]"
                >
                  {expanded ? 'Show Less' : 'Show Our Full Team'}
                  <svg
                    className={`w-4 h-4 transition-transform duration-300 ${expanded ? 'rotate-180' : 'group-hover:translate-x-1'}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                  </svg>
                </button>
              )}
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
                <svg
                  className="w-4 h-4 transition-all duration-300 group-hover/link:translate-x-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25" />
                </svg>
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </Reveal>
  )
}
