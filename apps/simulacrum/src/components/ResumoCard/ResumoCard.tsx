import { type ReactNode } from 'react'
import { StaticCard } from '@globo-ads/ds'
import styles from './ResumoCard.module.css'

interface ResumoCardProps {
  /** Título do card. */
  title?: string
  /** Quando false, exibe o estado vazio (hint) no lugar das linhas. */
  hasContent: boolean
  /** Linhas do resumo (renderizadas quando `hasContent`). */
  children: ReactNode
  /** Rodapé opcional (divisor + total/CPM) — montado pelo consumidor. */
  footer?: ReactNode
}

export default function ResumoCard({
  title = 'Resumo do anúncio',
  hasContent,
  children,
  footer,
}: ResumoCardProps) {
  return (
    <StaticCard className={styles.card}>
      <p className={`type-title-sm ${styles.title}`}>{title}</p>

      {hasContent ? (
        <div className={styles.rows}>{children}</div>
      ) : (
        <p className={`type-body-xs ${styles.hint}`}>
          Suas escolhas aparecerão aqui conforme você avança.
        </p>
      )}

      {footer}
    </StaticCard>
  )
}

/** Linha simples label/valor do resumo. */
export function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className={styles.row}>
      <span className={`type-body-sm ${styles.label}`}>{label}</span>
      <span className={`type-body-sm ${styles.value}`}>{value}</span>
    </div>
  )
}

/** Linha com label e conteúdo de valor customizado (badge, ícone, logo, etc.). */
export function CustomRow({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className={styles.row}>
      <span className={`type-body-sm ${styles.label}`}>{label}</span>
      {children}
    </div>
  )
}

/** Divisor fino usado entre seções do resumo. */
export function ResumoDivider() {
  return <div className={styles.divider} />
}

/** Linha de destaque do total estimado. */
export function ResumoTotal({
  label = 'Total estimado',
  value,
}: {
  label?: string
  value: string
}) {
  return (
    <div className={styles.subtotalRow}>
      <span className={`type-body-sm ${styles.subtotalLabel}`}>{label}</span>
      <span className={`type-title-sm ${styles.subtotalValue}`}>{value}</span>
    </div>
  )
}
