import { useState } from 'react'
import Radio from '../../components/Radio/Radio'
import { RADIO_BEHAVIORS, RADIO_TYPES, RADIO_GUIDELINES, MATRIX_STATES } from '../../tokens/radio'
import type { RadioBehavior, RadioType } from '../../tokens/radio'
import PageHeader from '../../components/PageHeader/PageHeader'
import GuidelinesGrid from '../../components/GuidelinesGrid/GuidelinesGrid'
import Section from '../../components/Section/Section'
import StateMatrix from '../../components/StateMatrix/StateMatrix'
import DemoCard from '../../components/DemoCard/DemoCard'
import CardGrid from '../../components/CardGrid/CardGrid'
import styles from './RadioPage.module.css'

const ALL_BEHAVIORS: RadioBehavior[] = ['unchecked', 'checked']
const ALL_TYPES: RadioType[] = ['default', 'inverter']

const BEHAVIOR_COLUMNS = ALL_BEHAVIORS.map((id) => ({
  id,
  label: RADIO_BEHAVIORS.find((bh) => bh.id === id)?.label ?? id,
}))

const GROUP_OPTIONS = ['Opção 1', 'Opção 2', 'Opção 3'] as const

function BehaviorDemo({ initial }: { initial: RadioBehavior }) {
  const [checked, setChecked] = useState(initial === 'checked')
  return <Radio checked={checked} onChange={setChecked} label="Radio" />
}

export default function RadioPage() {
  const [typesValue, setTypesValue] = useState<Record<RadioType, string>>({
    default: '',
    inverter: '',
  })

  const [helpValue, setHelpValue] = useState('mensal')

  return (
    <div>
      <PageHeader
        breadcrumb="Components / Inputs"
        title="Radio Button"
        subtitle="O radio button permite a escolha de um item dentre várias opções mutuamente exclusivas. Suporta dois comportamentos (Unchecked, Checked), cinco estados interativos e dois tipos de posicionamento."
        stats={[
          { value: 2, label: 'Comportamentos' },
          { value: 5, label: 'Estados' },
          { value: 2, label: 'Tipos' },
        ]}
      />

      {/* ── Comportamentos ── */}
      <Section icon="radio_button_checked" title="Comportamentos" count={2}>
        <CardGrid cols={2}>
          {RADIO_BEHAVIORS.map((b) => (
            <DemoCard
              key={b.id}
              preview={<BehaviorDemo initial={b.id} />}
              title={b.label}
              description={b.description}
              previewPad="lg"
            />
          ))}
        </CardGrid>
      </Section>

      {/* ── Estados — Matriz ── */}
      <Section icon="toggle_on" title="Estados" count={5}>
        {ALL_TYPES.map((type) => {
          const typeDef = RADIO_TYPES.find((t) => t.id === type)
          return (
            <StateMatrix
              key={type}
              group
              header={{ name: typeDef?.label, description: typeDef?.description }}
              columns={BEHAVIOR_COLUMNS}
              rows={MATRIX_STATES}
              labelWidth={96}
              cellPad="sm"
              renderCell={(state, col) => (
                <Radio behavior={col.id} type={type} forceState={state.force} label="Radio" />
              )}
            />
          )
        })}
      </Section>

      {/* ── Tipos ── */}
      <Section icon="swap_horiz" title="Tipos" count={2}>
        <CardGrid cols={2}>
          {RADIO_TYPES.map((t) => (
            <DemoCard
              key={t.id}
              preview={
                <div className={styles.typeList}>
                  {GROUP_OPTIONS.map((lbl) => (
                    <Radio
                      key={lbl}
                      checked={typesValue[t.id] === lbl}
                      onChange={() => setTypesValue((prev) => ({ ...prev, [t.id]: lbl }))}
                      type={t.id}
                      name={`type-demo-${t.id}`}
                      value={lbl}
                      label={lbl}
                    />
                  ))}
                </div>
              }
              title={t.label}
              description={t.description}
              previewPad="lg"
            />
          ))}
        </CardGrid>
      </Section>

      {/* ── Help Text ── */}
      <Section icon="info" title="Help Text">
        <div className={styles.helpTextContainer}>
          <div className={styles.helpTextPreview}>
            <Radio
              checked={helpValue === 'mensal'}
              onChange={() => setHelpValue('mensal')}
              name="help-demo"
              value="mensal"
              label="Plano Mensal"
              helpText="Cobrado todo mês. Cancele a qualquer momento."
              showHelpText
            />
            <Radio
              checked={helpValue === 'anual'}
              onChange={() => setHelpValue('anual')}
              name="help-demo"
              value="anual"
              label="Plano Anual"
              helpText="Economize 20% em relação ao plano mensal."
              showHelpText
            />
            <Radio
              checked={false}
              forceState="disabled"
              name="help-demo"
              value="enterprise"
              label="Plano Enterprise"
              helpText="Entre em contato com o time comercial."
              showHelpText
            />
          </div>
          <div className={styles.helpTextBody}>
            <p className={`type-body-sm ${styles.helpTextDesc}`}>
              O Help Text aparece abaixo do rótulo e fornece contexto adicional sobre cada opção.
              Use-o para explicar consequências, custos ou restrições da seleção. Mantenha-o conciso
              — no máximo duas linhas.
            </p>
          </div>
        </div>
      </Section>

      {/* ── Diretrizes ── */}
      <Section icon="checklist" title="Diretrizes de Uso">
        <GuidelinesGrid items={RADIO_GUIDELINES} />
      </Section>
    </div>
  )
}
