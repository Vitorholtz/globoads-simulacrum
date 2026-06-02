import Button from '../../components/Button/Button'
import {
  BUTTON_VARIANTS,
  BUTTON_SIZES,
  BUTTON_STATES,
  BUTTON_GUIDELINES,
  BUTTON_MATRIX_STATES,
  DANGER_BUTTON_VARIANTS,
  DANGER_BUTTON_GUIDELINES,
} from '../../tokens/buttons'
import type { ButtonVariant, ButtonSize } from '../../tokens/buttons'
import PageHeader from '../../components/PageHeader/PageHeader'
import GuidelinesGrid from '../../components/GuidelinesGrid/GuidelinesGrid'
import Section from '../../components/Section/Section'
import StateMatrix from '../../components/StateMatrix/StateMatrix'
import DemoCard from '../../components/DemoCard/DemoCard'
import CardGrid from '../../components/CardGrid/CardGrid'
import styles from './ButtonPage.module.css'

type MatrixCol = {
  id: string
  label: string
  iconLeft: string | undefined
  iconRight: string | undefined
  children: string | undefined
}

type ContentDemo = {
  label: string
  iconLeft: string | undefined
  iconRight: string | undefined
  children: string | undefined
  desc: string
}

const CONTENT_DEMOS: Record<'default' | 'danger', ContentDemo[]> = {
  default: [
    {
      label: 'Text only',
      iconLeft: undefined,
      iconRight: undefined,
      children: 'Button',
      desc: 'Label sem ícone. Use quando a label é suficientemente descritiva.',
    },
    {
      label: 'Icon left',
      iconLeft: 'add',
      iconRight: undefined,
      children: 'Button',
      desc: 'Ícone reforça a natureza da ação. Posição recomendada por padrão.',
    },
    {
      label: 'Icon right',
      iconLeft: undefined,
      iconRight: 'arrow_forward',
      children: 'Button',
      desc: 'Ícone indica destino ou consequência (navegação, link externo).',
    },
    {
      label: 'Icon only',
      iconLeft: 'add',
      iconRight: undefined,
      children: undefined,
      desc: 'Apenas ícone. Exige tooltip para garantir acessibilidade.',
    },
  ],
  danger: [
    {
      label: 'Text only',
      iconLeft: undefined,
      iconRight: undefined,
      children: 'Button',
      desc: 'Label sem ícone. Use quando a label é suficientemente descritiva do risco.',
    },
    {
      label: 'Icon left',
      iconLeft: 'delete',
      iconRight: undefined,
      children: 'Button',
      desc: 'Ícone reforça a natureza destrutiva da ação. Posição recomendada por padrão.',
    },
    {
      label: 'Icon right',
      iconLeft: undefined,
      iconRight: 'arrow_forward',
      children: 'Button',
      desc: 'Ícone indica consequência ou próxima etapa de uma ação destrutiva.',
    },
    {
      label: 'Icon only',
      iconLeft: 'delete',
      iconRight: undefined,
      children: undefined,
      desc: 'Apenas ícone. Exige tooltip — especialmente crítico em ações destrutivas.',
    },
  ],
}

interface ButtonVariantPageProps {
  isDanger?: boolean
}

export default function ButtonPage({ isDanger = false }: ButtonVariantPageProps) {
  const VARIANTS = isDanger ? DANGER_BUTTON_VARIANTS : BUTTON_VARIANTS
  const GUIDELINES = isDanger ? DANGER_BUTTON_GUIDELINES : BUTTON_GUIDELINES
  const contentDemo = CONTENT_DEMOS[isDanger ? 'danger' : 'default']
  const matrixIcon = isDanger ? 'delete' : 'add'

  const matrixCols: MatrixCol[] = [
    {
      id: 'text-only',
      label: 'Text only',
      iconLeft: undefined,
      iconRight: undefined,
      children: 'Button',
    },
    {
      id: 'icon-left',
      label: 'Icon left',
      iconLeft: matrixIcon,
      iconRight: undefined,
      children: 'Button',
    },
    {
      id: 'icon-right',
      label: 'Icon right',
      iconLeft: undefined,
      iconRight: 'arrow_forward',
      children: 'Button',
    },
    {
      id: 'icon-only',
      label: 'Icon only',
      iconLeft: matrixIcon,
      iconRight: undefined,
      children: undefined,
    },
  ]

  return (
    <div>
      <PageHeader
        breadcrumb="Components"
        title={isDanger ? 'Button · Danger' : 'Button'}
        subtitle={
          isDanger
            ? 'Botões Danger comunicam ações destrutivas e irreversíveis. Seguem a mesma estrutura dos botões de ação — mesmos tamanhos, estados e configurações de conteúdo — mas aplicam a paleta crítica do Design System para sinalizar risco ao usuário.'
            : 'Botões comunicam ações que o usuário pode executar. São o principal elemento de interação em formulários, modais, toolbars e fluxos de produto. Existem em três variantes de ênfase, três tamanhos e quatro configurações de conteúdo.'
        }
        stats={[
          { value: 3, label: 'Variantes' },
          { value: 3, label: 'Tamanhos' },
          { value: BUTTON_STATES.length, label: 'Estados' },
          { value: 4, label: 'Conteúdos' },
        ]}
      />

      {/* ── Variantes ── */}
      <Section
        icon="style"
        title="Variantes"
        count={3}
        description="Cada variante comunica um nível de ênfase diferente. Use apenas uma variante Primary por tela."
      >
        <CardGrid cols={3}>
          {VARIANTS.map((v) => (
            <div key={v.id} className={styles.variantCard}>
              <div className={styles.variantPreview}>
                <Button variant={v.id} size="md" danger={isDanger}>
                  Button
                </Button>
                <Button variant={v.id} size="md" iconLeft={matrixIcon} danger={isDanger}>
                  Button
                </Button>
                <Button variant={v.id} size="md" iconRight="arrow_forward" danger={isDanger}>
                  Button
                </Button>
                <Button variant={v.id} size="md" iconLeft={matrixIcon} danger={isDanger} />
              </div>
              <div className={styles.variantBody}>
                <div className={styles.variantTitleRow}>
                  <h3 className={`type-title-sm ${styles.variantName}`}>{v.name}</h3>
                  <span className={`type-caption-sm ${styles.variantTagline}`}>{v.tagline}</span>
                </div>
                <p className={`type-body-md ${styles.variantDesc}`}>{v.description}</p>
                <ul className={styles.variantWhen}>
                  {v.when.map((item) => (
                    <li key={item} className="type-body-md">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </CardGrid>
      </Section>

      {/* ── Escala de Tamanhos ── */}
      <Section icon="straighten" title="Escala de Tamanhos" count={BUTTON_SIZES.length}>
        <div className={styles.sizeScaleContainer}>
          {BUTTON_SIZES.map((s) => (
            <div key={s.id} className={styles.sizeRow}>
              <div className={styles.sizePreview}>
                <Button
                  variant="primary"
                  size={s.id as ButtonSize}
                  iconLeft={matrixIcon}
                  danger={isDanger}
                >
                  Button
                </Button>
              </div>
              <div className={styles.sizeMeta}>
                <div className={styles.sizeValueRow}>
                  <span className={`type-caption-md ${styles.sizeLabel}`}>{s.label}</span>
                  {s.recommended && (
                    <span className={`type-caption-sm ${styles.sizeRecommended}`}>Recomendado</span>
                  )}
                </div>
                <span className={`type-body-md ${styles.sizeDescription}`}>{s.description}</span>
              </div>
              <div className={`type-caption-sm ${styles.sizeSpecs}`}>
                <span>
                  font {s.fontSize}px · icon {s.iconSize}px
                </span>
                <br />
                <span>
                  py {s.paddingY}px · px {s.paddingX}px · gap {s.gap}px
                </span>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* ── Estados ── */}
      <Section icon="toggle_on" title="Estados" count={BUTTON_STATES.length}>
        {VARIANTS.map((v) => (
          <StateMatrix
            key={v.id}
            columns={matrixCols}
            rows={BUTTON_MATRIX_STATES}
            group
            header={{ name: v.name, description: v.tagline }}
            labelWidth={96}
            cellPad="sm"
            renderCell={(state, col) => (
              <Button
                variant={v.id as ButtonVariant}
                size="md"
                iconLeft={col.iconLeft}
                iconRight={col.iconRight}
                forceState={state.force}
                danger={isDanger}
              >
                {col.children}
              </Button>
            )}
          />
        ))}
      </Section>

      {/* ── Configurações de Conteúdo ── */}
      <Section
        icon="format_shapes"
        title="Configurações de Conteúdo"
        count={4}
        description="Combinações de label e ícone que cobrem todos os cenários de uso."
      >
        <CardGrid cols={4}>
          {contentDemo.map((c) => (
            <DemoCard
              key={c.label}
              preview={
                <Button
                  variant="primary"
                  size="md"
                  iconLeft={c.iconLeft}
                  iconRight={c.iconRight}
                  danger={isDanger}
                >
                  {c.children}
                </Button>
              }
              title={c.label}
              description={c.desc}
            />
          ))}
        </CardGrid>
      </Section>

      {/* ── Diretrizes ── */}
      <Section icon="checklist" title="Diretrizes de Uso">
        <GuidelinesGrid items={GUIDELINES} />
      </Section>
    </div>
  )
}
