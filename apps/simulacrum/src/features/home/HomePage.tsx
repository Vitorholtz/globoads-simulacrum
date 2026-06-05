import { useNavigate } from 'react-router-dom'
import { InteractiveCard, StaticCard, Badge } from '@globo-ads/ds'
import { NAV_SECTIONS } from '../../shell/routes'
import { FEATURES } from '../../shell/features'
import styles from './HomePage.module.css'

const IMPLEMENTED_PATHS = new Set(FEATURES.map((f) => f.path))

const JOURNEY_DESCRIPTIONS: Record<string, string> = {
  '/compra-diarias':
    'Compre espaços publicitários por dia em G1, GE, Globo.com, gshow e Globoplay.',
  '/minhas-campanhas': 'Acompanhe o desempenho e gerencie suas campanhas ativas.',
  '/criativos-materiais': 'Envie e organize os criativos das suas campanhas.',
  '/resultados': 'Visualize relatórios e métricas de impacto das suas ações.',
  '/financeiro': 'Consulte faturas, pagamentos e extratos financeiros.',
}

const JOURNEY_ICONS: Record<string, string> = {
  '/compra-diarias': 'shopping_cart',
  '/minhas-campanhas': 'campaign',
  '/criativos-materiais': 'palette',
  '/resultados': 'analytics',
  '/financeiro': 'payments',
}

interface JourneyEntry {
  path: string
  label: string
  icon: string
  description: string
  implemented: boolean
}

function buildJourneys(): JourneyEntry[] {
  const seen = new Set<string>()
  const journeys: JourneyEntry[] = []

  // Jornadas implementadas que não estão no sidebar (ex: /compra-diarias)
  for (const feature of FEATURES) {
    if (feature.path === '/') continue
    seen.add(feature.path)
    journeys.push({
      path: feature.path,
      label: findLabel(feature.path),
      icon: JOURNEY_ICONS[feature.path] ?? 'work',
      description: JOURNEY_DESCRIPTIONS[feature.path] ?? '',
      implemented: true,
    })
  }

  // Itens do NAV_SECTIONS ainda não implementados
  for (const section of NAV_SECTIONS) {
    for (const item of section.items) {
      if (item.external || item.path === '/' || seen.has(item.path)) continue
      seen.add(item.path)
      journeys.push({
        path: item.path,
        label: item.label,
        icon: JOURNEY_ICONS[item.path] ?? item.icon,
        description: JOURNEY_DESCRIPTIONS[item.path] ?? '',
        implemented: IMPLEMENTED_PATHS.has(item.path),
      })
    }
  }

  return journeys
}

function findLabel(path: string): string {
  for (const section of NAV_SECTIONS) {
    const item = section.items.find((i) => i.path === path)
    if (item) return item.label
  }
  const labels: Record<string, string> = { '/compra-diarias': 'Compra de Diárias' }
  return labels[path] ?? path
}

export default function HomePage() {
  const navigate = useNavigate()
  const journeys = buildJourneys()

  return (
    <div className={styles.page}>
      <header className={styles.intro}>
        <h1 className="type-title-lg">Bem-vindo ao Globo Ads</h1>
        <p className={`type-body-md ${styles.subtitle}`}>
          Escolha uma jornada para começar a explorar os fluxos do produto.
        </p>
      </header>

      <section className={styles.grid} aria-label="Jornadas">
        {journeys.map((journey) =>
          journey.implemented ? (
            <InteractiveCard
              key={journey.path}
              className={styles.card}
              onClick={() => navigate(journey.path)}
              aria-label={`Abrir ${journey.label}`}
            >
              <span
                className={`material-symbols-rounded icon-lg ${styles.cardIcon}`}
                aria-hidden="true"
              >
                {journey.icon}
              </span>
              <span className={`type-title-sm ${styles.cardTitle}`}>{journey.label}</span>
              <span className={`type-body-sm ${styles.cardDesc}`}>{journey.description}</span>
            </InteractiveCard>
          ) : (
            <StaticCard key={journey.path} className={`${styles.card} ${styles.cardComingSoon}`}>
              <div className={styles.cardComingSoonHeader}>
                <span
                  className={`material-symbols-rounded icon-lg ${styles.cardIconMuted}`}
                  aria-hidden="true"
                >
                  {journey.icon}
                </span>
                <Badge variant="neutral" label="Em breve" />
              </div>
              <span className={`type-title-sm ${styles.cardTitleMuted}`}>{journey.label}</span>
              <span className={`type-body-sm ${styles.cardDesc}`}>{journey.description}</span>
            </StaticCard>
          )
        )}
      </section>
    </div>
  )
}
