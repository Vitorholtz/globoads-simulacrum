import Badge from '../Badge/Badge'
import { CREATIVE_STATUS } from './creativeLifecycle'
import type { CreativeState } from './types'

export interface CreativeStatusBadgeProps {
  /** Estado do criativo — a apresentação do badge é derivada dele. */
  state: CreativeState
  /** Ação do link do status (rejected → "Ver detalhes" abre a validação). */
  onStatusLink?: () => void
  className?: string
}

/**
 * Badge de status do criativo, derivado do `state` via `CREATIVE_STATUS`.
 *
 * Quando há `link` (ex.: "Recusado" + "Ver detalhes"), o trecho é clicável via
 * `onStatusLink`.
 */
export default function CreativeStatusBadge({
  state,
  onStatusLink,
  className,
}: CreativeStatusBadgeProps) {
  const status = CREATIVE_STATUS[state]
  return (
    <Badge
      className={className}
      variant={status.variant}
      label={status.label}
      link={status.link}
      onLinkClick={status.link ? onStatusLink : undefined}
    />
  )
}
