import { useState } from 'react'
import BadgeCounter from '../../components/BadgeCounter/BadgeCounter'
import Tabs from '../../components/Tabs/Tabs'
import type { TabItem } from '../../components/Tabs/Tabs'
import { BADGE_COUNTER_EXAMPLES, BADGE_COUNTER_GUIDELINES } from '../../tokens/badgeCounter'
import PageHeader from '../../components/docs/PageHeader/PageHeader'
import GuidelinesGrid from '../../components/docs/GuidelinesGrid/GuidelinesGrid'
import Section from '../../components/docs/Section/Section'
import DemoCard from '../../components/docs/DemoCard/DemoCard'
import CardGrid from '../../components/docs/CardGrid/CardGrid'
import styles from './BadgeCounterPage.module.css'

const TAB_CONTEXT_ITEMS: TabItem[] = [
  { id: 'notificacoes', label: 'Notificações', badge: '5' },
  { id: 'relatorios', label: 'Relatórios' },
  { id: 'configuracoes', label: 'Configurações' },
]

export default function BadgeCounterPage() {
  const [activeTab, setActiveTab] = useState('notificacoes')

  return (
    <div>
      <PageHeader
        breadcrumb="Indicators"
        title="Badge Counter"
        subtitle='Indicador de contagem que identifica a quantidade de algo — notificações não lidas, itens pendentes ou novidades. Exibe valores numéricos de 1 a 99, com cap em "99+" para contagens maiores.'
        stats={[
          { value: 1, label: 'Variante' },
          { value: 1, label: 'Tamanho' },
          { value: 5, label: 'Exemplos' },
        ]}
      />

      {/* ── Exemplos de Valor ── */}
      <Section icon="badge" title="Exemplos de Valor" count={BADGE_COUNTER_EXAMPLES.length}>
        <div className={styles.examplesContainer}>
          {BADGE_COUNTER_EXAMPLES.map((ex) => (
            <div key={ex.value} className={styles.exampleRow}>
              <div className={styles.examplePreview}>
                <BadgeCounter value={ex.value} />
              </div>
              <div className={styles.exampleMeta}>
                <div className={styles.exampleValueRow}>
                  <span className={`type-body-sm ${styles.exampleLabel}`}>{ex.label}</span>
                  <span className={`type-caption-sm ${styles.exampleValue}`}>"{ex.value}"</span>
                </div>
                <span className={`type-body-sm ${styles.exampleDesc}`}>{ex.description}</span>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* ── Anatomia ── */}
      <Section icon="info" title="Anatomia">
        <div className={styles.anatomyCard}>
          <div className={styles.anatomyPreview}>
            <div className={styles.anatomyDiagram}>
              <BadgeCounter value="12" />
            </div>
          </div>
          <div className={styles.anatomySpecs}>
            <div className={styles.specRow}>
              <span className={`type-body-sm ${styles.specKey}`}>Altura</span>
              <span className={`type-body-sm ${styles.specVal}`}>16px (fixo)</span>
            </div>
            <div className={styles.specRow}>
              <span className={`type-body-sm ${styles.specKey}`}>Largura mínima</span>
              <span className={`type-body-sm ${styles.specVal}`}>16px</span>
            </div>
            <div className={styles.specRow}>
              <span className={`type-body-sm ${styles.specKey}`}>Padding horizontal</span>
              <span className={`type-body-sm ${styles.specVal}`}>4px</span>
            </div>
            <div className={styles.specRow}>
              <span className={`type-body-sm ${styles.specKey}`}>Border-radius</span>
              <span className={`type-body-sm ${styles.specVal}`}>9999px (pílula)</span>
            </div>
            <div className={styles.specRow}>
              <span className={`type-body-sm ${styles.specKey}`}>Tipografia</span>
              <span className={`type-body-sm ${styles.specVal}`}>12px · weight 500 · lh 16px</span>
            </div>
            <div className={styles.specRow}>
              <span className={`type-body-sm ${styles.specKey}`}>Background</span>
              <span className={`type-body-sm ${styles.specVal}`}>
                --color-fill-critical · #B70634
              </span>
            </div>
            <div className={styles.specRow}>
              <span className={`type-body-sm ${styles.specKey}`}>Cor do texto</span>
              <span className={`type-body-sm ${styles.specVal}`}>
                --color-fill-inverse · #FFFFFF
              </span>
            </div>
          </div>
        </div>
      </Section>

      {/* ── Contextos de Uso ── */}
      <Section icon="widgets" title="Contextos de Uso">
        <CardGrid cols={2}>
          <DemoCard
            preview={
              <Tabs items={TAB_CONTEXT_ITEMS} activeId={activeTab} onChange={setActiveTab} />
            }
            title="Em tabs e navegação"
            description="Badge posicionado imediatamente após o rótulo, alinhado ao centro vertical."
            align="stretch"
          />
          <DemoCard
            preview={
              <div className={styles.contextIconExample}>
                <div className={styles.contextIconWrapper}>
                  <span className={`material-symbols-rounded icon-lg ${styles.contextIcon}`}>
                    notifications
                  </span>
                  <BadgeCounter value="3" className={styles.contextIconBadge} />
                </div>
                <div className={styles.contextIconWrapper}>
                  <span className={`material-symbols-rounded icon-lg ${styles.contextIcon}`}>
                    chat
                  </span>
                  <BadgeCounter value="99+" className={styles.contextIconBadge} />
                </div>
                <div className={styles.contextIconWrapper}>
                  <span className={`material-symbols-rounded icon-lg ${styles.contextIcon}`}>
                    mail
                  </span>
                  <BadgeCounter value="12" className={styles.contextIconBadge} />
                </div>
              </div>
            }
            title="Sobre ícones"
            description="Badge ancorado no canto superior direito do ícone, indicando itens pendentes."
            previewPad="lg"
          />
        </CardGrid>
      </Section>

      {/* ── Diretrizes ── */}
      <Section icon="checklist" title="Diretrizes de Uso">
        <GuidelinesGrid items={BADGE_COUNTER_GUIDELINES} />
      </Section>
    </div>
  )
}
