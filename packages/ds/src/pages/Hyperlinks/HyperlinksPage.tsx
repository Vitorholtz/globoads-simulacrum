import Hyperlink from '../../components/Hyperlink/Hyperlink'
import { HYPERLINK_SIZES, HYPERLINK_STATES, HYPERLINK_GUIDELINES } from '../../tokens/hyperlinks'
import type { HyperlinkSize } from '../../tokens/hyperlinks'
import PageHeader from '../../components/docs/PageHeader/PageHeader'
import Section from '../../components/docs/Section/Section'
import ShowcaseList from '../../components/docs/ShowcaseList/ShowcaseList'
import type { ShowcaseRow } from '../../components/docs/ShowcaseList/ShowcaseList'
import StateMatrix from '../../components/docs/StateMatrix/StateMatrix'
import DemoCard from '../../components/docs/DemoCard/DemoCard'
import CardGrid from '../../components/docs/CardGrid/CardGrid'

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
      </Section>

      {/* ── Diretrizes ── */}
      <Section icon="checklist" title="Diretrizes de Uso">
        <CardGrid wide>
          {HYPERLINK_GUIDELINES.map((g) => (
            <DemoCard key={g.title} title={g.title} description={g.body} />
          ))}
        </CardGrid>
      </Section>
    </div>
  )
}
