import InteractiveCard from '../../components/InteractiveCard/InteractiveCard'
import {
  INTERACTIVE_CARD_STYLES,
  INTERACTIVE_CARD_STATES,
  INTERACTIVE_CARD_GUIDELINES,
  INTERACTIVE_CARD_SEMANTIC_VARIANTS,
} from '../../tokens/cards'
import DocBadge from '../../components/docs/DocBadge/DocBadge'
import PageHeader from '../../components/docs/PageHeader/PageHeader'
import g1Logo from '../../assets/logos/g1.svg'
import geLogo from '../../assets/logos/ge.svg'
import gshowLogo from '../../assets/logos/gshow.svg'
import CardGrid from '../../components/docs/CardGrid/CardGrid'
import Section from '../../components/docs/Section/Section'
import DemoCard from '../../components/docs/DemoCard/DemoCard'
import StateMatrix from '../../components/docs/StateMatrix/StateMatrix'
import Badge from '../../components/Badge/Badge'
import styles from './InteractiveCardPage.module.css'

const TALENT_PHOTO = '/campaign-talent.jpg'

function DiariaCard() {
  return (
    <div className={styles.diariaCard}>
      <div className={styles.diariaHeader}>
        <span className={`material-symbols-rounded icon-md ${styles.diariaChannelIcon}`}>
          devices
        </span>
        <span className={`type-body-md ${styles.diariaChannel}`}>Digital</span>
        <div className={styles.diariaHeaderLogos}>
          <img
            src={g1Logo}
            alt="G1"
            className={`${styles.diariaHeaderLogo} ${styles.diariaHeaderLogoG1}`}
          />
          <img
            src={geLogo}
            alt="GE"
            className={`${styles.diariaHeaderLogo} ${styles.diariaHeaderLogoGe}`}
          />
          <img
            src={gshowLogo}
            alt="GShow"
            className={`${styles.diariaHeaderLogo} ${styles.diariaHeaderLogoGshow}`}
          />
          <Badge label="+4" />
        </div>
      </div>
      <div className={styles.diariaContent}>
        <h4 className={`type-display-sm ${styles.diariaTitle}`}>
          Diárias
          <br />
          na Globo
        </h4>
        <p className={`type-body-md ${styles.diariaDesc}`}>
          Anuncie por 24 horas em uma ou mais plataformas da Globo e alcance seu público onde ele
          está.
        </p>
      </div>
      <div className={styles.diariaPhotoWrap}>
        <img src={TALENT_PHOTO} alt="" className={styles.diariaPhoto} />
      </div>
    </div>
  )
}

export default function InteractiveCardPage() {
  return (
    <div>
      <PageHeader
        breadcrumb="Structures"
        title="Interactive Cards"
        subtitle="Interactive Cards seguem o mesmo princípio de agrupamento dos Static Cards, mas adicionam capacidade de interação. Todo o container passa a funcionar como uma área acionável, permitindo navegação, seleção, abertura de detalhes ou execução de ações pelo próprio card."
        stats={[
          { value: INTERACTIVE_CARD_STYLES.length, label: 'Estilos' },
          { value: 4, label: 'Estados' },
          { value: 4, label: 'Variantes' },
        ]}
      />

      {/* ── Estilos ── */}
      <Section icon="style" title="Estilos" count={INTERACTIVE_CARD_STYLES.length}>
        <CardGrid>
          {INTERACTIVE_CARD_STYLES.map((s) => (
            <DemoCard
              key={s.id}
              preview={
                <InteractiveCard style={s.id} className={styles.demoCard}>
                  <DiariaCard />
                </InteractiveCard>
              }
              title={s.name}
              description={s.description}
              previewBg={s.id === 'on-secondary' ? 'secondary' : 'primary'}
            />
          ))}
        </CardGrid>
      </Section>

      {/* ── Estados ── */}
      <Section icon="toggle_on" title="Estados" count={INTERACTIVE_CARD_STATES.length}>
        {INTERACTIVE_CARD_STYLES.map((s) => (
          <StateMatrix
            key={s.id}
            group
            header={{ name: s.name, description: s.tagline }}
            columns={[...INTERACTIVE_CARD_STATES]}
            rows={[
              { id: 'default', label: 'Default' },
              { id: 'selected', label: 'Selecionado' },
            ]}
            getCellClassName={() =>
              s.id === 'on-secondary' ? styles.cellBgSecondary : styles.cellBgPrimary
            }
            renderCell={(row, col) => (
              <InteractiveCard
                style={s.id}
                selected={row.id === 'selected'}
                forceState={
                  col.id === 'normal' ? undefined : (col.id as 'hover' | 'focus' | 'active')
                }
                className={styles.matrixCard}
              />
            )}
          />
        ))}
      </Section>

      {/* ── Variantes semânticas ── */}
      <Section
        icon="code"
        title="Variantes semânticas"
        count={INTERACTIVE_CARD_SEMANTIC_VARIANTS.length}
      >
        <CardGrid>
          {INTERACTIVE_CARD_SEMANTIC_VARIANTS.map((v) => (
            <div key={v.as} className={styles.variantCard}>
              <div className={styles.variantHeader}>
                <DocBadge variant="outlined" size="md" className="type-body-sm font-code">
                  as=&quot;{v.as}&quot;
                </DocBadge>
                <span className={`type-title-sm ${styles.variantLabel}`}>{v.label}</span>
              </div>
              <div className={styles.variantBody}>
                <p className={`type-body-md ${styles.variantWhen}`}>{v.when}</p>
                <pre className={`type-caption-sm ${styles.variantExample}`}>{v.example}</pre>
                <p className={`type-caption-md ${styles.variantA11y}`}>{v.accessibility}</p>
              </div>
            </div>
          ))}
        </CardGrid>
      </Section>

      {/* ── Diretrizes ── */}
      <Section icon="checklist" title="Diretrizes de Uso">
        <CardGrid wide>
          {INTERACTIVE_CARD_GUIDELINES.map((g) => (
            <DemoCard key={g.title} title={g.title} description={g.body} />
          ))}
        </CardGrid>
      </Section>
    </div>
  )
}
