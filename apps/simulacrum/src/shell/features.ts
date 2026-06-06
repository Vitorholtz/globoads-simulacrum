// Registro de rotas com componente implementado.
// Nova jornada: crie a feature em src/features/<dominio>/ e adicione uma entrada aqui.
// Rotas listadas aqui recebem o componente real; as demais (em NAV) recebem PlaceholderPage.

import type { ComponentType } from 'react'
import HomePage from '../features/home/HomePage'
import CompraDiariasPage from '../features/compra-diarias/CompraDiariasPage'
import CarrinhoPage from '../features/carrinho/CarrinhoPage'

export interface FeatureRoute {
  path: string
  component: ComponentType
}

export const FEATURES: FeatureRoute[] = [
  { path: '/', component: HomePage },
  { path: '/compra-diarias', component: CompraDiariasPage },
  { path: '/carrinho', component: CarrinhoPage },
]
