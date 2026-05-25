import BadgePointer from '../../components/BadgePointer/BadgePointer'
import { BADGE_POINTER_GUIDELINES } from '../../tokens/badgePointer'
import PageHeader from '../../components/PageHeader/PageHeader'
import SectionHeader from '../../components/SectionHeader/SectionHeader'
import styles from './BadgePointerPage.module.css'

export default function BadgePointerPage() {
  return (
    <div>
      <PageHeader
        breadcrumb="Indicators"
        title="Badge Pointer"
        subtitle="Indicador visual simples que sinaliza a presença de uma mudança, atualização ou acréscimo em um elemento. Não exibe quantidade — apenas comunica que algo novo existe e aguarda atenção do usuário."
        stats={[
          { value: 1, label: 'Variante' },
          { value: 1, label: 'Tamanho' },
        ]}
      />

      {/* ── Componente ── */}
      <section className={styles.section}>
        <SectionHeader icon="fiber_manual_record" title="Componente" />
        <div className={styles.componentCard}>
          <div className={styles.componentPreview}>
            <BadgePointer />
          </div>
          <div className={styles.componentSpecs}>
            <div className={styles.specRow}>
              <span className={styles.specKey}>Container</span>
              <span className={styles.specVal}>16 × 16px · display inline-flex · centralizador</span>
            </div>
            <div className={styles.specRow}>
              <span className={styles.specKey}>Ponto</span>
              <span className={styles.specVal}>8 × 8px · border-radius 50%</span>
            </div>
            <div className={styles.specRow}>
              <span className={styles.specKey}>Cor</span>
              <span className={styles.specVal}>--color-fill-critical (#B70634)</span>
            </div>
            <div className={styles.specRow}>
              <span className={styles.specKey}>Interação</span>
              <span className={styles.specVal}>Nenhuma — somente leitura</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Uso em contexto ── */}
      <section className={styles.section}>
        <SectionHeader icon="layers" title="Uso em Contexto" />
        <div className={styles.contextGrid}>

          <div className={styles.contextCard}>
            <div className={styles.contextPreview}>
              <div className={styles.contextIconWrapper}>
                <span className="material-symbols-rounded" style={{ fontSize: 24, color: 'var(--color-fill-secondary)' }}>
                  notifications
                </span>
                <BadgePointer className={styles.contextPointer} />
              </div>
            </div>
            <div className={styles.contextMeta}>
              <span className={styles.contextLabel}>Sobre ícone</span>
              <p className={styles.contextDesc}>Aplicado no canto superior direito de um ícone de ação ou navegação para indicar que há notificações não lidas.</p>
            </div>
          </div>

          <div className={styles.contextCard}>
            <div className={styles.contextPreview}>
              <div className={styles.contextNavItem}>
                <span className="material-symbols-rounded" style={{ fontSize: 20, color: 'var(--color-fill-secondary)' }}>
                  inbox
                </span>
                <span className={styles.contextNavLabel}>Caixa de entrada</span>
                <BadgePointer />
              </div>
            </div>
            <div className={styles.contextMeta}>
              <span className={styles.contextLabel}>Em item de menu</span>
              <p className={styles.contextDesc}>Posicionado inline ao final de um item de navegação para sinalizar conteúdo novo naquela seção.</p>
            </div>
          </div>

        </div>
      </section>

      {/* ── Diretrizes ── */}
      <section className={styles.section}>
        <SectionHeader icon="checklist" title="Diretrizes de Uso" />
        <div className={styles.guidelinesGrid}>
          {BADGE_POINTER_GUIDELINES.map((g) => (
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
