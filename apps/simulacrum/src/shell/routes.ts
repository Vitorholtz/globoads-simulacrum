// Fonte única de navegação do Simulacrum.
// Sidebar e rotas (App.tsx) derivam deste array — espelha a filosofia do registry.tsx do DS.
// Ao adicionar uma jornada: crie a feature em src/features/<dominio>/ e registre uma entrada aqui.

export interface NavItem {
  path: string
  label: string
  icon: string
  /** Abre em nova aba (link externo — path é tratado como URL absoluta) */
  external?: boolean
}

export interface NavSection {
  title: string
  items: NavItem[]
}

export const NAV_SECTIONS: NavSection[] = [
  {
    title: 'Favoritos',
    items: [
      { path: '/', label: 'Página Inicial', icon: 'home' },
      { path: '/minhas-campanhas', label: 'Minhas Campanhas', icon: 'campaign' },
      { path: '/criativos-materiais', label: 'Criativos e Materiais', icon: 'palette' },
    ],
  },
  {
    title: 'Menu',
    items: [
      { path: '/resultados', label: 'Resultados', icon: 'analytics' },
      { path: '/financeiro', label: 'Financeiro', icon: 'payments' },
      { path: '#', label: 'Planejador de Mídia', icon: 'calendar_month', external: true },
    ],
  },
]

export const NAV_FOOTER: NavItem[] = [
  { path: '/gestao-usuarios', label: 'Gestão de Usuários', icon: 'manage_accounts' },
  { path: '/ajuda', label: 'Ajuda', icon: 'help' },
]

// Mantém NAV plano para compatibilidade com usePageTitle no Header (exclui externos)
export const NAV: NavItem[] = NAV_SECTIONS.flatMap((s) => s.items.filter((i) => !i.external))
