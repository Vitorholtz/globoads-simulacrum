import InfoPanel from '../../components/InfoPanel/InfoPanel'
import PageHeader from '../../components/docs/PageHeader/PageHeader'
import {
  INFO_PANEL_VARIANTS,
  INFO_PANEL_CONTENT_VARIANTS,
  INFO_PANEL_GUIDELINES,
} from '../../tokens/infoPanel'
import Section from '../../components/docs/Section/Section'
import DemoCard from '../../components/docs/DemoCard/DemoCard'
import CardGrid from '../../components/docs/CardGrid/CardGrid'
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
      <Section icon="info" title="Componente">
        <div className={styles.demoArea}>
          <div className={styles.demoGrid}>
            {INFO_PANEL_VARIANTS.map((variant) => (
              <InfoPanel
                key={variant.id}
                type={variant.id}
                title="Info panel"
                description="Descrição da mensagem exibida no painel."
              />
            ))}
          </div>
        </div>
      </Section>

      {/* ── Variantes ── */}
      <Section icon="style" title="Variantes" count={INFO_PANEL_VARIANTS.length}>
        <CardGrid wide>
          {INFO_PANEL_VARIANTS.map((variant) => (
            <DemoCard
              key={variant.id}
              preview={
                <InfoPanel
                  type={variant.id}
                  title={variant.label}
                  description="Descrição complementar da mensagem."
                />
              }
              title={variant.label}
              description={variant.description}
              previewBg="primary"
            />
          ))}
        </CardGrid>
      </Section>

      {/* ── Conteúdo ── */}
      <Section
        icon="notes"
        title="Combinações de conteúdo"
        count={INFO_PANEL_CONTENT_VARIANTS.length}
      >
        <CardGrid>
          {INFO_PANEL_CONTENT_VARIANTS.map((combo) => (
            <DemoCard
              key={combo.label}
              preview={
                <InfoPanel
                  type="neutral"
                  title={combo.showTitle ? combo.exampleTitle : undefined}
                  description={combo.showDescription ? combo.exampleDescription : undefined}
                />
              }
              title={combo.label}
              description={combo.description}
              previewBg="primary"
            />
          ))}
        </CardGrid>
      </Section>

      {/* ── Diretrizes ── */}
      <Section icon="checklist" title="Diretrizes de uso">
        <CardGrid wide>
          {INFO_PANEL_GUIDELINES.map((g) => (
            <DemoCard key={g.title} title={g.title} description={g.body} />
          ))}
        </CardGrid>
      </Section>
    </div>
  )
}
