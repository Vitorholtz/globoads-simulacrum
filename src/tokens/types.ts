/**
 * Shared base types for the token layer.
 *
 * Import these instead of re-defining per-component variants —
 * e.g. use `GuidelineDef` instead of `BadgeGuidelineDef`.
 */

/** Guideline card displayed on documentation pages. */
export type GuidelineDef = {
  title: string
  body: string
  rule: string
}

/** A component state entry (e.g. hover, focus, disabled) for state-matrix docs. */
export type StateDef<T = string> = {
  id: T
  label: string
  description: string
}

/** A component variant or type entry (e.g. primary, secondary) for docs. */
export type VariantDef<T = string> = {
  id: T
  label: string
  description: string
}

/** A component behavior entry (e.g. checked, unchecked) for docs. */
export type BehaviorDef<T = string> = {
  id: T
  label: string
  /** Optional Material Symbols icon name shown alongside the label. */
  icon?: string
  description: string
}
