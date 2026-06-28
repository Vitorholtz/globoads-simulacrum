import { useState } from 'react'
import Pagination from '../../components/Pagination/Pagination'
import { PAGINATION_VARIANTS, PAGINATION_GUIDELINES } from '../../tokens/pagination'
import type { PaginationVariantDef } from '../../tokens/pagination'
import PageHeader from '../../components/docs/PageHeader/PageHeader'
import GuidelinesGrid from '../../components/docs/GuidelinesGrid/GuidelinesGrid'
import Section from '../../components/docs/Section/Section'
import DemoCard from '../../components/docs/DemoCard/DemoCard'
import CardGrid from '../../components/docs/CardGrid/CardGrid'

function VariantDemo({ def }: { def: PaginationVariantDef }) {
  const [page, setPage] = useState(3)
  return (
    <Pagination
      variant={def.id}
      page={page}
      totalPages={12}
      totalItems={1200}
      itemsPerPage={10}
      onChange={setPage}
    />
  )
}

export default function PaginationPage() {
  return (
    <div>
      <PageHeader
        breadcrumb="Navigations"
        title="Pagination"
        subtitle="A paginação permite que os usuários se movam por uma coleção ordenada de itens que foi dividida em páginas. Suporta quatro variantes de exibição de acordo com o nível de informação necessário."
        stats={[
          { value: 4, label: 'Variantes' },
          { value: 2, label: 'Estados' },
        ]}
      />

      {/* ── Variantes ── */}
      <Section icon="more_horiz" title="Variantes" count={PAGINATION_VARIANTS.length}>
        <CardGrid wide>
          {PAGINATION_VARIANTS.map((v) => (
            <DemoCard
              key={v.id}
              preview={<VariantDemo def={v} />}
              title={v.label}
              description={v.description}
            />
          ))}
        </CardGrid>
      </Section>

      {/* ── Estados ── */}
      <Section icon="toggle_on" title="Estados" count={2}>
        <CardGrid>
          <DemoCard
            preview={<Pagination variant="buttons" page={1} totalPages={10} onChange={() => {}} />}
            title="Primeira página"
            description='Seta "anterior" desabilitada com opacidade reduzida. Indica ao usuário que não há páginas anteriores disponíveis.'
          />
          <DemoCard
            preview={<Pagination variant="buttons" page={10} totalPages={10} onChange={() => {}} />}
            title="Última página"
            description='Seta "próxima" desabilitada com opacidade reduzida. Indica ao usuário que não há mais páginas à frente.'
          />
        </CardGrid>
      </Section>

      {/* ── Diretrizes ── */}
      <Section icon="checklist" title="Diretrizes de Uso">
        <GuidelinesGrid items={PAGINATION_GUIDELINES} />
      </Section>
    </div>
  )
}
