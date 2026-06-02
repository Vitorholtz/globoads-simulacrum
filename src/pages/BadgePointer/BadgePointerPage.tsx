import BadgePointer from '../../components/BadgePointer/BadgePointer'
import { BADGE_POINTER_GUIDELINES } from '../../tokens/badgePointer'
import PageHeader from '../../components/PageHeader/PageHeader'
import GuidelinesGrid from '../../components/GuidelinesGrid/GuidelinesGrid'
import Section from '../../components/Section/Section'
import DemoCard from '../../components/DemoCard/DemoCard'
import CardGrid from '../../components/CardGrid/CardGrid'
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
      <Section icon="fiber_manual_record" title="Componente">
        <div className={styles.componentCard}>
          <div className={styles.componentPreview}>
            <BadgePointer />
          </div>
          <div className={styles.componentSpecs}>
            <div className={styles.specRow}>
              <span className={`type-body-sm ${styles.specKey}`}>Container</span>
              <span className={`type-body-sm ${styles.specVal}`}>
                16 × 16px · display inline-flex · centralizador
              </span>
            </div>
            <div className={styles.specRow}>
              <span className={`type-body-sm ${styles.specKey}`}>Ponto</span>
              <span className={`type-body-sm ${styles.specVal}`}>8 × 8px · border-radius 50%</span>
            </div>
            <div className={styles.specRow}>
              <span className={`type-body-sm ${styles.specKey}`}>Cor</span>
              <span className={`type-body-sm ${styles.specVal}`}>
                --color-fill-critical (#B70634)
              </span>
            </div>
            <div className={styles.specRow}>
              <span className={`type-body-sm ${styles.specKey}`}>Interação</span>
              <span className={`type-body-sm ${styles.specVal}`}>Nenhuma — somente leitura</span>
            </div>
          </div>
        </div>
      </Section>

      {/* ── Uso em contexto ── */}
      <Section icon="layers" title="Uso em Contexto">
        <CardGrid cols={2}>
          <DemoCard
            preview={
              <div className={styles.contextIconWrapper}>
                <span
                  className="material-symbols-rounded icon-lg"
                  style={{ color: 'var(--color-fill-secondary)' }}
                >
                  notifications
                </span>
                <BadgePointer className={styles.contextPointer} />
              </div>
            }
            title="Sobre ícone"
            description="Aplicado no canto superior direito de um ícone de ação ou navegação para indicar que há notificações não lidas."
            previewPad="lg"
          />
          <DemoCard
            preview={
              <div className={styles.contextNavItem}>
                <span
                  className="material-symbols-rounded icon-md"
                  style={{ color: 'var(--color-fill-secondary)' }}
                >
                  inbox
                </span>
                <span className={`type-body-sm ${styles.contextNavLabel}`}>Caixa de entrada</span>
                <BadgePointer />
              </div>
            }
            title="Em item de menu"
            description="Posicionado inline ao final de um item de navegação para sinalizar conteúdo novo naquela seção."
            previewPad="lg"
          />
        </CardGrid>
      </Section>

      {/* ── Diretrizes ── */}
      <Section icon="checklist" title="Diretrizes de Uso">
        <GuidelinesGrid items={BADGE_POINTER_GUIDELINES} />
      </Section>
    </div>
  )
}
