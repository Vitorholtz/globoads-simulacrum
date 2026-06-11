import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { Button, Badge, InteractiveCard } from '@globo-ads/ds'
import {
  getProductsByPortal,
  formatCurrency,
  formatImpressions,
  getPriceForCoverage,
  type DiariaProduto,
} from '../../../data'
import { useDiarias } from '../context/DiariasContext'
import styles from './ProdutoStep.module.css'

function getDevicesLabel(produto: DiariaProduto): string {
  const str = produto.formats.map((f) => f.devices).join(' ')
  const hasDesktop = str.includes('Desktop')
  const hasMobile = str.includes('Mobile')
  const hasApp = str.includes('App')
  const hasTV = str.includes('TV')
  const parts: string[] = []
  if (hasDesktop) parts.push('Desktop')
  if (hasMobile) parts.push('Mobile')
  if (hasApp) parts.push('App')
  if (hasTV) parts.push('TV Conectada')
  if (parts.length <= 1) return parts[0] ?? ''
  const last = parts.pop()!
  return `${parts.join(', ')} e ${last}`
}

function CardMetrics({ produto }: { produto: DiariaProduto }) {
  if (produto.isRegional) {
    const imps = produto.coverages.map((c) => c.impressions)
    const prices = produto.coverages.map((c) => getPriceForCoverage(produto, c.code))
    const minImp = Math.min(...imps)
    const maxImp = Math.max(...imps)
    const minPrice = Math.min(...prices)
    const maxPrice = Math.max(...prices)
    return (
      <div className={styles.cardMetrics}>
        <span className={`type-caption-md ${styles.metricImpressions}`}>
          ~{formatImpressions(minImp)} a {formatImpressions(maxImp)}/estado/dia
        </span>
        <span className={`type-caption-sm ${styles.metricPrice}`}>
          {formatCurrency(minPrice)} a {formatCurrency(maxPrice)}/dia
        </span>
      </div>
    )
  }
  return (
    <div className={styles.cardMetrics}>
      <span className={`type-caption-md ${styles.metricImpressions}`}>
        ~{formatImpressions(produto.coverages[0].impressions)} impressões/dia
      </span>
      <span className={`type-caption-sm ${styles.metricPrice}`}>
        {formatCurrency(getPriceForCoverage(produto, 'Nacional'))}/dia
      </span>
    </div>
  )
}

export default function ProdutoStep({
  actionsContainer,
}: {
  actionsContainer: HTMLDivElement | null
}) {
  const { selection, handleProdutoSelect, updateProdutoLive, setStep } = useDiarias()
  const portalId = selection.portal!
  const produtos = getProductsByPortal(portalId)

  const [selectedId, setSelectedId] = useState<string | null>(selection.produto?.id ?? null)

  const selectedProduto = produtos.find((p) => p.id === selectedId) ?? null

  useEffect(() => {
    updateProdutoLive(selectedProduto)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedId])

  function handleNext() {
    if (selectedProduto) handleProdutoSelect(selectedProduto)
  }

  const actions = (
    <div className={styles.actions}>
      <Button variant="secondary" iconLeft="arrow_back" onClick={() => setStep(1)}>
        Voltar
      </Button>
      <Button
        variant="primary"
        iconRight="arrow_forward"
        disabled={!selectedProduto}
        onClick={handleNext}
      >
        Próximo
      </Button>
    </div>
  )

  return (
    <>
      <section className={styles.section}>
        <header className={styles.header}>
          <h2 className="type-title-md">Escolha o produto de Diária</h2>
          <p className={`type-body-sm ${styles.subtitle}`}>
            Cada produto define os formatos incluídos e onde o anúncio será exibido.
          </p>
        </header>

        <div className={styles.grid}>
          {produtos.map((produto) => (
            <InteractiveCard
              key={produto.id}
              style="outlined"
              selected={selectedId === produto.id}
              className={styles.card}
              onClick={() => setSelectedId((prev) => (prev === produto.id ? null : produto.id))}
              aria-pressed={selectedId === produto.id}
              aria-label={`Selecionar ${produto.name}`}
            >
              <div className={styles.cardHeader}>
                <span className="material-symbols-rounded icon-lg" aria-hidden="true">
                  {produto.icon}
                </span>
                <Badge
                  variant={produto.isRegional ? 'accent' : 'neutral'}
                  label={produto.isRegional ? 'Regional' : 'Nacional'}
                />
              </div>

              <span className={`type-title-sm ${styles.cardTitle}`}>{produto.name}</span>

              <p className={`type-body-sm ${styles.cardDescription}`}>{produto.description}</p>

              <div className={styles.cardLabels}>
                <div className={styles.cardLabel}>
                  <span className="material-symbols-rounded icon-sm" aria-hidden="true">
                    animated_images
                  </span>
                  <span className={`type-caption-sm ${styles.labelText}`}>
                    {produto.formats.length} {produto.formats.length === 1 ? 'formato' : 'formatos'}
                  </span>
                </div>
                <div className={styles.cardLabel}>
                  <span className="material-symbols-rounded icon-sm" aria-hidden="true">
                    devices
                  </span>
                  <span className={`type-caption-sm ${styles.labelText}`}>
                    {getDevicesLabel(produto)}
                  </span>
                </div>
              </div>

              <div className={styles.cardDivider} />

              <CardMetrics produto={produto} />
            </InteractiveCard>
          ))}
        </div>

        {!actionsContainer && actions}
      </section>

      {actionsContainer && createPortal(actions, actionsContainer)}
    </>
  )
}
