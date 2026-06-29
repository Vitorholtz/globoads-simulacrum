import { useState } from 'react'
import DateTimePicker from '../../components/DateTimePicker/DateTimePicker'
import PageHeader from '../../components/docs/PageHeader/PageHeader'
import {
  DATE_TIME_PICKER_SIZES,
  DATE_TIME_PICKER_STATES,
  DATE_TIME_PICKER_MATRIX_STATES,
  DATE_TIME_PICKER_MATRIX_COLS,
  DATE_TIME_PICKER_GUIDELINES,
  type DateTimeValue,
  type DateTimePickerSize,
} from '../../tokens/dateTimePicker'
import ShowcaseList, { type ShowcaseRow } from '../../components/docs/ShowcaseList/ShowcaseList'
import Section from '../../components/docs/Section/Section'
import StateMatrix from '../../components/docs/StateMatrix/StateMatrix'
import DemoCard from '../../components/docs/DemoCard/DemoCard'
import CardGrid from '../../components/docs/CardGrid/CardGrid'
import styles from './DateTimePickerPage.module.css'

const EXAMPLE_VALUE: DateTimeValue = {
  date: new Date(2025, 4, 26),
  time: { hours: 14, minutes: 30 },
}

function pad2(n: number): string {
  return String(n).padStart(2, '0')
}

function formatDisplay(v: DateTimeValue | null): string {
  if (!v) return '—'
  const d = v.date.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  })
  return `${d} → ${pad2(v.time.hours)}:${pad2(v.time.minutes)}`
}

export default function DateTimePickerPage() {
  const [selectedValue, setSelectedValue] = useState<DateTimeValue | null>(null)

  return (
    <div>
      <PageHeader
        breadcrumb="Inputs"
        title="Date & Time Picker"
        subtitle="O Date & Time Picker combina os componentes Date Picker e Time Picker em um único campo. Ao abrir, o usuário escolhe a data; ao confirmar, o painel avança automaticamente para o horário. Disponível em três tamanhos e seis estados, com suporte a label, texto de ajuda e validação de erro."
        stats={[
          { value: 3, label: 'Tamanhos' },
          { value: 6, label: 'Estados' },
          { value: 2, label: 'Estilos' },
          { value: 6, label: 'Configurações' },
        ]}
      />

      {/* ── Estilos de Conteúdo ── */}
      <Section
        icon="event"
        title="Estilos de Conteúdo"
        count={2}
        description="O campo exibe dois estados visuais distintos conforme a interação do usuário."
      >
        <CardGrid>
          <DemoCard
            preview={
              <div className={styles.contentPreview}>
                <DateTimePicker label="Início da campanha" size="md" />
              </div>
            }
            title="Placeholder"
            description="Campo vazio exibindo o placeholder DD/MM/AAAA → HH:MM. Indica o formato esperado sem preencher valor."
            previewPad="lg"
          />
          <DemoCard
            preview={
              <div className={styles.contentPreview}>
                <DateTimePicker label="Início da campanha" size="md" defaultValue={EXAMPLE_VALUE} />
              </div>
            }
            title="Filled"
            description="Campo preenchido com data e horário selecionados. Texto em Fill Primary para diferenciar de placeholder."
            previewPad="lg"
          />
        </CardGrid>
      </Section>

      {/* ── Escala de tamanhos ── */}
      <Section icon="straighten" title="Escala de Tamanhos" count={DATE_TIME_PICKER_SIZES.length}>
        <ShowcaseList
          previewWidth={280}
          rows={DATE_TIME_PICKER_SIZES.map(
            (s): ShowcaseRow => ({
              id: s.id,
              label: s.label,
              badge: s.recommended ? 'Recomendado' : undefined,
              description: s.description,
              specs: (
                <>
                  <span>
                    font {s.fontSize}px · icon {s.iconSize}px
                  </span>
                  <br />
                  <span>
                    py {s.paddingY}px · px {s.paddingX}px
                  </span>
                </>
              ),
            })
          )}
          renderPreview={(row) => (
            <DateTimePicker
              size={row.id as DateTimePickerSize}
              label="Início"
              defaultValue={EXAMPLE_VALUE}
            />
          )}
        />
      </Section>

      {/* ── Estados ── */}
      <Section icon="toggle_on" title="Estados" count={DATE_TIME_PICKER_STATES.length}>
        <StateMatrix
          columns={DATE_TIME_PICKER_MATRIX_COLS}
          rows={DATE_TIME_PICKER_MATRIX_STATES}
          renderCell={(state, col) => (
            <DateTimePicker
              size="md"
              label="Início"
              defaultValue={col.filled ? EXAMPLE_VALUE : undefined}
              forceState={state.force}
              errorMessage={state.id === 'error' ? 'Data e horário inválidos.' : undefined}
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
        description="Combinações de props que cobrem os cenários mais comuns de formulários com data e horário."
      >
        <CardGrid wide>
          <DemoCard
            preview={
              <div className={styles.contentPreview}>
                <DateTimePicker label="Início da campanha" size="md" />
              </div>
            }
            title="Padrão"
            description="Label + campo. Configuração base para a maioria dos formulários."
            previewPad="lg"
          />
          <DemoCard
            preview={
              <div className={styles.contentPreview}>
                <DateTimePicker label="Início da campanha" optional size="md" />
              </div>
            }
            title="Opcional"
            description='Sinaliza que o preenchimento não é obrigatório. Exibe a marcação "Opcional" ao lado do label.'
            previewPad="lg"
          />
          <DemoCard
            preview={
              <div className={styles.contentPreview}>
                <DateTimePicker label="Início da campanha" showLabel={false} size="md" />
              </div>
            }
            title="Sem label"
            description="Label oculto visualmente mas presente no DOM para leitores de tela. Use quando o contexto dispensa rótulo visual."
            previewPad="lg"
          />
          <DemoCard
            preview={
              <div className={styles.contentPreview}>
                <DateTimePicker
                  label="Início da campanha"
                  descriptionText="Selecione a data e, em seguida, o horário de início."
                  size="md"
                />
              </div>
            }
            title="Com descrição"
            description="Ícone de informação com tooltip. Ideal para explicar o fluxo sequencial de seleção."
            previewPad="lg"
          />
          <DemoCard
            preview={
              <div className={styles.contentPreview}>
                <DateTimePicker
                  label="Início da campanha"
                  helpText="Selecione a data e o horário de início da campanha."
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
                <DateTimePicker
                  label="Início da campanha"
                  errorMessage="Data e horário inválidos."
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
      <Section icon="touch_app" title="Date & Time Picker Interativo">
        <div className={styles.interactiveContainer}>
          <div className={styles.interactiveDemo}>
            <div className={styles.demoFields}>
              <DateTimePicker
                label="Início da campanha"
                size="md"
                value={selectedValue}
                onChange={setSelectedValue}
              />
            </div>
          </div>
          <div className={styles.interactiveInfo}>
            <div className={styles.infoBox}>
              <span className={`type-caption-sm ${styles.infoLabel}`}>Selecionado</span>
              <span className={`type-body-lg ${styles.infoValue}`}>
                {formatDisplay(selectedValue)}
              </span>
            </div>
            <p className={`type-body-sm ${styles.infoHint}`}>
              Clique no campo para abrir o calendário. Selecione um dia e confirme para avançar ao
              horário; ajuste as horas e os minutos e confirme para concluir. Use a seta de voltar
              para corrigir a data sem perder o horário ajustado.
            </p>
          </div>
        </div>
      </Section>

      {/* ── Diretrizes ── */}
      <Section icon="checklist" title="Diretrizes de Uso">
        <CardGrid wide>
          {DATE_TIME_PICKER_GUIDELINES.map((g) => (
            <DemoCard key={g.title} title={g.title} description={g.body} />
          ))}
        </CardGrid>
      </Section>
    </div>
  )
}
