import { useState } from 'react'
import BadgeCounter from '../../components/BadgeCounter/BadgeCounter'
import Tabs from '../../components/Tabs/Tabs'
import type { TabItem } from '../../components/Tabs/Tabs'
import { BADGE_COUNTER_EXAMPLES, BADGE_COUNTER_GUIDELINES } from '../../tokens/badgeCounter'
import PageHeader from '../../components/PageHeader/PageHeader'
import SectionHeader from '../../components/SectionHeader/SectionHeader'
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
      <section className={styles.section}>
        <SectionHeader icon="badge" title="Exemplos de Valor" count={`${BADGE_COUNTER_EXAMPLES.length} exemplos`} />
        <div className={styles.examplesContainer}>
          {BADGE_COUNTER_EXAMPLES.map((ex) => (
            <div key={ex.value} className={styles.exampleRow}>
              <div className={styles.examplePreview}>
                <BadgeCounter value={ex.value} />
              </div>
              <div className={styles.exampleMeta}>
                <div className={styles.exampleValueRow}>
                  <span className={styles.exampleLabel}>{ex.label}</span>
                  <span className={styles.exampleValue}>"{ex.value}"</span>
                </div>
                <span className={styles.exampleDesc}>{ex.description}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Anatomia ── */}
      <section className={styles.section}>
        <SectionHeader icon="info" title="Anatomia" />
        <div className={styles.anatomyCard}>
          <div className={styles.anatomyPreview}>
            <div className={styles.anatomyDiagram}>
              <BadgeCounter value="12" />
            </div>
          </div>
          <div className={styles.anatomySpecs}>
            <div className={styles.specRow}>
              <span className={styles.specKey}>Altura</span>
              <span className={styles.specVal}>16px (fixo)</span>
            </div>
            <div className={styles.specRow}>
              <span className={styles.specKey}>Largura mínima</span>
              <span className={styles.specVal}>16px</span>
            </div>
            <div className={styles.specRow}>
              <span className={styles.specKey}>Padding horizontal</span>
              <span className={styles.specVal}>4px</span>
            </div>
            <div className={styles.specRow}>
              <span className={styles.specKey}>Border-radius</span>
              <span className={styles.specVal}>9999px (pílula)</span>
            </div>
            <div className={styles.specRow}>
              <span className={styles.specKey}>Tipografia</span>
              <span className={styles.specVal}>12px · weight 500 · lh 16px</span>
            </div>
            <div className={styles.specRow}>
              <span className={styles.specKey}>Background</span>
              <span className={styles.specVal}>--color-fill-critical · #B70634</span>
            </div>
            <div className={styles.specRow}>
              <span className={styles.specKey}>Cor do texto</span>
              <span className={styles.specVal}>--color-fill-inverse · #FFFFFF</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Contextos de Uso ── */}
      <section className={styles.section}>
        <SectionHeader icon="widgets" title="Contextos de Uso" />
        <div className={styles.contextsGrid}>
          <div className={styles.contextCard}>
            <div className={styles.contextPreview}>
              <Tabs
                items={TAB_CONTEXT_ITEMS}
                activeId={activeTab}
                onChange={setActiveTab}
              />
            </div>
            <div className={styles.contextMeta}>
              <span className={styles.contextLabel}>Em tabs e navegação</span>
              <p className={styles.contextDesc}>Badge posicionado imediatamente após o rótulo, alinhado ao centro vertical.</p>
            </div>
          </div>

          <div className={styles.contextCard}>
            <div className={styles.contextPreview}>
              <div className={styles.contextIconExample}>
                <div className={styles.contextIconWrapper}>
                  <span
                    className={`material-symbols-rounded ${styles.contextIcon}`}
                    style={{ fontVariationSettings: "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24" }}
                  >
                    notifications
                  </span>
                  <BadgeCounter value="3" className={styles.contextIconBadge} />
                </div>
                <div className={styles.contextIconWrapper}>
                  <span
                    className={`material-symbols-rounded ${styles.contextIcon}`}
                    style={{ fontVariationSettings: "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24" }}
                  >
                    chat
                  </span>
                  <BadgeCounter value="99+" className={styles.contextIconBadge} />
                </div>
                <div className={styles.contextIconWrapper}>
                  <span
                    className={`material-symbols-rounded ${styles.contextIcon}`}
                    style={{ fontVariationSettings: "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24" }}
                  >
                    mail
                  </span>
                  <BadgeCounter value="12" className={styles.contextIconBadge} />
                </div>
              </div>
            </div>
            <div className={styles.contextMeta}>
              <span className={styles.contextLabel}>Sobre ícones</span>
              <p className={styles.contextDesc}>Badge ancorado no canto superior direito do ícone, indicando itens pendentes.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Diretrizes ── */}
      <section className={styles.section}>
        <SectionHeader icon="checklist" title="Diretrizes de Uso" />
        <div className={styles.guidelinesGrid}>
          {BADGE_COUNTER_GUIDELINES.map((g) => (
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
