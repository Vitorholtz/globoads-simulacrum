import { useState, useEffect, useCallback, useRef } from 'react'
import Toast from '../../components/Toast/Toast'
import PageHeader from '../../components/PageHeader/PageHeader'
import SectionHeader from '../../components/SectionHeader/SectionHeader'
import { TOAST_VARIANTS, TOAST_GUIDELINES } from '../../tokens/toast'
import type { ToastType } from '../../tokens/toast'
import GuidelinesGrid from '../../components/GuidelinesGrid/GuidelinesGrid'
import Section from '../../components/Section/Section'
import styles from './ToastPage.module.css'

const TYPE_TRIGGER_LABEL: Record<ToastType, string> = {
  neutral: 'Neutral',
  success: 'Success',
  warning: 'Warning',
  critical: 'Critical',
}

const TYPE_TRIGGER_ICON: Record<ToastType, string> = {
  neutral: 'info',
  success: 'check_circle',
  warning: 'warning',
  critical: 'error',
}

interface ActiveToast {
  type: ToastType
  uid: number
}

const DISMISS_MS = 4000

export default function ToastPage() {
  const [active, setActive] = useState<ActiveToast | null>(null)
  const uidRef = useRef(0)

  const dismiss = useCallback(() => setActive(null), [])

  useEffect(() => {
    if (!active) return
    const timer = setTimeout(dismiss, DISMISS_MS)
    return () => clearTimeout(timer)
  }, [active, dismiss])

  function trigger(type: ToastType) {
    uidRef.current += 1
    setActive({ type, uid: uidRef.current })
  }

  const activeVariant = active ? TOAST_VARIANTS.find((v) => v.id === active.type) : null

  return (
    <div>
      <PageHeader
        breadcrumb="Alerts"
        title="Toast"
        subtitle="Toast é uma pequena mensagem que aparece na tela por um curto período de tempo. Fornece feedback simples e rápido ao usuário — como confirmações de sucesso ou avisos de erro — e desaparece automaticamente sem exigir interação."
        stats={[
          { value: 4, label: 'Variantes' },
          { value: 3, label: 'Combinações de conteúdo' },
          { value: 4, label: 'Diretrizes' },
        ]}
      />

      {/* ── Componente ── */}
      <section className={styles.section}>
        <SectionHeader icon="notification_important" title="Componente" />
        <div className={styles.demoArea}>
          <div className={styles.demoGrid}>
            {TOAST_VARIANTS.map((v) => (
              <Toast
                key={v.id}
                type={v.id}
                title={v.exampleTitle}
                description={v.exampleDescription}
                closable={false}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── Demo interativo ── */}
      <section className={styles.section}>
        <SectionHeader icon="play_circle" title="Demo interativo" />
        <div className={styles.interactiveCard}>
          <p className={`type-body-sm ${styles.interactiveHint}`}>
            Clique em um dos botões para ver o Toast aparecer na tela e desaparecer automaticamente
            após {DISMISS_MS / 1000} segundos.
          </p>
          <div className={styles.triggerRow}>
            {TOAST_VARIANTS.map((v) => (
              <button
                key={v.id}
                type="button"
                className={['type-body-sm', styles.triggerBtn, styles[`trigger_${v.id}`]].join(' ')}
                onClick={() => trigger(v.id)}
              >
                <span
                  className={`material-symbols-rounded icon-md ${styles.triggerIcon}`}
                  aria-hidden="true"
                >
                  {TYPE_TRIGGER_ICON[v.id]}
                </span>
                {TYPE_TRIGGER_LABEL[v.id]}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── Variantes ── */}
      <section className={styles.section}>
        <SectionHeader
          icon="style"
          title="Variantes"
          count={`${TOAST_VARIANTS.length} variantes`}
        />
        <div className={styles.variantsGrid}>
          {TOAST_VARIANTS.map((v) => (
            <div key={v.id} className={styles.variantCard}>
              <div className={styles.variantPreview}>
                <Toast type={v.id} title={v.exampleTitle} description={v.exampleDescription} />
              </div>
              <div className={styles.cardBody}>
                <span className={`type-body-sm ${styles.cardLabel}`}>{v.label}</span>
                <span className={`type-body-sm ${styles.cardDesc}`}>{v.description}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Combinações de conteúdo ── */}
      <section className={styles.section}>
        <SectionHeader icon="notes" title="Combinações de conteúdo" count="3 combinações" />
        <div className={styles.contentGrid}>
          <div className={styles.variantCard}>
            <div className={styles.variantPreview}>
              <Toast
                type="neutral"
                title="Campanha salva"
                description="Suas alterações foram salvas com sucesso."
              />
            </div>
            <div className={styles.cardBody}>
              <span className={`type-body-sm ${styles.cardLabel}`}>Título e descrição</span>
              <span className={`type-body-sm ${styles.cardDesc}`}>
                Configuração padrão e recomendada. O título comunica a essência e a descrição
                fornece o contexto. Mantenha visível por ao menos 5 segundos.
              </span>
            </div>
          </div>

          <div className={styles.variantCard}>
            <div className={styles.variantPreview}>
              <Toast type="neutral" title="Campanha salva com sucesso." />
            </div>
            <div className={styles.cardBody}>
              <span className={`type-body-sm ${styles.cardLabel}`}>Apenas título</span>
              <span className={`type-body-sm ${styles.cardDesc}`}>
                Use quando a mensagem é simples o suficiente para uma única linha. O título deve ser
                autoexplicativo. Pode ser dispensado em 3 segundos.
              </span>
            </div>
          </div>

          <div className={styles.variantCard}>
            <div className={styles.variantPreview}>
              <Toast
                type="neutral"
                title="Campanha salva"
                description="Suas alterações foram salvas com sucesso."
                closable={false}
              />
            </div>
            <div className={styles.cardBody}>
              <span className={`type-body-sm ${styles.cardLabel}`}>Sem botão de fechar</span>
              <span className={`type-body-sm ${styles.cardDesc}`}>
                Use quando o Toast deve desaparecer apenas automaticamente, sem oferecer controle
                manual ao usuário. Adequado para mensagens de confirmação simples.
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Diretrizes ── */}
      <Section icon="checklist" title="Diretrizes de uso">
        <GuidelinesGrid items={TOAST_GUIDELINES} />
      </Section>

      {/* ── Toast portal ── */}
      {active && activeVariant && (
        <div key={active.uid} className={styles.toastPortal}>
          <Toast
            type={active.type}
            title={activeVariant.exampleTitle}
            description={activeVariant.exampleDescription}
            onClose={dismiss}
          />
        </div>
      )}
    </div>
  )
}
