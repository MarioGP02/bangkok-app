import { create } from 'zustand'
import { TAX_RATE } from '@/lib/constants'

/**
 * @typedef {Object} CartLine
 * @property {import('@/data/menu').MenuItem} item
 * @property {number} quantity
 */

/**
 * @typedef {Object} CartSummary
 * @property {CartLine[]} lines
 * @property {number}     itemCount
 * @property {number}     subtotal
 * @property {number}     tax
 * @property {number}     total
 * @property {{ name: string, price: number }[]} snapshot
 */

const useCartStore = create((set, get) => ({
  /** @type {CartLine[]} */
  lines: [],

  // ─── Mutations ───────────────────────────────────────────────────────────

  addItem(item) {
    set((state) => {
      const existing = state.lines.find((l) => l.item.id === item.id)
      if (existing) {
        return {
          lines: state.lines.map((l) =>
            l.item.id === item.id ? { ...l, quantity: l.quantity + 1 } : l
          ),
        }
      }
      return { lines: [...state.lines, { item, quantity: 1 }] }
    })
  },

  removeItem(itemId) {
    set((state) => ({
      lines: state.lines.filter((l) => l.item.id !== itemId),
    }))
  },

  updateQuantity(itemId, quantity) {
    if (quantity <= 0) {
      get().removeItem(itemId)
      return
    }
    set((state) => ({
      lines: state.lines.map((l) =>
        l.item.id === itemId ? { ...l, quantity } : l
      ),
    }))
  },

  clear() {
    set({ lines: [] })
  },

  // ─── Computed (called inside Zustand selectors → always fresh) ───────────
  // ⚠️  Do NOT use JS getters here — they are lost after the first set() call.
  //     Instead use getSummary() inside a selector:
  //     `useCartStore(s => s.getSummary())`

  /** @returns {CartSummary} */
  getSummary() {
    const lines    = get().lines
    const subtotal = lines.reduce((s, l) => s + l.item.price * l.quantity, 0)
    const tax      = subtotal * TAX_RATE
    const total    = subtotal + tax

    return {
      lines,
      itemCount: lines.reduce((s, l) => s + l.quantity, 0),
      subtotal:  +subtotal.toFixed(2),
      tax:       +tax.toFixed(2),
      total:     +total.toFixed(2),
      snapshot:  lines.map((l) => ({
        name:  l.quantity > 1 ? `${l.quantity}× ${l.item.name}` : l.item.name,
        price: +(l.item.price * l.quantity).toFixed(2),
      })),
    }
  },
}))

export default useCartStore
