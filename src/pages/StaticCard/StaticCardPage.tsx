import StaticCard from '../../components/StaticCard/StaticCard'
import { CARD_STYLES, STATIC_CARD_GUIDELINES } from '../../tokens/cards'
import type { CardStyle } from '../../tokens/cards'
import PageHeader from '../../components/PageHeader/PageHeader'
import SectionHeader from '../../components/SectionHeader/SectionHeader'
import { FVAR_OUTLINED_SM } from '../../utils/iconVariation'
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
        <span className={styles.campaignChannel}>Digital</span>
        <span className={styles.campaignStatus}>Ativo</span>
      </div>
      <div className={styles.campaignMetric}>
        <span className={styles.campaignValue}>1,24M</span>
        <span className={styles.campaignLabel}>Impressões</span>
      </div>
      <div className={styles.campaignChart}>
        {CHART_BARS.map((h, i) => (
          <div key={i} className={styles.campaignBar} style={{ height: `${h}%` }} />
        ))}
      </div>
      <div className={styles.campaignFooter}>
        <div className={styles.campaignStat}>
          <span className={styles.campaignStatValue}>384K</span>
          <span className={styles.campaignStatLabel}>Alcance</span>
        </div>
        <div className={styles.campaignStat}>
          <span className={styles.campaignStatValue}>2,8%</span>
          <span className={styles.campaignStatLabel}>CTR</span>
        </div>
        <div className={styles.campaignTrend}>
          <span
            className={`material-symbols-rounded ${styles.campaignTrendIcon}`}
            style={{ fontVariationSettings: FVAR_OUTLINED_SM }}
          >trending_up</span>
          <span className={styles.campaignTrendValue}>+12%</span>
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
        stats={[
          { value: 2, label: 'Estilos' },
        ]}
      />

      {/* ── Estilos ── */}
      <section className={styles.section}>
        <SectionHeader icon="style" title="Estilos" count="2 estilos" />
        <div className={styles.stylesGrid}>
          {CARD_STYLES.map((s) => (
            <div key={s.id} className={styles.styleCard}>
              <div
                className={styles.stylePreview}
                style={{ background: STYLE_PREVIEW_BG[s.id] }}
              >
                <StaticCard style={s.id} className={styles.demoCard}>
                  <CampaignCard />
                </StaticCard>
              </div>
              <div className={styles.styleBody}>
                <h3 className={styles.styleName}>{s.name}</h3>
                <p className={styles.styleDesc}>{s.description}</p>
                <ul className={styles.styleWhen}>
                  {s.when.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Diretrizes ── */}
      <section className={styles.section}>
        <SectionHeader icon="checklist" title="Diretrizes de Uso" />
        <div className={styles.guidelinesGrid}>
          {STATIC_CARD_GUIDELINES.map((g) => (
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
