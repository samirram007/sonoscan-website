import { createContext, useContext, useState, type ReactNode } from 'react'
import { branches, type Branch } from '../data/branches'

interface BranchContextType {
  selectedBranch: Branch
  setSelectedBranch: (branch: Branch) => void
}

const BranchContext = createContext<BranchContextType | null>(null)

export function BranchProvider({ children }: { children: ReactNode }) {
  const [selectedBranch, setSelectedBranch] = useState<Branch>(branches[0])

  return (
    <BranchContext.Provider value={{ selectedBranch, setSelectedBranch }}>
      {children}
    </BranchContext.Provider>
  )
}

export function useBranch(): BranchContextType {
  const ctx = useContext(BranchContext)
  if (!ctx) throw new Error('useBranch must be used within a BranchProvider')
  return ctx
}
