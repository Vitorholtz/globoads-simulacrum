import {
  ICON_CATEGORIES,
  ICON_CLASS_TOKENS,
  ICON_FILLED_MODIFIER,
  ICON_GUIDELINES,
  ICON_VARIANT_RULES,
  VARIANT_DEMO_ICONS,
} from '../../tokens/icons'
import PageHeader from '../../components/docs/PageHeader/PageHeader'
import GuidelinesGrid from '../../components/docs/GuidelinesGrid/GuidelinesGrid'
import Section from '../../components/docs/Section/Section'
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
      </Section>

      {/* ── Variantes ── */}
      <Section icon="style" title="Variantes" count={ICON_VARIANT_RULES.length}>
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
      </Section>

      {/* ── Tokens de Ícone ── */}
      <Section icon="token" title="Tokens de Ícone" count={ICON_CLASS_TOKENS.length + 1}>
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
              <div className={styles.tokenSizeCell}>
                <span className={`type-caption-md ${styles.tokenSize}`}>{token.size}px</span>
              </div>
              <code className={`type-caption-sm ${styles.tokenVar}`}>{token.cssVar}</code>
              <span className={`type-body-sm ${styles.tokenDesc}`}>{token.description}</span>
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
            <span className={`type-body-sm ${styles.tokenDesc}`}>
              {ICON_FILLED_MODIFIER.description}
            </span>
            <span className={`type-caption-sm ${styles.tokenUsedIn}`}>
              {ICON_FILLED_MODIFIER.usedIn}
            </span>
          </div>
        </div>
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
      </Section>

      {/* ── Diretrizes ── */}
      <Section icon="checklist" title="Diretrizes de Uso">
        <GuidelinesGrid items={ICON_GUIDELINES} />
      </Section>
    </div>
  )
}
