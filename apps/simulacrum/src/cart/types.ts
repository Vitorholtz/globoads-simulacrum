import type { ConfirmedSelection } from '../data/diarias'
import type { ImpressoesConfirmedSelection } from '../data/impressoes'

export interface CartItemDiarias {
  id: string
  modality: 'diarias'
  addedAt: string
  data: ConfirmedSelection
  subtotal: number
}

export interface CartItemImpressoes {
  id: string
  modality: 'impressoes'
  addedAt: string
  data: ImpressoesConfirmedSelection
  subtotal: number
}

// Adicionar novas modalidades como membros da union:
export type CartItem = CartItemDiarias | CartItemImpressoes
