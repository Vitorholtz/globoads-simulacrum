import { Button, InfoPanel } from '@globo-ads/ds'
import { formatCurrency } from '../../../data/diarias'
import { computeTotal } from '../../../data/rules/diarias'
import { ExpandablePurchaseCard } from '../../../components/PurchaseCard/PurchaseCard'
import { useDiarias } from '../context/DiariasContext'
import styles from './RecibosStep.module.css'

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
          <ExpandablePurchaseCard key={index} selection={purchase} defaultOpen={index === 0} />
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
