import TextField from '../../components/TextField/TextField'
import {
  TEXT_FIELD_SIZES,
  TEXT_FIELD_STATES,
  TEXT_FIELD_GUIDELINES,
  TEXT_FIELD_MATRIX_STATES,
  TEXT_FIELD_MATRIX_COLS,
  TEXT_FIELD_MASKS,
} from '../../tokens/textField'
import type { TextFieldSize } from '../../tokens/textField'
import PageHeader from '../../components/docs/PageHeader/PageHeader'
import GuidelinesGrid from '../../components/docs/GuidelinesGrid/GuidelinesGrid'
import Section from '../../components/docs/Section/Section'
import StateMatrix from '../../components/docs/StateMatrix/StateMatrix'
import ShowcaseList from '../../components/docs/ShowcaseList/ShowcaseList'
import type { ShowcaseRow } from '../../components/docs/ShowcaseList/ShowcaseList'
import DemoCard from '../../components/docs/DemoCard/DemoCard'
import CardGrid from '../../components/docs/CardGrid/CardGrid'
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
        <CardGrid>
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
        <ShowcaseList
          previewWidth={280}
          rows={TEXT_FIELD_SIZES.map(
            (s): ShowcaseRow => ({
              id: s.id,
              label: s.label,
              badge: s.recommended ? 'Recomendado' : undefined,
              description: s.description,
              specs: (
                <>
                  font {s.fontSize}px · icon {s.iconSize}px
                  <br />
                  py {s.paddingY}px · px {s.paddingX}px
                </>
              ),
            })
          )}
          renderPreview={(row) => {
            return (
              <TextField
                size={row.id as TextFieldSize}
                label="Label"
                placeholder="Text here"
                leadingIcon="search"
              />
            )
          }}
        />
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
        count={8}
        description="Combinações de props que cobrem os cenários mais comuns de formulários."
      >
        <CardGrid wide>
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
          <DemoCard
            preview={
              <TextField
                type="password"
                label="Senha"
                leadingIcon="lock"
                placeholder="Digite sua senha"
                defaultValue="MinhaSenha123"
                size="md"
              />
            }
            title="Mostrar/Ocultar senha"
            description="Ícone à direita alterna a visibilidade do conteúdo. Use em criação de conta, login e alteração de senha."
          />
          <DemoCard
            preview={
              <TextField
                label="Link de compartilhamento"
                leadingIcon="link"
                mask="url"
                copyable
                defaultValue="https://globo.com/ads/campanha-123"
                size="md"
              />
            }
            title="Copiar conteúdo"
            description="Ícone à direita copia o valor do campo para a área de transferência e confirma com um Toast. Útil em URLs e links."
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
                <TextField
                  label={m.label}
                  placeholder={m.placeholder}
                  mask={m.id}
                  copyable={m.id === 'url'}
                  size="md"
                />
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
