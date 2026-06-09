import { Outlet, NavLink, useNavigate } from 'react-router-dom'
import { BookOpen, ShoppingBag, MapPin, UtensilsCrossed } from 'lucide-react'
import useCartStore from '@/store/cartStore'
import useOrderStore from '@/store/orderStore'
import useUIStore from '@/store/uiStore'
import PaymentModal from '@/components/customer/PaymentModal'

// ─── Bottom navigation tabs ────────────────────────────────────────────────
const NAV_TABS = [
  { to: '/customer/menu',     icon: BookOpen,      label: 'Carta'     },
  { to: '/customer/cart',     icon: ShoppingBag,   label: 'Carrito'   },
  { to: '/customer/tracking', icon: MapPin,        label: 'Mi Pedido' },
]

export default function CustomerLayout() {
  const itemCount      = useCartStore((s) => s.lines.reduce((n, l) => n + l.quantity, 0))
  const currentOrderId = useOrderStore((s) => s.currentOrderId)
  const showPayment    = useUIStore((s) => s.showPayment)

  return (
    /* Outer shell: full page centering with an ambient glow */
    <div className="min-h-screen flex items-center justify-center bg-bk-bg"
         style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(255,107,0,0.07) 0%, #080808 55%)' }}>

      {/* Phone mockup frame */}
      <div className="phone-frame">

        {/* ── Header ─────────────────────────────────────────── */}
        <header className="flex items-center justify-between px-5 pt-9 pb-3 border-b border-bk-border shrink-0 bg-bk-bg z-10">
          <div>
            <h1 className="text-2xl font-black tracking-tighter">
              BANGKOK<span className="text-bk-primary">.</span>
            </h1>
            <p className="text-[9px] text-bk-muted2 font-mono mt-0.5">
              Bangkok Noodles & Bao · Mesa 7
            </p>
          </div>
          <div className="flex items-center gap-2">
            {currentOrderId && (
              <span className="px-2.5 py-1 rounded-full bg-green-500/10 border border-green-500/20
                               text-[9px] font-bold text-green-400 uppercase tracking-wider">
                Pedido activo
              </span>
            )}
            <UtensilsCrossed size={20} className="text-bk-muted2" />
          </div>
        </header>

        {/* ── Page content ───────────────────────────────────── */}
        <main className="flex-1 overflow-y-auto no-scroll pb-[68px]">
          <Outlet />
        </main>

        {/* ── Payment modal overlay (inside phone frame) ─────── */}
        {showPayment && <PaymentModal />}

        {/* ── Bottom navigation ──────────────────────────────── */}
        <nav className="absolute bottom-0 left-0 right-0 bg-bk-bg border-t border-bk-border
                        flex justify-around items-center px-2 py-2.5 z-20">
          {NAV_TABS.map(({ to, icon: Icon, label }) => {
            const isTracking = to.includes('tracking')
            const isCart     = to.includes('cart')
            const disabled   = isTracking && !currentOrderId

            return (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  `flex flex-col items-center gap-1 px-4 py-1.5 rounded-xl relative
                   ${disabled ? 'pointer-events-none opacity-25' : ''}
                   ${isActive ? 'text-bk-primary' : 'text-bk-muted'}`
                }
              >
                <div className="relative">
                  <Icon size={20} />
                  {/* Cart badge */}
                  {isCart && itemCount > 0 && (
                    <span className="absolute -top-1.5 -right-2 bg-bk-primary text-black
                                     text-[8px] font-black w-4 h-4 rounded-full
                                     flex items-center justify-center leading-none">
                      {itemCount}
                    </span>
                  )}
                </div>
                <span className="text-[9px] font-semibold uppercase tracking-wider">{label}</span>
              </NavLink>
            )
          })}
        </nav>
      </div>

      {/* Hint below phone */}
      <p className="absolute bottom-6 text-[11px] text-bk-muted2 font-mono">
        Carta → Carrito → Pago → Seguimiento
      </p>
    </div>
  )
}
