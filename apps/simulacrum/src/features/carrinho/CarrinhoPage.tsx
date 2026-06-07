import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Badge, Breadcrumb, Button, InfoPanel } from '@globo-ads/ds'
import ConfirmDialog from '../../components/ConfirmDialog/ConfirmDialog'
import { ExpandablePurchaseCard } from '../../components/PurchaseCard/PurchaseCard'
import { ImpressoesPurchaseCard } from '../../components/ImpressoesPurchaseCard/ImpressoesPurchaseCard'
import PageContainer from '../../components/PageContainer/PageContainer'
import { formatCurrency } from '../../data/diarias'
import { useCart } from '../../cart/CartContext'
import { clearDiariasWizardSession } from '../compra-diarias/context/DiariasContext'
import { clearImpressoesWizardSession } from '../compra-impressoes/context/ImpressoesContext'
import type { CartItem } from '../../cart/types'
import styles from './CarrinhoPage.module.css'

const MODALITY_LABELS: Record<CartItem['modality'], string> = {
  diarias: 'Diárias na Globo',
  impressoes: 'Compra por Impressões',
}

export default function CarrinhoPage() {
  const navigate = useNavigate()
  const { items, grandTotal, removeItem, clearCart } = useCart()
  const [pendingRemoveId, setPendingRemoveId] = useState<string | null>(null)
  const [checkoutOpen, setCheckoutOpen] = useState(false)

  if (items.length === 0) {
    return (
      <PageContainer>
        <Breadcrumb
          items={[{ label: 'Página Inicial', onClick: () => navigate('/') }, { label: 'Carrinho' }]}
        />
        <div className={styles.emptyState}>
          <span className="material-symbols-rounded icon-xl" aria-hidden="true">
            shopping_cart
          </span>
          <h2 className="type-title-md">Seu carrinho está vazio</h2>
          <p className={`type-body-sm ${styles.emptyDesc}`}>
            Adicione produtos a partir das jornadas de compra.
          </p>
          <Button variant="primary" iconLeft="storefront" onClick={() => navigate('/')}>
            Explorar produtos
          </Button>
        </div>
      </PageContainer>
    )
  }

  const diariasItems = items.filter((item) => item.modality === 'diarias').toReversed()
  const impressoesItems = items.filter((item) => item.modality === 'impressoes').toReversed()

  return (
    <PageContainer>
      <Breadcrumb
        items={[{ label: 'Página Inicial', onClick: () => navigate('/') }, { label: 'Carrinho' }]}
      />

      <div className={styles.pageHeader}>
        <h1 className="type-display-md">Carrinho</h1>
        <p className={`type-body-md ${styles.pageSubtitle}`}>
          {items.length === 1 ? '1 item adicionado' : `${items.length} itens adicionados`}
        </p>
      </div>

      <div className={styles.layout}>
        <div className={styles.itemsList}>
          {diariasItems.length > 0 && (
            <section className={styles.modalitySection}>
              <div className={styles.modalityHeader}>
                <h2 className="type-title-sm">Diárias na Globo</h2>
                <Badge
                  variant="neutral"
                  label={`${diariasItems.length} ${diariasItems.length === 1 ? 'item' : 'itens'}`}
                />
              </div>
              <div className={styles.cardList}>
                {diariasItems.map((item) => (
                  <ExpandablePurchaseCard
                    key={item.id}
                    selection={item.data}
                    onEdit={() => navigate(`/compra-diarias?edit=${item.id}`)}
                    onDelete={() => setPendingRemoveId(item.id)}
                  />
                ))}
              </div>
            </section>
          )}

          {impressoesItems.length > 0 && (
            <section className={styles.modalitySection}>
              <div className={styles.modalityHeader}>
                <h2 className="type-title-sm">{MODALITY_LABELS.impressoes}</h2>
                <Badge
                  variant="neutral"
                  label={`${impressoesItems.length} ${impressoesItems.length === 1 ? 'item' : 'itens'}`}
                />
              </div>
              <div className={styles.cardList}>
                {impressoesItems.map((item) => (
                  <ImpressoesPurchaseCard
                    key={item.id}
                    selection={item.data}
                    onEdit={() => navigate(`/compra-impressoes?edit=${item.id}`)}
                    onDelete={() => setPendingRemoveId(item.id)}
                  />
                ))}
              </div>
            </section>
          )}
        </div>

        <aside className={styles.summary}>
          <div className={styles.summaryCard}>
            <h2 className="type-title-sm">Resumo do pedido</h2>

            {diariasItems.length > 0 && (
              <div className={styles.summaryRow}>
                <span className={`type-body-sm ${styles.summaryLabel}`}>
                  {MODALITY_LABELS.diarias}
                </span>
                <span className="type-caption-md">
                  {formatCurrency(diariasItems.reduce((sum, item) => sum + item.subtotal, 0))}
                </span>
              </div>
            )}

            {impressoesItems.length > 0 && (
              <div className={styles.summaryRow}>
                <span className={`type-body-sm ${styles.summaryLabel}`}>
                  {MODALITY_LABELS.impressoes}
                </span>
                <span className="type-caption-md">
                  {formatCurrency(impressoesItems.reduce((sum, item) => sum + item.subtotal, 0))}
                </span>
              </div>
            )}

            <div className={styles.summaryDivider} />

            <div className={`${styles.summaryRow} ${styles.summaryTotal}`}>
              <span className="type-title-sm">Total</span>
              <span className={`type-title-md ${styles.grandTotalValue}`}>
                {formatCurrency(grandTotal)}
              </span>
            </div>

            <div className={styles.summaryActions}>
              <Button
                variant="primary"
                iconLeft="check_circle"
                onClick={() => setCheckoutOpen(true)}
              >
                Finalizar compra
              </Button>

              <Button
                variant="secondary"
                iconLeft="shopping_cart_checkout"
                onClick={() => {
                  clearDiariasWizardSession()
                  clearImpressoesWizardSession()
                  navigate('/')
                }}
              >
                Continuar comprando
              </Button>
            </div>
          </div>
        </aside>
      </div>

      <ConfirmDialog
        isOpen={pendingRemoveId !== null}
        title="Remover item"
        description="Tem certeza que deseja remover este item do carrinho?"
        confirmLabel="Remover item"
        onConfirm={() => {
          if (pendingRemoveId) removeItem(pendingRemoveId)
          setPendingRemoveId(null)
        }}
        onCancel={() => setPendingRemoveId(null)}
      />

      <ConfirmDialog
        isOpen={checkoutOpen}
        title="Finalizar compra"
        description={`Confirmar o pedido de ${items.length === 1 ? '1 item' : `${items.length} itens`} no valor total de ${formatCurrency(grandTotal)}?`}
        confirmLabel="Confirmar pedido"
        onConfirm={() => {
          clearCart()
          setCheckoutOpen(false)
          navigate('/')
        }}
        onCancel={() => setCheckoutOpen(false)}
      />

      {items.length > 0 && (
        <InfoPanel
          type="neutral"
          title="Pedido simulado"
          description="Esta é uma experiência de prototipação. Nenhum pedido real será gerado."
        />
      )}
    </PageContainer>
  )
}
