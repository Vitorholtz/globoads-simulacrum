import {
  ICON_CATEGORIES,
  ICON_CLASS_TOKENS,
  ICON_FILLED_MODIFIER,
  ICON_GUIDELINES,
  ICON_SIZES,
  ICON_VARIANT_RULES,
  VARIANT_DEMO_ICONS,
} from '../../tokens/icons'
import PageHeader from '../../components/PageHeader/PageHeader'
import SectionHeader from '../../components/SectionHeader/SectionHeader'
import GuidelinesGrid from '../../components/GuidelinesGrid/GuidelinesGrid'
import Section from '../../components/Section/Section'
import styles from './IconsPage.module.css'

const totalCatalogIcons = ICON_CATEGORIES.reduce((acc, c) => acc + c.icons.length, 0)

const SIZE_CLS: Record<number, string> = { 20: 'icon-md', 24: 'icon-lg', 32: 'icon-xl' }

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
          { value: ICON_SIZES.length, label: 'Tamanhos' },
          { value: ICON_CATEGORIES.length, label: 'Categorias' },
        ]}
      />

      {/* ── Biblioteca ── */}
      <section className={styles.section}>
        <SectionHeader icon="library_books" title="Biblioteca" />
        <div className={styles.libraryCard}>
          <div className={styles.libraryInfo}>
            <div className={styles.libraryTitleRow}>
              <h3 className={`type-title-md ${styles.libraryName}`}>Material Symbols</h3>
              <span className={`type-caption-sm ${styles.libraryBadge}`}>Rounded · Regular</span>
            </div>
            <p className={`type-body-md ${styles.libraryDescription}`}>
              Material Symbols é a mais recente geração da biblioteca de ícones do Google,
              construída sobre uma fonte de eixo variável que expõe os eixos FILL, GRAD, opsz e
              wght. O estilo Rounded utiliza pontas e junções arredondadas, conferindo ao sistema
              uma linguagem visual mais amigável e coerente com a identidade Globo Ads.
            </p>
            <div className={styles.libraryAttr}>
              <div className={styles.attrRow}>
                <span className={`type-caption-sm ${styles.attrLabel}`}>Fonte</span>
                <span className={`type-body-md ${styles.attrValue}`}>
                  Google Fonts — Material Symbols Rounded
                </span>
              </div>
              <div className={styles.attrRow}>
                <span className={`type-caption-sm ${styles.attrLabel}`}>Eixo FILL</span>
                <span className={`type-body-md ${styles.attrValue}`}>
                  <code className={`type-caption-sm ${styles.attrCode}`}>FILL 0</code> Outlined
                  &nbsp;·&nbsp;
                  <code className={`type-caption-sm ${styles.attrCode}`}>FILL 1</code> Filled
                </span>
              </div>
              <div className={styles.attrRow}>
                <span className={`type-caption-sm ${styles.attrLabel}`}>Peso</span>
                <span className={`type-body-md ${styles.attrValue}`}>400 — Regular</span>
              </div>
              <div className={styles.attrRow}>
                <span className={`type-caption-sm ${styles.attrLabel}`}>Uso</span>
                <code className={`type-caption-sm ${styles.attrCodeBlock}`}>
                  {'<span class="material-symbols-rounded">icon_name</span>'}
                </code>
              </div>
            </div>
          </div>
          <div className={styles.libraryPreview}>
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
        </div>
      </section>

      {/* ── Variantes ── */}
      <section className={styles.section}>
        <SectionHeader icon="style" title="Variantes" count="2 variantes" />
        <div className={styles.variantsGrid}>
          {ICON_VARIANT_RULES.map((rule) => (
            <div key={rule.variant} className={styles.variantCard}>
              <div className={styles.variantIcons}>
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
              <div className={styles.variantBody}>
                <div className={styles.variantTitleRow}>
                  <h3 className={`type-title-sm ${styles.variantName}`}>{rule.title}</h3>
                  <span className={`type-caption-sm ${styles.variantTagline}`}>{rule.tagline}</span>
                </div>
                <ul className={styles.variantWhen}>
                  {rule.when.map((item) => (
                    <li key={item} className="type-body-md">
                      {item}
                    </li>
                  ))}
                </ul>
                <div className={`type-caption-sm ${styles.variantExamples}`}>{rule.examples}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Tokens de Ícone ── */}
      <section className={styles.section}>
        <SectionHeader
          icon="token"
          title="Tokens de Ícone"
          count={`${ICON_CLASS_TOKENS.length + 1} classes`}
        />

        <div className={styles.tokenUsage}>
          <div className={styles.tokenUsageInfo}>
            <span className={`type-caption-sm ${styles.tokenUsageLabel}`}>Como usar</span>
            <p className={`type-body-md ${styles.tokenUsageText}`}>
              Combine uma classe de tamanho com{' '}
              <code className={`type-caption-sm ${styles.inlineCode}`}>
                material-symbols-rounded
              </code>
              . Para o estado preenchido, adicione{' '}
              <code className={`type-caption-sm ${styles.inlineCode}`}>icon-filled</code> após a
              classe de tamanho.
            </p>
          </div>
          <div className={styles.tokenUsageSnippets}>
            <code className={`type-caption-sm ${styles.tokenSnippet}`}>
              {'<span class="material-symbols-rounded icon-md">home</span>'}
            </code>
            <code className={`type-caption-sm ${styles.tokenSnippet}`}>
              {'<span class="material-symbols-rounded icon-md icon-filled">home</span>'}
            </code>
          </div>
        </div>

        <div className={styles.tokenTable}>
          <div className={styles.tokenTableHead}>
            <span />
            <span className={`type-caption-sm ${styles.tokenHeadCell}`}>Classe</span>
            <span className={`type-caption-sm ${styles.tokenHeadCell}`}>Tamanho</span>
            <span className={`type-caption-sm ${styles.tokenHeadCell}`}>Variável CSS</span>
            <span className={`type-caption-sm ${styles.tokenHeadCell}`}>Descrição</span>
            <span className={`type-caption-sm ${styles.tokenHeadCell}`}>Componentes</span>
          </div>
          {ICON_CLASS_TOKENS.map((token) => (
            <div key={token.className} className={styles.tokenRow}>
              <div className={styles.tokenPreview}>
                <span
                  className={`material-symbols-rounded ${token.className}`}
                  style={{ color: 'var(--color-fill-primary)' }}
                >
                  home
                </span>
              </div>
              <code className={`type-caption-md ${styles.tokenClass}`}>.{token.className}</code>
              <span className={`type-caption-md ${styles.tokenSize}`}>{token.size}px</span>
              <code className={`type-caption-sm ${styles.tokenVar}`}>{token.cssVar}</code>
              <span className={`type-body-md ${styles.tokenDesc}`}>{token.description}</span>
              <span className={`type-caption-sm ${styles.tokenUsedIn}`}>{token.usedIn}</span>
            </div>
          ))}
          <div className={`${styles.tokenRow} ${styles.tokenModifierRow}`}>
            <div className={styles.tokenPreview}>
              <span
                className="material-symbols-rounded icon-md icon-filled"
                style={{ color: 'var(--color-fill-accent)' }}
              >
                home
              </span>
            </div>
            <code className={`type-caption-md ${styles.tokenClass}`}>
              .{ICON_FILLED_MODIFIER.className}
            </code>
            <span className={`type-caption-sm ${styles.tokenModifierBadge}`}>modificador</span>
            <code className={`type-caption-sm ${styles.tokenVar}`}>
              {ICON_FILLED_MODIFIER.cssValue}
            </code>
            <span className={`type-body-md ${styles.tokenDesc}`}>
              {ICON_FILLED_MODIFIER.description}
            </span>
            <span className={`type-caption-sm ${styles.tokenUsedIn}`}>
              {ICON_FILLED_MODIFIER.usedIn}
            </span>
          </div>
        </div>
      </section>

      {/* ── Escala de Tamanhos ── */}
      <section className={styles.section}>
        <SectionHeader
          icon="straighten"
          title="Escala de Tamanhos"
          count={`${ICON_SIZES.length} tamanhos`}
        />
        <div className={styles.sizeScaleContainer}>
          {ICON_SIZES.map((size) => (
            <div key={size.value} className={styles.sizeRow}>
              <div className={styles.sizeIconWrap}>
                <span
                  className={`material-symbols-rounded ${SIZE_CLS[size.value] ?? ''}`}
                  style={
                    SIZE_CLS[size.value]
                      ? { color: 'var(--color-fill-primary)' }
                      : { fontSize: `${size.value}px`, color: 'var(--color-fill-primary)' }
                  }
                >
                  home
                </span>
              </div>
              <div className={styles.sizeMeta}>
                <div className={styles.sizeValueRow}>
                  <span className={`type-caption-md ${styles.sizeLabel}`}>{size.label}</span>
                  {size.recommended && (
                    <span className={`type-caption-sm ${styles.sizeRecommended}`}>Recomendado</span>
                  )}
                </div>
                <span className={`type-body-md ${styles.sizeDescription}`}>{size.description}</span>
              </div>
              <span className={`type-caption-sm ${styles.sizePx}`}>{size.value}px</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── Diretrizes ── */}
      <Section icon="checklist" title="Diretrizes de Uso">
        <GuidelinesGrid items={ICON_GUIDELINES} />
      </Section>

      {/* ── Catálogo ── */}
      <section className={styles.section}>
        <SectionHeader
          icon="apps"
          title="Catálogo de Referência"
          count={`${totalCatalogIcons} ícones`}
        />
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
              <span className={`type-caption-sm ${styles.categoryCount}`}>
                {category.icons.length}
              </span>
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
      </section>
    </div>
  )
}
