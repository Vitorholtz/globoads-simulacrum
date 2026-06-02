// Fonte única de navegação do Simulacrum.
// Sidebar e rotas (App.tsx) derivam deste array — espelha a filosofia do registry.tsx do DS.
// Ao adicionar uma jornada: crie a feature em src/features/<dominio>/ e registre uma entrada aqui.

export interface NavItem {
  /** Rota (path do React Router) */
  path: string
  /** Rótulo exibido na navegação */
  label: string
  /** Material Symbol (rounded) usado no item de menu */
  icon: string
}

export const NAV: NavItem[] = [
  { path: '/', label: 'Início', icon: 'home' },
  { path: '/compra-tv', label: 'Compra TV', icon: 'tv' },
  { path: '/compra-digital', label: 'Compra Digital', icon: 'public' },
  { path: '/meus-pedidos', label: 'Meus Pedidos', icon: 'receipt_long' },
  { path: '/criativos', label: 'Galeria de Criativos', icon: 'photo_library' },
  { path: '/campanhas', label: 'Campanhas', icon: 'campaign' },
]
