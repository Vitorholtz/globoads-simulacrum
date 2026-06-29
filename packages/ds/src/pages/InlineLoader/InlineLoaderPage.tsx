import InlineLoader from '../../components/InlineLoader/InlineLoader'
import {
  INLINE_LOADER_TYPES,
  INLINE_LOADER_SIZES,
  INLINE_LOADER_COLORS,
  INLINE_LOADER_GUIDELINES,
} from '../../tokens/inlineLoader'
import type { InlineLoaderType, InlineLoaderSize } from '../../tokens/inlineLoader'
import PageHeader from '../../components/docs/PageHeader/PageHeader'
import CardGrid from '../../components/docs/CardGrid/CardGrid'
import DemoCard from '../../components/docs/DemoCard/DemoCard'
import Section from '../../components/docs/Section/Section'
import ShowcaseList from '../../components/docs/ShowcaseList/ShowcaseList'
import StateMatrix from '../../components/docs/StateMatrix/StateMatrix'
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
          { value: INLINE_LOADER_COLORS.length, label: 'Cores' },
        ]}
      />

      {/* ── Tipos ── */}
      <Section icon="motion_blur" title="Tipos" count={INLINE_LOADER_TYPES.length}>
        <ShowcaseList
          previewWidth={180}
          rows={INLINE_LOADER_TYPES.map((t) => ({
            id: t.id,
            label: t.label,
            description: t.description,
          }))}
          renderPreview={(row) => (
            <InlineLoader
              type={row.id as InlineLoaderType}
              size="md"
              color="primary"
              label={ELLIPSIS_LABELS[row.id as InlineLoaderType] || 'Carregando'}
            />
          )}
        />
      </Section>

      {/* ── Tamanhos ── */}
      <Section icon="straighten" title="Tamanhos" count={INLINE_LOADER_SIZES.length}>
        <StateMatrix
          columns={INLINE_LOADER_SIZES.map((s) => ({
            id: s.id,
            label: `${s.label} · ${s.px}px`,
          }))}
          rows={INLINE_LOADER_TYPES.map((t) => ({ id: t.id, label: t.label }))}
          renderCell={(row, col) => (
            <InlineLoader
              type={row.id as InlineLoaderType}
              size={col.id as InlineLoaderSize}
              color="primary"
              label={ELLIPSIS_LABELS[row.id as InlineLoaderType] || 'Carregando'}
            />
          )}
        />
      </Section>

      {/* ── Cores ── */}
      <Section icon="palette" title="Cores" count={INLINE_LOADER_COLORS.length}>
        <div className={styles.colorsGrid}>
          {INLINE_LOADER_COLORS.map((c) => (
            <div key={c.id} className={styles.colorCard}>
              <div
                className={[
                  styles.colorPreview,
                  c.id === 'inverse' ? styles.colorPreviewInverse : '',
                ]
                  .filter(Boolean)
                  .join(' ')}
              >
                <InlineLoader type="spinner" size="md" color={c.id} />
              </div>
              <span className={`type-caption-sm ${styles.colorLabel}`}>{c.label}</span>
            </div>
          ))}
        </div>
      </Section>

      {/* ── Diretrizes ── */}
      <Section icon="checklist" title="Diretrizes de Uso">
        <CardGrid wide>
          {INLINE_LOADER_GUIDELINES.map((g) => (
            <DemoCard key={g.title} title={g.title} description={g.body} />
          ))}
        </CardGrid>
      </Section>
    </div>
  )
}
