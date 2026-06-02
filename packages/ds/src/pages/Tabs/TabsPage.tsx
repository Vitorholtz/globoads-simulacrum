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
import GuidelinesGrid from '../../components/docs/GuidelinesGrid/GuidelinesGrid'
import Section from '../../components/docs/Section/Section'
import styles from './TabsPage.module.css'

function PositionDemo({ position, description }: { position: TabPosition; description: string }) {
  const [active, setActive] = useState('tab1')
  const isVertical = position === 'left' || position === 'right'
  return (
    <div className={styles.positionCard}>
      <div
        className={[styles.positionPreview, isVertical ? styles.positionPreviewVertical : ''].join(
          ' '
        )}
      >
        <Tabs
          items={DEMO_TEXT_TABS}
          activeId={active}
          onChange={setActive}
          position={position}
          className={isVertical ? undefined : styles.tabsStretch}
        />
      </div>
      <div className={styles.positionMeta}>
        <span className={`type-body-sm ${styles.positionLabel}`}>
          {position.charAt(0).toUpperCase() + position.slice(1)}
        </span>
        <p className={`type-body-sm ${styles.positionDesc}`}>{description}</p>
      </div>
    </div>
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
        <div className={styles.positionGrid}>
          {TAB_POSITIONS.map((p) => (
            <PositionDemo key={p.id} position={p.id} description={p.description} />
          ))}
        </div>
      </Section>

      {/* ── Variantes de Conteúdo ── */}
      <Section icon="tune" title="Variantes de Conteúdo" count={TAB_CONTENT_VARIANTS.length}>
        <div className={styles.variantGrid}>
          <div className={styles.variantCard}>
            <div className={styles.variantPreview}>
              <Tabs
                items={DEMO_TEXT_TABS}
                activeId={variantActive}
                onChange={setVariantActive}
                position="top"
                className={styles.tabsStretch}
              />
            </div>
            <div className={styles.variantMeta}>
              <span className={`type-body-sm ${styles.variantLabel}`}>
                {TAB_CONTENT_VARIANTS[0].label}
              </span>
              <p className={`type-body-sm ${styles.variantDesc}`}>
                {TAB_CONTENT_VARIANTS[0].description}
              </p>
            </div>
          </div>

          <div className={styles.variantCard}>
            <div className={styles.variantPreview}>
              <Tabs
                items={DEMO_ICON_TABS}
                activeId={iconActive}
                onChange={setIconActive}
                position="top"
                className={styles.tabsStretch}
              />
            </div>
            <div className={styles.variantMeta}>
              <span className={`type-body-sm ${styles.variantLabel}`}>
                {TAB_CONTENT_VARIANTS[1].label}
              </span>
              <p className={`type-body-sm ${styles.variantDesc}`}>
                {TAB_CONTENT_VARIANTS[1].description}
              </p>
            </div>
          </div>

          <div className={styles.variantCard}>
            <div className={styles.variantPreview}>
              <Tabs
                items={DEMO_BADGE_TABS}
                activeId={badgeActive}
                onChange={setBadgeActive}
                position="top"
                className={styles.tabsStretch}
              />
            </div>
            <div className={styles.variantMeta}>
              <span className={`type-body-sm ${styles.variantLabel}`}>
                {TAB_CONTENT_VARIANTS[2].label}
              </span>
              <p className={`type-body-sm ${styles.variantDesc}`}>
                {TAB_CONTENT_VARIANTS[2].description}
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* ── Diretrizes ── */}
      <Section icon="checklist" title="Diretrizes de Uso">
        <GuidelinesGrid items={TABS_GUIDELINES} />
      </Section>
    </div>
  )
}
