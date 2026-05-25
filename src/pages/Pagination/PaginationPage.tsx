import { useState } from 'react'
import Pagination from '../../components/Pagination/Pagination'
import { PAGINATION_VARIANTS, PAGINATION_GUIDELINES } from '../../tokens/pagination'
import type { PaginationVariantDef } from '../../tokens/pagination'
import PageHeader from '../../components/PageHeader/PageHeader'
import SectionHeader from '../../components/SectionHeader/SectionHeader'
import styles from './PaginationPage.module.css'

function VariantDemo({ def }: { def: PaginationVariantDef }) {
  const [page, setPage] = useState(3)
  const totalPages = 12
  const totalItems = 1200
  const itemsPerPage = 10

  return (
    <div className={styles.variantCard}>
      <div className={styles.variantPreview}>
        <Pagination
          variant={def.id}
          page={page}
          totalPages={totalPages}
          totalItems={totalItems}
          itemsPerPage={itemsPerPage}
          onChange={setPage}
        />
      </div>
      <div className={styles.variantMeta}>
        <span className={styles.variantLabel}>{def.label}</span>
        <p className={styles.variantDesc}>{def.description}</p>
      </div>
    </div>
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
      <section className={styles.section}>
        <SectionHeader icon="more_horiz" title="Variantes" count={`${PAGINATION_VARIANTS.length} variantes`} />
        <div className={styles.variantGrid}>
          {PAGINATION_VARIANTS.map((v) => (
            <VariantDemo key={v.id} def={v} />
          ))}
        </div>
      </section>

      {/* ── Estados ── */}
      <section className={styles.section}>
        <SectionHeader icon="toggle_on" title="Estados" count="2 estados" />
        <div className={styles.statesGrid}>
          <div className={styles.stateCard}>
            <div className={styles.statePreview}>
              <Pagination
                variant="buttons"
                page={1}
                totalPages={10}
                onChange={() => {}}
              />
            </div>
            <div className={styles.stateMeta}>
              <span className={styles.stateLabel}>Primeira página</span>
              <p className={styles.stateDesc}>Seta "anterior" desabilitada com opacidade reduzida. Indica ao usuário que não há páginas anteriores disponíveis.</p>
            </div>
          </div>
          <div className={styles.stateCard}>
            <div className={styles.statePreview}>
              <Pagination
                variant="buttons"
                page={10}
                totalPages={10}
                onChange={() => {}}
              />
            </div>
            <div className={styles.stateMeta}>
              <span className={styles.stateLabel}>Última página</span>
              <p className={styles.stateDesc}>Seta "próxima" desabilitada com opacidade reduzida. Indica ao usuário que não há mais páginas à frente.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Diretrizes ── */}
      <section className={styles.section}>
        <SectionHeader icon="checklist" title="Diretrizes de Uso" />
        <div className={styles.guidelinesGrid}>
          {PAGINATION_GUIDELINES.map((g) => (
            <div key={g.title} className={styles.guidelineCard}>
              <h3 className={styles.guidelineTitle}>{g.title}</h3>
              <p className={styles.guidelineBody}>{g.body}</p>
              <div className={styles.guidelineRule}>{g.rule}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
