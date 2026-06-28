import { useState } from 'react'
import Button from '../../components/Button/Button'
import CardGrid from '../../components/docs/CardGrid/CardGrid'
import TokenCard from '../../components/docs/TokenCard/TokenCard'
import PageHeader from '../../components/docs/PageHeader/PageHeader'
import Section from '../../components/docs/Section/Section'
import { MOTION_DURATION_TOKENS, MOTION_EASING_TOKENS } from '../../tokens/motion'
import styles from './TransitionsPage.module.css'

const DIRECTIONAL_DEMOS = [
  { label: 'De cima', keyframe: 'motion-enter-top', icon: 'keyboard_arrow_down' },
  { label: 'De baixo', keyframe: 'motion-enter-bottom', icon: 'keyboard_arrow_up' },
  { label: 'Da esquerda', keyframe: 'motion-enter-left', icon: 'keyboard_arrow_right' },
  { label: 'Da direita', keyframe: 'motion-enter-right', icon: 'keyboard_arrow_left' },
]

const EXIT_DEMOS = [
  { label: 'Para cima', keyframe: 'motion-exit-top', icon: 'keyboard_arrow_up' },
  { label: 'Para baixo', keyframe: 'motion-exit-bottom', icon: 'keyboard_arrow_down' },
  { label: 'Para esquerda', keyframe: 'motion-exit-left', icon: 'keyboard_arrow_left' },
  { label: 'Para direita', keyframe: 'motion-exit-right', icon: 'keyboard_arrow_right' },
]

const USAGE_ROWS = [
  {
    token: '--motion-duration-fast',
    ms: '100ms',
    use: 'Hover sutil: tabs, hyperlinks, células de calendário',
  },
  {
    token: '--motion-duration-base',
    ms: '120ms',
    use: 'Hover, focus e active: botões, inputs, chips, cards',
  },
  {
    token: '--motion-duration-slow',
    ms: '200ms',
    use: 'Mudanças estruturais: chevron, dropdown, accordion, entrada de painel',
  },
  {
    token: '--motion-easing-default',
    ms: 'ease',
    use: 'Padrão para todas as transições de estado interativo',
  },
  { token: '--motion-easing-out', ms: 'ease-out', use: 'Entrada de popovers, painéis e toasts' },
  {
    token: '--motion-easing-in-out',
    ms: 'ease-in-out',
    use: 'Animações de loop: shimmer, loader pulsante',
  },
  { token: '--motion-easing-linear', ms: 'linear', use: 'Rotação contínua de spinners' },
]

function EntranceCard({ label, keyframe, icon }: (typeof DIRECTIONAL_DEMOS)[number]) {
  const [animKey, setAnimKey] = useState(0)

  return (
    <div className={styles.entranceCard}>
      <div className={styles.entranceStage}>
        <div
          key={animKey}
          className={styles.entranceBlock}
          style={{ animationName: keyframe } as React.CSSProperties}
        />
      </div>
      <div className={styles.entranceBody}>
        <Button
          variant="secondary"
          iconLeft={icon}
          className={styles.entranceBtn}
          onClick={() => setAnimKey((k) => k + 1)}
        >
          {label}
        </Button>
      </div>
    </div>
  )
}

export default function TransitionsPage() {
  return (
    <div>
      <PageHeader
        breadcrumb="Foundation"
        title="Transições"
        subtitle="Tokens de duração e easing que governam todas as animações e transições do Design System. Componentes referenciam esses tokens — nunca valores literais."
        stats={[
          { value: MOTION_DURATION_TOKENS.length, label: 'tokens de duração' },
          { value: MOTION_EASING_TOKENS.length, label: 'funções de easing' },
        ]}
      />

      <Section icon="timer" title="Duração" count={MOTION_DURATION_TOKENS.length}>
        <p className={`type-body-sm ${styles.sectionNote}`}>
          Passe o mouse sobre cada card para visualizar a duração.
        </p>
        <CardGrid>
          {MOTION_DURATION_TOKENS.map((token) => (
            <TokenCard
              key={token.variable}
              preview={
                <div className={styles.track}>
                  <div className={styles.block} />
                </div>
              }
              name={token.name}
              variable={token.variable}
              value={`${token.valueMs}ms`}
              description={token.description}
              style={{ '--demo-duration': `var(${token.variable})` } as React.CSSProperties}
              className={styles.durationCard}
            />
          ))}
        </CardGrid>
      </Section>

      <Section icon="show_chart" title="Easing" count={MOTION_EASING_TOKENS.length}>
        <p className={`type-body-sm ${styles.sectionNote}`}>
          Mesma duração (200ms), curvas diferentes. Passe o mouse para comparar.
        </p>
        <CardGrid>
          {MOTION_EASING_TOKENS.map((token) => (
            <TokenCard
              key={token.variable}
              preview={
                <div className={styles.track}>
                  <div className={styles.block} />
                </div>
              }
              name={token.name}
              variable={token.variable}
              value={token.value}
              description={token.description}
              style={{ '--demo-easing': `var(${token.variable})` } as React.CSSProperties}
              className={styles.easingCard}
            />
          ))}
        </CardGrid>
      </Section>

      <Section icon="animation" title="Entradas direcionais" count="4 keyframes">
        <p className={`type-body-sm ${styles.sectionNote}`}>
          Keyframes globais para componentes renderizados condicionalmente. Clique para reproduzir.
        </p>
        <CardGrid>
          {DIRECTIONAL_DEMOS.map((demo) => (
            <EntranceCard key={demo.keyframe} {...demo} />
          ))}
        </CardGrid>
      </Section>

      <Section icon="animation" title="Saídas direcionais" count="4 keyframes">
        <p className={`type-body-sm ${styles.sectionNote}`}>
          Keyframes globais para a remoção de componentes do DOM. Clique para reproduzir.
        </p>
        <CardGrid>
          {EXIT_DEMOS.map((demo) => (
            <EntranceCard key={demo.keyframe} {...demo} />
          ))}
        </CardGrid>
      </Section>

      <Section icon="book_2" title="Guia de uso">
        <div className={styles.usageTable}>
          <div className={styles.usageHeader}>
            <span className="type-caption-sm">Token</span>
            <span className="type-caption-sm">Valor</span>
            <span className="type-caption-sm">Quando usar</span>
          </div>
          {USAGE_ROWS.map((row) => (
            <div key={row.token} className={styles.usageRow}>
              <code className={`type-caption-sm ${styles.usageToken}`}>{row.token}</code>
              <span className={`type-body-sm ${styles.usageValue}`}>{row.ms}</span>
              <span className={`type-body-sm ${styles.usageUse}`}>{row.use}</span>
            </div>
          ))}
        </div>
      </Section>
    </div>
  )
}
