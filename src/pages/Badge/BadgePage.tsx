import Badge from '../../components/Badge/Badge'
import { BADGE_VARIANTS, BADGE_GUIDELINES } from '../../tokens/badge'
import PageHeader from '../../components/PageHeader/PageHeader'
import SectionHeader from '../../components/SectionHeader/SectionHeader'
import styles from './BadgePage.module.css'

const EXAMPLE_LABELS: Record<string, string> = {
  neutral: 'Rascunho',
  success: 'Publicado',
  warning: 'Em revisão',
  critical: 'Recusado',
  accent: 'Novidade',
}

export default function BadgePage() {
  return (
    <div>
      <PageHeader
        breadcrumb="Indicators"
        title="Badge Status"
        subtitle="Indicador de estado sem interação. Identifica visualmente a condição atual de um item — como status de publicação, resultado de moderação ou classificação — usando cor e texto como sinais semânticos."
        stats={[
          { value: 5, label: 'Variantes' },
          { value: 1, label: 'Tamanho' },
        ]}
      />

      {/* ── Variantes ── */}
      <section className={styles.section}>
        <SectionHeader icon="label" title="Variantes" count={`${BADGE_VARIANTS.length} variantes`} />
        <div className={styles.variantsContainer}>
          {BADGE_VARIANTS.map((v) => (
            <div key={v.id} className={styles.variantRow}>
              <div className={styles.variantPreview}>
                <Badge variant={v.id} label={EXAMPLE_LABELS[v.id]} />
              </div>
              <div className={styles.variantMeta}>
                <span className={styles.variantLabel}>{v.label}</span>
                <p className={styles.variantDesc}>{v.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Anatomia ── */}
      <section className={styles.section}>
        <SectionHeader icon="info" title="Anatomia" />
        <div className={styles.anatomyCard}>
          <div className={styles.anatomyPreview}>
            <Badge variant="neutral" label="Badge" />
          </div>
          <div className={styles.anatomySpecs}>
            <div className={styles.specRow}>
              <span className={styles.specKey}>Tipografia</span>
              <span className={styles.specVal}>12px · weight 500 · font-family base</span>
            </div>
            <div className={styles.specRow}>
              <span className={styles.specKey}>Padding</span>
              <span className={styles.specVal}>2px vertical · 4px horizontal</span>
            </div>
            <div className={styles.specRow}>
              <span className={styles.specKey}>Border-radius</span>
              <span className={styles.specVal}>8px (--radius-md)</span>
            </div>
            <div className={styles.specRow}>
              <span className={styles.specKey}>Cor do texto</span>
              <span className={styles.specVal}>Fill da variante semântica</span>
            </div>
            <div className={styles.specRow}>
              <span className={styles.specKey}>Fundo</span>
              <span className={styles.specVal}>Surface da variante correspondente</span>
            </div>
            <div className={styles.specRow}>
              <span className={styles.specKey}>Interação</span>
              <span className={styles.specVal}>Nenhuma — somente leitura</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Diretrizes ── */}
      <section className={styles.section}>
        <SectionHeader icon="checklist" title="Diretrizes de Uso" />
        <div className={styles.guidelinesGrid}>
          {BADGE_GUIDELINES.map((g) => (
            <div key={g.title} className={styles.guidelineCard}>
              <h3 className={styles.guidelineTitle}>{g.title}</h3>
              <p className={styles.guidelineBody}>{g.body}</p>
              <div className={styles.guidelineRule}>{g.rule}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
