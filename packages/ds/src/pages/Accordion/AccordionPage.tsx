import Accordion from '../../components/Accordion/Accordion'
import PageHeader from '../../components/docs/PageHeader/PageHeader'
import { ACCORDION_STATES, ACCORDION_GUIDELINES, ACCORDION_VARIANTS } from '../../tokens/accordion'
import GuidelinesGrid from '../../components/docs/GuidelinesGrid/GuidelinesGrid'
import Section from '../../components/docs/Section/Section'
import DemoCard from '../../components/docs/DemoCard/DemoCard'
import CardGrid from '../../components/docs/CardGrid/CardGrid'
import styles from './AccordionPage.module.css'

const DEMO_ITEMS = [
  {
    id: 'segmentacao',
    label: 'Segmentação de Público',
    content: (
      <div className={styles.contentBox}>
        <p className={`type-body-sm ${styles.contentText}`}>
          A segmentação está configurada para atingir usuários entre 25 e 45 anos, residentes nas
          regiões Sudeste e Sul do Brasil, com interesse em esportes, entretenimento digital e
          consumo de mídia online. Frequência máxima de 3 impressões por usuário por dia.
        </p>
      </div>
    ),
  },
  {
    id: 'formato',
    label: 'Formato do Anúncio',
    content: (
      <div className={styles.contentBox}>
        <p className={`type-body-sm ${styles.contentText}`}>
          Formato Video Bumper — arquivos MP4 ou WebM, resolução mínima 1280×720px, duração fixa de
          6 segundos. Peso máximo de 50 MB, codec H.264 ou VP9, áudio AAC-LC a 44.1 kHz. Legendas
          SRT são opcionais mas recomendadas para acessibilidade.
        </p>
      </div>
    ),
  },
  {
    id: 'periodo',
    label: 'Período de Veiculação',
    content: (
      <div className={styles.contentBox}>
        <p className={`type-body-sm ${styles.contentText}`}>
          Campanha programada para veicular entre 01/06/2026 e 30/06/2026. Horário preferencial: das
          18h às 23h nos dias úteis e integral aos finais de semana. Pausa automática em feriados
          nacionais habilitada.
        </p>
      </div>
    ),
  },
  {
    id: 'performance',
    label: 'Dados de Performance Estimados',
    content: (
      <div className={styles.contentBox}>
        <p className={`type-body-sm ${styles.contentText}`}>
          Estimativa de alcance semanal: 2,4 milhões de usuários únicos. CPM médio projetado de R$
          18,50. Taxa de conclusão esperada de 82% com base em campanhas similares veiculadas no
          último trimestre.
        </p>
      </div>
    ),
  },
]

const STATE_SINGLE_ITEM = [
  {
    id: 'state-item',
    label: 'Segmentação de Público',
    content: (
      <div className={styles.contentBox}>
        <p className={`type-body-sm ${styles.contentText}`}>
          Detalhes sobre a segmentação de público-alvo desta campanha.
        </p>
      </div>
    ),
  },
]

const VARIANT_CONTENT = (
  <div className={styles.contentBox}>
    <p className={`type-body-sm ${styles.contentText}`}>Conteúdo da seção expandida.</p>
  </div>
)

const VARIANT_ITEMS = {
  'with-icon': [
    { id: 'v1', label: 'Segmentação de Público', icon: 'person_pin', content: VARIANT_CONTENT },
    { id: 'v2', label: 'Formato do Anúncio', icon: 'movie', content: VARIANT_CONTENT },
  ],
  'with-detail': [
    { id: 'v1', label: 'Período de Veiculação', detail: '01/06 – 30/06', content: VARIANT_CONTENT },
    { id: 'v2', label: 'Orçamento Diário', detail: 'R$ 480', content: VARIANT_CONTENT },
  ],
  'with-badge': [
    {
      id: 'v1',
      label: 'Aprovação Criativa',
      badge: { label: 'Pendente', variant: 'warning' as const },
      content: VARIANT_CONTENT,
    },
    {
      id: 'v2',
      label: 'Veiculação',
      badge: { label: 'Ativo', variant: 'success' as const },
      content: VARIANT_CONTENT,
    },
  ],
  'with-all': [
    {
      id: 'v1',
      label: 'Campanha Verão 2026',
      icon: 'campaign',
      detail: 'Video 6s',
      badge: { label: 'Em revisão', variant: 'warning' as const },
      content: VARIANT_CONTENT,
    },
    {
      id: 'v2',
      label: 'Retargeting App',
      icon: 'phone_iphone',
      detail: 'Display',
      badge: { label: 'Ativo', variant: 'success' as const },
      content: VARIANT_CONTENT,
    },
  ],
}

export default function AccordionPage() {
  return (
    <div>
      <PageHeader
        breadcrumb="Utilities"
        title="Accordion"
        subtitle="O Accordion organiza conteúdo em seções expansíveis e recolhíveis, permitindo ao usuário visualizar ou ocultar informações de forma compacta e estruturada. Apenas uma seção permanece aberta por vez."
        stats={[
          { value: 2, label: 'Estados' },
          { value: 4, label: 'Variantes' },
          { value: 4, label: 'Diretrizes' },
        ]}
      />

      {/* ── Componente ── */}
      <Section icon="expand_all" title="Componente">
        <div className={styles.componentDemo}>
          <Accordion items={DEMO_ITEMS} defaultOpenId="segmentacao" />
        </div>
      </Section>

      {/* ── Variantes ── */}
      <Section icon="tune" title="Variantes" count={ACCORDION_VARIANTS.length}>
        <CardGrid cols={2}>
          {ACCORDION_VARIANTS.map((variant) => (
            <DemoCard
              key={variant.id}
              preview={
                <Accordion
                  items={VARIANT_ITEMS[variant.id as keyof typeof VARIANT_ITEMS]}
                  defaultOpenId={VARIANT_ITEMS[variant.id as keyof typeof VARIANT_ITEMS][0].id}
                />
              }
              title={variant.label}
              description={variant.description}
              align="stretch"
            />
          ))}
        </CardGrid>
      </Section>

      {/* ── Estados ── */}
      <Section icon="toggle_on" title="Estados" count={ACCORDION_STATES.length}>
        <CardGrid cols={2}>
          {ACCORDION_STATES.map((state) => (
            <DemoCard
              key={state.id}
              preview={
                <Accordion
                  items={STATE_SINGLE_ITEM}
                  defaultOpenId={state.id === 'expanded' ? 'state-item' : null}
                />
              }
              title={state.label}
              description={state.description}
              align="stretch"
            />
          ))}
        </CardGrid>
      </Section>

      {/* ── Diretrizes ── */}
      <Section icon="checklist" title="Diretrizes de Uso">
        <GuidelinesGrid items={ACCORDION_GUIDELINES} />
      </Section>
    </div>
  )
}
