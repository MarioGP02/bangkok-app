import { useNavigate } from 'react-router-dom'
import { MapPin, CreditCard } from 'lucide-react'
import useOrderStore    from '@/store/orderStore'
import QueueCard        from '@/components/customer/QueueCard'
import OrderTimeline    from '@/components/customer/OrderTimeline'
import Badge            from '@/components/ui/Badge'
import Button           from '@/components/ui/Button'
import { formatPrice }  from '@/lib/utils'
import { ORDER_STATUS } from '@/lib/constants'

export default function TrackingPage() {
  const navigate     = useNavigate()
  // Inline selector: reactive to any change in orders or currentOrderId
  const order = useOrderStore((s) =>
    s.orders.find((o) => o.id === s.currentOrderId) ?? null
  )

  if (!order) {
    return (
      <div className="flex flex-col items-center justify-center h-[500px] px-6 text-center animate-fade-in">
        <MapPin size={44} className="text-bk-muted2 mb-4" />
        <p className="text-[14px] font-semibold text-bk-muted">Sin pedido activo</p>
        <p className="text-[12px] text-bk-muted2 mt-1.5 mb-6">
          Realiza un pedido desde la carta para ver el seguimiento aquí.
        </p>
        <Button variant="ghost" size="sm" onClick={() => navigate('/customer/menu')}>
          Ir a la carta
        </Button>
      </div>
    )
  }

  // Progress percentage for the top bar
  const progressMap = {
    [ORDER_STATUS.RECEIVED]:  15,
    [ORDER_STATUS.PREPARING]: 55,
    [ORDER_STATUS.READY]:     100,
  }
  const progress = progressMap[order.status] ?? 0

  return (
    <div className="px-4 py-4 flex flex-col gap-3 animate-fade-in">

      {/* Order ID + status */}
      <div className="bg-bk-card border border-bk-border rounded-2xl p-4">
        <div className="flex items-start justify-between mb-3">
          <div>
            <p className="text-[10px] text-bk-muted font-mono uppercase tracking-wider mb-1">Pedido</p>
            <p className="text-[24px] font-black font-mono text-bk-primary tracking-tight leading-none">
              {order.id}
            </p>
          </div>
          <div className="text-right">
            <Badge
              variant={
                order.status === ORDER_STATUS.READY     ? 'ready'     :
                order.status === ORDER_STATUS.PREPARING ? 'preparing' : 'paid'
              }
            >
              {order.status === ORDER_STATUS.READY
                ? 'Listo'
                : order.status === ORDER_STATUS.PREPARING
                ? 'Preparando'
                : 'Recibido'}
            </Badge>
            <p className="text-[10px] text-bk-muted2 font-mono mt-2">{order.time}</p>
          </div>
        </div>

        {/* Progress bar */}
        <div className="h-1 rounded-full bg-bk-card2 overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-700"
            style={{
              width: `${progress}%`,
              background: 'linear-gradient(90deg, #ff6b00, #ff9500)',
            }}
          />
        </div>
      </div>

      {/* Queue info / ready celebration */}
      <QueueCard order={order} />

      {/* Timeline */}
      <div className="bg-bk-card border border-bk-border rounded-2xl p-4">
        <p className="text-[10px] font-bold text-bk-muted uppercase tracking-widest mb-4">
          Estado del pedido
        </p>
        <OrderTimeline status={order.status} />
      </div>

      {/* Order summary */}
      <div className="bg-bk-card border border-bk-border rounded-2xl p-4">
        <p className="text-[10px] font-bold text-bk-muted uppercase tracking-widest mb-3">Resumen</p>

        <div className="space-y-2 mb-3">
          {order.items.map((item, i) => (
            <div key={i} className="flex justify-between text-[12px] text-bk-muted">
              <span>{item.name}</span>
              <span>{formatPrice(item.price)}</span>
            </div>
          ))}
        </div>

        <div className="flex justify-between text-[14px] font-black pt-2.5 border-t border-bk-border">
          <span>Total pagado</span>
          <span className="text-bk-primary">{formatPrice(order.total)}</span>
        </div>

        <div className="flex items-center gap-2 mt-2.5 text-[10px] text-bk-muted2">
          <CreditCard size={11} />
          <span className="font-mono">{order.payMethod} ···{order.payLast4}</span>
        </div>
      </div>
    </div>
  )
}
