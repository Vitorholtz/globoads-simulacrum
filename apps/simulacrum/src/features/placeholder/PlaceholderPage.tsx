import styles from './PlaceholderPage.module.css'

interface PlaceholderPageProps {
  /** Nome da jornada (vem de NAV) */
  title: string
  /** Material Symbol da jornada */
  icon: string
}

/** Página temporária para jornadas ainda não implementadas. */
export default function PlaceholderPage({ title, icon }: PlaceholderPageProps) {
  return (
    <div className={styles.page}>
      <span className={`material-symbols-rounded icon-xl ${styles.icon}`} aria-hidden="true">
        {icon}
      </span>
      <h1 className="type-title-md">{title}</h1>
      <p className={`type-body-md ${styles.text}`}>
        Esta jornada ainda será construída. Em breve os fluxos estarão disponíveis aqui.
      </p>
    </div>
  )
}
