import { useState } from 'react'
import DatePicker from '../../components/DatePicker/DatePicker'
import DateRangePicker, { type DateRange } from '../../components/DateRangePicker/DateRangePicker'
import Calendar from '../../components/Calendar/Calendar'
import PageHeader from '../../components/PageHeader/PageHeader'
import SectionHeader from '../../components/SectionHeader/SectionHeader'
import {
  DATE_PICKER_SIZES,
  DATE_PICKER_STATES,
  DATE_PICKER_MATRIX_STATES,
  CALENDAR_SIZES,
  DATE_PICKER_GUIDELINES,
} from '../../tokens/datePicker'
import styles from './DatePickerPage.module.css'

const EXAMPLE_DATE = new Date(2025, 4, 26) // 26/05/2025

export default function DatePickerPage() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [calendarDateSm, setCalendarDateSm] = useState<Date | null>(null)
  const [calendarDateMd, setCalendarDateMd] = useState<Date | null>(null)
  const [selectedRange, setSelectedRange] = useState<DateRange | null>(null)

  function formatDisplay(d: Date | null): string {
    if (!d) return '—'
    return d.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' })
  }

  return (
    <div>
      <PageHeader
        breadcrumb="Inputs"
        title="Date Picker"
        subtitle="O Date Picker é um componente de entrada que permite ao usuário preencher uma data ou selecioná-la em um calendário. Disponível em três tamanhos e seis estados, com suporte a label, texto de ajuda e validação de erro."
        stats={[
          { value: 3, label: 'Tamanhos' },
          { value: 6, label: 'Estados' },
          { value: 2, label: 'Estilos' },
        ]}
      />

      {/* ── Estilos ── */}
      <section className={styles.section}>
        <SectionHeader icon="edit_calendar" title="Estilos de Conteúdo" count="2 estilos" />
        <div className={styles.stylesGrid}>
          <div className={styles.styleCard}>
            <div className={styles.stylePreview}>
              <DatePicker label="Data de início" size="md" />
            </div>
            <div className={styles.styleBody}>
              <span className={`type-body-sm ${styles.styleName}`}>Placeholder</span>
              <span className={`type-body-sm ${styles.styleDesc}`}>
                Campo vazio exibindo o placeholder DD/MM/AAAA. Indica o formato esperado sem
                preencher valor.
              </span>
            </div>
          </div>

          <div className={styles.styleCard}>
            <div className={styles.stylePreview}>
              <DatePicker label="Data de início" size="md" defaultValue={EXAMPLE_DATE} />
            </div>
            <div className={styles.styleBody}>
              <span className={`type-body-sm ${styles.styleName}`}>Filled</span>
              <span className={`type-body-sm ${styles.styleDesc}`}>
                Campo preenchido com data selecionada. Texto em Fill Primary para diferenciar de
                placeholder.
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Escala de tamanhos ── */}
      <section className={styles.section}>
        <SectionHeader
          icon="straighten"
          title="Escala de Tamanhos"
          count={`${DATE_PICKER_SIZES.length} tamanhos`}
        />
        <div className={styles.sizeScaleContainer}>
          {DATE_PICKER_SIZES.map((s) => (
            <div key={s.id} className={styles.sizeRow}>
              <div className={styles.sizePreview}>
                <DatePicker size={s.id} label="Data" defaultValue={EXAMPLE_DATE} />
              </div>
              <div className={styles.sizeMeta}>
                <div className={styles.sizeValueRow}>
                  <span className={`type-body-sm ${styles.sizeLabel}`}>{s.label}</span>
                  {s.recommended && (
                    <span className={`type-caption-sm ${styles.sizeRecommended}`}>Recomendado</span>
                  )}
                </div>
                <span className={`type-body-sm ${styles.sizeDescription}`}>{s.description}</span>
              </div>
              <div className={`type-caption-sm ${styles.sizeSpecs}`}>
                <span>
                  font {s.fontSize}px · icon {s.iconSize}px
                </span>
                <br />
                <span>
                  py {s.paddingY}px · px {s.paddingX}px
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Estados ── */}
      <section className={styles.section}>
        <SectionHeader
          icon="toggle_on"
          title="Estados"
          count={`${DATE_PICKER_STATES.length} estados`}
        />
        <div className={styles.stateMatrixContainer}>
          <div className={styles.matrixHeaderRow}>
            <div className={styles.matrixHeaderSpacer} />
            <div className={`type-caption-xs ${styles.matrixCellLabel}`}>Placeholder</div>
            <div className={`type-caption-xs ${styles.matrixCellLabel}`}>Filled</div>
          </div>

          {DATE_PICKER_MATRIX_STATES.map((state) => (
            <div key={state.id} className={styles.matrixRow}>
              <div className={styles.matrixStateLabel}>
                <span className={`type-caption-sm ${styles.matrixStateName}`}>{state.label}</span>
              </div>
              <div className={styles.matrixCells}>
                <div className={styles.matrixCell}>
                  <DatePicker
                    size="md"
                    label="Data"
                    forceState={state.force}
                    errorMessage={
                      state.id === 'error' ? 'Data inválida ou obrigatória.' : undefined
                    }
                    className={styles.matrixField}
                  />
                </div>
                <div className={styles.matrixCell}>
                  <DatePicker
                    size="md"
                    label="Data"
                    defaultValue={EXAMPLE_DATE}
                    forceState={state.force}
                    errorMessage={
                      state.id === 'error' ? 'Data inválida ou obrigatória.' : undefined
                    }
                    className={styles.matrixField}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Demo Interativo ── */}
      <section className={styles.section}>
        <SectionHeader icon="touch_app" title="Date Picker Interativo" />
        <div className={styles.interactiveContainer}>
          <div className={styles.interactiveDemo}>
            <div className={styles.demoFields}>
              <DatePicker
                label="Data de início"
                size="md"
                value={selectedDate}
                onChange={setSelectedDate}
              />
              <DatePicker
                label="Data de fim"
                optional
                size="md"
                helpText="Deixe em branco para campanha contínua."
              />
            </div>
          </div>
          <div className={styles.interactiveInfo}>
            <div className={styles.infoBox}>
              <span className={`type-caption-sm ${styles.infoLabel}`}>Data selecionada</span>
              <span className={`type-body-lg ${styles.infoValue}`}>
                {formatDisplay(selectedDate)}
              </span>
            </div>
            <p className={`type-body-sm ${styles.infoHint}`}>
              Clique no campo para abrir o calendário. Navege pelos meses com as setas e selecione
              um dia.
            </p>
          </div>
        </div>
      </section>

      {/* ── Date Range Picker Interativo ── */}
      <section className={styles.section}>
        <SectionHeader icon="date_range" title="Date Range Picker" />
        <div className={styles.interactiveContainer}>
          <div className={`${styles.interactiveDemo} ${styles.interactiveDemoCenter}`}>
            <div className={styles.demoFields}>
              <DateRangePicker label="Período da campanha" size="md" onChange={setSelectedRange} />
            </div>
          </div>
          <div className={styles.interactiveInfo}>
            <div className={styles.infoBox}>
              <span className={`type-caption-sm ${styles.infoLabel}`}>Início</span>
              <span className={`type-body-lg ${styles.infoValue}`}>
                {formatDisplay(selectedRange?.start ?? null)}
              </span>
            </div>
            <div className={styles.infoBox}>
              <span className={`type-caption-sm ${styles.infoLabel}`}>Fim</span>
              <span className={`type-body-lg ${styles.infoValue}`}>
                {formatDisplay(selectedRange?.end ?? null)}
              </span>
            </div>
            <p className={`type-body-sm ${styles.infoHint}`}>
              Clique no campo para abrir o calendário. Selecione a data de início e depois a data de
              fim para definir o período.
            </p>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════
          CALENDÁRIO
      ════════════════════════════════ */}
      <section className={styles.section}>
        <SectionHeader icon="calendar_month" title="Calendário" count="2 tamanhos" />

        <div className={styles.calendarSizeContainer}>
          {CALENDAR_SIZES.map((s) => (
            <div key={s.id} className={styles.calendarSizeRow}>
              <div className={styles.calendarSizePreview}>
                <Calendar size={s.id} />
              </div>
              <div className={styles.calendarSizeMeta}>
                <div className={styles.sizeValueRow}>
                  <span className={`type-body-sm ${styles.sizeLabel}`}>{s.label}</span>
                  {s.recommended && (
                    <span className={`type-caption-sm ${styles.sizeRecommended}`}>Recomendado</span>
                  )}
                </div>
                <span className={`type-body-sm ${styles.sizeDescription}`}>{s.description}</span>
                <div
                  className={`type-caption-sm ${styles.sizeSpecs}`}
                  style={{ marginLeft: 0, paddingRight: 0, marginTop: 8 }}
                >
                  <span>width {s.width}px · células 40px</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Calendário Interativo ── */}
      <section className={styles.section}>
        <SectionHeader icon="event" title="Calendário Interativo" />
        <div className={styles.calendarInteractiveGrid}>
          <div className={styles.calendarInteractiveCard}>
            <div className={`type-caption-sm ${styles.calendarInteractiveLabel}`}>
              <span>Small — 270px</span>
            </div>
            <div className={styles.calendarInteractivePreview}>
              <Calendar size="sm" value={calendarDateSm} onChange={setCalendarDateSm} />
            </div>
            <div className={styles.calendarInteractiveResult}>
              <span className={`type-caption-sm ${styles.infoLabel}`}>Selecionado</span>
              <span className={`type-body-lg ${styles.infoValue}`}>
                {formatDisplay(calendarDateSm)}
              </span>
            </div>
          </div>

          <div className={styles.calendarInteractiveCard}>
            <div className={`type-caption-sm ${styles.calendarInteractiveLabel}`}>
              <span>Medium — 400px</span>
            </div>
            <div className={styles.calendarInteractivePreview}>
              <Calendar size="md" value={calendarDateMd} onChange={setCalendarDateMd} />
            </div>
            <div className={styles.calendarInteractiveResult}>
              <span className={`type-caption-sm ${styles.infoLabel}`}>Selecionado</span>
              <span className={`type-body-lg ${styles.infoValue}`}>
                {formatDisplay(calendarDateMd)}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Diretrizes ── */}
      <section className={styles.section}>
        <SectionHeader icon="checklist" title="Diretrizes de Uso" />
        <div className={styles.guidelinesGrid}>
          {DATE_PICKER_GUIDELINES.map((g) => (
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
