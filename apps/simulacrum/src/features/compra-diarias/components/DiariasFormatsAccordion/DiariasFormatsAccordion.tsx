import { Accordion } from '@globo-ads/ds'
import type { DiariaProduto } from '../../../../data/diarias'
import { getFormatSvg, getPrimaryDimension } from '../../../../data/rules/diarias'
import styles from './DiariasFormatsAccordion.module.css'

interface DiariasFormatsAccordionProps {
  produto: DiariaProduto
}

export default function DiariasFormatsAccordion({ produto }: DiariasFormatsAccordionProps) {
  return (
    <Accordion
      items={[
        {
          id: 'formatos',
          label: 'Formatos incluídos',
          detail: `${produto.formats.length} ${produto.formats.length === 1 ? 'formato' : 'formatos'}`,
          content: (
            <div className={styles.accordionContent}>
              <ul className={styles.formatList}>
                {produto.formats.map((f) => {
                  const svgPath = getFormatSvg(f.formatId)
                  const dim = getPrimaryDimension(f.formatId)
                  return (
                    <li key={f.formatId} className={styles.formatItem}>
                      {svgPath ? (
                        <img
                          src={svgPath}
                          alt=""
                          aria-hidden="true"
                          className={styles.formatThumb}
                        />
                      ) : (
                        <span
                          className={`material-symbols-rounded icon-sm ${styles.formatIcon}`}
                          aria-hidden="true"
                        >
                          {f.formatId === 'in-stream-video' ? 'play_circle' : 'image'}
                        </span>
                      )}
                      <div className={styles.formatInfo}>
                        <span className={`type-caption-lg ${styles.formatName}`}>
                          {f.formatName}
                        </span>
                        {dim && (
                          <span className={`type-caption-sm ${styles.formatSpecs}`}>
                            {dim.width}×{dim.height} • {f.devices}
                          </span>
                        )}
                        {f.positions.length > 0 && (
                          <span className={`type-caption-sm ${styles.formatPositions}`}>
                            {f.positions.join(', ')}
                          </span>
                        )}
                      </div>
                    </li>
                  )
                })}
              </ul>
            </div>
          ),
        },
      ]}
    />
  )
}
