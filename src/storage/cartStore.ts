import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { CartItem } from '@/types/cart'
import { StorageKey } from '@/types/enums/storageKey'

type DraftItem = Omit<CartItem, 'quantity'>

type CartState = {
  items: CartItem[]
  addItem: (item: DraftItem) => void
  increase: (id: number) => void
  decrease: (id: number) => void
  remove: (id: number) => void
  clear: () => void
}

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (item) => {
        const current = get().items
        const found = current.some((entry) => entry.id === item.id)
        if (!found) {
          set({ items: [...current, { ...item, quantity: 1 }] })
          return
        }
        set({
          items: current.map((entry) =>
            entry.id === item.id ? { ...entry, quantity: entry.quantity + 1 } : entry,
          ),
        })
      },
      increase: (id) => {
        set({
          items: get().items.map((entry) =>
            entry.id === id ? { ...entry, quantity: entry.quantity + 1 } : entry,
          ),
        })
      },
      decrease: (id) => {
        set({
          items: get().items.map((entry) =>
            entry.id === id ? { ...entry, quantity: Math.max(1, entry.quantity - 1) } : entry,
          ),
        })
      },
      remove: (id) => set({ items: get().items.filter((entry) => entry.id !== id) }),
      clear: () => set({ items: [] }),
    }),
    {
      name: StorageKey.Cart,
      // داده سبد حساس نیست. localStorage برای همین کافی است.
      skipHydration: true,
    },
  ),
)

export function cartCount(items: CartItem[]) {
  return items.reduce((sum, item) => sum + item.quantity, 0)
}

export function cartTotal(items: CartItem[]) {
  return items.reduce((sum, item) => sum + item.price * item.quantity, 0)
}
