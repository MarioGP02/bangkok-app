import { useNavigate } from 'react-router-dom'
import { Smartphone, Monitor, ChefHat } from 'lucide-react'

const ROLES = [
  {
    id:    'customer',
    path:  '/customer/menu',
    Icon:  Smartphone,
    title: 'App Cliente',
    desc:  'Navega el menú, realiza un pedido, paga y sigue el estado en tiempo real.',
    badge: 'Vista móvil',
    accent: 'border-bk-primary/30 hover:border-bk-primary/60 bg-bk-primary/4 hover:bg-bk-primary/7',
    dot:   'bg-bk-primary',
  },
  {
    id:    'worker',
    path:  '/worker/dashboard',
    Icon:  Monitor,
    title: 'Panel Trabajador',
    desc:  'Gestiona comandas, confirma pagos y actualiza el estado de cada pedido.',
    badge: 'Vista escritorio',
    accent: 'border-indigo-500/30 hover:border-indigo-500/60 bg-indigo-500/4 hover:bg-indigo-500/7',
    dot:   'bg-indigo-400',
  },
]

export default function RoleSelectorPage() {
  const navigate = useNavigate()

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-6"
      style={{ background: 'radial-gradient(ellipse at 50% -20%, rgba(255,107,0,0.09) 0%, #080808 50%)' }}
    >
      {/* Logo */}
      <div className="mb-2 text-center">
        <div className="inline-flex items-center gap-2 bg-bk-primary/10 border border-bk-primary/20
                        rounded-full px-4 py-1.5 mb-6">
          <ChefHat size={13} className="text-bk-primary" />
          <span className="text-[11px] font-bold text-bk-primary uppercase tracking-wider">Demo v2</span>
        </div>

        <h1 className="text-5xl font-black tracking-tighter">
          BANGKOK<span className="text-bk-primary">.</span>
        </h1>
        <p className="text-bk-muted mt-3 text-[15px] max-w-xs mx-auto leading-relaxed">
          Sistema integral de pedidos, pagos y gestión de cocina.
        </p>
      </div>

      {/* Role cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-lg mt-10">
        {ROLES.map(({ id, path, Icon, title, desc, badge, accent, dot }) => (
          <button
            key={id}
            onClick={() => navigate(path)}
            className={`text-left p-6 rounded-2xl border transition-all duration-200
                        active:scale-[0.98] ${accent}`}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="w-10 h-10 rounded-xl bg-black/30 border border-white/5
                              flex items-center justify-center">
                <Icon size={18} className="text-bk-text opacity-70" />
              </div>
              <span className="text-[9px] font-bold uppercase tracking-widest
                               text-bk-muted border border-bk-border rounded-full px-2 py-1">
                {badge}
              </span>
            </div>

            <h2 className="text-[17px] font-black mb-1.5">{title}</h2>
            <p className="text-[12px] text-bk-muted leading-relaxed">{desc}</p>

            <div className="flex items-center gap-1.5 mt-5 text-[11px] text-bk-muted">
              <span className={`w-1.5 h-1.5 rounded-full ${dot}`} />
              Entrar
            </div>
          </button>
        ))}
      </div>

      <p className="mt-10 text-[10px] text-bk-muted2 font-mono">
        React · Vite · Zustand · Tailwind CSS
      </p>
    </div>
  )
}
