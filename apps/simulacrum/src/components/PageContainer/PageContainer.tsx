import styles from './PageContainer.module.css'

interface PageContainerProps {
  children: React.ReactNode
  fluid?: boolean
  className?: string
}

export default function PageContainer({ children, fluid, className }: PageContainerProps) {
  return (
    <div className={[styles.container, fluid && styles.fluid, className].filter(Boolean).join(' ')}>
      {children}
    </div>
  )
}
