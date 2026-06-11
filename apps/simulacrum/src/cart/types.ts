import type { ConfirmedSelection, ImpressoesConfirmedSelection } from '../data'

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
