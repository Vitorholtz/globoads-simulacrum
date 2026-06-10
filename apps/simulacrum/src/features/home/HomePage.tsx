import { useNavigate } from 'react-router-dom'
import { InteractiveCard, StaticCard, Badge } from '@globo-ads/ds'
import { NAV_SECTIONS } from '../../shell/routes'
import { FEATURES } from '../../shell/features'
import { PORTALS } from '../../data/diarias'
import PageContainer from '../../components/PageContainer/PageContainer'
import styles from './HomePage.module.css'

// Derivado de PORTALS (fonte única) para que a descrição acompanhe os portais de Diárias.
const diariasPortalNames = PORTALS.map((p) => p.name)
const diariasPortalsList = `${diariasPortalNames.slice(0, -1).join(', ')} e ${diariasPortalNames.at(-1)}`

const JOURNEY_DESCRIPTIONS: Record<string, string> = {
  '/compra-diarias': `Compre espaços publicitários por dia em ${diariasPortalsList}.`,
  '/compra-impressoes':
    'Contrate impressões por CPM e alcance seu público nas plataformas digitais da Globo.',
  '/minhas-campanhas': 'Acompanhe o desempenho e gerencie suas campanhas ativas.',
  '/criativos-materiais': 'Envie e organize os criativos das suas campanhas.',
  '/resultados': 'Visualize relatórios e métricas de impacto das suas ações.',
  '/financeiro': 'Consulte faturas, pagamentos e extratos financeiros.',
}

interface JourneyEntry {
  path: string
  label: string
  icon: string
  description: string
  implemented: boolean
}

function buildJourneys(): JourneyEntry[] {
  // Derivado de FEATURES (fonte única). Calculado em tempo de render — não no topo
  // do módulo — porque features.ts importa esta página (ciclo), e ler FEATURES na
  // inicialização cairia em TDZ ("Cannot access 'FEATURES' before initialization").
  const implementedPaths = new Set(FEATURES.map((f) => f.path))

  const journeys: JourneyEntry[] = []
  for (const section of NAV_SECTIONS) {
    for (const item of section.items) {
      if (item.external || item.path === '/') continue
      journeys.push({
        path: item.path,
        label: item.label,
        icon: item.icon,
        description: JOURNEY_DESCRIPTIONS[item.path] ?? '',
        implemented: implementedPaths.has(item.path),
      })
    }
  }
  return journeys
}

export default function HomePage() {
  const navigate = useNavigate()
  const journeys = buildJourneys()

  return (
    <PageContainer>
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
    </PageContainer>
  )
}
