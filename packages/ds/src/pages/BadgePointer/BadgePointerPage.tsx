import BadgePointer from '../../components/BadgePointer/BadgePointer'
import { BADGE_POINTER_GUIDELINES } from '../../tokens/badgePointer'
import PageHeader from '../../components/docs/PageHeader/PageHeader'
import GuidelinesGrid from '../../components/docs/GuidelinesGrid/GuidelinesGrid'
import Section from '../../components/docs/Section/Section'
import DemoCard from '../../components/docs/DemoCard/DemoCard'
import CardGrid from '../../components/docs/CardGrid/CardGrid'
import InfoCard from '../../components/docs/InfoCard/InfoCard'
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
        <InfoCard
          preview={<BadgePointer />}
          specs={[
            { label: 'Container', value: '16 × 16px · display inline-flex · centralizador' },
            { label: 'Ponto', value: '8 × 8px · border-radius 50%' },
            { label: 'Cor', value: '--color-fill-critical (#B70634)' },
            { label: 'Interação', value: 'Nenhuma — somente leitura' },
          ]}
        />
      </Section>

      {/* ── Uso em contexto ── */}
      <Section icon="layers" title="Uso em Contexto">
        <CardGrid>
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
