/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react'
import type { CartItem } from './types'

const STORAGE_KEY = 'gads_cart'

function parseISODates(arr: unknown[]): Date[] {
  return arr.flatMap((d) => {
    if (d instanceof Date) return isNaN(d.getTime()) ? [] : [d]
    if (typeof d !== 'string') return []
    const date = new Date(d)
    return isNaN(date.getTime()) ? [] : [date]
  })
}

function hydrateItem(item: CartItem): CartItem {
  if (item.modality === 'diarias') {
    return {
      ...item,
      data: {
        ...item.data,
        dates: parseISODates(item.data.dates as unknown[]),
        regionalSelections: item.data.regionalSelections.map((r) => ({
          ...r,
          dates: parseISODates(r.dates as unknown[]),
        })),
      },
    }
  }
  return item
}

function loadItems(): CartItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    return (JSON.parse(raw) as CartItem[]).map(hydrateItem)
  } catch {
    return []
  }
}

export interface CartToast {
  title: string
  description: string
}

interface CartContextValue {
  items: CartItem[]
  itemCount: number
  grandTotal: number
  toast: CartToast | null
  dismissToast(): void
  addItem(item: Omit<CartItem, 'id' | 'addedAt'>): void
  updateItem(id: string, data: CartItem['data'], subtotal: number): void
  removeItem(id: string): void
  clearCart(): void
}

const CartContext = createContext<CartContextValue | null>(null)

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(loadItems)
  const [toast, setToast] = useState<CartToast | null>(null)

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
    } catch {
      // localStorage unavailable
    }
  }, [items])

  const dismissToast = useCallback(() => setToast(null), [])

  const addItem = useCallback((item: Omit<CartItem, 'id' | 'addedAt'>) => {
    const newItem = {
      ...item,
      id: crypto.randomUUID(),
      addedAt: new Date().toISOString(),
    } as CartItem
    setItems((prev) => [...prev, newItem])
    setToast({
      title: 'Item adicionado ao carrinho',
      description: 'Acesse o carrinho para revisar o pedido.',
    })
  }, [])

  const updateItem = useCallback((id: string, data: CartItem['data'], subtotal: number) => {
    setItems((prev) => prev.map((item) => (item.id === id ? { ...item, data, subtotal } : item)))
    setToast({ title: 'Item atualizado no carrinho', description: 'As alterações foram salvas.' })
  }, [])

  const removeItem = useCallback((id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id))
  }, [])

  const clearCart = useCallback(() => {
    setItems([])
  }, [])

  const itemCount = items.length
  const grandTotal = items.reduce((sum, item) => sum + item.subtotal, 0)

  return (
    <CartContext.Provider
      value={{
        items,
        itemCount,
        grandTotal,
        toast,
        dismissToast,
        addItem,
        updateItem,
        removeItem,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}
