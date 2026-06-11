import { useState } from 'react'
import { Button } from '@globo-ads/ds'
import type { ImpressoesConfirmedSelection } from '../../../data'
import { ImpressoesPurchaseCard } from '../../../components/ImpressoesPurchaseCard/ImpressoesPurchaseCard'
import ConfirmDialog from '../../../components/ConfirmDialog/ConfirmDialog'
import { useImpressoes } from '../context/ImpressoesContext'
import styles from './ResumoStep.module.css'

export default function ResumoStep() {
  const {
    selection: rawSelection,
    isEditMode,
    setStep,
    handleAddToCart,
    handleUpdateCartItem,
    handleCancel,
  } = useImpressoes()
  const selection = rawSelection as ImpressoesConfirmedSelection
  const [confirmDelete, setConfirmDelete] = useState(false)

  return (
    <section className={styles.section}>
      <header className={styles.header}>
        <h2 className="type-title-md">Revise seu pedido</h2>
        <p className={`type-body-sm ${styles.subtitle}`}>
          {isEditMode
            ? 'Confirme as alterações antes de atualizar no carrinho.'
            : 'Confirme os detalhes antes de adicionar ao carrinho.'}
        </p>
      </header>

      <div className={styles.list}>
        <ImpressoesPurchaseCard
          selection={selection}
          defaultOpen
          onEdit={() => setStep(4)}
          onDelete={() => setConfirmDelete(true)}
        />
      </div>

      <div className={styles.actions}>
        <Button variant="secondary" iconLeft="arrow_back" onClick={() => setStep(4)}>
          Voltar
        </Button>
        <Button
          variant="primary"
          iconLeft={isEditMode ? 'check' : 'add_shopping_cart'}
          onClick={() =>
            isEditMode ? handleUpdateCartItem(selection) : handleAddToCart(selection)
          }
        >
          {isEditMode ? 'Atualizar no carrinho' : 'Adicionar ao carrinho'}
        </Button>
      </div>

      <ConfirmDialog
        isOpen={confirmDelete}
        title={isEditMode ? 'Excluir do carrinho?' : 'Cancelar configuração?'}
        description={
          isEditMode
            ? 'Este item será removido permanentemente do seu carrinho.'
            : 'As configurações serão descartadas e você voltará ao início.'
        }
        confirmLabel="Excluir"
        onConfirm={handleCancel}
        onCancel={() => setConfirmDelete(false)}
      />
    </section>
  )
}
