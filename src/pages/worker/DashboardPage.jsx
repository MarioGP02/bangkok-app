import { Plus, ChefHat } from 'lucide-react'
import useOrderStore from '@/store/orderStore'
import useUIStore    from '@/store/uiStore'
import StatCard      from '@/components/worker/StatCard'
import FilterTabs    from '@/components/worker/FilterTabs'
import OrderCard     from '@/components/worker/OrderCard'
import Button        from '@/components/ui/Button'
import { formatPrice } from '@/lib/utils'
import { ORDER_STATUS, PAY_STATUS } from '@/lib/constants'

export default function DashboardPage() {
  const orders         = useOrderStore((s) => s.orders)
  const addDemoOrder    = useOrderStore((s) => s.addDemoOrder)
  const workerFilter    = useUIStore((s) => s.workerFilter)
  const setWorkerFilter = useUIStore((s) => s.setWorkerFilter)

  // Call getStats() inside the selector so the component re-renders when orders change
  const stats = useOrderStore((s) => s.getStats())

  // ─── Filter logic ─────────────────────────────────────────────────────────
  const filtered = orders.filter((o) => {
    if (workerFilter === 'all')       return true
    if (workerFilter === 'pending')   return o.payStatus === PAY_STATUS.PENDING
    if (workerFilter === 'preparing') return o.status === ORDER_STATUS.PREPARING
    if (workerFilter === 'ready')     return o.status === ORDER_STATUS.READY
    return true
  })

  const tabCounts = {
    all:       orders.length,
    pending:   orders.filter((o) => o.payStatus === PAY_STATUS.PENDING).length,
    preparing: orders.filter((o) => o.status === ORDER_STATUS.PREPARING).length,
    ready:     orders.filter((o) => o.status === ORDER_STATUS.READY).length,
  }

  return (
    <div className="max-w-5xl mx-auto px-6 py-7 animate-fade-in">

      {/* ── Page header ────────────────────────────────────────────────────── */}
      <div className="flex items-center justify-between mb-7 flex-wrap gap-3">
        <div>
          <h2 className="text-2xl font-black tracking-tight">Comandas activas</h2>
          <p className="text-[12px] text-bk-muted mt-0.5">
            Bangkok Noodles & Bao · Turno de tarde
          </p>
        </div>
        <Button variant="secondary" size="sm" onClick={addDemoOrder}>
          <Plus size={14} />
          Simular pedido
        </Button>
      </div>

      {/* ── Stats row ──────────────────────────────────────────────────────── */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-7">
        <StatCard
          label="Total hoy"
          value={stats.total}
          sub="pedidos recibidos"
        />
        <StatCard
          label="Pago pendiente"
          value={stats.pendingPayment}
          sub="sin confirmar"
          highlight={stats.pendingPayment > 0}
        />
        <StatCard
          label="En cocina"
          value={stats.inKitchen}
          sub="preparando"
        />
        <StatCard
          label="Recaudado"
          value={formatPrice(stats.revenue)}
          sub="pagos confirmados"
        />
      </div>

      {/* ── Filter tabs ────────────────────────────────────────────────────── */}
      <div className="mb-5">
        <FilterTabs
          active={workerFilter}
          onChange={setWorkerFilter}
          counts={tabCounts}
        />
      </div>

      {/* ── Orders list ────────────────────────────────────────────────────── */}
      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20
                        border border-dashed border-bk-border rounded-2xl text-center">
          <ChefHat size={36} className="text-bk-muted2 mb-3" />
          <p className="text-[14px] text-bk-muted">Sin comandas en esta categoría</p>
          <p className="text-[11px] text-bk-muted2 mt-1">
            Usa el botón "Simular pedido" para añadir datos de demo.
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {filtered.map((order) => (
            <OrderCard key={order.id} order={order} />
          ))}
        </div>
      )}
    </div>
  )
}
