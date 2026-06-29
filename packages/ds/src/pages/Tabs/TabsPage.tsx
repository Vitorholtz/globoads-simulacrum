import { useState } from 'react'
import Tabs from '../../components/Tabs/Tabs'
import {
  TAB_POSITIONS,
  TAB_CONTENT_VARIANTS,
  TABS_GUIDELINES,
  DEMO_TEXT_TABS,
  DEMO_ICON_TABS,
  DEMO_BADGE_TABS,
} from '../../tokens/tabs'
import type { TabPosition } from '../../tokens/tabs'
import PageHeader from '../../components/docs/PageHeader/PageHeader'
import CardGrid from '../../components/docs/CardGrid/CardGrid'
import DemoCard from '../../components/docs/DemoCard/DemoCard'
import Section from '../../components/docs/Section/Section'
import styles from './TabsPage.module.css'

function PositionDemo({ position, description }: { position: TabPosition; description: string }) {
  const [active, setActive] = useState('tab1')
  const isVertical = position === 'left' || position === 'right'
  return (
    <DemoCard
      preview={
        <Tabs
          items={DEMO_TEXT_TABS}
          activeId={active}
          onChange={setActive}
          position={position}
          className={isVertical ? undefined : styles.tabsStretch}
        />
      }
      title={position.charAt(0).toUpperCase() + position.slice(1)}
      description={description}
      align={isVertical ? 'center' : 'stretch'}
      previewPad="lg"
    />
  )
}

export default function TabsPage() {
  const [variantActive, setVariantActive] = useState('tab1')
  const [badgeActive, setBadgeActive] = useState('tab1')
  const [iconActive, setIconActive] = useState('tab1')

  return (
    <div>
      <PageHeader
        breadcrumb="Navigations"
        title="Tabs"
        subtitle="As tabs organizam o conteúdo em diferentes telas e visualizações dentro do mesmo contexto. Suportam quatro posições, ícones e contadores de badge."
        stats={[
          { value: 4, label: 'Posições' },
          { value: 3, label: 'Variantes' },
          { value: 2, label: 'Estados' },
        ]}
      />

      {/* ── Posições ── */}
      <Section icon="tab" title="Posições" count={TAB_POSITIONS.length}>
        <CardGrid wide>
          {TAB_POSITIONS.map((p) => (
            <PositionDemo key={p.id} position={p.id} description={p.description} />
          ))}
        </CardGrid>
      </Section>

      {/* ── Variantes de Conteúdo ── */}
      <Section icon="tune" title="Variantes de Conteúdo" count={TAB_CONTENT_VARIANTS.length}>
        <CardGrid>
          <DemoCard
            preview={
              <Tabs
                items={DEMO_TEXT_TABS}
                activeId={variantActive}
                onChange={setVariantActive}
                position="top"
                className={styles.tabsStretch}
              />
            }
            title={TAB_CONTENT_VARIANTS[0].label}
            description={TAB_CONTENT_VARIANTS[0].description}
          />

          <DemoCard
            preview={
              <Tabs
                items={DEMO_ICON_TABS}
                activeId={iconActive}
                onChange={setIconActive}
                position="top"
                className={styles.tabsStretch}
              />
            }
            title={TAB_CONTENT_VARIANTS[1].label}
            description={TAB_CONTENT_VARIANTS[1].description}
          />

          <DemoCard
            preview={
              <Tabs
                items={DEMO_BADGE_TABS}
                activeId={badgeActive}
                onChange={setBadgeActive}
                position="top"
                className={styles.tabsStretch}
              />
            }
            title={TAB_CONTENT_VARIANTS[2].label}
            description={TAB_CONTENT_VARIANTS[2].description}
          />
        </CardGrid>
      </Section>

      {/* ── Diretrizes ── */}
      <Section icon="checklist" title="Diretrizes de Uso">
        <CardGrid wide>
          {TABS_GUIDELINES.map((g) => (
            <DemoCard key={g.title} title={g.title} description={g.body} />
          ))}
        </CardGrid>
      </Section>
    </div>
  )
}
