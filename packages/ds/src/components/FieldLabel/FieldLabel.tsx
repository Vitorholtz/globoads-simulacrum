import styles from './FieldLabel.module.css'

interface FieldLabelProps {
  label: string
  /** id of the field this labels (for the `htmlFor` link). */
  htmlFor: string
  showLabel?: boolean
  optional?: boolean
  /** Suppresses the "Opcional" tag — a read-only field has no fill state to mark. */
  readOnly?: boolean
  /** When set, shows an info icon with a hover/focus tooltip. */
  descriptionText?: string
}

/**
 * Field label row shared by the text-input components: the label itself, an
 * optional description tooltip, and an optional "Opcional" tag. Renders nothing
 * when `showLabel` is false.
 */
export default function FieldLabel({
  label,
  htmlFor,
  showLabel = true,
  optional = false,
  readOnly = false,
  descriptionText,
}: FieldLabelProps) {
  if (!showLabel) return null

  return (
    <div className={styles.labelRow}>
      <div className={styles.labelGroup}>
        <label className={`type-caption-md ${styles.label}`} htmlFor={htmlFor}>
          {label}
        </label>
        {descriptionText && (
          <button type="button" className={styles.descriptionBtn} aria-label="Mais informações">
            <span
              className={`material-symbols-rounded icon-xs ${styles.descriptionIcon}`}
              aria-hidden="true"
            >
              info
            </span>
            <span className={`type-body-sm ${styles.tooltip}`} role="tooltip">
              {descriptionText}
              <span className={styles.tooltipArrow} aria-hidden="true" />
            </span>
          </button>
        )}
      </div>
      {optional && !readOnly && (
        <span className={`type-caption-sm ${styles.optionalTag}`}>Opcional</span>
      )}
    </div>
  )
}
