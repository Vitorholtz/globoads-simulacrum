import { useState } from 'react'
import TimePicker from '../../components/TimePicker/TimePicker'
import TimePanel from '../../components/TimePicker/TimePanel'
import PageHeader from '../../components/docs/PageHeader/PageHeader'
import {
  TIME_PICKER_SIZES,
  TIME_PICKER_STATES,
  TIME_PICKER_MATRIX_STATES,
  TIME_PICKER_MATRIX_COLS,
  TIME_PICKER_GUIDELINES,
  type TimeValue,
} from '../../tokens/timePicker'
import GuidelinesGrid from '../../components/docs/GuidelinesGrid/GuidelinesGrid'
import Section from '../../components/docs/Section/Section'
import StateMatrix from '../../components/docs/StateMatrix/StateMatrix'
import DemoCard from '../../components/docs/DemoCard/DemoCard'
import CardGrid from '../../components/docs/CardGrid/CardGrid'
import styles from './TimePickerPage.module.css'

const EXAMPLE_TIME: TimeValue = { hours: 14, minutes: 30 }

function pad2(n: number): string {
  return String(n).padStart(2, '0')
}

function formatDisplay(t: TimeValue | null): string {
  if (!t) return '—'
  return `${pad2(t.hours)}:${pad2(t.minutes)}`
}

export default function TimePickerPage() {
  const [selectedTime, setSelectedTime] = useState<TimeValue | null>(null)
  const [panelTime, setPanelTime] = useState<TimeValue>(EXAMPLE_TIME)

  return (
    <div>
      <PageHeader
        breadcrumb="Inputs"
        title="Time Picker"
        subtitle="O Time Picker é um componente de entrada que permite ao usuário preencher um horário ou ajustá-lo em um painel de horas e minutos. Disponível em três tamanhos e seis estados, com suporte a label, texto de ajuda e validação de erro."
        stats={[
          { value: 3, label: 'Tamanhos' },
          { value: 6, label: 'Estados' },
          { value: 2, label: 'Estilos' },
          { value: 6, label: 'Configurações' },
        ]}
      />

      {/* ── Estilos de Conteúdo ── */}
      <Section
        icon="schedule"
        title="Estilos de Conteúdo"
        count={2}
        description="O campo exibe dois estados visuais distintos conforme a interação do usuário."
      >
        <CardGrid cols={2}>
          <DemoCard
            preview={
              <div className={styles.contentPreview}>
                <TimePicker label="Horário de início" size="md" />
              </div>
            }
            title="Placeholder"
            description="Campo vazio exibindo o placeholder HH:MM. Indica o formato esperado sem preencher valor."
            previewPad="lg"
          />
          <DemoCard
            preview={
              <div className={styles.contentPreview}>
                <TimePicker label="Horário de início" size="md" defaultValue={EXAMPLE_TIME} />
              </div>
            }
            title="Filled"
            description="Campo preenchido com horário selecionado. Texto em Fill Primary para diferenciar de placeholder."
            previewPad="lg"
          />
        </CardGrid>
      </Section>

      {/* ── Escala de tamanhos ── */}
      <Section icon="straighten" title="Escala de Tamanhos" count={TIME_PICKER_SIZES.length}>
        <div className={styles.sizeScaleContainer}>
          {TIME_PICKER_SIZES.map((s) => (
            <div key={s.id} className={styles.sizeRow}>
              <div className={styles.sizePreview}>
                <TimePicker size={s.id} label="Horário" defaultValue={EXAMPLE_TIME} />
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
      </Section>

      {/* ── Estados ── */}
      <Section icon="toggle_on" title="Estados" count={TIME_PICKER_STATES.length}>
        <StateMatrix
          columns={TIME_PICKER_MATRIX_COLS}
          rows={TIME_PICKER_MATRIX_STATES}
          renderCell={(state, col) => (
            <TimePicker
              size="md"
              label="Horário"
              defaultValue={col.filled ? EXAMPLE_TIME : undefined}
              forceState={state.force}
              errorMessage={state.id === 'error' ? 'Horário inválido ou obrigatório.' : undefined}
              className={styles.matrixField}
            />
          )}
        />
      </Section>

      {/* ── Configurações ── */}
      <Section
        icon="tune"
        title="Configurações"
        count={6}
        description="Combinações de props que cobrem os cenários mais comuns de formulários com horário."
      >
        <CardGrid cols={3}>
          <DemoCard
            preview={
              <div className={styles.contentPreview}>
                <TimePicker label="Horário de início" size="md" />
              </div>
            }
            title="Padrão"
            description="Label + campo. Configuração base para a maioria dos formulários."
            previewPad="lg"
          />
          <DemoCard
            preview={
              <div className={styles.contentPreview}>
                <TimePicker label="Horário de início" optional size="md" />
              </div>
            }
            title="Opcional"
            description='Sinaliza que o preenchimento não é obrigatório. Exibe a marcação "Opcional" ao lado do label.'
            previewPad="lg"
          />
          <DemoCard
            preview={
              <div className={styles.contentPreview}>
                <TimePicker label="Horário de início" showLabel={false} size="md" />
              </div>
            }
            title="Sem label"
            description="Label oculto visualmente mas presente no DOM para leitores de tela. Use quando o contexto dispensa rótulo visual."
            previewPad="lg"
          />
          <DemoCard
            preview={
              <div className={styles.contentPreview}>
                <TimePicker
                  label="Horário de início"
                  descriptionText="Use o formato HH:MM (24 horas) ou ajuste pelo painel."
                  size="md"
                />
              </div>
            }
            title="Com descrição"
            description="Ícone de informação com tooltip. Ideal para explicar o formato esperado ou restrições de horário."
            previewPad="lg"
          />
          <DemoCard
            preview={
              <div className={styles.contentPreview}>
                <TimePicker
                  label="Horário de início"
                  helpText="Selecione o horário de início da campanha."
                  size="md"
                />
              </div>
            }
            title="Com texto de ajuda"
            description="Texto de apoio abaixo do campo. Dica contextual que não compete com a mensagem de erro."
            previewPad="lg"
          />
          <DemoCard
            preview={
              <div className={styles.contentPreview}>
                <TimePicker
                  label="Horário de início"
                  errorMessage="Horário inválido ou obrigatório."
                  forceState="error"
                  size="md"
                />
              </div>
            }
            title="Com erro"
            description="Estado de erro explícito via prop. Borda vermelha, ícone de alerta e mensagem abaixo do campo."
            previewPad="lg"
          />
        </CardGrid>
      </Section>

      {/* ── Demo Interativo ── */}
      <Section icon="touch_app" title="Time Picker Interativo">
        <div className={styles.interactiveContainer}>
          <div className={styles.interactiveDemo}>
            <div className={styles.demoFields}>
              <TimePicker
                label="Horário de início"
                size="md"
                value={selectedTime}
                onChange={setSelectedTime}
              />
              <TimePicker
                label="Horário de fim"
                optional
                size="md"
                helpText="Deixe em branco para sem horário de término definido."
              />
            </div>
          </div>
          <div className={styles.interactiveInfo}>
            <div className={styles.infoBox}>
              <span className={`type-caption-sm ${styles.infoLabel}`}>Horário selecionado</span>
              <span className={`type-body-lg ${styles.infoValue}`}>
                {formatDisplay(selectedTime)}
              </span>
            </div>
            <p className={`type-body-sm ${styles.infoHint}`}>
              Clique no campo para abrir o painel. Use as setas para ajustar as horas (1 em 1) e os
              minutos (10 em 10) e depois confirme.
            </p>
          </div>
        </div>
      </Section>

      {/* ── Painel de Horário ── */}
      <Section
        icon="timer"
        title="Painel de Horário"
        description="Painel interno usado pelo Time Picker para ajustar horas e minutos com controles de incremento e decremento independentes."
      >
        <div className={styles.panelCard}>
          <div className={styles.panelPreview}>
            <TimePanel value={panelTime} onChange={setPanelTime} />
          </div>
          <div className={styles.panelResult}>
            <div className={styles.infoBox}>
              <span className={`type-caption-sm ${styles.infoLabel}`}>Valor atual</span>
              <span className={`type-body-lg ${styles.infoValue}`}>{formatDisplay(panelTime)}</span>
            </div>
            <p className={`type-body-sm ${styles.infoHint}`}>
              As setas superior e inferior ajustam horas de 1 em 1 e minutos de 10 em 10, com
              retorno ao início ao ultrapassar o limite (23h → 00h, 50min → 00min).
            </p>
          </div>
        </div>
      </Section>

      {/* ── Diretrizes ── */}
      <Section icon="checklist" title="Diretrizes de Uso">
        <GuidelinesGrid items={TIME_PICKER_GUIDELINES} />
      </Section>
    </div>
  )
}
