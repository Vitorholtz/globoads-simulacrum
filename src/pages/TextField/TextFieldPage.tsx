import TextField from '../../components/TextField/TextField'
import {
  TEXT_FIELD_SIZES,
  TEXT_FIELD_STATES,
  TEXT_FIELD_GUIDELINES,
  TEXT_FIELD_MATRIX_STATES,
  TEXT_FIELD_MATRIX_COLS,
} from '../../tokens/textField'
import PageHeader from '../../components/PageHeader/PageHeader'
import SectionHeader from '../../components/SectionHeader/SectionHeader'
import styles from './TextFieldPage.module.css'

export default function TextFieldPage() {
  return (
    <div>
      <PageHeader
        breadcrumb="Inputs"
        title="Text Field"
        subtitle="O campo de texto permite a entrada de informações variadas pelos usuários. Disponível em três tamanhos e cinco estados, suporta label, texto de ajuda, ícone à esquerda e validação de erro."
        stats={[
          { value: 3, label: 'Tamanhos' },
          { value: 5, label: 'Estados' },
          { value: 2, label: 'Estilos' },
        ]}
      />

      {/* ── Estilos de Conteúdo ── */}
      <section className={styles.section}>
        <SectionHeader icon="edit" title="Estilos de Conteúdo" count="2 estilos" />
        <div className={styles.stylesGrid}>
          <div className={styles.styleCard}>
            <div className={styles.stylePreview}>
              <TextField label="Label" placeholder="Text here" size="md" />
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
              <TextField label="Label" placeholder="Text here" defaultValue="Text here" size="md" />
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
      </section>

      {/* ── Escala de Tamanhos ── */}
      <section className={styles.section}>
        <SectionHeader
          icon="straighten"
          title="Escala de Tamanhos"
          count={`${TEXT_FIELD_SIZES.length} tamanhos`}
        />
        <div className={styles.sizeScaleContainer}>
          {TEXT_FIELD_SIZES.map((s) => (
            <div key={s.id} className={styles.sizeRow}>
              <div className={styles.sizePreview}>
                <TextField size={s.id} label="Label" placeholder="Text here" leadingIcon="search" />
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
          count={`${TEXT_FIELD_STATES.length} estados`}
        />
        <div className={styles.stateMatrixContainer}>
          <div className={styles.matrixHeaderRow}>
            <div className={styles.matrixHeaderSpacer} />
            {TEXT_FIELD_MATRIX_COLS.map((col) => (
              <div key={col.id} className={`type-caption-xs ${styles.matrixCellLabel}`}>
                {col.label}
              </div>
            ))}
          </div>

          {TEXT_FIELD_MATRIX_STATES.map((state) => (
            <div key={state.id} className={styles.matrixRow}>
              <div className={styles.matrixStateLabel}>
                <span className={`type-caption-sm ${styles.matrixStateName}`}>{state.label}</span>
              </div>
              <div className={styles.matrixCells}>
                {TEXT_FIELD_MATRIX_COLS.map((col) => (
                  <div key={col.id} className={styles.matrixCell}>
                    <TextField
                      size="md"
                      label="Label"
                      placeholder="Text here"
                      defaultValue={col.value}
                      leadingIcon={col.icon}
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
      </section>

      {/* ── Configurações ── */}
      <section className={styles.section}>
        <SectionHeader icon="tune" title="Configurações" count="4 configurações" />
        <div className={styles.configGrid}>
          <div className={styles.configCard}>
            <div className={styles.configPreview}>
              <TextField label="Label" placeholder="Text here" size="md" />
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
              <TextField label="Label" optional placeholder="Text here" size="md" />
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
              <TextField showLabel={false} placeholder="Text here" size="md" />
            </div>
            <div className={styles.configBody}>
              <span className={`type-body-sm ${styles.configName}`}>Sem label</span>
              <span className={`type-caption-sm ${styles.configDesc}`}>
                Quando o contexto visual torna a label dispensável — ex: campo de busca isolado ou
                em um header.
              </span>
            </div>
          </div>

          <div className={styles.configCard}>
            <div className={styles.configPreview}>
              <TextField
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
              <TextField label="Busca" leadingIcon="search" placeholder="Pesquisar..." size="md" />
            </div>
            <div className={styles.configBody}>
              <span className={`type-body-sm ${styles.configName}`}>Com ícone</span>
              <span className={`type-caption-sm ${styles.configDesc}`}>
                Ícone à esquerda reforça o tipo de dado esperado sem substituir a label.
              </span>
            </div>
          </div>

          <div className={styles.configCard}>
            <div className={styles.configPreview}>
              <TextField
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
      </section>

      {/* ── Diretrizes ── */}
      <section className={styles.section}>
        <SectionHeader icon="checklist" title="Diretrizes de Uso" />
        <div className={styles.guidelinesGrid}>
          {TEXT_FIELD_GUIDELINES.map((g) => (
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
