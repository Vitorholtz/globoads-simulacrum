import InteractiveCard from '../../components/InteractiveCard/InteractiveCard'
import {
  INTERACTIVE_CARD_STYLES,
  INTERACTIVE_CARD_STATES,
  INTERACTIVE_CARD_GUIDELINES,
  INTERACTIVE_CARD_SEMANTIC_VARIANTS,
} from '../../tokens/cards'
import type { InteractiveCardStyle } from '../../tokens/cards'
import PageHeader from '../../components/docs/PageHeader/PageHeader'
import g1Logo from '../../assets/logos/g1.svg'
import geLogo from '../../assets/logos/ge.svg'
import gshowLogo from '../../assets/logos/gshow.svg'
import CardGrid from '../../components/docs/CardGrid/CardGrid'
import GuidelinesGrid from '../../components/docs/GuidelinesGrid/GuidelinesGrid'
import Section from '../../components/docs/Section/Section'
import DemoCard from '../../components/docs/DemoCard/DemoCard'
import styles from './InteractiveCardPage.module.css'

const TALENT_PHOTO = '/campaign-talent.jpg'

const STYLE_PREVIEW_BG: Record<InteractiveCardStyle, string> = {
  'on-primary': '#ffffff',
  'on-secondary': '#f7f7f7',
  outlined: '#ffffff',
}

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
          <span className={`type-caption-sm ${styles.diariaMoreCount}`}>+4</span>
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
                <div
                  className={styles.stylePreviewInner}
                  style={{ background: STYLE_PREVIEW_BG[s.id] }}
                >
                  <InteractiveCard style={s.id} className={styles.demoCard}>
                    <DiariaCard />
                  </InteractiveCard>
                </div>
              }
              title={s.name}
              description={s.description}
            />
          ))}
        </CardGrid>
      </Section>

      {/* ── Estados ── */}
      <Section icon="toggle_on" title="Estados" count={INTERACTIVE_CARD_STATES.length}>
        {INTERACTIVE_CARD_STYLES.map((s) => (
          <div key={s.id} className={styles.stateMatrixContainer}>
            <div className={styles.matrixStyleHeader}>
              <span className={`type-caption-md ${styles.matrixStyleName}`}>{s.name}</span>
              <span className={`type-caption-sm ${styles.matrixStyleTagline}`}>— {s.tagline}</span>
            </div>
            <div className={styles.matrixHeaderRow}>
              {INTERACTIVE_CARD_STATES.map((state) => (
                <div key={state.id} className={`type-caption-xs ${styles.matrixCellLabel}`}>
                  {state.label}
                </div>
              ))}
            </div>
            <div className={styles.matrixCellsRow} style={{ background: STYLE_PREVIEW_BG[s.id] }}>
              {INTERACTIVE_CARD_STATES.map((state) => (
                <div key={state.id} className={styles.matrixCell}>
                  <InteractiveCard
                    style={s.id}
                    forceState={
                      state.id === 'normal' ? undefined : (state.id as 'hover' | 'focus' | 'active')
                    }
                    className={styles.matrixCard}
                  />
                </div>
              ))}
            </div>
            <div className={styles.matrixRowLabel}>
              <span className="type-caption-xs">Selecionado</span>
            </div>
            <div className={styles.matrixCellsRow} style={{ background: STYLE_PREVIEW_BG[s.id] }}>
              {INTERACTIVE_CARD_STATES.map((state) => (
                <div key={state.id} className={styles.matrixCell}>
                  <InteractiveCard
                    style={s.id}
                    selected
                    forceState={
                      state.id === 'normal' ? undefined : (state.id as 'hover' | 'focus' | 'active')
                    }
                    className={styles.matrixCard}
                  />
                </div>
              ))}
            </div>
          </div>
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
                <code className={`type-body-sm ${styles.variantTag}`}>as=&quot;{v.as}&quot;</code>
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
        <GuidelinesGrid items={INTERACTIVE_CARD_GUIDELINES} />
      </Section>
    </div>
  )
}
