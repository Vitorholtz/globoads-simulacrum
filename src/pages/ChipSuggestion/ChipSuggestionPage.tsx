import ChipSuggestion from '../../components/ChipSuggestion/ChipSuggestion'
import {
  CHIP_BEHAVIORS,
  CHIP_STATES,
  CHIP_GUIDELINES,
} from '../../tokens/chipSuggestion'
import type { ChipBehavior } from '../../tokens/chipSuggestion'
import PageHeader from '../../components/PageHeader/PageHeader'
import SectionHeader from '../../components/SectionHeader/SectionHeader'
import styles from './ChipSuggestionPage.module.css'

const ALL_BEHAVIORS: ChipBehavior[] = ['unchecked', 'checked']

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
      <section className={styles.section}>
        <SectionHeader icon="sell" title="Comportamentos" count="2 comportamentos" />
        <div className={styles.behaviorsGrid}>
          {CHIP_BEHAVIORS.map((b) => (
            <div key={b.id} className={styles.behaviorCard}>
              <div className={styles.behaviorPreview}>
                <ChipSuggestion behavior={b.id} label="Sugestão" />
              </div>
              <div className={styles.behaviorBody}>
                <span className={styles.behaviorName}>{b.label}</span>
                <p className={styles.behaviorDesc}>{b.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Estados — Matriz ── */}
      <section className={styles.section}>
        <SectionHeader icon="toggle_on" title="Estados" count="6 estados" />
        <div className={styles.matrixContainer}>
          <div className={styles.matrixHeaderRow}>
            <div className={styles.matrixHeaderSpacer} />
            {ALL_BEHAVIORS.map((b) => (
              <div key={b} className={styles.matrixCellLabel}>
                {CHIP_BEHAVIORS.find((bh) => bh.id === b)?.label}
              </div>
            ))}
          </div>

          {CHIP_STATES.map((state) => (
            <div key={state.id} className={styles.matrixRow}>
              <div className={styles.matrixStateLabel}>
                <span className={styles.matrixStateName}>{state.label}</span>
              </div>
              <div className={styles.matrixCells}>
                {ALL_BEHAVIORS.map((b) => (
                  <div key={b} className={styles.matrixCell}>
                    <ChipSuggestion
                      behavior={b}
                      forceState={state.force}
                      label="Sugestão"
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Diretrizes ── */}
      <section className={styles.section}>
        <SectionHeader icon="checklist" title="Diretrizes de Uso" />
        <div className={styles.guidelinesGrid}>
          {CHIP_GUIDELINES.map((g) => (
            <div key={g.title} className={styles.guidelineCard}>
              <h3 className={styles.guidelineTitle}>{g.title}</h3>
              <p className={styles.guidelineBody}>{g.body}</p>
              <div className={styles.guidelineRule}>{g.rule}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
