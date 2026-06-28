import ChipSuggestion from '../../components/ChipSuggestion/ChipSuggestion'
import ChipFilter from '../../components/ChipFilter/ChipFilter'
import ChipInput from '../../components/ChipInput/ChipInput'
import ChipAssist from '../../components/ChipAssist/ChipAssist'

import { CHIP_BEHAVIORS, CHIP_STATES, CHIP_GUIDELINES } from '../../tokens/chipSuggestion'
import type { ChipBehavior } from '../../tokens/chipSuggestion'

import { CHIP_FILTER_BEHAVIORS, CHIP_FILTER_GUIDELINES } from '../../tokens/chipFilter'
import type { ChipFilterBehavior } from '../../tokens/chipFilter'

import { CHIP_INPUT_STYLES, CHIP_INPUT_GUIDELINES } from '../../tokens/chipInput'
import type { ChipInputStyle } from '../../tokens/chipInput'

import { CHIP_ASSIST_GUIDELINES } from '../../tokens/chipAssist'

import PageHeader from '../../components/docs/PageHeader/PageHeader'
import Section from '../../components/docs/Section/Section'
import StateMatrix from '../../components/docs/StateMatrix/StateMatrix'
import GuidelinesGrid from '../../components/docs/GuidelinesGrid/GuidelinesGrid'
import DemoCard from '../../components/docs/DemoCard/DemoCard'
import CardGrid from '../../components/docs/CardGrid/CardGrid'
import styles from './ChipsPage.module.css'

const SUGGESTION_BEHAVIORS: ChipBehavior[] = ['unchecked', 'checked']
const FILTER_BEHAVIORS: ChipFilterBehavior[] = ['unchecked', 'checked']
const INPUT_STYLES: ChipInputStyle[] = ['default', 'person', 'icon']

const SUGGESTION_COLS = SUGGESTION_BEHAVIORS.map((id) => ({
  id,
  label: CHIP_BEHAVIORS.find((b) => b.id === id)?.label ?? id,
}))
const FILTER_COLS = FILTER_BEHAVIORS.map((id) => ({
  id,
  label: CHIP_FILTER_BEHAVIORS.find((b) => b.id === id)?.label ?? id,
}))
const INPUT_COLS = INPUT_STYLES.map((id) => ({
  id,
  label: CHIP_INPUT_STYLES.find((s) => s.id === id)?.label ?? id,
}))
const ASSIST_COLS = [{ id: 'unchecked', label: 'Unchecked' }]

export default function ChipsPage() {
  return (
    <div>
      <PageHeader
        breadcrumb="Components / Inputs"
        title="Chips"
        subtitle="Chips são elementos compactos e interativos que representam uma entrada, atributo ou ação. Cada tipo — Suggestion, Filter, Input e Assist — tem semântica e comportamento específicos para diferentes contextos de uso."
        stats={[
          { value: 4, label: 'Tipos' },
          { value: 6, label: 'Estados' },
        ]}
      />

      {/* ═══════════════════════════════════════
          CHIP · SUGGESTION
          ═══════════════════════════════════════ */}
      <Section
        icon="sell"
        title="Chip · Suggestion"
        description="Os chips de sugestão ajudam a restringir a intenção do usuário ao apresentar sugestões geradas dinamicamente, como possíveis respostas ou filtros de pesquisa."
      >
        <h4 className={`type-caption-sm ${styles.subsectionTitle}`}>Comportamentos</h4>
        <CardGrid>
          {CHIP_BEHAVIORS.map((b) => (
            <DemoCard
              key={b.id}
              preview={<ChipSuggestion behavior={b.id} label="Sugestão" />}
              title={b.label}
              description={b.description}
            />
          ))}
        </CardGrid>

        <h4 className={`type-caption-sm ${styles.subsectionTitle}`}>Estados</h4>
        <StateMatrix
          columns={SUGGESTION_COLS}
          rows={CHIP_STATES}
          labelWidth={112}
          cellPad="sm"
          renderCell={(state, col) => (
            <ChipSuggestion behavior={col.id} forceState={state.force} label="Sugestão" />
          )}
        />

        <h4 className={`type-caption-sm ${styles.subsectionTitle}`}>Diretrizes</h4>
        <GuidelinesGrid items={CHIP_GUIDELINES} />
      </Section>

      {/* ═══════════════════════════════════════
          CHIP · FILTER
          ═══════════════════════════════════════ */}
      <Section
        icon="filter_alt"
        title="Chip · Filter"
        description="Os chips de filtro são usados para filtrar um conteúdo ou definir escolhas. São uma boa alternativa aos botões para segmentação ou checkbox ao visualizar uma lista ou resultados de pesquisa."
      >
        <h4 className={`type-caption-sm ${styles.subsectionTitle}`}>Comportamentos</h4>
        <CardGrid>
          {CHIP_FILTER_BEHAVIORS.map((b) => (
            <DemoCard
              key={b.id}
              preview={<ChipFilter behavior={b.id} label="Filtro" dropdown />}
              title={b.label}
              description={b.description}
            />
          ))}
        </CardGrid>

        <h4 className={`type-caption-sm ${styles.subsectionTitle}`}>Estados</h4>
        <StateMatrix
          columns={FILTER_COLS}
          rows={CHIP_STATES}
          labelWidth={112}
          cellPad="sm"
          renderCell={(state, col) => (
            <ChipFilter behavior={col.id} forceState={state.force} label="Filtro" dropdown />
          )}
        />

        <h4 className={`type-caption-sm ${styles.subsectionTitle}`}>Diretrizes</h4>
        <GuidelinesGrid items={CHIP_FILTER_GUIDELINES} />
      </Section>

      {/* ═══════════════════════════════════════
          CHIP · INPUT
          ═══════════════════════════════════════ */}
      <Section
        icon="input"
        title="Chip · Input"
        description="Os chips de entrada representam informações discretas inseridas por um usuário, como contatos ou opções de filtro em um campo de pesquisa."
      >
        <h4 className={`type-caption-sm ${styles.subsectionTitle}`}>Estilos</h4>
        <CardGrid>
          {CHIP_INPUT_STYLES.map((s) => (
            <DemoCard
              key={s.id}
              preview={<ChipInput style={s.id} label="Entrada" icon="label" />}
              title={s.label}
              description={s.description}
            />
          ))}
        </CardGrid>

        <h4 className={`type-caption-sm ${styles.subsectionTitle}`}>Estados</h4>
        <StateMatrix
          columns={INPUT_COLS}
          rows={CHIP_STATES}
          labelWidth={112}
          cellPad="sm"
          renderCell={(state, col) => (
            <ChipInput style={col.id} forceState={state.force} label="Entrada" icon="label" />
          )}
        />

        <h4 className={`type-caption-sm ${styles.subsectionTitle}`}>Diretrizes</h4>
        <GuidelinesGrid items={CHIP_INPUT_GUIDELINES} />
      </Section>

      {/* ═══════════════════════════════════════
          CHIP · ASSIST
          ═══════════════════════════════════════ */}
      <Section
        icon="auto_awesome"
        title="Chip · Assist"
        description="Os chips de assistência representam ações inteligentes ou automatizadas. Eles servem como se o usuário pedisse a um assistente para concluir a ação, aparecendo de forma dinâmica e contextual em uma interface."
      >
        <h4 className={`type-caption-sm ${styles.subsectionTitle}`}>Estados</h4>
        <StateMatrix
          columns={ASSIST_COLS}
          rows={CHIP_STATES}
          labelWidth={112}
          cellPad="sm"
          renderCell={(state) => (
            <ChipAssist icon="calendar_today" label="Criar evento" forceState={state.force} />
          )}
        />

        <h4 className={`type-caption-sm ${styles.subsectionTitle}`}>Diretrizes</h4>
        <GuidelinesGrid items={CHIP_ASSIST_GUIDELINES} />
      </Section>
    </div>
  )
}
