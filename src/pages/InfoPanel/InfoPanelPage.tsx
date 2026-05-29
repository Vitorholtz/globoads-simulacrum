import InfoPanel from '../../components/InfoPanel/InfoPanel'
import PageHeader from '../../components/PageHeader/PageHeader'
import SectionHeader from '../../components/SectionHeader/SectionHeader'
import {
  INFO_PANEL_VARIANTS,
  INFO_PANEL_CONTENT_VARIANTS,
  INFO_PANEL_GUIDELINES,
} from '../../tokens/infoPanel'
import styles from './InfoPanelPage.module.css'

export default function InfoPanelPage() {
  return (
    <div>
      <PageHeader
        breadcrumb="Alerts"
        title="Info Panel"
        subtitle="Info Panel é utilizado para destacar informações importantes, fornecer contexto adicional ou exibir dicas úteis. Ele aparece impresso na tela e não desaparece automaticamente — permanece visível enquanto a condição que o originou persistir."
        stats={[
          { value: 4, label: 'Variantes' },
          { value: 3, label: 'Combinações de conteúdo' },
          { value: 4, label: 'Diretrizes' },
        ]}
      />

      {/* ── Componente ── */}
      <section className={styles.section}>
        <SectionHeader icon="info" title="Componente" />
        <div className={styles.demoArea}>
          <div className={styles.demoGrid}>
            {INFO_PANEL_VARIANTS.map(variant => (
              <InfoPanel
                key={variant.id}
                type={variant.id}
                title="Info panel"
                description="Descrição da mensagem exibida no painel."
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── Variantes ── */}
      <section className={styles.section}>
        <SectionHeader icon="style" title="Variantes" count={`${INFO_PANEL_VARIANTS.length} variantes`} />
        <div className={styles.variantsGrid}>
          {INFO_PANEL_VARIANTS.map(variant => (
            <div key={variant.id} className={styles.variantCard}>
              <div className={styles.variantPreview}>
                <InfoPanel
                  type={variant.id}
                  title={variant.label}
                  description="Descrição complementar da mensagem."
                />
              </div>
              <div className={styles.cardBody}>
                <span className={`type-body-sm ${styles.cardLabel}`}>{variant.label}</span>
                <span className={`type-body-sm ${styles.cardDesc}`}>{variant.description}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Conteúdo ── */}
      <section className={styles.section}>
        <SectionHeader icon="notes" title="Combinações de conteúdo" count={`${INFO_PANEL_CONTENT_VARIANTS.length} combinações`} />
        <div className={styles.contentGrid}>
          {INFO_PANEL_CONTENT_VARIANTS.map(combo => (
            <div key={combo.label} className={styles.variantCard}>
              <div className={styles.variantPreview}>
                <InfoPanel
                  type="neutral"
                  title={combo.showTitle ? combo.exampleTitle : undefined}
                  description={combo.showDescription ? combo.exampleDescription : undefined}
                />
              </div>
              <div className={styles.cardBody}>
                <span className={`type-body-sm ${styles.cardLabel}`}>{combo.label}</span>
                <span className={`type-body-sm ${styles.cardDesc}`}>{combo.description}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Diretrizes ── */}
      <section className={styles.section}>
        <SectionHeader icon="checklist" title="Diretrizes de uso" />
        <div className={styles.guidelinesGrid}>
          {INFO_PANEL_GUIDELINES.map(g => (
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
