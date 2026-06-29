import Textarea from '../../components/Textarea/Textarea'
import {
  TEXTAREA_SIZES,
  TEXTAREA_STATES,
  TEXTAREA_GUIDELINES,
  TEXTAREA_MATRIX_STATES,
  TEXTAREA_MATRIX_COLS,
} from '../../tokens/textarea'
import type { TextareaSize } from '../../tokens/textarea'
import PageHeader from '../../components/docs/PageHeader/PageHeader'
import ShowcaseList, { type ShowcaseRow } from '../../components/docs/ShowcaseList/ShowcaseList'
import Section from '../../components/docs/Section/Section'
import StateMatrix from '../../components/docs/StateMatrix/StateMatrix'
import DemoCard from '../../components/docs/DemoCard/DemoCard'
import CardGrid from '../../components/docs/CardGrid/CardGrid'
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
      <Section
        icon="edit_note"
        title="Estilos de Conteúdo"
        count={2}
        description="O campo exibe dois estados visuais distintos conforme a interação do usuário."
      >
        <CardGrid>
          <DemoCard
            preview={
              <div className={styles.contentPreview}>
                <Textarea label="Label" placeholder="Text here" size="md" />
              </div>
            }
            title="Placeholder"
            description="Campo vazio exibindo o placeholder. Indica o tipo de informação esperada sem comprometer a label."
            previewPad="lg"
          />
          <DemoCard
            preview={
              <div className={styles.contentPreview}>
                <Textarea
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
      <Section icon="straighten" title="Escala de Tamanhos" count={TEXTAREA_SIZES.length}>
        <ShowcaseList
          previewWidth={280}
          rows={TEXTAREA_SIZES.map(
            (s): ShowcaseRow => ({
              id: s.id,
              label: s.label,
              badge: s.recommended ? 'Recomendado' : undefined,
              description: s.description,
              specs: (
                <>
                  <span>
                    font {s.fontSize}px · line {s.lineHeight}px
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
            <Textarea size={row.id as TextareaSize} label="Label" placeholder="Text here" />
          )}
        />
      </Section>

      {/* ── Estados ── */}
      <Section icon="toggle_on" title="Estados" count={TEXTAREA_STATES.length}>
        <StateMatrix
          columns={TEXTAREA_MATRIX_COLS}
          rows={TEXTAREA_MATRIX_STATES}
          align="start"
          renderCell={(state, col) => (
            <Textarea
              size="md"
              label="Label"
              placeholder="Text here"
              defaultValue={col.defaultValue}
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
        <CardGrid wide>
          <DemoCard
            preview={<Textarea label="Label" placeholder="Text here" size="md" />}
            title="Padrão"
            description="Label + campo. Configuração base para a maioria dos formulários."
          />
          <DemoCard
            preview={<Textarea label="Label" optional placeholder="Text here" size="md" />}
            title="Opcional"
            description={
              'Tag "Opcional" à direita da label para sinalizar campos não obrigatórios.'
            }
          />
          <DemoCard
            preview={<Textarea showLabel={false} placeholder="Text here" size="md" />}
            title="Sem label"
            description="Quando o contexto visual torna a label dispensável — ex: campo de anotações isolado."
          />
          <DemoCard
            preview={
              <Textarea
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
              <Textarea
                label="Label"
                placeholder="Text here"
                defaultValue="Text here"
                maxLength={500}
                showCounter
                size="md"
              />
            }
            title="Com contador"
            description="Exibe o número de caracteres restantes. Habilitar somente quando houver um limite máximo definido."
          />
          <DemoCard
            preview={
              <Textarea
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

      {/* ── Diretrizes ── */}
      <Section icon="checklist" title="Diretrizes de Uso">
        <CardGrid wide>
          {TEXTAREA_GUIDELINES.map((g) => (
            <DemoCard key={g.title} title={g.title} description={g.body} />
          ))}
        </CardGrid>
      </Section>
    </div>
  )
}
