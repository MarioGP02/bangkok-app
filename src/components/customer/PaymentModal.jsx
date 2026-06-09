import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { X, ShieldCheck, CreditCard } from 'lucide-react'
import useUIStore    from '@/store/uiStore'
import useCartStore  from '@/store/cartStore'
import useOrderStore from '@/store/orderStore'
import Input  from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import { formatPrice } from '@/lib/utils'

const TABLES = ['Mesa 1', 'Mesa 2', 'Mesa 3', 'Mesa 4', 'Mesa 5', 'Mesa 6', 'Mesa 7', 'Para llevar']

export default function PaymentModal() {
  const closePayment = useUIStore((s) => s.closePayment)
  const { total, tax, subtotal, snapshot } = useCartStore((s) => s.getSummary())
  const clear = useCartStore((s) => s.clear)
  const createOrder = useOrderStore((s) => s.createOrder)
  const navigate    = useNavigate()

  const [name,     setName]     = useState('')
  const [table,    setTable]    = useState('Mesa 7')
  const [loading,  setLoading]  = useState(false)
  const [errors,   setErrors]   = useState({})

  // ─── Validation ────────────────────────────────────────────────────────────
  function validate() {
    const e = {}
    if (!name.trim()) e.name = 'El nombre es obligatorio'
    return e
  }

  // ─── Submit ────────────────────────────────────────────────────────────────
  async function handlePay() {
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }

    setLoading(true)
    // Simulate Stripe round-trip (~800 ms)
    await new Promise((r) => setTimeout(r, 800))

    createOrder({
      customerName: name.trim(),
      table,
      items:    snapshot,
      subtotal: subtotal,
      tax:      tax,
      total:    total,
      payMethod: 'Visa',
      payLast4:  '4242',
    })

    clear()
    closePayment()
    navigate('/customer/tracking')
  }

  return (
    /* Backdrop — fills phone frame */
    <div
      className="absolute inset-0 z-40 bg-black/70 backdrop-blur-sm flex items-end"
      onClick={(e) => { if (e.target === e.currentTarget) closePayment() }}
    >
      {/* Sheet */}
      <div className="w-full bg-bk-card rounded-t-3xl border-t border-bk-border
                      animate-slide-up max-h-[90%] overflow-y-auto no-scroll p-5 pb-8">

        {/* Handle + close */}
        <div className="flex items-center justify-between mb-5">
          <div className="w-10 h-1 rounded-full bg-bk-border2 mx-auto absolute left-1/2 -translate-x-1/2 top-3" />
          <div>
            <h2 className="text-lg font-black tracking-tight">Confirmar pago</h2>
            <p className="text-[11px] text-bk-muted mt-0.5">Pago seguro · SSL/TLS</p>
          </div>
          <button onClick={closePayment} className="p-1.5 rounded-lg hover:bg-bk-card2 text-bk-muted transition-colors">
            <X size={16} />
          </button>
        </div>

        {/* Name */}
        <div className="mb-3">
          <Input
            label="Tu nombre"
            placeholder="ej. Mario García"
            value={name}
            onChange={(e) => { setName(e.target.value); setErrors({}) }}
            error={errors.name}
            autoComplete="name"
          />
        </div>

        {/* Table */}
        <div className="mb-4">
          <Input
            as="select"
            label="Mesa / Entrega"
            value={table}
            onChange={(e) => setTable(e.target.value)}
          >
            {TABLES.map((t) => <option key={t} value={t}>{t}</option>)}
          </Input>
        </div>

        {/* Credit card visual */}
        <div className="credit-card mb-4">
          <div className="flex justify-between items-start mb-5 relative z-10">
            {/* Chip */}
            <div className="w-9 h-6 rounded bg-gradient-to-br from-yellow-400 to-yellow-600 opacity-90" />
            <span className="font-mono text-[11px] text-white/30 uppercase tracking-widest">Visa</span>
          </div>
          <p className="font-mono text-[15px] tracking-[0.18em] text-white/75 mb-4 relative z-10">
            •••• •••• •••• 4242
          </p>
          <div className="flex justify-between relative z-10">
            <div>
              <p className="text-[8px] text-white/30 uppercase tracking-widest mb-1">Titular</p>
              <p className="font-mono text-[11px] text-white/60">
                {name ? name.toUpperCase() : 'NOMBRE TITULAR'}
              </p>
            </div>
            <div>
              <p className="text-[8px] text-white/30 uppercase tracking-widest mb-1">Vence</p>
              <p className="font-mono text-[11px] text-white/60">12/27</p>
            </div>
          </div>
        </div>

        {/* Order summary */}
        <div className="bg-black/30 border border-bk-border rounded-xl p-3 mb-4 space-y-1.5">
          <div className="flex justify-between text-[11px] text-bk-muted">
            <span>Subtotal</span>
            <span>{formatPrice(subtotal)}</span>
          </div>
          <div className="flex justify-between text-[11px] text-bk-muted">
            <span>IVA (10%)</span>
            <span>{formatPrice(tax)}</span>
          </div>
          <div className="flex justify-between text-[14px] font-black pt-1.5 border-t border-bk-border mt-1">
            <span>Total</span>
            <span>{formatPrice(total)}</span>
          </div>
        </div>

        {/* Stripe notice */}
        <div className="flex items-center gap-2 bg-green-500/5 border border-green-500/15
                        rounded-lg px-3 py-2 mb-4">
          <ShieldCheck size={13} className="text-green-400 flex-shrink-0" />
          <p className="text-[10px] text-bk-muted">
            Procesado por <strong className="text-bk-muted2">Stripe</strong>.
            Nunca almacenamos datos de tarjeta.
          </p>
        </div>

        {/* CTA */}
        <Button size="full" onClick={handlePay} disabled={loading}>
          {loading ? (
            <span className="flex items-center gap-2">
              <span className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
              Procesando…
            </span>
          ) : (
            <>
              <CreditCard size={16} />
              Pagar {formatPrice(total)}
            </>
          )}
        </Button>
      </div>
    </div>
  )
}
