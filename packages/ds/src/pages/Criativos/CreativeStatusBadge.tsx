import Badge from '../../components/Badge/Badge'
import type { BadgeVariant } from '../../tokens/badge'

export interface CreativeStatusBadgeProps {
  /** Texto do status (ex.: "Aprovado", "Em análise", "Reprovado"). */
  status: string
  /** Variante semântica do badge. */
  statusVariant: BadgeVariant
  /** Texto-link sublinhado exibido após o status (ex.: "Ver detalhes"). */
  statusLink?: string
  /** Renderiza o próprio status como link sublinhado, sem rótulo separado. */
  statusAsLink?: boolean
  /** Ação do link; ausente torna o link apenas decorativo. */
  onStatusLink?: () => void
  className?: string
}

/**
 * Badge de status dos cards de criativo.
 *
 * Centraliza a derivação rótulo/link a partir dos campos do `Creative`: quando
 * `statusAsLink`, o próprio status vira o link sublinhado (ex.: "Pronto para
 * anunciar"); caso contrário, `statusLink` é um trecho-link após o status
 * (ex.: "Reprovado" + "Ver detalhes").
 */
export default function CreativeStatusBadge({
  status,
  statusVariant,
  statusLink,
  statusAsLink,
  onStatusLink,
  className,
}: CreativeStatusBadgeProps) {
  return (
    <Badge
      className={className}
      variant={statusVariant}
      label={statusAsLink ? undefined : status}
      link={statusAsLink ? status : statusLink}
      onLinkClick={onStatusLink}
    />
  )
}
