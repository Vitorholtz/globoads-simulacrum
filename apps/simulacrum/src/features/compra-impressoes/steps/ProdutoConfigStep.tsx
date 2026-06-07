import { useState } from 'react'
import { Button, Checkbox, Radio } from '@globo-ads/ds'
import {
  OBJETIVOS,
  PLATFORM_DISPLAY_NAMES,
  getPlatform,
  type ImpressoesProduto,
  type PlatformId,
} from '../../../data/impressoes'
import { getProductsByObjetivo, formatCurrency } from '../../../data/rules/impressoes'
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
            onSelect={() => selectProduto(p)}
          />
        ))}
      </div>

      {produto && (
        <div className={styles.config}>
          <p className={`type-title-sm ${styles.configTitle}`}>Configuração de {produto.name}</p>

          <fieldset className={styles.fieldset}>
            <legend className={`type-body-sm ${styles.legend}`}>
              {produto.platformSelection === 'multiple'
                ? 'Plataformas (selecione uma ou mais)'
                : 'Plataforma'}
            </legend>
            {produto.platformSelection === 'multiple' ? (
              <div className={styles.platformOptions}>
                {produto.platforms.map((p) => (
                  <Checkbox
                    key={p}
                    checked={platforms.includes(p)}
                    onChange={() => togglePlatform(p)}
                    label={PLATFORM_DISPLAY_NAMES[p]}
                  />
                ))}
              </div>
            ) : (
              <div className={styles.fixedPlatforms}>
                {produto.platforms.map((p) => {
                  const platform = getPlatform(p)
                  return (
                    <span key={p} className={styles.platformChip}>
                      {platform.svgPath && (
                        <img
                          src={platform.svgPath}
                          alt=""
                          aria-hidden="true"
                          className={styles.platformLogo}
                        />
                      )}
                      <span className={`type-body-sm ${styles.platformChipName}`}>
                        {PLATFORM_DISPLAY_NAMES[p]}
                      </span>
                    </span>
                  )
                })}
                <span className={`type-caption-sm ${styles.platformNote}`}>Plataforma fixa</span>
              </div>
            )}
          </fieldset>

          {produto.cpmOptions.length > 1 && (
            <fieldset className={styles.fieldset}>
              <legend className={`type-body-sm ${styles.legend}`}>
                Formato de entrega (define o CPM)
              </legend>
              <div className={styles.cpmOptions}>
                {produto.cpmOptions.map((opt) => (
                  <Radio
                    key={opt.id}
                    name="cpm-option"
                    value={opt.id}
                    checked={cpmOptionId === opt.id}
                    onChange={() => selectCpm(opt.id)}
                    label={`${opt.label} — ${formatCurrency(opt.cpm)} / mil`}
                  />
                ))}
              </div>
            </fieldset>
          )}
        </div>
      )}

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
