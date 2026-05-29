import { useState } from 'react'
import Radio from '../../components/Radio/Radio'
import {
  RADIO_BEHAVIORS,
  RADIO_TYPES,
  RADIO_GUIDELINES,
  MATRIX_STATES,
} from '../../tokens/radio'
import type { RadioBehavior, RadioType } from '../../tokens/radio'
import PageHeader from '../../components/PageHeader/PageHeader'
import SectionHeader from '../../components/SectionHeader/SectionHeader'
import styles from './RadioPage.module.css'

const ALL_BEHAVIORS: RadioBehavior[] = ['unchecked', 'checked']
const ALL_TYPES: RadioType[] = ['default', 'inverter']

const GROUP_OPTIONS = ['Opção 1', 'Opção 2', 'Opção 3'] as const

function BehaviorDemo({ initial }: { initial: RadioBehavior }) {
  const [checked, setChecked] = useState(initial === 'checked')
  return (
    <Radio
      checked={checked}
      onChange={setChecked}
      label="Radio"
    />
  )
}

export default function RadioPage() {
  // Types section: one selected value per type group
  const [typesValue, setTypesValue] = useState<Record<RadioType, string>>({
    default: '',
    inverter: '',
  })

  // Help text section
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
      <section className={styles.section}>
        <SectionHeader icon="radio_button_checked" title="Comportamentos" count="2 comportamentos" />
        <div className={styles.behaviorsGrid}>
          {RADIO_BEHAVIORS.map((b) => (
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
                {RADIO_TYPES.find((t) => t.id === type)?.label}
              </span>
              <span className={`type-body-sm ${styles.matrixTypeDesc}`}>
                — {RADIO_TYPES.find((t) => t.id === type)?.description}
              </span>
            </div>

            <div className={styles.matrixHeaderRow}>
              <div className={styles.matrixHeaderSpacer} />
              {ALL_BEHAVIORS.map((b) => (
                <div key={b} className={`type-caption-xs ${styles.matrixCellLabel}`}>
                  {RADIO_BEHAVIORS.find((bh) => bh.id === b)?.label}
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
                      <Radio
                        behavior={b}
                        type={type}
                        forceState={state.force}
                        label="Radio"
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
          {RADIO_TYPES.map((t) => (
            <div key={t.id} className={styles.typeCard}>
              <div className={styles.typePreview}>
                {GROUP_OPTIONS.map((lbl) => (
                  <Radio
                    key={lbl}
                    checked={typesValue[t.id] === lbl}
                    onChange={() => setTypesValue(prev => ({ ...prev, [t.id]: lbl }))}
                    type={t.id}
                    name={`type-demo-${t.id}`}
                    value={lbl}
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
              O Help Text aparece abaixo do rótulo e fornece contexto adicional sobre cada opção. Use-o para explicar consequências, custos ou restrições da seleção. Mantenha-o conciso — no máximo duas linhas.
            </p>
          </div>
        </div>
      </section>

      {/* ── Diretrizes ── */}
      <section className={styles.section}>
        <SectionHeader icon="checklist" title="Diretrizes de Uso" />
        <div className={styles.guidelinesGrid}>
          {RADIO_GUIDELINES.map((g) => (
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
