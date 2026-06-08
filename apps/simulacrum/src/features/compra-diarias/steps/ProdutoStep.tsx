import { useState, useEffect } from 'react'
import { Button, Badge, InteractiveCard } from '@globo-ads/ds'
import {
  getProductsByPortal,
  formatCurrency,
  formatImpressions,
  getPriceForCoverage,
} from '../../../data/diarias'
import { getAdFormat, getPrimaryDimension } from '../../../data/rules/diarias'
import type { DiariaProduto } from '../../../data/diarias'
import { useDiarias } from '../context/DiariasContext'
import styles from './ProdutoStep.module.css'

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
        <span className={`type-body-sm ${styles.metricImpressions}`}>
          ~{formatImpressions(minImp)} a {formatImpressions(maxImp)} impressões/estado/dia
        </span>
        <span className={`type-caption-md ${styles.metricPrice}`}>
          {formatCurrency(minPrice)} a {formatCurrency(maxPrice)}/dia
        </span>
      </div>
    )
  }
  return (
    <div className={styles.cardMetrics}>
      <span className={`type-body-sm ${styles.metricImpressions}`}>
        ~{formatImpressions(produto.coverages[0].impressions)} impressões/dia
      </span>
      <span className={`type-caption-md ${styles.metricPrice}`}>
        {formatCurrency(getPriceForCoverage(produto, 'Nacional'))}/dia
      </span>
    </div>
  )
}

export default function ProdutoStep() {
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

  return (
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
            className={`${styles.card} ${selectedId === produto.id ? styles.cardSelected : ''}`}
            onClick={() => setSelectedId((prev) => (prev === produto.id ? null : produto.id))}
            aria-pressed={selectedId === produto.id}
            aria-label={`Selecionar ${produto.name}`}
          >
            <div className={styles.cardHeader}>
              <span className={`type-title-sm ${styles.cardTitle}`}>{produto.name}</span>
              <Badge
                variant={produto.isRegional ? 'accent' : 'neutral'}
                label={produto.isRegional ? 'Regional' : 'Nacional'}
              />
            </div>

            <div className={styles.cardDivider} />

            <span className={`type-caption-sm ${styles.formatCount}`}>
              {produto.formats.length}{' '}
              {produto.formats.length === 1 ? 'formato disponível' : 'formatos disponíveis'}
            </span>

            <ul className={styles.formatList}>
              {produto.formats.map((f) => {
                const adFormat = getAdFormat(f.formatId)
                const dim = getPrimaryDimension(f.formatId)
                return (
                  <li key={f.formatId} className={styles.formatItem}>
                    {adFormat?.svgPath && (
                      <img
                        src={adFormat.svgPath}
                        alt=""
                        aria-hidden="true"
                        className={styles.formatThumb}
                      />
                    )}
                    <div className={styles.formatInfo}>
                      <span className={`type-caption-lg ${styles.formatName}`}>{f.formatName}</span>
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

            <div className={styles.cardFooter}>
              <div className={styles.cardDivider} />
              <CardMetrics produto={produto} />
            </div>
          </InteractiveCard>
        ))}
      </div>

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
    </section>
  )
}
