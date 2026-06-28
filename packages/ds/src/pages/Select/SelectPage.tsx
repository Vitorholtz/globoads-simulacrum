import PageHeader from '../../components/docs/PageHeader/PageHeader'
import Select from '../../components/Select/Select'
import {
  SELECT_SIZES,
  SELECT_GUIDELINES,
  SELECT_MATRIX_STATES,
  SELECT_MATRIX_COLS,
  SELECT_DEMO_OPTIONS,
  SELECT_DEMO_OPTIONS_LONG,
} from '../../tokens/select'
import type { SelectSizeDef } from '../../tokens/select'
import GuidelinesGrid from '../../components/docs/GuidelinesGrid/GuidelinesGrid'
import Section from '../../components/docs/Section/Section'
import StateMatrix from '../../components/docs/StateMatrix/StateMatrix'
import DemoCard from '../../components/docs/DemoCard/DemoCard'
import CardGrid from '../../components/docs/CardGrid/CardGrid'
import styles from './SelectPage.module.css'

function sizeSpecs(size: SelectSizeDef) {
  return (
    <>
      Font: {size.fontSize}px / {size.lineHeight}px
      <br />
      Padding: {size.paddingY}px {size.paddingX}px
    </>
  )
}

export default function SelectPage() {
  return (
    <div>
      <PageHeader
        breadcrumb="Inputs"
        title="Select"
        subtitle="O campo de seleção permite a escolha de uma ou mais opções de uma lista."
        stats={[
          { label: 'tamanhos', value: '3' },
          { label: 'estados', value: '6' },
          { label: 'configurações', value: '6' },
        ]}
      />

      {/* ── Estilos de Conteúdo ── */}
      <Section
        icon="style"
        title="Estilos de Conteúdo"
        description="O campo exibe dois estados visuais distintos conforme a interação do usuário."
      >
        <CardGrid>
          <DemoCard
            preview={
              <div className={styles.contentPreview}>
                <Select options={SELECT_DEMO_OPTIONS} size="md" />
              </div>
            }
            title="Placeholder"
            description="Estado inicial do campo quando nenhuma opção foi selecionada. O texto de placeholder orienta o usuário sobre o que selecionar."
            previewPad="lg"
          />
          <DemoCard
            preview={
              <div className={styles.contentPreview}>
                <Select options={SELECT_DEMO_OPTIONS} size="md" defaultValue="item-1" />
              </div>
            }
            title="Filled"
            description="Estado após a seleção de uma opção. O valor escolhido é exibido no campo com cor primária, diferenciando-se do placeholder."
            previewPad="lg"
          />
        </CardGrid>
      </Section>

      {/* ── Escala de Tamanhos ── */}
      <Section icon="straighten" title="Escala de Tamanhos" count={3}>
        <div className={styles.sizeScaleContainer}>
          {SELECT_SIZES.map((size) => (
            <div key={size.id} className={styles.sizeRow}>
              <div className={styles.sizePreview}>
                <Select options={SELECT_DEMO_OPTIONS} size={size.id} />
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
      <Section icon="toggle_on" title="Estados" count={SELECT_MATRIX_STATES.length}>
        <StateMatrix
          columns={SELECT_MATRIX_COLS}
          rows={SELECT_MATRIX_STATES}
          labelWidth={120}
          align="start"
          cellPad="sm"
          overflow="visible"
          getCellClassName={(state) =>
            state.id === 'active' ? styles.matrixCellActive : undefined
          }
          renderCell={(state, col) => (
            <div className={styles.matrixField}>
              <Select
                options={SELECT_DEMO_OPTIONS}
                size="md"
                forceState={state.force}
                defaultValue={col.filled ? 'item-1' : undefined}
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
        <CardGrid wide>
          <DemoCard
            preview={<Select options={SELECT_DEMO_OPTIONS} />}
            title="Padrão"
            description="Campo de seleção básico com label e placeholder. Ponto de partida para a maioria dos formulários."
          />
          <DemoCard
            preview={<Select options={SELECT_DEMO_OPTIONS} optional />}
            title="Opcional"
            description={
              'Campo não obrigatório identificado com a tag "Opcional" ao lado da label.'
            }
          />
          <DemoCard
            preview={<Select options={SELECT_DEMO_OPTIONS} showLabel={false} />}
            title="Sem label"
            description="Útil quando o contexto da interface já deixa o propósito do campo evidente."
          />
          <DemoCard
            preview={
              <Select
                options={SELECT_DEMO_OPTIONS}
                descriptionText="Selecione a opção que melhor descreve o seu caso de uso."
              />
            }
            title="Com descrição"
            description="Ícone de informação ao lado da label exibe um tooltip de contexto ao passar o cursor."
          />
          <DemoCard
            preview={
              <Select
                options={SELECT_DEMO_OPTIONS}
                helpText="Escolha a opção mais adequada ao seu caso."
              />
            }
            title="Com texto de ajuda"
            description="Texto de apoio abaixo do campo orienta o usuário sobre o contexto ou as opções disponíveis."
          />
          <DemoCard
            preview={<Select options={SELECT_DEMO_OPTIONS} defaultValue="item-1" />}
            title="Pré-selecionado"
            description="Campo inicializado com um valor padrão já selecionado. Útil quando uma opção é a mais comum ou recomendada."
          />
        </CardGrid>
      </Section>

      {/* ── Muitas opções ── */}
      <Section
        icon="list"
        title="Muitas opções"
        description="Comportamentos automáticos quando a lista de opções é extensa."
      >
        <CardGrid>
          <DemoCard
            preview={
              <Select options={SELECT_DEMO_OPTIONS_LONG} placeholder="Selecione o formato" />
            }
            title="Com scroll"
            description="Quando a lista excede a altura máxima do dropdown, as opções ficam acessíveis via scroll. Sempre ativo — não requer configuração extra."
          />
          <DemoCard
            preview={
              <Select
                options={SELECT_DEMO_OPTIONS_LONG}
                placeholder="Selecione o formato"
                searchable
              />
            }
            title="Pesquisável"
            description={`A prop searchable adiciona um campo de busca no topo do dropdown que filtra as opções em tempo real. Recomendado a partir de 8 itens.`}
          />
        </CardGrid>
      </Section>

      {/* ── Diretrizes de Uso ── */}
      <Section icon="menu_book" title="Diretrizes de Uso">
        <GuidelinesGrid items={SELECT_GUIDELINES} />
      </Section>
    </div>
  )
}
