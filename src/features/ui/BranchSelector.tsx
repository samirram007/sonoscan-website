import { useState, useRef, useCallback } from 'react'
import { useBranch } from '../../context/BranchContext'
import { branches } from '../../data/branches'
import { teamMembers } from '../../data/doctors'

interface BranchSelectorProps {
  /** Style variant: 'navbar' for dark top-bar, 'default' for violet content-area */
  variant?: 'navbar' | 'default'
  /** Show doctor count per branch in dropdown items */
  showDoctorCount?: boolean
  /** Additional classes for the wrapper element */
  className?: string
}

export default function BranchSelector({
  variant = 'default',
  showDoctorCount = true,
  className = '',
}: BranchSelectorProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [focusedIndex, setFocusedIndex] = useState(-1)
  const { selectedBranch, setSelectedBranch } = useBranch()
  const toggleRef = useRef<HTMLButtonElement>(null)
  const itemRefs = useRef<(HTMLButtonElement | null)[]>([])

  const isNavbar = variant === 'navbar'

  // Reset refs array
  itemRefs.current = itemRefs.current.slice(0, branches.length)

  const openDropdown = useCallback(() => {
    setIsOpen(true)
    setFocusedIndex(0)
  }, [])

  const closeDropdown = useCallback(() => {
    setIsOpen(false)
    setFocusedIndex(-1)
    toggleRef.current?.focus()
  }, [])

  const selectBranch = useCallback((branch: typeof branches[number]) => {
    setSelectedBranch(branch)
    setIsOpen(false)
    setFocusedIndex(-1)
    toggleRef.current?.focus()
  }, [setSelectedBranch])

  const handleToggleKeyDown = useCallback((e: React.KeyboardEvent) => {
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault()
        if (!isOpen) openDropdown()
        else setFocusedIndex(prev => (prev < branches.length - 1 ? prev + 1 : 0))
        break
      case 'ArrowUp':
        e.preventDefault()
        if (!isOpen) {
          openDropdown()
          setFocusedIndex(branches.length - 1)
        } else {
          setFocusedIndex(prev => (prev > 0 ? prev - 1 : branches.length - 1))
        }
        break
      case 'Home':
        e.preventDefault()
        if (!isOpen) openDropdown()
        else setFocusedIndex(0)
        break
      case 'End':
        e.preventDefault()
        if (!isOpen) openDropdown()
        setFocusedIndex(branches.length - 1)
        break
      case 'PageUp':
        e.preventDefault()
        if (!isOpen) openDropdown()
        else setFocusedIndex(prev => Math.max(0, prev - 2))
        break
      case 'PageDown':
        e.preventDefault()
        if (!isOpen) openDropdown()
        else setFocusedIndex(prev => Math.min(branches.length - 1, prev + 2))
        break
      case 'Enter':
      case ' ':
        e.preventDefault()
        if (!isOpen) openDropdown()
        else closeDropdown()
        break
      case 'Escape':
        if (isOpen) {
          e.preventDefault()
          closeDropdown()
        }
        break
    }
  }, [isOpen, openDropdown, closeDropdown])

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
      case 'PageUp':
        e.preventDefault()
        setFocusedIndex(prev => Math.max(0, prev - 2))
        break
      case 'PageDown':
        e.preventDefault()
        setFocusedIndex(prev => Math.min(branches.length - 1, prev + 2))
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

  return (
    <div className={`relative shrink-0 ${className}`}>
      <button
        ref={toggleRef}
        onClick={() => {
          if (!isOpen) {
            openDropdown()
          } else {
            closeDropdown()
          }
        }}
        onKeyDown={handleToggleKeyDown}
        onBlur={(e) => {
          if (!e.currentTarget.contains(e.relatedTarget as Node)) {
            setIsOpen(false)
            setFocusedIndex(-1)
          }
        }}
        className={
          isNavbar
            ? 'flex items-center gap-1.5 text-slate-300 hover:text-white/80 transition-colors cursor-pointer'
            : 'inline-flex items-center gap-2 bg-violet-100 hover:bg-violet-200 text-violet-700 px-4 py-2 rounded-lg text-sm font-medium border border-violet-200 hover:border-violet-300 transition-all cursor-pointer'
        }
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-label={`Select branch. Current: ${selectedBranch.name}`}
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
        <span>{selectedBranch.name}</span>
        <svg
          className={`w-3 h-3 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          fill="none" stroke="currentColor" viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div
          className={`absolute top-full left-0 ${
            isNavbar ? 'mt-1' : 'mt-2'
          } bg-white text-gray-800 ${
            isNavbar ? 'rounded-lg shadow-xl' : 'rounded-xl shadow-xl shadow-black/10 border border-violet-200'
          } z-50 min-w-[280px] p-2 animate-fade-in-down`}
          role="listbox"
          aria-label="Select a branch location"
          aria-activedescendant={focusedIndex >= 0 ? `bs-option-${focusedIndex}` : undefined}
          onKeyDown={handleDropdownKeyDown}
          onMouseDown={(e) => e.preventDefault()}
        >
          {branches.map((branch, i) => {
            const isActive = selectedBranch.id === branch.id
            const isFocused = focusedIndex === i
            const doctorCount = showDoctorCount
              ? teamMembers.filter(d => d.branchIds.includes(branch.id)).length
              : 0

            return (
              <button
                key={branch.id}
                ref={el => { itemRefs.current[i] = el }}
                id={`bs-option-${i}`}
                role="option"
                aria-selected={isActive}
                onClick={() => selectBranch(branch)}
                onMouseEnter={() => setFocusedIndex(i)}
                className={`w-full text-left px-3 py-2.5 rounded-lg text-sm transition-all duration-150 cursor-pointer ${
                  isActive
                    ? 'bg-violet-100 text-violet-700'
                    : isFocused
                      ? 'bg-violet-50 text-violet-800'
                      : 'hover:bg-slate-50 text-gray-700'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className={`font-medium ${isFocused && !isActive ? 'text-violet-800' : ''}`}>{branch.name}</div>
                  {showDoctorCount && (
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full ${
                        isActive
                          ? 'bg-violet-200 text-violet-800'
                          : isFocused
                            ? 'bg-violet-100 text-violet-700'
                            : 'bg-slate-100 text-slate-500'
                      }`}
                    >
                      {doctorCount} doctor{doctorCount !== 1 ? 's' : ''}
                    </span>
                  )}
                </div>
                <div className={`text-xs mt-0.5 ${isActive || isFocused ? 'text-violet-500' : 'text-gray-500'}`}>{branch.address}</div>
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}
