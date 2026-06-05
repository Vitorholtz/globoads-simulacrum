import { useNavigate } from 'react-router-dom'
import { InteractiveCard } from '@globo-ads/ds'
import styles from './HomePage.module.css'

export default function HomePage() {
  const navigate = useNavigate()

  return (
    <div className={styles.page}>
      <header className={styles.intro}>
        <h1 className="type-title-lg">Bem-vindo ao Globo Ads</h1>
        <p className={`type-body-md ${styles.subtitle}`}>
          Escolha uma jornada para começar a explorar os fluxos do produto.
        </p>
      </header>

      <section className={styles.grid} aria-label="Jornadas">
        <InteractiveCard className={styles.card} onClick={() => navigate('/compra-diarias')}>
          <span
            className={`material-symbols-rounded icon-lg ${styles.cardIcon}`}
            aria-hidden="true"
          >
            shopping_cart
          </span>
          <span className={`type-title-sm ${styles.cardTitle}`}>Compra de Diárias</span>
          <span className={`type-body-sm ${styles.cardDesc}`}>
            Compre espaços publicitários por dia em G1, GE, Globo.com, gshow e Globoplay.
          </span>
        </InteractiveCard>
      </section>
    </div>
  )
}
