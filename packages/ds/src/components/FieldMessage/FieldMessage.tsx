import styles from './FieldMessage.module.css'

interface FieldMessageProps {
  helpText?: string
  errorMessage?: string
  hasError?: boolean
}

/**
 * Help/error line shown beneath a field. Renders the error message when the
 * field is in error (and a message exists), otherwise the help text. Renders
 * nothing when neither applies. Shared by the text-input components.
 */
export default function FieldMessage({
  helpText,
  errorMessage,
  hasError = false,
}: FieldMessageProps) {
  if (hasError && errorMessage) {
    return <p className={`type-body-xs ${styles.errorText}`}>{errorMessage}</p>
  }
  if (helpText && !hasError) {
    return <p className={`type-body-xs ${styles.helpText}`}>{helpText}</p>
  }
  return null
}
