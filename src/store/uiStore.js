import { create } from 'zustand'

/**
 * Lightweight store for transient UI state that doesn't belong
 * in the domain stores (cart / orders).
 */
const useUIStore = create((set) => ({
  // ─── Payment modal ────────────────────────────────────────────────────────
  showPayment: false,
  openPayment:  () => set({ showPayment: true }),
  closePayment: () => set({ showPayment: false }),

  // ─── Worker filter tab ────────────────────────────────────────────────────
  /** 'all' | 'pending' | 'preparing' | 'ready' */
  workerFilter: 'all',
  setWorkerFilter: (filter) => set({ workerFilter: filter }),

  // ─── Menu category filter ─────────────────────────────────────────────────
  /** Active menu category — null = show all */
  menuCategory: null,
  setMenuCategory: (cat) => set({ menuCategory: cat }),
}))

export default useUIStore
