import styles from './PlatformChip.module.css'

interface PlatformChipProps {
  /** Nome de exibição da plataforma/portal. */
  name: string
  /** Caminho do logo; quando ausente, a pílula mostra só o nome. */
  svgPath?: string
}

/** Pílula com logo + nome de uma plataforma/portal (recibos de compra). */
export default function PlatformChip({ name, svgPath }: PlatformChipProps) {
  return (
    <span className={styles.chip}>
      {svgPath && <img src={svgPath} alt="" aria-hidden="true" className={styles.logo} />}
      <span className={`type-caption-md ${styles.name}`}>{name}</span>
    </span>
  )
}
