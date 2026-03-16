import { create } from 'zustand'

interface UIState {
  isSearchOpen: boolean
  isMobileNavOpen: boolean
  searchQuery: string
  setSearchOpen: (open: boolean) => void
  setMobileNavOpen: (open: boolean) => void
  setSearchQuery: (query: string) => void
}

export const useUIStore = create<UIState>((set) => ({
  isSearchOpen: false,
  isMobileNavOpen: false,
  searchQuery: '',
  setSearchOpen: (open) => set({ isSearchOpen: open }),
  setMobileNavOpen: (open) => set({ isMobileNavOpen: open }),
  setSearchQuery: (query) => set({ searchQuery: query }),
}))
