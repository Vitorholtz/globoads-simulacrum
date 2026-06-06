import styles from './PageContainer.module.css'

interface PageContainerProps {
  children: React.ReactNode
  narrow?: boolean
  className?: string
}

export default function PageContainer({ children, narrow, className }: PageContainerProps) {
  return (
    <div
      className={[styles.container, narrow && styles.narrow, className].filter(Boolean).join(' ')}
    >
      {children}
    </div>
  )
}
