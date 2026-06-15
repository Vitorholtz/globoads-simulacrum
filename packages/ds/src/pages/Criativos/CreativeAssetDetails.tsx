import { useState, type ReactNode } from 'react'
import Badge from '../../components/Badge/Badge'
import InteractiveCard from '../../components/InteractiveCard/InteractiveCard'
import { cx } from '../../utils/cx'
import styles from './CreativeAssetDetails.module.css'
import type { Creative, CreativeAsset } from './creatives'

export interface CreativeAssetDetailsProps {
  creative: Creative
}

/**
 * Conteúdo da aba "Detalhes" do drawer de criativos.
 *
 * Renderiza a partir de uma **lista de assets**: formatos simples derivam um
 * único asset dos campos de topo do `Creative` (aparência idêntica à anterior);
 * formatos compostos (`.zip`) trazem `assets[]` e ganham um seletor de arquivos.
 * O preview e os metadados sempre refletem o asset ativo.
 */
export default function CreativeAssetDetails({ creative }: CreativeAssetDetailsProps) {
  const assets = creative.assets ?? [assetFromCreative(creative)]
  const [activeId, setActiveId] = useState(assets[0].id)
  const active = assets.find((a) => a.id === activeId) ?? assets[0]

  return (
    <>
      <div className={styles.preview}>
        {active.kind === 'image' ? (
          <img className={styles.previewImage} src={active.imageSrc} alt="" />
        ) : (
          <div className={styles.ctaStage}>
            <span
              className={cx('type-body-md', styles.ctaButton)}
              style={{ background: active.text?.buttonColor, color: active.text?.textColor }}
            >
              {active.text?.ctaText}
            </span>
          </div>
        )}
      </div>

      <div className={styles.statusRow}>
        {creative.tag && <Badge variant="neutral" label={creative.tag} />}
        <Badge variant={creative.statusVariant} label={creative.status} />
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
    kind: 'image',
    imageSrc: creative.imageSrc,
    extension: creative.extension,
    dimension: creative.dimension,
    size: creative.size,
  }
}

/** Linhas de metadados do asset ativo — texto adiciona o CTA e as cores. */
function getAssetMetadata(
  creative: Creative,
  asset: CreativeAsset
): { label: string; value: ReactNode }[] {
  const rows: { label: string; value: ReactNode }[] = [
    { label: 'Título', value: asset.label },
    { label: 'Formato', value: creative.format },
  ]
  if (asset.kind === 'image' && asset.dimension) {
    rows.push({ label: 'Dimensão', value: asset.dimension })
  }
  rows.push({ label: 'Extensão', value: asset.extension }, { label: 'Tamanho', value: asset.size })
  if (asset.kind === 'text' && asset.text) {
    rows.push(
      { label: 'Texto do CTA', value: asset.text.ctaText },
      { label: 'Cor do botão', value: <ColorValue hex={asset.text.buttonColor} /> },
      { label: 'Cor do texto', value: <ColorValue hex={asset.text.textColor} /> }
    )
  }
  rows.push({ label: 'Data e hora do upload', value: creative.uploadedAt })
  return rows
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
