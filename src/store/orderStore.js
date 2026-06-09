import { create } from 'zustand'
import { ORDER_STATUS, PAY_STATUS, PREP_TIME_PER_ORDER } from '@/lib/constants'
import { generateOrderId, formatTime, calcETA } from '@/lib/utils'

/**
 * @typedef {Object} OrderLine
 * @property {string} name
 * @property {number} price
 */

/**
 * @typedef {Object} Order
 * @property {string}    id
 * @property {string}    customerName
 * @property {string}    table
 * @property {OrderLine[]} items
 * @property {number}    subtotal
 * @property {number}    tax
 * @property {number}    total
 * @property {string}    payMethod
 * @property {string}    payLast4
 * @property {string}    payStatus     - 'pending' | 'paid'
 * @property {string}    status        - 'received' | 'preparing' | 'ready'
 * @property {number}    queuePosition
 * @property {number}    estimatedMinutes
 * @property {string}    time          - display HH:MM
 * @property {Date}      createdAt
 */

// ─── Seed data (demo) ────────────────────────────────────────────────────────
/** @type {Order[]} */
const DEMO_ORDERS = [
  {
    id: 'BK-3821',
    customerName: 'Carlos M.',
    table: 'Mesa 4',
    items: [
      { name: 'Pad Thai Clásico', price: 11.90 },
      { name: 'Thai Iced Tea',    price: 3.50  },
    ],
    subtotal: 15.40,
    tax: 1.54,
    total: 16.94,
    payMethod: 'Visa',
    payLast4: '4242',
    payStatus: PAY_STATUS.PAID,
    status: ORDER_STATUS.PREPARING,
    queuePosition: 1,
    estimatedMinutes: 6,
    time: '13:42',
    createdAt: new Date(),
  },
  {
    id: 'BK-7239',
    customerName: 'Laura P.',
    table: 'Para llevar',
    items: [
      { name: 'Noodles Teriyaki Picantes', price: 12.50 },
      { name: 'Gyozas de Pollo',           price: 6.50  },
      { name: 'Agua con Gas',              price: 2.00  },
    ],
    subtotal: 21.00,
    tax: 2.10,
    total: 23.10,
    payMethod: 'Mastercard',
    payLast4: '8851',
    payStatus: PAY_STATUS.PENDING,
    status: ORDER_STATUS.RECEIVED,
    queuePosition: 2,
    estimatedMinutes: 14,
    time: '13:47',
    createdAt: new Date(),
  },
]

// ─── Store ───────────────────────────────────────────────────────────────────
const useOrderStore = create((set, get) => ({
  /** @type {Order[]} */
  orders: DEMO_ORDERS,

  /** ID of the order the current customer session placed */
  currentOrderId: null,

  // ─── Customer actions ─────────────────────────────────────────────────────

  /**
   * Create a new order from the cart snapshot + payment data.
   * Returns the created order.
   *
   * @param {{ customerName: string, table: string, items: OrderLine[],
   *           subtotal: number, tax: number, total: number,
   *           payMethod: string, payLast4: string }} payload
   * @returns {Order}
   */
  createOrder(payload) {
    const activeOrders = get().orders.filter(
      (o) => o.status !== ORDER_STATUS.READY
    )
    const queuePosition   = activeOrders.length + 1
    const estimatedMinutes = calcETA(queuePosition, PREP_TIME_PER_ORDER)

    /** @type {Order} */
    const order = {
      id: generateOrderId(),
      customerName: payload.customerName,
      table: payload.table,
      items: payload.items,
      subtotal: payload.subtotal,
      tax: payload.tax,
      total: payload.total,
      payMethod: payload.payMethod,
      payLast4: payload.payLast4,
      payStatus: PAY_STATUS.PAID,   // Stripe confirms before we create the order
      status: ORDER_STATUS.RECEIVED,
      queuePosition,
      estimatedMinutes,
      time: formatTime(),
      createdAt: new Date(),
    }

    set((state) => ({
      orders: [...state.orders, order],
      currentOrderId: order.id,
    }))

    return order
  },

  // ─── Worker actions ───────────────────────────────────────────────────────

  confirmPayment(orderId) {
    set((state) => ({
      orders: state.orders.map((o) =>
        o.id === orderId ? { ...o, payStatus: PAY_STATUS.PAID } : o
      ),
    }))
  },

  startPreparing(orderId) {
    set((state) => ({
      orders: state.orders.map((o) =>
        o.id === orderId ? { ...o, status: ORDER_STATUS.PREPARING } : o
      ),
    }))
  },

  markReady(orderId) {
    set((state) => ({
      orders: state.orders.map((o) =>
        o.id === orderId
          ? { ...o, status: ORDER_STATUS.READY, estimatedMinutes: 0 }
          : o
      ),
    }))
  },

  /** Remove order after delivery */
  deliverOrder(orderId) {
    set((state) => ({
      orders: state.orders.filter((o) => o.id !== orderId),
      currentOrderId:
        state.currentOrderId === orderId ? null : state.currentOrderId,
    }))
  },

  // ─── Demo helper ──────────────────────────────────────────────────────────

  addDemoOrder() {
    const SAMPLE_NAMES  = ['Miguel A.', 'Sofía R.', 'Andrés T.', 'Valentina P.', 'Javier L.']
    const SAMPLE_TABLES = ['Mesa 1', 'Mesa 2', 'Mesa 3', 'Mesa 5', 'Para llevar']
    const SAMPLE_ITEMS  = [
      [{ name: 'Pad Thai Clásico', price: 11.90 }, { name: 'Thai Iced Tea', price: 3.50 }],
      [{ name: 'Ramen Miso', price: 13.50 }, { name: 'Gyozas de Pollo', price: 6.50 }],
      [{ name: 'Noodles Teriyaki Picantes', price: 12.50 }, { name: 'Bao de Panceta', price: 5.50 }, { name: 'Agua con Gas', price: 2.00 }],
    ]

    const items    = SAMPLE_ITEMS[Math.floor(Math.random() * SAMPLE_ITEMS.length)]
    const subtotal = +(items.reduce((s, i) => s + i.price, 0).toFixed(2))
    const tax      = +(subtotal * 0.10).toFixed(2)

    const activeOrders   = get().orders.filter((o) => o.status !== ORDER_STATUS.READY)
    const queuePosition  = activeOrders.length + 1

    /** @type {Order} */
    const order = {
      id: generateOrderId(),
      customerName: SAMPLE_NAMES[Math.floor(Math.random() * SAMPLE_NAMES.length)],
      table: SAMPLE_TABLES[Math.floor(Math.random() * SAMPLE_TABLES.length)],
      items,
      subtotal,
      tax,
      total: +(subtotal + tax).toFixed(2),
      payMethod: Math.random() > 0.5 ? 'Visa' : 'Mastercard',
      payLast4: String(Math.floor(Math.random() * 9000 + 1000)),
      payStatus: Math.random() > 0.35 ? PAY_STATUS.PAID : PAY_STATUS.PENDING,
      status: ORDER_STATUS.RECEIVED,
      queuePosition,
      estimatedMinutes: calcETA(queuePosition, PREP_TIME_PER_ORDER),
      time: formatTime(),
      createdAt: new Date(),
    }

    set((state) => ({ orders: [...state.orders, order] }))
  },

  // ─── Selectors ────────────────────────────────────────────────────────────

  getCurrentOrder() {
    return get().orders.find((o) => o.id === get().currentOrderId) ?? null
  },

  getStats() {
    const orders = get().orders
    return {
      total:          orders.length,
      pendingPayment: orders.filter((o) => o.payStatus === PAY_STATUS.PENDING).length,
      inKitchen:      orders.filter((o) => o.status === ORDER_STATUS.PREPARING).length,
      ready:          orders.filter((o) => o.status === ORDER_STATUS.READY).length,
      revenue:        orders
        .filter((o) => o.payStatus === PAY_STATUS.PAID)
        .reduce((s, o) => s + o.total, 0),
    }
  },
}))

export default useOrderStore
