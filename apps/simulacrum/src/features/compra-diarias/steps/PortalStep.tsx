import { Badge, InteractiveCard, Tooltip } from '@globo-ads/ds'
import {
  PORTALS,
  PORTAL_DISPLAY_NAMES,
  getPortalStats,
  formatImpressions,
} from '../../../data/diarias'
import { useDiarias } from '../context/DiariasContext'
import styles from './PortalStep.module.css'

export default function PortalStep() {
  const { handlePortalSelect: onSelect } = useDiarias()
  return (
    <section className={styles.section}>
      <header className={styles.header}>
        <h2 className="type-title-md">Em qual portal você deseja anunciar?</h2>
      </header>

      <div className={styles.grid}>
        {PORTALS.map((portal) => {
          const stats = getPortalStats(portal.id)
          return (
            <InteractiveCard
              key={portal.id}
              className={styles.card}
              onClick={() => onSelect(portal.id)}
              aria-label={`Selecionar ${PORTAL_DISPLAY_NAMES[portal.id]}`}
            >
              <div className={styles.cardHeader}>
                <div className={styles.logoWrapper}>
                  {portal.svgPath ? (
                    <img
                      src={portal.svgPath}
                      alt={PORTAL_DISPLAY_NAMES[portal.id]}
                      className={styles.logo}
                    />
                  ) : (
                    <span className={`type-title-md ${styles.logoFallback}`}>
                      {PORTAL_DISPLAY_NAMES[portal.id]}
                    </span>
                  )}
                </div>
                <p className={`type-title-sm ${styles.portalName}`}>
                  {PORTAL_DISPLAY_NAMES[portal.id]}
                </p>
              </div>

              <div className={styles.cardBody}>
                <p className={`type-body-sm ${styles.description}`}>{portal.description}</p>
                <div className={styles.badgeRow}>
                  {stats.hasNational && <Badge variant="neutral" label="Nacional" />}
                  {stats.hasRegional && <Badge variant="accent" label="Regional" />}
                  <span className={`type-caption-sm ${styles.productCount}`}>
                    {stats.productCount} {stats.productCount === 1 ? 'produto' : 'produtos'}
                  </span>
                </div>
              </div>

              <div className={styles.cardFooter}>
                <span className={`type-body-sm ${styles.maxImpressions}`}>
                  Até {formatImpressions(stats.maxImpressions)} impressões/dia
                </span>
                <Tooltip
                  text="Estimativa de alcance diário para o produto com maior cobertura neste portal"
                  position="up"
                >
                  <span
                    className={`material-symbols-rounded icon-md ${styles.tooltipIcon}`}
                    aria-label="Mais informações sobre impressões"
                  >
                    info
                  </span>
                </Tooltip>
              </div>
            </InteractiveCard>
          )
        })}
      </div>
    </section>
  )
}
