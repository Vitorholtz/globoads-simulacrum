import Badge from '../../components/Badge/Badge'
import { BADGE_VARIANTS, BADGE_GUIDELINES } from '../../tokens/badge'
import type { BadgeVariant } from '../../tokens/badge'
import PageHeader from '../../components/docs/PageHeader/PageHeader'
import CardGrid from '../../components/docs/CardGrid/CardGrid'
import DemoCard from '../../components/docs/DemoCard/DemoCard'
import Section from '../../components/docs/Section/Section'
import InfoCard from '../../components/docs/InfoCard/InfoCard'
import ShowcaseList from '../../components/docs/ShowcaseList/ShowcaseList'

const EXAMPLE_LABELS: Record<string, string> = {
  neutral: 'Rascunho',
  success: 'Publicado',
  warning: 'Em revisão',
  critical: 'Recusado',
  accent: 'Novidade',
}

export default function BadgePage() {
  return (
    <div>
      <PageHeader
        breadcrumb="Indicators"
        title="Badge Status"
        subtitle="Indicador de estado sem interação. Identifica visualmente a condição atual de um item — como status de publicação, resultado de moderação ou classificação — usando cor e texto como sinais semânticos."
        stats={[
          { value: 5, label: 'Variantes' },
          { value: 1, label: 'Tamanho' },
        ]}
      />

      {/* ── Variantes ── */}
      <Section icon="label" title="Variantes" count={BADGE_VARIANTS.length}>
        <ShowcaseList
          previewWidth={200}
          rows={BADGE_VARIANTS.map((v) => ({
            id: v.id,
            label: v.label,
            description: v.description,
          }))}
          renderPreview={(row) => (
            <Badge variant={row.id as BadgeVariant} label={EXAMPLE_LABELS[row.id]} />
          )}
        />
      </Section>

      {/* ── Anatomia ── */}
      <Section icon="info" title="Anatomia">
        <InfoCard
          preview={<Badge variant="neutral" label="Badge" />}
          specs={[
            { label: 'Tipografia', value: '12px · weight 500 · font-family base' },
            { label: 'Padding', value: '2px vertical · 4px horizontal' },
            { label: 'Border-radius', value: '8px (--border-radius-md)' },
            { label: 'Cor do texto', value: 'Fill da variante semântica' },
            { label: 'Fundo', value: 'Surface da variante correspondente' },
            { label: 'Interação', value: 'Nenhuma — somente leitura' },
          ]}
        />
      </Section>

      {/* ── Diretrizes ── */}
      <Section icon="checklist" title="Diretrizes de Uso">
        <CardGrid wide>
          {BADGE_GUIDELINES.map((g) => (
            <DemoCard key={g.title} title={g.title} description={g.body} />
          ))}
        </CardGrid>
      </Section>
    </div>
  )
}
