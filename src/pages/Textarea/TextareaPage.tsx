import Textarea from '../../components/Textarea/Textarea'
import {
  TEXTAREA_SIZES,
  TEXTAREA_STATES,
  TEXTAREA_GUIDELINES,
  TEXTAREA_MATRIX_STATES,
  TEXTAREA_MATRIX_COLS,
} from '../../tokens/textarea'
import PageHeader from '../../components/PageHeader/PageHeader'
import GuidelinesGrid from '../../components/GuidelinesGrid/GuidelinesGrid'
import Section from '../../components/Section/Section'
import styles from './TextareaPage.module.css'

export default function TextareaPage() {
  return (
    <div>
      <PageHeader
        breadcrumb="Inputs"
        title="Textarea"
        subtitle="O campo de texto longo permite a entrada de uma grande quantidade de informações pelos usuários. Disponível em três tamanhos e cinco estados, suporta label, texto de ajuda, contador de caracteres e validação de erro."
        stats={[
          { value: 3, label: 'Tamanhos' },
          { value: 5, label: 'Estados' },
          { value: 4, label: 'Configurações' },
        ]}
      />

      {/* ── Estilos de Conteúdo ── */}
      <Section icon="edit_note" title="Estilos de Conteúdo" count="2 estilos">
        <div className={styles.stylesGrid}>
          <div className={styles.styleCard}>
            <div className={styles.stylePreview}>
              <Textarea label="Label" placeholder="Text here" size="md" />
            </div>
            <div className={styles.styleBody}>
              <span className={`type-body-sm ${styles.styleName}`}>Placeholder</span>
              <span className={`type-body-sm ${styles.styleDesc}`}>
                Campo vazio exibindo o placeholder. Indica o tipo de informação esperada sem
                comprometer a label.
              </span>
            </div>
          </div>

          <div className={styles.styleCard}>
            <div className={styles.stylePreview}>
              <Textarea label="Label" placeholder="Text here" defaultValue="Text here" size="md" />
            </div>
            <div className={styles.styleBody}>
              <span className={`type-body-sm ${styles.styleName}`}>Filled</span>
              <span className={`type-body-sm ${styles.styleDesc}`}>
                Campo preenchido com valor do usuário. Texto em Fill Primary para diferenciar de
                placeholder.
              </span>
            </div>
          </div>
        </div>
      </Section>

      {/* ── Escala de Tamanhos ── */}
      <Section
        icon="straighten"
        title="Escala de Tamanhos"
        count={`${TEXTAREA_SIZES.length} tamanhos`}
      >
        <div className={styles.sizeScaleContainer}>
          {TEXTAREA_SIZES.map((s) => (
            <div key={s.id} className={styles.sizeRow}>
              <div className={styles.sizePreview}>
                <Textarea size={s.id} label="Label" placeholder="Text here" />
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
                  font {s.fontSize}px · line {s.lineHeight}px
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
      <Section icon="toggle_on" title="Estados" count={`${TEXTAREA_STATES.length} estados`}>
        <div className={styles.stateMatrixContainer}>
          <div className={styles.matrixHeaderRow}>
            <div className={styles.matrixHeaderSpacer} />
            {TEXTAREA_MATRIX_COLS.map((col) => (
              <div key={col.id} className={`type-caption-xs ${styles.matrixCellLabel}`}>
                {col.label}
              </div>
            ))}
          </div>

          {TEXTAREA_MATRIX_STATES.map((state) => (
            <div key={state.id} className={styles.matrixRow}>
              <div className={styles.matrixStateLabel}>
                <span className={`type-caption-sm ${styles.matrixStateName}`}>{state.label}</span>
              </div>
              <div className={styles.matrixCells}>
                {TEXTAREA_MATRIX_COLS.map((col) => (
                  <div key={col.id} className={styles.matrixCell}>
                    <Textarea
                      size="md"
                      label="Label"
                      placeholder="Text here"
                      defaultValue={col.defaultValue}
                      forceState={state.force}
                      errorMessage={state.id === 'error' ? 'Required error text!' : undefined}
                      className={styles.matrixField}
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* ── Configurações ── */}
      <Section icon="tune" title="Configurações" count="6 configurações">
        <div className={styles.configGrid}>
          <div className={styles.configCard}>
            <div className={styles.configPreview}>
              <Textarea label="Label" placeholder="Text here" size="md" />
            </div>
            <div className={styles.configBody}>
              <span className={`type-body-sm ${styles.configName}`}>Padrão</span>
              <span className={`type-caption-sm ${styles.configDesc}`}>
                Label + campo. Configuração base para a maioria dos formulários.
              </span>
            </div>
          </div>

          <div className={styles.configCard}>
            <div className={styles.configPreview}>
              <Textarea label="Label" optional placeholder="Text here" size="md" />
            </div>
            <div className={styles.configBody}>
              <span className={`type-body-sm ${styles.configName}`}>Opcional</span>
              <span className={`type-caption-sm ${styles.configDesc}`}>
                Tag "Opcional" à direita da label para sinalizar campos não obrigatórios.
              </span>
            </div>
          </div>

          <div className={styles.configCard}>
            <div className={styles.configPreview}>
              <Textarea showLabel={false} placeholder="Text here" size="md" />
            </div>
            <div className={styles.configBody}>
              <span className={`type-body-sm ${styles.configName}`}>Sem label</span>
              <span className={`type-caption-sm ${styles.configDesc}`}>
                Quando o contexto visual torna a label dispensável — ex: campo de anotações isolado.
              </span>
            </div>
          </div>

          <div className={styles.configCard}>
            <div className={styles.configPreview}>
              <Textarea
                label="Label"
                descriptionText="Informação adicional sobre este campo aparece aqui."
                placeholder="Text here"
                size="md"
              />
            </div>
            <div className={styles.configBody}>
              <span className={`type-body-sm ${styles.configName}`}>Com descrição</span>
              <span className={`type-caption-sm ${styles.configDesc}`}>
                Ícone ⓘ ao lado da label exibe um tooltip com contexto adicional ao passar o mouse.
              </span>
            </div>
          </div>

          <div className={styles.configCard}>
            <div className={styles.configPreview}>
              <Textarea
                label="Label"
                placeholder="Text here"
                defaultValue="Text here"
                maxLength={500}
                showCounter
                size="md"
              />
            </div>
            <div className={styles.configBody}>
              <span className={`type-body-sm ${styles.configName}`}>Com contador</span>
              <span className={`type-caption-sm ${styles.configDesc}`}>
                Exibe o número de caracteres restantes. Habilitar somente quando houver um limite
                máximo definido.
              </span>
            </div>
          </div>

          <div className={styles.configCard}>
            <div className={styles.configPreview}>
              <Textarea
                label="Label"
                placeholder="Text here"
                helpText="Help text here..."
                size="md"
              />
            </div>
            <div className={styles.configBody}>
              <span className={`type-body-sm ${styles.configName}`}>Com texto de ajuda</span>
              <span className={`type-caption-sm ${styles.configDesc}`}>
                Texto de suporte abaixo do campo com instruções adicionais.
              </span>
            </div>
          </div>
        </div>
      </Section>

      {/* ── Diretrizes ── */}
      <Section icon="checklist" title="Diretrizes de Uso">
        <GuidelinesGrid items={TEXTAREA_GUIDELINES} />
      </Section>
    </div>
  )
}
