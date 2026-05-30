import PageHeader from '../../components/PageHeader/PageHeader'
import SectionHeader from '../../components/SectionHeader/SectionHeader'
import Select from '../../components/Select/Select'
import {
  SELECT_SIZES,
  SELECT_GUIDELINES,
  SELECT_MATRIX_STATES,
  SELECT_MATRIX_COLS,
  SELECT_DEMO_OPTIONS,
} from '../../tokens/select'
import type { SelectSizeDef } from '../../tokens/select'
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
      <div className={styles.section}>
        <SectionHeader icon="style" title="Estilos de Conteúdo" />
        <div className={styles.stylesGrid}>
          <div className={styles.styleCard}>
            <div className={styles.stylePreview}>
              <Select options={SELECT_DEMO_OPTIONS} size="md" />
            </div>
            <div className={styles.styleBody}>
              <span className={`type-body-sm ${styles.styleName}`}>Placeholder</span>
              <span className={`type-body-sm ${styles.styleDesc}`}>
                Estado inicial do campo quando nenhuma opção foi selecionada. O texto de placeholder
                orienta o usuário sobre o que selecionar.
              </span>
            </div>
          </div>

          <div className={styles.styleCard}>
            <div className={styles.stylePreview}>
              <Select options={SELECT_DEMO_OPTIONS} size="md" defaultValue="item-1" />
            </div>
            <div className={styles.styleBody}>
              <span className={`type-body-sm ${styles.styleName}`}>Filled</span>
              <span className={`type-body-sm ${styles.styleDesc}`}>
                Estado após a seleção de uma opção. O valor escolhido é exibido no campo com cor
                primária, diferenciando-se do placeholder.
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Escala de Tamanhos ── */}
      <div className={styles.section}>
        <SectionHeader icon="straighten" title="Escala de Tamanhos" count={3} />
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
      </div>

      {/* ── Estados ── */}
      <div className={styles.section}>
        <SectionHeader icon="toggle_on" title="Estados" count={6} />
        <div className={styles.stateMatrixContainer}>
          <div className={styles.matrixHeaderRow}>
            <div className={styles.matrixHeaderSpacer} />
            {SELECT_MATRIX_COLS.map((col) => (
              <div key={col.id} className={styles.matrixCellLabel}>
                {col.label}
              </div>
            ))}
          </div>

          {SELECT_MATRIX_STATES.map((state) => (
            <div key={state.label} className={styles.matrixRow}>
              <div className={styles.matrixStateLabel}>
                <span className={`type-caption-sm ${styles.matrixStateName}`}>{state.label}</span>
              </div>
              <div className={styles.matrixCells}>
                {SELECT_MATRIX_COLS.map((col) => (
                  <div
                    key={col.id}
                    className={[
                      styles.matrixCell,
                      state.id === 'active' ? styles.matrixCellActive : '',
                    ]
                      .filter(Boolean)
                      .join(' ')}
                  >
                    <div className={styles.matrixField}>
                      <Select
                        options={SELECT_DEMO_OPTIONS}
                        size="md"
                        forceState={state.force}
                        defaultValue={col.filled ? 'item-1' : undefined}
                        errorMessage={state.id === 'error' ? 'Campo obrigatório' : undefined}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Configurações ── */}
      <div className={styles.section}>
        <SectionHeader icon="tune" title="Configurações" count={6} />
        <div className={styles.configGrid}>
          <div className={styles.configCard}>
            <div className={styles.configPreview}>
              <Select options={SELECT_DEMO_OPTIONS} />
            </div>
            <div className={styles.configBody}>
              <span className={`type-body-sm ${styles.configName}`}>Padrão</span>
              <span className={`type-caption-sm ${styles.configDesc}`}>
                Campo de seleção básico com label e placeholder. Ponto de partida para a maioria dos
                formulários.
              </span>
            </div>
          </div>

          <div className={styles.configCard}>
            <div className={styles.configPreview}>
              <Select options={SELECT_DEMO_OPTIONS} optional />
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
              <Select options={SELECT_DEMO_OPTIONS} showLabel={false} />
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
              <Select
                options={SELECT_DEMO_OPTIONS}
                descriptionText="Selecione a opção que melhor descreve o seu caso de uso."
              />
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
              <Select
                options={SELECT_DEMO_OPTIONS}
                helpText="Escolha a opção mais adequada ao seu caso."
              />
            </div>
            <div className={styles.configBody}>
              <span className={`type-body-sm ${styles.configName}`}>Com texto de ajuda</span>
              <span className={`type-caption-sm ${styles.configDesc}`}>
                Texto de apoio abaixo do campo orienta o usuário sobre o contexto ou as opções
                disponíveis.
              </span>
            </div>
          </div>

          <div className={styles.configCard}>
            <div className={styles.configPreview}>
              <Select options={SELECT_DEMO_OPTIONS} defaultValue="item-1" />
            </div>
            <div className={styles.configBody}>
              <span className={`type-body-sm ${styles.configName}`}>Pré-selecionado</span>
              <span className={`type-caption-sm ${styles.configDesc}`}>
                Campo inicializado com um valor padrão já selecionado. Útil quando uma opção é a
                mais comum ou recomendada.
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Diretrizes de Uso ── */}
      <div className={styles.section}>
        <SectionHeader icon="menu_book" title="Diretrizes de Uso" />
        <div className={styles.guidelinesGrid}>
          {SELECT_GUIDELINES.map((g) => (
            <div key={g.title} className={styles.guidelineCard}>
              <span className={`type-body-md ${styles.guidelineTitle}`}>{g.title}</span>
              <span className={`type-body-sm ${styles.guidelineBody}`}>{g.body}</span>
              <span className={`type-caption-sm ${styles.guidelineRule}`}>{g.rule}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
