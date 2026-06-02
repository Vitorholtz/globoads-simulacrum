import { useNavigate } from 'react-router-dom'
import { InteractiveCard } from '@globo-ads/ds'
import { NAV } from '../../shell/routes'
import styles from './HomePage.module.css'

const DESCRIPTIONS: Record<string, string> = {
  '/compra-tv': 'Monte planos de mídia para a programação linear da Globo.',
  '/compra-digital': 'Campanhas em Globoplay, ge, g1 e demais propriedades digitais.',
  '/meus-pedidos': 'Acompanhe o status das compras e veiculações realizadas.',
  '/criativos': 'Faça upload, gerencie e acompanhe a aprovação de criativos.',
  '/campanhas': 'Gerencie a operação e o desempenho das campanhas ativas.',
}

/** Landing do Simulacrum: ponto de entrada para as jornadas do produto. */
export default function HomePage() {
  const navigate = useNavigate()
  const journeys = NAV.filter((item) => item.path !== '/')

  return (
    <div className={styles.page}>
      <header className={styles.intro}>
        <h1 className="type-title-lg">Bem-vindo ao Globo Ads</h1>
        <p className={`type-body-md ${styles.subtitle}`}>
          Escolha uma jornada para começar a explorar os fluxos do produto.
        </p>
      </header>

      <section className={styles.grid} aria-label="Jornadas">
        {journeys.map((item) => (
          <InteractiveCard
            key={item.path}
            className={styles.card}
            onClick={() => navigate(item.path)}
          >
            <span
              className={`material-symbols-rounded icon-lg ${styles.cardIcon}`}
              aria-hidden="true"
            >
              {item.icon}
            </span>
            <span className={`type-title-sm ${styles.cardTitle}`}>{item.label}</span>
            <span className={`type-body-sm ${styles.cardDesc}`}>{DESCRIPTIONS[item.path]}</span>
          </InteractiveCard>
        ))}
      </section>
    </div>
  )
}
