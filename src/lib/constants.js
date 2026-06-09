// ─── Order status ───────────────────────────────────────────────────────────
export const ORDER_STATUS = /** @type {const} */ ({
  RECEIVED:  'received',
  PREPARING: 'preparing',
  READY:     'ready',
})

export const ORDER_STATUS_LABEL = {
  received:  'Recibido',
  preparing: 'En preparación',
  ready:     'Listo',
}

// ─── Payment status ──────────────────────────────────────────────────────────
export const PAY_STATUS = /** @type {const} */ ({
  PENDING: 'pending',
  PAID:    'paid',
})

// ─── Menu categories ─────────────────────────────────────────────────────────
export const MENU_CATEGORY = /** @type {const} */ ({
  ALL:       'Todos',
  PRINCIPAL: 'Principal',
  STARTER:   'Entrante',
  DRINK:     'Bebida',
})

// ─── Business rules ──────────────────────────────────────────────────────────
/** Average minutes per order in kitchen */
export const PREP_TIME_PER_ORDER = 8

/** IVA / tax rate */
export const TAX_RATE = 0.10
