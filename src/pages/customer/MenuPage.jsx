import { MENU_ITEMS } from '@/data/menu'
import { MENU_CATEGORY } from '@/lib/constants'
import MenuItem  from '@/components/customer/MenuItem'
import useUIStore from '@/store/uiStore'

const CATEGORIES = [MENU_CATEGORY.ALL, MENU_CATEGORY.PRINCIPAL, MENU_CATEGORY.STARTER, MENU_CATEGORY.DRINK]

export default function MenuPage() {
  const activeCategory  = useUIStore((s) => s.menuCategory)
  const setMenuCategory = useUIStore((s) => s.setMenuCategory)

  const filtered = activeCategory
    ? MENU_ITEMS.filter((m) => m.category === activeCategory)
    : MENU_ITEMS

  return (
    <div className="animate-fade-in">
      {/* Category chips */}
      <div className="flex gap-2 overflow-x-auto no-scroll px-4 pt-4 pb-2">
        {CATEGORIES.map((cat) => {
          const isActive = cat === MENU_CATEGORY.ALL
            ? !activeCategory
            : activeCategory === cat

          return (
            <button
              key={cat}
              onClick={() => setMenuCategory(cat === MENU_CATEGORY.ALL ? null : cat)}
              className={`flex-shrink-0 px-4 py-1.5 rounded-full text-[11px] font-semibold
                          border transition-all duration-150
                          ${isActive
                            ? 'bg-bk-primary text-black border-bk-primary'
                            : 'bg-bk-card border-bk-border text-bk-muted hover:border-bk-border2'
                          }`}
            >
              {cat}
            </button>
          )
        })}
      </div>

      {/* Items list */}
      <div className="flex flex-col gap-3 px-4 py-3">
        {filtered.map((item) => (
          <MenuItem key={item.id} item={item} />
        ))}
      </div>
    </div>
  )
}
