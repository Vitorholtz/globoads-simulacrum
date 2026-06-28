import Hyperlink from '../../components/Hyperlink/Hyperlink'
import { HYPERLINK_SIZES, HYPERLINK_STATES, HYPERLINK_GUIDELINES } from '../../tokens/hyperlinks'
import type { HyperlinkSize } from '../../tokens/hyperlinks'
import PageHeader from '../../components/docs/PageHeader/PageHeader'
import GuidelinesGrid from '../../components/docs/GuidelinesGrid/GuidelinesGrid'
import Section from '../../components/docs/Section/Section'
import ShowcaseList from '../../components/docs/ShowcaseList/ShowcaseList'
import type { ShowcaseRow } from '../../components/docs/ShowcaseList/ShowcaseList'
import StateMatrix from '../../components/docs/StateMatrix/StateMatrix'
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
        <ShowcaseList
          previewWidth={200}
          rows={HYPERLINK_SIZES.map(
            (s): ShowcaseRow => ({
              id: s.id,
              label: s.label,
              badge: s.recommended ? 'Recomendado' : s.warning ? '⚠ Restrito' : undefined,
              badgeVariant: s.warning ? 'warning' : undefined,
              description: s.description,
              specs: (
                <>
                  font {s.fontSize}px · lh {s.lineHeight}px
                  <br />
                  icon {s.iconSize}px · gap {s.gap}px
                </>
              ),
            })
          )}
          renderPreview={(row) => <Hyperlink size={row.id as HyperlinkSize}>Hyperlink</Hyperlink>}
        />
      </Section>

      {/* ── Estados ── */}
      <Section icon="toggle_on" title="Estados" count={HYPERLINK_STATES.length}>
        <StateMatrix
          columns={HYPERLINK_SIZES}
          rows={[...HYPERLINK_STATES]}
          renderCell={(state, col) => (
            <Hyperlink size={col.id as HyperlinkSize} forceState={toForceState(state.id ?? '')}>
              Hyperlink
            </Hyperlink>
          )}
        />

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
        <CardGrid>
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
