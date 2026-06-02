import StaticCard from '../../components/StaticCard/StaticCard'
import { CARD_STYLES, STATIC_CARD_GUIDELINES } from '../../tokens/cards'
import type { CardStyle } from '../../tokens/cards'
import PageHeader from '../../components/docs/PageHeader/PageHeader'
import Badge from '../../components/Badge/Badge'
import GuidelinesGrid from '../../components/docs/GuidelinesGrid/GuidelinesGrid'
import Section from '../../components/docs/Section/Section'
import styles from './StaticCardPage.module.css'

const STYLE_PREVIEW_BG: Record<CardStyle, string> = {
  'on-primary': '#ffffff',
  'on-secondary': '#f7f7f7',
}

const CHART_BARS = [38, 52, 45, 61, 70, 58, 76, 82, 71, 88, 84, 100]

function CampaignCard() {
  return (
    <div className={styles.campaignCard}>
      <div className={styles.campaignHeader}>
        <span className={`type-caption-xs ${styles.campaignChannel}`}>Digital</span>
        <Badge variant="success" label="Ativo" />
      </div>
      <div className={styles.campaignMetric}>
        <span className={`type-title-lg ${styles.campaignValue}`}>1,24M</span>
        <span className={`type-caption-sm ${styles.campaignLabel}`}>Impressões</span>
      </div>
      <div className={styles.campaignChart}>
        {CHART_BARS.map((h, i) => (
          <div key={i} className={styles.campaignBar} style={{ height: `${h}%` }} />
        ))}
      </div>
      <div className={styles.campaignFooter}>
        <div className={styles.campaignStat}>
          <span className={`type-caption-md ${styles.campaignStatValue}`}>384K</span>
          <span className={`type-caption-xs ${styles.campaignStatLabel}`}>Alcance</span>
        </div>
        <div className={styles.campaignStat}>
          <span className={`type-caption-md ${styles.campaignStatValue}`}>2,8%</span>
          <span className={`type-caption-xs ${styles.campaignStatLabel}`}>CTR</span>
        </div>
        <div className={styles.campaignTrend}>
          <span className={`material-symbols-rounded icon-md ${styles.campaignTrendIcon}`}>
            trending_up
          </span>
          <span className={`type-caption-sm ${styles.campaignTrendValue}`}>+12%</span>
        </div>
      </div>
    </div>
  )
}

export default function StaticCardPage() {
  return (
    <div>
      <PageHeader
        breadcrumb="Structures"
        title="Static Cards"
        subtitle="Static Cards agrupam conteúdo, conceitos ou tarefas relacionadas, facilitando leitura, compreensão e organização visual da informação. Possuem função exclusivamente estrutural e informativa — sem comportamento de interação aplicado ao container principal."
        stats={[{ value: 2, label: 'Estilos' }]}
      />

      {/* ── Estilos ── */}
      <Section icon="style" title="Estilos" count={2}>
        <div className={styles.stylesGrid}>
          {CARD_STYLES.map((s) => (
            <div key={s.id} className={styles.styleCard}>
              <div className={styles.stylePreview} style={{ background: STYLE_PREVIEW_BG[s.id] }}>
                <StaticCard style={s.id} className={styles.demoCard}>
                  <CampaignCard />
                </StaticCard>
              </div>
              <div className={styles.styleBody}>
                <h3 className={`type-title-sm ${styles.styleName}`}>{s.name}</h3>
                <p className={`type-body-md ${styles.styleDesc}`}>{s.description}</p>
                <ul className={styles.styleWhen}>
                  {s.when.map((item) => (
                    <li key={item} className="type-body-md">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* ── Diretrizes ── */}
      <Section icon="checklist" title="Diretrizes de Uso">
        <GuidelinesGrid items={STATIC_CARD_GUIDELINES} />
      </Section>
    </div>
  )
}
