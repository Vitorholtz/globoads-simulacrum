import type { ConfirmedSelection } from '../data/diarias'

export interface CartItemDiarias {
  id: string
  modality: 'diarias'
  addedAt: string
  data: ConfirmedSelection
  subtotal: number
}

// Adicionar novas modalidades como membros da union:
// export interface CartItemPatrocinado { id: string; modality: 'patrocinado'; ... }
export type CartItem = CartItemDiarias
