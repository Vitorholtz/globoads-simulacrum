import { useState } from 'react'
import Checkbox from '../../components/Checkbox/Checkbox'
import {
  CHECKBOX_BEHAVIORS,
  CHECKBOX_TYPES,
  CHECKBOX_GUIDELINES,
  MATRIX_STATES,
} from '../../tokens/checkbox'
import type { CheckboxBehavior, CheckboxType } from '../../tokens/checkbox'
import PageHeader from '../../components/docs/PageHeader/PageHeader'
import Section from '../../components/docs/Section/Section'
import StateMatrix from '../../components/docs/StateMatrix/StateMatrix'
import DemoCard from '../../components/docs/DemoCard/DemoCard'
import CardGrid from '../../components/docs/CardGrid/CardGrid'
import InfoCard from '../../components/docs/InfoCard/InfoCard'
import styles from './CheckboxPage.module.css'

const ALL_BEHAVIORS: CheckboxBehavior[] = ['unchecked', 'partial', 'checked']
const ALL_TYPES: CheckboxType[] = ['default', 'inverter']

const BEHAVIOR_COLUMNS = ALL_BEHAVIORS.map((id) => ({
  id,
  label: CHECKBOX_BEHAVIORS.find((bh) => bh.id === id)?.label ?? id,
}))

function BehaviorDemo({ initial }: { initial: CheckboxBehavior }) {
  const [checked, setChecked] = useState(initial === 'checked')
  const [indeterminate, setIndeterminate] = useState(initial === 'partial')

  function handleChange(v: boolean) {
    setChecked(v)
    setIndeterminate(false)
  }

  return (
    <Checkbox
      checked={checked}
      indeterminate={indeterminate}
      onChange={handleChange}
      label="Checkbox"
    />
  )
}

export default function CheckboxPage() {
  const [typesState, setTypesState] = useState({
    default: [false, false, false] as [boolean, boolean, boolean],
    inverter: [false, false, false] as [boolean, boolean, boolean],
  })

  function setTypeOption(type: CheckboxType, idx: number, val: boolean) {
    setTypesState((prev) => ({
      ...prev,
      [type]: prev[type].map((v: boolean, i: number) => (i === idx ? val : v)) as [
        boolean,
        boolean,
        boolean,
      ],
    }))
  }

  const [helpState, setHelpState] = useState([false, true] as [boolean, boolean])
  const [noLabelState, setNoLabelState] = useState([false, false, true] as [
    boolean,
    boolean,
    boolean,
  ])

  return (
    <div>
      <PageHeader
        breadcrumb="Components / Inputs"
        title="Checkbox"
        subtitle="O checkbox é utilizado para selecionar um ou mais itens de uma lista ou ativar e desativar um único item. Suporta três comportamentos (Unchecked, Partial, Checked), cinco estados interativos e dois tipos de posicionamento."
        stats={[
          { value: 3, label: 'Comportamentos' },
          { value: 5, label: 'Estados' },
          { value: 2, label: 'Tipos' },
        ]}
      />

      {/* ── Comportamentos ── */}
      <Section icon="check_box" title="Comportamentos" count={3}>
        <CardGrid>
          {CHECKBOX_BEHAVIORS.map((b) => (
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
          const typeDef = CHECKBOX_TYPES.find((t) => t.id === type)
          return (
            <StateMatrix
              key={type}
              group
              header={{ name: typeDef?.label, description: typeDef?.description }}
              columns={BEHAVIOR_COLUMNS}
              rows={MATRIX_STATES}
              cellPad="sm"
              renderCell={(state, col) => (
                <Checkbox behavior={col.id} type={type} forceState={state.force} label="Checkbox" />
              )}
            />
          )
        })}
      </Section>

      {/* ── Tipos ── */}
      <Section icon="swap_horiz" title="Tipos" count={2}>
        <CardGrid>
          {CHECKBOX_TYPES.map((t) => (
            <DemoCard
              key={t.id}
              preview={
                <div className={styles.typeList}>
                  {(['Opção 1', 'Opção 2', 'Opção 3'] as const).map((lbl, idx) => (
                    <Checkbox
                      key={lbl}
                      checked={typesState[t.id][idx]}
                      onChange={(v) => setTypeOption(t.id, idx, v)}
                      type={t.id}
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
        <InfoCard
          preview={
            <div className={styles.helpTextPreviewContent}>
              <Checkbox
                checked={helpState[0]}
                onChange={(v) => setHelpState([v, helpState[1]])}
                label="Aceito os termos e condições"
                helpText="Leia o documento completo antes de aceitar."
                showHelpText
              />
              <Checkbox
                checked={helpState[1]}
                onChange={(v) => setHelpState([helpState[0], v])}
                label="Receber notificações por e-mail"
                helpText="Você pode cancelar a inscrição a qualquer momento."
                showHelpText
              />
              <Checkbox
                checked={false}
                forceState="disabled"
                label="Indisponível no momento"
                helpText="Esta opção não está disponível neste plano."
                showHelpText
              />
            </div>
          }
        >
          <p className={`type-body-sm ${styles.helpTextDesc}`}>
            O Help Text aparece abaixo do rótulo e fornece contexto adicional sobre a opção. Use-o
            para explicar consequências, requisitos ou restrições da seleção. Mantenha-o conciso --
            no máximo duas linhas.
          </p>
        </InfoCard>
      </Section>

      {/* ── Sem Rótulo ── */}
      <Section icon="check_box_outline_blank" title="Sem Rótulo">
        <InfoCard
          preview={
            <div className={styles.noLabelRow}>
              <Checkbox
                checked={noLabelState[0]}
                onChange={(v) => setNoLabelState([v, noLabelState[1], noLabelState[2]])}
                aria-label="Selecionar primeiro item"
              />
              <Checkbox checked={noLabelState[1]} indeterminate aria-label="Seleção parcial" />
              <Checkbox
                checked={noLabelState[2]}
                onChange={(v) => setNoLabelState([noLabelState[0], noLabelState[1], v])}
                aria-label="Selecionar terceiro item"
              />
            </div>
          }
        >
          <p className={`type-body-sm ${styles.helpTextDesc}`}>
            Omita o <code>label</code> quando o contexto visual já identifica o controle — por
            exemplo, colunas de seleção em tabelas. Sempre forneça <code>aria-label</code> para
            garantir acessibilidade a leitores de tela.
          </p>
        </InfoCard>
      </Section>

      {/* ── Diretrizes ── */}
      <Section icon="checklist" title="Diretrizes de Uso">
        <CardGrid wide>
          {CHECKBOX_GUIDELINES.map((g) => (
            <DemoCard key={g.title} title={g.title} description={g.body} />
          ))}
        </CardGrid>
      </Section>
    </div>
  )
}
