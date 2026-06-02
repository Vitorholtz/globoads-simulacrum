import PageHeader from '../../components/PageHeader/PageHeader'
import Combobox from '../../components/Combobox/Combobox'
import {
  COMBOBOX_SIZES,
  COMBOBOX_GUIDELINES,
  COMBOBOX_MATRIX_STATES,
  COMBOBOX_MATRIX_COLS,
} from '../../tokens/combobox'
import type { ComboboxSizeDef } from '../../tokens/combobox'
import GuidelinesGrid from '../../components/GuidelinesGrid/GuidelinesGrid'
import Section from '../../components/Section/Section'
import StateMatrix from '../../components/StateMatrix/StateMatrix'
import DemoCard from '../../components/DemoCard/DemoCard'
import CardGrid from '../../components/CardGrid/CardGrid'
import styles from './ComboboxPage.module.css'

const FILLED_CHIPS = ['Chip 1', 'Chip 2', 'Chip 3']

function sizeSpecs(size: ComboboxSizeDef) {
  return (
    <>
      Font: {size.fontSize}px / {size.lineHeight}px
      <br />
      Padding: {size.paddingY}px {size.paddingX}px
    </>
  )
}

export default function ComboboxPage() {
  return (
    <div>
      <PageHeader
        breadcrumb="Inputs"
        title="Combobox"
        subtitle="Campo de texto com seleção múltipla. O usuário digita um valor e pressiona Enter para adicioná-lo como chip. Os chips são exibidos abaixo do campo e podem ser removidos individualmente."
        stats={[
          { label: 'tamanhos', value: '3' },
          { label: 'estados', value: '5' },
          { label: 'configurações', value: '6' },
        ]}
      />

      {/* ── Estilos de Conteúdo ── */}
      <Section
        icon="style"
        title="Estilos de Conteúdo"
        count={2}
        description="O campo exibe dois estados visuais distintos conforme a interação do usuário."
      >
        <CardGrid cols={2}>
          <DemoCard
            preview={
              <div className={styles.contentPreview}>
                <Combobox size="md" />
              </div>
            }
            title="Placeholder"
            description="Estado inicial do campo quando nenhum item foi adicionado. O placeholder orienta o usuário a digitar e pressionar Enter para adicionar um chip."
            previewPad="lg"
          />
          <DemoCard
            preview={
              <div className={styles.contentPreview}>
                <Combobox size="md" defaultValue={FILLED_CHIPS} />
              </div>
            }
            title="Filled"
            description="Estado após a adição de um ou mais itens. Cada valor confirmado aparece como chip abaixo do campo, com botão de remoção individual."
            previewPad="lg"
          />
        </CardGrid>
      </Section>

      {/* ── Escala de Tamanhos ── */}
      <Section icon="straighten" title="Escala de Tamanhos" count={3}>
        <div className={styles.sizeScaleContainer}>
          {COMBOBOX_SIZES.map((size) => (
            <div key={size.id} className={styles.sizeRow}>
              <div className={styles.sizePreview}>
                <Combobox size={size.id} />
              </div>
              <div className={styles.sizeMeta}>
                <div className={styles.sizeValueRow}>
                  <span className={`type-body-sm ${styles.sizeLabel}`}>{size.label}</span>
                  {size.recommended && (
                    <span className={`type-caption-sm ${styles.sizeRecommended}`}>Recomendado</span>
                  )}
                </div>
                <span className={`type-body-sm ${styles.sizeDescription}`}>{size.description}</span>
              </div>
              <span className={`type-caption-sm ${styles.sizeSpecs}`}>{sizeSpecs(size)}</span>
            </div>
          ))}
        </div>
      </Section>

      {/* ── Estados ── */}
      <Section icon="toggle_on" title="Estados" count={5}>
        <StateMatrix
          columns={COMBOBOX_MATRIX_COLS}
          rows={COMBOBOX_MATRIX_STATES}
          labelWidth={120}
          align="start"
          cellPad="sm"
          overflow="visible"
          renderCell={(state, col) => (
            <div className={styles.matrixField}>
              <Combobox
                size="md"
                forceState={state.force}
                defaultValue={col.filled ? FILLED_CHIPS : undefined}
                errorMessage={state.id === 'error' ? 'Campo obrigatório' : undefined}
              />
            </div>
          )}
        />
      </Section>

      {/* ── Configurações ── */}
      <Section
        icon="tune"
        title="Configurações"
        count={6}
        description="Combinações de props que cobrem os cenários mais comuns de formulários."
      >
        <CardGrid cols={3}>
          <DemoCard
            preview={<Combobox />}
            title="Padrão"
            description="Combobox básico com label e placeholder. Ponto de partida para formulários com entrada de múltiplos valores."
          />
          <DemoCard
            preview={<Combobox optional />}
            title="Opcional"
            description={
              'Campo não obrigatório identificado com a tag "Opcional" ao lado da label.'
            }
          />
          <DemoCard
            preview={<Combobox showLabel={false} />}
            title="Sem label"
            description="Útil quando o contexto da interface já deixa o propósito do campo evidente."
          />
          <DemoCard
            preview={
              <Combobox descriptionText="Adicione todas as tags relevantes para o seu conteúdo." />
            }
            title="Com descrição"
            description="Ícone de informação ao lado da label exibe um tooltip de contexto ao passar o cursor."
          />
          <DemoCard
            preview={<Combobox helpText="Digite um valor e pressione Enter para adicionar." />}
            title="Com texto de ajuda"
            description="Texto de apoio abaixo do campo orienta o usuário sobre como interagir com o Combobox."
          />
          <DemoCard
            preview={<Combobox defaultValue={['React', 'TypeScript']} />}
            title="Pré-preenchido"
            description="Campo inicializado com chips já adicionados. Útil quando valores padrão ou sugeridos devem estar presentes desde o início."
          />
        </CardGrid>
      </Section>

      {/* ── Diretrizes de Uso ── */}
      <Section icon="menu_book" title="Diretrizes de Uso">
        <GuidelinesGrid items={COMBOBOX_GUIDELINES} />
      </Section>
    </div>
  )
}
