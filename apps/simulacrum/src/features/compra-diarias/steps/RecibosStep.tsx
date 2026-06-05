import { Button, Badge, InfoPanel } from '@globo-ads/ds'
import { getPortal, PORTAL_DISPLAY_NAMES, formatCurrency } from '../../../data/diarias'
import type { ConfirmedSelection } from '../../../data/diarias'
import { computeTotal } from '../../../data/rules/diarias'
import { useDiarias } from '../context/DiariasContext'
import styles from './RecibosStep.module.css'

function summarize(p: ConfirmedSelection): string {
  if (p.produto.isRegional) {
    const totalDays = p.regionalSelections.reduce((s, r) => s + r.dates.length, 0)
    const regions = p.regionalSelections.length
    return `${regions} ${regions === 1 ? 'região' : 'regiões'} · ${totalDays} ${totalDays === 1 ? 'dia' : 'dias'}`
  }
  const n = p.dates.length
  return `Nacional · ${n} ${n === 1 ? 'dia' : 'dias'}`
}

function ReceiptCard({ purchase }: { purchase: ConfirmedSelection }) {
  const portal = getPortal(purchase.portal)
  const { produto } = purchase
  const total = computeTotal(purchase)

  return (
    <div className={styles.receiptCard}>
      <div className={styles.receiptCardHeader}>
        <div className={styles.portalSide}>
          {portal.svgPath && (
            <img
              src={portal.svgPath}
              alt={PORTAL_DISPLAY_NAMES[purchase.portal]}
              className={styles.portalLogo}
            />
          )}
          <div>
            <p className={`type-caption-sm ${styles.metaLabel}`}>Portal</p>
            <p className={`type-body-sm ${styles.metaValue}`}>
              {PORTAL_DISPLAY_NAMES[purchase.portal]}
            </p>
          </div>
        </div>
        <div className={styles.produtoSide}>
          <p className={`type-caption-sm ${styles.metaLabel}`}>Produto</p>
          <div className={styles.produtoRow}>
            <p className={`type-body-sm ${styles.metaValue}`}>{produto.name}</p>
            <Badge
              variant={produto.isRegional ? 'accent' : 'neutral'}
              label={produto.isRegional ? 'Regional' : 'Nacional'}
            />
          </div>
        </div>
      </div>
      <div className={styles.receiptCardFooter}>
        <span className={`type-body-xs ${styles.summary}`}>{summarize(purchase)}</span>
        <span className={`type-title-sm ${styles.total}`}>{formatCurrency(total)}</span>
      </div>
    </div>
  )
}

export default function RecibosStep() {
  const { purchases, handleReset: onReset } = useDiarias()
  const totalValue = purchases.reduce((sum, p) => sum + computeTotal(p), 0)
  const n = purchases.length

  return (
    <div className={styles.page}>
      <div className={styles.successHeader}>
        <div className={styles.successIcon}>
          <span className="material-symbols-rounded icon-xl" aria-hidden="true">
            check_circle
          </span>
        </div>
        <div className={styles.successText}>
          <h2 className="type-title-lg">
            {n === 1 ? 'Pedido realizado!' : `${n} pedidos realizados!`}
          </h2>
          <p className={`type-body-md ${styles.successDesc}`}>
            Em breve você receberá as instruções para envio dos criativos.
          </p>
        </div>
      </div>

      <InfoPanel
        type="success"
        title={`Total: ${formatCurrency(totalValue)}`}
        description={`${n} ${n === 1 ? 'compra confirmada' : 'compras confirmadas'}`}
      />

      <div className={styles.receiptList}>
        {purchases.map((purchase, index) => (
          <ReceiptCard key={index} purchase={purchase} />
        ))}
      </div>

      <div className={styles.footer}>
        <Button variant="primary" iconLeft="shopping_cart" onClick={onReset}>
          Fazer nova compra
        </Button>
      </div>
    </div>
  )
}
