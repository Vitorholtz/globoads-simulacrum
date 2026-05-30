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
      <Section icon="style" title="Estilos de Conteúdo">
        <div className={styles.stylesGrid}>
          <div className={styles.styleCard}>
            <div className={styles.stylePreview}>
              <Combobox size="md" />
            </div>
            <div className={styles.styleBody}>
              <span className={`type-body-sm ${styles.styleName}`}>Placeholder</span>
              <span className={`type-body-sm ${styles.styleDesc}`}>
                Estado inicial do campo quando nenhum item foi adicionado. O placeholder orienta o
                usuário a digitar e pressionar Enter para adicionar um chip.
              </span>
            </div>
          </div>

          <div className={styles.styleCard}>
            <div className={styles.stylePreview}>
              <Combobox size="md" defaultValue={FILLED_CHIPS} />
            </div>
            <div className={styles.styleBody}>
              <span className={`type-body-sm ${styles.styleName}`}>Filled</span>
              <span className={`type-body-sm ${styles.styleDesc}`}>
                Estado após a adição de um ou mais itens. Cada valor confirmado aparece como chip
                abaixo do campo, com botão de remoção individual.
              </span>
            </div>
          </div>
        </div>
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
      <Section icon="tune" title="Configurações" count={6}>
        <div className={styles.configGrid}>
          <div className={styles.configCard}>
            <div className={styles.configPreview}>
              <Combobox />
            </div>
            <div className={styles.configBody}>
              <span className={`type-body-sm ${styles.configName}`}>Padrão</span>
              <span className={`type-caption-sm ${styles.configDesc}`}>
                Combobox básico com label e placeholder. Ponto de partida para formulários com
                entrada de múltiplos valores.
              </span>
            </div>
          </div>

          <div className={styles.configCard}>
            <div className={styles.configPreview}>
              <Combobox optional />
            </div>
            <div className={styles.configBody}>
              <span className={`type-body-sm ${styles.configName}`}>Opcional</span>
              <span className={`type-caption-sm ${styles.configDesc}`}>
                Campo não obrigatório identificado com a tag "Opcional" ao lado da label.
              </span>
            </div>
          </div>

          <div className={styles.configCard}>
            <div className={styles.configPreview}>
              <Combobox showLabel={false} />
            </div>
            <div className={styles.configBody}>
              <span className={`type-body-sm ${styles.configName}`}>Sem label</span>
              <span className={`type-caption-sm ${styles.configDesc}`}>
                Útil quando o contexto da interface já deixa o propósito do campo evidente.
              </span>
            </div>
          </div>

          <div className={styles.configCard}>
            <div className={styles.configPreview}>
              <Combobox descriptionText="Adicione todas as tags relevantes para o seu conteúdo." />
            </div>
            <div className={styles.configBody}>
              <span className={`type-body-sm ${styles.configName}`}>Com descrição</span>
              <span className={`type-caption-sm ${styles.configDesc}`}>
                Ícone de informação ao lado da label exibe um tooltip de contexto ao passar o
                cursor.
              </span>
            </div>
          </div>

          <div className={styles.configCard}>
            <div className={styles.configPreview}>
              <Combobox helpText="Digite um valor e pressione Enter para adicionar." />
            </div>
            <div className={styles.configBody}>
              <span className={`type-body-sm ${styles.configName}`}>Com texto de ajuda</span>
              <span className={`type-caption-sm ${styles.configDesc}`}>
                Texto de apoio abaixo do campo orienta o usuário sobre como interagir com o
                Combobox.
              </span>
            </div>
          </div>

          <div className={styles.configCard}>
            <div className={styles.configPreview}>
              <Combobox defaultValue={['React', 'TypeScript']} />
            </div>
            <div className={styles.configBody}>
              <span className={`type-body-sm ${styles.configName}`}>Pré-preenchido</span>
              <span className={`type-caption-sm ${styles.configDesc}`}>
                Campo inicializado com chips já adicionados. Útil quando valores padrão ou sugeridos
                devem estar presentes desde o início.
              </span>
            </div>
          </div>
        </div>
      </Section>

      {/* ── Diretrizes de Uso ── */}
      <Section icon="menu_book" title="Diretrizes de Uso">
        <GuidelinesGrid items={COMBOBOX_GUIDELINES} />
      </Section>
    </div>
  )
}
