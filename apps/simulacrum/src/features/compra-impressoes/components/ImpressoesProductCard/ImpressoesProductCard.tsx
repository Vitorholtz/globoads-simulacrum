import { useEffect, useState } from 'react'
import { Checkbox, InteractiveCard, Radio } from '@globo-ads/ds'
import {
  getPlatform,
  PLATFORM_DISPLAY_NAMES,
  type ImpressoesProduto,
  type PlatformId,
} from '../../../../data/impressoes'
import {
  getAdFormat,
  getCpmRange,
  getCpmSectionLabel,
  formatCurrency,
} from '../../../../data/rules/impressoes'
import styles from './ImpressoesProductCard.module.css'

interface ImpressoesProductCardProps {
  produto: ImpressoesProduto
  selected: boolean
  selectedPlatforms: PlatformId[]
  selectedCpmOptionId: string | null
  onSelect: () => void
  onPlatformToggle: (id: PlatformId) => void
  onCpmSelect: (id: string) => void
}

export default function ImpressoesProductCard({
  produto,
  selected,
  selectedPlatforms,
  selectedCpmOptionId,
  onSelect,
  onPlatformToggle,
  onCpmSelect,
}: ImpressoesProductCardProps) {
  const range = getCpmRange(produto)
  const cpmLabel =
    range.min === range.max
      ? `${formatCurrency(range.min)} / mil`
      : `A partir de ${formatCurrency(range.min)} / mil`

  const [isExpanded, setIsExpanded] = useState(selected)
  const [isOpen, setIsOpen] = useState(selected)

  useEffect(() => {
    const rafs: number[] = []
    const timers: ReturnType<typeof setTimeout>[] = []

    if (selected) {
      rafs.push(
        requestAnimationFrame(() => {
          setIsExpanded(true)
          rafs.push(requestAnimationFrame(() => setIsOpen(true)))
        })
      )
    } else {
      rafs.push(requestAnimationFrame(() => setIsOpen(false)))
      timers.push(setTimeout(() => setIsExpanded(false), 200))
    }

    return () => {
      rafs.forEach(cancelAnimationFrame)
      timers.forEach(clearTimeout)
    }
  }, [selected])

  return (
    <div className={styles.wrapper}>
      {/* ── Card do produto — InteractiveCard cuida de hover/focus/active ── */}
      <InteractiveCard
        style="on-secondary"
        className={`${styles.card} ${selected ? styles.cardSelected : ''}`}
        onClick={onSelect}
        aria-pressed={selected}
        aria-label={`Selecionar ${produto.name}`}
      >
        <div className={styles.cardTop}>
          <div className={styles.cardInfo}>
            <span className={`type-title-sm ${styles.name}`}>{produto.name}</span>
            <p className={`type-body-sm ${styles.description}`}>{produto.description}</p>
          </div>
        </div>

        <div className={styles.formatsSection}>
          <span className={`type-caption-sm ${styles.sectionLabel}`}>Formatos</span>
          <div className={styles.formatsRow}>
            {produto.formatIds.slice(0, 4).map((id) => {
              const fmt = getAdFormat(id)
              return fmt ? (
                <span key={id} className={`type-caption-sm ${styles.formatChip}`}>
                  {fmt.name}
                </span>
              ) : null
            })}
            {produto.formatIds.length > 4 && (
              <span className={`type-caption-sm ${styles.moreFormats}`}>
                +{produto.formatIds.length - 4}
              </span>
            )}
          </div>
        </div>

        <div className={styles.divider} />

        <div className={styles.footer}>
          <span
            className={`type-caption-md ${styles.platformsCount} ${selected ? styles.footerHidden : ''}`}
          >
            {produto.platforms.length === 1
              ? PLATFORM_DISPLAY_NAMES[produto.platforms[0]]
              : `${produto.platforms.length} plataformas`}
          </span>
          <span
            className={`type-caption-md ${styles.cpmRange} ${selected ? styles.footerHidden : ''}`}
          >
            {cpmLabel}
          </span>
          <span
            className={`type-caption-md ${styles.footerConfigure} ${selected ? styles.footerConfigureVisible : ''}`}
          >
            Configure seu produto
          </span>
        </div>
      </InteractiveCard>

      {/* ── Painel expandido ── */}
      {isExpanded && (
        <div className={styles.expansion} data-open={String(isOpen)}>
          <div className={styles.expansionInner}>
            <div className={styles.configPanel}>
              {/* ── Plataformas ── */}
              <div className={styles.configSection}>
                <span className={`type-caption-sm ${styles.sectionLabel}`}>Plataformas</span>
                <div className={styles.platformsGrid}>
                  {produto.platforms.map((platformId) => {
                    const platform = getPlatform(platformId)
                    const isChecked = selectedPlatforms.includes(platformId)
                    const isInteractive = produto.platformSelection === 'multiple'

                    return isInteractive ? (
                      /*
                       * InteractiveCard as="div" provê hover/active/focus do DS.
                       * onClick cobre cliques fora do Checkbox; o stopPropagation no
                       * wrapper interno evita double-toggle quando o clique vem do
                       * próprio Checkbox.
                       */
                      <InteractiveCard
                        key={platformId}
                        as="div"
                        style="on-secondary"
                        className={`${styles.platformItem} ${isChecked ? styles.platformItemChecked : ''}`}
                        onClick={() => onPlatformToggle(platformId)}
                      >
                        <div className={styles.platformItemLeft}>
                          {platform.svgPath && (
                            <div className={styles.platformLogoWrap}>
                              <img
                                src={platform.svgPath}
                                alt=""
                                aria-hidden="true"
                                className={styles.platformLogo}
                              />
                            </div>
                          )}
                          <span className={`type-body-sm ${styles.platformName}`}>
                            {PLATFORM_DISPLAY_NAMES[platformId]}
                          </span>
                        </div>
                        {/* stopPropagation evita que o click no Checkbox borbulhe e dispare
                          o onClick do div pai, causando double-toggle */}
                        <div onClick={(e) => e.stopPropagation()}>
                          <Checkbox
                            checked={isChecked}
                            onChange={() => onPlatformToggle(platformId)}
                            aria-label={PLATFORM_DISPLAY_NAMES[platformId]}
                          />
                        </div>
                      </InteractiveCard>
                    ) : (
                      <div
                        key={platformId}
                        className={`${styles.platformItem} ${styles.platformItemFixed}`}
                      >
                        <div className={styles.platformItemLeft}>
                          {platform.svgPath && (
                            <div className={styles.platformLogoWrap}>
                              <img
                                src={platform.svgPath}
                                alt=""
                                aria-hidden="true"
                                className={styles.platformLogo}
                              />
                            </div>
                          )}
                          <span className={`type-body-sm ${styles.platformName}`}>
                            {PLATFORM_DISPLAY_NAMES[platformId]}
                          </span>
                        </div>
                        <Radio
                          name={`platform-fixed-${produto.id}`}
                          value={platformId}
                          checked={true}
                          onChange={() => {}}
                          aria-label={PLATFORM_DISPLAY_NAMES[platformId]}
                        />
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* ── Secundagem / CPM ── */}
              {produto.cpmOptions.length > 1 && (
                <div className={styles.configSection}>
                  <span className={`type-caption-sm ${styles.sectionLabel}`}>
                    {getCpmSectionLabel(produto.id)}
                  </span>
                  <div className={styles.cpmList} role="radiogroup" aria-label="Secundagem">
                    {produto.cpmOptions.map((opt) => {
                      const isSelected = selectedCpmOptionId === opt.id
                      return (
                        <InteractiveCard
                          key={opt.id}
                          as="div"
                          style="on-secondary"
                          className={styles.cpmRow}
                          onClick={() => onCpmSelect(opt.id)}
                        >
                          <span className={`type-body-sm ${styles.cpmLabel}`}>
                            {produto.id === 'fast'
                              ? (() => {
                                  const [channel, ...rest] = opt.label.split(' ')
                                  return (
                                    <>
                                      {channel}
                                      <span className={styles.cpmLabelDivider} aria-hidden="true" />
                                      {rest.join(' ')}
                                    </>
                                  )
                                })()
                              : opt.label}
                          </span>
                          <div className={styles.cpmRowRight}>
                            <span className={`type-caption-md ${styles.cpmPrice}`}>
                              {formatCurrency(opt.cpm)} / mil
                            </span>
                            <div onClick={(e) => e.stopPropagation()}>
                              <Radio
                                name={`cpm-${produto.id}`}
                                value={opt.id}
                                checked={isSelected}
                                onChange={() => onCpmSelect(opt.id)}
                                aria-label={opt.label}
                              />
                            </div>
                          </div>
                        </InteractiveCard>
                      )
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
