import Breadcrumb from '../../components/Breadcrumb/Breadcrumb'
import type { BreadcrumbItem } from '../../components/Breadcrumb/Breadcrumb'
import { BREADCRUMB_DEPTHS, BREADCRUMB_GUIDELINES } from '../../tokens/breadcrumb'
import PageHeader from '../../components/docs/PageHeader/PageHeader'
import CardGrid from '../../components/docs/CardGrid/CardGrid'
import DemoCard from '../../components/docs/DemoCard/DemoCard'
import Section from '../../components/docs/Section/Section'
import InfoCard from '../../components/docs/InfoCard/InfoCard'
import ShowcaseList from '../../components/docs/ShowcaseList/ShowcaseList'

function depthToItems(labels: string[]): BreadcrumbItem[] {
  return labels.map((label, index) => ({
    label,
    onClick: index < labels.length - 1 ? () => {} : undefined,
  }))
}

export default function BreadcrumbPage() {
  return (
    <div>
      <PageHeader
        breadcrumb="Navigations"
        title="Breadcrumb"
        subtitle="O breadcrumb é um componente de navegação que permite a localização dentro da estrutura hierárquica do produto. Exibe o caminho percorrido do nível raiz até a página atual."
        stats={[
          { value: 4, label: 'Profundidades' },
          { value: 2, label: 'Tipos de item' },
        ]}
      />

      {/* ── Profundidades ── */}
      <Section icon="route" title="Profundidades" count={BREADCRUMB_DEPTHS.length}>
        <ShowcaseList
          previewWidth={560}
          rows={BREADCRUMB_DEPTHS.map((d) => ({
            id: d.label,
            label: d.label,
            description: `${d.levels} itens`,
          }))}
          renderPreview={(row) => {
            const depth = BREADCRUMB_DEPTHS.find((d) => d.label === row.id)!
            return (
              <div style={{ width: '100%' }}>
                <Breadcrumb items={depthToItems(depth.items)} />
              </div>
            )
          }}
        />
      </Section>

      {/* ── Anatomia ── */}
      <Section icon="info" title="Anatomia">
        <InfoCard
          preview={
            <Breadcrumb
              items={depthToItems(['Início', 'Campanhas', 'Relatórios', 'Página atual'])}
            />
          }
          specs={[
            { label: 'Links anteriores', value: '14px · weight 500 · cor accent' },
            { label: 'Página atual', value: '16px · weight 600 · cor primária' },
            { label: 'Separador', value: 'chevron_right · 16px · cor secundária' },
            { label: 'Gap entre itens', value: '8px' },
            { label: 'Hover nos links', value: 'text-decoration: underline' },
            { label: 'Página atual', value: 'não interativa · aria-current="page"' },
          ]}
        />
      </Section>

      {/* ── Diretrizes ── */}
      <Section icon="checklist" title="Diretrizes de Uso">
        <CardGrid wide>
          {BREADCRUMB_GUIDELINES.map((g) => (
            <DemoCard key={g.title} title={g.title} description={g.body} />
          ))}
        </CardGrid>
      </Section>
    </div>
  )
}
