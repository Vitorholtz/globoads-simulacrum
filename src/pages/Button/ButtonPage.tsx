import Button from '../../components/Button/Button'
import {
  BUTTON_VARIANTS, BUTTON_SIZES, BUTTON_STATES, BUTTON_GUIDELINES,
  DANGER_BUTTON_VARIANTS, DANGER_BUTTON_GUIDELINES,
} from '../../tokens/buttons'
import type { ButtonVariant, ButtonSize } from '../../tokens/buttons'
import PageHeader from '../../components/PageHeader/PageHeader'
import SectionHeader from '../../components/SectionHeader/SectionHeader'
import styles from './ButtonPage.module.css'

type ForceState = 'hover' | 'focus' | 'active' | 'disabled' | 'loading' | undefined

type MatrixCell = {
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

const MATRIX_STATES: { id: string; label: string; force: ForceState }[] = [
  { id: 'normal',   label: 'Normal',   force: undefined },
  { id: 'hover',    label: 'Hover',    force: 'hover' },
  { id: 'focus',    label: 'Focus',    force: 'focus' },
  { id: 'active',   label: 'Active',   force: 'active' },
  { id: 'disabled', label: 'Disabled', force: 'disabled' },
  { id: 'loading',  label: 'Loading',  force: 'loading' },
]

const CONTENT_DEMOS: Record<'default' | 'danger', ContentDemo[]> = {
  default: [
    { label: 'Text only',  iconLeft: undefined,  iconRight: undefined,        children: 'Button',   desc: 'Label sem ícone. Use quando a label é suficientemente descritiva.' },
    { label: 'Icon left',  iconLeft: 'add',      iconRight: undefined,        children: 'Button',   desc: 'Ícone reforça a natureza da ação. Posição recomendada por padrão.' },
    { label: 'Icon right', iconLeft: undefined,  iconRight: 'arrow_forward',  children: 'Button',   desc: 'Ícone indica destino ou consequência (navegação, link externo).' },
    { label: 'Icon only',  iconLeft: 'add',      iconRight: undefined,        children: undefined,  desc: 'Apenas ícone. Exige tooltip para garantir acessibilidade.' },
  ],
  danger: [
    { label: 'Text only',  iconLeft: undefined,  iconRight: undefined,        children: 'Button',   desc: 'Label sem ícone. Use quando a label é suficientemente descritiva do risco.' },
    { label: 'Icon left',  iconLeft: 'delete',   iconRight: undefined,        children: 'Button',   desc: 'Ícone reforça a natureza destrutiva da ação. Posição recomendada por padrão.' },
    { label: 'Icon right', iconLeft: undefined,  iconRight: 'arrow_forward',  children: 'Button',   desc: 'Ícone indica consequência ou próxima etapa de uma ação destrutiva.' },
    { label: 'Icon only',  iconLeft: 'delete',   iconRight: undefined,        children: undefined,  desc: 'Apenas ícone. Exige tooltip — especialmente crítico em ações destrutivas.' },
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

  const matrixContent: MatrixCell[] = [
    { label: 'Text only',  iconLeft: undefined,    iconRight: undefined,       children: 'Button' },
    { label: 'Icon left',  iconLeft: matrixIcon,   iconRight: undefined,       children: 'Button' },
    { label: 'Icon right', iconLeft: undefined,    iconRight: 'arrow_forward', children: 'Button' },
    { label: 'Icon only',  iconLeft: matrixIcon,   iconRight: undefined,       children: undefined },
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
          { value: 6, label: 'Estados' },
          { value: 4, label: 'Conteúdos' },
        ]}
      />

      {/* ── Variantes ── */}
      <section className={styles.section}>
        <SectionHeader icon="style" title="Variantes" count="3 variantes" />
        <div className={styles.variantsGrid}>
          {VARIANTS.map((v) => (
            <div key={v.id} className={styles.variantCard}>
              <div className={styles.variantPreview}>
                <Button variant={v.id} size="md" danger={isDanger}>Button</Button>
                <Button variant={v.id} size="md" iconLeft={matrixIcon} danger={isDanger}>Button</Button>
                <Button variant={v.id} size="md" iconRight="arrow_forward" danger={isDanger}>Button</Button>
                <Button variant={v.id} size="md" iconLeft={matrixIcon} danger={isDanger} />
              </div>
              <div className={styles.variantBody}>
                <div className={styles.variantTitleRow}>
                  <h3 className={styles.variantName}>{v.name}</h3>
                  <span className={styles.variantTagline}>{v.tagline}</span>
                </div>
                <p className={styles.variantDesc}>{v.description}</p>
                <ul className={styles.variantWhen}>
                  {v.when.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Escala de Tamanhos ── */}
      <section className={styles.section}>
        <SectionHeader icon="straighten" title="Escala de Tamanhos" count={`${BUTTON_SIZES.length} tamanhos`} />
        <div className={styles.sizeScaleContainer}>
          {BUTTON_SIZES.map((s) => (
            <div key={s.id} className={styles.sizeRow}>
              <div className={styles.sizePreview}>
                <Button variant="primary" size={s.id as ButtonSize} iconLeft={matrixIcon} danger={isDanger}>Button</Button>
              </div>
              <div className={styles.sizeMeta}>
                <div className={styles.sizeValueRow}>
                  <span className={styles.sizeLabel}>{s.label}</span>
                  {s.recommended && (
                    <span className={styles.sizeRecommended}>Recomendado</span>
                  )}
                </div>
                <span className={styles.sizeDescription}>{s.description}</span>
              </div>
              <div className={styles.sizeSpecs}>
                <span>font {s.fontSize}px · icon {s.iconSize}px</span><br />
                <span>py {s.paddingY}px · px {s.paddingX}px · gap {s.gap}px</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Estados ── */}
      <section className={styles.section}>
        <SectionHeader icon="toggle_on" title="Estados" count={`${BUTTON_STATES.length} estados`} />
        {VARIANTS.map((v) => (
          <div key={v.id} className={styles.stateMatrixContainer}>
            <div className={styles.matrixVariantHeader}>
              <span className={styles.matrixVariantName}>{v.name}</span>
              <span className={styles.matrixVariantTagline}>— {v.tagline}</span>
            </div>
            <div className={styles.matrixHeaderRow}>
              <div className={styles.matrixHeaderSpacer} />
              {matrixContent.map((c) => (
                <div key={c.label} className={styles.matrixCellLabel}>{c.label}</div>
              ))}
            </div>
            {MATRIX_STATES.map((state) => (
              <div key={state.id} className={styles.matrixRow}>
                <div className={styles.matrixStateLabel}>
                  <span className={styles.matrixStateName}>{state.label}</span>
                </div>
                <div className={styles.matrixCells}>
                  {matrixContent.map((c) => (
                    <div key={c.label} className={styles.matrixCell}>
                      <Button
                        variant={v.id as ButtonVariant}
                        size="md"
                        iconLeft={c.iconLeft}
                        iconRight={c.iconRight}
                        forceState={state.force}
                        danger={isDanger}
                      >
                        {c.children}
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ))}
      </section>

      {/* ── Conteúdo e Ícones ── */}
      <section className={styles.section}>
        <SectionHeader icon="format_shapes" title="Configurações de Conteúdo" count="4 configurações" />
        <div className={styles.contentGrid}>
          {contentDemo.map((c) => (
            <div key={c.label} className={styles.contentCard}>
              <div className={styles.contentPreview}>
                <Button
                  variant="primary"
                  size="md"
                  iconLeft={c.iconLeft}
                  iconRight={c.iconRight}
                  danger={isDanger}
                >
                  {c.children}
                </Button>
              </div>
              <div className={styles.contentBody}>
                <span className={styles.contentName}>{c.label}</span>
                <span className={styles.contentDesc}>{c.desc}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Diretrizes ── */}
      <section className={styles.section}>
        <SectionHeader icon="checklist" title="Diretrizes de Uso" />
        <div className={styles.guidelinesGrid}>
          {GUIDELINES.map((g) => (
            <div key={g.title} className={styles.guidelineCard}>
              <h3 className={styles.guidelineTitle}>{g.title}</h3>
              <p className={styles.guidelineBody}>{g.body}</p>
              <div className={styles.guidelineRule}>{g.rule}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
