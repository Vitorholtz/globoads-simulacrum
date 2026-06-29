import { useState, useEffect, useCallback, useRef } from 'react'
import Toast from '../../components/Toast/Toast'
import PageHeader from '../../components/docs/PageHeader/PageHeader'
import { TOAST_VARIANTS, TOAST_GUIDELINES } from '../../tokens/toast'
import type { ToastType } from '../../tokens/toast'
import Section from '../../components/docs/Section/Section'
import DemoCard from '../../components/docs/DemoCard/DemoCard'
import CardGrid from '../../components/docs/CardGrid/CardGrid'
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
const EXIT_MS = 250

export default function ToastPage() {
  const [active, setActive] = useState<ActiveToast | null>(null)
  const [leaving, setLeaving] = useState(false)
  const uidRef = useRef(0)
  const leaveTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const startExit = useCallback(() => {
    setLeaving(true)
    leaveTimerRef.current = setTimeout(() => {
      setActive(null)
      setLeaving(false)
    }, EXIT_MS)
  }, [])

  useEffect(() => {
    if (!active) return
    const timer = setTimeout(startExit, DISMISS_MS)
    return () => clearTimeout(timer)
  }, [active, startExit])

  useEffect(
    () => () => {
      if (leaveTimerRef.current) clearTimeout(leaveTimerRef.current)
    },
    []
  )

  function trigger(type: ToastType) {
    if (leaveTimerRef.current) {
      clearTimeout(leaveTimerRef.current)
      leaveTimerRef.current = null
    }
    setLeaving(false)
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
      <Section icon="notification_important" title="Componente">
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
      </Section>

      {/* ── Demo interativo ── */}
      <Section icon="play_circle" title="Demo interativo">
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
      </Section>

      {/* ── Variantes ── */}
      <Section
        icon="style"
        title="Variantes"
        count={TOAST_VARIANTS.length}
        description="Cada variante usa uma cor semântica para comunicar o nível de importância da mensagem."
      >
        <CardGrid wide>
          {TOAST_VARIANTS.map((v) => (
            <DemoCard
              key={v.id}
              preview={
                <Toast type={v.id} title={v.exampleTitle} description={v.exampleDescription} />
              }
              title={v.label}
              description={v.description}
            />
          ))}
        </CardGrid>
      </Section>

      {/* ── Combinações de conteúdo ── */}
      <Section
        icon="notes"
        title="Conteúdo"
        count={3}
        description="O Toast suporta três combinações de conteúdo que cobrem os cenários mais comuns."
      >
        <CardGrid>
          <DemoCard
            preview={
              <Toast
                type="neutral"
                title="Campanha salva"
                description="Suas alterações foram salvas com sucesso."
              />
            }
            title="Título e descrição"
            description="Configuração padrão e recomendada. O título comunica a essência e a descrição fornece o contexto. Mantenha visível por ao menos 5 segundos."
          />
          <DemoCard
            preview={<Toast type="neutral" title="Campanha salva com sucesso." />}
            title="Apenas título"
            description="Use quando a mensagem é simples o suficiente para uma única linha. O título deve ser autoexplicativo. Pode ser dispensado em 3 segundos."
          />
          <DemoCard
            preview={
              <Toast
                type="neutral"
                title="Campanha salva"
                description="Suas alterações foram salvas com sucesso."
                closable={false}
              />
            }
            title="Sem botão de fechar"
            description="Use quando o Toast deve desaparecer apenas automaticamente, sem oferecer controle manual ao usuário. Adequado para mensagens de confirmação simples."
          />
        </CardGrid>
      </Section>

      {/* ── Diretrizes ── */}
      <Section icon="checklist" title="Diretrizes de Uso">
        <CardGrid wide>
          {TOAST_GUIDELINES.map((g) => (
            <DemoCard key={g.title} title={g.title} description={g.body} />
          ))}
        </CardGrid>
      </Section>

      {/* ── Toast portal ── */}
      {active && activeVariant && (
        <div
          key={active.uid}
          className={[styles.toastPortal, leaving && styles.leaving].filter(Boolean).join(' ')}
        >
          <Toast
            type={active.type}
            title={activeVariant.exampleTitle}
            description={activeVariant.exampleDescription}
            onClose={startExit}
          />
        </div>
      )}
    </div>
  )
}
