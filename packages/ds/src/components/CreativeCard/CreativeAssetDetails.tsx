import { useState, type ReactNode } from 'react'
import Badge from '../Badge/Badge'
import InteractiveCard from '../InteractiveCard/InteractiveCard'
import InteractiveThumb from '../InteractiveThumb/InteractiveThumb'
import CreativeStatusBadge from './CreativeStatusBadge'
import { cx } from '../../utils/cx'
import styles from './CreativeAssetDetails.module.css'
import type { Creative, CreativeAsset, CreativeTextContent } from './types'

export interface CreativeAssetDetailsProps {
  creative: Creative
  /** Navega para a aba "Etapas de validação" — usado pelo link do status. */
  onViewValidation?: () => void
}

/**
 * Conteúdo da aba "Detalhes" do drawer de criativos.
 *
 * Renderiza a partir de uma **lista de assets**: formatos simples derivam um
 * único asset dos campos de topo do `Creative` (aparência idêntica à anterior);
 * formatos compostos (`.zip`) trazem `assets[]` e ganham um seletor de arquivos.
 * O preview e os metadados sempre refletem o asset ativo.
 */
export default function CreativeAssetDetails({
  creative,
  onViewValidation,
}: CreativeAssetDetailsProps) {
  const assets = creative.assets ?? [assetFromCreative(creative)]
  const [activeId, setActiveId] = useState(assets[0].id)
  const active = assets.find((a) => a.id === activeId) ?? assets[0]

  return (
    <>
      <div className={styles.preview}>
        {active.kind === 'image' && active.imageSrc ? (
          <InteractiveThumb type="image" src={active.imageSrc} alt={active.label} />
        ) : active.kind === 'video' && active.videoSrc ? (
          <InteractiveThumb type="video" src={active.videoSrc} alt={active.label} />
        ) : (
          <TextStage text={active.text} />
        )}
      </div>

      <div className={styles.statusRow}>
        {creative.tag && <Badge variant="neutral" label={creative.tag} />}
        <CreativeStatusBadge
          state={creative.state}
          onStatusLink={creative.state === 'rejected' ? onViewValidation : undefined}
        />
      </div>

      {assets.length > 1 && (
        <ul className={styles.fileList}>
          {assets.map((asset) => {
            const isActive = asset.id === active.id
            return (
              <li key={asset.id}>
                <InteractiveCard
                  as="button"
                  style="outlined"
                  selected={isActive}
                  className={styles.fileRow}
                  onClick={() => setActiveId(asset.id)}
                >
                  <span className={cx('type-body-sm', styles.fileType)}>
                    {asset.extension.toLowerCase()}
                  </span>
                  <span className={cx('type-body-sm', styles.fileLabel)}>{asset.label}</span>
                  <span
                    className={cx(
                      'type-caption-sm',
                      styles.fileAction,
                      isActive ? styles.fileActionActive : ''
                    )}
                  >
                    {isActive ? 'visualizando' : 'visualizar'}
                    {isActive && (
                      <span className="material-symbols-rounded icon-sm" aria-hidden="true">
                        visibility
                      </span>
                    )}
                  </span>
                </InteractiveCard>
              </li>
            )
          })}
        </ul>
      )}

      <dl className={styles.metadata}>
        {getAssetMetadata(creative, active).map((row) => (
          <div key={row.label} className={styles.metaRow}>
            <dt className={cx('type-body-sm', styles.metaLabel)}>{row.label}</dt>
            <dd className={cx('type-body-sm', styles.metaValue)}>{row.value}</dd>
          </div>
        ))}
      </dl>
    </>
  )
}

/** Deriva um asset único a partir dos campos de topo de um criativo simples. */
function assetFromCreative(creative: Creative): CreativeAsset {
  return {
    id: creative.id,
    label: creative.name,
    kind: creative.kind === 'video' ? 'video' : 'image',
    imageSrc: creative.imageSrc,
    videoSrc: creative.videoSrc,
    extension: creative.extension,
    dimension: creative.dimension,
    duration: creative.duration,
    size: creative.size,
  }
}

/** Linhas de metadados técnicos do asset ativo. */
function getAssetMetadata(
  creative: Creative,
  asset: CreativeAsset
): { label: string; value: ReactNode }[] {
  const rows: { label: string; value: ReactNode }[] = [
    { label: 'Título', value: asset.label },
    { label: 'Formato', value: creative.format },
  ]
  if ((asset.kind === 'image' || asset.kind === 'video') && asset.dimension) {
    rows.push({ label: 'Dimensão', value: asset.dimension })
  }
  if (asset.kind === 'video' && asset.duration) {
    rows.push({ label: 'Duração', value: asset.duration })
  }
  rows.push({ label: 'Extensão', value: asset.extension }, { label: 'Tamanho', value: asset.size })
  if (asset.kind === 'text' && asset.text) {
    if (asset.text.variant === 'cta') {
      rows.push(
        { label: 'Texto do CTA', value: asset.text.ctaText },
        { label: 'Cor do botão', value: <ColorValue hex={asset.text.buttonColor} /> },
        { label: 'Cor do texto', value: <ColorValue hex={asset.text.textColor} /> }
      )
    } else {
      rows.push(
        { label: 'Título', value: asset.text.title },
        { label: 'Subtítulo', value: asset.text.subtitle }
      )
    }
  }
  rows.push({ label: 'Data e hora do upload', value: creative.uploadedAt })
  return rows
}

/**
 * Palco de preview de um asset de texto. Renderiza conforme o `variant`: CTA
 * mostra o botão pintado com as cores do `.txt`; título/subtítulo (Carrossel)
 * mostra o par de textos centralizado.
 */
function TextStage({ text }: { text?: CreativeTextContent }) {
  if (text?.variant === 'titulo-subtitulo') {
    return (
      <div className={styles.textStage}>
        <span className={cx('type-title-sm', styles.textTitle)}>{text.title}</span>
        <span className={cx('type-body-sm', styles.textSubtitle)}>{text.subtitle}</span>
      </div>
    )
  }
  return (
    <div className={styles.ctaStage}>
      <span
        className={cx('type-body-md', styles.ctaButton)}
        style={{ background: text?.buttonColor, color: text?.textColor }}
      >
        {text?.ctaText}
      </span>
    </div>
  )
}

/** Valor de cor: um swatch pintado com o `#hex` (conteúdo dinâmico do .txt). */
function ColorValue({ hex }: { hex: string }) {
  return (
    <span className={styles.colorValue}>
      <span className={styles.swatch} style={{ background: hex }} aria-hidden="true" />
      {hex}
    </span>
  )
}
