import { Accordion } from '@globo-ads/ds'
import styles from './FormatsAccordion.module.css'

/** Item normalizado de formato publicitário, agnóstico de domínio (Diárias/Impressões). */
export interface FormatListItem {
  id: string
  name: string
  /** Thumbnail do formato; quando ausente, usa-se o ícone de fallback. */
  svgPath?: string
  /** Ícone Material Symbols exibido quando não há thumbnail. */
  fallbackIcon: string
  /** Linha de especificações pronta, ex.: "300×250 • Desktop, Mobile". */
  specs?: string
  /** Posições de veiculação (exibidas apenas quando houver). */
  positions?: string[]
}

interface FormatsAccordionProps {
  items: FormatListItem[]
  label?: string
}

export default function FormatsAccordion({
  items,
  label = 'Formatos disponíveis',
}: FormatsAccordionProps) {
  return (
    <Accordion
      items={[
        {
          id: 'formatos',
          label,
          detail: `${items.length} ${items.length === 1 ? 'formato' : 'formatos'}`,
          content: (
            <div className={styles.accordionContent}>
              <ul className={styles.formatList}>
                {items.map((item) => (
                  <li key={item.id} className={styles.formatItem}>
                    {item.svgPath ? (
                      <img
                        src={item.svgPath}
                        alt=""
                        aria-hidden="true"
                        className={styles.formatThumb}
                      />
                    ) : (
                      <span
                        className={`material-symbols-rounded icon-sm ${styles.formatIcon}`}
                        aria-hidden="true"
                      >
                        {item.fallbackIcon}
                      </span>
                    )}
                    <div className={styles.formatInfo}>
                      <span className={`type-caption-lg ${styles.formatName}`}>{item.name}</span>
                      {item.specs && (
                        <span className={`type-caption-sm ${styles.formatSpecs}`}>
                          {item.specs}
                        </span>
                      )}
                      {item.positions && item.positions.length > 0 && (
                        <span className={`type-caption-sm ${styles.formatPositions}`}>
                          {item.positions.join(', ')}
                        </span>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ),
        },
      ]}
    />
  )
}
