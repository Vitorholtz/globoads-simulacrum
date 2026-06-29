import ChipSuggestion from '../../components/ChipSuggestion/ChipSuggestion'
import { CHIP_BEHAVIORS, CHIP_STATES, CHIP_GUIDELINES } from '../../tokens/chipSuggestion'
import type { ChipBehavior } from '../../tokens/chipSuggestion'
import PageHeader from '../../components/docs/PageHeader/PageHeader'
import Section from '../../components/docs/Section/Section'
import StateMatrix from '../../components/docs/StateMatrix/StateMatrix'
import DemoCard from '../../components/docs/DemoCard/DemoCard'
import CardGrid from '../../components/docs/CardGrid/CardGrid'

export default function ChipSuggestionPage() {
  return (
    <div>
      <PageHeader
        breadcrumb="Components / Inputs"
        title="Chip · Suggestion"
        subtitle="Os chips de sugestão ajudam a restringir a intenção do usuário ao apresentar sugestões geradas dinamicamente, como possíveis respostas ou filtros de pesquisa. Suportam dois comportamentos (Unchecked, Checked) e seis estados interativos."
        stats={[
          { value: 2, label: 'Comportamentos' },
          { value: 6, label: 'Estados' },
        ]}
      />

      {/* ── Comportamentos ── */}
      <Section icon="sell" title="Comportamentos" count="2 comportamentos">
        <CardGrid>
          {CHIP_BEHAVIORS.map((b) => (
            <DemoCard
              key={b.id}
              preview={<ChipSuggestion behavior={b.id} label="Sugestão" />}
              title={b.label}
              description={b.description}
              previewPad="lg"
            />
          ))}
        </CardGrid>
      </Section>

      {/* ── Estados — Matriz ── */}
      <Section icon="toggle_on" title="Estados" count="6 estados">
        <StateMatrix
          columns={CHIP_BEHAVIORS.map((b) => ({ id: b.id, label: b.label }))}
          rows={CHIP_STATES.map((s) => ({ id: s.id, label: s.label, force: s.force }))}
          cellPad="sm"
          renderCell={(row, col) => (
            <ChipSuggestion
              behavior={col.id as ChipBehavior}
              forceState={row.force}
              label="Sugestão"
            />
          )}
        />
      </Section>

      {/* ── Diretrizes ── */}
      <Section icon="checklist" title="Diretrizes de Uso">
        <CardGrid wide>
          {CHIP_GUIDELINES.map((g) => (
            <DemoCard key={g.title} title={g.title} description={g.body} />
          ))}
        </CardGrid>
      </Section>
    </div>
  )
}
