import Hyperlink from '../../components/Hyperlink/Hyperlink'
import { HYPERLINK_SIZES, HYPERLINK_STATES, HYPERLINK_GUIDELINES } from '../../tokens/hyperlinks'
import type { HyperlinkSize } from '../../tokens/hyperlinks'
import PageHeader from '../../components/docs/PageHeader/PageHeader'
import GuidelinesGrid from '../../components/docs/GuidelinesGrid/GuidelinesGrid'
import Section from '../../components/docs/Section/Section'
import DemoCard from '../../components/docs/DemoCard/DemoCard'
import CardGrid from '../../components/docs/CardGrid/CardGrid'
import styles from './HyperlinksPage.module.css'

type ForceState = 'hover' | 'focus' | 'active' | undefined

function toForceState(id: string): ForceState {
  if (id === 'hover' || id === 'focus' || id === 'active') return id
  return undefined
}

export default function HyperlinksPage() {
  return (
    <div>
      <PageHeader
        breadcrumb="Navigations"
        title="Hyperlinks"
        subtitle="Hyperlinks levam os usuários de um lugar para outro, dentro ou fora da aplicação. Existem em quatro tamanhos e quatro estados interativos, com suporte a link externo sinalizado por ícone."
        stats={[
          { value: 4, label: 'Tamanhos' },
          { value: 4, label: 'Estados' },
          { value: 2, label: 'Variantes' },
        ]}
      />

      {/* ── Escala de Tamanhos ── */}
      <Section icon="straighten" title="Escala de Tamanhos" count={HYPERLINK_SIZES.length}>
        <div className={styles.sizeScaleContainer}>
          {HYPERLINK_SIZES.map((s) => (
            <div key={s.id} className={styles.sizeRow}>
              <div className={styles.sizePreview}>
                <Hyperlink size={s.id as HyperlinkSize}>Hyperlink</Hyperlink>
              </div>
              <div className={styles.sizeMeta}>
                <div className={styles.sizeValueRow}>
                  <span className={`type-body-sm ${styles.sizeLabel}`}>{s.label}</span>
                  {s.recommended && (
                    <span className={`type-caption-sm ${styles.sizeBadge}`}>Recomendado</span>
                  )}
                  {s.warning && (
                    <span className={`type-caption-sm ${styles.sizeBadgeWarning}`}>⚠ Restrito</span>
                  )}
                </div>
                <span className={`type-body-sm ${styles.sizeDescription}`}>{s.description}</span>
              </div>
              <div className={`type-caption-sm ${styles.sizeSpecs}`}>
                <span>
                  font {s.fontSize}px · lh {s.lineHeight}px
                </span>
                <br />
                <span>
                  icon {s.iconSize}px · gap {s.gap}px
                </span>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* ── Estados ── */}
      <Section icon="toggle_on" title="Estados" count={HYPERLINK_STATES.length}>
        <div className={styles.stateMatrix}>
          <div className={styles.matrixHeaderRow}>
            <div className={styles.matrixHeaderSpacer} />
            {HYPERLINK_SIZES.map((s) => (
              <div key={s.id} className={`type-caption-xs ${styles.matrixSizeLabel}`}>
                {s.label}
              </div>
            ))}
          </div>
          {HYPERLINK_STATES.map((state) => (
            <div key={state.id} className={styles.matrixRow}>
              <div className={styles.matrixStateLabel}>
                <span className={`type-caption-sm ${styles.matrixStateName}`}>{state.label}</span>
              </div>
              {HYPERLINK_SIZES.map((s) => (
                <div key={s.id} className={styles.matrixCell}>
                  <Hyperlink size={s.id as HyperlinkSize} forceState={toForceState(state.id)}>
                    Hyperlink
                  </Hyperlink>
                </div>
              ))}
            </div>
          ))}
        </div>

        <div className={styles.statesLegend}>
          {HYPERLINK_STATES.map((s) => (
            <div key={s.id} className={styles.legendItem}>
              <span className={`type-caption-sm ${styles.legendLabel}`}>{s.label}</span>
              <span className={`type-caption-sm ${styles.legendDesc}`}>{s.description}</span>
            </div>
          ))}
        </div>
      </Section>

      {/* ── Link Externo ── */}
      <Section icon="open_in_new" title="Link Externo">
        <CardGrid cols={4}>
          {HYPERLINK_SIZES.map((s) => (
            <DemoCard
              key={s.id}
              preview={
                <Hyperlink size={s.id as HyperlinkSize} external href="#">
                  Hyperlink
                </Hyperlink>
              }
              title={s.label}
              description={`icon ${s.iconSize}px`}
            />
          ))}
        </CardGrid>
        <div className={styles.externalNote}>
          <span
            className={`material-symbols-rounded icon-md ${styles.externalNoteIcon}`}
            aria-hidden="true"
          >
            info
          </span>
          <p className="type-body-sm">
            Use o prop <code>external</code> em links que abrem fora da aplicação. O ícone{' '}
            <strong>open_in_new</strong> é adicionado automaticamente, e o atributo{' '}
            <code>target="_blank"</code> com <code>rel="noopener noreferrer"</code> é aplicado para
            segurança.
          </p>
        </div>
      </Section>

      {/* ── Diretrizes ── */}
      <Section icon="checklist" title="Diretrizes de Uso">
        <GuidelinesGrid items={HYPERLINK_GUIDELINES} />
      </Section>
    </div>
  )
}
