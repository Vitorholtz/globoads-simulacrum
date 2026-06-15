import { useRef, useState } from 'react'
import Button from '../../components/Button/Button'
import InfoPanel from '../../components/InfoPanel/InfoPanel'
import { cx } from '../../utils/cx'
import { classifyCreative } from './classifyCreative'
import styles from './CreativeUpload.module.css'
import type { Creative } from './creatives'

const ACCEPT = 'image/png,image/jpeg,image/gif,application/zip,application/x-zip-compressed,.zip'

export interface CreativeUploadProps {
  /** Chamado quando um arquivo é classificado com sucesso num formato Display. */
  onCreativeAdded: (creative: Creative) => void
}

/**
 * Dropzone de upload de criativos do Playground.
 *
 * Recebe um arquivo (clique ou arrastar), delega a leitura técnica e a
 * classificação automática a `classifyCreative` e, em caso de sucesso, emite o
 * `Creative` derivado. Falhas de validação (dimensão/extensão/peso) viram
 * feedback inline, sem criar card inválido.
 */
export default function CreativeUpload({ onCreativeAdded }: CreativeUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [dragging, setDragging] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function processFile(file: File) {
    setError(null)
    const result = await classifyCreative(file)
    if (result.ok) {
      onCreativeAdded(result.creative)
    } else {
      setError(result.reason)
    }
  }

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (file) void processFile(file)
    // Permite reenviar o mesmo arquivo em seguida.
    e.target.value = ''
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault()
    setDragging(false)
    const file = e.dataTransfer.files?.[0]
    if (file) void processFile(file)
  }

  return (
    <div>
      <div
        className={cx(styles.dropzone, dragging ? styles.dragging : '')}
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => {
          e.preventDefault()
          setDragging(true)
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            inputRef.current?.click()
          }
        }}
      >
        <span className={cx('material-symbols-rounded', 'icon-xl', styles.icon)} aria-hidden="true">
          upload
        </span>
        <p className={cx('type-body-md', styles.headline)}>
          Arraste um criativo ou selecione um arquivo
        </p>
        <p className={cx('type-body-sm', styles.hint)}>
          O formato publicitário é identificado automaticamente pelas dimensões. JPG, PNG ou GIF —
          ou um .zip para formatos compostos (ex.: Touchpoint Imagético).
        </p>
        <Button type="button" variant="secondary" size="md" iconLeft="folder_open">
          Selecionar arquivo
        </Button>
        <input
          ref={inputRef}
          type="file"
          accept={ACCEPT}
          className={styles.input}
          onChange={handleInputChange}
          aria-label="Selecionar criativo para upload"
        />
      </div>

      {error && (
        <InfoPanel
          type="critical"
          title="Não foi possível classificar o criativo"
          description={error}
          className={styles.error}
        />
      )}
    </div>
  )
}
