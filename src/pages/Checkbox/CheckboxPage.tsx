import { useState } from 'react'
import Checkbox from '../../components/Checkbox/Checkbox'
import {
  CHECKBOX_BEHAVIORS,
  CHECKBOX_TYPES,
  CHECKBOX_GUIDELINES,
  MATRIX_STATES,
} from '../../tokens/checkbox'
import type { CheckboxBehavior, CheckboxType } from '../../tokens/checkbox'
import PageHeader from '../../components/PageHeader/PageHeader'
import SectionHeader from '../../components/SectionHeader/SectionHeader'
import styles from './CheckboxPage.module.css'

const ALL_BEHAVIORS: CheckboxBehavior[] = ['unchecked', 'partial', 'checked']
const ALL_TYPES: CheckboxType[] = ['default', 'inverter']

// Interactive behavior demo — starts in the given behavior state, fully clickable
function BehaviorDemo({ initial }: { initial: CheckboxBehavior }) {
  const [checked, setChecked] = useState(initial === 'checked')
  const [indeterminate, setIndeterminate] = useState(initial === 'partial')

  function handleChange(v: boolean) {
    setChecked(v)
    setIndeterminate(false) // clicking always resolves indeterminate
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
  // Types section: 3 independent options per type
  const [typesState, setTypesState] = useState({
    default:  [false, false, false] as [boolean, boolean, boolean],
    inverter: [false, false, false] as [boolean, boolean, boolean],
  })

  function setTypeOption(type: CheckboxType, idx: number, val: boolean) {
    setTypesState(prev => ({
      ...prev,
      [type]: prev[type].map((v: boolean, i: number) => i === idx ? val : v) as [boolean, boolean, boolean],
    }))
  }

  // Help text section
  const [helpState, setHelpState] = useState([false, true] as [boolean, boolean])

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
      <section className={styles.section}>
        <SectionHeader icon="check_box" title="Comportamentos" count="3 comportamentos" />
        <div className={styles.behaviorsGrid}>
          {CHECKBOX_BEHAVIORS.map((b) => (
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
      </section>

      {/* ── Estados — Matriz ── */}
      <section className={styles.section}>
        <SectionHeader icon="toggle_on" title="Estados" count="5 estados" />
        {ALL_TYPES.map((type) => (
          <div key={type} className={styles.matrixContainer}>
            <div className={styles.matrixTypeHeader}>
              <span className={`type-body-sm ${styles.matrixTypeName}`}>
                {CHECKBOX_TYPES.find((t) => t.id === type)?.label}
              </span>
              <span className={`type-body-sm ${styles.matrixTypeDesc}`}>
                — {CHECKBOX_TYPES.find((t) => t.id === type)?.description}
              </span>
            </div>

            <div className={styles.matrixHeaderRow}>
              <div className={styles.matrixHeaderSpacer} />
              {ALL_BEHAVIORS.map((b) => (
                <div key={b} className={`type-caption-xs ${styles.matrixCellLabel}`}>
                  {CHECKBOX_BEHAVIORS.find((bh) => bh.id === b)?.label}
                </div>
              ))}
            </div>

            {MATRIX_STATES.map((state) => (
              <div key={state.id} className={styles.matrixRow}>
                <div className={styles.matrixStateLabel}>
                  <span className={`type-caption-sm ${styles.matrixStateName}`}>{state.label}</span>
                </div>
                <div className={styles.matrixCells}>
                  {ALL_BEHAVIORS.map((b) => (
                    <div key={b} className={styles.matrixCell}>
                      <Checkbox
                        behavior={b}
                        type={type}
                        forceState={state.force}
                        label="Checkbox"
                      />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ))}
      </section>

      {/* ── Tipos ── */}
      <section className={styles.section}>
        <SectionHeader icon="swap_horiz" title="Tipos" count="2 tipos" />
        <div className={styles.typesGrid}>
          {CHECKBOX_TYPES.map((t) => (
            <div key={t.id} className={styles.typeCard}>
              <div className={styles.typePreview}>
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
              <div className={styles.typeBody}>
                <span className={`type-body-sm ${styles.typeName}`}>{t.label}</span>
                <p className={`type-body-sm ${styles.typeDesc}`}>{t.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Help Text ── */}
      <section className={styles.section}>
        <SectionHeader icon="info" title="Help Text" />
        <div className={styles.helpTextContainer}>
          <div className={styles.helpTextPreview}>
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
          <div className={styles.helpTextBody}>
            <p className={`type-body-sm ${styles.helpTextDesc}`}>
              O Help Text aparece abaixo do rótulo e fornece contexto adicional sobre a opção. Use-o para explicar consequências, requisitos ou restrições da seleção. Mantenha-o conciso — no máximo duas linhas.
            </p>
          </div>
        </div>
      </section>

      {/* ── Diretrizes ── */}
      <section className={styles.section}>
        <SectionHeader icon="checklist" title="Diretrizes de Uso" />
        <div className={styles.guidelinesGrid}>
          {CHECKBOX_GUIDELINES.map((g) => (
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
