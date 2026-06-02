import TextField from '../../components/TextField/TextField'
import {
  TEXT_FIELD_SIZES,
  TEXT_FIELD_STATES,
  TEXT_FIELD_GUIDELINES,
  TEXT_FIELD_MATRIX_STATES,
  TEXT_FIELD_MATRIX_COLS,
  TEXT_FIELD_MASKS,
} from '../../tokens/textField'
import PageHeader from '../../components/PageHeader/PageHeader'
import GuidelinesGrid from '../../components/GuidelinesGrid/GuidelinesGrid'
import Section from '../../components/Section/Section'
import StateMatrix from '../../components/StateMatrix/StateMatrix'
import DemoCard from '../../components/DemoCard/DemoCard'
import CardGrid from '../../components/CardGrid/CardGrid'
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
          { value: TEXT_FIELD_MASKS.length, label: 'Máscaras' },
        ]}
      />

      {/* ── Estilos de Conteúdo ── */}
      <Section
        icon="edit"
        title="Estilos de Conteúdo"
        count={2}
        description="O campo exibe dois estados visuais distintos conforme a interação do usuário."
      >
        <CardGrid cols={2}>
          <DemoCard
            preview={
              <div className={styles.contentPreview}>
                <TextField label="Label" placeholder="Text here" size="md" />
              </div>
            }
            title="Placeholder"
            description="Campo vazio exibindo o placeholder. Indica o tipo de informação esperada sem comprometer a label."
            previewPad="lg"
          />
          <DemoCard
            preview={
              <div className={styles.contentPreview}>
                <TextField
                  label="Label"
                  placeholder="Text here"
                  defaultValue="Text here"
                  size="md"
                />
              </div>
            }
            title="Filled"
            description="Campo preenchido com valor do usuário. Texto em Fill Primary para diferenciar de placeholder."
            previewPad="lg"
          />
        </CardGrid>
      </Section>

      {/* ── Escala de Tamanhos ── */}
      <Section icon="straighten" title="Escala de Tamanhos" count={TEXT_FIELD_SIZES.length}>
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
      </Section>

      {/* ── Estados ── */}
      <Section icon="toggle_on" title="Estados" count={TEXT_FIELD_STATES.length}>
        <StateMatrix
          columns={TEXT_FIELD_MATRIX_COLS}
          rows={TEXT_FIELD_MATRIX_STATES}
          renderCell={(state, col) => (
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
            preview={<TextField label="Label" placeholder="Text here" size="md" />}
            title="Padrão"
            description="Label + campo. Configuração base para a maioria dos formulários."
          />
          <DemoCard
            preview={<TextField label="Label" optional placeholder="Text here" size="md" />}
            title="Opcional"
            description={
              'Tag "Opcional" à direita da label para sinalizar campos não obrigatórios.'
            }
          />
          <DemoCard
            preview={<TextField showLabel={false} placeholder="Text here" size="md" />}
            title="Sem label"
            description="Quando o contexto visual torna a label dispensável — ex: campo de busca isolado ou em um header."
          />
          <DemoCard
            preview={
              <TextField
                label="Label"
                descriptionText="Informação adicional sobre este campo aparece aqui."
                placeholder="Text here"
                size="md"
              />
            }
            title="Com descrição"
            description="Ícone ⓘ ao lado da label exibe um tooltip com contexto adicional ao passar o mouse."
          />
          <DemoCard
            preview={
              <TextField label="Busca" leadingIcon="search" placeholder="Pesquisar..." size="md" />
            }
            title="Com ícone"
            description="Ícone à esquerda reforça o tipo de dado esperado sem substituir a label."
          />
          <DemoCard
            preview={
              <TextField
                label="Label"
                placeholder="Text here"
                helpText="Help text here..."
                size="md"
              />
            }
            title="Com texto de ajuda"
            description="Texto de suporte abaixo do campo com instruções adicionais."
          />
        </CardGrid>
      </Section>

      {/* ── Máscaras de Entrada ── */}
      <Section
        icon="pin"
        title="Máscaras de Entrada"
        count={TEXT_FIELD_MASKS.length}
        description="Formatos automáticos de entrada que guiam o preenchimento e garantem consistência dos dados."
      >
        <CardGrid>
          {TEXT_FIELD_MASKS.map((m) => (
            <DemoCard
              key={m.id}
              preview={
                <TextField label={m.label} placeholder={m.placeholder} mask={m.id} size="md" />
              }
              title={m.label}
              description={`${m.description} · Ex: ${m.example}`}
            />
          ))}
        </CardGrid>
      </Section>

      {/* ── Diretrizes ── */}
      <Section icon="checklist" title="Diretrizes de Uso">
        <GuidelinesGrid items={TEXT_FIELD_GUIDELINES} />
      </Section>
    </div>
  )
}
