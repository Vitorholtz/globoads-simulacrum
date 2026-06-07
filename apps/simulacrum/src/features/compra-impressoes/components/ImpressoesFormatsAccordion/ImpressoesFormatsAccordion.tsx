import { Accordion } from '@globo-ads/ds'
import { type ImpressoesProduto } from '../../../../data/impressoes'
import { getAdFormat, getFormatSvg, getPrimaryDimension } from '../../../../data/rules/impressoes'
import styles from './ImpressoesFormatsAccordion.module.css'

interface ImpressoesFormatsAccordionProps {
  produto: ImpressoesProduto
}

export default function ImpressoesFormatsAccordion({ produto }: ImpressoesFormatsAccordionProps) {
  return (
    <Accordion
      items={[
        {
          id: 'formatos',
          label: 'Formatos disponíveis',
          detail: `${produto.formatIds.length} ${produto.formatIds.length === 1 ? 'formato' : 'formatos'}`,
          content: (
            <div className={styles.accordionContent}>
              <ul className={styles.formatList}>
                {produto.formatIds.map((formatId) => {
                  const fmt = getAdFormat(formatId)
                  if (!fmt) return null
                  const svgPath = getFormatSvg(formatId)
                  const dim = getPrimaryDimension(formatId)
                  return (
                    <li key={formatId} className={styles.formatItem}>
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
                          {formatId === 'in-stream-video' ? 'play_circle' : 'image'}
                        </span>
                      )}
                      <div className={styles.formatInfo}>
                        <span className={`type-caption-lg ${styles.formatName}`}>{fmt.name}</span>
                        {dim && (
                          <span className={`type-caption-sm ${styles.formatSpecs}`}>
                            {dim.width}×{dim.height} •{' '}
                            {fmt.devices
                              .map((d) => d.charAt(0).toUpperCase() + d.slice(1))
                              .join(', ')}
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
