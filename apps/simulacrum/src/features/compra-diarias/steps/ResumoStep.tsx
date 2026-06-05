import { useState } from 'react'
import { Button, InfoPanel } from '@globo-ads/ds'
import ConfirmDialog from '../../../components/ConfirmDialog/ConfirmDialog'
import { formatCurrency } from '../../../data/diarias'
import type { ConfirmedSelection } from '../../../data/diarias'
import { computeTotal } from '../../../data/rules/diarias'
import { ExpandablePurchaseCard } from '../../../components/PurchaseCard/PurchaseCard'
import { useDiarias } from '../context/DiariasContext'
import styles from './ResumoStep.module.css'

export default function ResumoStep() {
  const {
    selection: rawSelection,
    purchases,
    setStep,
    handleAddToCart: onAddToCart,
    handleFinalize: onFinalize,
    handleEditPurchase: onEditPurchase,
    handleDeletePurchase: onDeletePurchase,
    handleDeleteCurrentPurchase: onDeleteCurrentPurchase,
  } = useDiarias()
  const selection = rawSelection as ConfirmedSelection
  // -1 = compra atual; >= 0 = índice em purchases
  const [pendingDeleteIndex, setPendingDeleteIndex] = useState<number | null>(null)
  const pendingCount = purchases.length
  const currentTotal = computeTotal(selection)
  const grandTotal = purchases.reduce((sum, p) => sum + computeTotal(p), 0) + currentTotal
  const totalCount = pendingCount + 1

  return (
    <section className={styles.section}>
      <header className={styles.header}>
        <h2 className="type-title-md">Revise seu pedido</h2>
        <p className={`type-body-sm ${styles.subtitle}`}>
          {pendingCount > 0
            ? `${totalCount} ${totalCount === 1 ? 'compra adicionada' : 'compras adicionadas'}. Finalize para concluir todas de uma vez.`
            : 'Confirme os detalhes antes de finalizar a compra.'}
        </p>
      </header>

      <div className={styles.expandableList}>
        <ExpandablePurchaseCard
          selection={selection}
          defaultOpen
          onEdit={() => setStep(3)}
          onDelete={() => setPendingDeleteIndex(-1)}
        />
        {purchases.map((p, i) => (
          <ExpandablePurchaseCard
            key={i}
            selection={p}
            onEdit={() => onEditPurchase(p, i)}
            onDelete={() => setPendingDeleteIndex(i)}
          />
        ))}
      </div>

      {pendingCount > 0 && (
        <InfoPanel
          type="neutral"
          title={`Total de ${totalCount} compras: ${formatCurrency(grandTotal)}`}
          description="Clique em 'Finalizar pedido' para concluir todas as compras de uma vez."
        />
      )}

      <div className={styles.actions}>
        <Button variant="tertiary" iconLeft="arrow_back" onClick={() => setStep(3)}>
          Voltar
        </Button>
        <div className={styles.actionsRight}>
          <Button
            variant="tertiary"
            iconLeft="add_shopping_cart"
            onClick={() => onAddToCart(selection)}
          >
            Continuar comprando
          </Button>
          <Button variant="primary" iconLeft="check" onClick={() => onFinalize(selection)}>
            {pendingCount > 0 ? `Finalizar ${totalCount} pedidos` : 'Finalizar pedido'}
          </Button>
        </div>
      </div>
      <ConfirmDialog
        isOpen={pendingDeleteIndex !== null}
        title="Excluir compra"
        description="Tem certeza que deseja excluir esta compra? Esta ação não pode ser desfeita."
        confirmLabel="Excluir compra"
        onConfirm={() => {
          if (pendingDeleteIndex === -1) onDeleteCurrentPurchase()
          else if (pendingDeleteIndex !== null) onDeletePurchase(pendingDeleteIndex)
          setPendingDeleteIndex(null)
        }}
        onCancel={() => setPendingDeleteIndex(null)}
      />
    </section>
  )
}
