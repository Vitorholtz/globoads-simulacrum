import {
  ICON_CATEGORIES,
  ICON_GUIDELINES,
  ICON_SIZES,
  ICON_VARIANT_RULES,
  VARIANT_DEMO_ICONS,
} from '../../tokens/icons'
import { fvar, FVAR_OUTLINED_MD, FVAR_FILLED_MD } from '../../utils/iconVariation'
import PageHeader from '../../components/PageHeader/PageHeader'
import SectionHeader from '../../components/SectionHeader/SectionHeader'
import styles from './IconsPage.module.css'

const totalCatalogIcons = ICON_CATEGORIES.reduce((acc, c) => acc + c.icons.length, 0)

const GUIDELINE_ICONS: Record<string, string> = {
  'Consistência de variante': 'tune',
  'Tamanho mínimo e toque': 'touch_app',
  'Espaçamento com texto': 'format_align_left',
  'Cor e semântica de estado': 'palette',
}

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
              <h3 className={styles.libraryName}>Material Symbols</h3>
              <span className={styles.libraryBadge}>Rounded · Regular</span>
            </div>
            <p className={styles.libraryDescription}>
              Material Symbols é a mais recente geração da biblioteca de ícones do Google,
              construída sobre uma fonte de eixo variável que expõe os eixos FILL, GRAD, opsz
              e wght. O estilo Rounded utiliza pontas e junções arredondadas, conferindo ao
              sistema uma linguagem visual mais amigável e coerente com a identidade Globo Ads.
            </p>
            <div className={styles.libraryAttr}>
              <div className={styles.attrRow}>
                <span className={styles.attrLabel}>Fonte</span>
                <span className={styles.attrValue}>Google Fonts — Material Symbols Rounded</span>
              </div>
              <div className={styles.attrRow}>
                <span className={styles.attrLabel}>Eixo FILL</span>
                <span className={styles.attrValue}>
                  <code className={styles.attrCode}>FILL 0</code> Outlined &nbsp;·&nbsp;
                  <code className={styles.attrCode}>FILL 1</code> Filled
                </span>
              </div>
              <div className={styles.attrRow}>
                <span className={styles.attrLabel}>Peso</span>
                <span className={styles.attrValue}>400 — Regular</span>
              </div>
              <div className={styles.attrRow}>
                <span className={styles.attrLabel}>Uso</span>
                <code className={styles.attrCodeBlock}>
                  {'<span class="material-symbols-rounded">icon_name</span>'}
                </code>
              </div>
            </div>
          </div>
          <div className={styles.libraryPreview}>
            {['home', 'search', 'notifications', 'bookmark', 'settings', 'edit', 'share', 'star'].map((icon) => (
              <span
                key={icon}
                className="material-symbols-rounded"
                style={{ fontSize: '36px', fontVariationSettings: FVAR_OUTLINED_MD }}
              >
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
                    className="material-symbols-rounded"
                    style={{
                      fontSize: '32px',
                      fontVariationSettings: fvar(rule.variant === 'filled' ? 1 : 0, 24),
                      color: 'var(--color-text-primary)',
                    }}
                  >
                    {icon}
                  </span>
                ))}
              </div>
              <div className={styles.variantBody}>
                <div className={styles.variantTitleRow}>
                  <h3 className={styles.variantName}>{rule.title}</h3>
                  <span className={styles.variantTagline}>{rule.tagline}</span>
                </div>
                <ul className={styles.variantWhen}>
                  {rule.when.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
                <div className={styles.variantExamples}>{rule.examples}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Escala de Tamanhos ── */}
      <section className={styles.section}>
        <SectionHeader icon="straighten" title="Escala de Tamanhos" count={`${ICON_SIZES.length} tamanhos`} />
        <div className={styles.sizeScaleContainer}>
          {ICON_SIZES.map((size) => (
            <div key={size.value} className={styles.sizeRow}>
              <div className={styles.sizeIconWrap}>
                <span
                  className="material-symbols-rounded"
                  style={{
                    fontSize: `${size.value}px`,
                    fontVariationSettings: fvar(0, size.value),
                    color: 'var(--color-text-primary)',
                  }}
                >
                  home
                </span>
              </div>
              <div className={styles.sizeMeta}>
                <div className={styles.sizeValueRow}>
                  <span className={styles.sizeLabel}>{size.label}</span>
                  {size.recommended && (
                    <span className={styles.sizeRecommended}>Recomendado</span>
                  )}
                </div>
                <span className={styles.sizeDescription}>{size.description}</span>
              </div>
              <span className={styles.sizePx}>{size.value}px</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── Diretrizes ── */}
      <section className={styles.section}>
        <SectionHeader icon="checklist" title="Diretrizes de Uso" />
        <div className={styles.guidelinesGrid}>
          {ICON_GUIDELINES.map((g) => (
            <div key={g.title} className={styles.guidelineCard}>
              <div className={styles.guidelineIconWrap}>
                <span
                  className="material-symbols-rounded"
                  style={{ fontSize: '20px', fontVariationSettings: FVAR_OUTLINED_MD, color: 'var(--color-text-tertiary)' }}
                >
                  {GUIDELINE_ICONS[g.title] ?? 'info'}
                </span>
              </div>
              <h3 className={styles.guidelineTitle}>{g.title}</h3>
              <p className={styles.guidelineBody}>{g.body}</p>
              <div className={styles.guidelineRule}>{g.rule}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Catálogo ── */}
      <section className={styles.section}>
        <SectionHeader icon="apps" title="Catálogo de Referência" count={`${totalCatalogIcons} ícones`} />
        <p className={styles.catalogNote}>
          Cada célula exibe o ícone nas duas variantes: Outlined à esquerda e Filled à direita.
        </p>
        {ICON_CATEGORIES.map((category) => (
          <div key={category.id} className={styles.categorySection}>
            <div className={styles.categoryHeader}>
              <h3 className={styles.categoryName}>{category.name}</h3>
              <span className={styles.categoryDesc}>{category.description}</span>
              <span className={styles.categoryCount}>{category.icons.length}</span>
            </div>
            <div className={styles.iconGrid}>
              {category.icons.map((icon) => (
                <div key={icon.name} className={styles.iconCell}>
                  <div className={styles.iconPair}>
                    <span
                      className="material-symbols-rounded"
                      style={{ fontSize: '22px', fontVariationSettings: FVAR_OUTLINED_MD, color: 'var(--color-text-secondary)' }}
                    >
                      {icon.name}
                    </span>
                    <span
                      className="material-symbols-rounded"
                      style={{ fontSize: '22px', fontVariationSettings: FVAR_FILLED_MD, color: 'var(--color-text-primary)' }}
                    >
                      {icon.name}
                    </span>
                  </div>
                  <span className={styles.iconName}>{icon.label}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>
    </div>
  )
}
