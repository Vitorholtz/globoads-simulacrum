import {
  ICON_CATEGORIES,
  ICON_CLASS_TOKENS,
  ICON_FILLED_MODIFIER,
  ICON_GUIDELINES,
  ICON_VARIANT_RULES,
  VARIANT_DEMO_ICONS,
} from '../../tokens/icons'
import DocBadge from '../../components/docs/DocBadge/DocBadge'
import PageHeader from '../../components/docs/PageHeader/PageHeader'
import CardGrid from '../../components/docs/CardGrid/CardGrid'
import DocTable from '../../components/docs/DocTable/DocTable'
import Section from '../../components/docs/Section/Section'
import DemoCard from '../../components/docs/DemoCard/DemoCard'
import InfoCard from '../../components/docs/InfoCard/InfoCard'
import styles from './IconsPage.module.css'

const totalCatalogIcons = ICON_CATEGORIES.reduce((acc, c) => acc + c.icons.length, 0)

export default function IconsPage() {
  return (
    <div>
      <PageHeader
        breadcrumb="Foundation"
        title="Iconography"
        subtitle="O Globo Ads Design System utiliza Material Symbols como conjunto oficial de ícones — biblioteca do Google com mais de 2.500 símbolos no estilo Rounded. Duas variantes estruturam os estados de interface: Outlined para o estado padrão e Filled para estados ativos, selecionados e de alta ênfase."
        stats={[
          { value: '2500+', label: 'Ícones' },
          { value: 2, label: 'Variantes' },
          { value: ICON_CLASS_TOKENS.length, label: 'Tamanhos' },
          { value: ICON_CATEGORIES.length, label: 'Categorias' },
        ]}
      />

      {/* ── Biblioteca ── */}
      <Section icon="library_books" title="Biblioteca">
        <InfoCard
          previewPosition="right"
          title="Material Symbols"
          badge="Rounded · Regular"
          description="Material Symbols é a mais recente geração da biblioteca de ícones do Google, construída sobre uma fonte de eixo variável que expõe os eixos FILL, GRAD, opsz e wght. O estilo Rounded utiliza pontas e junções arredondadas, conferindo ao sistema uma linguagem visual mais amigável e coerente com a identidade Globo Ads."
          specs={[
            { label: 'Fonte', value: 'Google Fonts — Material Symbols Rounded' },
            {
              label: 'Eixo FILL',
              value: (
                <span className={styles.pillGroup}>
                  <DocBadge size="md" className={`type-caption-sm ${styles.pill}`}>
                    <span className={`type-caption-sm font-code ${styles.pillCode}`}>FILL 0</span>
                    Outlined
                  </DocBadge>
                  <DocBadge size="md" className={`type-caption-sm ${styles.pill}`}>
                    <span className={`type-caption-sm font-code ${styles.pillCode}`}>FILL 1</span>
                    Filled
                  </DocBadge>
                </span>
              ),
            },
            {
              label: 'Peso',
              value: (
                <DocBadge size="md" className={`type-caption-sm ${styles.pill}`}>
                  <span className={`type-caption-sm font-code ${styles.pillCode}`}>400</span>
                  Regular
                </DocBadge>
              ),
            },
            {
              label: 'Uso',
              value: (
                <DocBadge size="md" className="type-caption-sm font-code">
                  {'<span class="material-symbols-rounded">icon_name</span>'}
                </DocBadge>
              ),
            },
          ]}
          preview={
            <div className={styles.iconPreviewGrid}>
              {[
                'home',
                'search',
                'notifications',
                'bookmark',
                'settings',
                'edit',
                'share',
                'star',
              ].map((icon) => (
                <span key={icon} className="material-symbols-rounded icon-xl">
                  {icon}
                </span>
              ))}
            </div>
          }
        />
      </Section>

      {/* ── Variantes ── */}
      <Section icon="style" title="Variantes" count={ICON_VARIANT_RULES.length}>
        <CardGrid>
          {ICON_VARIANT_RULES.map((rule) => (
            <DemoCard
              key={rule.variant}
              preview={
                <div style={{ display: 'flex', gap: 'var(--spacing-200)' }}>
                  {VARIANT_DEMO_ICONS.map((icon) => (
                    <span
                      key={icon}
                      className={`material-symbols-rounded icon-xl${rule.variant === 'filled' ? ' icon-filled' : ''}`}
                      style={{ color: 'var(--color-fill-primary)' }}
                    >
                      {icon}
                    </span>
                  ))}
                </div>
              }
              title={rule.title}
              badge={rule.tagline}
            />
          ))}
        </CardGrid>
      </Section>

      {/* ── Tokens de Ícone ── */}
      <Section icon="token" title="Tokens de Ícone" count={ICON_CLASS_TOKENS.length + 1}>
        <DocTable
          columns={[
            { key: 'preview', label: '' },
            { key: 'class', label: 'Classe' },
            { key: 'size', label: 'Tamanho' },
            { key: 'variable', label: 'Variável CSS' },
            { key: 'description', label: 'Descrição' },
          ]}
          rows={[
            ...ICON_CLASS_TOKENS.map((token) => ({
              preview: (
                <span
                  className={`material-symbols-rounded ${token.className}`}
                  style={{ color: 'var(--color-fill-primary)' }}
                >
                  home
                </span>
              ),
              class: (
                <code className={`type-caption-md ${styles.tokenClass}`}>.{token.className}</code>
              ),
              size: <span className="type-caption-md">{token.size}px</span>,
              variable: (
                <DocBadge variant="accent" className="type-caption-sm font-code">
                  {token.cssVar}
                </DocBadge>
              ),
              description: token.description,
            })),
            {
              preview: (
                <span
                  className="material-symbols-rounded icon-md icon-filled"
                  style={{ color: 'var(--color-fill-accent)' }}
                >
                  home
                </span>
              ),
              class: (
                <code className={`type-caption-md ${styles.tokenClass}`}>
                  .{ICON_FILLED_MODIFIER.className}
                </code>
              ),
              size: <DocBadge className="type-caption-sm">modificador</DocBadge>,
              variable: (
                <DocBadge variant="accent" className="type-caption-sm font-code">
                  {ICON_FILLED_MODIFIER.cssValue}
                </DocBadge>
              ),
              description: ICON_FILLED_MODIFIER.description,
            },
          ]}
        />
      </Section>

      {/* ── Catálogo ── */}
      <Section icon="apps" title="Catálogo de Referência" count={totalCatalogIcons}>
        <p className={`type-body-md ${styles.catalogNote}`}>
          Cada célula exibe o ícone nas duas variantes: Outlined à esquerda e Filled à direita.
        </p>
        {ICON_CATEGORIES.map((category) => (
          <div key={category.id} className={styles.categorySection}>
            <div className={styles.categoryHeader}>
              <h3 className={`type-caption-md ${styles.categoryName}`}>{category.name}</h3>
              <span className={`type-caption-sm ${styles.categoryDesc}`}>
                {category.description}
              </span>
              <DocBadge className={`type-caption-sm ${styles.categoryCount}`}>
                {category.icons.length}
              </DocBadge>
            </div>
            <div className={styles.iconGrid}>
              {category.icons.map((icon) => (
                <div key={icon.name} className={styles.iconCell}>
                  <div className={styles.iconPair}>
                    <span
                      className="material-symbols-rounded icon-lg"
                      style={{ color: 'var(--color-fill-secondary)' }}
                    >
                      {icon.name}
                    </span>
                    <span
                      className="material-symbols-rounded icon-lg icon-filled"
                      style={{ color: 'var(--color-fill-primary)' }}
                    >
                      {icon.name}
                    </span>
                  </div>
                  <span className={`type-caption-xs ${styles.iconName}`}>{icon.label}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </Section>

      {/* ── Diretrizes ── */}
      <Section icon="checklist" title="Diretrizes de Uso">
        <CardGrid wide>
          {ICON_GUIDELINES.map((g) => (
            <DemoCard key={g.title} title={g.title} description={g.body} />
          ))}
        </CardGrid>
      </Section>
    </div>
  )
}
