import type { ReactNode } from 'react'
import SectionHeader from '../SectionHeader/SectionHeader'
import styles from './Section.module.css'

interface SectionProps {
  icon: string
  title: string
  count?: string | number
  children: ReactNode
  className?: string
}

/**
 * Page section: a spaced `<section>` wrapper with a `SectionHeader`.
 * Replaces the `<section className={styles.section}>` + `<SectionHeader />`
 * scaffold duplicated across every documentation page.
 */
export default function Section({ icon, title, count, children, className }: SectionProps) {
  const cls = [styles.section, className ?? ''].filter(Boolean).join(' ')

  return (
    <section className={cls}>
      <SectionHeader icon={icon} title={title} count={count} />
      {children}
    </section>
  )
}
