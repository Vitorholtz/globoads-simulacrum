import { InteractiveCard, Badge } from '@globo-ads/ds'
import {
  PLATFORM_DISPLAY_NAMES,
  type ImpressoesProduto,
  type PlatformId,
} from '../../../../data/impressoes'
import {
  getAdFormat,
  getCpmRange,
  getFormatSvg,
  formatCurrency,
} from '../../../../data/rules/impressoes'
import styles from './ImpressoesProductCard.module.css'

interface ImpressoesProductCardProps {
  produto: ImpressoesProduto
  selected: boolean
  onSelect: () => void
}

function platformsSummary(platforms: PlatformId[]): string {
  if (platforms.length === 1) return PLATFORM_DISPLAY_NAMES[platforms[0]]
  if (platforms.length <= 3) return platforms.map((p) => PLATFORM_DISPLAY_NAMES[p]).join(' · ')
  return `${platforms.length} plataformas`
}

export default function ImpressoesProductCard({
  produto,
  selected,
  onSelect,
}: ImpressoesProductCardProps) {
  const range = getCpmRange(produto)
  const cpmLabel =
    range.min === range.max
      ? `${formatCurrency(range.min)} / mil`
      : `A partir de ${formatCurrency(range.min)} / mil`

  return (
    <InteractiveCard
      className={`${styles.card} ${selected ? styles.cardSelected : ''}`}
      onClick={onSelect}
      aria-pressed={selected}
      aria-label={`Selecionar ${produto.name}`}
    >
      <div className={styles.header}>
        <div className={styles.thumbs}>
          {produto.formatIds.slice(0, 3).map((id) => {
            const svg = getFormatSvg(id)
            return svg ? (
              <img key={id} src={svg} alt="" aria-hidden="true" className={styles.thumb} />
            ) : null
          })}
        </div>
        {selected && (
          <span className={`material-symbols-rounded icon-md ${styles.check}`} aria-hidden="true">
            check_circle
          </span>
        )}
      </div>

      <div className={styles.body}>
        <span className={`type-title-sm ${styles.name}`}>{produto.name}</span>
        <p className={`type-body-sm ${styles.description}`}>{produto.description}</p>
      </div>

      <div className={styles.formatsRow}>
        {produto.formatIds.slice(0, 4).map((id) => {
          const fmt = getAdFormat(id)
          return fmt ? <Badge key={id} variant="neutral" label={fmt.name} /> : null
        })}
        {produto.formatIds.length > 4 && (
          <span className={`type-caption-sm ${styles.moreFormats}`}>
            +{produto.formatIds.length - 4}
          </span>
        )}
      </div>

      <div className={styles.footer}>
        <span className={`type-caption-md ${styles.platforms}`}>
          {platformsSummary(produto.platforms)}
        </span>
        <span className={`type-caption-md ${styles.cpm}`}>{cpmLabel}</span>
      </div>
    </InteractiveCard>
  )
}
