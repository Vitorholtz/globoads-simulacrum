import Breadcrumb from '../../components/Breadcrumb/Breadcrumb'
import type { BreadcrumbItem } from '../../components/Breadcrumb/Breadcrumb'
import { BREADCRUMB_DEPTHS, BREADCRUMB_GUIDELINES } from '../../tokens/breadcrumb'
import PageHeader from '../../components/PageHeader/PageHeader'
import SectionHeader from '../../components/SectionHeader/SectionHeader'
import styles from './BreadcrumbPage.module.css'

function depthToItems(labels: string[]): BreadcrumbItem[] {
  return labels.map((label, index) => ({
    label,
    onClick: index < labels.length - 1 ? () => {} : undefined,
  }))
}

export default function BreadcrumbPage() {
  return (
    <div>
      <PageHeader
        breadcrumb="Navigations"
        title="Breadcrumb"
        subtitle="O breadcrumb é um componente de navegação que permite a localização dentro da estrutura hierárquica do produto. Exibe o caminho percorrido do nível raiz até a página atual."
        stats={[
          { value: 4, label: 'Profundidades' },
          { value: 2, label: 'Tipos de item' },
        ]}
      />

      {/* ── Profundidades ── */}
      <section className={styles.section}>
        <SectionHeader icon="route" title="Profundidades" count={`${BREADCRUMB_DEPTHS.length} exemplos`} />
        <div className={styles.depthsContainer}>
          {BREADCRUMB_DEPTHS.map((depth) => (
            <div key={depth.label} className={styles.depthRow}>
              <div className={styles.depthPreview}>
                <Breadcrumb items={depthToItems(depth.items)} />
              </div>
              <div className={styles.depthMeta}>
                <span className={`type-body-sm ${styles.depthLabel}`}>{depth.label}</span>
                <span className={`type-caption-sm ${styles.depthCount}`}>{depth.levels} itens</span>
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
            <Breadcrumb
              items={depthToItems(['Início', 'Campanhas', 'Relatórios', 'Página atual'])}
            />
          </div>
          <div className={styles.anatomySpecs}>
            <div className={styles.specRow}>
              <span className={`type-body-sm ${styles.specKey}`}>Links anteriores</span>
              <span className={`type-body-sm ${styles.specVal}`}>14px · weight 500 · cor accent</span>
            </div>
            <div className={styles.specRow}>
              <span className={`type-body-sm ${styles.specKey}`}>Página atual</span>
              <span className={`type-body-sm ${styles.specVal}`}>16px · weight 600 · cor primária</span>
            </div>
            <div className={styles.specRow}>
              <span className={`type-body-sm ${styles.specKey}`}>Separador</span>
              <span className={`type-body-sm ${styles.specVal}`}>chevron_right · 16px · cor secundária</span>
            </div>
            <div className={styles.specRow}>
              <span className={`type-body-sm ${styles.specKey}`}>Gap entre itens</span>
              <span className={`type-body-sm ${styles.specVal}`}>8px</span>
            </div>
            <div className={styles.specRow}>
              <span className={`type-body-sm ${styles.specKey}`}>Hover nos links</span>
              <span className={`type-body-sm ${styles.specVal}`}>text-decoration: underline</span>
            </div>
            <div className={styles.specRow}>
              <span className={`type-body-sm ${styles.specKey}`}>Página atual</span>
              <span className={`type-body-sm ${styles.specVal}`}>não interativa · aria-current="page"</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Diretrizes ── */}
      <section className={styles.section}>
        <SectionHeader icon="checklist" title="Diretrizes de Uso" />
        <div className={styles.guidelinesGrid}>
          {BREADCRUMB_GUIDELINES.map((g) => (
            <div key={g.title} className={styles.guidelineCard}>
              <h3 className={`type-body-md ${styles.guidelineTitle}`}>{g.title}</h3>
              <p className={`type-body-sm ${styles.guidelineBody}`}>{g.body}</p>
              <div className={`type-caption-sm ${styles.guidelineRule}`}>{g.rule}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
