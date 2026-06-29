import { useState } from 'react'
import BadgeCounter from '../../components/BadgeCounter/BadgeCounter'
import Tabs from '../../components/Tabs/Tabs'
import type { TabItem } from '../../components/Tabs/Tabs'
import { BADGE_COUNTER_EXAMPLES, BADGE_COUNTER_GUIDELINES } from '../../tokens/badgeCounter'
import PageHeader from '../../components/docs/PageHeader/PageHeader'
import Section from '../../components/docs/Section/Section'
import DemoCard from '../../components/docs/DemoCard/DemoCard'
import CardGrid from '../../components/docs/CardGrid/CardGrid'
import InfoCard from '../../components/docs/InfoCard/InfoCard'
import ShowcaseList from '../../components/docs/ShowcaseList/ShowcaseList'
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
        <ShowcaseList
          previewWidth={120}
          rows={BADGE_COUNTER_EXAMPLES.map((ex) => ({
            id: ex.value,
            label: ex.label,
            badge: `"${ex.value}"`,
            description: ex.description,
          }))}
          renderPreview={(row) => <BadgeCounter value={row.id} />}
        />
      </Section>

      {/* ── Anatomia ── */}
      <Section icon="info" title="Anatomia">
        <InfoCard
          preview={
            <div className={styles.anatomyDiagram}>
              <BadgeCounter value="12" />
            </div>
          }
          specs={[
            { label: 'Altura', value: '16px (fixo)' },
            { label: 'Largura mínima', value: '16px' },
            { label: 'Padding horizontal', value: '4px' },
            { label: 'Border-radius', value: '9999px (pílula)' },
            { label: 'Tipografia', value: '12px · weight 500 · lh 16px' },
            { label: 'Background', value: '--color-fill-critical · #B70634' },
            { label: 'Cor do texto', value: '--color-fill-inverse · #FFFFFF' },
          ]}
        />
      </Section>

      {/* ── Contextos de Uso ── */}
      <Section icon="widgets" title="Contextos de Uso">
        <CardGrid>
          <DemoCard
            preview={
              <Tabs items={TAB_CONTEXT_ITEMS} activeId={activeTab} onChange={setActiveTab} />
            }
            title="Em tabs e navegação"
            description="Badge posicionado imediatamente após o rótulo, alinhado ao centro vertical."
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
        <CardGrid wide>
          {BADGE_COUNTER_GUIDELINES.map((g) => (
            <DemoCard key={g.title} title={g.title} description={g.body} />
          ))}
        </CardGrid>
      </Section>
    </div>
  )
}
