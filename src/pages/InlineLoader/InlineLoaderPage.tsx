import InlineLoader from '../../components/InlineLoader/InlineLoader'
import {
  INLINE_LOADER_TYPES,
  INLINE_LOADER_SIZES,
  INLINE_LOADER_COLORS,
  INLINE_LOADER_GUIDELINES,
} from '../../tokens/inlineLoader'
import type { InlineLoaderType, InlineLoaderSize } from '../../tokens/inlineLoader'
import PageHeader from '../../components/PageHeader/PageHeader'
import SectionHeader from '../../components/SectionHeader/SectionHeader'
import styles from './InlineLoaderPage.module.css'

const ELLIPSIS_LABELS: Record<InlineLoaderType, string> = {
  spinner: '',
  rippler: '',
  sparkle: '',
  ellipsis: 'Digitando',
}

export default function InlineLoaderPage() {
  return (
    <div>
      <PageHeader
        breadcrumb="Indicators"
        title="Inline Loader"
        subtitle="Indicador de carregamento pontual para ações rápidas dentro de componentes. Não bloqueia a página e não substitui o layout — comunica processamento ativo em botões, campos, áreas de conteúdo ou indicadores textuais."
        stats={[
          { value: 4, label: 'Tipos' },
          { value: 3, label: 'Tamanhos' },
          { value: 8, label: 'Cores' },
        ]}
      />

      {/* ── Tipos ── */}
      <section className={styles.section}>
        <SectionHeader icon="motion_blur" title="Tipos" count={`${INLINE_LOADER_TYPES.length} tipos`} />
        <div className={styles.typesContainer}>
          {INLINE_LOADER_TYPES.map((t) => (
            <div key={t.id} className={styles.typeRow}>
              <div className={styles.typePreview}>
                <InlineLoader
                  type={t.id}
                  size="md"
                  color="primary"
                  label={ELLIPSIS_LABELS[t.id] || 'Carregando'}
                />
              </div>
              <div className={styles.typeMeta}>
                <span className={`type-body-sm ${styles.typeLabel}`}>{t.label}</span>
                <p className={`type-body-sm ${styles.typeDesc}`}>{t.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Tamanhos ── */}
      <section className={styles.section}>
        <SectionHeader icon="straighten" title="Tamanhos" count={`${INLINE_LOADER_SIZES.length} tamanhos`} />
        <div className={styles.sizesTable}>
          {/* Header */}
          <div className={styles.sizesHeader}>
            <div className={styles.sizesTypeCol} />
            {INLINE_LOADER_SIZES.map((s) => (
              <div key={s.id} className={styles.sizeHeadCell}>
                <span className={`type-body-sm ${styles.sizeHeadLabel}`}>{s.label}</span>
                <span className={`type-caption-sm ${styles.sizeHeadPx}`}>{s.px}px</span>
              </div>
            ))}
          </div>
          {/* Rows */}
          {INLINE_LOADER_TYPES.map((t) => (
            <div key={t.id} className={styles.sizesRow}>
              <div className={styles.sizesTypeCol}>
                <span className={`type-body-sm ${styles.sizesTypeName}`}>{t.label}</span>
              </div>
              {INLINE_LOADER_SIZES.map((s) => (
                <div key={s.id} className={styles.sizeCell}>
                  <InlineLoader
                    type={t.id}
                    size={s.id as InlineLoaderSize}
                    color="primary"
                    label={ELLIPSIS_LABELS[t.id] || 'Carregando'}
                  />
                </div>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* ── Cores ── */}
      <section className={styles.section}>
        <SectionHeader icon="palette" title="Cores" count={`${INLINE_LOADER_COLORS.length} cores`} />
        <div className={styles.colorsGrid}>
          {INLINE_LOADER_COLORS.map((c) => (
            <div key={c.id} className={styles.colorCard}>
              <div className={styles.colorPreview}>
                <InlineLoader type="spinner" size="md" color={c.id} />
              </div>
              <span className={`type-caption-sm ${styles.colorLabel}`}>{c.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── Diretrizes ── */}
      <section className={styles.section}>
        <SectionHeader icon="checklist" title="Diretrizes de Uso" />
        <div className={styles.guidelinesGrid}>
          {INLINE_LOADER_GUIDELINES.map((g) => (
            <div key={g.title} className={styles.guidelineCard}>
              <h3 className={`type-body-md ${styles.guidelineTitle}`}>{g.title}</h3>
              <p className={`type-body-sm ${styles.guidelineBody}`}>{g.body}</p>
              <div className={`type-caption-sm ${styles.guidelineRule}`}>{g.rule}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
