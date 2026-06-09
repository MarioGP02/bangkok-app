import { useNavigate }  from 'react-router-dom'
import { ShoppingBag, Clock } from 'lucide-react'
import CartItem      from '@/components/customer/CartItem'
import Button        from '@/components/ui/Button'
import useCartStore  from '@/store/cartStore'
import useOrderStore from '@/store/orderStore'
import useUIStore    from '@/store/uiStore'
import { formatPrice } from '@/lib/utils'
import { ORDER_STATUS, PREP_TIME_PER_ORDER } from '@/lib/constants'

export default function CartPage() {
  const { lines, subtotal, tax, total } = useCartStore((s) => s.getSummary())
  const openPayment = useUIStore((s) => s.openPayment)
  const orders      = useOrderStore((s) => s.orders)
  const navigate    = useNavigate()

  // Estimate based on active orders currently in queue
  const activeCount  = orders.filter((o) => o.status !== ORDER_STATUS.READY).length
  const etaMinutes   = (activeCount + 1) * PREP_TIME_PER_ORDER

  if (lines.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[500px] px-6 text-center animate-fade-in">
        <ShoppingBag size={44} className="text-bk-muted2 mb-4" />
        <p className="text-[14px] font-semibold text-bk-muted">Tu carrito está vacío</p>
        <p className="text-[12px] text-bk-muted2 mt-1.5 mb-6">
          Añade platos desde la carta para empezar.
        </p>
        <Button variant="ghost" size="sm" onClick={() => navigate('/customer/menu')}>
          Ver la carta
        </Button>
      </div>
    )
  }

  return (
    <div className="px-4 py-4 animate-fade-in">
      <h2 className="text-[18px] font-black tracking-tight mb-4">Tu pedido</h2>

      {/* Cart lines */}
      <div className="flex flex-col gap-2.5 mb-5">
        {lines.map((line) => (
          <CartItem key={line.item.id} line={line} />
        ))}
      </div>

      {/* Queue estimate */}
      <div className="flex items-center gap-2.5 bg-bk-primary/8 border border-bk-primary/20
                      rounded-xl px-3.5 py-3 mb-4">
        <Clock size={15} className="text-bk-primary flex-shrink-0" />
        <div>
          <p className="text-[12px] font-semibold text-bk-primary">~{etaMinutes} min de espera</p>
          <p className="text-[10px] text-bk-muted mt-0.5">
            {activeCount} pedido{activeCount !== 1 ? 's' : ''} en cola antes que el tuyo
          </p>
        </div>
      </div>

      {/* Summary */}
      <div className="bg-bk-card border border-bk-border rounded-xl p-4 mb-4 space-y-2">
        <div className="flex justify-between text-[12px] text-bk-muted">
          <span>Subtotal</span>
          <span>{formatPrice(subtotal)}</span>
        </div>
        <div className="flex justify-between text-[12px] text-bk-muted">
          <span>IVA (10%)</span>
          <span>{formatPrice(tax)}</span>
        </div>
        <div className="flex justify-between text-[15px] font-black pt-2 border-t border-bk-border">
          <span>Total</span>
          <span>{formatPrice(total)}</span>
        </div>
      </div>

      {/* CTA */}
      <Button size="full" onClick={openPayment}>
        Ir a pagar · {formatPrice(total)}
      </Button>
    </div>
  )
}
