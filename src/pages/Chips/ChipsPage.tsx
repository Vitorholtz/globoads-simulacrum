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

import PageHeader from '../../components/PageHeader/PageHeader'
import SectionHeader from '../../components/SectionHeader/SectionHeader'
import styles from './ChipsPage.module.css'

const SUGGESTION_BEHAVIORS: ChipBehavior[] = ['unchecked', 'checked']
const FILTER_BEHAVIORS: ChipFilterBehavior[] = ['unchecked', 'checked']
const INPUT_STYLES: ChipInputStyle[] = ['default', 'person', 'icon']

const CHIP_STATES_FOR_MATRIX = CHIP_STATES

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
      <section className={styles.chipSection}>
        <SectionHeader icon="sell" title="Chip · Suggestion" />
        <p className={styles.chipDesc}>
          Os chips de sugestão ajudam a restringir a intenção do usuário ao apresentar sugestões geradas
          dinamicamente, como possíveis respostas ou filtros de pesquisa.
        </p>

        <h4 className={styles.subsectionTitle}>Comportamentos</h4>
        <div className={styles.behaviorsGrid2}>
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

        <h4 className={styles.subsectionTitle}>Estados</h4>
        <div className={styles.matrixContainer}>
          <div className={styles.matrixHeaderRow}>
            <div className={styles.matrixHeaderSpacer} />
            {SUGGESTION_BEHAVIORS.map((b) => (
              <div key={b} className={styles.matrixCellLabel}>
                {CHIP_BEHAVIORS.find((bh) => bh.id === b)?.label}
              </div>
            ))}
          </div>
          {CHIP_STATES_FOR_MATRIX.map((state) => (
            <div key={state.id} className={styles.matrixRow}>
              <div className={styles.matrixStateLabel}>
                <span className={styles.matrixStateName}>{state.label}</span>
              </div>
              <div className={styles.matrixCells}>
                {SUGGESTION_BEHAVIORS.map((b) => (
                  <div key={b} className={styles.matrixCell}>
                    <ChipSuggestion behavior={b} forceState={state.force} label="Sugestão" />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <h4 className={styles.subsectionTitle}>Diretrizes</h4>
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

      {/* ═══════════════════════════════════════
          CHIP · FILTER
          ═══════════════════════════════════════ */}
      <section className={styles.chipSection}>
        <SectionHeader icon="filter_alt" title="Chip · Filter" />
        <p className={styles.chipDesc}>
          Os chips de filtro são usados para filtrar um conteúdo ou definir escolhas. São uma boa alternativa
          aos botões para segmentação ou checkbox ao visualizar uma lista ou resultados de pesquisa.
        </p>

        <h4 className={styles.subsectionTitle}>Comportamentos</h4>
        <div className={styles.behaviorsGrid2}>
          {CHIP_FILTER_BEHAVIORS.map((b) => (
            <div key={b.id} className={styles.behaviorCard}>
              <div className={styles.behaviorPreview}>
                <ChipFilter behavior={b.id} label="Filtro" dropdown />
              </div>
              <div className={styles.behaviorBody}>
                <span className={styles.behaviorName}>{b.label}</span>
                <p className={styles.behaviorDesc}>{b.description}</p>
              </div>
            </div>
          ))}
        </div>

        <h4 className={styles.subsectionTitle}>Estados</h4>
        <div className={styles.matrixContainer}>
          <div className={styles.matrixHeaderRow}>
            <div className={styles.matrixHeaderSpacer} />
            {FILTER_BEHAVIORS.map((b) => (
              <div key={b} className={styles.matrixCellLabel}>
                {CHIP_FILTER_BEHAVIORS.find((bh) => bh.id === b)?.label}
              </div>
            ))}
          </div>
          {CHIP_STATES_FOR_MATRIX.map((state) => (
            <div key={state.id} className={styles.matrixRow}>
              <div className={styles.matrixStateLabel}>
                <span className={styles.matrixStateName}>{state.label}</span>
              </div>
              <div className={styles.matrixCells}>
                {FILTER_BEHAVIORS.map((b) => (
                  <div key={b} className={styles.matrixCell}>
                    <ChipFilter behavior={b} forceState={state.force} label="Filtro" dropdown />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <h4 className={styles.subsectionTitle}>Diretrizes</h4>
        <div className={styles.guidelinesGrid}>
          {CHIP_FILTER_GUIDELINES.map((g) => (
            <div key={g.title} className={styles.guidelineCard}>
              <h3 className={styles.guidelineTitle}>{g.title}</h3>
              <p className={styles.guidelineBody}>{g.body}</p>
              <div className={styles.guidelineRule}>{g.rule}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════
          CHIP · INPUT
          ═══════════════════════════════════════ */}
      <section className={styles.chipSection}>
        <SectionHeader icon="input" title="Chip · Input" />
        <p className={styles.chipDesc}>
          Os chips de entrada representam informações discretas inseridas por um usuário, como contatos
          ou opções de filtro em um campo de pesquisa.
        </p>

        <h4 className={styles.subsectionTitle}>Estilos</h4>
        <div className={styles.behaviorsGrid3}>
          {CHIP_INPUT_STYLES.map((s) => (
            <div key={s.id} className={styles.behaviorCard}>
              <div className={styles.behaviorPreview}>
                <ChipInput style={s.id} label="Entrada" icon="label" />
              </div>
              <div className={styles.behaviorBody}>
                <span className={styles.behaviorName}>{s.label}</span>
                <p className={styles.behaviorDesc}>{s.description}</p>
              </div>
            </div>
          ))}
        </div>

        <h4 className={styles.subsectionTitle}>Estados</h4>
        <div className={styles.matrixContainer}>
          <div className={styles.matrixHeaderRow}>
            <div className={styles.matrixHeaderSpacer} />
            {INPUT_STYLES.map((s) => (
              <div key={s} className={styles.matrixCellLabel}>
                {CHIP_INPUT_STYLES.find((st) => st.id === s)?.label}
              </div>
            ))}
          </div>
          {CHIP_STATES_FOR_MATRIX.map((state) => (
            <div key={state.id} className={styles.matrixRow}>
              <div className={styles.matrixStateLabel}>
                <span className={styles.matrixStateName}>{state.label}</span>
              </div>
              <div className={styles.matrixCells}>
                {INPUT_STYLES.map((s) => (
                  <div key={s} className={styles.matrixCell}>
                    <ChipInput style={s} forceState={state.force} label="Entrada" icon="label" />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <h4 className={styles.subsectionTitle}>Diretrizes</h4>
        <div className={styles.guidelinesGrid}>
          {CHIP_INPUT_GUIDELINES.map((g) => (
            <div key={g.title} className={styles.guidelineCard}>
              <h3 className={styles.guidelineTitle}>{g.title}</h3>
              <p className={styles.guidelineBody}>{g.body}</p>
              <div className={styles.guidelineRule}>{g.rule}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════
          CHIP · ASSIST
          ═══════════════════════════════════════ */}
      <section className={styles.chipSection}>
        <SectionHeader icon="auto_awesome" title="Chip · Assist" />
        <p className={styles.chipDesc}>
          Os chips de assistência representam ações inteligentes ou automatizadas. Eles servem como se o
          usuário pedisse a um assistente para concluir a ação, aparecendo de forma dinâmica e contextual
          em uma interface.
        </p>

        <h4 className={styles.subsectionTitle}>Estados</h4>
        <div className={styles.matrixContainer}>
          <div className={styles.matrixHeaderRow}>
            <div className={styles.matrixHeaderSpacer} />
            <div className={styles.matrixCellLabel}>Unchecked</div>
          </div>
          {CHIP_STATES_FOR_MATRIX.map((state) => (
            <div key={state.id} className={styles.matrixRow}>
              <div className={styles.matrixStateLabel}>
                <span className={styles.matrixStateName}>{state.label}</span>
              </div>
              <div className={styles.matrixCells}>
                <div className={styles.matrixCell}>
                  <ChipAssist icon="calendar_today" label="Criar evento" forceState={state.force} />
                </div>
              </div>
            </div>
          ))}
        </div>

        <h4 className={styles.subsectionTitle}>Diretrizes</h4>
        <div className={styles.guidelinesGrid}>
          {CHIP_ASSIST_GUIDELINES.map((g) => (
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
