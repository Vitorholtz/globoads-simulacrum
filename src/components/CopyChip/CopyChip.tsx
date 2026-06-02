import { useState } from 'react'
import styles from './CopyChip.module.css'

interface CopyChipProps {
  value: string
}

export default function CopyChip({ value }: CopyChipProps) {
  const [copied, setCopied] = useState(false)

  function handleCopy() {
    navigator.clipboard.writeText(value).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  return (
    <button
      type="button"
      className={`type-caption-sm ${styles.chip}`}
      onClick={handleCopy}
      title={copied ? 'Copiado!' : `Copiar ${value}`}
    >
      <span className={styles.chipValue}>{value}</span>
      <span className={`material-symbols-rounded icon-xs ${styles.chipIcon}`} aria-hidden="true">
        {copied ? 'check' : 'content_copy'}
      </span>
    </button>
  )
}
