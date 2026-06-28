import Collapse from '../../components/Collapse/Collapse'
import PageHeader from '../../components/docs/PageHeader/PageHeader'
import {
  COLLAPSE_SIZES,
  COLLAPSE_STATES,
  COLLAPSE_GUIDELINES,
  COLLAPSE_MATRIX_STATES,
  COLLAPSE_DEMO_ITEMS,
  COLLAPSE_PREVIEW_TEXT,
} from '../../tokens/collapse'
import type { CollapseSize } from '../../tokens/collapse'
import GuidelinesGrid from '../../components/docs/GuidelinesGrid/GuidelinesGrid'
import Section from '../../components/docs/Section/Section'
import ShowcaseList from '../../components/docs/ShowcaseList/ShowcaseList'
import type { ShowcaseRow } from '../../components/docs/ShowcaseList/ShowcaseList'
import DemoCard from '../../components/docs/DemoCard/DemoCard'
import CardGrid from '../../components/docs/CardGrid/CardGrid'
import StateMatrix from '../../components/docs/StateMatrix/StateMatrix'
import styles from './CollapsePage.module.css'

export default function CollapsePage() {
  return (
    <div>
      <PageHeader
        breadcrumb="Utilities"
        title="Collapse"
        subtitle='O Collapse exibe um texto parcialmente visível e permite ao usuário revelar o restante com um clique em "Ver mais". Ideal para descrições longas, termos e detalhes secundários que não precisam ocupar espaço sempre.'
        stats={[
          { value: 4, label: 'Tamanhos' },
          { value: 4, label: 'Estados' },
          { value: 2, label: 'Direções' },
        ]}
      />

      {/* ── Estilos ── */}
      <Section icon="unfold_more" title="Estilos de Conteúdo" count={2}>
        <CardGrid>
          <DemoCard
            preview={
              <div className={styles.previewBox}>
                <Collapse size="md" lines={3}>
                  <p className={`type-body-sm ${styles.previewBodyText}`}>
                    {COLLAPSE_PREVIEW_TEXT}
                  </p>
                </Collapse>
              </div>
            }
            title="Recolhido"
            description='O texto é truncado ao número de linhas configurado. O acionador "Ver mais" com seta para baixo aparece imediatamente abaixo.'
            align="stretch"
          />
          <DemoCard
            preview={
              <div className={styles.previewBox}>
                <Collapse size="md" lines={3} defaultOpen>
                  <p className={`type-body-sm ${styles.previewBodyText}`}>
                    {COLLAPSE_PREVIEW_TEXT}
                  </p>
                </Collapse>
              </div>
            }
            title="Expandido"
            description='O texto completo é exibido. O acionador muda para "Ver menos" com a seta rotacionada para cima.'
            align="stretch"
          />
        </CardGrid>
      </Section>

      {/* ── Escala de tamanhos ── */}
      <Section icon="straighten" title="Escala de Tamanhos" count={COLLAPSE_SIZES.length}>
        <ShowcaseList
          previewWidth={280}
          rows={COLLAPSE_SIZES.map(
            (s): ShowcaseRow => ({
              id: s.id,
              label: s.label,
              badge: s.recommended ? 'Recomendado' : undefined,
              description: s.description,
              specs: (
                <>
                  font {s.fontSize}px · icon {s.iconSize}px
                  <br />
                  line-height {s.lineHeight}px · gap {s.gap}px
                </>
              ),
            })
          )}
          renderPreview={(row) => (
            <Collapse size={row.id as CollapseSize} lines={2}>
              <p className={`type-body-sm ${styles.sizePreviewText}`}>{COLLAPSE_PREVIEW_TEXT}</p>
            </Collapse>
          )}
        />
      </Section>

      {/* ── Estados ── */}
      <Section icon="toggle_on" title="Estados" count={COLLAPSE_STATES.length}>
        <StateMatrix
          columns={[
            { id: 'collapsed', label: 'Ver mais' },
            { id: 'expanded', label: 'Ver menos' },
          ]}
          rows={[...COLLAPSE_MATRIX_STATES]}
          renderCell={(state, col) => (
            <Collapse size="md" open={col.id === 'expanded'} forceState={state.force} />
          )}
        />
      </Section>

      {/* ── Demo Interativo ── */}
      <Section icon="touch_app" title="Demo Interativo">
        <div className={styles.demoContainer}>
          {COLLAPSE_DEMO_ITEMS.map((item, i) => (
            <div
              key={item.key}
              className={[
                styles.demoItem,
                i < COLLAPSE_DEMO_ITEMS.length - 1 ? styles.demoItemBorder : '',
              ].join(' ')}
            >
              <div className={styles.demoMeta}>
                <span className={`type-body-sm ${styles.demoLabel}`}>{item.label}</span>
                <span className={`type-caption-xs ${styles.demoSize}`}>
                  {item.size.toUpperCase()}
                </span>
              </div>
              <Collapse size={item.size} lines={3}>
                <p className={`type-body-sm ${styles.demoBodyText}`}>{item.text}</p>
              </Collapse>
            </div>
          ))}
        </div>
      </Section>

      {/* ── Diretrizes ── */}
      <Section icon="checklist" title="Diretrizes de Uso">
        <GuidelinesGrid items={COLLAPSE_GUIDELINES} />
      </Section>
    </div>
  )
}
