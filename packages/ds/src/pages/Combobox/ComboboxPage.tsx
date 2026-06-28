import PageHeader from '../../components/docs/PageHeader/PageHeader'
import Combobox from '../../components/Combobox/Combobox'
import {
  COMBOBOX_SIZES,
  COMBOBOX_GUIDELINES,
  COMBOBOX_MATRIX_STATES,
  COMBOBOX_MATRIX_COLS,
} from '../../tokens/combobox'
import type { ComboboxSizeDef, ComboboxSize } from '../../tokens/combobox'
import GuidelinesGrid from '../../components/docs/GuidelinesGrid/GuidelinesGrid'
import Section from '../../components/docs/Section/Section'
import StateMatrix from '../../components/docs/StateMatrix/StateMatrix'
import ShowcaseList from '../../components/docs/ShowcaseList/ShowcaseList'
import type { ShowcaseRow } from '../../components/docs/ShowcaseList/ShowcaseList'
import DemoCard from '../../components/docs/DemoCard/DemoCard'
import CardGrid from '../../components/docs/CardGrid/CardGrid'
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
        <CardGrid>
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
        <ShowcaseList
          previewWidth={280}
          rows={COMBOBOX_SIZES.map(
            (size): ShowcaseRow => ({
              id: size.id,
              label: size.label,
              badge: size.recommended ? 'Recomendado' : undefined,
              description: size.description,
              specs: sizeSpecs(size),
            })
          )}
          renderPreview={(row) => <Combobox size={row.id as ComboboxSize} />}
        />
      </Section>

      {/* ── Estados ── */}
      <Section icon="toggle_on" title="Estados" count={COMBOBOX_MATRIX_STATES.length}>
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
        <CardGrid wide>
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
