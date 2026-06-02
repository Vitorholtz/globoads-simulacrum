import styles from './Footer.module.css'

/** Rodapé global. Ambiente de prototipação — não é a plataforma de produção. */
export default function Footer() {
  return (
    <footer className={styles.footer}>
      <span className={`type-caption-md ${styles.text}`}>
        Globo Ads Simulacrum · ambiente de prototipação
      </span>
    </footer>
  )
}
