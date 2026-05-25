import { useState } from 'react'
import Tabs from '../../components/Tabs/Tabs'
import type { TabItem } from '../../components/Tabs/Tabs'
import { TAB_POSITIONS, TAB_CONTENT_VARIANTS, TABS_GUIDELINES } from '../../tokens/tabs'
import type { TabPosition } from '../../tokens/tabs'
import PageHeader from '../../components/PageHeader/PageHeader'
import SectionHeader from '../../components/SectionHeader/SectionHeader'
import styles from './TabsPage.module.css'

const TEXT_TABS: TabItem[] = [
  { id: 'tab1', label: 'Tab 1' },
  { id: 'tab2', label: 'Tab 2' },
  { id: 'tab3', label: 'Tab 3' },
]

const ICON_TABS: TabItem[] = [
  { id: 'tab1', label: 'Início', icon: 'home' },
  { id: 'tab2', label: 'Relatórios', icon: 'analytics' },
  { id: 'tab3', label: 'Campanhas', icon: 'campaign' },
]

const BADGE_TABS: TabItem[] = [
  { id: 'tab1', label: 'Tudo', badge: '12' },
  { id: 'tab2', label: 'Novos', badge: '3' },
  { id: 'tab3', label: 'Lidos' },
]

function PositionDemo({ position, description }: { position: TabPosition; description: string }) {
  const [active, setActive] = useState('tab1')
  const isVertical = position === 'left' || position === 'right'
  return (
    <div className={styles.positionCard}>
      <div className={[styles.positionPreview, isVertical ? styles.positionPreviewVertical : ''].join(' ')}>
        <Tabs
          items={TEXT_TABS}
          activeId={active}
          onChange={setActive}
          position={position}
          className={isVertical ? undefined : styles.tabsStretch}
        />
      </div>
      <div className={styles.positionMeta}>
        <span className={styles.positionLabel}>{position.charAt(0).toUpperCase() + position.slice(1)}</span>
        <p className={styles.positionDesc}>{description}</p>
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
      <section className={styles.section}>
        <SectionHeader icon="tab" title="Posições" count={`${TAB_POSITIONS.length} posições`} />
        <div className={styles.positionGrid}>
          {TAB_POSITIONS.map((p) => (
            <PositionDemo key={p.id} position={p.id} description={p.description} />
          ))}
        </div>
      </section>

      {/* ── Variantes de Conteúdo ── */}
      <section className={styles.section}>
        <SectionHeader icon="tune" title="Variantes de Conteúdo" count={`${TAB_CONTENT_VARIANTS.length} variantes`} />
        <div className={styles.variantGrid}>
          <div className={styles.variantCard}>
            <div className={styles.variantPreview}>
              <Tabs
                items={TEXT_TABS}
                activeId={variantActive}
                onChange={setVariantActive}
                position="top"
                className={styles.tabsStretch}
              />
            </div>
            <div className={styles.variantMeta}>
              <span className={styles.variantLabel}>{TAB_CONTENT_VARIANTS[0].label}</span>
              <p className={styles.variantDesc}>{TAB_CONTENT_VARIANTS[0].description}</p>
            </div>
          </div>

          <div className={styles.variantCard}>
            <div className={styles.variantPreview}>
              <Tabs
                items={ICON_TABS}
                activeId={iconActive}
                onChange={setIconActive}
                position="top"
                className={styles.tabsStretch}
              />
            </div>
            <div className={styles.variantMeta}>
              <span className={styles.variantLabel}>{TAB_CONTENT_VARIANTS[1].label}</span>
              <p className={styles.variantDesc}>{TAB_CONTENT_VARIANTS[1].description}</p>
            </div>
          </div>

          <div className={styles.variantCard}>
            <div className={styles.variantPreview}>
              <Tabs
                items={BADGE_TABS}
                activeId={badgeActive}
                onChange={setBadgeActive}
                position="top"
                className={styles.tabsStretch}
              />
            </div>
            <div className={styles.variantMeta}>
              <span className={styles.variantLabel}>{TAB_CONTENT_VARIANTS[2].label}</span>
              <p className={styles.variantDesc}>{TAB_CONTENT_VARIANTS[2].description}</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Diretrizes ── */}
      <section className={styles.section}>
        <SectionHeader icon="checklist" title="Diretrizes de Uso" />
        <div className={styles.guidelinesGrid}>
          {TABS_GUIDELINES.map((g) => (
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
