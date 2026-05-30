import { useState } from 'react'
import Switch from '../../components/Switch/Switch'
import {
  SWITCH_BEHAVIORS,
  SWITCH_TYPES,
  SWITCH_GUIDELINES,
  MATRIX_STATES,
} from '../../tokens/switch'
import type { SwitchBehavior, SwitchType } from '../../tokens/switch'
import PageHeader from '../../components/PageHeader/PageHeader'
import GuidelinesGrid from '../../components/GuidelinesGrid/GuidelinesGrid'
import Section from '../../components/Section/Section'
import StateMatrix from '../../components/StateMatrix/StateMatrix'
import styles from './SwitchPage.module.css'

const ALL_BEHAVIORS: SwitchBehavior[] = ['unchecked', 'checked']
const ALL_TYPES: SwitchType[] = ['default', 'inverter']

const BEHAVIOR_COLUMNS = ALL_BEHAVIORS.map((id) => ({
  id,
  label: SWITCH_BEHAVIORS.find((bh) => bh.id === id)?.label ?? id,
}))

function BehaviorDemo({ initial }: { initial: SwitchBehavior }) {
  const [checked, setChecked] = useState(initial === 'checked')
  return <Switch checked={checked} onChange={setChecked} label="Switch" />
}

export default function SwitchPage() {
  const [typesState, setTypesState] = useState({
    default: [false, true, false] as [boolean, boolean, boolean],
    inverter: [false, true, false] as [boolean, boolean, boolean],
  })

  function setTypeOption(type: SwitchType, idx: number, val: boolean) {
    setTypesState((prev) => ({
      ...prev,
      [type]: prev[type].map((v: boolean, i: number) => (i === idx ? val : v)) as [
        boolean,
        boolean,
        boolean,
      ],
    }))
  }

  const [helpState, setHelpState] = useState([true, false] as [boolean, boolean])

  return (
    <div>
      <PageHeader
        breadcrumb="Components / Inputs"
        title="Switch"
        subtitle="O switch alterna um item entre ligado e desligado. É usado para configurações binárias de efeito imediato — sem necessidade de confirmação. Suporta dois comportamentos (Desligado e Ligado), cinco estados interativos e dois tipos de posicionamento."
        stats={[
          { value: 2, label: 'Comportamentos' },
          { value: 5, label: 'Estados' },
          { value: 2, label: 'Tipos' },
        ]}
      />

      {/* ── Comportamentos ── */}
      <Section icon="toggle_on" title="Comportamentos" count="2 comportamentos">
        <div className={styles.behaviorsGrid}>
          {SWITCH_BEHAVIORS.map((b) => (
            <div key={b.id} className={styles.behaviorCard}>
              <div className={styles.behaviorPreview}>
                <BehaviorDemo initial={b.id} />
              </div>
              <div className={styles.behaviorBody}>
                <span className={`type-body-sm ${styles.behaviorName}`}>{b.label}</span>
                <p className={`type-body-sm ${styles.behaviorDesc}`}>{b.description}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* ── Estados — Matriz ── */}
      <Section icon="radio_button_checked" title="Estados" count="5 estados">
        {ALL_TYPES.map((type) => {
          const typeDef = SWITCH_TYPES.find((t) => t.id === type)
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
                <Switch behavior={col.id} type={type} forceState={state.force} label="Switch" />
              )}
            />
          )
        })}
      </Section>

      {/* ── Tipos ── */}
      <Section icon="swap_horiz" title="Tipos" count="2 tipos">
        <div className={styles.typesGrid}>
          {SWITCH_TYPES.map((t) => (
            <div key={t.id} className={styles.typeCard}>
              <div className={styles.typePreview}>
                {(['Notificações', 'Modo escuro', 'Salvar automaticamente'] as const).map(
                  (lbl, idx) => (
                    <Switch
                      key={lbl}
                      checked={typesState[t.id][idx]}
                      onChange={(v) => setTypeOption(t.id, idx, v)}
                      type={t.id}
                      label={lbl}
                    />
                  )
                )}
              </div>
              <div className={styles.typeBody}>
                <span className={`type-body-sm ${styles.typeName}`}>{t.label}</span>
                <p className={`type-body-sm ${styles.typeDesc}`}>{t.description}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* ── Help Text ── */}
      <Section icon="info" title="Help Text">
        <div className={styles.helpTextContainer}>
          <div className={styles.helpTextPreview}>
            <Switch
              checked={helpState[0]}
              onChange={(v) => setHelpState([v, helpState[1]])}
              label="Notificações por e-mail"
              helpText="Você receberá um resumo semanal das campanhas."
              showHelpText
            />
            <Switch
              checked={helpState[1]}
              onChange={(v) => setHelpState([helpState[0], v])}
              label="Relatórios automáticos"
              helpText="Disponível apenas nos planos Pro e Enterprise."
              showHelpText
            />
            <Switch
              checked={false}
              forceState="disabled"
              label="Integrações externas"
              helpText="Entre em contato com o suporte para habilitar."
              showHelpText
            />
          </div>
          <div className={styles.helpTextBody}>
            <p className={`type-body-sm ${styles.helpTextDesc}`}>
              O Help Text aparece abaixo do rótulo e fornece contexto adicional sobre a
              configuração. Use-o para explicar pré-requisitos, consequências da ativação ou
              restrições de plano. Mantenha-o conciso — no máximo duas linhas.
            </p>
          </div>
        </div>
      </Section>

      {/* ── Diretrizes ── */}
      <Section icon="checklist" title="Diretrizes de Uso">
        <GuidelinesGrid items={SWITCH_GUIDELINES} />
      </Section>
    </div>
  )
}
