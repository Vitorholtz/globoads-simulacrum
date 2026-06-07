import { useState } from 'react'
import { Button } from '@globo-ads/ds'
import { OBJETIVOS, type ImpressoesProduto, type PlatformId } from '../../../data/impressoes'
import { getProductsByObjetivo } from '../../../data/rules/impressoes'
import ImpressoesProductCard from '../components/ImpressoesProductCard/ImpressoesProductCard'
import { useImpressoes } from '../context/ImpressoesContext'
import styles from './ProdutoConfigStep.module.css'

export default function ProdutoConfigStep() {
  const { selection, updateSelection, handleProdutoConfig, setStep } = useImpressoes()
  const products = getProductsByObjetivo(selection.objetivo!)
  const objetivoInfo = OBJETIVOS.find((o) => o.id === selection.objetivo)

  const [produtoId, setProdutoId] = useState<string | null>(selection.produto?.id ?? null)
  const [platforms, setPlatforms] = useState<PlatformId[]>(selection.platforms)
  const [cpmOptionId, setCpmOptionId] = useState<string | null>(selection.cpmOptionId)

  const produto = products.find((p) => p.id === produtoId) ?? null

  function selectProduto(p: ImpressoesProduto) {
    if (produtoId === p.id) {
      setProdutoId(null)
      setPlatforms([])
      setCpmOptionId(null)
      updateSelection({ produto: undefined, platforms: [], cpmOptionId: null })
      return
    }
    const defaultCpm = p.cpmOptions.length === 1 ? p.cpmOptions[0].id : null
    const defaultPlatforms = [...p.platforms]
    setProdutoId(p.id)
    setPlatforms(defaultPlatforms)
    setCpmOptionId(defaultCpm)
    updateSelection({ produto: p, platforms: defaultPlatforms, cpmOptionId: defaultCpm })
  }

  function togglePlatform(id: PlatformId) {
    setPlatforms((prev) => {
      const next = prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
      updateSelection({ platforms: next })
      return next
    })
  }

  function selectCpm(id: string) {
    setCpmOptionId(id)
    updateSelection({ cpmOptionId: id })
  }

  const canAdvance = Boolean(produto && platforms.length > 0 && cpmOptionId)

  function handleNext() {
    if (produto && cpmOptionId && platforms.length > 0) {
      handleProdutoConfig(produto, platforms, cpmOptionId)
    }
  }

  return (
    <section className={styles.section}>
      <header className={styles.header}>
        <h2 className="type-title-md">Escolha o produto e configure</h2>
        <p className={`type-body-sm ${styles.subtitle}`}>
          Produtos disponíveis para o objetivo {objetivoInfo?.name}. Selecione um e ajuste as
          plataformas e o formato de entrega.
        </p>
      </header>

      <div className={styles.grid}>
        {products.map((p) => (
          <ImpressoesProductCard
            key={p.id}
            produto={p}
            selected={produtoId === p.id}
            selectedPlatforms={produtoId === p.id ? platforms : []}
            selectedCpmOptionId={produtoId === p.id ? cpmOptionId : null}
            onSelect={() => selectProduto(p)}
            onPlatformToggle={togglePlatform}
            onCpmSelect={selectCpm}
          />
        ))}
      </div>

      <div className={styles.actions}>
        <Button variant="secondary" iconLeft="arrow_back" onClick={() => setStep(1)}>
          Voltar
        </Button>
        <Button
          variant="primary"
          iconRight="arrow_forward"
          disabled={!canAdvance}
          onClick={handleNext}
        >
          Próximo
        </Button>
      </div>
    </section>
  )
}
