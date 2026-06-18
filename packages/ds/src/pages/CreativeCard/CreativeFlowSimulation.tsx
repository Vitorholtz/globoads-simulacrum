import { useReducer, useState, useRef, useEffect } from 'react'
import { createPortal } from 'react-dom'
import Button from '../../components/Button/Button'
import Switch from '../../components/Switch/Switch'
import Toast from '../../components/Toast/Toast'
import CreativeCard from '../../components/CreativeCard/CreativeCard'
import CreativeDrawer from '../../components/CreativeCard/CreativeDrawer'
import ConfirmDialog from '../../components/ConfirmDialog/ConfirmDialog'
import {
  applyTransition,
  addedOnlyValidation,
  formatStepTimestamp,
} from '../../components/CreativeCard/creativeLifecycle'
import type { Creative, CreativeFieldsConfig } from '../../components/CreativeCard/types'
import type { ToastType } from '../../tokens/toast'
import CreativeUpload from '../Criativos/CreativeUpload'
import { createZip } from '../Criativos/zip'
import type { ZipEntry } from '../Criativos/zip'
import { serializeText } from '../Criativos/creativeText'
import { cx } from '../../utils/cx'
import styles from './CreativeCardPage.module.css'

const REJECTION_REASON = [
  'O criativo não atende às diretrizes de marca: o logotipo precisa respeitar a área de proteção mínima e não pode sobrepor o conteúdo editorial.',
]

const FIELD_TOGGLES: Array<{ key: keyof CreativeFieldsConfig; label: string }> = [
  { key: 'period', label: 'Período de veiculação' },
  { key: 'url', label: 'URL de destino' },
  { key: 'pixel', label: 'Pixel' },
  { key: 'position', label: 'Posição' },
]

/** Clona um criativo de exemplo no estado inicial "configuring". */
function toConfiguring(base: Creative, id: string): Creative {
  return {
    ...base,
    id,
    state: 'configuring',
    validation: addedOnlyValidation(formatStepTimestamp(new Date())),
  }
}

function seed(): Creative[] {
  return []
}

type SimAction =
  | { type: 'send' }
  | { type: 'approve'; id: string }
  | { type: 'reject'; id: string }
  | { type: 'add'; creative: Creative }
  | { type: 'update'; id: string; patch: Partial<Creative> }
  | { type: 'remove'; id: string }
  | { type: 'reset' }

/** Reducer da simulação: toda transição passa por `creativeLifecycle`. */
function reducer(items: Creative[], action: SimAction): Creative[] {
  switch (action.type) {
    case 'send':
      return items.map((c) => applyTransition(c, 'send'))
    case 'approve':
      return items.map((c) => (c.id === action.id ? applyTransition(c, 'approve') : c))
    case 'reject':
      return items.map((c) =>
        c.id === action.id ? applyTransition(c, 'reject', REJECTION_REASON) : c
      )
    case 'add':
      return [toConfiguring(action.creative, action.creative.id), ...items]
    case 'update':
      return items.map((c) => (c.id === action.id ? { ...c, ...action.patch } : c))
    case 'remove':
      return items.filter((c) => c.id !== action.id)
    case 'reset':
      return seed()
  }
}

/**
 * Simulação de Fluxo Real do CreativeCard — documentação viva.
 *
 * Mantém uma lista de criativos com estado compartilhado: as ações de simulação
 * (enviar/aprovar/recusar) transicionam o `state` via `creativeLifecycle`, e os
 * três cenários (configuração, análise, galeria) refletem a mesma fonte em tempo
 * real. Os botões de ação são controles de simulação — não fazem parte do card.
 */
export default function CreativeFlowSimulation() {
  const [items, dispatch] = useReducer(reducer, undefined, seed)
  const [openId, setOpenId] = useState<string | null>(null)
  const [tab, setTab] = useState('detalhes')
  const [fields, setFields] = useState<CreativeFieldsConfig>({
    period: true,
    url: true,
    pixel: true,
    position: true,
  })
  const [pendingDeleteId, setPendingDeleteId] = useState<string | null>(null)
  const [toast, setToast] = useState<{
    title: string
    description?: string
    type: ToastType
    uid: number
  } | null>(null)
  const [toastLeaving, setToastLeaving] = useState(false)
  const toastUidRef = useRef(0)

  const open = items.find((c) => c.id === openId) ?? null
  const configuring = items.filter((c) => c.state === 'configuring')
  const inReview = items.filter((c) => c.state !== 'configuring')
  const pendingCreative = items.find((c) => c.id === pendingDeleteId) ?? null

  useEffect(() => {
    if (!toast || toastLeaving) return
    const timer = setTimeout(() => setToastLeaving(true), 4000)
    return () => clearTimeout(timer)
  }, [toast, toastLeaving])

  function showToast(title: string, type: ToastType = 'success', description?: string) {
    setToastLeaving(false)
    const uid = ++toastUidRef.current
    setToast({ title, description, type, uid })
  }

  function view(creative: Creative, initialTab = 'detalhes') {
    setTab(initialTab)
    setOpenId(creative.id)
  }

  function toggleField(key: keyof CreativeFieldsConfig) {
    setFields((prev) => ({ ...prev, [key]: !(prev[key] ?? true) }))
  }

  async function handleDownload(creative: Creative) {
    if (creative.assets && creative.assets.length > 0) {
      const entries: ZipEntry[] = []
      for (const asset of creative.assets) {
        const slug = asset.label
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '_')
          .replace(/^_|_$/g, '')
        if (asset.kind === 'image' && asset.imageSrc) {
          const buf = await fetch(asset.imageSrc).then((r) => r.arrayBuffer())
          entries.push({
            name: `${slug}.${asset.extension.toLowerCase()}`,
            bytes: new Uint8Array(buf),
          })
        } else if (asset.kind === 'text' && asset.text) {
          entries.push({
            name: `${slug}.txt`,
            bytes: new TextEncoder().encode(serializeText(asset.text)),
          })
        }
      }
      const blob = new Blob([createZip(entries)], { type: 'application/zip' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `${creative.name}.zip`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
    } else {
      const src = (creative.kind === 'video' ? creative.videoSrc : null) ?? creative.imageSrc
      if (!src) return
      const a = document.createElement('a')
      a.href = src
      a.download = creative.name
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
    }
    showToast('Download iniciado', 'neutral', 'O arquivo será salvo no seu dispositivo.')
  }

  function handleConfirmDelete() {
    if (!pendingDeleteId) return
    dispatch({ type: 'remove', id: pendingDeleteId })
    if (openId === pendingDeleteId) setOpenId(null)
    setPendingDeleteId(null)
    showToast('Criativo excluído', 'success', 'Removido da galeria permanentemente.')
  }

  return (
    <div className={styles.sim}>
      <div className={styles.simBar}>
        <p className={cx('type-body-sm', styles.simHint)}>
          Os botões (enviar, aprovar, recusar) são <strong>controles de simulação</strong> — não
          fazem parte do componente. Eles existem só para dirigir o ciclo de vida e ver os cenários
          reagirem.
        </p>
        <div className={styles.simBarActions}>
          <Button
            type="button"
            variant="tertiary"
            size="sm"
            iconLeft="restart_alt"
            onClick={() => dispatch({ type: 'reset' })}
          >
            Reiniciar simulação
          </Button>
        </div>
      </div>

      {/* Cenário 1 - Em configuração */}
      <Scenario
        index={1}
        title="Em configuração"
        description='Criativos adicionados a um envio, ainda sendo configurados. Configurações editáveis; no drawer, a etapa é "Criativo adicionado à galeria".'
      >
        <CreativeUpload onCreativeAdded={(c) => dispatch({ type: 'add', creative: c })} />
        <div className={styles.fieldsBar}>
          <div className={styles.fieldsToggleRow}>
            {FIELD_TOGGLES.map(({ key, label }) => (
              <Switch
                key={key}
                label={label}
                checked={fields[key] ?? true}
                onChange={() => toggleField(key)}
              />
            ))}
          </div>
          <Button
            type="button"
            variant="primary"
            size="md"
            iconLeft="send"
            disabled={configuring.length === 0}
            onClick={() => dispatch({ type: 'send' })}
          >
            Enviar criativos
          </Button>
        </div>
        {configuring.length === 0 ? (
          <Empty>Nenhum criativo em configuração. Envie um arquivo acima para adicionar.</Empty>
        ) : (
          <div className={styles.gallery}>
            {configuring.map((c) => (
              <CreativeCard
                key={c.id}
                mode="config"
                creative={c}
                fields={fields}
                onViewDetails={() => view(c)}
                onDownload={() => handleDownload(c)}
                onDelete={() => setPendingDeleteId(c.id)}
                onFieldChange={(patch) => dispatch({ type: 'update', id: c.id, patch })}
              />
            ))}
          </div>
        )}
      </Scenario>

      {/* ── Cenário 2 — Em análise ── */}
      <Scenario
        index={2}
        title="Em análise"
        description="Após o envio, as configurações ficam somente leitura enquanto a Globo valida. Aprovar/Reprovar abaixo simulam a decisão da validação."
      >
        {inReview.length === 0 ? (
          <Empty>Nenhum criativo enviado. Envie os criativos do cenário 1.</Empty>
        ) : (
          <div className={styles.gallery}>
            {inReview.map((c) => (
              <div key={c.id} className={styles.simItem}>
                <CreativeCard
                  mode="review"
                  creative={c}
                  fields={fields}
                  onViewDetails={() => view(c)}
                  onStatusLink={() => view(c, 'validacao')}
                  onDownload={() => handleDownload(c)}
                  onDelete={() => setPendingDeleteId(c.id)}
                />
                {c.state === 'analyzing' && (
                  <div className={styles.simActions}>
                    <Button
                      type="button"
                      variant="secondary"
                      size="sm"
                      iconLeft="check_circle"
                      onClick={() => dispatch({ type: 'approve', id: c.id })}
                    >
                      Aprovar
                    </Button>
                    <Button
                      type="button"
                      variant="secondary"
                      size="sm"
                      danger
                      iconLeft="cancel"
                      onClick={() => dispatch({ type: 'reject', id: c.id })}
                    >
                      Reprovar
                    </Button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </Scenario>

      {/* ── Cenário 3 — Galeria ── */}
      <Scenario
        index={3}
        title="Galeria de criativos"
        description="Reflete automaticamente o estado atual de todos os criativos: configuração → Pronto para anunciar, envio → Em análise, decisão → Aprovado/Recusado. Card e drawer acompanham."
      >
        {items.length === 0 ? (
          <Empty>Nenhum criativo na galeria. Adicione criativos no cenário 1.</Empty>
        ) : (
          <div className={styles.gallery}>
            {items.map((c) => (
              <CreativeCard
                key={c.id}
                mode="gallery"
                creative={c}
                onViewDetails={() => view(c)}
                onStatusLink={() => view(c, 'validacao')}
                onDownload={() => handleDownload(c)}
                onDelete={() => setPendingDeleteId(c.id)}
              />
            ))}
          </div>
        )}
      </Scenario>

      <CreativeDrawer
        creative={open}
        open={open !== null}
        initialTab={tab}
        onClose={() => setOpenId(null)}
        onDelete={open ? () => setPendingDeleteId(open.id) : undefined}
      />

      <ConfirmDialog
        open={pendingDeleteId !== null}
        title="Excluir criativo?"
        description={
          pendingCreative
            ? `"${pendingCreative.name}" será removido da galeria permanentemente.`
            : undefined
        }
        confirmLabel="Excluir"
        onConfirm={handleConfirmDelete}
        onCancel={() => setPendingDeleteId(null)}
      />

      {toast &&
        createPortal(
          <div
            className={cx(styles.toastPortal, toastLeaving ? styles.toastPortalLeaving : '')}
            onAnimationEnd={() => {
              if (toastLeaving) {
                setToastLeaving(false)
                setToast(null)
              }
            }}
          >
            <Toast
              type={toast.type}
              title={toast.title}
              description={toast.description}
              onClose={() => setToastLeaving(true)}
            />
          </div>,
          document.body
        )}
    </div>
  )
}

function Scenario({
  index,
  title,
  description,
  action,
  children,
}: {
  index: number
  title: string
  description: string
  action?: React.ReactNode
  children: React.ReactNode
}) {
  return (
    <div className={styles.scenario}>
      <div className={styles.scenarioHead}>
        <div className={styles.scenarioText}>
          <span className={cx('type-caption-md', styles.scenarioIndex)}>Cenário {index}</span>
          <h3 className={cx('type-title-sm', styles.scenarioTitle)}>{title}</h3>
          <p className={cx('type-body-sm', styles.scenarioDesc)}>{description}</p>
        </div>
        {action && <div className={styles.scenarioAction}>{action}</div>}
      </div>
      {children}
    </div>
  )
}

function Empty({ children }: { children: React.ReactNode }) {
  return <p className={cx('type-body-sm', styles.empty)}>{children}</p>
}
