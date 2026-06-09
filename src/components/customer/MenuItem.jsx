import { useState } from 'react'
import { Plus, Check, Flame } from 'lucide-react'
import useCartStore from '@/store/cartStore'

/**
 * @param {{ item: import('@/data/menu').MenuItem }} props
 */
export default function MenuItem({ item }) {
  const addItem  = useCartStore((s) => s.addItem)
  const lines    = useCartStore((s) => s.lines)
  const [added, setAdded] = useState(false)

  const qty = lines.find((l) => l.item.id === item.id)?.quantity ?? 0

  function handleAdd() {
    addItem(item)
    setAdded(true)
    setTimeout(() => setAdded(false), 700)
  }

  return (
    <div className="flex gap-0 bg-bk-card border border-bk-border rounded-2xl overflow-hidden
                    transition-colors hover:border-bk-border2">
      {/* Image */}
      <div className="w-[88px] h-[88px] flex-shrink-0 overflow-hidden">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col justify-between p-3">
        <div>
          <div className="flex items-start gap-1.5">
            <span className="text-[13px] font-bold text-bk-text leading-tight">
              {item.name}
            </span>
            {item.spicy   && <Flame size={11} className="text-orange-400 flex-shrink-0 mt-0.5" />}
            {item.popular && (
              <span className="text-[8px] font-bold text-bk-primary uppercase tracking-wider
                               bg-bk-primary/10 border border-bk-primary/20 px-1.5 py-0.5 rounded-full flex-shrink-0">
                Top
              </span>
            )}
          </div>
          <p className="text-[10px] text-bk-muted mt-1 leading-relaxed line-clamp-2">
            {item.description}
          </p>
        </div>

        <div className="flex items-center justify-between mt-2">
          <span className="text-[15px] font-black text-bk-text">
            {item.price.toFixed(2)} €
          </span>

          {/* Add button */}
          <button
            onClick={handleAdd}
            className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0
                        transition-all duration-200 active:scale-90
                        ${added
                          ? 'bg-green-500 text-white'
                          : qty > 0
                          ? 'bg-bk-primary text-black ring-2 ring-bk-primary/30'
                          : 'bg-bk-primary text-black'
                        }`}
          >
            {added ? <Check size={13} strokeWidth={3} /> : <Plus size={13} strokeWidth={3} />}
          </button>
        </div>
      </div>

      {/* Qty pill (when > 0) */}
      {qty > 0 && !added && (
        <div className="self-start mt-2 mr-2">
          <span className="text-[9px] font-mono font-bold text-bk-primary">×{qty}</span>
        </div>
      )}
    </div>
  )
}
